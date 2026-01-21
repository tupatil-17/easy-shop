import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { axios } from '../context/AuthContext';
import { toast } from 'sonner';
import { User, Mail, Edit2, Save, X, Camera } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profilePicture || null);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    address: user?.address || user?.serviceProviderDetails?.address || ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.AUTH.ME);
        if (response.data.user) {
          updateUser(response.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        address: user.address || user.serviceProviderDetails?.address || ''
      });
      if (user.profilePicture) {
        setPreviewUrl(user.profilePicture);
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const submitData = new FormData();
      submitData.append('username', formData.username);
      submitData.append('email', formData.email);
      submitData.append('address', formData.address);
      if (selectedFile) {
        submitData.append('profilePicture', selectedFile);
      }

      const response = await axios.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      updateUser(response.data.user);
      setIsEditing(false);
      setSelectedFile(null);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
      address: user?.address || user?.serviceProviderDetails?.address || ''
    });
    setPreviewUrl(user?.profilePicture || null);
    setSelectedFile(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-pink-200 shadow-lg">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-pink-600" />
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user?.username}</h1>
                  <p className="text-pink-100">
                    {user?.role === 'admin' ? 'Administrator' : 
                     user?.role === 'service_provider' ? 'Service Provider' : 'Customer'}
                  </p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-pink-600 px-4 py-2 rounded-md hover:bg-pink-50 transition flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-white text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <p className="text-gray-900 text-lg">{user?.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <p className="text-gray-900 text-lg">{user?.email}</p>
              </div>
            </div>

            {user?.serviceProviderApplication !== 'none' && (
              <>
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Provider Details</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <p className="text-gray-900 text-lg">{user?.serviceProviderDetails?.aadhaarNumber || 'Processing...'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number
                  </label>
                  <p className="text-gray-900 text-lg">{user?.serviceProviderDetails?.panNumber || 'Processing...'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Status
                  </label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    user?.serviceProviderApplication === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : user?.serviceProviderApplication === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.serviceProviderApplication === 'approved' ? 'Approved' : 
                     user?.serviceProviderApplication === 'pending' ? 'Pending Approval' : 
                     user?.serviceProviderApplication === 'rejected' ? 'Rejected' : 'Not Applied'}
                  </span>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your address"
                />
              ) : (
                <p className="text-gray-900">
                  {user?.address || user?.serviceProviderDetails?.address || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
