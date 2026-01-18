import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import ReviewModal from '../components/ReviewModal';
import StarRating from '../components/StarRating';

interface PurchasedProduct {
  orderId: string;
  product: {
    _id: string;
    name: string;
    images: string[];
  };
  hasReviewed: boolean;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export default function Reviews() {
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<PurchasedProduct | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  const fetchPurchasedProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/user/purchased-products');
      setPurchasedProducts(response.data.purchasedProducts);
    } catch (error: any) {
      toast.error('Failed to fetch purchased products');
    } finally {
      setLoading(false);
    }
  };

  const handleWriteReview = (product: PurchasedProduct) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  const handleReviewAdded = () => {
    fetchPurchasedProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Reviews</h1>

        {purchasedProducts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No Purchased Products</h2>
            <p className="text-gray-500">Purchase products to write reviews</p>
          </div>
        ) : (
          <div className="space-y-6">
            {purchasedProducts.map((item, index) => (
              <div key={`${item.product._id}-${index}`} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.product.name}
                    </h3>
                    
                    {item.hasReviewed ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <StarRating rating={item.review!.rating} readonly size="sm" />
                          <span className="text-sm text-gray-600">
                            Reviewed on {new Date(item.review!.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                          "{item.review!.comment}"
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <p className="text-gray-600">You haven't reviewed this product yet</p>
                        <button
                          onClick={() => handleWriteReview(item)}
                          className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
                        >
                          <Star className="w-4 h-4" />
                          <span>Write Review</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <ReviewModal
            isOpen={showReviewModal}
            onClose={() => {
              setShowReviewModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct.product}
            orderId={selectedProduct.orderId}
            onReviewAdded={handleReviewAdded}
          />
        )}
      </div>
    </div>
  );
}