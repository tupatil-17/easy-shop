import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Heart, UserCircle, Package } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, {user?.username}!
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div
            onClick={() => navigate('/profile')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <UserCircle className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
            </div>
            <p className="text-gray-600">View and edit your profile information</p>
          </div>

          {/* Orders Card */}
          <div
            onClick={() => navigate('/orders')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
            </div>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>

          {/* Wishlist Card */}
          <div
            onClick={() => navigate('/favorites')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
            </div>
            <p className="text-gray-600">View your saved items</p>
          </div>

          {/* Cart Card */}
          <div
            onClick={() => navigate('/cart')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
            </div>
            <p className="text-gray-600">View items in your cart</p>
          </div>

          {/* Become Service Provider Card */}
          <div
            onClick={() => navigate('/apply-service-provider')}
            className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer text-white"
          >
            <h2 className="text-xl font-semibold mb-2">Become a Service Provider</h2>
            <p className="text-pink-100">Apply to sell your products on EasyShop</p>
          </div>
        </div>
      </div>
    </div>
  );
}
