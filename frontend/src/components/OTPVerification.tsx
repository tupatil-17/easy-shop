import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

interface OTPVerificationProps {
  userId: string;
  email: string;
  type: 'register' | 'login';
  onSuccess: (data: any) => void;
  onBack: () => void;
}

export default function OTPVerification({ userId, email, type, onSuccess, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      const endpoint = type === 'register' ? '/auth/verify-email' : '/auth/verify-login';
      const response = await axios.post(endpoint, { userId, otp });
      
      toast.success(response.data.message);
      onSuccess(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      if (type === 'register') {
        // For register, we need to trigger registration again
        toast.info('Please register again to get a new OTP');
        onBack();
      } else {
        // For login, we need to trigger login again
        toast.info('Please login again to get a new OTP');
        onBack();
      }
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
            <p className="text-gray-600 mt-2">
              We've sent a 6-digit code to {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition disabled:opacity-50 font-semibold"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-pink-600 hover:text-pink-700 font-semibold disabled:opacity-50"
            >
              Resend OTP
            </button>
            
            <div>
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to {type === 'register' ? 'Registration' : 'Login'}
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> OTP will expire in 10 minutes. Check your spam folder if you don't see the email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}