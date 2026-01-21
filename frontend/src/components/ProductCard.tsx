import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    images?: string[];
    description?: string;
    category?: string;
    stock?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    // Convert current product to context Product type
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images || [product.image || ''],
      stock: product.stock || 0
    };

    try {
      setIsAddingToCart(true);
      await addToCart(cartProduct);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }

    if (isTogglingFavorite) return;

    try {
      setIsTogglingFavorite(true);
      if (isFavorite(product._id)) {
        await removeFromFavorites(product._id);
        toast.success('Removed from wishlist');
      } else {
        await addToFavorites(product);
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[3/4] bg-gray-100">
          <img
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/500'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition disabled:opacity-70"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite(product._id) ? 'fill-pink-600 text-pink-600' : 'text-gray-600'
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex items-center space-x-1 bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-pink-700 transition disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
