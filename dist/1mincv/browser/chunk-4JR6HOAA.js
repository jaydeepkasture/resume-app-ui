import {
  CommonModule,
  RouterLink,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-TRI43INR.js";
import "./chunk-PZQZAEDH.js";

// src/app/pages/refund-policy/refund-policy.component.ts
var RefundPolicyComponent = class _RefundPolicyComponent {
  constructor() {
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  static {
    this.\u0275fac = function RefundPolicyComponent_Factory(t) {
      return new (t || _RefundPolicyComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RefundPolicyComponent, selectors: [["app-refund-policy"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 74, vars: 1, consts: [[1, "policy-container"], [1, "policy-header"], [1, "container"], ["routerLink", "/", 1, "back-link"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "last-updated"], [1, "policy-content", "container"], [1, "policy-card"], [1, "policy-footer"], [1, "footer-links"], ["routerLink", "/privacy-policy"], ["routerLink", "/terms-of-service"], ["routerLink", "/about"], ["routerLink", "/contact"]], template: function RefundPolicyComponent_Template(rf, ctx) {
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
        \u0275\u0275text(9, "Cancellation & Refund Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 7);
        \u0275\u0275text(11, "Last Updated: February 18, 2026");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "section")(15, "h2");
        \u0275\u0275text(16, "1. Digital Service Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "p");
        \u0275\u0275text(18, "At ");
        \u0275\u0275elementStart(19, "strong");
        \u0275\u0275text(20, "1mincv.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, ", we provide immediate access to digital premium features, AI-powered resume processing, and downloadable professional templates. Due to the nature of these digital services, we generally operate a ");
        \u0275\u0275elementStart(22, "strong");
        \u0275\u0275text(23, "no-refund policy");
        \u0275\u0275elementEnd();
        \u0275\u0275text(24, ".");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p");
        \u0275\u0275text(26, "Once you purchase a subscription and access these premium tools, the value of the digital service is considered consumed.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "section")(28, "h2");
        \u0275\u0275text(29, "2. Subscription Cancellations");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "p");
        \u0275\u0275text(31, "You may cancel your subscription at any time. When you cancel:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "ul")(33, "li");
        \u0275\u0275text(34, "You will not be charged for the next billing cycle.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "li");
        \u0275\u0275text(36, "You will retain full access to premium features until the end of your current paid billing period (monthly or annual).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "li");
        \u0275\u0275text(38, "No prorated refunds are provided for the remaining days in your current cycle.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(39, "section")(40, "h2");
        \u0275\u0275text(41, "3. Exception Cases");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "p");
        \u0275\u0275text(43, "We may, at our sole discretion, offer refunds or credits in exceptional circumstances, such as:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "ul")(45, "li");
        \u0275\u0275text(46, "Technical failures of the Platform that prevented intended use for an extended period.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "li");
        \u0275\u0275text(48, "Duplicate billing caused by a technical error on our part.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "p");
        \u0275\u0275text(50, "To request an exception, please contact support@1mincv.com within 7 days of the transaction.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "section")(52, "h2");
        \u0275\u0275text(53, "4. How to Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "p");
        \u0275\u0275text(55, "You can manage and cancel your subscription through your User Profile settings on the Platform. Alternatively, you can request cancellation by emailing us at support@1mincv.com from your registered email address.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "section")(57, "h2");
        \u0275\u0275text(58, "5. Chargebacks");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "p");
        \u0275\u0275text(60, "We encourage users to contact us directly to resolve any billing issues. Initiating a chargeback without contacting support may result in the permanent suspension of your account.");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(61, "footer", 10)(62, "div", 2)(63, "div", 11)(64, "a", 12);
        \u0275\u0275text(65, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "a", 13);
        \u0275\u0275text(67, "Terms of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "a", 14);
        \u0275\u0275text(69, "About Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "a", 15);
        \u0275\u0275text(71, "Contact Us");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(72, "p");
        \u0275\u0275text(73);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(73);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " 1mincv.com. All rights reserved.");
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ['\n\n.policy-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #f8fafc;\n  color: #1e293b;\n  display: flex;\n  flex-direction: column;\n}\n.policy-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #a855f7 100%);\n  color: white;\n  padding: 80px 0 60px;\n  text-align: center;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: rgba(255, 255, 255, 0.9);\n  text-decoration: none;\n  font-size: 0.95rem;\n  margin-bottom: 24px;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: white;\n}\n.policy-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  margin-bottom: 12px;\n}\n.last-updated[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  opacity: 0.8;\n}\n.policy-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-top: -40px;\n  padding-bottom: 80px;\n}\n.policy-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 60px;\n  border-radius: 24px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\nsection[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin-bottom: 20px;\n  position: relative;\n  padding-bottom: 12px;\n}\nh2[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 40px;\n  height: 4px;\n  background: #6366f1;\n  border-radius: 2px;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.7;\n  color: #475569;\n  font-size: 1.05rem;\n  margin-bottom: 16px;\n}\nul[_ngcontent-%COMP%] {\n  list-style: disc;\n  padding-left: 24px;\n  color: #475569;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  line-height: 1.6;\n}\n.policy-footer[_ngcontent-%COMP%] {\n  padding: 40px 0;\n  background: white;\n  border-top: 1px solid #e2e8f0;\n  text-align: center;\n}\n.footer-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #64748b;\n  text-decoration: none;\n  font-size: 0.9rem;\n  transition: color 0.2s;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #6366f1;\n}\n.policy-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #94a3b8;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .policy-header[_ngcontent-%COMP%] {\n    padding: 60px 0 40px;\n  }\n  .policy-card[_ngcontent-%COMP%] {\n    padding: 30px;\n    border-radius: 16px;\n  }\n}\n/*# sourceMappingURL=refund-policy.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RefundPolicyComponent, { className: "RefundPolicyComponent", filePath: "src\\app\\pages\\refund-policy\\refund-policy.component.ts", lineNumber: 12 });
})();
export {
  RefundPolicyComponent
};
//# sourceMappingURL=chunk-4JR6HOAA.js.map
