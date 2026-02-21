import {
  BillingApiService
} from "./chunk-ODN63HLT.js";
import {
  HttpService,
  StateService
} from "./chunk-QUEFXQWV.js";
import {
  Router,
  catchError,
  map,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-TRI43INR.js";

// src/app/billing/services/benefits.service.ts
var BenefitsService = class _BenefitsService {
  constructor() {
    this.benefits = {};
  }
  set(benefits) {
    this.benefits = benefits;
  }
  get(code) {
    return Number(this.benefits[code] ?? 0);
  }
  has(code) {
    return Number(this.benefits[code]) > 0;
  }
  static {
    this.\u0275fac = function BenefitsService_Factory(t) {
      return new (t || _BenefitsService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BenefitsService, factory: _BenefitsService.\u0275fac, providedIn: "root" });
  }
};

// src/app/auth/auth.service.ts
var AuthService = class _AuthService {
  constructor(httpService, stateService, billingApi, benefitsService, router) {
    this.httpService = httpService;
    this.stateService = stateService;
    this.billingApi = billingApi;
    this.benefitsService = benefitsService;
    this.router = router;
    this.currentUser$ = this.stateService.user$;
    this.isAuthenticated$ = this.stateService.isAuthenticated$;
    console.log("\u{1F510} AuthService initialized");
  }
  // ============================================
  // AUTHENTICATION METHODS
  // ============================================
  /**
   * Login user
   * POST /api/account/login
   */
  login(credentials) {
    console.log("\u{1F510} AuthService.login called");
    return this.httpService.post("account/login", credentials).pipe(tap((response) => {
      console.log("\u{1F510} AuthService received response:", response);
      if (response.status && response.data) {
        console.log("\u{1F510} Response has status=true and data");
        const { token, refreshToken, user } = response.data;
        console.log("\u{1F510} Extracted token:", token ? "Present" : "Missing");
        console.log("\u{1F510} Extracted user:", user);
        console.log("\u{1F510} Calling setAuthState...");
        this.stateService.setAuthState(token, user, refreshToken);
        this.loadUserBenefits();
        console.log("\u2705 Login successful, state saved for:", user.email);
      } else {
        console.log("\u26A0\uFE0F Response status is false or no data");
      }
    }), catchError(this.handleError));
  }
  /**
   * Register new user
   * POST /api/account/register
   */
  register(userData) {
    return this.httpService.post("account/register", userData).pipe(tap((response) => {
      if (response.status && response.data) {
        const { token, refreshToken, user } = response.data;
        this.stateService.setAuthState(token, user, refreshToken);
        this.loadUserBenefits();
        console.log("\u2705 Registration successful:", user.email);
      }
    }), catchError(this.handleError));
  }
  /**
   * Logout user
   */
  logout() {
    this.stateService.clearAuthState();
    this.router.navigate(["/login"]);
    console.log("\u{1F513} User logged out");
  }
  /**
   * Forgot password
   * POST /api/account/forgot-password
   */
  forgotPassword(data) {
    return this.httpService.post("account/forgot-password", data).pipe(catchError(this.handleError));
  }
  /**
   * Reset password
   * POST /api/account/reset-password
   */
  resetPassword(data) {
    return this.httpService.post("account/reset-password", data).pipe(catchError(this.handleError));
  }
  /**
   * Refresh token
   * GET /api/account/refresh-token
   */
  refreshToken() {
    return this.httpService.get("account/refresh-token").pipe(tap((response) => {
      if (response.status && response.data) {
        const { token, user } = response.data;
        this.stateService.setAuthState(token, user, void 0);
        this.loadUserBenefits();
        console.log("\u2705 Token refreshed via cookie");
      }
    }), catchError(this.handleError));
  }
  /**
   * Verify Google Token
   * POST /api/account/google/verify-token
   */
  verifyGoogleToken(token) {
    return this.httpService.post("account/google/verify-token", { token }).pipe(tap((response) => {
      if (response.status && response.data) {
        const { token: token2, refreshToken, user } = response.data;
        this.stateService.setAuthState(token2, user, refreshToken);
        this.loadUserBenefits();
        console.log("\u2705 Google login successful:", user.email);
      }
    }), catchError(this.handleError));
  }
  /**
   * Get Google Client ID from backend and decrypt it
   * GET /api/account/google/clientid
   */
  getGoogleClientId() {
    return this.httpService.get("account/google/clientid").pipe(map((response) => {
      if (response.status && response.data) {
        const decryptedId = this.stateService.decrypt(response.data);
        return decryptedId;
      }
      throw new Error(response.message || "Failed to fetch Google Client ID");
    }), catchError(this.handleError));
  }
  /**
   * Update user profile
   * PUT /api/account/profile
   */
  updateProfile(data) {
    return this.httpService.put("account/profile", data).pipe(tap((response) => {
      if (response.status && response.data) {
        this.stateService.updateUser(response.data);
        console.log("\u2705 Profile updated:", response.data.email);
      }
    }), catchError(this.handleError));
  }
  // ============================================
  // STATE ACCESSORS
  // ============================================
  /**
   * Get current user value (synchronous)
   */
  get currentUserValue() {
    return this.stateService.getCurrentUser();
  }
  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    console.log("\u{1F510} AuthService.isAuthenticated() called");
    const token = this.getToken();
    console.log("\u{1F510} Token:", token ? "Present (length: " + token.length + ")" : "Missing");
    if (!token) {
      console.log("\u274C No token found");
      return false;
    }
    const isExpired = this.stateService.isTokenExpired(token);
    console.log("\u{1F510} Token expired:", isExpired);
    if (isExpired) {
      console.warn("\u26A0\uFE0F Token expired");
      return false;
    }
    const stateAuth = this.stateService.isAuthenticated();
    console.log("\u{1F510} StateService.isAuthenticated():", stateAuth);
    return stateAuth;
  }
  /**
   * Get stored authentication token
   */
  getToken() {
    return this.stateService.getToken();
  }
  /**
   * Get refresh token
   */
  getRefreshToken() {
    return this.stateService.getRefreshToken();
  }
  /**
   * Get token expiry date
   */
  getTokenExpiry() {
    const token = this.getToken();
    return token ? this.stateService.getTokenExpiry(token) : null;
  }
  // ============================================
  // ERROR HANDLING
  // ============================================
  /**
   * Handle HTTP errors
   */
  handleError(error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      const serverError = error.error;
      if (serverError) {
        if (serverError.errors) {
          const validationErrors = [];
          Object.keys(serverError.errors).forEach((key) => {
            const messages = serverError.errors[key];
            if (Array.isArray(messages)) {
              validationErrors.push(...messages);
            } else {
              validationErrors.push(messages);
            }
          });
          errorMessage = validationErrors.length > 0 ? validationErrors.join(", ") : serverError.title || errorMessage;
        } else {
          errorMessage = serverError.message || serverError.title || serverError.error || error.message || errorMessage;
        }
      } else {
        errorMessage = error.message || errorMessage;
      }
    }
    if (errorMessage.includes("Http failure response")) {
      errorMessage = `Server Error: ${error.status || ""} ${error.statusText || ""}`.trim() || "Connection failed";
    }
    console.error("\u274C Auth Service Error:", error);
    return throwError(() => new Error(errorMessage));
  }
  // ============================================
  // UTILITY METHODS
  // ============================================
  /**
   * Debug current auth state
   */
  debugAuthState() {
    console.log("=== AUTH STATE DEBUG ===");
    console.log("Authenticated:", this.isAuthenticated());
    console.log("Current User:", this.currentUserValue);
    console.log("Token:", this.getToken()?.substring(0, 20) + "...");
    console.log("Token Expiry:", this.getTokenExpiry());
    console.log("======================");
  }
  /**
   * Load user benefits from subscription
   */
  loadUserBenefits() {
    this.billingApi.getMySubscription().subscribe({
      next: (sub) => {
        if (sub && sub.benefits) {
          this.benefitsService.set(sub.benefits);
          console.log("\u{1F381} Benefits loaded:", sub.benefits);
        }
      },
      error: (err) => {
        console.error("\u274C Failed to load benefits:", err);
      }
    });
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpService), \u0275\u0275inject(StateService), \u0275\u0275inject(BillingApiService), \u0275\u0275inject(BenefitsService), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  BenefitsService,
  AuthService
};
//# sourceMappingURL=chunk-ABLK4HI4.js.map
