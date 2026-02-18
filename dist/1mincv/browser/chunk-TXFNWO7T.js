import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-U2NUFKCF.js";
import {
  AuthService
} from "./chunk-Y3QV4HHY.js";
import "./chunk-VXOSVJKN.js";
import {
  CommonModule,
  Location,
  NgIf,
  Router,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-TRI43INR.js";
import "./chunk-PZQZAEDH.js";

// src/app/profile/profile.component.ts
function ProfileComponent_div_77__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 15);
    \u0275\u0275element(1, "polyline", 52);
    \u0275\u0275elementEnd();
  }
}
function ProfileComponent_div_77__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 15);
    \u0275\u0275element(1, "circle", 53)(2, "line", 54)(3, "line", 55);
    \u0275\u0275elementEnd();
  }
}
function ProfileComponent_div_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275template(1, ProfileComponent_div_77__svg_svg_1_Template, 2, 0, "svg", 51)(2, ProfileComponent_div_77__svg_svg_2_Template, 4, 0, "svg", 51);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("error", ctx_r0.messageType === "error")("success", ctx_r0.messageType === "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.messageType === "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.messageType === "error");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.message);
  }
}
function ProfileComponent_span_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 56);
  }
}
var ProfileComponent = class _ProfileComponent {
  constructor(authService, router, location) {
    this.authService = authService;
    this.router = router;
    this.location = location;
    this.user = null;
    this.isLoading = false;
    this.isSaving = false;
    this.message = "";
    this.messageType = "success";
    this.firstName = "";
    this.lastName = "";
    this.phone = "";
    this.email = "";
  }
  ngOnInit() {
    this.user = this.authService.currentUserValue;
    if (this.user) {
      this.firstName = this.user.firstName || "";
      this.lastName = this.user.lastName || "";
      this.phone = this.user.phoneNumber || this.user.phone || "";
      this.email = this.user.email || "";
    } else {
      this.router.navigate(["/login"]);
    }
  }
  goBack() {
    this.location.back();
  }
  goToBilling() {
    this.router.navigate(["/billing/plans"]);
  }
  onSubmit() {
    if (!this.user)
      return;
    this.isSaving = true;
    this.message = "";
    const updateData = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phone
    };
    this.authService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.message = "Profile updated successfully";
        this.messageType = "success";
        this.isSaving = false;
      },
      error: (error) => {
        this.message = error.message || "Failed to update profile";
        this.messageType = "error";
        this.isSaving = false;
      }
    });
  }
  static {
    this.\u0275fac = function ProfileComponent_Factory(t) {
      return new (t || _ProfileComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(Location));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 84, vars: 12, consts: [[1, "profile-container"], [1, "profile-header"], [1, "back-btn", 3, "click"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M19 12H5"], ["d", "M12 19l-7-7 7-7"], [1, "profile-card"], [1, "profile-sidebar"], [1, "avatar-container"], [1, "avatar"], [1, "user-identity"], [1, "email-text"], [1, "badge"], [1, "sidebar-menu"], [1, "menu-item", "active"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "menu-item"], ["d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"], [1, "menu-item", 3, "click"], ["x", "2", "y", "5", "width", "20", "height", "14", "rx", "2"], ["x1", "2", "y1", "10", "x2", "22", "y2", "10"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"], [1, "profile-main-content"], [1, "content-header"], [1, "profile-form", 3, "ngSubmit"], [1, "form-row-grid"], [1, "form-group", "span-2"], ["for", "email"], [1, "input-with-icon"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], ["type", "email", "id", "email", "disabled", "", 1, "form-control", "disabled", 3, "value"], [1, "help-text"], [1, "form-group"], ["for", "firstName"], ["type", "text", "id", "firstName", "name", "firstName", "placeholder", "First name", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "lastName"], ["type", "text", "id", "lastName", "name", "lastName", "placeholder", "Last name", 1, "form-control", 3, "ngModelChange", "ngModel"], ["for", "phone"], ["d", "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"], ["type", "tel", "id", "phone", "name", "phone", "placeholder", "+1 (555) 000-0000", 1, "form-control", 3, "ngModelChange", "ngModel"], ["class", "message", 3, "error", "success", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["class", "spinner", 4, "ngIf"], [1, "message"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], ["points", "20 6 9 17 4 12"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "spinner"]], template: function ProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_2_listener() {
          return ctx.goBack();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "path", 4)(5, "path", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "h1");
        \u0275\u0275text(7, "Profile Settings");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "div", 8)(11, "div", 9);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 10)(14, "h2");
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p", 11);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "span", 12);
        \u0275\u0275text(19, "Pro Member");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(20, "div", 13)(21, "div", 14);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(22, "svg", 15);
        \u0275\u0275element(23, "path", 16)(24, "circle", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(25, "span");
        \u0275\u0275text(26, "Personal Info");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 18);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(28, "svg", 15);
        \u0275\u0275element(29, "path", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(30, "span");
        \u0275\u0275text(31, "Security");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 20);
        \u0275\u0275listener("click", function ProfileComponent_Template_div_click_32_listener() {
          return ctx.goToBilling();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(33, "svg", 15);
        \u0275\u0275element(34, "rect", 21)(35, "line", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(36, "span");
        \u0275\u0275text(37, "Billing & Plans");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "div", 18);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(39, "svg", 15);
        \u0275\u0275element(40, "circle", 23)(41, "path", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(42, "span");
        \u0275\u0275text(43, "Preferences");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(44, "div", 25)(45, "div", 26)(46, "h2");
        \u0275\u0275text(47, "Edit Profile");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "p");
        \u0275\u0275text(49, "Update your personal information");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "form", 27);
        \u0275\u0275listener("ngSubmit", function ProfileComponent_Template_form_ngSubmit_50_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(51, "div", 28)(52, "div", 29)(53, "label", 30);
        \u0275\u0275text(54, "Email Address");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "div", 31);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(56, "svg", 32);
        \u0275\u0275element(57, "path", 33)(58, "polyline", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(59, "input", 35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "span", 36);
        \u0275\u0275text(61, "Email address cannot be changed");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(62, "div", 37)(63, "label", 38);
        \u0275\u0275text(64, "First Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "input", 39);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_65_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.firstName, $event) || (ctx.firstName = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(66, "div", 37)(67, "label", 40);
        \u0275\u0275text(68, "Last Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "input", 41);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_69_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.lastName, $event) || (ctx.lastName = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(70, "div", 29)(71, "label", 42);
        \u0275\u0275text(72, "Phone Number");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "div", 31);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(74, "svg", 32);
        \u0275\u0275element(75, "path", 43);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(76, "input", 44);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_76_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.phone, $event) || (ctx.phone = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(77, ProfileComponent_div_77_Template, 5, 7, "div", 45);
        \u0275\u0275elementStart(78, "div", 46)(79, "button", 47);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_79_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(80, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "button", 48);
        \u0275\u0275template(82, ProfileComponent_span_82_Template, 1, 0, "span", 49);
        \u0275\u0275text(83);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate1(" ", ctx.firstName ? ctx.firstName[0].toUpperCase() : "U", " ");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate2("", ctx.firstName, " ", ctx.lastName, "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.email);
        \u0275\u0275advance(42);
        \u0275\u0275property("value", ctx.email);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.firstName);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.lastName);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.phone);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.message);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.isSaving);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isSaving);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isSaving ? "Saving..." : "Save Changes", " ");
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], styles: ['\n\n.profile-container[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  margin: 40px auto;\n  padding: 24px;\n  animation: _ngcontent-%COMP%_fadeIn 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.profile-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  margin-bottom: 32px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  background: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  color: #555;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: white;\n  transform: translateX(-3px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  color: #667eea;\n  border-color: rgba(102, 126, 234, 0.2);\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 28px;\n  font-weight: 700;\n  color: #1a1a2e;\n  letter-spacing: -0.5px;\n}\n.profile-card[_ngcontent-%COMP%] {\n  display: flex;\n  background: white;\n  border-radius: 24px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(0, 0, 0, 0.02);\n  overflow: hidden;\n  min-height: 600px;\n}\n.profile-sidebar[_ngcontent-%COMP%] {\n  width: 300px;\n  background: #fdfdfd;\n  border-right: 1px solid #f0f0f0;\n  padding: 32px;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n}\n.avatar-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  margin-bottom: 40px;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 40px;\n  font-weight: 700;\n  color: white;\n  box-shadow: 0 10px 25px rgba(118, 75, 162, 0.3);\n  margin-bottom: 16px;\n  position: relative;\n  overflow: hidden;\n}\n.avatar[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.2),\n      transparent);\n}\n.user-identity[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 20px;\n  font-weight: 700;\n  color: #1a1a2e;\n}\n.email-text[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: #666;\n  font-size: 14px;\n}\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  background: rgba(102, 126, 234, 0.1);\n  color: #667eea;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.sidebar-menu[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  color: #555;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-weight: 500;\n  font-size: 14px;\n}\n.menu-item[_ngcontent-%COMP%]:hover {\n  background: #f5f5f7;\n  color: #333;\n}\n.menu-item.active[_ngcontent-%COMP%] {\n  background: #f0f3ff;\n  color: #667eea;\n  font-weight: 600;\n}\n.profile-main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 40px 48px;\n  background: white;\n}\n.content-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.content-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  color: #1a1a2e;\n}\n.content-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n}\n.profile-form[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.form-row-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-bottom: 32px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.form-group.span-2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 600;\n  font-size: 13px;\n  color: #444;\n  letter-spacing: 0.3px;\n  text-transform: uppercase;\n}\n.input-with-icon[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-with-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  color: #999;\n  pointer-events: none;\n}\n.input-with-icon[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-left: 44px;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 16px;\n  border: 1px solid #e0e0e0;\n  border-radius: 12px;\n  font-size: 15px;\n  transition: all 0.2s;\n  background: #fdfdfd;\n  color: #333;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #667eea;\n  background: white;\n  outline: none;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.form-control.disabled[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  color: #666;\n  border-color: #eee;\n  cursor: not-allowed;\n  opacity: 0.9;\n}\n.help-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #888;\n  margin-top: 8px;\n  display: block;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 16px;\n  padding-top: 32px;\n  border-top: 1px solid #f0f0f0;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 28px;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n  letter-spacing: 0.3px;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #ddd;\n  color: #555;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n  color: #333;\n  border-color: #ccc;\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);\n}\n.message[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.message.success[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #1b5e20;\n  border: 1px solid #c8e6c9;\n}\n.message.error[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #b71c1c;\n  border: 1px solid #ffcdd2;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 900px) {\n  .profile-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    min-height: auto;\n  }\n  .profile-sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    border-right: none;\n    border-bottom: 1px solid #f0f0f0;\n    padding: 24px;\n  }\n  .profile-main-content[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n  .form-row-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-group.span-2[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n}\n/*# sourceMappingURL=profile.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src\\app\\profile\\profile.component.ts", lineNumber: 15 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-TXFNWO7T.js.map
