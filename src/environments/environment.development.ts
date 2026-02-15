/**
 * Development Environment Configuration
 * This file is used during development (ng serve)
 */

export const environment = {
  production: false,
  name: 'development',
  
  // API Configuration
  apiUrl: 'https://localhost:7200/api/v1',
  apiTimeout: 30000,
  
  // Feature Flags
  enableDebugMode: true,
  enableConsoleLogging: true,
  enableErrorReporting: false,
  enableAnalytics: false,
  
  // Storage Configuration
  storagePrefix: '_app_dev_',
  useEncryption: true,
  storageType: 'sessionStorage' as 'localStorage' | 'sessionStorage',
  
  // Authentication
  tokenExpiryBuffer: 300, // 5 minutes
  sessionTimeout: 3600000, // 1 hour
  
  // Application
  appName: 'Resume In One Minute',
  appVersion: '1.0.0',
  
  // Validation
  minPasswordLength: 6,
  maxPasswordLength: 128,
  minNameLength: 2,
  
  // UI
  itemsPerPage: 10,
  maxFileSize: 5242880, // 5MB
  allowedFileTypes: ['pdf', 'doc', 'docx', 'txt']
};
