import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-ITCTJPCF.js";
import {
  AuthService
} from "./chunk-FEHFFYQA.js";
import {
  ActivatedRoute,
  CommonModule,
  NgIf,
  NgZone,
  Router,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-IWCV675V.js";
import "./chunk-PZQZAEDH.js";

// src/app/auth/login/login.component.ts
function LoginComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 30);
    \u0275\u0275element(2, "circle", 31)(3, "line", 32)(4, "line", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function LoginComponent_div_19_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_19_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275template(1, LoginComponent_div_19_span_1_Template, 2, 0, "span", 22)(2, LoginComponent_div_19_span_2_Template, 2, 0, "span", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].errors["email"]);
  }
}
function LoginComponent__svg_svg_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 30);
    \u0275\u0275element(1, "path", 35)(2, "circle", 36);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent__svg_svg_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 30);
    \u0275\u0275element(1, "path", 37)(2, "line", 38);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_28_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_28_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password must be at least 6 characters");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275template(1, LoginComponent_div_28_span_1_Template, 2, 0, "span", 22)(2, LoginComponent_div_28_span_2_Template, 2, 0, "span", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["password"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["password"].errors["minlength"]);
  }
}
function LoginComponent_span_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 30);
    \u0275\u0275element(2, "circle", 40)(3, "path", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Signing in... ");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor(formBuilder, authService, router, route, ngZone) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.route = route;
    this.ngZone = ngZone;
    this.loading = false;
    this.submitted = false;
    this.error = "";
    this.returnUrl = "";
    this.showPassword = false;
    this.googleClientId = "";
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"]);
    }
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.authService.getGoogleClientId().subscribe({
      next: (clientId) => {
        this.googleClientId = clientId;
        this.loadGoogleScript();
      },
      error: (err) => {
        console.error("\u274C Failed to load Google Client ID:", err);
        this.error = "Failed to initialize Google login. Refresh the page.";
      }
    });
  }
  loadGoogleScript() {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  }
  initializeGoogleSignIn() {
    if (!this.googleClientId) {
      console.error("\u274C Google Client ID is missing");
      return;
    }
    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: this.handleGoogleCredentialResponse.bind(this)
    });
    const buttonDiv = document.getElementById("google-btn");
    if (buttonDiv) {
      google.accounts.id.renderButton(buttonDiv, {
        theme: "outline",
        size: "large",
        width: buttonDiv.offsetWidth || 344,
        // Match container width or fallback
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left"
      });
    }
  }
  handleGoogleCredentialResponse(response) {
    this.ngZone.run(() => {
      if (response.credential) {
        this.loading = true;
        this.authService.verifyGoogleToken(response.credential).subscribe({
          next: (res) => {
            if (res.status) {
              this.loading = false;
              this.router.navigate([this.returnUrl]);
            } else {
              this.error = res.message || "Google login failed";
              this.loading = false;
            }
          },
          error: (err) => {
            console.error("\u274C Google Login error:", err);
            this.error = err.message || "Google login failed";
            this.loading = false;
          }
        });
      }
    });
  }
  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.submitted = true;
    this.error = "";
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const credentials = {
      email: this.f["email"].value,
      password: this.f["password"].value
    };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.status) {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        } else {
          this.error = response.message || "Login failed. Please try again.";
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = error.message || "Login failed. Please check your credentials.";
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 49, vars: 14, consts: [[1, "auth-container"], [1, "auth-card"], [1, "auth-header"], [1, "brand-logo-container"], [1, "brand-logo"], [1, "logo-text"], [1, "auth-form", 3, "ngSubmit", "formGroup"], ["class", "alert alert-error", 4, "ngIf"], [1, "form-group"], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email", "placeholder", "Enter your email", 1, "form-control"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "password"], [1, "password-input-wrapper"], ["id", "password", "formControlName", "password", "placeholder", "Enter your password", 1, "form-control", 3, "type"], ["type", "button", "tabindex", "-1", 1, "password-toggle", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], [1, "form-options"], [1, "checkbox-label"], ["type", "checkbox", "formControlName", "rememberMe"], ["routerLink", "/forgot-password", 1, "forgot-link"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], [1, "auth-divider"], [1, "google-btn-container"], ["id", "google-btn"], [1, "auth-footer"], ["routerLink", "/register"], [1, "alert", "alert-error"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "invalid-feedback"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "loading-spinner"], ["cx", "12", "cy", "12", "r", "10", "opacity", "0.25"], ["d", "M12 2a10 10 0 0 1 10 10", "opacity", "0.75"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
        \u0275\u0275text(6, "1min");
        \u0275\u0275elementStart(7, "span");
        \u0275\u0275text(8, "cv.com");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(9, "h1");
        \u0275\u0275text(10, "Welcome Back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "Sign in to your account to continue");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "form", 6);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_13_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275template(14, LoginComponent_div_14_Template, 6, 1, "div", 7);
        \u0275\u0275elementStart(15, "div", 8)(16, "label", 9);
        \u0275\u0275text(17, "Email Address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "input", 10);
        \u0275\u0275template(19, LoginComponent_div_19_Template, 3, 2, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 8)(21, "label", 12);
        \u0275\u0275text(22, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 13);
        \u0275\u0275element(24, "input", 14);
        \u0275\u0275elementStart(25, "button", 15);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_25_listener() {
          return ctx.togglePasswordVisibility();
        });
        \u0275\u0275template(26, LoginComponent__svg_svg_26_Template, 3, 0, "svg", 16)(27, LoginComponent__svg_svg_27_Template, 3, 0, "svg", 16);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(28, LoginComponent_div_28_Template, 3, 2, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 17)(30, "label", 18);
        \u0275\u0275element(31, "input", 19);
        \u0275\u0275elementStart(32, "span");
        \u0275\u0275text(33, "Remember me");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "a", 20);
        \u0275\u0275text(35, "Forgot password?");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "button", 21);
        \u0275\u0275template(37, LoginComponent_span_37_Template, 2, 0, "span", 22)(38, LoginComponent_span_38_Template, 5, 0, "span", 23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "div", 24)(40, "span");
        \u0275\u0275text(41, "OR");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 25);
        \u0275\u0275element(43, "div", 26);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 27)(45, "p");
        \u0275\u0275text(46, "Don't have an account? ");
        \u0275\u0275elementStart(47, "a", 28);
        \u0275\u0275text(48, "Sign up");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("formGroup", ctx.loginForm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["email"].errors);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["email"].errors);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["password"].errors);
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["password"].errors);
        \u0275\u0275advance(8);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterModule, RouterLink], styles: ['\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 20px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  padding: 48px;\n  width: 100%;\n  max-width: 440px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.auth-logo[_ngcontent-%COMP%] {\n  max-width: 280px;\n  height: auto;\n  margin-bottom: 24px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 8px 0;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #718096;\n  margin: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 8px;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 15px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #f56565;\n}\n.form-control.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #a0aec0;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.password-toggle[_ngcontent-%COMP%]:hover {\n  color: #667eea;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  color: #f56565;\n  font-size: 13px;\n  margin-top: 6px;\n}\n.form-options[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  font-size: 14px;\n  color: #4a5568;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  margin-right: 8px;\n  cursor: pointer;\n}\n.forgot-link[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 500;\n  transition: color 0.2s;\n}\n.forgot-link[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n}\n.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 24px;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.loading-spinner[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #fff5f5;\n  color: #c53030;\n  border: 1px solid #feb2b2;\n}\n.alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 24px;\n  border-top: 1px solid #e2e8f0;\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #718096;\n  margin: 0;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n}\n.auth-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 20px 0;\n  color: #a0aec0;\n}\n.auth-divider[_ngcontent-%COMP%]::before, .auth-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid #e2e8f0;\n}\n.auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 10px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.google-btn-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  margin-top: 10px;\n}\n#google-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n}\n@media (max-width: 480px) {\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\auth\\login\\login.component.ts", lineNumber: 17 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-JQKAODQ2.js.map
