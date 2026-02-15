import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-IJPL72L2.js";
import {
  AuthService,
  BenefitsService
} from "./chunk-H4BXM6O2.js";
import {
  CommonModule,
  HttpClient,
  HttpService,
  NgForOf,
  NgIf,
  Router
} from "./chunk-JD2JENED.js";
import {
  EventEmitter,
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
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-V66YKGVO.js";
import {
  __spreadValues
} from "./chunk-ASLTLD6L.js";

// src/app/components/chat-sidebar/chat-sidebar.component.ts
function ChatSidebarComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSidebar());
    });
    \u0275\u0275elementEnd();
  }
}
function ChatSidebarComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "div", 45);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading sessions...");
    \u0275\u0275elementEnd()();
  }
}
function ChatSidebarComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 47);
    \u0275\u0275element(2, "circle", 16)(3, "line", 48)(4, "line", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 50);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_26_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadSessions());
    });
    \u0275\u0275text(8, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function ChatSidebarComponent_div_27_div_1_h4_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const session_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(session_r7.title);
  }
}
function ChatSidebarComponent_div_27_div_1_input_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 68);
    \u0275\u0275twoWayListener("ngModelChange", function ChatSidebarComponent_div_27_div_1_input_7_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.editingTitle, $event) || (ctx_r2.editingTitle = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("click", function ChatSidebarComponent_div_27_div_1_input_7_Template_input_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    })("keydown", function ChatSidebarComponent_div_27_div_1_input_7_Template_input_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const session_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onTitleKeydown($event, session_r7.chatId));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.editingTitle);
  }
}
function ChatSidebarComponent_div_27_div_1_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_27_div_1_button_10_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const session_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.startEditingTitle(session_r7.chatId, session_r7.title, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 70);
    \u0275\u0275element(2, "path", 71)(3, "path", 72);
    \u0275\u0275elementEnd()();
  }
}
function ChatSidebarComponent_div_27_div_1_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 73);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_27_div_1_button_11_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const session_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.saveTitle(session_r7.chatId, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 70);
    \u0275\u0275element(2, "polyline", 74);
    \u0275\u0275elementEnd()();
  }
}
function ChatSidebarComponent_div_27_div_1_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 75);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_27_div_1_button_12_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cancelEditingTitle($event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 70);
    \u0275\u0275element(2, "line", 76)(3, "line", 77);
    \u0275\u0275elementEnd()();
  }
}
function ChatSidebarComponent_div_27_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_27_div_1_Template_div_click_0_listener() {
      const session_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectChat(session_r7.chatId));
    });
    \u0275\u0275elementStart(1, "div", 54)(2, "div", 55);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 15);
    \u0275\u0275element(4, "path", 56);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 57);
    \u0275\u0275template(6, ChatSidebarComponent_div_27_div_1_h4_6_Template, 2, 1, "h4", 58)(7, ChatSidebarComponent_div_27_div_1_input_7_Template, 1, 1, "input", 59);
    \u0275\u0275elementStart(8, "p", 60);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(10, ChatSidebarComponent_div_27_div_1_button_10_Template, 4, 0, "button", 61)(11, ChatSidebarComponent_div_27_div_1_button_11_Template, 3, 0, "button", 62)(12, ChatSidebarComponent_div_27_div_1_button_12_Template, 4, 0, "button", 63);
    \u0275\u0275elementStart(13, "button", 64);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_27_div_1_Template_button_click_13_listener($event) {
      const session_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteChat(session_r7.chatId, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 15);
    \u0275\u0275element(15, "polyline", 65)(16, "path", 66);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const session_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r2.editingChatId !== session_r7.chatId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editingChatId === session_r7.chatId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(session_r7.updatedAt));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editingChatId !== session_r7.chatId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editingChatId === session_r7.chatId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.editingChatId === session_r7.chatId);
  }
}
function ChatSidebarComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275template(1, ChatSidebarComponent_div_27_div_1_Template, 17, 6, "div", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.sessions);
  }
}
function ChatSidebarComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 78);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 79);
    \u0275\u0275element(2, "path", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No chat sessions yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Create a new resume to get started");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 80);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_28_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createNewChat());
    });
    \u0275\u0275text(8, " Create New Resume ");
    \u0275\u0275elementEnd()();
  }
}
function ChatSidebarComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 81)(1, "button", 82);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_29_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadMore());
    });
    \u0275\u0275text(2, " Load More ");
    \u0275\u0275elementEnd()();
  }
}
function ChatSidebarComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275element(1, "div", 84);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Loading more...");
    \u0275\u0275elementEnd()();
  }
}
function ChatSidebarComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "button", 86);
    \u0275\u0275listener("click", function ChatSidebarComponent_div_46_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSidebar());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 87);
    \u0275\u0275element(3, "rect", 21)(4, "line", 22)(5, "polyline", 88);
    \u0275\u0275elementEnd()()();
  }
}
function ChatSidebarComponent__svg_svg_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 87);
    \u0275\u0275element(1, "line", 89)(2, "line", 90)(3, "line", 91);
    \u0275\u0275elementEnd();
  }
}
function ChatSidebarComponent__svg_svg_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 87);
    \u0275\u0275element(1, "line", 76)(2, "line", 77);
    \u0275\u0275elementEnd();
  }
}
var ChatSidebarComponent = class _ChatSidebarComponent {
  constructor(httpService, authService, benefitsService, router) {
    this.httpService = httpService;
    this.authService = authService;
    this.benefitsService = benefitsService;
    this.router = router;
    this.chatSelected = new EventEmitter();
    this.sidebarToggled = new EventEmitter();
    this.isOpen = window.innerWidth >= 769;
    this.sessions = [];
    this.loading = false;
    this.error = "";
    this.currentPage = 1;
    this.pageSize = 20;
    this.totalCount = 0;
    this.hasMore = false;
    this.editingChatId = null;
    this.editingTitle = "";
  }
  ngOnInit() {
    setTimeout(() => this.sidebarToggled.emit(this.isOpen));
    this.loadSessions();
    window.addEventListener("resize", this.onResize.bind(this));
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }
  onResize() {
    if (window.innerWidth < 769 && this.isOpen) {
      this.isOpen = false;
      this.sidebarToggled.emit(this.isOpen);
    }
  }
  /**
   * Toggle sidebar open/close
   */
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggled.emit(this.isOpen);
  }
  /**
   * Load chat sessions
   */
  loadSessions(page = 1) {
    this.loading = true;
    this.error = "";
    const url = `resume/chat/sessions?page=${page}&pageSize=${this.pageSize}`;
    this.httpService.get(url).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          const data = response.data;
          if (Array.isArray(data)) {
            const newSessions = data.map((item) => ({
              chatId: item.sessionId || item.chatId,
              // Handle both just in case
              title: item.title || "Untitled Chat",
              createdAt: item.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
              updatedAt: item.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
              messageCount: 0
            }));
            if (page === 1) {
              this.sessions = newSessions;
            } else {
              this.sessions = [...this.sessions, ...newSessions];
            }
            this.hasMore = newSessions.length >= this.pageSize;
            this.currentPage = page;
            this.totalCount = this.sessions.length;
          } else if (data.sessions) {
            if (page === 1) {
              this.sessions = data.sessions;
            } else {
              this.sessions = [...this.sessions, ...data.sessions];
            }
            this.totalCount = data.totalCount;
            this.currentPage = data.page;
            this.hasMore = this.currentPage * this.pageSize < this.totalCount;
          }
          console.log("\u2705 Loaded chat sessions:", this.sessions.length);
        } else {
          this.error = response.message || "Failed to load sessions";
        }
        this.loading = false;
      },
      error: (error) => {
        console.error("\u274C Error loading sessions:", error);
        this.error = "Failed to load chat sessions";
        this.loading = false;
      }
    });
  }
  /**
   * Load more sessions (pagination)
   */
  loadMore() {
    if (this.hasMore && !this.loading) {
      this.loadSessions(this.currentPage + 1);
    }
  }
  /**
   * Create new chat session
   */
  createNewChat() {
    const limit = this.benefitsService.get("TEMPLATE_LIMIT");
    if (this.sessions.length >= limit && limit > 0) {
      alert(`Template limit reached (${limit}). Please upgrade your plan to create more resumes.`);
      this.router.navigate(["/billing/plans"]);
      return;
    }
    this.loading = true;
    this.error = "";
    const body = { title: "New Resume Chat" };
    this.httpService.post("resume/chat/create", body).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          console.log("\u2705 Created new chat:", response.data.chatId);
          const newSession = {
            chatId: response.data.chatId,
            title: response.data.title,
            createdAt: response.data.createdAt,
            updatedAt: response.data.createdAt,
            messageCount: 0
          };
          this.sessions.unshift(newSession);
          this.totalCount++;
          this.selectChat(response.data.chatId);
        } else {
          this.error = response.message || "Failed to create chat";
        }
        this.loading = false;
      },
      error: (error) => {
        console.error("\u274C Error creating chat:", error);
        if (error.status === 429) {
          this.router.navigate(["/billing/plans"]);
          return;
        }
        this.error = "Failed to create new chat";
        this.loading = false;
      }
    });
  }
  /**
   * Handle resume file upload
   */
  onFileSelected(event) {
    const file = event.target.files[0];
    if (!file)
      return;
    const allowedTypes = [".docx", ".pdf", ".doc"];
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedTypes.includes(extension)) {
      alert("Invalid file type. Only DOCX, DOC, and PDF files are allowed.");
      return;
    }
    const limit = this.benefitsService.get("TEMPLATE_LIMIT");
    if (this.sessions.length >= limit && limit > 0) {
      alert(`Template limit reached (${limit}). Please upgrade your plan to upload more resumes.`);
      this.router.navigate(["/billing/plans"]);
      return;
    }
    this.loading = true;
    console.log("\u{1F4E4} Uploading resume:", file.name);
    this.httpService.uploadFile("resume/upload", file).subscribe({
      next: (response) => {
        if (response.status) {
          console.log("\u2705 Resume uploaded successfully");
          alert("Resume uploaded successfully. We will enhance it for you!");
          this.loadSessions(1);
        } else {
          console.error("\u274C Upload failed:", response.message);
          alert(response.message || "Failed to upload resume.");
        }
        this.loading = false;
        event.target.value = "";
      },
      error: (err) => {
        console.error("\u274C Upload error:", err);
        if (err.status === 429) {
          this.router.navigate(["/billing/plans"]);
          return;
        }
        alert("An error occurred during upload. Please try again.");
        this.loading = false;
        event.target.value = "";
      }
    });
  }
  /**
   * Select a chat session
   */
  selectChat(chatId) {
    console.log("\u{1F4DD} Selected chat:", chatId);
    this.chatSelected.emit(chatId);
    if (window.innerWidth < 768) {
      this.isOpen = false;
      this.sidebarToggled.emit(false);
    }
  }
  /**
   * Delete a chat session
   */
  deleteChat(chatId, event) {
    event.stopPropagation();
    if (!confirm("Are you sure you want to delete this chat?")) {
      return;
    }
    this.httpService.delete(`resume/chat/${chatId}`).subscribe({
      next: (response) => {
        if (response.status) {
          console.log("\u2705 Deleted chat:", chatId);
          this.sessions = this.sessions.filter((s) => s.chatId !== chatId);
          this.totalCount--;
        } else {
          this.error = response.message || "Failed to delete chat";
        }
      },
      error: (error) => {
        console.error("\u274C Error deleting chat:", error);
        this.error = "Failed to delete chat";
      }
    });
  }
  /**
   * Start editing chat title
   */
  startEditingTitle(chatId, currentTitle, event) {
    event.stopPropagation();
    this.editingChatId = chatId;
    this.editingTitle = currentTitle;
  }
  /**
   * Cancel editing chat title
   */
  cancelEditingTitle(event) {
    if (event) {
      event.stopPropagation();
    }
    this.editingChatId = null;
    this.editingTitle = "";
  }
  /**
   * Save updated chat title
   */
  saveTitle(chatId, event) {
    event.stopPropagation();
    const newTitle = this.editingTitle.trim();
    if (!newTitle) {
      this.error = "Title cannot be empty";
      return;
    }
    const body = { title: newTitle };
    this.httpService.patch(`resume/chat/${chatId}/title`, body).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          console.log("\u2705 Updated chat title:", response.data);
          const session = this.sessions.find((s) => s.chatId === chatId);
          if (session) {
            session.title = response.data.title;
            session.updatedAt = response.data.updatedAt;
          }
          this.cancelEditingTitle();
        } else {
          this.error = response.message || "Failed to update title";
        }
      },
      error: (error) => {
        console.error("\u274C Error updating title:", error);
        this.error = "Failed to update title";
      }
    });
  }
  /**
   * Handle Enter key in title input
   */
  onTitleKeydown(event, chatId) {
    if (event.key === "Enter") {
      this.saveTitle(chatId, event);
    } else if (event.key === "Escape") {
      this.cancelEditingTitle(event);
    }
  }
  /**
   * Format date for display
   */
  /* Existing formatDate method */
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    const diffDays = Math.floor(diffMs / 864e5);
    if (diffMins < 1)
      return "Just now";
    if (diffMins < 60)
      return `${diffMins}m ago`;
    if (diffHours < 24)
      return `${diffHours}h ago`;
    if (diffDays < 7)
      return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }
  // User Profile Methods
  get currentUser() {
    return this.authService.currentUserValue;
  }
  getUserInitials() {
    const user = this.currentUser;
    if (!user)
      return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    } else if (user.name) {
      return user.name.substring(0, 2).toUpperCase();
    } else if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  }
  getUserDisplayName() {
    const user = this.currentUser;
    if (!user)
      return "User";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.name) {
      return user.name;
    } else if (user.email) {
      const atIndex = user.email.indexOf("@");
      return atIndex > -1 ? user.email.substring(0, atIndex) : user.email;
    }
    return "User";
  }
  navigateToProfile() {
    if (window.innerWidth < 768) {
      this.isOpen = false;
      this.sidebarToggled.emit(false);
    }
    this.router.navigate(["/profile"]);
  }
  logout() {
    if (confirm("Are you sure you want to sign out?")) {
      this.authService.logout();
    }
  }
  static {
    this.\u0275fac = function ChatSidebarComponent_Factory(t) {
      return new (t || _ChatSidebarComponent)(\u0275\u0275directiveInject(HttpService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(BenefitsService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChatSidebarComponent, selectors: [["app-chat-sidebar"]], outputs: { chatSelected: "chatSelected", sidebarToggled: "sidebarToggled" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 50, vars: 19, consts: [["fileInput", ""], [1, "sidebar-container"], ["class", "sidebar-overlay", 3, "click", 4, "ngIf"], [1, "sidebar"], [1, "sidebar-header"], [1, "header-actions"], [1, "upload-container"], ["type", "file", "accept", ".docx,.pdf,.doc", 2, "display", "none", 3, "change"], ["title", "Upload Resume", 1, "sidebar-action-btn", "upload-btn", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["points", "17 8 12 3 7 8"], ["x1", "12", "y1", "3", "x2", "12", "y2", "15"], [1, "btn-text"], ["title", "Upload existing resume will we enhance it or you can continue with our templates", 1, "info-icon-container"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "16", "x2", "12", "y2", "12"], ["x1", "12", "y1", "8", "x2", "12.01", "y2", "8"], ["title", "Close Sidebar", 1, "close-sidebar-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "9", "y1", "3", "x2", "9", "y2", "21"], [1, "sessions-list"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "sessions", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "load-more", 4, "ngIf"], ["class", "loading-more", 4, "ngIf"], [1, "sidebar-footer"], [1, "user-profile", 3, "click"], [1, "user-avatar"], [1, "user-info"], [1, "user-name"], [1, "user-email-label"], ["title", "Sign Out", 1, "sign-out-btn", 3, "click"], ["d", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"], ["points", "16 17 21 12 16 7"], ["x1", "21", "y1", "12", "x2", "9", "y2", "12"], ["class", "collapsed-sidebar", 4, "ngIf"], [1, "mobile-toggle", 3, "click"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], [1, "sidebar-overlay", 3, "click"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], ["width", "48", "height", "48", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "retry-btn", 3, "click"], [1, "sessions"], ["class", "session-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "session-item", 3, "click"], [1, "session-content"], [1, "session-icon"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], [1, "session-info"], ["class", "session-title", 4, "ngIf"], ["type", "text", "class", "title-input", "autofocus", "", 3, "ngModel", "ngModelChange", "click", "keydown", 4, "ngIf"], [1, "session-date"], ["class", "edit-btn", "title", "Rename chat", 3, "click", 4, "ngIf"], ["class", "save-btn", "title", "Save", 3, "click", 4, "ngIf"], ["class", "cancel-btn", "title", "Cancel", 3, "click", 4, "ngIf"], ["title", "Delete chat", 1, "delete-btn", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"], [1, "session-title"], ["type", "text", "autofocus", "", 1, "title-input", 3, "ngModelChange", "click", "keydown", "ngModel"], ["title", "Rename chat", 1, "edit-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"], ["title", "Save", 1, "save-btn", 3, "click"], ["points", "20 6 9 17 4 12"], ["title", "Cancel", 1, "cancel-btn", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "empty-state"], ["width", "64", "height", "64", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], [1, "create-first-btn", 3, "click"], [1, "load-more"], [1, "load-more-btn", 3, "click"], [1, "loading-more"], [1, "spinner-small"], [1, "collapsed-sidebar"], ["title", "Open Sidebar", 1, "expand-btn", 3, "click"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "15 9 15 15"], ["x1", "3", "y1", "12", "x2", "21", "y2", "12"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["x1", "3", "y1", "18", "x2", "21", "y2", "18"]], template: function ChatSidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, ChatSidebarComponent_div_1_Template, 1, 0, "div", 2);
        \u0275\u0275elementStart(2, "aside", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6)(6, "input", 7, 0);
        \u0275\u0275listener("change", function ChatSidebarComponent_Template_input_change_6_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFileSelected($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "button", 8);
        \u0275\u0275listener("click", function ChatSidebarComponent_Template_button_click_8_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r4 = \u0275\u0275reference(7);
          return \u0275\u0275resetView(fileInput_r4.click());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 9);
        \u0275\u0275element(10, "path", 10)(11, "polyline", 11)(12, "line", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(13, "span", 13);
        \u0275\u0275text(14, "Upload");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 14);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(16, "svg", 15);
        \u0275\u0275element(17, "circle", 16)(18, "line", 17)(19, "line", 18);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "button", 19);
        \u0275\u0275listener("click", function ChatSidebarComponent_Template_button_click_20_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleSidebar());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(21, "svg", 20);
        \u0275\u0275element(22, "rect", 21)(23, "line", 22);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(24, "div", 23);
        \u0275\u0275template(25, ChatSidebarComponent_div_25_Template, 4, 0, "div", 24)(26, ChatSidebarComponent_div_26_Template, 9, 1, "div", 25)(27, ChatSidebarComponent_div_27_Template, 2, 1, "div", 26)(28, ChatSidebarComponent_div_28_Template, 9, 0, "div", 27)(29, ChatSidebarComponent_div_29_Template, 3, 0, "div", 28)(30, ChatSidebarComponent_div_30_Template, 4, 0, "div", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 30)(32, "div", 31);
        \u0275\u0275listener("click", function ChatSidebarComponent_Template_div_click_32_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.navigateToProfile());
        });
        \u0275\u0275elementStart(33, "div", 32)(34, "span");
        \u0275\u0275text(35);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 33)(37, "span", 34);
        \u0275\u0275text(38);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "span", 35);
        \u0275\u0275text(40, "View Profile");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(41, "button", 36);
        \u0275\u0275listener("click", function ChatSidebarComponent_Template_button_click_41_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.logout());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(42, "svg", 15);
        \u0275\u0275element(43, "path", 37)(44, "polyline", 38)(45, "line", 39);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(46, ChatSidebarComponent_div_46_Template, 6, 0, "div", 40);
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(47, "button", 41);
        \u0275\u0275listener("click", function ChatSidebarComponent_Template_button_click_47_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleSidebar());
        });
        \u0275\u0275template(48, ChatSidebarComponent__svg_svg_48_Template, 4, 0, "svg", 42)(49, ChatSidebarComponent__svg_svg_49_Template, 3, 0, "svg", 42);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("open", ctx.isOpen);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isOpen);
        \u0275\u0275advance();
        \u0275\u0275classProp("open", ctx.isOpen);
        \u0275\u0275advance(6);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(17);
        \u0275\u0275property("ngIf", ctx.loading && ctx.sessions.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error && ctx.sessions.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.sessions.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.sessions.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.hasMore && !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading && ctx.sessions.length > 0);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.getUserInitials());
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.getUserDisplayName());
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", !ctx.isOpen);
        \u0275\u0275advance();
        \u0275\u0275classProp("open", ctx.isOpen);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isOpen);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isOpen);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 0;\n  height: 0;\n}\n.sidebar-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1000;\n}\n.sidebar-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 998;\n  display: none;\n}\n.sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: -280px;\n  width: 280px;\n  height: 100vh;\n  background:\n    linear-gradient(\n      180deg,\n      #1a1a2e 0%,\n      #16213e 100%);\n  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);\n  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 999;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.sidebar.open[_ngcontent-%COMP%] {\n  left: 0;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  flex-shrink: 0;\n}\n.new-chat-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.2s;\n  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n}\n.new-chat-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.new-chat-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.new-chat-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.new-chat-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.sessions-list[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 8px;\n}\n.sessions-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.sessions-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.sessions-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 3px;\n}\n.sessions-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n.session-item[_ngcontent-%COMP%] {\n  padding: 12px;\n  margin-bottom: 4px;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n.session-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  transform: translateX(4px);\n}\n.session-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n  min-width: 0;\n}\n.session-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 32px;\n  height: 32px;\n  background: rgba(102, 126, 234, 0.2);\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #667eea;\n}\n.session-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.session-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 500;\n  color: #ffffff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.session-date[_ngcontent-%COMP%] {\n  margin: 2px 0 0 0;\n  font-size: 12px;\n  color: rgba(255, 255, 255, 0.5);\n}\n.title-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 4px 8px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(102, 126, 234, 0.5);\n  border-radius: 4px;\n  color: white;\n  font-size: 14px;\n  font-weight: 500;\n  outline: none;\n  margin-bottom: 4px;\n}\n.title-input[_ngcontent-%COMP%]:focus {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: #667eea;\n}\n.edit-btn[_ngcontent-%COMP%], .save-btn[_ngcontent-%COMP%], .cancel-btn[_ngcontent-%COMP%], .delete-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: none;\n  border-radius: 4px;\n  color: rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  transition: all 0.2s;\n}\n.session-item[_ngcontent-%COMP%]:hover   .edit-btn[_ngcontent-%COMP%], .session-item[_ngcontent-%COMP%]:hover   .delete-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.save-btn[_ngcontent-%COMP%], .cancel-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.2);\n  color: #667eea;\n}\n.save-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(76, 175, 80, 0.2);\n  color: #4caf50;\n}\n.cancel-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 152, 0, 0.2);\n  color: #ff9800;\n}\n.delete-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 59, 48, 0.2);\n  color: #ff3b30;\n}\n.loading-state[_ngcontent-%COMP%], .error-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.7);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 16px 0 0 0;\n  font-size: 14px;\n}\n.empty-state[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.3);\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #ffffff;\n}\n.create-first-btn[_ngcontent-%COMP%], .retry-btn[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 10px 20px;\n  background: rgba(102, 126, 234, 0.2);\n  color: #667eea;\n  border: 1px solid rgba(102, 126, 234, 0.3);\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.create-first-btn[_ngcontent-%COMP%]:hover, .retry-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.3);\n  border-color: rgba(102, 126, 234, 0.5);\n}\n.load-more[_ngcontent-%COMP%] {\n  padding: 8px;\n  text-align: center;\n}\n.load-more-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: rgba(255, 255, 255, 0.05);\n  color: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.load-more-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n}\n.loading-more[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 13px;\n}\n.spinner-small[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.1);\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.new-chat-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.close-sidebar-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 8px;\n  color: rgba(255, 255, 255, 0.7);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.close-sidebar-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: white;\n}\n.upload-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 4px 8px;\n  border-radius: 8px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.upload-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: transparent;\n  border: none;\n  color: #667eea;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 4px 6px;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.upload-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(102, 126, 234, 0.15);\n  transform: translateY(-1px);\n}\n.upload-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.info-icon-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.4);\n  cursor: help;\n  transition: color 0.2s;\n}\n.info-icon-container[_ngcontent-%COMP%]:hover {\n  color: #667eea;\n}\n.btn-text[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n@media (max-width: 400px) {\n  .btn-text[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.collapsed-sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 60px;\n  height: 100vh;\n  background: #f5f5f5;\n  border-right: 1px solid #e0e0e0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 12px;\n  z-index: 900;\n}\n.expand-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  border: 1px solid #e0e0e0;\n  background: white;\n  color: #555;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.expand-btn[_ngcontent-%COMP%]:hover {\n  background: #f0f0f0;\n  color: #333;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);\n}\n.mobile-toggle[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  left: 20px;\n  width: 44px;\n  height: 44px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 50%;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n  transition: all 0.3s;\n  z-index: 1000;\n}\n@media (min-width: 769px) {\n  .sidebar[_ngcontent-%COMP%] {\n    left: -280px;\n  }\n  .sidebar.open[_ngcontent-%COMP%] {\n    left: 0;\n  }\n  .mobile-toggle[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .sidebar-overlay[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n@media (max-width: 768px) {\n  .collapsed-sidebar[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .close-sidebar-btn[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .sidebar-overlay.open[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .mobile-toggle.open[_ngcontent-%COMP%] {\n    left: 240px;\n  }\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: rgba(255, 255, 255, 0.03);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-top: auto;\n}\n.user-profile[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n  padding: 10px;\n  border-radius: 12px;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  border: 1px solid transparent;\n}\n.user-profile[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n  border-color: rgba(255, 255, 255, 0.1);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 700;\n  font-size: 15px;\n  flex-shrink: 0;\n  box-shadow: 0 2px 8px rgba(118, 75, 162, 0.4);\n  position: relative;\n  overflow: hidden;\n}\n.user-avatar[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.2),\n      transparent);\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-width: 0;\n  gap: 2px;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  letter-spacing: 0.3px;\n}\n.user-email-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: rgba(255, 255, 255, 0.5);\n  font-weight: 500;\n  transition: color 0.2s;\n}\n.user-profile[_ngcontent-%COMP%]:hover   .user-email-label[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n}\n.sign-out-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 10px;\n  color: rgba(255, 255, 255, 0.6);\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  flex-shrink: 0;\n}\n.sign-out-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 59, 48, 0.15);\n  color: #ff453a;\n  border-color: rgba(255, 59, 48, 0.4);\n  transform: rotate(90deg);\n  box-shadow: 0 0 12px rgba(255, 59, 48, 0.2);\n}\n/*# sourceMappingURL=chat-sidebar.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChatSidebarComponent, { className: "ChatSidebarComponent", filePath: "src\\app\\components\\chat-sidebar\\chat-sidebar.component.ts", lineNumber: 52 });
})();

