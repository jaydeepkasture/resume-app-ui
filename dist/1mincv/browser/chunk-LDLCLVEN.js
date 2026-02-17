import {
  AuthService
} from "./chunk-FEHFFYQA.js";
import {
  BillingApiService,
  CommonModule,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
} from "./chunk-IWCV675V.js";
import {
  __async
} from "./chunk-PZQZAEDH.js";

// src/app/billing/services/razorpay.service.ts
var RazorpayService = class _RazorpayService {
  loadScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("\u2705 Razorpay SDK loaded");
        resolve(true);
      };
      script.onerror = () => {
        console.error("\u274C Failed to load Razorpay SDK");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  openCheckout(options) {
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded!");
      return;
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }
  static {
    this.\u0275fac = function RazorpayService_Factory(t) {
      return new (t || _RazorpayService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RazorpayService, factory: _RazorpayService.\u0275fac, providedIn: "root" });
  }
};

// src/app/billing/pages/plans.component.ts
function PlansComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading plans...");
    \u0275\u0275elementEnd()();
  }
}
function PlansComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2, "No plans available at the moment.");
    \u0275\u0275elementEnd()();
  }
}
function PlansComponent_div_8_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1, "Popular");
    \u0275\u0275elementEnd();
  }
}
function PlansComponent_div_8_div_1_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("/ ", plan_r2.billingCycle, "");
  }
}
function PlansComponent_div_8_div_1_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 22);
    \u0275\u0275element(2, "polyline", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Priority AI Processing");
    \u0275\u0275elementEnd()();
  }
}
function PlansComponent_div_8_div_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 22);
    \u0275\u0275element(2, "polyline", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Premium Support");
    \u0275\u0275elementEnd()();
  }
}
function PlansComponent_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275template(1, PlansComponent_div_8_div_1_div_1_Template, 2, 0, "div", 11);
    \u0275\u0275elementStart(2, "h2", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "div", 14)(6, "div", 15)(7, "span", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 17);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, PlansComponent_div_8_div_1_span_11_Template, 2, 1, "span", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 19);
    \u0275\u0275listener("click", function PlansComponent_div_8_div_1_Template_button_click_12_listener() {
      const plan_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.subscribe(plan_r2));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 20)(15, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(16, "svg", 22);
    \u0275\u0275element(17, "polyline", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "span")(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Templates Allowed");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 22);
    \u0275\u0275element(24, "polyline", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(25, "span")(26, "strong");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(28, " API calls / min");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(29, PlansComponent_div_8_div_1_div_29_Template, 5, 0, "div", 24)(30, PlansComponent_div_8_div_1_div_30_Template, 5, 0, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const plan_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("pro-plan", plan_r2.planCode === "PRO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plan_r2.planCode === "PRO");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r2.planName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(plan_r2.currency);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r2.price === 0 ? "Free" : plan_r2.price);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plan_r2.price > 0);
    \u0275\u0275advance();
    \u0275\u0275classProp("processing", ctx_r2.processing);
    \u0275\u0275property("disabled", ctx_r2.processing);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.processing ? "Processing..." : plan_r2.price === 0 ? "Current Plan" : "Upgrade Now", " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(plan_r2.benefits["TEMPLATE_LIMIT"]);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(plan_r2.benefits["RATE_LIMIT_PER_MINUTE"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", plan_r2.planCode === "PRO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", plan_r2.planCode === "PRO");
  }
}
function PlansComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275template(1, PlansComponent_div_8_div_1_Template, 31, 15, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.plans);
  }
}
var PlansComponent = class _PlansComponent {
  constructor(billingApi, razorpay, authService) {
    this.billingApi = billingApi;
    this.razorpay = razorpay;
    this.authService = authService;
    this.plans = [];
    this.loading = true;
    this.processing = false;
  }
  ngOnInit() {
    this.billingApi.getPlansWithBenefits().subscribe({
      next: (res) => {
        this.plans = Array.isArray(res) ? res : res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load plans:", err);
        this.loading = false;
      }
    });
  }
  subscribe(plan) {
    return __async(this, null, function* () {
      if (this.processing)
        return;
      this.processing = true;
      if (plan.price === 0) {
        this.billingApi.subscribeFree(plan.planCode).subscribe({
          next: (res) => {
            this.processing = false;
            if (res.status) {
              alert("Free plan activated successfully!");
              this.authService.loadUserBenefits();
            } else {
              alert(res.message || "Failed to activate free plan");
            }
          },
          error: (err) => {
            this.processing = false;
            console.error("Free subscription error:", err);
            alert("Error activating free plan");
          }
        });
        return;
      }
      try {
        this.billingApi.createRazorpayOrder(plan.planPriceId || plan.planCode).subscribe({
          next: (res) => __async(this, null, function* () {
            if (!res.status || !res.data) {
              alert("Failed to create order");
              this.processing = false;
              return;
            }
            const order = res.data;
            const scriptLoaded = yield this.razorpay.loadScript();
            if (!scriptLoaded) {
              alert("Could not load payment gateway. Please check your internet connection.");
              this.processing = false;
              return;
            }
            const options = {
              key: order.key,
              amount: order.amount,
              currency: order.currency,
              order_id: order.orderId,
              name: "1mincv.com",
              description: "Subscription Plan",
              handler: (response) => this.confirmPayment(response),
              modal: {
                ondismiss: () => this.processing = false
              },
              prefill: {
                // You can add user email/phone here if available
              },
              theme: {
                color: "#4B70F5"
              }
            };
            this.razorpay.openCheckout(options);
          }),
          error: (err) => {
            console.error("Order creation error:", err);
            alert("Error creating order. Please try again.");
            this.processing = false;
          }
        });
      } catch (err) {
        console.error("Subscription flow error:", err);
        this.processing = false;
      }
    });
  }
  confirmPayment(response) {
    this.billingApi.confirmPayment({
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature
    }).subscribe({
      next: (res) => {
        this.processing = false;
        if (res.status) {
          alert("Subscription activated successfully!");
          this.authService.loadUserBenefits();
        } else {
          alert(res.message || "Payment confirmation failed");
        }
      },
      error: (err) => {
        console.error("Payment confirmation error:", err);
        alert("Error confirming payment. If the amount was deducted, please contact support.");
        this.processing = false;
      }
    });
  }
  static {
    this.\u0275fac = function PlansComponent_Factory(t) {
      return new (t || _PlansComponent)(\u0275\u0275directiveInject(BillingApiService), \u0275\u0275directiveInject(RazorpayService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlansComponent, selectors: [["app-plans"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 3, consts: [[1, "plans-container"], [1, "plans-header"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "plans-grid", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "empty-state"], [1, "plans-grid"], ["class", "plan-card", 3, "pro-plan", 4, "ngFor", "ngForOf"], [1, "plan-card"], ["class", "plan-badge", 4, "ngIf"], [1, "plan-name"], [1, "prices-container"], [1, "price-box"], [1, "price-value"], [1, "currency"], [1, "amount"], ["class", "cycle", 4, "ngIf"], [1, "subscribe-btn", 3, "click", "disabled"], [1, "plan-features"], [1, "feature-item"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "20 6 9 17 4 12"], ["class", "feature-item", 4, "ngIf"], [1, "plan-badge"], [1, "cycle"]], template: function PlansComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Choose Your Plan");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5, "Unlock premium features and templates to build your career.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, PlansComponent_div_6_Template, 4, 0, "div", 2)(7, PlansComponent_div_7_Template, 3, 0, "div", 3)(8, PlansComponent_div_8_Template, 2, 1, "div", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.plans.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.plans.length > 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['\n\n.plans-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 60px 20px;\n  font-family:\n    "Inter",\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\n.plans-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 50px;\n}\n.plans-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: #1a1a1a;\n  margin-bottom: 12px;\n}\n.plans-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #666;\n}\n.plans-grid[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 30px;\n  flex-wrap: wrap;\n}\n.plan-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 40px;\n  width: 100%;\n  max-width: 380px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);\n  border: 1px solid #f0f0f0;\n  position: relative;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  display: flex;\n  flex-direction: column;\n}\n.plan-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);\n}\n.plan-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  background: #4B70F5;\n  color: white;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.plan-name[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin-bottom: 25px;\n  color: #1a1a1a;\n}\n.price-box[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-value[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.currency[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #666;\n  vertical-align: top;\n  margin-right: 2px;\n}\n.amount[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: #1a1a1a;\n}\n.cycle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #666;\n}\n.subscribe-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #4B70F5;\n  color: white;\n  border: none;\n  padding: 14px;\n  border-radius: 12px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s ease;\n}\n.subscribe-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #3a5ed9;\n}\n.subscribe-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.plan-features[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  border-top: 1px solid #f0f0f0;\n  padding-top: 25px;\n}\n.feature-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n  color: #444;\n  font-size: 0.95rem;\n}\n.feature-item[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #4B70F5;\n}\n.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 100px 0;\n}\n@media (max-width: 768px) {\n  .plans-container[_ngcontent-%COMP%] {\n    padding: 40px 15px;\n  }\n  .plans-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n}\n/*# sourceMappingURL=plans.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlansComponent, { className: "PlansComponent", filePath: "src\\app\\billing\\pages\\plans.component.ts", lineNumber: 15 });
})();
export {
  PlansComponent
};
//# sourceMappingURL=chunk-LDLCLVEN.js.map
