# In-Memory State Management & HTTP Service Documentation

## Overview

This application now uses **in-memory state management** instead of localStorage/sessionStorage. All user data and authentication tokens are stored in memory and will be cleared on page refresh.

## Architecture

### 1. **StateService** (`src/app/core/services/state.service.ts`)

In-memory state management service that stores all application state.

#### Features:
- ✅ Stores authentication state (token, user, isAuthenticated)
- ✅ Provides Observable streams for reactive updates
- ✅ Generic key-value state storage
- ✅ Token expiration checking
- ✅ No localStorage or sessionStorage usage

#### Usage Example:

```typescript
import { StateService } from './core/services/state.service';

constructor(private stateService: StateService) {}

// Set auth state
this.stateService.setAuthState(token, user, refreshToken);

// Get current user
const user = this.stateService.getCurrentUser();

// Check authentication
if (this.stateService.isAuthenticated()) {
  console.log('User is logged in');
}

// Subscribe to auth state changes
this.stateService.authState$.subscribe(state => {
  console.log('Auth state changed:', state);
});

// Generic state management
this.stateService.setState('myKey', { some: 'data' });
const data = this.stateService.getState('myKey');

// Clear all state (logout)
this.stateService.clearAuthState();
```

### 2. **HttpService** (`src/app/core/services/http.service.ts`)

Generic HTTP service with all HTTP methods and automatic token injection.

#### Features:
- ✅ All HTTP methods: GET, POST, PUT, DELETE, PATCH
- ✅ Automatic Authorization header injection
- ✅ API response unwrapping methods
- ✅ File upload/download support
- ✅ Centralized error handling
- ✅ URL builder with query parameters

#### HTTP Methods:

```typescript
import { HttpService } from './core/services/http.service';

constructor(private httpService: HttpService) {}

// GET request
this.httpService.get<User>('/api/user/profile').subscribe(user => {
  console.log(user);
});

// POST request
this.httpService.post<Response>('/api/data', { name: 'John' }).subscribe(response => {
  console.log(response);
});

// PUT request
this.httpService.put<Response>('/api/user/1', { name: 'Jane' }).subscribe(response => {
  console.log(response);
});

// PATCH request
this.httpService.patch<Response>('/api/user/1', { email: 'new@email.com' }).subscribe(response => {
  console.log(response);
});

// DELETE request
this.httpService.delete<Response>('/api/user/1').subscribe(response => {
  console.log(response);
});
```

#### API Response Unwrapping:

For APIs that return `{ status: boolean, message: string, data: T }` format:

```typescript
// Instead of manually checking response.status
this.httpService.getApi<User>('/api/user/profile').subscribe(user => {
  // 'user' is already unwrapped from response.data
  console.log(user);
});

// POST with unwrapping
this.httpService.postApi<User>('/api/user', userData).subscribe(user => {
  console.log(user);
});
```

#### File Operations:

```typescript
// Upload file
const file = event.target.files[0];
this.httpService.uploadFile('/api/upload', file, 'file', { userId: 123 })
  .subscribe(response => {
    console.log('File uploaded');
  });

// Download file
this.httpService.downloadFile('/api/download/123', 'document.pdf')
  .subscribe(blob => {
    console.log('File downloaded');
  });
```

#### Custom Headers:

```typescript
const options = {
  headers: {
    'X-Custom-Header': 'value',
    'Another-Header': 'another-value'
  }
};

this.httpService.get<Data>('/api/data', options).subscribe(data => {
  console.log(data);
});
```

#### Query Parameters:

```typescript
// Build URL with query params
const url = this.httpService.buildUrl('/api/users', {
  page: 1,
  pageSize: 10,
  search: 'john'
});
// Result: /api/users?page=1&pageSize=10&search=john

// Or use params in options
const options = {
  params: this.httpService.createParams({
    page: 1,
    pageSize: 10
  })
};

this.httpService.get<Users>('/api/users', options).subscribe(users => {
  console.log(users);
});
```

### 3. **AuthService** (`src/app/auth/auth.service.ts`)

Updated authentication service using StateService and HttpService.

