import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth, axios } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../config/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  pincode: string;
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    address: '',
    pincode: ''
  });

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate full name
    if (!shippingAddress.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }
    if (shippingAddress.fullName.length < 2) {
      toast.error('Full name must be at least 2 characters');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(shippingAddress.fullName)) {
      toast.error('Full name can only contain letters and spaces');
      return;
    }

    // Validate phone number
    if (!shippingAddress.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(shippingAddress.phone)) {
      toast.error('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    // Validate address
    if (!shippingAddress.address.trim()) {
      toast.error('Address is required');
      return;
    }
    if (shippingAddress.address.length < 10) {
      toast.error('Address must be at least 10 characters');
      return;
    }

    // Validate pincode
    if (!shippingAddress.pincode.trim()) {
      toast.error('Pincode is required');
      return;
    }
    if (!/^[1-9][0-9]{5}$/.test(shippingAddress.pincode)) {
      toast.error('Please enter a valid 6-digit Indian postal code');
      return;
    }

    try {
      setLoading(true);
      const items = cart.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }));

      const response = await axios.post(API_ENDPOINTS.PAYMENT.CREATE_INTENT, {
        items,
        shippingAddress
      });

      setClientSecret(response.data.clientSecret);
      setOrderId(response.data.orderId);
      setStep(2);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      setLoading(true);
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.username,
            email: user?.email,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        await axios.post(API_ENDPOINTS.PAYMENT.CONFIRM, {
          orderId,
          paymentIntentId: paymentIntent.id
        });
        
        clearCart();
        toast.success('Payment successful!');
        navigate('/user/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className={`flex items-center ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2">Shipping Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-4"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2">Payment</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {step === 1 ? (
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        setShippingAddress({...shippingAddress, fullName: value});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter your full name"
                      maxLength={50}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setShippingAddress({...shippingAddress, phone: value});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      rows={3}
                      placeholder="Enter your complete address"
                      maxLength={200}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Pincode</label>
                    <input
                      type="text"
                      value={shippingAddress.pincode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setShippingAddress({...shippingAddress, pincode: value});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Enter 6-digit pincode"
                      maxLength={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Continue to Payment'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePayment} className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                  
                  <div className="p-4 border border-gray-300 rounded-md">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                        },
                      }}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!stripe || loading}
                      className="flex-1 bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                {cart.map((item) => (
                  <div key={item.product._id} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}