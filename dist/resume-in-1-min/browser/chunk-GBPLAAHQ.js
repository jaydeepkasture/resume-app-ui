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
} from "./chunk-6S4JDILR.js";
import {
  AuthService
} from "./chunk-OWHTODNA.js";
import {
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
} from "./chunk-NPJVZ2QG.js";
import "./chunk-PZQZAEDH.js";

// src/app/auth/forgot-password/forgot-password.component.ts
function ForgotPasswordComponent_form_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 17);
    \u0275\u0275element(2, "circle", 18)(3, "line", 19)(4, "line", 20);
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
function ForgotPasswordComponent_form_8_div_6_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_form_8_div_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_form_8_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275template(1, ForgotPasswordComponent_form_8_div_6_span_1_Template, 2, 0, "span", 14)(2, ForgotPasswordComponent_form_8_div_6_span_2_Template, 2, 0, "span", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["email"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.f["email"].errors["email"]);
  }
}
function ForgotPasswordComponent_form_8_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Send Reset Link");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_form_8_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 17);
    \u0275\u0275element(2, "circle", 23)(3, "path", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Sending... ");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_form_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function ForgotPasswordComponent_form_8_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275template(1, ForgotPasswordComponent_form_8_div_1_Template, 6, 1, "div", 8);
    \u0275\u0275elementStart(2, "div", 9)(3, "label", 10);
    \u0275\u0275text(4, "Email Address");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 11);
    \u0275\u0275template(6, ForgotPasswordComponent_form_8_div_6_Template, 3, 2, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 13);
    \u0275\u0275template(8, ForgotPasswordComponent_form_8_span_8_Template, 2, 0, "span", 14)(9, ForgotPasswordComponent_form_8_span_9_Template, 5, 0, "span", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.forgotForm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ctx_r1.submitted && ctx_r1.f["email"].errors);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitted && ctx_r1.f["email"].errors);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading);
  }
}
function ForgotPasswordComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 27);
    \u0275\u0275element(3, "path", 28)(4, "polyline", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "Email Sent!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 30);
    \u0275\u0275text(10, "Back to Login");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.success);
  }
}
function ForgotPasswordComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "p");
    \u0275\u0275text(2, "Remember your password? ");
    \u0275\u0275elementStart(3, "a", 32);
    \u0275\u0275text(4, "Sign in");
    \u0275\u0275elementEnd()()();
  }
}
var ForgotPasswordComponent = class _ForgotPasswordComponent {
  constructor(formBuilder, authService, router) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.loading = false;
    this.submitted = false;
    this.error = "";
    this.success = "";
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"]);
    }
    this.forgotForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
  // Convenience getter for easy access to form fields
  get f() {
    return this.forgotForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = "";
    this.success = "";
    if (this.forgotForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.forgotPassword({ email: this.f["email"].value }).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status) {
          this.success = response.message || "Password reset link has been sent to your email.";
        } else {
          this.error = response.message || "ForgotPassword request failed. Please try again.";
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || "ForgotPassword request failed. Please check your email and try again.";
      }
    });
  }
  static {
    this.\u0275fac = function ForgotPasswordComponent_Factory(t) {
      return new (t || _ForgotPasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgotPasswordComponent, selectors: [["app-forgot-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 3, consts: [[1, "auth-container"], [1, "auth-card"], [1, "auth-header"], ["src", "assets/logo.png", "alt", "Resume in 1 Min", 1, "auth-logo"], ["class", "auth-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "success-message", 4, "ngIf"], ["class", "auth-footer", 4, "ngIf"], [1, "auth-form", 3, "ngSubmit", "formGroup"], ["class", "alert alert-error", 4, "ngIf"], [1, "form-group"], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email", "placeholder", "Enter your registered email", 1, "form-control"], ["class", "invalid-feedback", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], [1, "alert", "alert-error"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "invalid-feedback"], [1, "loading-spinner"], ["cx", "12", "cy", "12", "r", "10", "opacity", "0.25"], ["d", "M12 2a10 10 0 0 1 10 10", "opacity", "0.75"], [1, "success-message"], [1, "success-icon"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], ["routerLink", "/login", 1, "btn", "btn-primary"], [1, "auth-footer"], ["routerLink", "/login"]], template: function ForgotPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Forgot Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Enter your email to receive a password reset link");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, ForgotPasswordComponent_form_8_Template, 10, 8, "form", 4)(9, ForgotPasswordComponent_div_9_Template, 11, 1, "div", 5)(10, ForgotPasswordComponent_div_10_Template, 5, 0, "div", 6);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", !ctx.success);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.success);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.success);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterModule, RouterLink], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 20px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  padding: 48px;\n  width: 100%;\n  max-width: 440px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.auth-logo[_ngcontent-%COMP%] {\n  max-width: 280px;\n  height: auto;\n  margin-bottom: 24px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 8px 0;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #718096;\n  margin: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 8px;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 15px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #f56565;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  color: #f56565;\n  font-size: 13px;\n  margin-top: 6px;\n}\n.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 24px;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.loading-spinner[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #fff5f5;\n  color: #c53030;\n  border: 1px solid #feb2b2;\n}\n.success-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px 0;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.success-icon[_ngcontent-%COMP%] {\n  color: #48bb78;\n  margin-bottom: 24px;\n  display: flex;\n  justify-content: center;\n}\n.success-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #1a202c;\n  margin-bottom: 12px;\n}\n.success-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #718096;\n  margin-bottom: 32px;\n  line-height: 1.6;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 24px;\n  border-top: 1px solid #e2e8f0;\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #718096;\n  margin: 0;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n}\n@media (max-width: 480px) {\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n  }\n}\n/*# sourceMappingURL=forgot-password.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgotPasswordComponent, { className: "ForgotPasswordComponent", filePath: "src\\app\\auth\\forgot-password\\forgot-password.component.ts", lineNumber: 14 });
})();
export {
  ForgotPasswordComponent
};
//# sourceMappingURL=chunk-GBPLAAHQ.js.map
