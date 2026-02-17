/**
 * Production Environment Configuration
 * This file is used during production build (ng build)
 */

export const environment = {
  production: true,
  name: 'production',
  
  // API Configuration
  apiUrl: 'https://api.resumeinone.com/api/v1', // Update with your production API URL
  apiTimeout: 30000,
  
  // Feature Flags
  enableDebugMode: false,
  enableConsoleLogging: false,
  enableErrorReporting: true,
  enableAnalytics: true,
  
  // Storage Configuration
  storagePrefix: '_app_',
  useEncryption: true,
  storageType: 'localStorage' as 'localStorage' | 'sessionStorage',
  
  // Authentication
  tokenExpiryBuffer: 300, // 5 minutes
  sessionTimeout: 3600000, // 1 hour
  
  // Application
  appName: '1mincv.com',
  appVersion: '1.0.0',
  
  // Validation
  minPasswordLength: 8, // Stricter in production
  maxPasswordLength: 128,
  minNameLength: 2,
  
  // UI
  itemsPerPage: 10,
  maxFileSize: 5242880, // 5MB
  allowedFileTypes: ['pdf', 'doc', 'docx', 'txt']
};
