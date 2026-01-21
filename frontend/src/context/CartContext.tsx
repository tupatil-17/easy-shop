import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth, axios } from './AuthContext';
import { API_ENDPOINTS } from '../config/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => void;
  cartCount: number;
  fetchCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]);
      setCartCount(0);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_ENDPOINTS.CART.GET);
      setCart(response.data.cart || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    const previousCart = [...cart];
    
    // Optimistic update
    setCart(prev => {
      const existingItemIndex = prev.findIndex(item => item.product._id === product._id);
      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      }
      return [...prev, { product, quantity: 1 }];
    });

    try {
      await axios.post(API_ENDPOINTS.CART.ADD(product._id));
      // Optionally fetch to sync with server state (e.g. stock changes)
      // await fetchCart(); 
    } catch (error: any) {
      setCart(previousCart); // Rollback
      throw new Error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const previousCart = [...cart];

    // Optimistic update
    setCart(prev => prev.map(item => 
      item.product._id === productId ? { ...item, quantity } : item
    ));

    try {
      await axios.put(API_ENDPOINTS.CART.UPDATE(productId), { quantity });
    } catch (error: any) {
      setCart(previousCart); // Rollback
      throw new Error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeFromCart = async (productId: string) => {
    const previousCart = [...cart];

    // Optimistic update
    setCart(prev => prev.filter(item => item.product._id !== productId));

    try {
      await axios.delete(API_ENDPOINTS.CART.REMOVE(productId));
    } catch (error: any) {
      setCart(previousCart); // Rollback
      throw new Error(error.response?.data?.message || 'Failed to remove from cart');
    }
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      fetchCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}