import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const ServiceProviderDashboard = lazy(() => import('./pages/ServiceProviderDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ApplyServiceProvider = lazy(() => import('./pages/ApplyServiceProvider'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Reviews = lazy(() => import('./pages/Reviews'));
const NotFound = lazy(() => import('./pages/NotFound'));


export default function App() {
  return (
    <AppProviders>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:id" element={<ProductDetail />} />

          {/* Protected Routes - All Authenticated Users */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          {/* User Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="apply-service-provider" element={<ApplyServiceProvider />} />
          </Route>

          {/* Service Provider Routes */}
          <Route element={<ProtectedRoute allowedRoles={['service_provider']} />}>
            <Route path="service-provider/dashboard" element={<ServiceProviderDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* 404 - Should be inside AppLayout to maintain navigation */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProviders>
  );
}

