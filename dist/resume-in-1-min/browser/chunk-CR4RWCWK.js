import {
  ChatSidebarComponent,
  TemplateService
} from "./chunk-O34PC74M.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-IJPL72L2.js";
import {
  BenefitsService
} from "./chunk-H4BXM6O2.js";
import {
  CommonModule,
  DomSanitizer,
  HttpClient,
  HttpClientModule,
  HttpService,
  NgForOf,
  NgIf,
  Router
} from "./chunk-JD2JENED.js";
import {
  ChangeDetectorRef,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
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
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-V66YKGVO.js";
import "./chunk-ASLTLD6L.js";

// src/app/template-gallery/template-preview.component.ts
var TemplatePreviewComponent = class _TemplatePreviewComponent {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
    this.htmlContent = "";
    this.safeContent = "";
  }
  ngOnChanges(changes) {
    if (changes["htmlContent"]) {
      let rawHtml = this.htmlContent || "";
      rawHtml = rawHtml.replace(/src=["'][^"']*_files\/[^"']*["']/gi, 'src="" style="display:none"');
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    }
  }
  static {
    this.\u0275fac = function TemplatePreviewComponent_Factory(t) {
      return new (t || _TemplatePreviewComponent)(\u0275\u0275directiveInject(DomSanitizer));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemplatePreviewComponent, selectors: [["app-template-preview"]], inputs: { htmlContent: "htmlContent" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "preview-scaler"], [3, "innerHTML"]], template: function TemplatePreviewComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("innerHTML", ctx.safeContent, \u0275\u0275sanitizeHtml);
      }
    }, dependencies: [CommonModule], styles: ["/* angular:styles/component:css;dc89c008b13b34c21fda6cdf6b69103067f16f0410d481cdb007943bc98959ce;D:/JD/Angular/resume-in-1-min/resume-app-ui/src/app/template-gallery/template-preview.component.ts */\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: white;\n  position: relative;\n}\n.preview-scaler {\n  width: 210mm;\n  min-height: 297mm;\n  transform-origin: 0 0;\n  transform: scale(0.23);\n  pointer-events: none;\n  background: white;\n  color: black;\n}\n/*# sourceMappingURL=template-preview.component.css.map */\n"], encapsulation: 3 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemplatePreviewComponent, { className: "TemplatePreviewComponent", filePath: "src\\app\\template-gallery\\template-preview.component.ts", lineNumber: 36 });
})();

