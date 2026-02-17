/**
 * QA Environment Configuration
 * This file is used during QA testing
 */

export const environment = {
  production: false,
  name: 'qa',
  
  // API Configuration
  apiUrl: 'https://qa-cv.1mincv.com/api/v1', // Update with your QA API URL
  apiTimeout: 30000,
  
  // Feature Flags
  enableDebugMode: true,
  enableConsoleLogging: true,
  enableErrorReporting: true,
  enableAnalytics: false,
  
  // Storage Configuration
  storagePrefix: '_app_qa_',
  useEncryption: true,
  storageType: 'localStorage' as 'localStorage' | 'sessionStorage',
  
  // Authentication
  tokenExpiryBuffer: 300, 
  sessionTimeout: 3600000, 
  
  // Application
  appName: '1mincv.com (QA)',
  appVersion: '1.0.0-qa',
  
  // Validation
  minPasswordLength: 6,
  maxPasswordLength: 128,
  minNameLength: 2,
  
  // UI
  itemsPerPage: 10,
  maxFileSize: 5242880, 
  allowedFileTypes: ['pdf', 'doc', 'docx', 'txt']
};
