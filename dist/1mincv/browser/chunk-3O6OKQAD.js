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
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-TRI43INR.js";
import "./chunk-PZQZAEDH.js";

// src/app/pages/landing/landing.component.ts
var LandingComponent = class _LandingComponent {
  constructor() {
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  static {
    this.\u0275fac = function LandingComponent_Factory(t) {
      return new (t || _LandingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LandingComponent, selectors: [["app-landing"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 157, vars: 1, consts: [[1, "landing-page"], [1, "navbar"], [1, "container", "nav-content"], [1, "logo"], [1, "logo-text"], [1, "nav-links"], ["routerLink", "/login", 1, "login-link"], ["routerLink", "/register", 1, "cta-button"], [1, "hero"], [1, "container"], [1, "hero-content"], [1, "hero-actions"], ["routerLink", "/register", 1, "primary-btn"], ["href", "#features", 1, "secondary-btn"], [1, "hero-visual"], [1, "mockup-frame"], [1, "mockup-content"], [1, "skeleton-title"], [1, "skeleton-line"], [1, "skeleton-grid"], [1, "skeleton-box"], ["id", "features", 1, "features"], [1, "section-title"], [1, "features-grid"], [1, "feature-card"], [1, "icon"], ["id", "pricing", 1, "pricing"], [1, "pricing-grid"], [1, "pricing-card"], [1, "price"], ["routerLink", "/register", 1, "pricing-btn"], [1, "pricing-card", "featured"], [1, "badge"], [1, "savings"], [1, "main-footer"], [1, "footer-grid"], [1, "footer-brand"], [1, "footer-links"], ["routerLink", "/about"], ["routerLink", "/contact"], ["routerLink", "/terms-of-service"], ["routerLink", "/privacy-policy"], ["routerLink", "/refund-policy"], [1, "footer-bottom"]], template: function LandingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275text(5, "1min");
        \u0275\u0275elementStart(6, "span");
        \u0275\u0275text(7, "cv.com");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(8, "div", 5)(9, "a", 6);
        \u0275\u0275text(10, "Sign In");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "a", 7);
        \u0275\u0275text(12, "Get Started");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(13, "header", 8)(14, "div", 9)(15, "div", 10)(16, "h1");
        \u0275\u0275text(17, "Build a Professional Resume ");
        \u0275\u0275element(18, "br");
        \u0275\u0275elementStart(19, "span");
        \u0275\u0275text(20, "In Under 60 Seconds");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "p");
        \u0275\u0275text(22, "Leverage the power of AI to create stunning, ATS-optimized resumes that land you more interviews. No design skills required.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 11)(24, "a", 12);
        \u0275\u0275text(25, "Create Your Resume Free");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 13);
        \u0275\u0275text(27, "How it Works");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "div", 14)(29, "div", 15)(30, "div", 16);
        \u0275\u0275element(31, "div", 17)(32, "div", 18)(33, "div", 18);
        \u0275\u0275elementStart(34, "div", 19);
        \u0275\u0275element(35, "div", 20)(36, "div", 20);
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(37, "section", 21)(38, "div", 9)(39, "div", 22)(40, "h2");
        \u0275\u0275text(41, "Why Job Seekers Love 1mincv");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "p");
        \u0275\u0275text(43, "Powerful features designed to give you a competitive edge.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 23)(45, "div", 24)(46, "div", 25);
        \u0275\u0275text(47, "\u{1F916}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "h3");
        \u0275\u0275text(49, "AI Writing Assistant");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "p");
        \u0275\u0275text(51, "Get smart suggestions for your job descriptions based on your industry and experience.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 24)(53, "div", 25);
        \u0275\u0275text(54, "\u2728");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "h3");
        \u0275\u0275text(56, "Premium Templates");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "p");
        \u0275\u0275text(58, "Dozens of professional templates designed by hiring experts to be both beautiful and ATS-friendly.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(59, "div", 24)(60, "div", 25);
        \u0275\u0275text(61, "\u26A1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "h3");
        \u0275\u0275text(63, "One-Minute Builder");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "p");
        \u0275\u0275text(65, "Fill in your details, choose a template, and download. It really is that fast.");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(66, "section", 26)(67, "div", 9)(68, "div", 22)(69, "h2");
        \u0275\u0275text(70, "Transparent Pricing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "p");
        \u0275\u0275text(72, "Choose the plan that fits your career goals.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(73, "div", 27)(74, "div", 28)(75, "h3");
        \u0275\u0275text(76, "Free");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "div", 29);
        \u0275\u0275text(78, "\u20B90");
        \u0275\u0275elementStart(79, "span");
        \u0275\u0275text(80, "/month");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(81, "ul")(82, "li");
        \u0275\u0275text(83, "1 Professional Template");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(84, "li");
        \u0275\u0275text(85, "Basic AI Suggestions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "li");
        \u0275\u0275text(87, "Direct PDF Export");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(88, "a", 30);
        \u0275\u0275text(89, "Start Free");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(90, "div", 31)(91, "div", 32);
        \u0275\u0275text(92, "Popular");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(93, "h3");
        \u0275\u0275text(94, "Pro Monthly");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "div", 29);
        \u0275\u0275text(96, "\u20B9499");
        \u0275\u0275elementStart(97, "span");
        \u0275\u0275text(98, "/month");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(99, "ul")(100, "li");
        \u0275\u0275text(101, "Unlimited Premium Templates");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(102, "li");
        \u0275\u0275text(103, "Advanced AI Writing Tools");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(104, "li");
        \u0275\u0275text(105, "Prioritize AI Processing");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(106, "li");
        \u0275\u0275text(107, "Priority Email Support");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(108, "a", 30);
        \u0275\u0275text(109, "Go Pro");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(110, "div", 28)(111, "h3");
        \u0275\u0275text(112, "Pro Yearly");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(113, "div", 29);
        \u0275\u0275text(114, "\u20B93,999");
        \u0275\u0275elementStart(115, "span");
        \u0275\u0275text(116, "/year");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(117, "p", 33);
        \u0275\u0275text(118, "Save over 30%");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(119, "ul")(120, "li");
        \u0275\u0275text(121, "Everything in Monthly Pro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "li");
        \u0275\u0275text(123, "Access to Beta Features");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(124, "li");
        \u0275\u0275text(125, "Lifetime Content Storage");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(126, "a", 30);
        \u0275\u0275text(127, "Save with Yearly");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(128, "footer", 34)(129, "div", 9)(130, "div", 35)(131, "div", 36)(132, "div", 4);
        \u0275\u0275text(133, "1min");
        \u0275\u0275elementStart(134, "span");
        \u0275\u0275text(135, "cv.com");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(136, "p");
        \u0275\u0275text(137, "Empowering careers through Artificial Intelligence.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(138, "div", 37)(139, "h4");
        \u0275\u0275text(140, "Company");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(141, "a", 38);
        \u0275\u0275text(142, "About Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(143, "a", 39);
        \u0275\u0275text(144, "Contact Us");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(145, "div", 37)(146, "h4");
        \u0275\u0275text(147, "Legal");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(148, "a", 40);
        \u0275\u0275text(149, "Terms of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(150, "a", 41);
        \u0275\u0275text(151, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(152, "a", 42);
        \u0275\u0275text(153, "Refund & Cancellation");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(154, "div", 43)(155, "p");
        \u0275\u0275text(156);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(156);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " 1mincv.com. Developed in Nagpur, India.");
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  background: white;\n  color: #0f172a;\n  font-family: "Inter", sans-serif;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 24px;\n}\n.navbar[_ngcontent-%COMP%] {\n  height: 80px;\n  display: flex;\n  align-items: center;\n  position: sticky;\n  top: 0;\n  background: rgba(255, 255, 255, 0.9);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  z-index: 1000;\n  border-bottom: 1px solid #f1f5f9;\n}\n.nav-content[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.logo-text[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: #1e293b;\n  letter-spacing: -0.5px;\n}\n.logo-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #6366f1;\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 24px;\n}\n.login-link[_ngcontent-%COMP%] {\n  color: #475569;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.login-link[_ngcontent-%COMP%]:hover {\n  color: #6366f1;\n}\n.cta-button[_ngcontent-%COMP%] {\n  background: #6366f1;\n  color: white;\n  padding: 10px 24px;\n  border-radius: 12px;\n  text-decoration: none;\n  font-weight: 600;\n  transition: all 0.2s;\n  box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.39);\n}\n.cta-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.23);\n}\n.hero[_ngcontent-%COMP%] {\n  padding: 100px 0;\n  background:\n    radial-gradient(\n      circle at top right,\n      #f5f3ff,\n      white);\n}\n.hero[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  align-items: center;\n  gap: 60px;\n}\n.hero-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3.5rem;\n  font-weight: 800;\n  line-height: 1.1;\n  margin-bottom: 24px;\n  color: #0f172a;\n}\n.hero-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      to right,\n      #6366f1,\n      #a855f7);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n.hero-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #475569;\n  line-height: 1.6;\n  margin-bottom: 40px;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.primary-btn[_ngcontent-%COMP%] {\n  background: #0f172a;\n  color: white;\n  padding: 16px 32px;\n  border-radius: 14px;\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 1.1rem;\n  transition: all 0.2s;\n}\n.primary-btn[_ngcontent-%COMP%]:hover {\n  background: #1e293b;\n  transform: translateY(-2px);\n}\n.secondary-btn[_ngcontent-%COMP%] {\n  background: white;\n  color: #0f172a;\n  padding: 16px 32px;\n  border-radius: 14px;\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 1.1rem;\n  border: 1px solid #e2e8f0;\n  transition: all 0.2s;\n}\n.secondary-btn[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.hero-visual[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 24px;\n  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);\n}\n.mockup-frame[_ngcontent-%COMP%] {\n  height: 400px;\n  background: #f1f5f9;\n  border-radius: 16px;\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.skeleton-title[_ngcontent-%COMP%] {\n  height: 30px;\n  width: 60%;\n  background: #e2e8f0;\n  border-radius: 6px;\n}\n.skeleton-line[_ngcontent-%COMP%] {\n  height: 15px;\n  width: 100%;\n  background: #e2e8f0;\n  border-radius: 4px;\n}\n.skeleton-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-top: 20px;\n}\n.skeleton-box[_ngcontent-%COMP%] {\n  height: 120px;\n  background: #e2e8f0;\n  border-radius: 8px;\n}\n.features[_ngcontent-%COMP%] {\n  padding: 100px 0;\n  background: #f8fafc;\n}\n.section-title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 60px;\n}\n.section-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  margin-bottom: 16px;\n}\n.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #64748b;\n}\n.features-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n}\n.feature-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 40px;\n  border-radius: 20px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);\n  transition: transform 0.2s;\n}\n.feature-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n}\n.feature-card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  margin-bottom: 20px;\n}\n.feature-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.feature-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  line-height: 1.6;\n}\n.pricing[_ngcontent-%COMP%] {\n  padding: 100px 0;\n}\n.pricing-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 32px;\n}\n.pricing-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 40px;\n  border-radius: 24px;\n  border: 1px solid #f1f5f9;\n  text-align: center;\n}\n.pricing-card.featured[_ngcontent-%COMP%] {\n  border: 2px solid #6366f1;\n  position: relative;\n  transform: scale(1.05);\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -12px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #6366f1;\n  color: white;\n  padding: 4px 16px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  margin: 24px 0;\n}\n.price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #64748b;\n  font-weight: 400;\n}\n.pricing-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin-bottom: 32px;\n  text-align: left;\n}\n.pricing-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 10px 0;\n  color: #475569;\n  display: flex;\n  align-items: center;\n}\n.pricing-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2713";\n  color: #10b981;\n  font-weight: bold;\n  margin-right: 12px;\n}\n.pricing-btn[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: 14px;\n  border-radius: 12px;\n  text-decoration: none;\n  font-weight: 600;\n  background: #f1f5f9;\n  color: #0f172a;\n  transition: all 0.2s;\n}\n.featured[_ngcontent-%COMP%]   .pricing-btn[_ngcontent-%COMP%] {\n  background: #6366f1;\n  color: white;\n}\n.pricing-btn[_ngcontent-%COMP%]:hover {\n  filter: brightness(0.95);\n}\n.savings[_ngcontent-%COMP%] {\n  color: #10b981;\n  font-weight: 700;\n  font-size: 0.9rem;\n  margin-top: -10px;\n  margin-bottom: 20px;\n}\n.main-footer[_ngcontent-%COMP%] {\n  padding: 80px 0 40px;\n  background: #0f172a;\n  color: white;\n}\n.footer-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr 1fr;\n  gap: 60px;\n  margin-bottom: 60px;\n}\n.footer-brand[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  color: white;\n}\n.footer-brand[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  margin-top: 16px;\n  max-width: 300px;\n}\n.footer-links[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  margin-bottom: 24px;\n  color: white;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: block;\n  color: #94a3b8;\n  text-decoration: none;\n  margin-bottom: 12px;\n  transition: color 0.2s;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #6366f1;\n}\n.footer-bottom[_ngcontent-%COMP%] {\n  padding-top: 40px;\n  border-top: 1px solid #1e293b;\n  text-align: center;\n  color: #64748b;\n  font-size: 0.9rem;\n}\n@media (max-width: 968px) {\n  .hero[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    text-align: center;\n  }\n  .hero-actions[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .features-grid[_ngcontent-%COMP%], .pricing-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .pricing-card.featured[_ngcontent-%COMP%] {\n    transform: scale(1);\n  }\n  .footer-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 40px;\n  }\n}\n/*# sourceMappingURL=landing.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LandingComponent, { className: "LandingComponent", filePath: "src\\app\\pages\\landing\\landing.component.ts", lineNumber: 12 });
})();
export {
  LandingComponent
};
//# sourceMappingURL=chunk-3O6OKQAD.js.map
