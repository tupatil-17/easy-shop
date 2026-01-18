import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../context/AuthContext';
import { toast } from 'sonner';
import { FileText, CreditCard, MapPin, CheckCircle, Upload } from 'lucide-react';

export default function ApplyServiceProvider() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    panNumber: '',
    address: ''
  });
  const [aadhaarCardPhoto, setAadhaarCardPhoto] = useState<File | null>(null);
  const [panCardPhoto, setPanCardPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.aadhaarNumber || !formData.panNumber || !formData.address || !aadhaarCardPhoto || !panCardPhoto) {
      toast.error('Please fill in all fields and upload required documents');
      return;
    }

    if (formData.aadhaarNumber.length !== 12) {
      toast.error('Aadhaar number must be 12 digits');
      return;
    }

    if (formData.panNumber.length !== 10) {
      toast.error('PAN number must be 10 characters');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('aadhaarNumber', formData.aadhaarNumber);
      data.append('panNumber', formData.panNumber);
      data.append('address', formData.address);
      data.append('aadhaarCardPhoto', aadhaarCardPhoto);
      data.append('panCardPhoto', panCardPhoto);

      await axios.post('/users/apply-service-provider', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Application submitted successfully! Waiting for admin approval.');
      navigate('/user/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Application failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-pink-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Become a Service Provider
            </h1>
            <p className="text-gray-600">
              Fill out the form below to apply. Your application will be reviewed by our admin team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>Aadhaar Card Number</span>
                </div>
              </label>
              <input
                id="aadhaarNumber"
                name="aadhaarNumber"
                type="text"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                maxLength={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter 12-digit Aadhaar number"
              />
            </div>

            <div>
              <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <span>PAN Card Number</span>
                </div>
              </label>
              <input
                id="panNumber"
                name="panNumber"
                type="text"
                value={formData.panNumber}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 uppercase"
                placeholder="Enter 10-character PAN number"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>Business Address</span>
                </div>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter your complete business address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span>Aadhaar Card Photo</span>
                  </div>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="aadhaarCardPhoto" className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          id="aadhaarCardPhoto"
                          name="aadhaarCardPhoto"
                          type="file"
                          className="sr-only"
                          accept="image/*,.pdf"
                          onChange={(e) => setAadhaarCardPhoto(e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 2MB</p>
                    {aadhaarCardPhoto && (
                      <p className="text-sm text-green-600 font-medium mt-2">{aadhaarCardPhoto.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-gray-500" />
                    <span>PAN Card Photo</span>
                  </div>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="panCardPhoto" className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          id="panCardPhoto"
                          name="panCardPhoto"
                          type="file"
                          className="sr-only"
                          accept="image/*,.pdf"
                          onChange={(e) => setPanCardPhoto(e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 2MB</p>
                    {panCardPhoto && (
                      <p className="text-sm text-green-600 font-medium mt-2">{panCardPhoto.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Your account will remain inactive until approved by the admin. 
                You will receive a notification once your application is reviewed.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition disabled:opacity-50 font-semibold"
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
