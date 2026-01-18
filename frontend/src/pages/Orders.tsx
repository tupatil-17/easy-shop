import { useEffect, useState } from 'react';
import { axios } from '../context/AuthContext';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  shippingAddress: {
    address: string;
    pincode: string;
  };
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/payment/user-orders');
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No products ordered yet</h2>
          <p className="text-gray-600 mb-6">Your order history will appear here!</p>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-pink-600" />
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Order Placed</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
                    <p className="text-sm font-bold text-gray-900">₹{order.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Status</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      order.status === 'paid' || order.status === 'delivered' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Order #</p>
                  <p className="text-xs font-mono text-gray-600">{order._id}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product?.images?.[0] || 'https://via.placeholder.com/150'}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 hover:text-pink-600 cursor-pointer"
                            onClick={() => navigate(`/product/${item.product?._id}`)}>
                          {item.product?.name || 'Product unavailable'}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <div className="text-right">
                         <button 
                          onClick={() => navigate(`/product/${item.product?._id}`)}
                          className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center gap-1"
                         >
                          View Item <ChevronRight className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-pink-50/50 px-6 py-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-700">Shipping to:</span> {order.shippingAddress.address}, {order.shippingAddress.pincode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
