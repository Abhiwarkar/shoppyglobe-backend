# ShoppyGlobe Ecommerce Backend

A robust Node.js/Express backend for the ShoppyGlobe e-commerce application with MongoDB integration, JWT authentication, and comprehensive cart management.

## 🚀 Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Protected routes
  - User profile management

- **Product Management**
  - Complete product catalog
  - Product details
  - Search and filtering functionality
  - Category management

- **Shopping Cart**
  - Add items to cart
  - Update quantities
  - Remove items
  - Clear cart
  - Cart persistence per user

- **Security**
  - Password hashing with bcrypt
  - JWT token verification
  - Input validation
  - Error handling

## 🛠️ Technologies

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Cors** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger

## 📋 Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or Atlas)
- npm or yarn

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhiwarkar/shoppyglobe-backend.git
   cd shoppyglobe-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shoppyglobe
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   FRONTEND_URL=http://localhost:3000
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| GET | `/api/products/search?term=keyword` | Search products | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user cart | Private |
| POST | `/api/cart` | Add item to cart | Private |
| PUT | `/api/cart/:itemId` | Update cart item | Private |
| DELETE | `/api/cart/:itemId` | Remove item from cart | Private |
| DELETE | `/api/cart` | Clear cart | Private |

## 🔗 Connecting with Frontend

The backend is designed to work seamlessly with the ShoppyGlobe React frontend. To connect:

1. Ensure the backend is running on port 5000
2. Update the frontend API URL configuration to point to `http://localhost:5000/api`
3. Handle authentication tokens in frontend requests

## 🧪 Testing

### Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension in VS Code
2. Import the collection from `thunder-collection_ShoppyGlobe.json` (if available)
3. Test each endpoint ensuring proper request bodies and headers

### Manual Testing Steps

1. **Register a user**
   - POST request to `/api/auth/register`
   - Include name, email, and password in request body

2. **Login**
   - POST request to `/api/auth/login`
   - Include email and password in request body
   - Save the returned token

3. **Test Protected Routes**
   - Add the Authorization header: `Bearer YOUR_TOKEN`
   - Test cart endpoints to ensure authentication works

## 📁 Project Structure

```
shoppyglobe-backend/
├── src/
│   ├── config/
│   │   ├── database.js     # MongoDB connection
│   │   └── jwt.js          # JWT configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── productController.js # Product management
│   │   └── cartController.js    # Cart management
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── validation.js        # Input validation
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── User.js        # User schema
│   │   ├── Product.js     # Product schema
│   │   └── Cart.js        # Cart schema
│   ├── routes/
│   │   ├── auth.js        # Authentication routes
│   │   ├── products.js    # Product routes
│   │   └── cart.js        # Cart routes
│   └── utils/
│       └── seeder.js      # Database seeder
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies and scripts
├── README.md              # Documentation
└── server.js              # Main server file
```

## 🛡️ Error Handling

The API uses a centralized error handling mechanism with appropriate HTTP status codes:

- 400: Bad Request (validation errors, invalid input)
- 401: Unauthorized (invalid or missing auth token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource not found)
- 500: Internal Server Error (server-side issues)

## 📝 Development Notes

- The API follows RESTful design principles
- Mongoose models include data validation and middleware
- Authentication uses JWT stored in Authorization header
- Input validation occurs before controller logic

## 🔧 Troubleshooting

- **MongoDB Connection Issues**: Verify MongoDB is running and MONGO_URI is correct
- **JWT Authentication Errors**: Ensure the token format is `Bearer YOUR_TOKEN`
- **CORS Errors**: Check FRONTEND_URL in .env matches your frontend URL



Built with ❤️ by Abhishek Hiwarkar for ShoppyGlobe e-commerce platform
