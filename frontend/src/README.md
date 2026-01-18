# EasyShop - E-Commerce Frontend

A modern, full-featured e-commerce frontend built with React, TypeScript, and Tailwind CSS. This application features role-based authentication and authorization with support for Users, Service Providers, and Admins.

## 🚀 Features

### User Features
- ✅ User registration and login
- ✅ Browse and search products with pagination
- ✅ View product details
- ✅ Add products to cart with quantity management
- ✅ Add products to wishlist/favorites
- ✅ User profile management
- ✅ Apply to become a Service Provider

### Service Provider Features
- ✅ Add new products (pending admin approval)
- ✅ Edit and delete own products
- ✅ View product status (pending, approved, rejected)
- ✅ Product dashboard

### Admin Features
- ✅ Approve/reject service provider applications
- ✅ Approve/reject product listings
- ✅ Delete any product
- ✅ Remove users or service providers
- ✅ View all users, products, and applications

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📦 Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd easyshop-frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure your backend API URL

Edit `/config/api.ts` and update the `BASE_URL`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Update with your backend URL
  // ...
};
```

Or create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm run dev
```

## 🔌 Backend Integration

This frontend is designed to work with your existing backend. Make sure your backend has the following endpoints:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Product Endpoints
- `GET /api/products` - Get all approved products (with pagination, search, category filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Service Provider only)
- `PATCH /api/products/:id` - Update product (Service Provider only, own products)
- `DELETE /api/products/:id` - Delete product (Service Provider only, own products)
- `GET /api/products/service-provider/me` - Get service provider's products

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/:productId` - Add item to cart
- `DELETE /api/cart/:productId` - Remove from cart

### Favorites Endpoints
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/:productId` - Add to favorites
- `DELETE /api/favorites/:productId` - Remove from favorites

### User Endpoints
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update profile
- `POST /api/users/apply-service-provider` - Apply to become service provider

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/service-provider-applications` - Get pending applications
- `PATCH /api/admin/approve-service-provider/:id` - Approve application
- `PATCH /api/admin/reject-service-provider/:id` - Reject application
- `GET /api/admin/pending-products` - Get all products (including pending)
- `PATCH /api/admin/approve-product/:id` - Approve product
- `DELETE /api/admin/products/:id` - Delete any product

## 🔐 Authentication Flow

The application uses JWT-based authentication with access and refresh tokens:

1. User logs in → Backend returns access token
2. Access token stored in localStorage
3. All API requests include Authorization header with access token
4. If access token expires (401 error) → Automatically refresh using refresh token
5. Refresh token stored as HTTP-only cookie (secure)

## 📁 Project Structure

```
/
├── config/
│   └── api.ts              # API configuration
├── context/
│   ├── AuthContext.tsx     # Authentication state management
│   ├── CartContext.tsx     # Cart state management
│   └── FavoritesContext.tsx # Favorites state management
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer component
│   ├── ProductCard.tsx     # Product card component
│   └── ProtectedRoute.tsx  # Route protection wrapper
├── pages/
│   ├── Home.tsx            # Home page with products
│   ├── Login.tsx           # Login page
│   ├── Register.tsx        # Registration page
│   ├── ProductDetail.tsx   # Product detail page
│   ├── Cart.tsx            # Shopping cart
│   ├── Favorites.tsx       # Wishlist
│   ├── Profile.tsx         # User profile
│   ├── UserDashboard.tsx   # User dashboard
│   ├── ApplyServiceProvider.tsx # Service provider application
│   ├── ServiceProviderDashboard.tsx # Service provider dashboard
│   ├── AdminDashboard.tsx  # Admin dashboard
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Main app component with routes
└── main.tsx               # Entry point
```

## 🎨 Customization

### Changing Colors
The app uses Tailwind CSS with pink as the primary color. To change:

1. Search for `pink-600`, `pink-700`, etc. in all files
2. Replace with your preferred color (e.g., `blue-600`, `purple-600`)

### Adding New Features
1. Add new context providers in `/context` for state management
2. Create new pages in `/pages`
3. Add routes in `/App.tsx`
4. Update API endpoints in `/config/api.ts`

## 🔒 Security Considerations

- Access tokens stored in localStorage (consider using httpOnly cookies for production)
- Refresh tokens should be httpOnly cookies
- Implement CSRF protection
- Enable CORS properly on backend
- Validate all user inputs
- Implement rate limiting on backend

## 🐛 Troubleshooting

### CORS Issues
If you're getting CORS errors, make sure your backend has proper CORS configuration:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

### 401 Unauthorized Errors
- Check if access token is being sent in headers
- Verify token hasn't expired
- Ensure refresh token mechanism is working

### Products Not Showing
- Verify products are approved in backend
- Check API endpoint returns correct data structure
- Look at browser console for errors

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub or contact support.

---

Made with ❤️ by the EasyShop Team
