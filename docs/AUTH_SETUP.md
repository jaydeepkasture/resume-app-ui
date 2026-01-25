# Authentication Setup Guide

## Overview

This application now includes a complete authentication system with:
- ✅ **Login Page** - Email and password authentication
- ✅ **Signup/Register Page** - User registration with email and password
- ✅ **HTTP Service** - Complete AuthService with all authentication methods
- ✅ **Backend API** - Example Node.js/Express server with auth endpoints
- ✅ **Route Protection** - Auth guard to protect routes
- ✅ **Profile Management** - User profile viewing and editing

## Quick Start

### 1. Start the Backend Server

The backend server handles authentication and resume enhancement.

```bash
# Install dependencies (first time only)
npm install express cors

# Start the server
node example-backend-server.js
```

The server will start on `http://localhost:3000` with the following endpoints:

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset

**User Management:**
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)

**Resume:**
- `POST /api/resume/enhance` - Enhance resume with AI

**Health Check:**
- `GET /api/health` - Check API status

### 2. Access the Application

The Angular application is already running on `http://localhost:4200`

**Available Routes:**
- `/login` - Login page
- `/register` - Signup/registration page
- `/forgot-password` - Password reset page
- `/editor` - Resume editor (protected, requires login)
- `/profile` - User profile (protected, requires login)

## Features

### Login Page (`/login`)
- Email and password authentication
- Password visibility toggle
- Remember me option
- Form validation
- Error handling
- Beautiful gradient design with animations

### Register Page (`/register`)
- Full name, email, and password fields
- Optional phone number
- Password confirmation with matching validation
- Terms and conditions acceptance
- Form validation
- Password visibility toggles
- Matching design with login page

### HTTP Service (`AuthService`)

Located at: `src/app/auth/auth.service.ts`

**Key Methods:**
```typescript
// Authentication
login(credentials: LoginRequest): Observable<AuthResponse>
register(userData: RegisterRequest): Observable<AuthResponse>
logout(): void

// Password Management
forgotPassword(data: ForgotPasswordRequest): Observable<AuthResponse>
resetPassword(data: ResetPasswordRequest): Observable<AuthResponse>
changePassword(oldPassword: string, newPassword: string): Observable<AuthResponse>

// Profile Management
getProfile(): Observable<User>
updateProfile(userData: Partial<User>): Observable<AuthResponse>

// Utilities
isAuthenticated(): boolean
getToken(): string | null
get currentUserValue(): User | null
```

**Usage Example:**
```typescript
// In your component
constructor(private authService: AuthService) {}

// Login
this.authService.login({ email, password }).subscribe({
  next: (response) => {
    if (response.success) {
      console.log('Logged in!', response.user);
    }
  },
  error: (error) => {
    console.error('Login failed:', error.message);
  }
});

// Register
this.authService.register({ name, email, password }).subscribe({
  next: (response) => {
    if (response.success) {
      console.log('Registered!', response.user);
    }
  }
});

// Check if authenticated
if (this.authService.isAuthenticated()) {
  console.log('User is logged in');
}

// Get current user
const user = this.authService.currentUserValue;
```

### Auth Guard

Located at: `src/app/auth/auth.guard.ts`

Protects routes from unauthorized access. Automatically redirects to login page if user is not authenticated.

**Usage in Routes:**
```typescript
{
  path: 'protected-route',
  component: YourComponent,
  canActivate: [AuthGuard]
}
```

## Backend Server Details

### In-Memory Storage
⚠️ **Note:** The example backend uses in-memory storage. Data will be lost when the server restarts.

For production, replace with:
- PostgreSQL/MySQL for user data
- Redis for sessions
- Proper password hashing (bcrypt)
- JWT with proper secret keys

### API Request/Response Examples

**Register:**
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}

Response:
{
  "success": true,
  "token": "eyJ1c2VySWQiOiJ1c2VyXzE3MDY...",
  "user": {
    "id": "user_1706...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "createdAt": "2026-01-20T16:18:42.000Z"
  },
  "message": "Registration successful"
}
```

**Login:**
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJ1c2VySWQiOiJ1c2VyXzE3MDY...",
  "user": {
    "id": "user_1706...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "createdAt": "2026-01-20T16:18:42.000Z"
  },
  "message": "Login successful"
}
```

**Get Profile (with authentication):**
```bash
GET http://localhost:3000/api/user/profile
Authorization: Bearer eyJ1c2VySWQiOiJ1c2VyXzE3MDY...

Response:
{
  "id": "user_1706...",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "createdAt": "2026-01-20T16:18:42.000Z"
}
```

## Configuration

### Update API URL

If your backend is running on a different URL, update it in `src/app/auth/auth.service.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000/api'; // Change this
```

### Token Storage

Tokens are stored in `localStorage`:
- `auth_token` - JWT token
- `current_user` - User data

## Security Considerations

⚠️ **For Production:**

1. **Password Hashing:** Use bcrypt or similar
2. **HTTPS:** Always use HTTPS in production
3. **JWT Secret:** Use a strong, random secret key
4. **Token Expiration:** Implement proper token expiration and refresh
5. **CORS:** Configure CORS properly for your domain
6. **Input Validation:** Add server-side validation
7. **Rate Limiting:** Implement rate limiting for auth endpoints
8. **SQL Injection:** Use parameterized queries
9. **XSS Protection:** Sanitize user inputs
10. **CSRF Protection:** Implement CSRF tokens

## Testing

### Test User Registration
1. Navigate to `http://localhost:4200/register`
2. Fill in the form with valid data
3. Click "Create Account"
4. You should be redirected to the editor

### Test User Login
1. Navigate to `http://localhost:4200/login`
2. Enter the credentials you registered with
3. Click "Sign In"
4. You should be redirected to the editor

### Test Protected Routes
1. Without logging in, try to access `http://localhost:4200/editor`
2. You should be redirected to the login page
3. After logging in, you can access protected routes

## Troubleshooting

### CORS Errors
Make sure the backend server is running and CORS is enabled:
```javascript
app.use(cors());
```

### Token Expired
Clear localStorage and login again:
```javascript
localStorage.clear();
```

### Backend Not Running
Start the backend server:
```bash
node example-backend-server.js
```

### Port Already in Use
Change the port in `example-backend-server.js`:
```javascript
const PORT = 3001; // Change from 3000
```

## Next Steps

1. ✅ Authentication system is complete
2. 🔄 Integrate with a real database (PostgreSQL, MongoDB, etc.)
3. 🔄 Add email verification
4. 🔄 Implement password reset functionality
5. 🔄 Add social login (Google, GitHub, etc.)
6. 🔄 Implement refresh tokens
7. 🔄 Add two-factor authentication (2FA)

## Support

For issues or questions, check:
- Angular documentation: https://angular.io/docs
- Express documentation: https://expressjs.com/
- JWT documentation: https://jwt.io/
