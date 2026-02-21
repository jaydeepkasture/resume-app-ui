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

// src/app/pages/privacy-policy/privacy-policy.component.ts
var PrivacyPolicyComponent = class _PrivacyPolicyComponent {
  constructor() {
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  static {
    this.\u0275fac = function PrivacyPolicyComponent_Factory(t) {
      return new (t || _PrivacyPolicyComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivacyPolicyComponent, selectors: [["app-privacy-policy"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 131, vars: 1, consts: [[1, "privacy-container"], [1, "privacy-header"], [1, "container"], ["routerLink", "/", 1, "back-link"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "last-updated"], [1, "privacy-content", "container"], [1, "privacy-card"], ["id", "introduction"], ["id", "information-collection"], ["id", "data-use"], ["id", "data-sharing-transfers"], ["id", "data-retention"], ["id", "children-privacy"], ["id", "user-rights"], ["id", "data-security"], ["id", "cookies"], ["id", "changes"], ["id", "contact"], [1, "privacy-footer"]], template: function PrivacyPolicyComponent_Template(rf, ctx) {
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
        \u0275\u0275text(9, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 7);
        \u0275\u0275text(11, "Last Updated: February 18, 2026");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "section", 10)(15, "h2");
        \u0275\u0275text(16, "1. Introduction");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "p");
        \u0275\u0275text(18, "Welcome to ");
        \u0275\u0275elementStart(19, "strong");
        \u0275\u0275text(20, "1mincv.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, ' ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered resume builder on the Platform.');
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "p");
        \u0275\u0275text(23, "By using our Platform, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access the Platform.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "section", 11)(25, "h2");
        \u0275\u0275text(26, "2. Information We Collect");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "h3");
        \u0275\u0275text(28, "Personal Data");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "p");
        \u0275\u0275text(30, "While using our Platform, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This includes, but is not limited to:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "ul")(32, "li");
        \u0275\u0275text(33, "Email address, First name, and Last name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "li");
        \u0275\u0275text(35, "Phone number and Address details");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "li");
        \u0275\u0275text(37, "Professional history, education, and skills (as provided in your resumes)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "h3");
        \u0275\u0275text(39, "Usage Data");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "p");
        \u0275\u0275text(41, 'We collect information on how the Platform is accessed ("Usage Data"), such as IP addresses, browser types, device identifiers, and page interaction data to improve your experience.');
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "h3");
        \u0275\u0275text(43, "Payment Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "p");
        \u0275\u0275text(45, "For paid subscriptions, we use third-party payment processors to handle payment data. We do not store your full credit card or bank account details on our servers; all such information is provided directly to our third-party processors whose use of your personal information is governed by their own Privacy Policy.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "section", 12)(47, "h2");
        \u0275\u0275text(48, "3. How We Use Your Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "p");
        \u0275\u0275text(50, "We use the collected data to provide and maintain our Platform, process your subscriptions, provide AI-powered content suggestions, and communicate with you regarding updates or support requests. We process your information:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "ul")(52, "li");
        \u0275\u0275text(53, "To perform our contractual obligations to you;");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "li");
        \u0275\u0275text(55, "To improve and optimize Platform functionality and user experience;");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "li");
        \u0275\u0275text(57, "To comply with our legal and regulatory obligations;");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "li");
        \u0275\u0275text(59, "Based on your consent, where applicable.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(60, "section", 13)(61, "h2");
        \u0275\u0275text(62, "4. Data Sharing and International Transfers");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "p")(64, "strong");
        \u0275\u0275text(65, "No Sale of Data:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(66, " We do not sell, rent, or trade your personal data to third parties for their marketing purposes.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "p")(68, "strong");
        \u0275\u0275text(69, "Service Providers:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(70, " We may share your data with trusted third-party providers who assist us in operating our Platform (e.g., hosting, AI processing, and analytics).");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "p")(72, "strong");
        \u0275\u0275text(73, "International Transfers:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(74, " Your information, including Personal Data, may be transferred to and maintained on computers located outside of your state or country where the data protection laws may differ from those in your jurisdiction. Use of the Platform constitutes your acknowledgment and agreement to such transfers.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(75, "section", 14)(76, "h2");
        \u0275\u0275text(77, "5. Data Retention");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "p");
        \u0275\u0275text(79, "We retain your Personal Data for as long as your account is active or as needed to provide you with access to the Platform. We will also retain your data for a reasonable period thereafter to fulfill operational requirements, unless a deletion request is received and processed. Please note that even after a deletion request, we may retain minimal account or transaction records for legal, taxation, fraud prevention, or compliance purposes as required or permitted by law.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(80, "section", 15)(81, "h2");
        \u0275\u0275text(82, "6. Children's Privacy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "p");
        \u0275\u0275text(84, 'The Platform is not intended for use by anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from children under 18. If you become aware that a child has provided us with Personal Data, please contact us immediately.');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(85, "section", 16)(86, "h2");
        \u0275\u0275text(87, "7. Your Data Protection Rights");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "p");
        \u0275\u0275text(89, "In accordance with applicable laws in India, you have the following rights regarding your personal data:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "ul")(91, "li")(92, "strong");
        \u0275\u0275text(93, "Access & Correction:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(94, " The right to request access to the personal information we hold and to request corrections to any inaccurate data.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "li")(96, "strong");
        \u0275\u0275text(97, "Deletion Requests:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(98, " The right to request the deletion of your personal data. As the Platform does not currently have a self-service account deletion feature, you may request account deletion by emailing us at ");
        \u0275\u0275elementStart(99, "strong");
        \u0275\u0275text(100, "support@1mincv.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(101, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(102, "p");
        \u0275\u0275text(103, "Please note that we may verify your identity before responding to such requests and may retain certain information where required by law or for legitimate business purposes.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(104, "section", 17)(105, "h2");
        \u0275\u0275text(106, "8. Security of Data");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(107, "p");
        \u0275\u0275text(108, "The security of your data is important to us. We use industry-standard encryption and security measures to protect your Personal Data. However, please be aware that no method of transmission over the Internet is 100% secure.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(109, "section", 18)(110, "h2");
        \u0275\u0275text(111, "9. Cookies and Tracking Technologies");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "p");
        \u0275\u0275text(113, "We use cookies and similar tracking technologies on our Platform to track activity and hold certain information to enhance your user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Platform.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(114, "section", 19)(115, "h2");
        \u0275\u0275text(116, "10. Changes to This Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(117, "p");
        \u0275\u0275text(118, 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Your continued use of the Platform after any modifications constitutes your acceptance of the revised Privacy Policy.');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(119, "section", 20)(120, "h2");
        \u0275\u0275text(121, "11. Contact Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "p");
        \u0275\u0275text(123, "If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "ul")(125, "li");
        \u0275\u0275text(126, "By email: support@1mincv.com");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(127, "footer", 21)(128, "div", 2)(129, "p");
        \u0275\u0275text(130);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(130);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " 1mincv.com. All rights reserved.");
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ['\n\n.privacy-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: #f8fafc;\n  color: #1e293b;\n  font-family:\n    "Inter",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  line-height: 1.6;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 0 24px;\n}\n.privacy-header[_ngcontent-%COMP%] {\n  background: white;\n  padding: 60px 0 40px;\n  border-bottom: 1px solid #e2e8f0;\n  margin-bottom: 40px;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: #6366f1;\n  text-decoration: none;\n  font-weight: 500;\n  margin-bottom: 24px;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: #4f46e5;\n}\n.privacy-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: #0f172a;\n  margin: 0 0 12px;\n}\n.last-updated[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.95rem;\n}\n.privacy-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 48px;\n  border-radius: 16px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  margin-bottom: 60px;\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\nsection[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin-bottom: 20px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #f1f5f9;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #334155;\n  margin: 24px 0 12px;\n}\np[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  color: #475569;\n}\nul[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding-left: 20px;\n}\nli[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  color: #475569;\n}\nstrong[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-weight: 600;\n}\n.privacy-footer[_ngcontent-%COMP%] {\n  padding: 40px 0;\n  text-align: center;\n  border-top: 1px solid #e2e8f0;\n  color: #94a3b8;\n  font-size: 0.9rem;\n}\n@media (max-width: 640px) {\n  .privacy-header[_ngcontent-%COMP%] {\n    padding: 40px 0 30px;\n  }\n  .privacy-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .privacy-card[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n}\n/*# sourceMappingURL=privacy-policy.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrivacyPolicyComponent, { className: "PrivacyPolicyComponent", filePath: "src\\app\\pages\\privacy-policy\\privacy-policy.component.ts", lineNumber: 12 });
})();
export {
  PrivacyPolicyComponent
};
//# sourceMappingURL=chunk-YROLFOE5.js.map
