import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axios } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'sonner';
import { Heart, ShoppingCart, ArrowLeft, Star, MessageSquare } from 'lucide-react';
import { MOCK_PRODUCT_DETAILS } from '../utils/mockData';
import StarRating from '../components/StarRating';
import ReviewModal from '../components/ReviewModal';

interface Review {
  _id: string;
  userId: {
    username: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    if (isAuthenticated) {
      logView();
    }
  }, [id, isAuthenticated]);

  const logView = async () => {
    try {
      await axios.post(`/products/${id}/view`);
    } catch (error) {
      console.error('Failed to log view:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.warn('Product API not available, using mock data');
      
      // Use mock data for demo
      const mockProduct = MOCK_PRODUCT_DETAILS.find(p => p._id === id) || MOCK_PRODUCT_DETAILS[0];
      setProduct(mockProduct);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/products/${id}/reviews`);
      setReviews(response.data.reviews);
      
      // Check if current user has reviewed
      const userReview = response.data.reviews.find((review: Review) => 
        review.userId._id === user?.id
      );
      setUserHasReviewed(!!userReview);
    } catch (error) {
      console.warn('Reviews API not available');
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart(product._id);
      }
      toast.success(`Added ${quantity} item(s) to cart!`);
      setQuantity(1);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      navigate('/login');
      return;
    }

    try {
      if (isFavorite(product._id)) {
        await removeFromFavorites(product._id);
        toast.success('Removed from wishlist');
      } else {
        await addToFavorites(product);
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      navigate('/login');
      return;
    }
    setShowReviewModal(true);
  };

  const handleReviewAdded = () => {
    fetchReviews();
    setShowReviewModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images?.[0] || product.image || 'https://via.placeholder.com/500'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {product.category && (
                <div className="mb-4">
                  <span className="inline-block bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              )}

              <div className="text-3xl font-bold text-pink-600 mb-4">
                ₹{product.price}
              </div>

              {/* Rating Display */}
              {product.averageRating > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <StarRating rating={product.averageRating} readonly />
                  <span className="text-gray-600">({product.totalReviews} reviews)</span>
                </div>
              )}

              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}

              {product.stock !== undefined && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    Stock: <span className="font-semibold">{product.stock} units</span>
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={`px-6 py-3 rounded-md border-2 transition ${
                    isFavorite(product._id)
                      ? 'border-pink-600 bg-pink-50'
                      : 'border-gray-300 hover:border-pink-600'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite(product._id) ? 'fill-pink-600 text-pink-600' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Write Review Button */}
              {!userHasReviewed && (
                <button
                  onClick={handleWriteReview}
                  className="w-full mb-4 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center space-x-2"
                >
                  <Star className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
              )}

              {/* Service Provider Info */}
              {product.serviceProviderId && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-semibold text-gray-900 mb-2">Service Provider Information</h3>
                  <p className="text-gray-600">Sold by: {product.serviceProviderId.username || 'EasyShop Service Provider'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md mt-8 p-6">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{review.userId.username}</h4>
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Modal */}
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          product={product}
          onReviewAdded={handleReviewAdded}
        />
      </div>
    </div>
  );
}