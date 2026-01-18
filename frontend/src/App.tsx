import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import UserDashboard from './pages/UserDashboard';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplyServiceProvider from './pages/ApplyServiceProvider';
import Checkout from './pages/Checkout';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  
                  {/* Protected Routes - All Authenticated Users */}
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } />
                  <Route path="/favorites" element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/reviews" element={
                    <ProtectedRoute>
                      <Reviews />
                    </ProtectedRoute>
                  } />
                  
                  {/* User Routes */}
                  <Route path="/user/dashboard" element={
                    <ProtectedRoute allowedRoles={['user']}>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/apply-service-provider" element={
                    <ProtectedRoute allowedRoles={['user']}>
                      <ApplyServiceProvider />
                    </ProtectedRoute>
                  } />
                  
                  {/* Service Provider Routes */}
                  <Route path="/service-provider/dashboard" element={
                    <ProtectedRoute allowedRoles={['service_provider']}>
                      <ServiceProviderDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
