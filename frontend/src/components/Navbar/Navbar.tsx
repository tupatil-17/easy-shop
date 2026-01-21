import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { 
  AUTH_NAV_LINKS, 
  ROLE_DASHBOARDS, 
  DEFAULT_DASHBOARD 
} from './navbar.config';
import NavItem from './NavItem';
import MobileNavItem from './MobileNavItem';


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  // Memoized dashboard link based on user role
  const dashboardLink = useMemo(() => {
    if (!user?.role) return DEFAULT_DASHBOARD;
    return ROLE_DASHBOARDS[user.role] || DEFAULT_DASHBOARD;
  }, [user?.role]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  }, [searchQuery, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  }, [logout, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Helper to get badge count for dynamic links
  const getBadgeCount = (type?: 'cart' | 'favorites') => {
    if (type === 'cart') return cartCount;
    if (type === 'favorites') return favoritesCount;
    return undefined;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md" aria-label="EasyShop Home">
            <div className="text-2xl font-bold text-pink-600">EasyShop</div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8" role="search">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600 focus:outline-none focus:text-pink-600 transition-colors"
                aria-label="Submit search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {AUTH_NAV_LINKS.map((link) => (
                  <NavItem
                    key={link.id}
                    to={link.id === 'dashboard' ? dashboardLink : link.href}
                    icon={link.icon}
                    label={link.label}
                    badgeCount={getBadgeCount(link.showBadge)}
                  />
                ))}
                <button 
                  onClick={handleLogout} 
                  className="flex flex-col items-center text-gray-700 hover:text-pink-600 transition focus:outline-none focus:text-pink-600"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-xs mt-1">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-pink-600 transition font-medium focus:outline-none focus:underline">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <form onSubmit={handleSearch} className="md:hidden pb-3" role="search">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label="Submit search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden bg-white border-t border-gray-200 shadow-xl" 
          id="mobile-menu"
        >
          <div className="px-4 py-3 space-y-1">
            {isAuthenticated ? (
              <>
                {AUTH_NAV_LINKS.map((link) => (
                  <MobileNavItem
                    key={`mobile-${link.id}`}
                    to={link.id === 'dashboard' ? dashboardLink : link.href}
                    icon={link.icon}
                    label={link.label}
                    badgeCount={getBadgeCount(link.showBadge)}
                    onClick={closeMenu}
                  />
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 text-gray-700 hover:text-pink-600 w-full py-2 focus:outline-none focus:text-pink-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block text-gray-700 hover:text-pink-600 py-2 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block bg-pink-600 text-white px-4 py-2 rounded-md text-center hover:bg-pink-700 shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default React.memo(Navbar);
