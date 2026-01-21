import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Consolidated providers for the application.
 * Using a single wrapper improves readability and maintains a stable provider tree.
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};
