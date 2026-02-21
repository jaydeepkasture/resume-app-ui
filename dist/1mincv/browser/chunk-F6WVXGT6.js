import {
  AuthService
} from "./chunk-ABLK4HI4.js";
import "./chunk-ODN63HLT.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-U2NUFKCF.js";
import "./chunk-QUEFXQWV.js";
import {
  ActivatedRoute,
  CommonModule,
  NgIf,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-TRI43INR.js";
import "./chunk-PZQZAEDH.js";

// src/app/auth/reset-password/reset-password.component.ts
function ResetPasswordComponent_form_13_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "circle", 33)(3, "line", 34)(4, "line", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error, " ");
  }
}
function ResetPasswordComponent_form_13__svg_svg_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 32);
    \u0275\u0275element(1, "path", 36)(2, "circle", 37);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13__svg_svg_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 32);
    \u0275\u0275element(1, "path", 38)(2, "line", 39);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_div_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_div_10_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password must be at least 6 characters");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275template(1, ResetPasswordComponent_form_13_div_10_span_1_Template, 2, 0, "span", 29)(2, ResetPasswordComponent_form_13_div_10_span_2_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["password"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["password"].errors["minlength"]);
  }
}
function ResetPasswordComponent_form_13__svg_svg_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 32);
    \u0275\u0275element(1, "path", 36)(2, "circle", 37);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13__svg_svg_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 32);
    \u0275\u0275element(1, "path", 38)(2, "line", 39);
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_div_19_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please confirm your password");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_div_19_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Passwords do not match");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275template(1, ResetPasswordComponent_form_13_div_19_span_1_Template, 2, 0, "span", 29)(2, ResetPasswordComponent_form_13_div_19_span_2_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["confirmPassword"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["confirmPassword"].errors["passwordMismatch"]);
  }
}
function ResetPasswordComponent_form_13_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Set Password");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "circle", 42)(3, "path", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Updating... ");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_form_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 17);
    \u0275\u0275listener("ngSubmit", function ResetPasswordComponent_form_13_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275template(1, ResetPasswordComponent_form_13_div_1_Template, 6, 1, "div", 18);
    \u0275\u0275elementStart(2, "div", 19)(3, "label", 20);
    \u0275\u0275text(4, "New Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 21);
    \u0275\u0275element(6, "input", 22);
    \u0275\u0275elementStart(7, "button", 23);
    \u0275\u0275listener("click", function ResetPasswordComponent_form_13_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility("password"));
    });
    \u0275\u0275template(8, ResetPasswordComponent_form_13__svg_svg_8_Template, 3, 0, "svg", 24)(9, ResetPasswordComponent_form_13__svg_svg_9_Template, 3, 0, "svg", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, ResetPasswordComponent_form_13_div_10_Template, 3, 2, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 19)(12, "label", 26);
    \u0275\u0275text(13, "Confirm Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 21);
    \u0275\u0275element(15, "input", 27);
    \u0275\u0275elementStart(16, "button", 23);
    \u0275\u0275listener("click", function ResetPasswordComponent_form_13_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility("confirmPassword"));
    });
    \u0275\u0275template(17, ResetPasswordComponent_form_13__svg_svg_17_Template, 3, 0, "svg", 24)(18, ResetPasswordComponent_form_13__svg_svg_18_Template, 3, 0, "svg", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, ResetPasswordComponent_form_13_div_19_Template, 3, 2, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 28);
    \u0275\u0275template(21, ResetPasswordComponent_form_13_span_21_Template, 2, 0, "span", 29)(22, ResetPasswordComponent_form_13_span_22_Template, 5, 0, "span", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.resetForm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("is-invalid", ctx_r1.submitted && ctx_r1.f["password"].errors);
    \u0275\u0275property("type", ctx_r1.showPassword ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.showPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitted && ctx_r1.f["password"].errors);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("is-invalid", ctx_r1.submitted && ctx_r1.f["confirmPassword"].errors);
    \u0275\u0275property("type", ctx_r1.showConfirmPassword ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.showConfirmPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showConfirmPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitted && ctx_r1.f["confirmPassword"].errors);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading);
  }
}
function ResetPasswordComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 32);
    \u0275\u0275element(3, "circle", 33)(4, "line", 34)(5, "line", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "button", 45);
    \u0275\u0275text(8, "Request New Link");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error || "Invalid or expired reset link.", " ");
  }
}
function ResetPasswordComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 48);
    \u0275\u0275element(3, "path", 49)(4, "polyline", 50);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "Success!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 51);
    \u0275\u0275text(10, "Back to Login");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.success);
  }
}
function ResetPasswordComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "p");
    \u0275\u0275text(2, "Already know your password? ");
    \u0275\u0275elementStart(3, "a", 53);
    \u0275\u0275text(4, "Sign in");
    \u0275\u0275elementEnd()()();
  }
}
var ResetPasswordComponent = class _ResetPasswordComponent {
  constructor(formBuilder, authService, router, route) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.route = route;
    this.loading = false;
    this.submitted = false;
    this.error = "";
    this.success = "";
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.token = "";
    this.email = "";
  }
  ngOnInit() {
    this.token = this.route.snapshot.queryParams["token"] || "";
    this.email = this.route.snapshot.queryParams["email"] || "";
    if (!this.token || !this.email) {
      this.error = "Invalid reset link. Please request a new one.";
    }
    this.resetForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  // Custom validator to check if passwords match
  passwordMatchValidator(form) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }
  // Convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }
  togglePasswordVisibility(field) {
    if (field === "password") {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  onSubmit() {
    this.submitted = true;
    this.error = "";
    this.success = "";
    if (this.resetForm.invalid || !this.token || !this.email) {
      return;
    }
    this.loading = true;
    const resetData = {
      email: this.email,
      token: this.token,
      password: this.f["password"].value,
      confirmPassword: this.f["confirmPassword"].value
    };
    this.authService.resetPassword(resetData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status) {
          this.success = response.message || "Your password has been reset successfully.";
        } else {
          this.error = response.message || "Reset password failed. Please try again.";
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || "Reset password failed. Please request a new link.";
      }
    });
  }
  static {
    this.\u0275fac = function ResetPasswordComponent_Factory(t) {
      return new (t || _ResetPasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResetPasswordComponent, selectors: [["app-reset-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 36, vars: 4, consts: [[1, "auth-container"], [1, "auth-card"], [1, "auth-header"], [1, "brand-logo-container"], [1, "brand-logo"], [1, "logo-text"], ["class", "auth-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "success-message", 4, "ngIf"], ["class", "auth-footer", 4, "ngIf"], [1, "legal-footer"], ["routerLink", "/privacy-policy"], [1, "dot"], ["routerLink", "/terms-of-service"], ["routerLink", "/refund-policy"], ["routerLink", "/about"], ["routerLink", "/contact"], [1, "auth-form", 3, "ngSubmit", "formGroup"], ["class", "alert alert-error", 4, "ngIf"], [1, "form-group"], ["for", "password"], [1, "password-input-wrapper"], ["id", "password", "formControlName", "password", "autocomplete", "new-password", "placeholder", "Enter new password", 1, "form-control", 3, "type"], ["type", "button", "tabindex", "-1", 1, "password-toggle", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "confirmPassword"], ["id", "confirmPassword", "formControlName", "confirmPassword", "autocomplete", "new-password", "placeholder", "Re-enter password", 1, "form-control", 3, "type"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], [1, "alert", "alert-error"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "invalid-feedback"], [1, "loading-spinner"], ["cx", "12", "cy", "12", "r", "10", "opacity", "0.25"], ["d", "M12 2a10 10 0 0 1 10 10", "opacity", "0.75"], [1, "error-state"], ["routerLink", "/forgot-password", 1, "btn", "btn-primary"], [1, "success-message"], [1, "success-icon"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], ["routerLink", "/login", 1, "btn", "btn-primary"], [1, "auth-footer"], ["routerLink", "/login"]], template: function ResetPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
        \u0275\u0275text(6, "1min");
        \u0275\u0275elementStart(7, "span");
        \u0275\u0275text(8, "cv.com");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(9, "h1");
        \u0275\u0275text(10, "Set New Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "Create a strong password for your account");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, ResetPasswordComponent_form_13_Template, 23, 17, "form", 6)(14, ResetPasswordComponent_div_14_Template, 9, 1, "div", 7)(15, ResetPasswordComponent_div_15_Template, 11, 1, "div", 8)(16, ResetPasswordComponent_div_16_Template, 5, 0, "div", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 10)(18, "a", 11);
        \u0275\u0275text(19, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "span", 12);
        \u0275\u0275text(21, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "a", 13);
        \u0275\u0275text(23, "Terms of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "span", 12);
        \u0275\u0275text(25, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 14);
        \u0275\u0275text(27, "Refund Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 12);
        \u0275\u0275text(29, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "a", 15);
        \u0275\u0275text(31, "About Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "span", 12);
        \u0275\u0275text(33, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "a", 16);
        \u0275\u0275text(35, "Contact Us");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", !ctx.success && !(!ctx.token || !ctx.email));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.success && (!ctx.token || !ctx.email));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.success);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.success);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterModule, RouterLink], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 20px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  padding: 48px;\n  width: 100%;\n  max-width: 440px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.auth-logo[_ngcontent-%COMP%] {\n  max-width: 280px;\n  height: auto;\n  margin-bottom: 24px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 8px 0;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #718096;\n  margin: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 8px;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 15px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #f56565;\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #a0aec0;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.password-toggle[_ngcontent-%COMP%]:hover {\n  color: #667eea;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  color: #f56565;\n  font-size: 13px;\n  margin-top: 6px;\n}\n.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 24px;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.loading-spinner[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #fff5f5;\n  color: #c53030;\n  border: 1px solid #feb2b2;\n}\n.success-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px 0;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.success-icon[_ngcontent-%COMP%] {\n  color: #48bb78;\n  margin-bottom: 24px;\n  display: flex;\n  justify-content: center;\n}\n.success-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #1a202c;\n  margin-bottom: 12px;\n}\n.success-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #718096;\n  margin-bottom: 32px;\n  line-height: 1.6;\n}\n.error-state[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 24px;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 24px;\n  border-top: 1px solid #e2e8f0;\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #718096;\n  margin: 0;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n}\n@media (max-width: 480px) {\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n  }\n}\n/*# sourceMappingURL=reset-password.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent", filePath: "src\\app\\auth\\reset-password\\reset-password.component.ts", lineNumber: 14 });
})();
export {
  ResetPasswordComponent
};
//# sourceMappingURL=chunk-F6WVXGT6.js.map
