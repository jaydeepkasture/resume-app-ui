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

// src/app/pages/about/about.component.ts
var AboutComponent = class _AboutComponent {
  constructor() {
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  static {
    this.\u0275fac = function AboutComponent_Factory(t) {
      return new (t || _AboutComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 65, vars: 1, consts: [[1, "about-container"], [1, "about-header"], [1, "container"], ["routerLink", "/", 1, "back-link"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "subtitle"], [1, "about-content", "container"], [1, "about-card"], [1, "about-footer"], [1, "footer-links"], ["routerLink", "/privacy-policy"], ["routerLink", "/terms-of-service"], ["routerLink", "/refund-policy"], ["routerLink", "/contact"]], template: function AboutComponent_Template(rf, ctx) {
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
        \u0275\u0275text(9, "About Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 7);
        \u0275\u0275text(11, "Building the future of professional careers with AI.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "section")(15, "h2");
        \u0275\u0275text(16, "Our Mission");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "p");
        \u0275\u0275text(18, "At ");
        \u0275\u0275elementStart(19, "strong");
        \u0275\u0275text(20, "1mincv.com");
        \u0275\u0275elementEnd();
        \u0275\u0275text(21, ", we believe that everyone deserves a professional resume that accurately reflects their potential. Our mission is to simplify the resume-building process by leveraging cutting-edge Artificial Intelligence, allowing job seekers to create stunning, ATS-friendly resumes in under a minute.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "section")(23, "h2");
        \u0275\u0275text(24, "The Problem We Solve");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p");
        \u0275\u0275text(26, "Creating a resume is often stressful, time-consuming, and technically challenging. Many applicants struggle with formatting, wording, and ensuring their experience stands out. We solve this by providing smart suggestions, professional templates, and an intuitive editor that does the heavy lifting for you.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "section")(28, "h2");
        \u0275\u0275text(29, "Why Choose 1mincv.com?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "ul")(31, "li")(32, "strong");
        \u0275\u0275text(33, "AI-Powered Insights:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(34, " Smart content generation tailored to your industry.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "li")(36, "strong");
        \u0275\u0275text(37, "Speed & Efficiency:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(38, " Build a complete resume in just a few clicks.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "li")(40, "strong");
        \u0275\u0275text(41, "ATS Optimization:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(42, " Templates designed to pass through modern hiring software.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "li")(44, "strong");
        \u0275\u0275text(45, "Modern Design:");
        \u0275\u0275elementEnd();
        \u0275\u0275text(46, " Premium templates that make a great first impression.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(47, "section")(48, "h2");
        \u0275\u0275text(49, "Our Story");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "p");
        \u0275\u0275text(51, "Founded with the goal of empowering job seekers in the modern economy, 1mincv.com started as a simple idea: what if artificial intelligence could act as a career coach? Today, we are a growing SaaS platform helping thousands of users globally navigate their career paths with confidence.");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(52, "footer", 10)(53, "div", 2)(54, "div", 11)(55, "a", 12);
        \u0275\u0275text(56, "Privacy Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "a", 13);
        \u0275\u0275text(58, "Terms of Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "a", 14);
        \u0275\u0275text(60, "Refund Policy");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "a", 15);
        \u0275\u0275text(62, "Contact Us");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(63, "p");
        \u0275\u0275text(64);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(64);
        \u0275\u0275textInterpolate1("\xA9 ", ctx.currentYear, " 1mincv.com. All rights reserved.");
      }
    }, dependencies: [CommonModule, RouterModule, RouterLink], styles: ['\n\n.about-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #f8fafc;\n  color: #1e293b;\n  display: flex;\n  flex-direction: column;\n}\n.about-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #a855f7 100%);\n  color: white;\n  padding: 80px 0 60px;\n  text-align: center;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: rgba(255, 255, 255, 0.9);\n  text-decoration: none;\n  font-size: 0.95rem;\n  margin-bottom: 24px;\n  transition: color 0.2s;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: white;\n}\n.about-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  margin-bottom: 12px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  opacity: 0.9;\n}\n.about-content[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-top: -40px;\n  padding-bottom: 80px;\n}\n.about-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 60px;\n  border-radius: 24px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);\n}\nsection[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\nsection[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin-bottom: 20px;\n  position: relative;\n  padding-bottom: 12px;\n}\nh2[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 40px;\n  height: 4px;\n  background: #6366f1;\n  border-radius: 2px;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.7;\n  color: #475569;\n  font-size: 1.05rem;\n  margin-bottom: 16px;\n}\nul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 12px 0;\n  border-bottom: 1px solid #f1f5f9;\n  color: #475569;\n  display: flex;\n  align-items: center;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2713";\n  color: #10b981;\n  font-weight: bold;\n  margin-right: 12px;\n}\n.about-footer[_ngcontent-%COMP%] {\n  padding: 40px 0;\n  background: white;\n  border-top: 1px solid #e2e8f0;\n  text-align: center;\n}\n.footer-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 24px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #64748b;\n  text-decoration: none;\n  font-size: 0.9rem;\n  transition: color 0.2s;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #6366f1;\n}\n.about-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #94a3b8;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .about-header[_ngcontent-%COMP%] {\n    padding: 60px 0 40px;\n  }\n  .about-card[_ngcontent-%COMP%] {\n    padding: 30px;\n    border-radius: 16px;\n  }\n  .about-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n}\n/*# sourceMappingURL=about.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent", filePath: "src\\app\\pages\\about\\about.component.ts", lineNumber: 12 });
})();
export {
  AboutComponent
};
//# sourceMappingURL=chunk-5NPYXZXB.js.map
