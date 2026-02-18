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

// src/app/pages/terms-of-service/terms-of-service.component.ts
var TermsOfServiceComponent = class _TermsOfServiceComponent {
  constructor() {
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  static {
    this.\u0275fac = function TermsOfServiceComponent_Factory(t) {
      return new (t || _TermsOfServiceComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TermsOfServiceComponent, selectors: [["app-terms-of-service"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 91, vars: 1, consts: [[1, "terms-container"], [1, "terms-header"], [1, "container"], ["routerLink", "/", 1, "back-link"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "last-updated"], [1, "terms-content", "container"], [1, "terms-card"], ["id", "agreement"], ["id", "services"], ["id", "accounts"], ["id", "intellectual-property"], ["id", "subscriptions"], ["id", "user-conduct"], ["id", "limitation-liability"], ["id", "disclaimer"], ["id", "changes"], ["id", "contact"], [1, "terms-footer"]], template: function TermsOfServiceComponent_Template(rf, ctx) {
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
        \u0275\u0275text(9, "Terms of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 7);
        \u0275\u0275text(11, "Last Updated: February 18, 2026");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "section", 10)(15, "h2");
        \u0275\u0275text(16, "1. Agreement to Terms");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "p");
        \u0275\u0275text(18, "By accessing or using ");
        \u0275\u0275elementStart(19, "strong");
        \u0275\u0275text(20, "1mincv.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, ' ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "section", 11)(23, "h2");
        \u0275\u0275text(24, "2. Description of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p");
        \u0275\u0275text(26, "1mincv.com provides an AI-powered resume building platform that allows users to create, edit, and export professional resumes. The service includes templates, AI suggestions, and hosting of resume data.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "section", 12)(28, "h2");
        \u0275\u0275text(29, "3. Accounts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "p");
        \u0275\u0275text(31, "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p");
        \u0275\u0275text(33, "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "section", 13)(35, "h2");
        \u0275\u0275text(36, "4. Intellectual Property");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "p");
        \u0275\u0275text(38, "The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of 1mincv.com and its licensors.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "p");
        \u0275\u0275text(40, "Your content (the resumes you create) remains your property. However, by using our Service, you grant us a license to use, store, and process your data to provide the Service to you.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(41, "section", 14)(42, "h2");
        \u0275\u0275text(43, "5. Subscriptions and Payments");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "p");
        \u0275\u0275text(45, "Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "p");
        \u0275\u0275text(47, "We use third-party payment processors to handle payments. We do not store your full credit card information on our servers.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "section", 15)(49, "h2");
        \u0275\u0275text(50, "6. Prohibited Uses");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "p");
        \u0275\u0275text(52, "You agree not to use the Service:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "ul")(54, "li");
        \u0275\u0275text(55, "For any unlawful purpose.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "li");
        \u0275\u0275text(57, "To solicit others to perform or participate in any unlawful acts.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "li");
        \u0275\u0275text(59, "To infringe upon or violate our intellectual property rights or the intellectual property rights of others.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "li");
        \u0275\u0275text(61, "To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "li");
        \u0275\u0275text(63, "To upload or transmit viruses or any other type of malicious code.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(64, "section", 16)(65, "h2");
        \u0275\u0275text(66, "7. Limitation of Liability");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "p");
        \u0275\u0275text(68, "In no event shall 1mincv.com, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(69, "section", 17)(70, "h2");
        \u0275\u0275text(71, "8. Disclaimer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "p");
        \u0275\u0275text(73, 'Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(74, "section", 18)(75, "h2");
        \u0275\u0275text(76, "9. Changes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "p");
        \u0275\u0275text(78, "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(79, "section", 19)(80, "h2");
        \u0275\u0275text(81, "10. Contact Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(82, "p");
        \u0275\u0275text(83, "If you have any questions about these Terms, please contact us:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(84, "ul")(85, "li");
        \u0275\u0275text(86, "By email: support@1mincv.com");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(87, "footer", 20)(88, "div", 2)(89, "p");
        \u0275\u0275text(90);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(90);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " 1mincv.com. All rights reserved.");
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ['\n\n.terms-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: #f8fafc;\n  color: #1e293b;\n  font-family:\n    "Inter",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  line-height: 1.6;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 0 24px;\n}\n.terms-header[_ngcontent-%COMP%] {\n  background: white;\n  padding: 60px 0 40px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 40px;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: #6366f1;\n  text-decoration: none;\n  font-weight: 500;\n  margin-bottom: 24px;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: #4f46e5;\n}\n.terms-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: #0f172a;\n  margin: 0 0 12px;\n}\n.last-updated[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.95rem;\n}\n.terms-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 48px;\n  border-radius: 16px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  margin-bottom: 60px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\nsection[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #f1f5f9;\n}\np[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  color: #475569;\n}\nul[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding-left: 20px;\n}\nli[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  color: #475569;\n}\nstrong[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-weight: 600;\n}\n.terms-footer[_ngcontent-%COMP%] {\n  padding: 40px 0;\n  text-align: center;\n  border-top: 1px solid #e2e8f0;\n  color: #94a3b8;\n  font-size: 0.9rem;\n}\n@media (max-width: 640px) {\n  .terms-header[_ngcontent-%COMP%] {\n    padding: 40px 0 30px;\n  }\n  .terms-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .terms-card[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n}\n/*# sourceMappingURL=terms-of-service.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TermsOfServiceComponent, { className: "TermsOfServiceComponent", filePath: "src\\app\\pages\\terms-of-service\\terms-of-service.component.ts", lineNumber: 12 });
})();
export {
  TermsOfServiceComponent
};
//# sourceMappingURL=chunk-27R25HJF.js.map
