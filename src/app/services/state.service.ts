import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

/**
 * State Management Service with Encrypted LocalStorage
 * 
 * Features:
 * - Data persists across page refreshes and browser restarts
 * - Data is encrypted so users cannot easily read it (AES-256)
 * - Uses localStorage for persistent authentication
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
  // Encryption configuration
  // For AES-256, key should be 32 bytes and IV should be 16 bytes
  private readonly AES_KEY = CryptoJS.enc.Utf8.parse('1mincv.com_AES_Key_2026_!*******'); // 32 chars
  private readonly AES_IV = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 chars
  
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
    console.log('🔧 StateService initialized with AES encrypted localStorage');
    this.loadPersistedState();
  }

  // ============================================
  // ENCRYPTION/DECRYPTION
  // ============================================

  /**
   * AES Encryption
   */
  private encrypt(data: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(data, this.AES_KEY, {
        iv: this.AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    } catch (error) {
      console.error('Encryption error:', error);
      return '';
    }
  }

  /**
   * AES Decryption
   */
  public decrypt(encryptedData: string): string {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.AES_KEY, {
        iv: this.AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  }

  // ============================================
  // STORAGE OPERATIONS
  // ============================================

  /**
   * Save encrypted data to localStorage
   */
  private saveToStorage(key: string, data: any): void {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = this.encrypt(jsonString);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }

  /**
   * Load and decrypt data from localStorage
   */
  private loadFromStorage<T>(key: string): T | null {
    try {
      const encrypted = localStorage.getItem(key);
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
   * Remove data from localStorage
   */
  private removeFromStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from storage:', error);
    }
  }

  /**
   * Load persisted state on service initialization
   */
  private loadPersistedState(): void {
    const persistedAuthState = this.loadFromStorage<AuthState>(this.AUTH_STATE_KEY);
    
    if (persistedAuthState) {
      // Restore state even if token is expired, so we can use it for refresh-token calls
      this.authStateSubject.next(persistedAuthState);
      this.user$.next(persistedAuthState.user);
      
      // Only set the public isAuthenticated$ observable based on actual token validity
      const isValid = persistedAuthState.token && !this.isTokenExpired(persistedAuthState.token);
      this.isAuthenticated$.next(!!isValid);
      
      if (isValid) {
        console.log('✅ Auth state restored from encrypted storage');
      } else if (persistedAuthState.token) {
        console.log('⚠️ Restored expired token for potential refresh');
      } else {
        // No token or empty auth state
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

    // Persist to encrypted localStorage
    this.saveToStorage(this.AUTH_STATE_KEY, authState);

    console.log('✅ Auth state updated and encrypted in localStorage:', { email: user.email });
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
    
    // Remove from localStorage
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
    return this.appState.has(key) || localStorage.getItem(`${this.STORAGE_PREFIX}${key}`) !== null;
  }

  /**
   * Clear all state from memory and storage
   */
  clearAllState(): void {
    this.appState.clear();
    this.clearAuthState();
    
    // Clear all app-related items from localStorage
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
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
    console.log('LocalStorage Keys:', this.getLocalStorageKeys());
    console.log('==================');
  }

  /**
   * Get all app-related localStorage keys (for debugging)
   */
  private getLocalStorageKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
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