// src/app/template-gallery/template-gallery.component.ts
function TemplateGalleryComponent_div_30_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "app-template-preview", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const theme_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("htmlContent", theme_r2.htmlTemplate);
  }
}
function TemplateGalleryComponent_div_30_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "app-template-preview", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const theme_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("htmlContent", theme_r2.htmlTemplate);
  }
}
function TemplateGalleryComponent_div_30_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 37);
    \u0275\u0275element(2, "rect", 38)(3, "line", 39)(4, "line", 40)(5, "rect", 41)(6, "rect", 42)(7, "rect", 43)(8, "rect", 44)(9, "rect", 45)(10, "circle", 46)(11, "circle", 47)(12, "circle", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "p", 49);
    \u0275\u0275text(14, "Interactive Form");
    \u0275\u0275elementEnd()();
  }
}
function TemplateGalleryComponent_div_30_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const theme_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(theme_r2.templateName.charAt(0));
  }
}
function TemplateGalleryComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275listener("click", function TemplateGalleryComponent_div_30_Template_div_click_0_listener() {
      const theme_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onGalleryTemplateSelect(theme_r2));
    });
    \u0275\u0275elementStart(1, "div", 27);
    \u0275\u0275template(2, TemplateGalleryComponent_div_30_div_2_Template, 2, 1, "div", 28)(3, TemplateGalleryComponent_div_30_div_3_Template, 2, 1, "div", 28)(4, TemplateGalleryComponent_div_30_div_4_Template, 15, 0, "div", 29)(5, TemplateGalleryComponent_div_30_div_5_Template, 3, 1, "div", 30);
    \u0275\u0275elementStart(6, "div", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 32)(9, "h3");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 33);
    \u0275\u0275text(12, "Use Template");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const theme_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", theme_r2.type === 1 && theme_r2.htmlTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", theme_r2.type === 2 && theme_r2.htmlTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", theme_r2.type === 2 && !theme_r2.htmlTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", theme_r2.type === 1 && !theme_r2.htmlTemplate);
    \u0275\u0275advance();
    \u0275\u0275classProp("form-badge", theme_r2.type === 2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", theme_r2.type === 2 ? "Form Edit" : "Free Edit", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(theme_r2.templateName);
  }
}
function TemplateGalleryComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "p");
    \u0275\u0275text(2, "No templates found matching your criteria.");
    \u0275\u0275elementEnd()();
  }
}
var TemplateGalleryComponent = class _TemplateGalleryComponent {
  constructor(templateService, benefitsService, httpService, router, http, cdr) {
    this.templateService = templateService;
    this.benefitsService = benefitsService;
    this.httpService = httpService;
    this.router = router;
    this.http = http;
    this.cdr = cdr;
    this.backendTemplates = [];
    this.filteredBackendTemplates = [];
    this.galleryViewMode = "grid";
    this.galleryFilter = "all";
    this.gallerySearch = "";
    this.sidebarOpen = false;
  }
  onSidebarToggled(isOpen) {
    this.sidebarOpen = isOpen;
  }
  onChatSelected(chatId) {
    console.log("Chat selected from gallery:", chatId);
    this.templateService.getChatSession(chatId).subscribe({
      next: (response) => {
        const initialData = response.data.resumeData;
        console.log("\u{1F4E6} API Response:", response.data, initialData);
        if (initialData) {
          console.log("\u{1F4E6} Passing initial resume data to editor via service");
          this.templateService.setTempResumeData(initialData);
        }
        this.router.navigate(["/editor", chatId], {
          queryParams: { templateId: response.data.templateId }
        });
      },
      error: (err) => console.error("Failed to load default template list", err)
    });
  }
  ngOnInit() {
    this.loadDefaultBackendTemplate();
  }
  loadDefaultBackendTemplate() {
    console.log("\u{1F504} Loading backend templates...");
    this.templateService.getBackendTemplates(1, 100, "asc").subscribe({
      next: (response) => {
        let templates = [];
        console.log("\u{1F4E6} API Response:", response);
        if (response.status && response.data) {
          if (Array.isArray(response.data)) {
            templates = response.data;
          } else if (response.data.templates && Array.isArray(response.data.templates)) {
            templates = response.data.templates;
          } else if (response.data.items && Array.isArray(response.data.items)) {
            templates = response.data.items;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            templates = response.data.data;
          }
        }
        console.log("\u2705 Extracted templates:", templates.length);
        if (templates.length > 0) {
          templates.forEach((t) => {
            if (!t.templateName)
              t.templateName = "Untitled Template";
            if (t.templateTypeId) {
              t.type = t.templateTypeId;
            }
            if (t.id === "6973bcfbdf2766fbee178f68" || t.id === "69760da5141f61da2dbb924e") {
              t.type = 2;
              this.loadFormTemplatePreview(t);
            } else if (!t.type) {
              t.type = 1;
            }
          });
        }
        this.backendTemplates = templates;
        this.applyGalleryFilters();
        console.log("\u{1F50E} Filtered count:", this.filteredBackendTemplates.length);
      },
      error: (err) => console.error("Failed to load default template list", err)
    });
  }
  applyGalleryFilters() {
    this.filteredBackendTemplates = this.backendTemplates.filter((t) => {
      const matchesSearch = !this.gallerySearch || t.templateName.toLowerCase().includes(this.gallerySearch.toLowerCase());
      const matchesFilter = this.galleryFilter === "all" || this.galleryFilter === "free" && t.type === 1 || this.galleryFilter === "form" && t.type === 2;
      return matchesSearch && matchesFilter;
    });
  }
  /**
   * Load preview HTML for form edit templates
   * Uses pre-created static HTML files from assets folder
   */
  loadFormTemplatePreview(template) {
    const previewPath = `assets/templates/form-preview-${template.id}.html`;
    this.http.get(previewPath, { responseType: "text" }).subscribe({
      next: (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const images = doc.querySelectorAll("img");
        let hasChanges = false;
        images.forEach((img) => {
          const src = img.getAttribute("src");
          if (src && (src.includes("Document") && src.includes("_files") || src.startsWith("file:"))) {
            console.warn("Removing broken image link from preview:", src);
            img.remove();
            hasChanges = true;
          }
        });
        template.htmlTemplate = hasChanges ? doc.documentElement.innerHTML : html;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.warn(`Preview HTML not found for template ${template.id}`, err);
      }
    });
  }
  onGalleryTemplateSelect(template) {
    console.log("Gallery Template Selected:", template);
    const limit = this.benefitsService.get("TEMPLATE_LIMIT");
    this.httpService.get("resume/chat/sessions?page=1&pageSize=1").subscribe({
      next: (res) => {
        const currentCount = res.data?.totalCount || (Array.isArray(res.data) ? res.data.length : 0);
        if (currentCount >= limit && limit > 0) {
          alert(`Template limit reached (${limit}). Please upgrade your plan to create more resumes.`);
          this.router.navigate(["/billing/plans"]);
          return;
        }
        this.createSession(template);
      },
      error: (err) => {
        console.error("Error checking sessions count:", err);
        this.createSession(template);
      }
    });
  }
  createSession(template) {
    this.templateService.createChatSession(template.id).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          const chatId = response.data._id || response.data.chatId;
          console.log("\u2705 Created new chat session:", chatId);
          const initialData = response.data.resumeData || response.data.current_resume || response.data.resume_data;
          if (initialData) {
            console.log("\u{1F4E6} Passing initial resume data to editor via service");
            this.templateService.setTempResumeData(initialData);
          }
          this.router.navigate(["/editor", chatId], {
            queryParams: { templateId: template.id }
          });
        } else {
          console.error("\u274C Failed to create chat session:", response.message);
          alert("Could not start a new session. Please try again.");
        }
      },
      error: (err) => {
        console.error("\u274C Error creating chat session:", err);
        alert("Error connecting to server.");
      }
    });
  }
  static {
    this.\u0275fac = function TemplateGalleryComponent_Factory(t) {
      return new (t || _TemplateGalleryComponent)(\u0275\u0275directiveInject(TemplateService), \u0275\u0275directiveInject(BenefitsService), \u0275\u0275directiveInject(HttpService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TemplateGalleryComponent, selectors: [["app-template-gallery"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 14, consts: [[3, "chatSelected", "sidebarToggled"], [1, "gallery-container"], [1, "gallery-header"], [1, "gallery-controls"], ["type", "text", "placeholder", "Search templates...", 1, "gallery-search", 3, "ngModelChange", "input", "ngModel"], [1, "gallery-filter", 3, "ngModelChange", "change", "ngModel"], ["value", "all"], ["value", "free"], ["value", "form"], [1, "view-toggle"], ["title", "Grid View", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "3", "width", "7", "height", "7"], ["x", "14", "y", "14", "width", "7", "height", "7"], ["x", "3", "y", "14", "width", "7", "height", "7"], ["title", "List View", 3, "click"], ["x1", "8", "y1", "6", "x2", "21", "y2", "6"], ["x1", "8", "y1", "12", "x2", "21", "y2", "12"], ["x1", "8", "y1", "18", "x2", "21", "y2", "18"], ["x1", "3", "y1", "6", "x2", "3.01", "y2", "6"], ["x1", "3", "y1", "12", "x2", "3.01", "y2", "12"], ["x1", "3", "y1", "18", "x2", "3.01", "y2", "18"], [1, "gallery-content"], ["class", "template-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "no-results", 4, "ngIf"], [1, "template-card", 3, "click"], [1, "template-preview"], ["class", "html-preview-container", 4, "ngIf"], ["class", "form-preview-placeholder", 4, "ngIf"], ["class", "preview-placeholder", 4, "ngIf"], [1, "template-badge"], [1, "template-info"], [1, "select-btn"], [1, "html-preview-container"], [3, "htmlContent"], [1, "form-preview-placeholder"], ["width", "80", "height", "100", "viewBox", "0 0 80 100", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["x", "10", "y", "5", "width", "60", "height", "90", "rx", "4", "stroke", "currentColor", "stroke-width", "2", "fill", "white"], ["x1", "20", "y1", "15", "x2", "60", "y2", "15", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "20", "y1", "23", "x2", "50", "y2", "23", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "opacity", "0.6"], ["x", "20", "y", "32", "width", "40", "height", "6", "rx", "2", "fill", "currentColor", "opacity", "0.2"], ["x", "20", "y", "42", "width", "40", "height", "6", "rx", "2", "fill", "currentColor", "opacity", "0.2"], ["x", "20", "y", "52", "width", "25", "height", "6", "rx", "2", "fill", "currentColor", "opacity", "0.2"], ["x", "20", "y", "62", "width", "40", "height", "6", "rx", "2", "fill", "currentColor", "opacity", "0.2"], ["x", "20", "y", "72", "width", "30", "height", "6", "rx", "2", "fill", "currentColor", "opacity", "0.2"], ["cx", "17", "cy", "35", "r", "2", "fill", "currentColor", "opacity", "0.4"], ["cx", "17", "cy", "45", "r", "2", "fill", "currentColor", "opacity", "0.4"], ["cx", "17", "cy", "65", "r", "2", "fill", "currentColor", "opacity", "0.4"], [1, "form-label"], [1, "preview-placeholder"], [1, "no-results"]], template: function TemplateGalleryComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-chat-sidebar", 0);
        \u0275\u0275listener("chatSelected", function TemplateGalleryComponent_Template_app_chat_sidebar_chatSelected_0_listener($event) {
          return ctx.onChatSelected($event);
        })("sidebarToggled", function TemplateGalleryComponent_Template_app_chat_sidebar_sidebarToggled_0_listener($event) {
          return ctx.onSidebarToggled($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "h2");
        \u0275\u0275text(4, "Select a Template");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 3)(6, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function TemplateGalleryComponent_Template_input_ngModelChange_6_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.gallerySearch, $event) || (ctx.gallerySearch = $event);
          return $event;
        });
        \u0275\u0275listener("input", function TemplateGalleryComponent_Template_input_input_6_listener() {
          return ctx.applyGalleryFilters();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "select", 5);
        \u0275\u0275twoWayListener("ngModelChange", function TemplateGalleryComponent_Template_select_ngModelChange_7_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.galleryFilter, $event) || (ctx.galleryFilter = $event);
          return $event;
        });
        \u0275\u0275listener("change", function TemplateGalleryComponent_Template_select_change_7_listener() {
          return ctx.applyGalleryFilters();
        });
        \u0275\u0275elementStart(8, "option", 6);
        \u0275\u0275text(9, "All Templates");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "option", 7);
        \u0275\u0275text(11, "Free Edit (HTML)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 8);
        \u0275\u0275text(13, "Form Edit (Interactive)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 9)(15, "button", 10);
        \u0275\u0275listener("click", function TemplateGalleryComponent_Template_button_click_15_listener() {
          return ctx.galleryViewMode = "grid";
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(16, "svg", 11);
        \u0275\u0275element(17, "rect", 12)(18, "rect", 13)(19, "rect", 14)(20, "rect", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(21, "button", 16);
        \u0275\u0275listener("click", function TemplateGalleryComponent_Template_button_click_21_listener() {
          return ctx.galleryViewMode = "list";
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(22, "svg", 11);
        \u0275\u0275element(23, "line", 17)(24, "line", 18)(25, "line", 19)(26, "line", 20)(27, "line", 21)(28, "line", 22);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(29, "div", 23);
        \u0275\u0275template(30, TemplateGalleryComponent_div_30_Template, 13, 8, "div", 24)(31, TemplateGalleryComponent_div_31_Template, 3, 0, "div", 25);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275classProp("sidebar-open", ctx.sidebarOpen);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.gallerySearch);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.galleryFilter);
        \u0275\u0275advance(8);
        \u0275\u0275classProp("active", ctx.galleryViewMode === "grid");
        \u0275\u0275advance(6);
        \u0275\u0275classProp("active", ctx.galleryViewMode === "list");
        \u0275\u0275advance(8);
        \u0275\u0275classProp("grid-view", ctx.galleryViewMode === "grid")("list-view", ctx.galleryViewMode === "list");
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.filteredBackendTemplates);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredBackendTemplates.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, HttpClientModule, ChatSidebarComponent, TemplatePreviewComponent], styles: ["\n\n.gallery-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  background-color: #f8f9fa;\n  padding: 20px 40px;\n  overflow-y: auto;\n  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media (min-width: 769px) {\n  .gallery-container[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n  .gallery-container.sidebar-open[_ngcontent-%COMP%] {\n    margin-left: 280px;\n  }\n}\n@media (max-width: 768px) {\n  .gallery-container[_ngcontent-%COMP%] {\n    padding: 20px;\n    margin-left: 0;\n  }\n}\n.gallery-header[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n.gallery-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #333;\n  margin-bottom: 20px;\n}\n.gallery-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.gallery-search[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 250px;\n  padding: 10px 15px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.gallery-filter[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  background: white;\n  cursor: pointer;\n}\n.view-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.view-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px;\n  border: none;\n  background: white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.view-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n.view-toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.gallery-content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 20px;\n  padding-bottom: 40px;\n}\n.gallery-content.grid-view[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n}\n.gallery-content.list-view[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n.template-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: transform 0.2s, box-shadow 0.2s;\n  cursor: pointer;\n  border: 1px solid #eee;\n}\n.template-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);\n  border-color: #1976d2;\n}\n.template-preview[_ngcontent-%COMP%] {\n  height: 200px;\n  background: #f0f0f0;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.list-view[_ngcontent-%COMP%]   .template-card[_ngcontent-%COMP%] {\n  display: flex;\n  height: 120px;\n}\n.list-view[_ngcontent-%COMP%]   .template-preview[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 100%;\n}\n.preview-placeholder[_ngcontent-%COMP%] {\n  font-size: 48px;\n  font-weight: bold;\n  color: #ccc;\n  text-transform: uppercase;\n}\n.template-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #4caf50;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  z-index: 10;\n}\n.template-badge.form-badge[_ngcontent-%COMP%] {\n  background: #2196f3;\n}\n.template-info[_ngcontent-%COMP%] {\n  padding: 15px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.list-view[_ngcontent-%COMP%]   .template-info[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  flex-direction: row;\n  align-items: center;\n}\n.template-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n}\n.select-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #1976d2;\n  border: 1px solid #1976d2;\n  padding: 6px 12px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n.template-card[_ngcontent-%COMP%]:hover   .select-btn[_ngcontent-%COMP%] {\n  background: #1976d2;\n  color: white;\n}\n.html-preview-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n  background: white;\n}\n.scaled-preview[_ngcontent-%COMP%] {\n  width: 8.5in;\n  min-height: 11in;\n  transform-origin: top left;\n  transform: scale(0.25);\n  pointer-events: none;\n  background: white;\n}\n.scaled-preview[_ngcontent-%COMP%]     body {\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n}\n.form-preview-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: #2196f3;\n  padding: 20px;\n}\n.form-preview-placeholder[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));\n}\n.form-label[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  font-weight: 600;\n  color: #666;\n  text-align: center;\n}\n.no-results[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n  font-size: 16px;\n}\n.loading-spinner-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 12px;\n}\n/*# sourceMappingURL=template-gallery.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TemplateGalleryComponent, { className: "TemplateGalleryComponent", filePath: "src\\app\\template-gallery\\template-gallery.component.ts", lineNumber: 21 });
})();
export {
  TemplateGalleryComponent
};
//# sourceMappingURL=chunk-CR4RWCWK.js.map
