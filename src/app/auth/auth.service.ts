import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService, ApiResponse } from '../services/http.service';
import { StateService, User } from '../services/state.service';
import { BillingApiService } from '../billing/services/billing-api.service';
import { BenefitsService } from '../billing/services/benefits.service';

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}


export interface ForgotPasswordDto {
  email: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Expose observables from StateService
  public currentUser$ = this.stateService.user$;
  public isAuthenticated$ = this.stateService.isAuthenticated$;

  constructor(
    private httpService: HttpService,
    private stateService: StateService,
    private billingApi: BillingApiService,
    private benefitsService: BenefitsService,
    private router: Router
  ) {
    console.log('🔐 AuthService initialized');
  }

  // ============================================
  // AUTHENTICATION METHODS
  // ============================================

  /**
   * Login user
   * POST /api/account/login
   */
  login(credentials: LoginDto): Observable<ApiResponse<LoginResponse>> {
    console.log('🔐 AuthService.login called');
    return this.httpService.post<ApiResponse<LoginResponse>>(
      'account/login',
      credentials
    ).pipe(
      tap(response => {
        console.log('🔐 AuthService received response:', response);
        if (response.status && response.data) {
          console.log('🔐 Response has status=true and data');
          const { token, refreshToken, user } = response.data;
          console.log('🔐 Extracted token:', token ? 'Present' : 'Missing');
          console.log('🔐 Extracted user:', user);
          console.log('🔐 Calling setAuthState...');
          this.stateService.setAuthState(token, user, refreshToken);
          this.loadUserBenefits();
          console.log('✅ Login successful, state saved for:', user.email);
        } else {
          console.log('⚠️ Response status is false or no data');
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Register new user
   * POST /api/account/register
   */
  register(userData: RegisterDto): Observable<ApiResponse<RegisterResponse>> {
    return this.httpService.post<ApiResponse<RegisterResponse>>(
      'account/register',
      userData
    ).pipe(
      tap(response => {
        if (response.status && response.data) {
          const { token, refreshToken, user } = response.data;
          this.stateService.setAuthState(token, user, refreshToken);
          this.loadUserBenefits();
          console.log('✅ Registration successful:', user.email);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.stateService.clearAuthState();
    this.router.navigate(['/login']);
    console.log('🔓 User logged out');
  }

  /**
   * Forgot password
   * POST /api/account/forgot-password
   */
  forgotPassword(data: ForgotPasswordDto): Observable<ApiResponse> {
    return this.httpService.post<ApiResponse>(
      'account/forgot-password',
      data
    ).pipe(catchError(this.handleError));
  }

  /**
   * Refresh token
   * GET /api/account/refresh-token
   */
  refreshToken(): Observable<ApiResponse<LoginResponse>> {
    // We utilize the HttpOnly cookie for refresh token, so no need to send it in body
    return this.httpService.get<ApiResponse<LoginResponse>>(
      'account/refresh-token'
    ).pipe(
      tap(response => {
        if (response.status && response.data) {
          const { token, user } = response.data;
          
          // Update state with new access token
          // Refresh token is handled server-side via cookies
          this.stateService.setAuthState(token, user, undefined);
          this.loadUserBenefits();
          console.log('✅ Token refreshed via cookie');
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Verify Google Token
   * POST /api/account/google/verify-token
   */
  verifyGoogleToken(token: string): Observable<ApiResponse<LoginResponse>> {
    return this.httpService.post<ApiResponse<LoginResponse>>(
      'account/google/verify-token',
      { token }
    ).pipe(
      tap(response => {
        if (response.status && response.data) {
          const { token, refreshToken, user } = response.data;
          this.stateService.setAuthState(token, user, refreshToken);
          this.loadUserBenefits();
          console.log('✅ Google login successful:', user.email);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Get Google Client ID from backend and decrypt it
   * GET /api/account/google/clientid
   */
  getGoogleClientId(): Observable<string> {
    return this.httpService.get<ApiResponse<string>>('account/google/clientid').pipe(
      map(response => {
        if (response.status && response.data) {
          // Decrypt the ID using StateService decryption pattern
          const decryptedId = this.stateService.decrypt(response.data);
          console.log('🔐 Google Client ID fetched and decrypted');
          return decryptedId;
        }
        throw new Error(response.message || 'Failed to fetch Google Client ID');
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Update user profile
   * PUT /api/account/profile
   */
  updateProfile(data: Partial<User>): Observable<ApiResponse<User>> {
    return this.httpService.put<ApiResponse<User>>(
      'account/profile',
      data
    ).pipe(
      tap(response => {
        if (response.status && response.data) {
          this.stateService.updateUser(response.data);
          console.log('✅ Profile updated:', response.data.email);
        }
      }),
      catchError(this.handleError)
    );
  }

  // ============================================
  // STATE ACCESSORS
  // ============================================

  /**
   * Get current user value (synchronous)
   */
  public get currentUserValue(): User | null {
    return this.stateService.getCurrentUser();
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    console.log('🔐 AuthService.isAuthenticated() called');
    const token = this.getToken();
    console.log('🔐 Token:', token ? 'Present (length: ' + token.length + ')' : 'Missing');
    
    if (!token) {
      console.log('❌ No token found');
      return false;
    }
    
    // Check if token is expired
    const isExpired = this.stateService.isTokenExpired(token);
    console.log('🔐 Token expired:', isExpired);
    
    if (isExpired) {
      console.warn('⚠️ Token expired, logging out');
      this.logout();
      return false;
    }
    
    const stateAuth = this.stateService.isAuthenticated();
    console.log('🔐 StateService.isAuthenticated():', stateAuth);
    return stateAuth;
  }

  /**
   * Get stored authentication token
   */
  public getToken(): string | null {
    return this.stateService.getToken();
  }

  /**
   * Get refresh token
   */
  public getRefreshToken(): string | null {
    return this.stateService.getRefreshToken();
  }

  /**
   * Get token expiry date
   */
  public getTokenExpiry(): Date | null {
    const token = this.getToken();
    return token ? this.stateService.getTokenExpiry(token) : null;
  }

  // ============================================
  // ERROR HANDLING
  // ============================================

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || errorMessage;
    }
    
    console.error('❌ Auth Service Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Debug current auth state
   */
  debugAuthState(): void {
    console.log('=== AUTH STATE DEBUG ===');
    console.log('Authenticated:', this.isAuthenticated());
    console.log('Current User:', this.currentUserValue);
    console.log('Token:', this.getToken()?.substring(0, 20) + '...');
    console.log('Token Expiry:', this.getTokenExpiry());
    console.log('======================');
  }

  /**
   * Load user benefits from subscription
   */
  public loadUserBenefits(): void {
    this.billingApi.getMySubscription().subscribe({
      next: (sub) => {
        if (sub && sub.benefits) {
          this.benefitsService.set(sub.benefits);
          console.log('🎁 Benefits loaded:', sub.benefits);
        }
      },
      error: (err) => {
        console.error('❌ Failed to load benefits:', err);
      }
    });
  }
}