#### Features:
- ✅ Integrated with backend API (http://localhost:5299/api)
- ✅ In-memory token storage
- ✅ Automatic token injection in requests
- ✅ Token expiration checking
- ✅ Observable streams for auth state

#### API Endpoints:

```typescript
// Login
POST /api/account/login
Body: { email: string, password: string }
Response: { status: boolean, message: string, data: { token, refreshToken, user } }

// Register
POST /api/account/register
Body: { email: string, password: string }
Response: { status: boolean, message: string, data: { token, refreshToken, user } }

// Forgot Password
POST /api/account/forgot-password
Body: { email: string }
Response: { status: boolean, message: string }

// Refresh Token
GET /api/account/refresh-token
Headers: Authorization: Bearer {token}
Response: { status: boolean, message: string, data: { token, refreshToken, user } }
```

#### Usage Example:

```typescript
import { AuthService } from './auth/auth.service';

constructor(private authService: AuthService) {}

// Login
this.authService.login({ email, password }).subscribe({
  next: (response) => {
    if (response.status) {
      console.log('Logged in!', response.data.user);
      this.router.navigate(['/dashboard']);
    }
  },
  error: (error) => {
    console.error('Login failed:', error.message);
  }
});

// Register
this.authService.register({ email, password }).subscribe({
  next: (response) => {
    if (response.status) {
      console.log('Registered!', response.data.user);
    }
  }
});

// Check authentication
if (this.authService.isAuthenticated()) {
  console.log('User is logged in');
}

// Get current user (synchronous)
const user = this.authService.currentUserValue;

// Subscribe to user changes (reactive)
this.authService.currentUser$.subscribe(user => {
  console.log('Current user:', user);
});

// Logout
this.authService.logout(); // Clears state and redirects to login

// Debug auth state
this.authService.debugAuthState();
```

## Backend Integration

### API Base URL

The backend API is configured in `auth.service.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5299/api';
```

### API Response Format

All endpoints return a standardized response:

```typescript
{
  "status": true,           // boolean - success/failure
  "message": "Success",     // string - descriptive message
  "data": {                 // object - actual response data
    "token": "eyJhbGc...",
    "refreshToken": "...",
    "user": {
      "id": "123",
      "email": "user@example.com"
    }
  }
}
```

### Authentication Flow

1. **User logs in or registers**
   - Frontend sends credentials to backend
   - Backend validates and returns JWT token + user data

2. **Token storage**
   - Token is stored in memory via StateService
   - No localStorage/sessionStorage usage

3. **Subsequent requests**
   - HttpService automatically adds `Authorization: Bearer {token}` header
   - Backend validates token and processes request

4. **Token expiration**
   - AuthService checks token expiration before requests
   - If expired, user is logged out automatically

5. **Logout**
   - StateService clears all in-memory data
   - User is redirected to login page

## Important Notes

### ⚠️ Data Persistence

**Data is NOT persisted across page refreshes!**

- All state is stored in memory
- Page refresh will clear all data
- User will need to log in again after refresh

If you need persistence, you have two options:

1. **Add localStorage/sessionStorage** (not recommended by user)
2. **Implement token refresh on app initialization**

### 🔄 Token Refresh on App Init

To maintain sessions across refreshes, you could:

```typescript
// In app.component.ts
ngOnInit() {
  // Try to refresh token from cookie or other persistent storage
  const refreshToken = this.getRefreshTokenFromCookie();
  if (refreshToken) {
    this.authService.refreshToken().subscribe({
      next: () => console.log('Session restored'),
      error: () => console.log('Session expired')
    });
  }
}
```

### 🔒 Security Considerations

**Advantages of in-memory storage:**
- ✅ Not vulnerable to XSS attacks on localStorage
- ✅ Tokens automatically cleared on tab close
- ✅ No persistent storage of sensitive data

**Disadvantages:**
- ❌ User must log in on every page refresh
- ❌ No "remember me" functionality
- ❌ Poor user experience for long sessions

## Testing

### Test the Services

```typescript
// In your component or service
constructor(
  private stateService: StateService,
  private httpService: HttpService,
  private authService: AuthService
) {}

testServices() {
  // Test StateService
  this.stateService.setState('test', { value: 123 });
  console.log('State:', this.stateService.getState('test'));
  
  // Test HttpService
  this.httpService.get('https://jsonplaceholder.typicode.com/users/1')
    .subscribe(data => console.log('HTTP GET:', data));
  
  // Test AuthService
  this.authService.debugAuthState();
}
```

### Test Authentication Flow

1. Navigate to `/register`
2. Fill in email and password
3. Submit form
4. Check console for "✅ Registration successful"
5. Verify redirect to home page
6. Refresh page - should redirect to login (data cleared)

## Migration from Old Service

### Before (using localStorage):

```typescript
// Old way
localStorage.setItem('token', token);
const token = localStorage.getItem('token');
localStorage.removeItem('token');
```

### After (using StateService):

```typescript
// New way
this.stateService.setAuthState(token, user);
const token = this.stateService.getToken();
this.stateService.clearAuthState();
```

## Troubleshooting

### Issue: User gets logged out on page refresh

**Expected behavior** - Data is stored in memory only.

**Solution:** Implement token refresh mechanism or use cookies for refresh tokens.

### Issue: Token not being sent in requests

**Check:**
1. Is user logged in? `this.authService.isAuthenticated()`
2. Is token in state? `this.stateService.getToken()`
3. Check browser Network tab for Authorization header

### Issue: CORS errors

**Solution:** Ensure backend allows CORS from your frontend origin:

```csharp
// In your .NET backend
services.AddCors(options => {
    options.AddPolicy("AllowAngular", builder => {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

## API Documentation

Full API documentation available at:
**http://localhost:5299/index.html**

## Summary

✅ **StateService** - In-memory state management
✅ **HttpService** - Generic HTTP methods with auto-token injection  
✅ **AuthService** - Integrated with backend API
✅ **No localStorage** - All data in memory
✅ **Type-safe** - Full TypeScript support
✅ **Reactive** - Observable streams for state changes
✅ **Centralized** - Single source of truth for HTTP and state

Your application now has a clean, modern architecture with proper separation of concerns!
