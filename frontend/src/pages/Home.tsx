import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { axios, useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Sparkles, Clock } from 'lucide-react';
import { MOCK_PRODUCTS } from '../utils/mockData';
import { API_ENDPOINTS } from '../config/api';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [lastViewedProducts, setLastViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recoLoading, setRecoLoading] = useState(false);
  const [viewedLoading, setViewedLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [usesMockData, setUsesMockData] = useState(false);
  const productsPerPage = 12;

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory]);

  useEffect(() => {
    fetchRecommended();
    if (isAuthenticated) {
      fetchLastViewed();
    }
  }, [isAuthenticated]);

  const fetchRecommended = async () => {
    try {
      setRecoLoading(true);
      const response = await axios.get(`${API_ENDPOINTS.PRODUCTS.GET_ALL}/recommended`);
      setRecommendedProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching recommended products:', error);
    } finally {
      setRecoLoading(false);
    }
  };

  const fetchLastViewed = async () => {
    try {
      setViewedLoading(true);
      const response = await axios.get(`${API_ENDPOINTS.PRODUCTS.GET_ALL}/last-viewed`);
      setLastViewedProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching last viewed products:', error);
    } finally {
      setViewedLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: productsPerPage,
        status: 'approved'
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedCategory && selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      const response = await axios.get(API_ENDPOINTS.PRODUCTS.GET_ALL, { params });
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
      
      // Extract unique categories
      if (response.data.categories) {
        setCategories(response.data.categories);
      }
      setUsesMockData(false);
    } catch (error: any) {
      console.error('Error fetching products:', error.message);
      
      // Only use mock data if backend is truly unavailable
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        console.warn('⚠️ Backend not available - Using mock data for demo');
        console.warn('📍 Expected backend URL:', axios.defaults.baseURL);
        console.warn('💡 To connect: Update VITE_API_URL in .env file and restart dev server');
      }
      
      setUsesMockData(true);
      
      let filteredProducts = [...MOCK_PRODUCTS];
      
      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (selectedCategory && selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
      }
      
      // Extract categories
      const uniqueCategories = [...new Set(MOCK_PRODUCTS.map(p => p.category))];
      setCategories(uniqueCategories);
      
      // Pagination
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setProducts(filteredProducts.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EasyShop</h1>
          <p className="text-xl">Discover amazing products at great prices</p>
          {usesMockData && (
            <p className="mt-4 text-sm bg-yellow-500 text-yellow-900 inline-block px-4 py-2 rounded-md">
              Demo Mode: Backend not connected - showing sample products
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === 'all'
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-600'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        {!searchQuery && selectedCategory === 'all' && recommendedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            </div>
            {recoLoading ? (
              <div className="flex space-x-4 overflow-x-hidden py-4">
                {[1, 2, 4].map((i) => (
                  <div key={i} className="w-64 h-80 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {recommendedProducts.slice(0, 4).map((product: any) => (
                  <ProductCard key={`reco-${product._id}`} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recently Viewed */}
        {!searchQuery && selectedCategory === 'all' && isAuthenticated && lastViewedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
            </div>
            {viewedLoading ? (
              <div className="flex space-x-4 overflow-x-hidden py-4">
                {[1, 2, 4].map((i) => (
                  <div key={i} className="w-64 h-80 bg-gray-200 animate-pulse rounded-lg flex-shrink-0"></div>
                ))}
              </div>
            ) : (
              <div className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide">
                {lastViewedProducts.map((product: any) => (
                  <div key={`viewed-${product._id}`} className="w-64 flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center space-x-2 mb-6 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? 'Search Results' : selectedCategory !== 'all' ? `${selectedCategory} Products` : 'All Products'}
          </h2>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing results for <span className="font-semibold">&quot;{searchQuery}&quot;</span>
            </p>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === page
                              ? 'bg-pink-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 py-2">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}