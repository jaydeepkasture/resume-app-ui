# AppSettings & Environment Configuration Guide

## Overview

The application now uses a centralized configuration system with environment-specific settings. This allows you to easily manage different configurations for development, staging, and production environments.

## File Structure

```
src/
├── environments/
│   ├── environment.ts                    # Production environment
│   └── environment.development.ts        # Development environment
└── app/
    └── core/
        └── config/
            └── app-settings.ts            # Application settings (uses environment)
```

## Environment Files

### 1. **environment.development.ts** (Development)

Used when running `ng serve` or `ng build --configuration=development`

```typescript
export const environment = {
  production: false,
  name: 'development',
  apiUrl: 'http://localhost:5299/api',  // Local backend
  enableDebugMode: true,
  enableConsoleLogging: true,
  // ... more settings
};
```

### 2. **environment.ts** (Production)

Used when running `ng build` or `ng build --configuration=production`

```typescript
export const environment = {
  production: true,
  name: 'production',
  apiUrl: 'https://api.resumeinone.com/api',  // Production backend
  enableDebugMode: false,
  enableConsoleLogging: false,
  // ... more settings
};
```

## AppSettings Configuration

The `app-settings.ts` file imports the environment and provides a centralized configuration object:

```typescript
import { environment } from '../../environments/environment';

export const AppSettings = {
  api: {
    baseUrl: environment.apiUrl,  // Uses environment-specific URL
    timeout: 30000,
    retryAttempts: 3
  },
  auth: {
    tokenExpiryBuffer: 300,
    sessionTimeout: 3600000
  },
  // ... more settings
};
```

## Usage in Your Code

### Import AppSettings

```typescript
import { AppSettings, getApiUrl, isDebugMode } from './core/config/app-settings';
```

### Access Configuration

```typescript
// Get API base URL
const apiUrl = AppSettings.api.baseUrl;
// Result in dev: 'http://localhost:5299/api'
// Result in prod: 'https://api.resumeinone.com/api'

// Get specific API endpoint
const loginUrl = getApiUrl('account/login');
// Result: 'http://localhost:5299/api/account/login'

// Check if debug mode is enabled
if (isDebugMode()) {
  console.log('Debug mode is ON');
}

// Get validation settings
const minPasswordLength = AppSettings.validation.minPasswordLength;
// Result in dev: 6
// Result in prod: 8 (stricter)
```

### Helper Functions

```typescript
// Get API URL with endpoint
const url = getApiUrl('users/profile');

// Check if feature is enabled
if (isFeatureEnabled('enableAnalytics')) {
  // Initialize analytics
}

// Get validation pattern
const emailPattern = getValidationPattern('emailPattern');

// Check environment
if (isProduction()) {
  // Production-specific code
}

// Debug logging (only logs in development)
debugLog('User logged in', userData);

// Error logging (always logs)
errorLog('Failed to load data', error);
```

## Available Settings

### API Configuration
- `baseUrl` - Backend API URL
- `timeout` - Request timeout in milliseconds
- `retryAttempts` - Number of retry attempts for failed requests
- `retryDelay` - Delay between retries

### Authentication
- `tokenKey` - Storage key for auth token
- `refreshTokenKey` - Storage key for refresh token
- `tokenExpiryBuffer` - Buffer time before token expiry
- `sessionTimeout` - Session timeout duration

### Storage
- `prefix` - Storage key prefix
- `useEncryption` - Enable/disable encryption
- `storageType` - 'localStorage' or 'sessionStorage'

### Application
- `name` - Application name
- `version` - Application version
- `environment` - Current environment name
- `production` - Production flag
- `debugMode` - Debug mode flag
- `logLevel` - Logging level

### Features (Feature Flags)
- `enableAnalytics` - Enable analytics
- `enableErrorReporting` - Enable error reporting
- `enableConsoleLogging` - Enable console logging
- `enablePerformanceMonitoring` - Enable performance monitoring
- `enableOfflineMode` - Enable offline mode

### UI
- `defaultTheme` - Default theme ('light' or 'dark')
- `itemsPerPage` - Items per page for pagination
- `maxFileSize` - Maximum file upload size
- `allowedFileTypes` - Allowed file types for upload
- `dateFormat` - Date format string
- `timeFormat` - Time format string

