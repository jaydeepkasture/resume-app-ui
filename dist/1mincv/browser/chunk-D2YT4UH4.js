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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TermsOfServiceComponent, selectors: [["app-terms-of-service"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 159, vars: 1, consts: [[1, "terms-container"], [1, "terms-header"], [1, "container"], ["routerLink", "/", 1, "back-link"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "last-updated"], [1, "terms-content", "container"], [1, "terms-card"], ["id", "agreement"], ["id", "services"], ["id", "accounts"], ["id", "subscriptions"], ["id", "availability"], ["id", "ai-disclaimer"], ["id", "intellectual-property"], ["id", "user-conduct"], ["id", "limitation-liability"], ["id", "force-majeure"], ["id", "governing-law"], ["id", "contact"], [1, "terms-footer"]], template: function TermsOfServiceComponent_Template(rf, ctx) {
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
        \u0275\u0275text(16, "1. Acceptance of Terms");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "p");
        \u0275\u0275text(18, "By accessing or using ");
        \u0275\u0275elementStart(19, "strong");
        \u0275\u0275text(20, "1mincv.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, ' ("the Platform"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. These Terms constitute a legally binding agreement between you and 1mincv.com. If you do not agree to these Terms, you must immediately cease use of the Platform.');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "section", 11)(23, "h2");
        \u0275\u0275text(24, "2. Description of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p");
        \u0275\u0275text(26, "1mincv.com provides an AI-powered software-as-a-service (SaaS) platform designed for resume building, professional document editing, and career tool management. Features include AI-generated text suggestions, professional templates, and cloud storage for resume drafts.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "section", 12)(28, "h2");
        \u0275\u0275text(29, "3. User Accounts & Security");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "p");
        \u0275\u0275text(31, "To access certain features, you must create an account. You agree to provide accurate, current, and complete information. You are solely responsible for maintaining the confidentiality of your account credentials.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p")(33, "strong");
        \u0275\u0275text(34, "Account Deactivation & Data Retention:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(35, " Currently, there is no self-service account deletion feature on the Platform. If you wish to deactivate or delete your account, you must submit a request by contacting our support team at support@1mincv.com. Please note that we may retain certain data for legal, regulatory, fraud prevention, or legitimate operational purposes. Deletion requests will be processed within a reasonable timeframe and are not instantaneous.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "p")(37, "strong");
        \u0275\u0275text(38, "Account Termination:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(39, " We reserve the right to suspend or terminate your account immediately, without prior notice or liability, for any reason whatsoever, including but not limited to a breach of these Terms, fraudulent activity, or non-payment of subscription fees.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "section", 13)(41, "h2");
        \u0275\u0275text(42, "4. Subscriptions, Payments & Billing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "p");
        \u0275\u0275text(44, "The Platform operates on a subscription-based model with various tiers of access.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "ul")(46, "li")(47, "strong");
        \u0275\u0275text(48, "Digital Service Acknowledgment:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(49, " By subscribing, you acknowledge and agree that access to the premium features of the Platform is provided immediately upon successful payment.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "li")(51, "strong");
        \u0275\u0275text(52, "Payment Processing:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(53, " All payments are processed through secure third-party payment providers. We do not store your full payment card details on our servers.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "li")(55, "strong");
        \u0275\u0275text(56, "Recurring Billing & Authorization:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(57, " By subscribing to a paid plan, you authorize us and our payment service providers to charge your selected payment method on a recurring basis (monthly or annually) according to the plan selected.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "li")(59, "strong");
        \u0275\u0275text(60, "Payment Failure & Suspension:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(61, " Failure to successfully process any recurring payment may result in the immediate suspension of your access to premium features until the payment issue is resolved and the dues are cleared.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "li")(63, "strong");
        \u0275\u0275text(64, "Auto-Renewal:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(65, " Subscriptions automatically renew at the end of each billing cycle unless cancelled through your account settings prior to the renewal date.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "li")(67, "strong");
        \u0275\u0275text(68, "Cancellation Policy:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(69, " You may cancel your subscription at any time. Cancellation will stop future billing, but you will retain access to premium features until the end of your current paid period.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "li")(71, "strong");
        \u0275\u0275text(72, "Refund Policy:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(73, " As our services provide immediate digital access to software features and AI processing power, all subscription payments are non-refundable. We do not provide credits or prorated refunds for partially used billing periods.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "li")(75, "strong");
        \u0275\u0275text(76, "Pricing Changes:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(77, " We reserve the right to modify subscription fees at any time. Any price changes will be communicated to you with at least 30 days' notice and will apply to the next billing cycle.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(78, "section", 14)(79, "h2");
        \u0275\u0275text(80, "5. Service Availability & Maintenance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "p");
        \u0275\u0275text(82, 'The Platform is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. While we strive for maximum uptime, we do not guarantee that the Platform will be uninterrupted, secure, or error-free. We reserve the right to perform scheduled or unscheduled maintenance, updates, or repairs at any time, which may cause temporary unavailability of the Service.');
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(83, "section", 15)(84, "h2");
        \u0275\u0275text(85, "6. AI-Generated Content Disclaimer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "p");
        \u0275\u0275text(87, "Our Platform utilizes Artificial Intelligence (AI) to provide content suggestions and optimizations. You acknowledge and agree that:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "ul")(89, "li");
        \u0275\u0275text(90, "AI-generated content is provided for informational purposes only.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(91, "li");
        \u0275\u0275text(92, "We do not guarantee the accuracy, completeness, or professional suitability of the AI suggestions.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(93, "li");
        \u0275\u0275text(94, "You are solely responsible for reviewing and proofreading all content before using it for job applications or professional purposes.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "li");
        \u0275\u0275text(96, "1mincv.com is not liable for any employment outcomes resulting from the use of content generated through the Platform.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(97, "section", 16)(98, "h2");
        \u0275\u0275text(99, "7. Content Ownership & License");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(100, "p")(101, "strong");
        \u0275\u0275text(102, "Your Content:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(103, " You retain full ownership of the personal data and specific content you input into the Platform. By using the Service, you grant 1mincv.com a worldwide, non-exclusive, royalty-free license to host, store, and process your content solely for the purpose of providing the Service to you.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "p")(105, "strong");
        \u0275\u0275text(106, "Platform Ownership:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(107, " All templates, software, design elements, and AI algorithms are the exclusive intellectual property of 1mincv.com.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(108, "section", 17)(109, "h2");
        \u0275\u0275text(110, "8. Prohibited Uses");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(111, "p");
        \u0275\u0275text(112, "You agree not to use the Platform to:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(113, "ul")(114, "li");
        \u0275\u0275text(115, "Upload any content that is defamatory, obscene, or violates third-party rights.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(116, "li");
        \u0275\u0275text(117, "Attempt to reverse-engineer any part of the resume builder or AI systems.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(118, "li");
        \u0275\u0275text(119, "Automate data collection (scraping) from the Platform.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(120, "li");
        \u0275\u0275text(121, "Use the Platform for any unlawful purpose under applicable Indian law.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(122, "section", 18)(123, "h2");
        \u0275\u0275text(124, "9. Limitation of Liability");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(125, "p");
        \u0275\u0275text(126, "To the maximum extent permitted by applicable law, 1mincv.com shall not be liable for any indirect, incidental, or consequential damages, including loss of data or employment opportunities, arising out of your use or inability to use the Platform.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(127, "p")(128, "strong");
        \u0275\u0275text(129, "Liability Cap:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(130, " In no event shall our total liability to you for all damages, losses, and causes of action (whether in contract, tort including negligence, or otherwise) exceed the total amount paid by you to 1mincv.com in the twelve (12) months immediately preceding the event giving rise to the claim.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(131, "section", 19)(132, "h2");
        \u0275\u0275text(133, "10. Force Majeure");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(134, "p");
        \u0275\u0275text(135, "1mincv.com shall not be held liable for any failure or delay in the performance of its obligations under these Terms if such failure or delay is caused by events beyond its reasonable control, including but not limited to internet or power outages, government restrictions, acts of God, pandemics, or failures of third-party infrastructure providers.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(136, "section", 20)(137, "h2");
        \u0275\u0275text(138, "11. Governing Law & Jurisdiction");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(139, "p");
        \u0275\u0275text(140, "These Terms shall be governed by and construed in accordance with the laws of ");
        \u0275\u0275elementStart(141, "strong");
        \u0275\u0275text(142, "India");
        \u0275\u0275elementEnd();
        \u0275\u0275text(143, ". Any disputes or claims arising out of or in connection with these Terms or the use of the Platform shall be subject to the exclusive jurisdiction of the courts located in ");
        \u0275\u0275elementStart(144, "strong");
        \u0275\u0275text(145, "Nagpur, Maharashtra, India");
        \u0275\u0275elementEnd();
        \u0275\u0275text(146, ".");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(147, "section", 21)(148, "h2");
        \u0275\u0275text(149, "12. Contact Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(150, "p");
        \u0275\u0275text(151, "For any questions regarding these Terms, please contact us at:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(152, "ul")(153, "li");
        \u0275\u0275text(154, "Email: support@1mincv.com");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(155, "footer", 22)(156, "div", 2)(157, "p");
        \u0275\u0275text(158);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(158);
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
//# sourceMappingURL=chunk-D2YT4UH4.js.map
