

export const API_CONFIG = {
  // Base URL for your backend API
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // Timeout for API requests (in milliseconds)
  TIMEOUT: 30000,
  
  // Enable/disable credentials (cookies, authorization headers, etc.)
  WITH_CREDENTIALS: true,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  
  // Products
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: (id: string) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    MY_PRODUCTS: '/products/service-provider/me',
  },
  
  // Cart
  CART: {
    GET: '/users/cart',
    ADD: (productId: string) => `/users/cart/${productId}`,
    UPDATE: (productId: string) => `/users/cart/${productId}`,
    REMOVE: (productId: string) => `/users/cart/${productId}`,
    CLEAR: '/users/cart/clear',
  },
  
  // Favorites
  FAVORITES: {
    GET: '/users/favourites',
    ADD: (productId: string) => `/users/favourites/${productId}`,
    REMOVE: (productId: string) => `/users/favourites/${productId}`,
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    APPLY_SERVICE_PROVIDER: '/users/apply-service-provider',
  },
  
  // Admin
  ADMIN: {
    GET_USERS: '/admin/users',
    DELETE_USER: (id: string) => `/admin/users/${id}`,
    GET_APPLICATIONS: '/admin/service-provider-applications',
    APPROVE_APPLICATION: (id: string) => `/admin/approve-service-provider/${id}`,
    REJECT_APPLICATION: (id: string) => `/admin/reject-service-provider/${id}`,
    GET_PENDING_PRODUCTS: '/admin/pending-products',
    APPROVE_PRODUCT: (id: string) => `/admin/approve-product/${id}`,
    REJECT_PRODUCT: (id: string) => `/admin/reject-product/${id}`,
    DELETE_PRODUCT: (id: string) => `/admin/products/${id}`,
  },
  
  // Payment & Orders
  PAYMENT: {
    CREATE_INTENT: '/payment/create-payment-intent',
    CONFIRM: '/payment/confirm-payment',
    ORDERS: '/payment/user-orders',
  },
};

export default API_CONFIG;