### Validation
- `minPasswordLength` - Minimum password length
- `maxPasswordLength` - Maximum password length
- `minNameLength` - Minimum name length
- `maxNameLength` - Maximum name length
- `phonePattern` - Phone number validation regex
- `emailPattern` - Email validation regex

### Resume
- `maxExperienceEntries` - Max experience entries
- `maxEducationEntries` - Max education entries
- `maxSkills` - Max skills
- `autoSaveInterval` - Auto-save interval in milliseconds

### Notifications
- `duration` - Notification display duration
- `position` - Notification position
- `showCloseButton` - Show close button flag

## How It Works

### Development Mode (`ng serve`)

1. Angular CLI uses `development` configuration
2. `environment.development.ts` is loaded
3. AppSettings uses development values:
   - API URL: `http://localhost:5299/api`
   - Debug mode: ON
   - Console logging: ON
   - Analytics: OFF

### Production Build (`ng build`)

1. Angular CLI uses `production` configuration
2. `environment.ts` is loaded (production file)
3. AppSettings uses production values:
   - API URL: `https://api.resumeinone.com/api`
   - Debug mode: OFF
   - Console logging: OFF
   - Analytics: ON

## Changing Configuration

### For Development

Edit `src/environments/environment.development.ts`:

```typescript
export const environment = {
  // Change backend URL
  apiUrl: 'http://localhost:3000/api',  // Different port
  
  // Enable/disable features
  enableDebugMode: true,
  enableConsoleLogging: true,
  
  // ... other settings
};
```

### For Production

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  // Update production API URL
  apiUrl: 'https://api.yourdomain.com/api',
  
  // Production settings
  enableDebugMode: false,
  enableErrorReporting: true,
  
  // ... other settings
};
```

### For All Environments

Edit `src/app/core/config/app-settings.ts`:

```typescript
export const AppSettings = {
  // Add new setting
  newFeature: {
    enabled: true,
    timeout: 5000
  },
  
  // ... existing settings
};
```

## Adding New Environments

### 1. Create Environment File

Create `src/environments/environment.staging.ts`:

```typescript
export const environment = {
  production: false,
  name: 'staging',
  apiUrl: 'https://staging-api.resumeinone.com/api',
  // ... other settings
};
```

### 2. Update angular.json

Add staging configuration:

```json
"configurations": {
  "production": { ... },
  "development": { ... },
  "staging": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.staging.ts"
      }
    ],
    "optimization": true,
    "sourceMap": false
  }
}
```

### 3. Build for Staging

```bash
ng build --configuration=staging
```

## Examples in Services

### AuthService

```typescript
import { AppSettings } from '../core/config/app-settings';

const API_BASE_URL = AppSettings.api.baseUrl;

login(credentials: LoginDto) {
  return this.http.post(`${API_BASE_URL}/account/login`, credentials);
}
```

### StateService

```typescript
import { AppSettings } from '../config/app-settings';

private readonly STORAGE_PREFIX = AppSettings.storage.prefix;
private readonly USE_ENCRYPTION = AppSettings.storage.useEncryption;
```

## Best Practices

1. **Never hardcode URLs** - Always use AppSettings
2. **Use environment files** for environment-specific values
3. **Use AppSettings** for app-wide constants
4. **Use feature flags** to enable/disable features
5. **Keep secrets out** - Never commit API keys or secrets
6. **Use helper functions** - `getApiUrl()`, `isDebugMode()`, etc.

## Troubleshooting

### Issue: Wrong API URL being used

**Check:**
1. Which environment are you running? (`ng serve` = development)
2. Check `environment.development.ts` for correct URL
3. Verify AppSettings is importing from environment

### Issue: Changes not reflecting

**Solution:**
1. Stop `ng serve`
2. Clear browser cache
3. Restart `ng serve`
4. Hard refresh browser (Ctrl+Shift+R)

### Issue: Build fails with environment error

**Solution:**
1. Ensure all environment files exist
2. Check angular.json fileReplacements configuration
3. Verify environment file syntax

## Summary

✅ **Environment Files Created**
- `environment.ts` - Production
- `environment.development.ts` - Development

✅ **AppSettings Updated**
- Imports from environment files
- Centralized configuration
- Helper functions

✅ **Services Updated**
- AuthService uses AppSettings
- StateService uses AppSettings

✅ **Angular.json Configured**
- File replacements for environments
- Build configurations

Now you can easily manage different configurations for different environments! 🎉
