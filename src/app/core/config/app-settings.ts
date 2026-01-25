/**
 * Application Settings Configuration
 * 
 * This file contains all application-wide configuration settings.
 * It integrates with Angular environment files for environment-specific values.
 */

import { environment } from '../../environments/environment';

export const AppSettings = {
  /**
   * API Configuration
   */
  api: {
    baseUrl: environment.apiUrl,
    timeout: environment.apiTimeout,
    retryAttempts: 3,
    retryDelay: 1000 // 1 second
  },

  /**
   * Authentication Configuration
   */
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiryBuffer: environment.tokenExpiryBuffer,
    sessionTimeout: environment.sessionTimeout,
    rememberMeDuration: 2592000000 // 30 days in milliseconds
  },

  /**
   * Storage Configuration
   */
  storage: {
    prefix: environment.storagePrefix,
    useEncryption: environment.useEncryption,
    storageType: environment.storageType
  },

  /**
   * Application Configuration
   */
  app: {
    name: environment.appName,
    version: environment.appVersion,
    environment: environment.name,
    production: environment.production,
    debugMode: environment.enableDebugMode,
    logLevel: environment.enableDebugMode ? 'debug' : 'error' as 'debug' | 'info' | 'warn' | 'error'
  },

  /**
   * Feature Flags
   */
  features: {
    enableAnalytics: environment.enableAnalytics,
    enableErrorReporting: environment.enableErrorReporting,
    enableConsoleLogging: environment.enableConsoleLogging,
    enablePerformanceMonitoring: environment.production,
    enableOfflineMode: false
  },

  /**
   * UI Configuration
   */
  ui: {
    defaultTheme: 'light' as 'light' | 'dark',
    itemsPerPage: environment.itemsPerPage,
    maxFileSize: environment.maxFileSize,
    allowedFileTypes: environment.allowedFileTypes,
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'HH:mm:ss'
  },

  /**
   * Validation Configuration
   */
  validation: {
    minPasswordLength: environment.minPasswordLength,
    maxPasswordLength: environment.maxPasswordLength,
    minNameLength: environment.minNameLength,
    maxNameLength: 100,
    phonePattern: /^[0-9]{10}$/,
    emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },

  /**
   * Resume Configuration
   */
  resume: {
    maxExperienceEntries: 10,
    maxEducationEntries: 5,
    maxSkills: 50,
    autoSaveInterval: 30000 // 30 seconds
  },

  /**
   * Notification Configuration
   */
  notifications: {
    duration: 5000, // 5 seconds
    position: 'top-right' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
    showCloseButton: true
  }
};

/**
 * Helper function to get API URL
 */
export function getApiUrl(endpoint?: string): string {
  const baseUrl = AppSettings.api.baseUrl;
  if (!endpoint) return baseUrl;
  
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  
  // Ensure proper URL formatting
  return `${baseUrl}/${cleanEndpoint}`.replace(/([^:]\/)\/+/g, '$1');
}

/**
 * Helper function to check if feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof AppSettings.features): boolean {
  return AppSettings.features[feature];
}

/**
 * Helper function to get validation pattern
 */
export function getValidationPattern(type: keyof typeof AppSettings.validation): any {
  return AppSettings.validation[type];
}

/**
 * Helper function to check if running in production
 */
export function isProduction(): boolean {
  return AppSettings.app.production;
}

/**
 * Helper function to check if debug mode is enabled
 */
export function isDebugMode(): boolean {
  return AppSettings.app.debugMode;
}

/**
 * Helper function to log (only in debug mode)
 */
export function debugLog(message: string, ...args: any[]): void {
  if (AppSettings.features.enableConsoleLogging) {
    console.log(`[${AppSettings.app.name}]`, message, ...args);
  }
}

/**
 * Helper function to log errors (always logged)
 */
export function errorLog(message: string, error?: any): void {
  console.error(`[${AppSettings.app.name}] ERROR:`, message, error);
}

/**
 * Get current environment name
 */
export function getEnvironmentName(): string {
  return AppSettings.app.environment;
}
