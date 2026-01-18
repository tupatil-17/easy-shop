import { useState, useEffect } from 'react';
import { axios } from '../context/AuthContext';
import { toast } from 'sonner';
import { Users, Package, UserCheck, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'applications'>('applications');
  const [applications, setApplications] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'applications') {
        const response = await axios.get('/admin/service-provider-applications');
        setApplications(response.data || []);
      } else if (activeTab === 'products') {
        const response = await axios.get('/admin/pending-products');
        setProducts(response.data || []);
      } else if (activeTab === 'users') {
        const response = await axios.get('/admin/users');
        setUsers(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveApplication = async (userId: string) => {
    try {
      await axios.patch(`/admin/approve-service-provider/${userId}`);
      toast.success('Application approved!');
      fetchData();
    } catch (error) {
      toast.error('Failed to approve application');
    }
  };

  const handleRejectApplication = async (userId: string) => {
    try {
      await axios.patch(`/admin/reject-service-provider/${userId}`);
      toast.success('Application rejected');
      fetchData();
    } catch (error) {
      toast.error('Failed to reject application');
    }
  };

  const handleApproveProduct = async (productId: string) => {
    try {
      await axios.patch(`/admin/approve-product/${productId}`);
      toast.success('Product approved!');
      fetchData();
    } catch (error) {
      toast.error('Failed to approve product');
    }
  };

  const handleRejectProduct = async (productId: string) => {
    try {
      await axios.patch(`/admin/reject-product/${productId}`);
      toast.success('Product rejected');
      fetchData();
    } catch (error) {
      toast.error('Failed to reject product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await axios.delete(`/admin/products/${productId}`);
      toast.success('Product deleted!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`/admin/users/${userId}`);
      toast.success('User deleted!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                activeTab === 'applications'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <UserCheck className="w-5 h-5" />
                <span>Applications</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                activeTab === 'products'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Products</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                activeTab === 'users'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Users</span>
              </div>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <>
            {/* Service Provider Applications */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-lg">
                    <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No pending applications</p>
                  </div>
                ) : (
                  applications.map((app: any) => (
                    <div key={app._id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {app.username || app.email}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>Email:</strong> {app.email}</p>
                            {app.serviceProviderDetails && (
                              <>
                                <p><strong>Aadhaar:</strong> {app.serviceProviderDetails.aadhaarNumber}</p>
                                <p><strong>PAN:</strong> {app.serviceProviderDetails.panNumber}</p>
                                <p><strong>Address:</strong> {app.serviceProviderDetails.address}</p>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-semibold mb-1">Aadhaar Card:</p>
                                    <a 
                                      href={app.serviceProviderDetails.aadhaarCardPhoto} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-pink-600 hover:text-pink-500 flex items-center space-x-1"
                                    >
                                      <Package className="w-4 h-4" />
                                      <span>View Document</span>
                                    </a>
                                  </div>
                                  <div>
                                    <p className="font-semibold mb-1">PAN Card:</p>
                                    <a 
                                      href={app.serviceProviderDetails.panCardPhoto} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-pink-600 hover:text-pink-500 flex items-center space-x-1"
                                    >
                                      <Package className="w-4 h-4" />
                                      <span>View Document</span>
                                    </a>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveApplication(app._id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectApplication(app._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Pending Products */}
            {activeTab === 'products' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="col-span-full text-center py-20 bg-white rounded-lg">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No products to review</p>
                  </div>
                ) : (
                  products.map((product: any) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={product.images && product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            product.status === 'approved' 
                              ? 'bg-green-100 text-green-800'
                              : product.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                        {product.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        )}
                        <p className="text-lg font-bold text-pink-600 mb-1">₹{product.price}</p>
                        {product.serviceProviderId && (
                          <p className="text-xs text-gray-500 mb-3">
                            Service Provider: {product.serviceProviderId.username || product.serviceProviderId.email}
                          </p>
                        )}
                        <div className="space-y-2">
                          {product.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApproveProduct(product._id)}
                                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectProduct(product._id)}
                                className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition text-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition flex items-center justify-center space-x-1 text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* All Users */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        users.map((user: any) => (
                          <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {user.username || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : user.role === 'service_provider'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.role === 'service_provider' && (
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.serviceProviderApplication === 'approved' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {user.serviceProviderApplication === 'approved' ? 'Approved' : 
                                   user.serviceProviderApplication === 'pending' ? 'Pending' :
                                   user.serviceProviderApplication === 'rejected' ? 'Rejected' : 'N/A'}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {user.role !== 'admin' && (
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="text-red-600 hover:text-red-800 transition"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
