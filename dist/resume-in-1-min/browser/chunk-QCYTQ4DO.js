import {
  BillingApiService,
  CommonModule,
  DatePipe,
  NgIf,
  Router
} from "./chunk-YV4ENLGT.js";
import {
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-V66YKGVO.js";
import "./chunk-ASLTLD6L.js";

// src/app/billing/pages/subscription.component.ts
function SubscriptionComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "div", 6);
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 9);
    \u0275\u0275element(3, "rect", 10)(4, "line", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "No Active Subscription");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Get started by choosing a plan that works for you.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 12);
    \u0275\u0275listener("click", function SubscriptionComponent_div_7_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPlans());
    });
    \u0275\u0275text(10, "Browse Plans");
    \u0275\u0275elementEnd()();
  }
}
function SubscriptionComponent_div_8_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function SubscriptionComponent_div_8_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancel());
    });
    \u0275\u0275text(1, " Cancel Auto-Renewal ");
    \u0275\u0275elementEnd();
  }
}
function SubscriptionComponent_div_8_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Your access will continue until ", \u0275\u0275pipeBind1(2, 1, ctx_r1.subscription.endDate), " ");
  }
}
function SubscriptionComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 16)(7, "div", 17)(8, "span", 18);
    \u0275\u0275text(9, "Renewing/Ending on:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 19);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 20)(14, "h4");
    \u0275\u0275text(15, "Included Benefits:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "ul", 21)(17, "li")(18, "strong");
    \u0275\u0275text(19, "Templates:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "li")(22, "strong");
    \u0275\u0275text(23, "AI Rate Limit:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 22);
    \u0275\u0275template(26, SubscriptionComponent_div_8_button_26_Template, 2, 0, "button", 23)(27, SubscriptionComponent_div_8_div_27_Template, 3, 3, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.subscription.status === "Active");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.subscription.status, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.subscription.plan, " Plan");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 9, ctx_r1.subscription.endDate, "mediumDate"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r1.subscription.benefits["TEMPLATE_LIMIT"], " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.subscription.benefits["RATE_LIMIT_PER_MINUTE"], " requests/min ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.subscription.status === "Active");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.subscription.status !== "Active");
  }
}
var SubscriptionComponent = class _SubscriptionComponent {
  constructor(billingApi, router) {
    this.billingApi = billingApi;
    this.router = router;
    this.loading = true;
  }
  ngOnInit() {
    this.loadSubscription();
  }
  goToPlans() {
    this.router.navigate(["/billing/plans"]);
  }
  loadSubscription() {
    this.loading = true;
    this.billingApi.getMySubscription().subscribe({
      next: (res) => {
        this.subscription = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load subscription:", err);
        this.loading = false;
      }
    });
  }
  cancel() {
    if (!confirm("Are you sure you want to cancel your auto-renewal? You will still have access until the end of your billing period."))
      return;
    this.billingApi.cancelSubscription().subscribe({
      next: (res) => {
        if (res.status) {
          alert("Subscription auto-renewal has been cancelled.");
          this.loadSubscription();
        } else {
          alert(res.message || "Failed to cancel subscription.");
        }
      },
      error: (err) => {
        console.error("Cancellation error:", err);
        alert("An error occurred while cancelling your subscription.");
      }
    });
  }
  static {
    this.\u0275fac = function SubscriptionComponent_Factory(t) {
      return new (t || _SubscriptionComponent)(\u0275\u0275directiveInject(BillingApiService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubscriptionComponent, selectors: [["app-subscription"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 3, consts: [[1, "billing-page"], [1, "billing-header"], ["class", "loading-state", 4, "ngIf"], ["class", "no-subscription-card", 4, "ngIf"], ["class", "subscription-card", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "no-subscription-card"], [1, "card-icon"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], [1, "primary-btn", 3, "click"], [1, "subscription-card"], [1, "subscription-status"], [1, "plan-info"], [1, "date-info"], [1, "date-row"], [1, "label"], [1, "value"], [1, "benefits-section"], [1, "benefits-list"], [1, "card-footer"], ["class", "cancel-btn", 3, "click", 4, "ngIf"], ["class", "renewal-info", 4, "ngIf"], [1, "cancel-btn", 3, "click"], [1, "renewal-info"]], template: function SubscriptionComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Your Subscription");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5, "Manage your billing and subscription details.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, SubscriptionComponent_div_6_Template, 2, 0, "div", 2)(7, SubscriptionComponent_div_7_Template, 11, 0, "div", 3)(8, SubscriptionComponent_div_8_Template, 28, 12, "div", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.subscription);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.subscription);
      }
    }, dependencies: [CommonModule, NgIf, DatePipe], styles: ['\n\n.billing-page[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 60px 20px;\n  font-family:\n    "Inter",\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\n.billing-header[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n.billing-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  color: #1a1a1a;\n  margin-bottom: 8px;\n}\n.billing-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n}\n.subscription-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  padding: 30px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);\n  border: 1px solid #f0f0f0;\n  position: relative;\n}\n.subscription-status[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 30px;\n  right: 30px;\n  background: #f0f0f0;\n  color: #666;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.subscription-status.active[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.plan-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin-bottom: 20px;\n  color: #1a1a1a;\n}\n.date-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.date-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding-bottom: 12px;\n  border-bottom: 1px dashed #f0f0f0;\n}\n.label[_ngcontent-%COMP%] {\n  color: #666;\n  font-weight: 500;\n}\n.value[_ngcontent-%COMP%] {\n  color: #1a1a1a;\n  font-weight: 600;\n}\n.card-footer[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  padding-top: 25px;\n  border-top: 1px solid #f0f0f0;\n}\n.cancel-btn[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #dc3545;\n  border: 1px solid #dc3545;\n  padding: 10px 20px;\n  border-radius: 10px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #fff5f5;\n}\n.no-subscription-card[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 2px dashed #dee2e6;\n  border-radius: 20px;\n  padding: 60px 40px;\n  text-align: center;\n}\n.card-icon[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  color: #adb5bd;\n}\n.no-subscription-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  color: #1a1a1a;\n}\n.primary-btn[_ngcontent-%COMP%] {\n  background: #4B70F5;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 10px;\n  font-weight: 600;\n  cursor: pointer;\n  margin-top: 20px;\n}\n.renewal-info[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  font-style: italic;\n}\n.benefits-section[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding-top: 24px;\n  border-top: 1px solid #edf2f7;\n}\n.benefits-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 12px;\n}\n.benefits-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.benefits-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #4a5568;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n}\n.benefits-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2713";\n  color: #48bb78;\n  font-weight: bold;\n  margin-right: 10px;\n}\n/*# sourceMappingURL=subscription.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubscriptionComponent, { className: "SubscriptionComponent", filePath: "src\\app\\billing\\pages\\subscription.component.ts", lineNumber: 15 });
})();
export {
  SubscriptionComponent
};
//# sourceMappingURL=chunk-QCYTQ4DO.js.map
