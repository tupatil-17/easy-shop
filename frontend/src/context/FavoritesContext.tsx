import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { axios } from './AuthContext';
import { useAuth } from './AuthContext';
import { API_ENDPOINTS } from '../config/api';

interface FavoriteItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  favoritesCount: number;
  addToFavorites: (product: any) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  fetchFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.FAVORITES.GET);
      const items = response.data.map((product: any) => ({
        id: product._id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image || 'https://via.placeholder.com/500'
      }));
      setFavorites(items);
    } catch (error) {
      console.warn('Favorites API not available');
      // Load from localStorage as fallback
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  };

  const addToFavorites = async (product: any) => {
    const productId = product._id || product.id;
    const previousFavorites = [...favorites];
    
    // Optimistic update
    const newFavorite: FavoriteItem = {
      id: productId, // Using productId as temporary ID
      productId: productId,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image || 'https://via.placeholder.com/500'
    };
    setFavorites(prev => [...prev, newFavorite]);

    try {
      await axios.post(API_ENDPOINTS.FAVORITES.ADD(productId));
    } catch (error) {
      console.warn('Favorites API failed, rolling back');
      setFavorites(previousFavorites);
      
      // If it's a network error, maybe try local storage as fallback? 
      // User requested optimistic + rollback, so we prioritize consistency.
      throw error;
    }
  };

  const removeFromFavorites = async (productId: string) => {
    const previousFavorites = [...favorites];
    
    // Optimistic update
    setFavorites(prev => prev.filter(item => item.productId !== productId));

    try {
      await axios.delete(API_ENDPOINTS.FAVORITES.REMOVE(productId));
    } catch (error) {
      console.warn('Favorites API failed, rolling back');
      setFavorites(previousFavorites);
      throw error;
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.productId === productId);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      favoritesCount: favorites.length, 
      addToFavorites, 
      removeFromFavorites,
      isFavorite,
      fetchFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}