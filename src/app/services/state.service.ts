import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * State Management Service with Encrypted SessionStorage
 * 
 * Features:
 * - Data persists across page refreshes (within same browser session)
 * - Data is encrypted so users cannot easily read it
 * - Data is cleared when browser/tab is closed
 * - Uses sessionStorage (more secure than localStorage)
 */

export interface User {
  userId?: number;
  globalUserId?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isActive?: boolean;
  createdAt?: string;
  
  // Legacy fields for backward compatibility
  id?: string;
  name?: string;
  phone?: string;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Encryption key - In production, this should be generated dynamically or from environment
  private readonly ENCRYPTION_KEY = this.generateEncryptionKey();
  private readonly STORAGE_PREFIX = '_app_';
  private readonly AUTH_STATE_KEY = `${this.STORAGE_PREFIX}auth`;

  // Private state subjects
  private authStateSubject = new BehaviorSubject<AuthState>({
    token: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false
  });

  // Public observables
  public authState$ = this.authStateSubject.asObservable();
  public user$ = new BehaviorSubject<User | null>(null);
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  // Additional state storage (can be extended as needed)
  private appState = new Map<string, any>();

  constructor() {
    console.log('🔧 StateService initialized with encrypted sessionStorage');
    this.loadPersistedState();
  }

  // ============================================
  // ENCRYPTION/DECRYPTION
  // ============================================

  /**
   * Generate encryption key for session storage
   * Using a static key so data can be decrypted after page refresh
   * Note: This is obfuscation, not security. Real auth is handled by HTTP-only cookies.
   */
  private generateEncryptionKey(): string {
    // Use a static key that doesn't change on refresh
    // This allows sessionStorage data to persist across page refreshes
    // Security note: The real authentication is handled by HTTP-only cookies from backend
    // This encrypted storage is just for UI state (user info, preferences, etc.)
    return 'resume-app-session-key-v1';
  }

  /**
   * Simple XOR-based encryption with Base64 encoding
   * Note: This is obfuscation, not military-grade encryption
   * For production, consider using Web Crypto API or a library like crypto-js
   */
  private encrypt(data: string): string {
    try {
      const key = this.ENCRYPTION_KEY;
      let encrypted = '';
      
      for (let i = 0; i < data.length; i++) {
        const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        encrypted += String.fromCharCode(charCode);
      }
      
      // Base64 encode to make it storage-safe and harder to read
      return btoa(encrypted);
    } catch (error) {
      console.error('Encryption error:', error);
      return '';
    }
  }

  /**
   * Decrypt the encrypted data
   */
  private decrypt(encryptedData: string): string {
    try {
      const key = this.ENCRYPTION_KEY;
      // Base64 decode first
      const encrypted = atob(encryptedData);
      let decrypted = '';
      
      for (let i = 0; i < encrypted.length; i++) {
        const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        decrypted += String.fromCharCode(charCode);
      }
      
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  }

  // ============================================
  // STORAGE OPERATIONS
  // ============================================

  /**
   * Save encrypted data to sessionStorage
   */
  private saveToStorage(key: string, data: any): void {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = this.encrypt(jsonString);
      sessionStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }

  /**
   * Load and decrypt data from sessionStorage
   */
  private loadFromStorage<T>(key: string): T | null {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = this.decrypt(encrypted);
      if (!decrypted) return null;
      
      return JSON.parse(decrypted) as T;
    } catch (error) {
      console.error('Failed to load from storage:', error);
      return null;
    }
  }

