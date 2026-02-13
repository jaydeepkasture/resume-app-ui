/**
 * QA Environment Configuration
 * This file is used during QA testing
 */

export const environment = {
  production: false,
  name: 'qa',
  
  // API Configuration
  apiUrl: 'http://ec2-13-127-164-107.ap-south-1.compute.amazonaws.com:5000/api/v1', // Update with your QA API URL
  apiTimeout: 30000,
  
  // Feature Flags
  enableDebugMode: true,
  enableConsoleLogging: true,
  enableErrorReporting: true,
  enableAnalytics: false,
  
  // Storage Configuration
  storagePrefix: '_app_qa_',
  useEncryption: true,
  storageType: 'sessionStorage' as 'localStorage' | 'sessionStorage',
  
  // Authentication
  tokenExpiryBuffer: 300, 
  sessionTimeout: 3600000, 
  googleClientId: '617323131977-a63i2vg58ko2i701g1uqjuaa9gs5ale5.apps.googleusercontent.com',
  
  // Application
  appName: 'Resume In One Minute (QA)',
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
