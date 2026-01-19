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
    try {
      await axios.post(API_ENDPOINTS.FAVORITES.ADD(productId));
      await fetchFavorites();
    } catch (error) {
      console.warn('Favorites API not available, using local storage');
      const newFavorite = {
        id: Date.now().toString(),
        productId: productId,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image || 'https://via.placeholder.com/500'
      };
      
      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      await axios.delete(API_ENDPOINTS.FAVORITES.REMOVE(productId));
      setFavorites(prev => prev.filter(item => item.productId !== productId));
    } catch (error) {
      console.warn('Favorites API not available, using local storage');
      const newFavorites = favorites.filter(item => item.productId !== productId);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
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