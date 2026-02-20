import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, filter, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { StateService } from './state.service';

/**
 * Generic HTTP Service
 * Provides all HTTP methods (GET, POST, PUT, DELETE, PATCH) with automatic token injection
 */

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
}

export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) {
    console.log('🌐 HttpService initialized');
  }

  private prepareUrl(url: string): string {
    // If it's a full URL or assets path, return as is
    if (url.startsWith('http') || url.startsWith('assets/')) {
      return url;
    }
    
    // Clean up base URL (remove trailing slash)
    const baseUrl = environment.apiUrl.endsWith('/') 
      ? environment.apiUrl.slice(0, -1) 
      : environment.apiUrl;
      
    // Clean up path (ensure leading slash)
    const path = url.startsWith('/') ? url : `/${url}`;
    
    return `${baseUrl}${path}`;
  }

  // ============================================
  // HTTP METHODS
  // ============================================

  /**
   * GET request
   */
  get<T>(url: string, options?: HttpOptions): Observable<T> {
    const fullUrl = this.prepareUrl(url);
    const headers = this.buildHeaders(options?.headers);
    const requestOptions = {
      ...options,
      headers,
      withCredentials: true
    };
    return this.http.get<T>(fullUrl, requestOptions)
      .pipe(
        catchError(error => this.handleError(error, () => this.get<T>(url, options)))
      );
  }

  /**
   * POST request
   */
  post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    const fullUrl = this.prepareUrl(url);
    console.log('🌐 HttpService.post called');
    console.log('  URL:', fullUrl);
    
    const headers = this.buildHeaders(options?.headers);
    const requestOptions = { 
      ...options, 
      headers,
      withCredentials: true
    };
    
    return this.http.post<T>(fullUrl, body, requestOptions)
      .pipe(
        catchError(error => this.handleError(error, () => this.post<T>(url, body, options)))
      );
  }

  /**
   * PUT request
   */
  put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    const fullUrl = this.prepareUrl(url);
    const headers = this.buildHeaders(options?.headers);
    return this.http.put<T>(fullUrl, body, { ...options, headers })
      .pipe(
        catchError(error => this.handleError(error, () => this.put<T>(url, body, options)))
      );
  }

  /**
   * PATCH request
   */
  patch<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    const fullUrl = this.prepareUrl(url);
    const headers = this.buildHeaders(options?.headers);
    return this.http.patch<T>(fullUrl, body, { ...options, headers })
      .pipe(
        catchError(error => this.handleError(error, () => this.patch<T>(url, body, options)))
      );
  }

  /**
   * DELETE request
   */
  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    const fullUrl = this.prepareUrl(url);
    const headers = this.buildHeaders(options?.headers);
    const requestOptions = {
      ...options,
      headers,
      withCredentials: true
    };
    return this.http.delete<T>(fullUrl, requestOptions)
      .pipe(
        catchError(error => this.handleError(error, () => this.delete<T>(url, options)))
      );
  }

  // ============================================
  // SPECIALIZED METHODS
  // ============================================

  /**
   * GET request with automatic API response unwrapping
   */
  getApi<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.get<ApiResponse<T>>(url, options).pipe(
      map(response => {
        if (!response.status) {
          throw new Error(response.message || 'API request failed');
        }
        return response.data as T;
      })
    );
  }

  /**
   * POST request with automatic API response unwrapping
   */
  postApi<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.post<ApiResponse<T>>(url, body, options).pipe(
      map(response => {
        if (!response.status) {
          throw new Error(response.message || 'API request failed');
        }
        return response.data as T;
      })
    );
  }

  /**
   * PUT request with automatic API response unwrapping
   */
  putApi<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.put<ApiResponse<T>>(url, body, options).pipe(
      map(response => {
        if (!response.status) {
          throw new Error(response.message || 'API request failed');
        }
        return response.data as T;
      })
    );
  }

  /**
   * PATCH request with automatic API response unwrapping
   */
  patchApi<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.patch<ApiResponse<T>>(url, body, options).pipe(
      map(response => {
        if (!response.status) {
          throw new Error(response.message || 'API request failed');
        }
        return response.data as T;
      })
    );
  }

  /**
   * DELETE request with automatic API response unwrapping
   */
  deleteApi<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.delete<ApiResponse<T>>(url, options).pipe(
      map(response => {
        if (!response.status) {
          throw new Error(response.message || 'API request failed');
        }
        return response.data as T;
      })
    );
  }

  // ============================================
  // FILE UPLOAD/DOWNLOAD
  // ============================================

  /**
   * Upload file
   */
  uploadFile<T>(url: string, file: File, fieldName: string = 'file', additionalData?: any): Observable<T> {
    const fullUrl = this.prepareUrl(url);
    const formData = new FormData();
    formData.append(fieldName, file, file.name);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers = this.buildHeaders(undefined, false); // Don't set Content-Type for FormData
    return this.http.post<T>(fullUrl, formData, { headers })
      .pipe(catchError(error => this.handleError(error, () => this.uploadFile<T>(url, file, fieldName, additionalData)))); // Basic retry for upload might need careful handling, but consistency is key
  }

  /**
   * Download file
   */
  downloadFile(url: string, filename?: string): Observable<Blob> {
    const fullUrl = this.prepareUrl(url);
    const headers = this.buildHeaders();
    return this.http.get(fullUrl, { 
      headers, 
      responseType: 'blob' 
    }).pipe(
      map(blob => {
        if (filename) {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
        return blob;
      }),
      catchError(error => this.handleError(error, () => this.downloadFile(url, filename)))
    );
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  /**
   * Build headers with automatic token injection
   */
  private buildHeaders(
    customHeaders?: HttpHeaders | { [header: string]: string | string[] },
    includeContentType: boolean = true
  ): HttpHeaders {
    let headers = new HttpHeaders();

    // Add Content-Type
    if (includeContentType) {
      headers = headers.set('Content-Type', 'application/json');
    }

    // Add Authorization token if available
    const token = this.stateService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Add custom headers
    if (customHeaders) {
      if (customHeaders instanceof HttpHeaders) {
        customHeaders.keys().forEach(key => {
          const value = customHeaders.get(key);
          if (value) {
            headers = headers.set(key, value);
          }
        });
      } else {
        Object.keys(customHeaders).forEach(key => {
          const value = customHeaders[key];
          if (value) {
            headers = headers.set(key, value as string);
          }
        });
      }
    }

    return headers;
  }

  /**
   * Build URL with query parameters
   */
  buildUrl(baseUrl: string, params?: { [key: string]: any }): string {
    if (!params) return baseUrl;

    const queryParams = Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
  }

  /**
   * Handle HTTP errors with Token Refresh logic
   */
  private handleError(error: HttpErrorResponse, retryFn?: () => Observable<any>): Observable<any> {
    // If error is 401 Unauthorized and we have a retry function
    // Don't attempt to refresh token if the failed request itself was a login attempt
    if (error.status === 401 && retryFn && !error.url?.includes('/login')) {
      return this.handle401Error(error, retryFn);
    }

    return this.throwError(error);
  }

  private handle401Error(error: HttpErrorResponse, next: () => Observable<any>): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // We no longer rely on local refresh token or email manually for the refresh call
      // The backend handles it via HttpOnly cookies
      // Send GET request with credentials (cookies) AND the expired access token in header
      const fullUrl = this.prepareUrl('account/refresh-token');
      const headers = this.buildHeaders();
      return this.http.get<any>(fullUrl, { headers, withCredentials: true }).pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          
          if (response.status && response.data) {
            // Update state with new access token
            // Note: Refresh token is handled electronically by cookies, no need to save it manually
            const currentUser = this.stateService.getCurrentUser() || response.data.user;
            
            if (currentUser) {
                // Keep existing refresh token placeholder or null if purely cookie-based
                // We just update the access token in memory/storage
                this.stateService.setAuthState(
                  response.data.token, 
                  currentUser, 
                  undefined // No local refresh token needed if using cookies
                );
            }
            
            this.refreshTokenSubject.next(response.data.token);
            
            // Retry the original request
            return next();
          } else {
            // Refresh failed
            this.stateService.clearAuthState();
            return this.throwError(error);
          }
        }),
        catchError((refreshError) => {
          console.error('Refresh token failed:', refreshError);
          this.isRefreshing = false;
          this.stateService.clearAuthState();
          return this.throwError(refreshError);
        })
      );

    } else {
      // WaitFor refresh token
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next())
      );
    }
  }

  private throwError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      const serverError = error.error;

      if (error.status === 429) {
        errorMessage = 'Rate limit exceeded. Please upgrade to Pro for higher limits or wait a minute.';
        // Optional: show alert or notification
      } else if (serverError) {
        // Handle ASP.NET Core validation errors (ProblemDetails)
        if (serverError.errors) {
          const validationErrors: string[] = [];
          Object.keys(serverError.errors).forEach(key => {
            const messages = serverError.errors[key];
            if (Array.isArray(messages)) {
              validationErrors.push(...messages);
            } else {
              validationErrors.push(messages);
            }
          });
          errorMessage = validationErrors.length > 0 ? validationErrors.join(', ') : (serverError.title || errorMessage);
        } 
        // Handle standard message property
        else if (serverError.message) {
          errorMessage = serverError.message;
        } 
        // Handle title property
        else if (serverError.title) {
          errorMessage = serverError.title;
        }
        // Handle error property
        else if (serverError.error) {
          errorMessage = typeof serverError.error === 'string' ? serverError.error : JSON.stringify(serverError.error);
        }
        // Fallback to default message
        else if (error.message && !error.message.includes('Http failure response')) {
          errorMessage = error.message;
        }
        else {
          errorMessage = `Error ${error.status}: ${error.statusText || 'Unknown Error'}`;
        }
      } else {
        errorMessage = error.message || `Error ${error.status}: ${error.statusText || 'Unknown Error'}`;
      }
    }

    console.error('❌ HTTP Error:', {
      status: error.status,
      message: errorMessage,
      error: error.error
    });

    return throwError(() => new Error(errorMessage));
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Create HttpParams from object
   */
  createParams(params: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return httpParams;
  }

  /**
   * Check if response is successful
   */
  isSuccessResponse<T>(response: ApiResponse<T>): boolean {
    return response.status === true;
  }
}