  /**
   * Remove data from sessionStorage
   */
  private removeFromStorage(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from storage:', error);
    }
  }

  /**
   * Load persisted state on service initialization
   */
  private loadPersistedState(): void {
    const persistedAuthState = this.loadFromStorage<AuthState>(this.AUTH_STATE_KEY);
    
    if (persistedAuthState && persistedAuthState.isAuthenticated) {
      // Check if token is still valid
      if (persistedAuthState.token && !this.isTokenExpired(persistedAuthState.token)) {
        this.authStateSubject.next(persistedAuthState);
        this.user$.next(persistedAuthState.user);
        this.isAuthenticated$.next(true);
        console.log('✅ Auth state restored from encrypted storage');
      } else {
        console.log('⚠️ Stored token expired, clearing state');
        this.clearAuthState();
      }
    }
  }

  // ============================================
  // AUTH STATE MANAGEMENT
  // ============================================

  /**
   * Set authentication state and persist to encrypted storage
   */
  setAuthState(token: string, user: User, refreshToken?: string): void {
    const authState: AuthState = {
      token,
      refreshToken: refreshToken || null,
      user,
      isAuthenticated: true
    };

    this.authStateSubject.next(authState);
    this.user$.next(user);
    this.isAuthenticated$.next(true);

    // Persist to encrypted sessionStorage
    this.saveToStorage(this.AUTH_STATE_KEY, authState);

    console.log('✅ Auth state updated and encrypted in sessionStorage:', { email: user.email });
  }

  /**
   * Get current auth state
   */
  getAuthState(): AuthState {
    return this.authStateSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return this.authStateSubject.value.refreshToken;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const state = this.authStateSubject.value;
    if (!state.isAuthenticated || !state.token) {
      return false;
    }
    
    // Check token expiration
    if (this.isTokenExpired(state.token)) {
      console.warn('⚠️ Token expired');
      this.clearAuthState();
      return false;
    }
    
    return true;
  }

  /**
   * Update user data and persist
   */
  updateUser(user: Partial<User>): void {
    const currentState = this.authStateSubject.value;
    if (currentState.user) {
      const updatedUser = { ...currentState.user, ...user };
      const updatedState = {
        ...currentState,
        user: updatedUser
      };
      
      this.authStateSubject.next(updatedState);
      this.user$.next(updatedUser);
      
      // Persist updated state
      this.saveToStorage(this.AUTH_STATE_KEY, updatedState);
      
      console.log('✅ User data updated and persisted');
    }
  }

  /**
   * Clear authentication state from memory and storage
   */
  clearAuthState(): void {
    this.authStateSubject.next({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false
    });
    this.user$.next(null);
    this.isAuthenticated$.next(false);
    
    // Remove from sessionStorage
    this.removeFromStorage(this.AUTH_STATE_KEY);
    
    console.log('🔓 Auth state cleared from memory and storage');
  }

  // ============================================
  // GENERIC STATE MANAGEMENT
  // ============================================

  /**
   * Set a value in state with optional persistence
   */
  setState<T>(key: string, value: T, persist: boolean = false): void {
    this.appState.set(key, value);
    
    if (persist) {
      this.saveToStorage(`${this.STORAGE_PREFIX}${key}`, value);
    }
    
    console.log(`📝 State set: ${key}${persist ? ' (persisted)' : ''}`);
  }

  /**
   * Get a value from state (checks storage if not in memory)
   */
  getState<T>(key: string): T | undefined {
    // First check in-memory state
    if (this.appState.has(key)) {
      return this.appState.get(key) as T;
    }
    
    // If not in memory, try to load from storage
    const storedValue = this.loadFromStorage<T>(`${this.STORAGE_PREFIX}${key}`);
    if (storedValue !== null) {
      this.appState.set(key, storedValue);
      return storedValue;
    }
    
    return undefined;
  }

  /**
   * Remove a value from state and storage
   */
  removeState(key: string): void {
    this.appState.delete(key);
    this.removeFromStorage(`${this.STORAGE_PREFIX}${key}`);
    console.log(`🗑️ State removed: ${key}`);
  }

  /**
   * Check if state exists
   */
  hasState(key: string): boolean {
    return this.appState.has(key) || sessionStorage.getItem(`${this.STORAGE_PREFIX}${key}`) !== null;
  }

  /**
   * Clear all state from memory and storage
   */
  clearAllState(): void {
    this.appState.clear();
    this.clearAuthState();
    
    // Clear all app-related items from sessionStorage
    const keysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
    
    console.log('🧹 All state cleared from memory and storage');
  }

  /**
   * Get all state keys
   */
  getStateKeys(): string[] {
    return Array.from(this.appState.keys());
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Check if token is expired
   * Handles both JWT tokens and custom encrypted tokens
   */
  isTokenExpired(token: string): boolean {
    try {
      // Check if token is in JWT format (has 3 parts separated by dots)
      const parts = token.split('.');
      
      if (parts.length === 3) {
        // Standard JWT token - check expiration
        const payload = JSON.parse(atob(parts[1]));
        const expiry = payload.exp;
        
        if (expiry) {
          const isExpired = (Math.floor((new Date).getTime() / 1000)) >= expiry;
          console.log('🔐 JWT token expiry check:', { expiry, isExpired });
          return isExpired;
        }
        
        // JWT without expiry claim - consider it valid
        console.log('🔐 JWT token without expiry claim - treating as valid');
        return false;
      } else {
        // Custom token format (not JWT) - cannot check expiration
        // Assume it's valid and let the backend validate it
        console.log('🔐 Custom token format detected - skipping expiration check');
        return false;
      }
    } catch (error) {
      // If parsing fails, log the error but don't assume expired
      console.warn('⚠️ Token parsing failed:', error);
      // For custom tokens, assume valid and let backend handle validation
      return false;
    }
  }

  /**
   * Get token expiry time
   */
  getTokenExpiry(token: string): Date | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? new Date(payload.exp * 1000) : null;
    } catch {
      return null;
    }
  }

  /**
   * Debug: Log current state (without exposing encrypted data)
   */
  debugState(): void {
    console.log('=== STATE DEBUG ===');
    console.log('Auth State:', {
      isAuthenticated: this.authStateSubject.value.isAuthenticated,
      hasToken: !!this.authStateSubject.value.token,
      hasRefreshToken: !!this.authStateSubject.value.refreshToken,
      user: this.authStateSubject.value.user
    });
    console.log('App State Keys:', this.getStateKeys());
    console.log('SessionStorage Keys:', this.getSessionStorageKeys());
    console.log('==================');
  }

  /**
   * Get all app-related sessionStorage keys (for debugging)
   */
  private getSessionStorageKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.STORAGE_PREFIX)) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Manually trigger state persistence (useful for critical data)
   */
  persistCurrentState(): void {
    const currentAuthState = this.authStateSubject.value;
    if (currentAuthState.isAuthenticated) {
      this.saveToStorage(this.AUTH_STATE_KEY, currentAuthState);
      console.log('💾 Current state persisted to encrypted storage');
    }
  }
}
