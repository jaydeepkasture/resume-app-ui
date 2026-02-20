import {
  AuthService
} from "./chunk-6TPTVFIG.js";
import "./chunk-L2AZJT22.js";
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
} from "./chunk-U2NUFKCF.js";
import {
  environment
} from "./chunk-UE6KENAU.js";
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
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-TRI43INR.js";
import "./chunk-PZQZAEDH.js";

// src/app/auth/register/register.component.ts
function RegisterComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 43);
    \u0275\u0275element(2, "circle", 44)(3, "line", 45)(4, "line", 46);
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
function RegisterComponent_div_19_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "First name is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_19_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "First name must be at least 2 characters");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, RegisterComponent_div_19_span_1_Template, 2, 0, "span", 31)(2, RegisterComponent_div_19_span_2_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["firstName"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["firstName"].errors["minlength"]);
  }
}
function RegisterComponent_div_24_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Last name is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_24_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Last name must be at least 2 characters");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, RegisterComponent_div_24_span_1_Template, 2, 0, "span", 31)(2, RegisterComponent_div_24_span_2_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["lastName"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["lastName"].errors["minlength"]);
  }
}
function RegisterComponent_div_29_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_29_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid email");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, RegisterComponent_div_29_span_1_Template, 2, 0, "span", 31)(2, RegisterComponent_div_29_span_2_Template, 2, 0, "span", 31);
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
function RegisterComponent_div_36_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please enter a valid 10-digit phone number");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, RegisterComponent_div_36_span_1_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["phone"].errors["pattern"]);
  }
}
function RegisterComponent__svg_svg_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 43);
    \u0275\u0275element(1, "path", 48)(2, "circle", 49);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent__svg_svg_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 43);
    \u0275\u0275element(1, "path", 50)(2, "line", 51);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_45_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_45_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Password must be at least 6 characters");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, RegisterComponent_div_45_span_1_Template, 2, 0, "span", 31)(2, RegisterComponent_div_45_span_2_Template, 2, 0, "span", 31);
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
function RegisterComponent__svg_svg_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 43);
    \u0275\u0275element(1, "path", 48)(2, "circle", 49);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent__svg_svg_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 43);
    \u0275\u0275element(1, "path", 50)(2, "line", 51);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_54_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Please confirm your password");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_54_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Passwords do not match");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, RegisterComponent_div_54_span_1_Template, 2, 0, "span", 31)(2, RegisterComponent_div_54_span_2_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["confirmPassword"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["confirmPassword"].errors["passwordMismatch"]);
  }
}
function RegisterComponent_div_65_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "You must accept the terms and conditions");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275template(1, RegisterComponent_div_65_span_1_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["acceptTerms"].errors["required"]);
  }
}
function RegisterComponent_span_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Create Account");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_span_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 43);
    \u0275\u0275element(2, "circle", 53)(3, "path", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Creating account... ");
    \u0275\u0275elementEnd();
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor(formBuilder, authService, router) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.loading = false;
    this.submitted = false;
    this.error = "";
    this.showPassword = false;
    this.showConfirmPassword = false;
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"]);
    }
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.pattern(/^[0-9]{10}$/)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
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
  get f() {
    return this.registerForm.controls;
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
    if (this.registerForm.invalid) {
      console.log("Form is invalid:", this.registerForm.errors);
      return;
    }
    this.loading = true;
    const userData = {
      firstName: this.f["firstName"].value,
      lastName: this.f["lastName"].value,
      email: this.f["email"].value,
      phone: this.f["phone"].value,
      password: this.f["password"].value,
      confirmPassword: this.f["confirmPassword"].value
    };
    console.log("\u{1F4E4} Sending registration request:", {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    });
    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log("\u2705 Registration response:", response);
        if (response.status) {
          this.router.navigate(["/"]);
        } else {
          this.error = response.message || "Registration failed. Please try again.";
          this.loading = false;
        }
      },
      error: (error) => {
        console.error("\u274C Registration error:", error);
        if (error.message.includes("0 Unknown Error")) {
          this.error = `Cannot connect to server. Please ensure the backend is running on ${environment.apiUrl.replace("/api", "")}`;
        } else if (error.message.includes("CORS")) {
          this.error = "CORS error. Please check backend CORS configuration.";
        } else {
          this.error = error.message || "Registration failed. Please try again.";
        }
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 93, vars: 30, consts: [[1, "auth-container"], [1, "auth-card"], [1, "auth-header"], [1, "brand-logo-container"], [1, "brand-logo"], [1, "logo-text"], [1, "auth-form", 3, "ngSubmit", "formGroup"], ["class", "alert alert-error", 4, "ngIf"], [1, "form-group"], ["for", "firstName"], ["type", "text", "id", "firstName", "formControlName", "firstName", "placeholder", "Enter your first name", 1, "form-control"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "lastName"], ["type", "text", "id", "lastName", "formControlName", "lastName", "placeholder", "Enter your last name", 1, "form-control"], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email", "placeholder", "Enter your email", 1, "form-control"], ["for", "phone"], [1, "optional"], ["type", "tel", "id", "phone", "formControlName", "phone", "placeholder", "Enter your phone number", 1, "form-control"], ["for", "password"], [1, "password-input-wrapper"], ["id", "password", "formControlName", "password", "placeholder", "Create a password", 1, "form-control", 3, "type"], ["type", "button", "tabindex", "-1", 1, "password-toggle", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], ["for", "confirmPassword"], ["id", "confirmPassword", "formControlName", "confirmPassword", "placeholder", "Confirm your password", 1, "form-control", 3, "type"], [1, "checkbox-label"], ["type", "checkbox", "formControlName", "acceptTerms"], ["routerLink", "/terms-of-service", 1, "link"], ["routerLink", "/privacy-policy", 1, "link"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [4, "ngIf"], ["class", "loading-spinner", 4, "ngIf"], [1, "auth-footer"], ["routerLink", "/login"], [1, "legal-footer"], ["routerLink", "/privacy-policy"], [1, "dot"], ["routerLink", "/terms-of-service"], ["routerLink", "/refund-policy"], ["routerLink", "/about"], ["routerLink", "/contact"], [1, "alert", "alert-error"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "invalid-feedback"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"], [1, "loading-spinner"], ["cx", "12", "cy", "12", "r", "10", "opacity", "0.25"], ["d", "M12 2a10 10 0 0 1 10 10", "opacity", "0.75"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
        \u0275\u0275text(6, "1min");
        \u0275\u0275elementStart(7, "span");
        \u0275\u0275text(8, "cv.com");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(9, "h1");
        \u0275\u0275text(10, "Create Account");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "Sign up to get started with your resume");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "form", 6);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_13_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275template(14, RegisterComponent_div_14_Template, 6, 1, "div", 7);
        \u0275\u0275elementStart(15, "div", 8)(16, "label", 9);
        \u0275\u0275text(17, "First Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "input", 10);
        \u0275\u0275template(19, RegisterComponent_div_19_Template, 3, 2, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 8)(21, "label", 12);
        \u0275\u0275text(22, "Last Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "input", 13);
        \u0275\u0275template(24, RegisterComponent_div_24_Template, 3, 2, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div", 8)(26, "label", 14);
        \u0275\u0275text(27, "Email Address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(28, "input", 15);
        \u0275\u0275template(29, RegisterComponent_div_29_Template, 3, 2, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div", 8)(31, "label", 16);
        \u0275\u0275text(32, "Phone Number ");
        \u0275\u0275elementStart(33, "span", 17);
        \u0275\u0275text(34, "(Optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(35, "input", 18);
        \u0275\u0275template(36, RegisterComponent_div_36_Template, 2, 1, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "div", 8)(38, "label", 19);
        \u0275\u0275text(39, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 20);
        \u0275\u0275element(41, "input", 21);
        \u0275\u0275elementStart(42, "button", 22);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_42_listener() {
          return ctx.togglePasswordVisibility("password");
        });
        \u0275\u0275template(43, RegisterComponent__svg_svg_43_Template, 3, 0, "svg", 23)(44, RegisterComponent__svg_svg_44_Template, 3, 0, "svg", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(45, RegisterComponent_div_45_Template, 3, 2, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "div", 8)(47, "label", 24);
        \u0275\u0275text(48, "Confirm Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "div", 20);
        \u0275\u0275element(50, "input", 25);
        \u0275\u0275elementStart(51, "button", 22);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_51_listener() {
          return ctx.togglePasswordVisibility("confirmPassword");
        });
        \u0275\u0275template(52, RegisterComponent__svg_svg_52_Template, 3, 0, "svg", 23)(53, RegisterComponent__svg_svg_53_Template, 3, 0, "svg", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(54, RegisterComponent_div_54_Template, 3, 2, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "div", 8)(56, "label", 26);
        \u0275\u0275element(57, "input", 27);
        \u0275\u0275elementStart(58, "span");
        \u0275\u0275text(59, "I agree to the ");
        \u0275\u0275elementStart(60, "a", 28);
        \u0275\u0275text(61, "Terms and Conditions");
        \u0275\u0275elementEnd();
        \u0275\u0275text(62, " & ");
        \u0275\u0275elementStart(63, "a", 29);
        \u0275\u0275text(64, "Privacy Policy");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(65, RegisterComponent_div_65_Template, 2, 1, "div", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "button", 30);
        \u0275\u0275template(67, RegisterComponent_span_67_Template, 2, 0, "span", 31)(68, RegisterComponent_span_68_Template, 5, 0, "span", 32);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(69, "div", 33)(70, "p");
        \u0275\u0275text(71, "Already have an account? ");
        \u0275\u0275elementStart(72, "a", 34);
        \u0275\u0275text(73, "Sign in");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(74, "div", 35)(75, "a", 36);
        \u0275\u0275text(76, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "span", 37);
        \u0275\u0275text(78, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(79, "a", 38);
        \u0275\u0275text(80, "Terms of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "span", 37);
        \u0275\u0275text(82, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "a", 39);
        \u0275\u0275text(84, "Refund Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "span", 37);
        \u0275\u0275text(86, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(87, "a", 40);
        \u0275\u0275text(88, "About Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(89, "span", 37);
        \u0275\u0275text(90, "\u2022");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(91, "a", 41);
        \u0275\u0275text(92, "Contact Us");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("formGroup", ctx.registerForm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["firstName"].errors);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["firstName"].errors);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["lastName"].errors);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["lastName"].errors);
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["email"].errors);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["email"].errors);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["phone"].errors);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["phone"].errors);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["password"].errors);
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["password"].errors);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("is-invalid", ctx.submitted && ctx.f["confirmPassword"].errors);
        \u0275\u0275property("type", ctx.showConfirmPassword ? "text" : "password");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.showConfirmPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showConfirmPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["confirmPassword"].errors);
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.submitted && ctx.f["acceptTerms"].errors);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterModule, RouterLink], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 20px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  padding: 48px;\n  width: 100%;\n  max-width: 480px;\n  animation: _ngcontent-%COMP%_slideUp 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.auth-logo[_ngcontent-%COMP%] {\n  max-width: 280px;\n  height: auto;\n  margin-bottom: 24px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0 0 8px 0;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #718096;\n  margin: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 8px;\n}\n.optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #a0aec0;\n  font-size: 13px;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 15px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  transition: all 0.2s;\n  box-sizing: border-box;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #f56565;\n}\n.form-control.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #a0aec0;\n  padding: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.password-toggle[_ngcontent-%COMP%]:hover {\n  color: #667eea;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  color: #f56565;\n  font-size: 13px;\n  margin-top: 6px;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  cursor: pointer;\n  font-size: 14px;\n  color: #4a5568;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  margin-right: 8px;\n  margin-top: 2px;\n  cursor: pointer;\n}\n.link[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 500;\n  transition: color 0.2s;\n}\n.link[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n}\n.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 24px;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 8px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.loading-spinner[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #fff5f5;\n  color: #c53030;\n  border: 1px solid #feb2b2;\n}\n.alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 24px;\n  border-top: 1px solid #e2e8f0;\n}\n.auth-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #718096;\n  margin: 0;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n}\n@media (max-width: 480px) {\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\auth\\register\\register.component.ts", lineNumber: 15 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-B4XO7DI4.js.map
