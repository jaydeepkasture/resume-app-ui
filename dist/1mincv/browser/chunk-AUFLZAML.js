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
import {
  HttpService
} from "./chunk-4PD7N7KF.js";
import {
  CommonModule,
  NgIf,
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
  ɵɵtextInterpolate1
} from "./chunk-TRI43INR.js";
import "./chunk-PZQZAEDH.js";

// src/app/pages/contact/contact.component.ts
function ContactComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "polyline", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Thank you! Your message has been sent successfully. We'll get back to you soon. ");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "circle", 34)(3, "line", 35)(4, "line", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitError, " ");
  }
}
function ContactComponent_form_55_div_5_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Name is required");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_div_5_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Name cannot exceed 100 characters");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275template(1, ContactComponent_form_55_div_5_span_1_Template, 2, 0, "span", 47)(2, ContactComponent_form_55_div_5_span_2_Template, 2, 0, "span", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["name"].errors == null ? null : ctx_r0.f["name"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["name"].errors == null ? null : ctx_r0.f["name"].errors["maxlength"]);
  }
}
function ContactComponent_form_55_div_10_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_div_10_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Invalid email format");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_div_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email cannot exceed 255 characters");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275template(1, ContactComponent_form_55_div_10_span_1_Template, 2, 0, "span", 47)(2, ContactComponent_form_55_div_10_span_2_Template, 2, 0, "span", 47)(3, ContactComponent_form_55_div_10_span_3_Template, 2, 0, "span", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].errors == null ? null : ctx_r0.f["email"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].errors == null ? null : ctx_r0.f["email"].errors["email"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].errors == null ? null : ctx_r0.f["email"].errors["maxlength"]);
  }
}
function ContactComponent_form_55_div_15_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Message is required");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_div_15_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Message cannot exceed 2000 characters");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275template(1, ContactComponent_form_55_div_15_span_1_Template, 2, 0, "span", 47)(2, ContactComponent_form_55_div_15_span_2_Template, 2, 0, "span", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["message"].errors == null ? null : ctx_r0.f["message"].errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["message"].errors == null ? null : ctx_r0.f["message"].errors["maxlength"]);
  }
}
function ContactComponent_form_55_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Send Message");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 51);
    \u0275\u0275element(2, "circle", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Sending... ");
    \u0275\u0275elementEnd();
  }
}
function ContactComponent_form_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 37);
    \u0275\u0275listener("ngSubmit", function ContactComponent_form_55_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 38)(2, "label", 39);
    \u0275\u0275text(3, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 40);
    \u0275\u0275template(5, ContactComponent_form_55_div_5_Template, 3, 2, "div", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 38)(7, "label", 42);
    \u0275\u0275text(8, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 43);
    \u0275\u0275template(10, ContactComponent_form_55_div_10_Template, 4, 3, "div", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 38)(12, "label", 44);
    \u0275\u0275text(13, "Message");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "textarea", 45);
    \u0275\u0275template(15, ContactComponent_form_55_div_15_Template, 3, 2, "div", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 46);
    \u0275\u0275template(17, ContactComponent_form_55_span_17_Template, 2, 0, "span", 47)(18, ContactComponent_form_55_span_18_Template, 4, 0, "span", 48);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.contactForm);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", ctx_r0.f["name"].touched && ctx_r0.f["name"].invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["name"].touched && ctx_r0.f["name"].invalid);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", ctx_r0.f["email"].touched && ctx_r0.f["email"].invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["email"].touched && ctx_r0.f["email"].invalid);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", ctx_r0.f["message"].touched && ctx_r0.f["message"].invalid);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.f["message"].touched && ctx_r0.f["message"].invalid);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isSubmitting);
  }
}
var ContactComponent = class _ContactComponent {
  constructor(fb, httpService) {
    this.fb = fb;
    this.httpService = httpService;
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.isSubmitting = false;
    this.submitSuccess = false;
    this.submitError = "";
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(255)]],
      message: ["", [Validators.required, Validators.maxLength(2e3)]]
    });
  }
  onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }
    this.isSubmitting = true;
    this.submitError = "";
    this.submitSuccess = false;
    this.httpService.postApi("contact/submit", this.contactForm.value).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.contactForm.reset();
      },
      error: (err) => {
        this.submitError = err.message || "An error occurred while sending your message. Please try again.";
        this.isSubmitting = false;
      }
    });
  }
  markFormGroupTouched(formGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  // Helper for template access
  get f() {
    return this.contactForm.controls;
  }
  static {
    this.\u0275fac = function ContactComponent_Factory(t) {
      return new (t || _ContactComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HttpService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContactComponent, selectors: [["app-contact"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 69, vars: 4, consts: [[1, "contact-container"], [1, "contact-header"], [1, "container"], ["routerLink", "/", 1, "back-link"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "subtitle"], [1, "contact-content", "container"], [1, "contact-grid"], [1, "contact-info"], [1, "info-card"], [1, "icon-box"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], [1, "info-text"], [1, "desc"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"], ["cx", "12", "cy", "10", "r", "3"], ["d", "M22 12h-4l-3 9L9 3l-3 9H2"], [1, "contact-form-card"], ["class", "alert success-alert", 4, "ngIf"], ["class", "alert error-alert", 4, "ngIf"], ["class", "contact-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "contact-footer"], [1, "footer-links"], ["routerLink", "/privacy-policy"], ["routerLink", "/terms-of-service"], ["routerLink", "/refund-policy"], ["routerLink", "/about"], [1, "alert", "success-alert"], ["points", "20 6 9 17 4 12"], [1, "alert", "error-alert"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "contact-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "Your Name"], ["class", "error-message", 4, "ngIf"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "Your Email"], ["for", "message"], ["id", "message", "rows", "4", "formControlName", "message", "placeholder", "How can we help?"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [4, "ngIf"], ["class", "loader-text", 4, "ngIf"], [1, "error-message"], [1, "loader-text"], ["viewBox", "0 0 50 50", 1, "spinner"], ["cx", "25", "cy", "25", "r", "20", "fill", "none", "stroke-width", "5", 1, "path"]], template: function ContactComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 4);
        \u0275\u0275element(5, "line", 5)(6, "polyline", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Back to Home ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(8, "h1");
        \u0275\u0275text(9, "Contact Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 7);
        \u0275\u0275text(11, "Have questions? We're here to help you build your future.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "div", 10)(15, "div", 11)(16, "div", 12);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 13);
        \u0275\u0275element(18, "path", 14)(19, "polyline", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "div", 16)(21, "h3");
        \u0275\u0275text(22, "Email Support");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "p");
        \u0275\u0275text(24, "support@1mincv.com");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p", 17);
        \u0275\u0275text(26, "Response time: Within 24 hours");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "div", 11)(28, "div", 12);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(29, "svg", 13);
        \u0275\u0275element(30, "path", 18)(31, "circle", 19);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(32, "div", 16)(33, "h3");
        \u0275\u0275text(34, "Office Address");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "p");
        \u0275\u0275text(36, "Nagpur, Maharashtra, India");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "p", 17);
        \u0275\u0275text(38, "1mincv Platform Operations");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(39, "div", 11)(40, "div", 12);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(41, "svg", 13);
        \u0275\u0275element(42, "path", 20);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(43, "div", 16)(44, "h3");
        \u0275\u0275text(45, "Support Hours");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "p");
        \u0275\u0275text(47, "Mon - Fri: 9:00 AM - 6:00 PM IST");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "p", 17);
        \u0275\u0275text(49, "Weekend support available for premium users");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(50, "div", 21)(51, "h2");
        \u0275\u0275text(52, "Send us a message");
        \u0275\u0275elementEnd();
        \u0275\u0275template(53, ContactComponent_div_53_Template, 4, 0, "div", 22)(54, ContactComponent_div_54_Template, 6, 1, "div", 23)(55, ContactComponent_form_55_Template, 19, 13, "form", 24);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(56, "footer", 25)(57, "div", 2)(58, "div", 26)(59, "a", 27);
        \u0275\u0275text(60, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "a", 28);
        \u0275\u0275text(62, "Terms of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "a", 29);
        \u0275\u0275text(64, "Refund Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "a", 30);
        \u0275\u0275text(66, "About Us");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(67, "p");
        \u0275\u0275text(68);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(53);
        \u0275\u0275property("ngIf", ctx.submitSuccess);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.submitError);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.submitSuccess);
        \u0275\u0275advance(13);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " 1mincv.com. All rights reserved.");
      }
    }, dependencies: [CommonModule, NgIf, RouterModule, RouterLink, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.contact-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #f8fafc;\n  color: #1e293b;\n  display: flex;\n  flex-direction: column;\n}\n.contact-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #a855f7 100%);\n  color: white;\n  padding: 80px 0 60px;\n  text-align: center;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: rgba(255, 255, 255, 0.9);\n  text-decoration: none;\n  font-size: 0.95rem;\n  margin-bottom: 24px;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: white;\n}\n.contact-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  margin-bottom: 12px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  opacity: 0.9;\n}\n.contact-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-top: -40px;\n  padding-bottom: 80px;\n}\n.contact-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1.5fr;\n  gap: 40px;\n}\n.contact-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.info-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 30px;\n  border-radius: 20px;\n  display: flex;\n  gap: 20px;\n  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.05);\n  transition: transform 0.2s;\n}\n.info-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n}\n.icon-box[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  background: #f1f5f9;\n  color: #6366f1;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.info-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin-bottom: 6px;\n}\n.info-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #475569;\n  margin: 0 0 4px 0;\n}\n.info-text[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #94a3b8;\n}\n.contact-form-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 40px;\n  border-radius: 24px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);\n}\n.contact-form-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin-bottom: 30px;\n}\n.contact-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #475569;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 1rem;\n  transition: all 0.2s;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  background: white;\n  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);\n}\n.submit-btn[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-top: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4f46e5;\n  transform: translateY(-1px);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.form-group[_ngcontent-%COMP%]   input.invalid[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea.invalid[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 0.8rem;\n  font-weight: 500;\n  margin-top: 4px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 0.95rem;\n  line-height: 1.5;\n}\n.success-alert[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #166534;\n  border: 1px solid #bbf7d0;\n}\n.error-alert[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #991b1b;\n  border: 1px solid #fecaca;\n}\n.loader-text[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.spinner[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_rotate 2s linear infinite;\n  width: 20px;\n  height: 20px;\n}\n.spinner[_ngcontent-%COMP%]   .path[_ngcontent-%COMP%] {\n  stroke: currentColor;\n  stroke-linecap: round;\n  animation: _ngcontent-%COMP%_dash 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_rotate {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_dash {\n  0% {\n    stroke-dasharray: 1, 150;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -35;\n  }\n  100% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -124;\n  }\n}\n.contact-footer[_ngcontent-%COMP%] {\n  padding: 40px 0;\n  background: white;\n  border-top: 1px solid #e2e8f0;\n  text-align: center;\n}\n.footer-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #64748b;\n  text-decoration: none;\n  font-size: 0.9rem;\n  transition: color 0.2s;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #6366f1;\n}\n.contact-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #94a3b8;\n  margin: 0;\n}\n@media (max-width: 900px) {\n  .contact-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .contact-info[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .contact-form-card[_ngcontent-%COMP%] {\n    order: 1;\n  }\n}\n/*# sourceMappingURL=contact.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContactComponent, { className: "ContactComponent", filePath: "src\\app\\pages\\contact\\contact.component.ts", lineNumber: 14 });
})();
export {
  ContactComponent
};
//# sourceMappingURL=chunk-AUFLZAML.js.map