// src/app/resume-editor/template.service.ts
var TemplateService = class _TemplateService {
  constructor(http, httpService) {
    this.http = http;
    this.httpService = httpService;
    this.templatesBasePath = "assets/templates";
    this.tempResumeData = null;
  }
  setTempResumeData(data) {
    this.tempResumeData = data;
  }
  getAndClearTempResumeData() {
    const data = this.tempResumeData;
    this.tempResumeData = null;
    return data;
  }
  getTemplates() {
    return this.http.get(`${this.templatesBasePath}/manifest.json`);
  }
  loadTemplate(templatePath) {
    return this.http.get(templatePath, { responseType: "text" });
  }
  loadResumeData() {
    return this.http.get("assets/resume-data.json");
  }
  /**
   * Sends user input and resume data to backend API for AI-powered enhancement
   * @param chatId - The ID of the chat session
   * @param message - The user's enhancement request
   * @param resumeData - The current resume data
   * @param resumeHtml - The current resume HTML (optional)
   * @param templateId - The ID of the current template (optional)
   * @returns Observable with enhanced resume data
   */
  enhanceResume(chatId, message, resumeData, resumeHtml, templateId) {
    const formattedData = {
      name: resumeData.name || "",
      role: resumeData.role || "",
      phoneNo: resumeData["phoneno"] || resumeData.phoneNo || "",
      email: resumeData.email || "",
      location: resumeData.location || "",
      linkedIn: resumeData["linkedin"] || resumeData.linkedIn || "",
      gitHub: resumeData["github"] || resumeData.gitHub || "",
      summary: resumeData.summary || "",
      experience: resumeData["experiance"] || resumeData.experience || [],
      // Handle typo
      skills: resumeData.skills || [],
      education: resumeData["eduction"] || resumeData.education || []
      // Handle typo
    };
    const payload = {
      chatId,
      templateId,
      // Include templateId
      message,
      resumeHtml,
      resumeData: formattedData
    };
    return this.httpService.post("resume/chat/enhance", payload);
  }
  /**
   * Get chat session details including resume data
   * @param chatId - The ID of the chat session
   * @returns Observable with chat session details
   */
  getChatSession(chatId) {
    return this.httpService.get(`resume/chat/${chatId}`);
  }
  /**
   * Create a new chat session for a specific template
   * @param templateId - The ID of the template
   * @returns Observable with chat session details
   */
  createChatSession(templateId) {
    return this.httpService.post("resume/chat/create", { templateId });
  }
  /**
   * Get enhancement history for a specific chat session
   * @param chatId - The ID of the chat session
   * @param page - Page number (default 1)
   * @param pageSize - Page size (default 20)
   * @param templateId - Optional template ID
   * @returns Observable with history data
   */
  getChatHistory(chatId, page = 1, pageSize = 20, sortOrder = "desc", search = "") {
    let url = `resume/chat/${chatId}/history?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.httpService.get(url);
  }
  /**
   * Get specific history detail
   * @param historyId - The ID of the history item
   * @returns Observable with history details
   */
  getHistoryDetail(historyId) {
    return this.httpService.get(`resume/chat/history/${historyId}`);
  }
  /**
   * Get templates from backend API with pagination and search
   * @param page - Page number (default 1)
   * @param pageSize - Page size (default 10)
   * @param sortOrder - Sort order (default 'asc')
   * @param search - Search query (optional)
   * @returns Observable with template list
   */
  getBackendTemplates(page = 1, pageSize = 10, sortOrder = "asc", search = "") {
    let url = `template/list?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.httpService.get(url);
  }
  /**
   * Get template HTML by template ID
   * @param templateId - The ID of the template
   * @returns Observable with template HTML
   */
  getTemplateById(templateId) {
    return this.httpService.get(`template/${templateId}`);
  }
  /**
   * Save the current resume state
   * @param resumeData - The resume data to save
   * @param templateId - The template ID
   * @param chatId - The chat ID
   * @returns Observable with the save response
   */
  saveResume(resumeData, templateId, chatId) {
    const formattedData = __spreadValues({
      name: resumeData.name || "",
      role: resumeData.role || "",
      phoneNo: resumeData["phoneno"] || resumeData.phoneNo || "",
      email: resumeData.email || "",
      location: resumeData.location || "",
      linkedIn: resumeData["linkedin"] || resumeData.linkedIn || "",
      gitHub: resumeData["github"] || resumeData.gitHub || "",
      summary: resumeData.summary || "",
      experience: resumeData["experiance"] || resumeData.experience || [],
      skills: resumeData.skills || [],
      education: resumeData["eduction"] || resumeData.education || []
    }, resumeData);
    return this.httpService.put(`resume/save?chatId=${chatId}&templateId=${templateId}`, resumeData);
  }
  static {
    this.\u0275fac = function TemplateService_Factory(t) {
      return new (t || _TemplateService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(HttpService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TemplateService, factory: _TemplateService.\u0275fac, providedIn: "root" });
  }
};

export {
  ChatSidebarComponent,
  TemplateService
};
//# sourceMappingURL=chunk-O34PC74M.js.map
