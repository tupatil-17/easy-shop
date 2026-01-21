import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function Favorites() {
  const { favorites, removeFromFavorites, fetchFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await removeFromFavorites(productId);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleAddToCart = async (favoriteItem: any) => {
    try {
      // Map favorite item back to product format for context
      const cartProduct = {
        _id: favoriteItem.productId,
        name: favoriteItem.name,
        price: favoriteItem.price,
        images: [favoriteItem.image],
        stock: 99 // Default for optimistic update
      };
      await addToCart(cartProduct);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save your favorite items here!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative aspect-[3/4] bg-gray-100 cursor-pointer" onClick={() => navigate(`/product/${item.productId}`)}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.productId);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">₹{item.price}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-pink-600 text-white p-2 rounded-md hover:bg-pink-700 transition"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
