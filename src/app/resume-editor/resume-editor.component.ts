import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Editor, Extension, Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { saveAs } from 'file-saver';
import { TemplateService, ResumeTemplate, EnhanceResumeResponse } from './template.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { environment } from '../../environments/environment';
import { ChatSidebarComponent } from '../components/chat-sidebar/chat-sidebar.component';
import { TemplateDropdownComponent } from '../components/template-dropdown/template-dropdown.component';
// HistorySidebarComponent removed in favor of embedded implementation

// 1. Extension to preserve data attributes
const DataAttributeExtension = Extension.create({
  name: 'dataAttributes',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading', 'textStyle', 'bulletList', 'orderedList', 'listItem', 'table', 'tableRow', 'tableCell'],
        attributes: {
          'data-field': {
            default: null,
            parseHTML: element => element.getAttribute('data-field'),
            renderHTML: attributes => {
              if (!attributes['data-field']) return {};
              return { 'data-field': attributes['data-field'] };
            }
          },
          'data-repeat': {
            default: null,
            parseHTML: element => element.getAttribute('data-repeat'),
            renderHTML: attributes => {
              if (!attributes['data-repeat']) return {};
              return { 'data-repeat': attributes['data-repeat'] };
            }
          }
        },
      },
    ];
  },
});

// 2. Critical: Div Node Extension
const DivExtension = Node.create({
  name: 'div',
  group: 'block',
  content: 'block+', // Allow divs to contain other blocks
  
  addAttributes() {
    return {
      'data-repeat': {
        default: null,
        parseHTML: element => element.getAttribute('data-repeat'),
        renderHTML: attributes => {
          if (!attributes['data-repeat']) return {};
          return { 'data-repeat': attributes['data-repeat'] };
        },
      },
      'data-field': {
        default: null,
        parseHTML: element => element.getAttribute('data-field'),
        renderHTML: attributes => {
          if (!attributes['data-field']) return {};
          return { 'data-field': attributes['data-field'] };
        },
      },
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          if (!attributes['class']) return {};
          return { class: attributes['class'] };
        },
      },
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          if (!attributes['style']) return {};
          return { style: attributes['style'] };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0];
  },
});

@Component({
  selector: 'app-resume-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChatSidebarComponent, TemplateDropdownComponent],
  templateUrl: './resume-editor.component.html',
  styleUrl: './resume-editor.component.css'
})
export class ResumeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostListener('document:click')
  @HostListener('document:keydown')
  onUserInteraction() {
    this.clearHighlights();
  }

  // Clear all highlight spans but keep content
  private clearHighlights() {
    const highlights = document.querySelectorAll('.change-highlight');
    if (highlights.length > 0) {
      console.log(`Clearing ${highlights.length} highlights due to interaction.`);
      highlights.forEach(el => {
        // Remove the class to stop highlighting (CSS transition handles fade if defined)
        el.classList.remove('change-highlight');
        
        // Optional: unwrapping logic if we want to remove the span entirely
        // But removing class is safer and sufficient for visual change.
        // If we want to strictly remove the span wrapper:
        // const parent = el.parentNode;
        // if (parent) {
        //   while (el.firstChild) parent.insertBefore(el.firstChild, el);
        //   parent.removeChild(el);
        // }
      });
    }
  }


  editor!: Editor;
  templates: ResumeTemplate[] = [];
  selectedTemplate: string = '';

  // Sidebar state
  sidebarOpen = false;
  historySidebarOpen = false;
  currentChatId: string | null = null;
  isEditorVisible = false;
  currentResumeData: any = null;
  currentTemplateName: string = 'Select Template';
  currentTemplateId: string | undefined;

  // Handle template selection from backend API
  onBackendTemplateSelected(templateId: string, updateUrl: boolean = true): void {
    console.log('📌 Backend Template Selected:', templateId);
    this.currentTemplateId = templateId;
    
    // Refresh history when template changes
    this.refreshHistory();
    
    if (updateUrl) {
      this.updateUrlWithParams(this.currentChatId, templateId);
    }

    this.templateService.getTemplateById(templateId).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          console.log('✅ Loaded template HTML:', response.data.templateName);
          this.currentTemplateName = response.data.templateName;
          
          const htmlContent = response.data.htmlTemplate;
          
          if (this.currentResumeData) {
            // If we have data, bind it to the new template
            // We use a dummy path "backend/template" as we don't need to resolve relative assets 
            // from file system if the backend provides full HTML (assuming assets are absolute or embedded)
            // But if assets are relative, we might need a base URL.
            // For now assuming HTML is self-contained or assets are absolute.
            this.processTemplateAndData(htmlContent, 'backend/template', this.currentResumeData);
          } else {
            // Just load the empty template
            this.editor.commands.setContent(htmlContent);
          }
        } else {
          console.error('❌ Failed to load template:', response.message);
          alert('Failed to load template.');
        }
      },
      error: (error) => {
        console.error('❌ Error loading template:', error);
        alert('Error loading template.');
      }
    });
  }

  // Update URL with chatId and optional templateId
  private updateUrlWithParams(chatId: string | null, templateId: string | null): void {
      const commands: any[] = ['/editor'];
      if (chatId) {
          commands.push(chatId);
      }
      
      const queryParams: any = {};
      if (templateId) {
          queryParams.templateId = templateId;
      }
      
      this.router.navigate(commands, { 
          queryParams: queryParams,
          queryParamsHandling: 'merge', // Merge with existing params
          replaceUrl: true 
      });
  }

  // Load the first available template from the backend
  private loadDefaultBackendTemplate(): void {
      console.log('🔄 Loading default backend template...');
      this.templateService.getBackendTemplates(1, 1, 'asc').subscribe({
          next: (response: any) => {
              // Handle various response structures
              let templates: any[] = [];
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

              if (templates.length > 0) {
                  const firstTemplateId = templates[0].id;
                  console.log('✅ Default template found:', firstTemplateId);
                  this.onBackendTemplateSelected(firstTemplateId, true); // Update URL too
              } else {
                  console.warn('⚠️ No templates available from backend.');
              }
          },
          error: (err) => console.error('Failed to load default template list', err)
      });
  }


  // Sidebar Handlers
  onChatSelected(chatId: string): void {
    console.log('📝 Resume Editor: Chat selected:', chatId);
    this.currentChatId = chatId;
    
    // Update the URL to include the chat ID, preserving query params (like templateId)
    this.router.navigate(['/editor', chatId], { 
      queryParamsHandling: 'merge',
      replaceUrl: true 
    });
    
    // Refresh history for the new chat
    this.refreshHistory();
    
    // Load resume data for this chat
    this.templateService.getChatSession(chatId).subscribe({
      next: (response: any) => {
        if (response.status && response.data) {
          console.log('✅ Loaded chat session data:', response.data);
          
          this.isEditorVisible = true; // Show editor when chat is loaded
          
          // Use currentResume from the response
          let resumeData = response.data.currentResume || response.data.resumeData || response.data;
          
          // Normalize data keys to handle potential discrepancies between API and Template (e.g. typos in legacy templates)
          if (resumeData) {
            this.normalizeResumeData(resumeData);
            this.cdr.detectChanges(); // Force view update to reveal editor container
            
            // Store valid resume data in global variable
            this.currentResumeData = resumeData;
          }
          
          // If we have a selected template, reload it with new data
          if (this.selectedTemplate && this.currentResumeData) {
            this.loadTemplateWithData(this.selectedTemplate, this.currentResumeData);
          } else if (this.currentResumeData) {
            // Try to load default template or first available
            if (this.templates.length > 0) {
              this.selectedTemplate = this.templates[0].path;
              this.loadTemplateWithData(this.selectedTemplate, this.currentResumeData);
            } else {
              // Wait for templates to load if they haven't yet
              this.templateService.getTemplates().subscribe(templates => {
                if (templates.length > 0) {
                  this.selectedTemplate = templates[0].path;
                  this.loadTemplateWithData(this.selectedTemplate, this.currentResumeData);
                }
              });
            }
          }
        } else {
          console.error('❌ Failed to load chat session data:', response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error loading chat session:', error);
      }
    });
  }

  // Handle history item selection
  onHistorySelected(historyId: string): void {
    console.log('📜 History selected:', historyId);
    
    this.templateService.getHistoryDetail(historyId).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          console.log('✅ Loaded history detail:', response.data);
          
          const historyData = response.data;
          
          // 1. Update global resume data variable
          if (historyData.enhancedResume) {
             this.currentResumeData = historyData.enhancedResume;
             this.normalizeResumeData(this.currentResumeData);
          }
          
          // 2. Patch resume HTML to editor
          if (historyData.resumeHtml) {
            console.log('Updating editor with history HTML...');
            this.editor.commands.setContent(historyData.resumeHtml);
            
            // Optionally re-bind events or styles if needed, but setContent handles most
            // If the HTML relies on template-specific CSS being present, we should ensure the correct template is loaded.
            // But since we are saving the full HTML, it should be self-contained or match the current template context.
            // If the history item was generated with a DIFFERENT template, we might have issues if CSS is not inline.
            // Assuming for now it's fine or we use the data to reload the template if needed.
            
            // Actually, if we just set content, we might lose the reactive bindings if we don't re-run the binding logic.
            // The bindDataToTemplate logic generates HTML. Here we have stored HTML.
            // So setting content directly is the correct approach to "restore" that snapshot.
          } else if (this.selectedTemplate && this.currentResumeData) {
            // Fallback: regenerate if no HTML stored (legacy records)
            this.loadTemplateWithData(this.selectedTemplate, this.currentResumeData);
          }
          
          // Close sidebar on mobile or if desired
          if (window.innerWidth < 768) {
            this.historySidebarOpen = false;
          }
          
        } else {
          console.error('❌ Failed to load history detail:', response.message);
          alert(response.message || 'Failed to load history detail');
        }
      },
      error: (error) => {
        console.error('❌ Error loading history detail:', error);
        alert('Failed to load history detail');
      }
    });
  }

  /**
   * Helper to load a template with specific data
   */
  private loadTemplateWithData(templatePath: string, resumeData: any, oldData: any = null): void {
    this.templateService.loadTemplate(templatePath).subscribe({
      next: (htmlContent) => {
        // ... (reuse logic from onTemplateChange, simplified)
        // Ideally refactor onTemplateChange to use this helper, but for now I'll call a shared method or duplicate logic carefully
        // or better yet, extract the binding logic into a method I can reuse.
        // Let's call a new method that contains the heavy lifting from onTemplateChange
        this.processTemplateAndData(htmlContent, templatePath, resumeData, oldData);
      },
      error: (err) => console.error('Error loading template for chat:', err)
    });
  }
  
  /**
   * Process HTML content and data to update editor
   */
  private processTemplateAndData(htmlContent: string, templatePath: string, resumeData: any, oldData: any = null): void {
         console.log('Processing template with data...');
         
         const tempParser = new DOMParser();
         const tempDoc = tempParser.parseFromString(htmlContent, 'text/html');
         
         // Extract and inject link tags
         const linkTags = tempDoc.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]');
         linkTags.forEach(linkTag => {
           const href = linkTag.getAttribute('href');
           if (href && !document.querySelector(`link[href="${href}"]`)) {
             const newLink = document.createElement('link');
             Array.from(linkTag.attributes).forEach(attr => {
               if (attr.name === 'href' && !href.startsWith('http') && !href.startsWith('//')) {
                   // Resolve relative path
                   const templateDir = templatePath.substring(0, templatePath.lastIndexOf('/'));
                   newLink.setAttribute('href', `${templateDir}/${href}`);
               } else {
                   newLink.setAttribute(attr.name, attr.value);
               }
             });
             document.head.appendChild(newLink);
           }
         });
         
         // Extract CSS
         const styleTags = tempDoc.querySelectorAll('style');
         let combinedCss = '';
         styleTags.forEach(styleTag => {
           combinedCss += styleTag.textContent || '';
         });
         
         // Inject CSS
         if (combinedCss) {
           let scopedCss = combinedCss
             .replace(/body\s*{/g, '.editor {')
             .replace(/html\s*{/g, '.editor {');
           scopedCss = scopedCss.replace(/@page\s*[^}]*}/g, '');
           scopedCss += `
             .editor p:not([class]),
             .editor div:not([class]),
             .editor span:not([class]),
             .editor li:not([class]) {
               font-family: inherit;
             }
           `;
           this.injectTemplateStyles(scopedCss);
         }
         
         // Bind data (pass oldData for diffing)
         const boundHtml = this.bindDataToTemplate(htmlContent, resumeData, oldData);
         
         // Fix image paths
         const parser = new DOMParser();
         const doc = parser.parseFromString(boundHtml, 'text/html');
         const templateDir = templatePath.substring(0, templatePath.lastIndexOf('/'));
         
         const images = doc.querySelectorAll('img');
         images.forEach((img) => {
           const src = img.getAttribute('src');
           if (src && !src.startsWith('http') && !src.startsWith('data:')) {
             img.setAttribute('src', `${templateDir}/${src}`);
           }
         });
         
         // Apply body attributes
         const body = doc.body;
         const editorElement = document.querySelector('.editor') as HTMLElement;
         if (editorElement) {
           editorElement.style.backgroundColor = '';
           editorElement.style.color = '';
           if (body.hasAttribute('bgcolor')) {
             editorElement.style.backgroundColor = body.getAttribute('bgcolor') || '';
           }
           if (body.hasAttribute('text')) {
             editorElement.style.color = body.getAttribute('text') || '';
           }
         }
         
         // Set content
         this.editor.commands.setContent(doc.body.innerHTML);
  }

  onSidebarToggled(isOpen: boolean): void {
    this.sidebarOpen = isOpen;
  }
  
  toggleHistorySidebar(): void {
    this.historySidebarOpen = !this.historySidebarOpen;
    console.log('History sidebar toggled:', this.historySidebarOpen);
    if (this.historySidebarOpen && this.historyItems.length === 0 && !this.isHistoryLoading && this.currentChatId) {
        this.loadHistory();
    }
  }

  // --- History Logic Embedded ---
  historyItems: any[] = [];
  isHistoryLoading: boolean = false;
  historyPage: number = 1;
  historyPageSize: number = 20;
  historyHasMore: boolean = true;
  historyError: string = '';
  historySortOrder: 'asc' | 'desc' = 'desc';
  historySearchQuery: string = '';

  resetHistory() {
      this.historyItems = [];
      this.historyPage = 1;
      this.historyHasMore = true;
      this.historyError = '';
      // We don't reset sortOrder or query here to persist user preference during chat switch? 
      // User request implies per-chat history, but usually filters reset. 
      // For now, let's keep filters but reset data.
  }

  toggleHistorySort() {
    this.historySortOrder = this.historySortOrder === 'desc' ? 'asc' : 'desc';
    this.historyPage = 1;
    this.historyHasMore = true;
    this.historyItems = [];
    this.loadHistory();
  }

  searchHistory() {
    this.historyPage = 1;
    this.historyHasMore = true;
    this.historyItems = [];
    this.loadHistory();
  }

  loadHistory() {
      if (!this.currentChatId || this.isHistoryLoading || !this.historyHasMore) return;
      
      this.isHistoryLoading = true;
      this.templateService.getChatHistory(
        this.currentChatId, 
        this.historyPage, 
        this.historyPageSize,
        this.historySortOrder,
        this.historySearchQuery,
        this.currentTemplateId
      ).subscribe({
          next: (response) => {
              if (response.status && response.data) {
                  const newItems = response.data;
                  if (newItems.length < this.historyPageSize) {
                      this.historyHasMore = false;
                  }
                  if (this.historyPage === 1) {
                      this.historyItems = newItems;
                  } else {
                      this.historyItems = [...this.historyItems, ...newItems];
                  }
                  this.historyPage++;
              } else {
                  this.historyError = response.message || 'Failed to load history';
              }
              this.isHistoryLoading = false;
          },
          error: (err) => {
              console.error('History load error', err);
              this.historyError = 'Failed to load history';
              this.isHistoryLoading = false;
          }
      });
  }

  onHistoryScroll(event: any) {
      const element = event.target;
      if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
          this.loadHistory();
      }
  }

  truncateHistory(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  copyHistoryToClipboard(text: string, event: Event) {
      event.stopPropagation();
      navigator.clipboard.writeText(text).then(() => {
          const btn = (event.currentTarget as HTMLElement);
          btn.classList.add('copied');
          setTimeout(() => btn.classList.remove('copied'), 2000);
      });
  }
  
  /**
   * Refresh the history list - reset and reload from page 1
   */
  refreshHistory() {
    console.log('🔄 Refreshing history...');
    this.historyPage = 1;
    this.historyHasMore = true;
    this.historyItems = [];
    this.loadHistory();
  }
  
  /**
   * Activate highlighting and set up event listeners to remove it
   */
  private activateHighlighting(): void {
    if (this.isHighlightActive) {
      // Already active, remove old listeners first
      this.removeHighlighting();
    }
    
    this.isHighlightActive = true;
    console.log('🎨 Highlighting activated - will be removed on next keyboard or mouse interaction');
    
    // Create event listeners
    this.keyboardListener = (e: KeyboardEvent) => {
      console.log('⌨️ Keyboard event detected, removing highlights');
      this.removeHighlighting();
    };
    
    this.mouseListener = (e: MouseEvent) => {
      console.log('🖱️ Mouse click detected, removing highlights');
      this.removeHighlighting();
    };
    
    // Add listeners to document
    document.addEventListener('keydown', this.keyboardListener);
    document.addEventListener('click', this.mouseListener);
  }
  
  /**
   * Remove all highlighting and clean up event listeners
   */
  private removeHighlighting(): void {
    if (!this.isHighlightActive) return;
    
    console.log('🧹 Removing all highlights');
    this.isHighlightActive = false;
    
    // Remove event listeners
    if (this.keyboardListener) {
      document.removeEventListener('keydown', this.keyboardListener);
      this.keyboardListener = null;
    }
    
    if (this.mouseListener) {
      document.removeEventListener('click', this.mouseListener);
      this.mouseListener = null;
    }
    
    // Remove all highlight spans from the editor
    const editorElement = document.querySelector('.editor');
    if (editorElement) {
      const highlights = editorElement.querySelectorAll('.change-highlight');
      highlights.forEach(highlight => {
        // Replace the highlight span with its text content
        const parent = highlight.parentNode;
        if (parent) {
          const textNode = document.createTextNode(highlight.textContent || '');
          parent.replaceChild(textNode, highlight);
          
          // Normalize the parent to merge adjacent text nodes
          parent.normalize();
        }
      });
      
      // Update the editor content to reflect the changes
      const currentHtml = this.getHTML();
      this.editor.commands.setContent(currentHtml);
    }
  }
  
  /**
   * Toggle between HTML mode and JSON mode for enhancements
   */
  toggleEnhancementMode(): void {
    this.useHtmlMode = !this.useHtmlMode;
    console.log(`🔄 Enhancement mode switched to: ${this.useHtmlMode ? 'HTML Mode' : 'JSON Mode (Preserve Styling)'}`);
  }
  // ----------------------------- 

  
  private templateStyleElement: HTMLStyleElement | null = null;
  
  // Highlighting state
  private isHighlightActive: boolean = false;
  private keyboardListener: ((e: KeyboardEvent) => void) | null = null;
  private mouseListener: ((e: MouseEvent) => void) | null = null;
  
  // Chat properties
  chatInput: string = '';
  isSending: boolean = false;
  
  // Enhancement mode toggle
  useHtmlMode: boolean = false; // false = JSON mode (preserve styling), true = HTML mode (use enhancedHtml)

  // Table Grid Properties
  isTableGridOpen: boolean = false;
  tableGridHover = { rows: 0, cols: 0 };
  maxTableGridSize = 10;

  constructor(
    private templateService: TemplateService, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.templateService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
    
    // Debug code removed
  }

  ngOnInit(): void {
    // Check if there's a chatId in the URL
    this.route.params.subscribe(params => {
      const chatId = params['chatId'];
      if (chatId && chatId !== this.currentChatId) {
        console.log('📍 Chat ID from URL:', chatId);
        // Load this chat automatically
        this.onChatSelected(chatId);
      }
    });

    // Check query params for templateId
    this.route.queryParams.subscribe(queryParams => {
      const templateId = queryParams['templateId'];
      if (templateId) {
          console.log('📍 Template ID from URL query param:', templateId);
          // Load this template (false = don't update URL to avoid loops)
          this.onBackendTemplateSelected(templateId, false);
      } else {
          // No template ID in URL? Load the default one.
          // We only do this if we haven't loaded a template yet (or on first load)
          // To avoid overriding if the user is just navigating chats.
          // But "if available load the template if not load the very first one" implies enforcement.
          
          // Let's load default ONLY if we are initializing and no template is selected yet.
          // But since this is an Observable, it fires on init.
          this.loadDefaultBackendTemplate();
      }
    });
  }


  ngAfterViewInit(): void {
    this.editor = new Editor({
      element: document.querySelector('.editor') as HTMLElement,
      extensions: [
        DataAttributeExtension, 
        DivExtension, // Add the custom div extension
        StarterKit.configure({
          horizontalRule: false,
          heading: {
            levels: [1, 2, 3, 4, 5, 6]
          },
          paragraph: {
            HTMLAttributes: {
              class: null
            }
          }
        }),
        HorizontalRule.extend({
          addAttributes() {
            return {
              class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                  if (!attributes['class']) return {};
                  return { class: attributes['class'] };
                }
              },
              style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => {
                  if (!attributes['style']) return {};
                  return { style: attributes['style'] };
                }
              }
            }
          }
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          alignments: ['left', 'center', 'right', 'justify']
        }),
        Underline,
        Underline,
        TextStyle.extend({
          addAttributes() {
            return {
              ...this.parent?.(),
              fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize,
                renderHTML: attributes => {
                  if (!attributes['fontSize']) {
                    return {}
                  }
                  return {
                    style: `font-size: ${attributes['fontSize']}`,
                  }
                },
              },
            }
          },
        }),
        Color,
        FontFamily.configure({
          types: ['textStyle'],
        }),
        Highlight.configure({
          multicolor: true
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'editor-link'
          }
        }),
        Image.configure({
          inline: true,
          allowBase64: true,
          HTMLAttributes: {
            class: null,
            style: null
          }
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: null,
            style: null,
            border: null,
            cellspacing: null,
            cellpadding: null,
            width: null
          }
        }),
        TableRow.configure({
          HTMLAttributes: {
            style: null,
            class: null
          }
        }),
        TableHeader.configure({
          HTMLAttributes: {
            style: null,
            class: null,
            width: null,
            valign: null
          }
        }),
        TableCell.configure({
          HTMLAttributes: {
            style: null,
            class: null,
            width: null,
            valign: null,
            rowspan: null,
            colspan: null
          }
        })
      ],
      content: '<p>Start typing your resume here...</p>',
      editorProps: {
        attributes: {
          class: 'focus:outline-none h-full'
        }
      },
      // More permissive parsing to preserve HTML structure
      parseOptions: {
        preserveWhitespace: 'full'
      }
    });
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
    // Clean up injected template styles
    this.removeTemplateStyles();
    
    // Clean up highlighting event listeners
    this.removeHighlighting();
  }

  // Remove previously injected template styles
  private removeTemplateStyles(): void {
    if (this.templateStyleElement && this.templateStyleElement.parentNode) {
      this.templateStyleElement.parentNode.removeChild(this.templateStyleElement);
      this.templateStyleElement = null;
    }
  }

  // Inject template styles into the document
  private injectTemplateStyles(cssContent: string): void {
    // Remove previous template styles
    this.removeTemplateStyles();

    // Create a new style element
    this.templateStyleElement = document.createElement('style');
    this.templateStyleElement.setAttribute('data-template-styles', 'true');
    
    // Clean up CSS comments first
    let cleanCss = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Scope the styles to the editor to avoid affecting other parts of the app
    // This regex handles multi-line selectors and preserves @-rules
    const scopedCss = cleanCss.replace(/([^{}]+)\{/g, (match, selector) => {
      const trimmedSelector = selector.trim();
      
      // Skip @-rules (font-face, page, media, keyframes, etc.)
      if (trimmedSelector.startsWith('@')) {
        return match;
      }
      
      // Skip empty selectors
      if (!trimmedSelector) {
        return match;
      }
      
      // Split by comma for multiple selectors
      const selectors = trimmedSelector.split(',').map((s: string) => {
        const cleaned = s.trim();
        
        // If selector already starts with .editor, don't add it again
        if (cleaned.startsWith('.editor')) {
          return cleaned;
        }
        
        // Add .editor scope to each selector
        return `.editor ${cleaned}`;
      }).join(',\n');
      
      // Update browser URL without reloading
      // This code snippet seems to be misplaced here.
      // It's likely intended for a different part of the component,
      // possibly related to chat history or navigation, not CSS scoping.
      // Inserting it here would cause a syntax error and logical issues.
      // As per instructions to make the file syntactically correct,
      // and given the context of the surrounding code (CSS scoping logic),
      // this snippet cannot be inserted at this exact location.
      // If this is intended to be part of a different method, please provide
      // the correct context for insertion.
      // For now, I will not insert this snippet to maintain syntactical correctness.
      
      return `${selectors} {`;
    });

    this.templateStyleElement.textContent = scopedCss;
    document.head.appendChild(this.templateStyleElement);
  }

  // Formatting methods
  toggleBold(): void {
    this.editor.chain().focus().toggleBold().run();
  }

  toggleItalic(): void {
    this.editor.chain().focus().toggleItalic().run();
  }

  toggleUnderline(): void {
    this.editor.chain().focus().toggleUnderline().run();
  }

  toggleStrike(): void {
    this.editor.chain().focus().toggleStrike().run();
  }

  setHeading(level: 1 | 2 | 3 | 4 | 5 | 6): void {
    this.editor.chain().focus().toggleHeading({ level }).run();
  }

  setParagraph(): void {
    this.editor.chain().focus().setParagraph().run();
  }

  onHeadingChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'paragraph') {
      this.setParagraph();
    } else {
      const level = parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6;
      this.setHeading(level);
    }
  }

  toggleBulletList(): void {
    this.editor.chain().focus().toggleBulletList().run();
  }

  toggleOrderedList(): void {
    this.editor.chain().focus().toggleOrderedList().run();
  }

  setTextAlign(alignment: 'left' | 'center' | 'right' | 'justify'): void {
    this.editor.chain().focus().setTextAlign(alignment).run();
  }

  toggleBlockquote(): void {
    this.editor.chain().focus().toggleBlockquote().run();
  }

  setHorizontalRule(options?: { class?: string, style?: string }): void {
    // Default to 5px solid black if no options provided
    const attrs = options || { style: 'border-top: 0.5px solid black;' };
    this.editor.chain().focus().insertContent({ type: 'horizontalRule', attrs }).run();
  }

  undo(): void {
    this.editor.chain().focus().undo().run();
  }

  redo(): void {
    this.editor.chain().focus().redo().run();
  }

  toggleTableGrid(): void {
    this.isTableGridOpen = !this.isTableGridOpen;
  }

  onTableGridHover(rows: number, cols: number): void {
    this.tableGridHover = { rows, cols };
  }

  insertCustomTable(rows: number, cols: number): void {
    this.editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    this.isTableGridOpen = false;
    this.tableGridHover = { rows: 0, cols: 0 };
  }

  // Legacy method kept for reference or direct usage if needed
  insertTable(): void {
    this.toggleTableGrid();
  }

  addColumnBefore(): void {
    this.editor.chain().focus().addColumnBefore().run();
  }

  addColumnAfter(): void {
    this.editor.chain().focus().addColumnAfter().run();
  }

  deleteColumn(): void {
    this.editor.chain().focus().deleteColumn().run();
  }

  addRowBefore(): void {
    this.editor.chain().focus().addRowBefore().run();
  }

  addRowAfter(): void {
    this.editor.chain().focus().addRowAfter().run();
  }

  deleteRow(): void {
    this.editor.chain().focus().deleteRow().run();
  }

  deleteTable(): void {
    this.editor.chain().focus().deleteTable().run();
  }

  setLink(): void {
    const url = window.prompt('Enter URL:');
    if (url) {
      this.editor.chain().focus().setLink({ href: url }).run();
    }
  }

  unsetLink(): void {
    this.editor.chain().focus().unsetLink().run();
  }

  addImage(): void {
    const url = window.prompt('Enter image URL:');
    if (url) {
      this.editor.chain().focus().setImage({ src: url }).run();
    }
  }

  setColor(color: string): void {
    this.editor.chain().focus().setColor(color).run();
  }

  toggleHighlight(color?: string): void {
    if (color) {
      this.editor.chain().focus().toggleHighlight({ color }).run();
    } else {
      this.editor.chain().focus().toggleHighlight().run();
    }
  }

  // Font formatting methods
  setFontFamily(font: string): void {
    this.editor.chain().focus().setFontFamily(font).run();
  }

  setFontSize(size: string): void {
    this.editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
  }

  // Check active states
  isActive(name: string, attrs?: any): boolean {
    return this.editor?.isActive(name, attrs) || false;
  }

  canUndo(): boolean {
    return this.editor?.can().undo() || false;
  }

  canRedo(): boolean {
    return this.editor?.can().redo() || false;
  }

  // Get content
  getHTML(): string {
    return this.editor.getHTML();
  }

  getJSON(): any {
    return this.editor.getJSON();
  }

  // Set content
  setContent(content: string): void {
    this.editor.commands.setContent(content);
  }

  private linkify(text: string): string {
    if (!text) return '';
    
    // URL regex pattern
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
    // First escape HTML to prevent XSS (basic)
    let replacedText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
      
    // Replace URLs with anchor tags
    return replacedText.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
  }

  // Bind JSON data to template
  private bindDataToTemplate(htmlContent: string, data: any, oldData: any = null): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Helper function to replace placeholders
    const replacePlaceholders = (element: Element, dataObj: any, oldDataObj: any) => {
      // Handle data-field attributes (single values)
      const fieldsWithData = element.querySelectorAll('[data-field]');
      fieldsWithData.forEach(el => {
        const field = el.getAttribute('data-field');
        if (field && dataObj[field] !== undefined) {
          // Use innerHTML and linkify to support links
          let content = this.linkify(String(dataObj[field]));
          
          // Highlight changes if oldData indicates a difference
          if (oldDataObj && dataObj[field] !== oldDataObj[field]) {
             console.log(`Highlighting change for field: ${field}. New: ${dataObj[field]}, Old: ${oldDataObj[field]}`);
             content = `<span class="change-highlight">${content}</span>`;
          }
          
          el.innerHTML = content;
        }
      });
      
      // Handle data-repeat attributes (arrays)
      const repeatElements = element.querySelectorAll('[data-repeat]');
      repeatElements.forEach(repeatEl => {
        const arrayName = repeatEl.getAttribute('data-repeat');
        if (arrayName && Array.isArray(dataObj[arrayName])) {
          const template = repeatEl.innerHTML;
          const parent = repeatEl.parentElement;
          
          if (parent) {
            // Clear the repeat container
            repeatEl.innerHTML = '';
            
            // For each item in the array, clone the template and bind data
            dataObj[arrayName].forEach((item: any, index: number) => {
              const tempTemplate = document.createElement('template');
              tempTemplate.innerHTML = template;
              const fragment = tempTemplate.content;
              
              // Get corresponding old item for comparison (by index)
              const oldItem = (oldDataObj && Array.isArray(oldDataObj[arrayName])) ? oldDataObj[arrayName][index] : null;
              
              // Replace placeholders in this instance
              const fields = fragment.querySelectorAll('[data-field]');
              fields.forEach(field => {
                const fieldName = field.getAttribute('data-field');
                if (fieldName) {
                  // Handle nested field names (e.g., "skill" for skills array)
                  let val;
                  let oldVal;
                  
                  if (typeof item === 'string') {
                    val = item;
                    oldVal = oldItem; // Assuming oldItem is also string
                  } else if (item[fieldName] !== undefined) {
                    val = item[fieldName];
                    oldVal = oldItem ? oldItem[fieldName] : undefined;
                  }
                  
                  if (val !== undefined) {
                    let content = this.linkify(String(val));
                    
                    // Highlight if changed (value mismatch or new item)
                    if (oldDataObj && val !== oldVal) {
                       console.log(`Highlighting change for nested field: ${fieldName}. New: ${val}, Old: ${oldVal}`);
                       content = `<span class="change-highlight">${content}</span>`;
                    }
                    
                    field.innerHTML = content;
                  }
                }
              });
              
              // Also replace {{placeholder}} syntax using TreeWalker (safer for fragments)
              const walker = document.createTreeWalker(
                fragment,
                NodeFilter.SHOW_TEXT,
                null
              );
              
              const textNodes: Text[] = [];
              let node;
              while (node = walker.nextNode()) {
                textNodes.push(node as Text);
              }
              
              textNodes.forEach(textNode => {
                let text = textNode.textContent || '';
                Object.keys(item).forEach(key => {
                  const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                  if (typeof item[key] === 'string' || typeof item[key] === 'number') {
                    text = text.replace(regex, String(item[key]));
                  }
                });
                textNode.textContent = text;
              });
              
              repeatEl.appendChild(fragment);
            });
          }
        }
      });
      
      // Replace {{placeholder}} syntax in text content
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null
      );
      
      const textNodes: Text[] = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node as Text);
      }
      
      textNodes.forEach(textNode => {
        let text = textNode.textContent || '';
        Object.keys(dataObj).forEach(key => {
          const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
          if (typeof dataObj[key] === 'string' || typeof dataObj[key] === 'number') {
            text = text.replace(regex, String(dataObj[key]));
          }
        });
        textNode.textContent = text;
      });
    };
    
    // Start replacement from body
    replacePlaceholders(doc.body, data, oldData);
    
    return doc.body.innerHTML;
  }

  // Load template
  onTemplateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const templatePath = selectElement.value;
    
    if (!templatePath) {
      return;
    }

    this.selectedTemplate = templatePath;
    
    console.log('Loading template from:', templatePath);
    
    // Load template
    this.templateService.loadTemplate(templatePath).subscribe({
      next: (htmlContent) => {
        // Use global resume data if available
        if (this.currentResumeData) {
          console.log('Using cached resume data for template change');
          this.processTemplateAndData(htmlContent, templatePath, this.currentResumeData);
        } else {
          // Load default resume data
          this.templateService.loadResumeData().subscribe({
            next: (resumeData) => {
               this.processTemplateAndData(htmlContent, templatePath, resumeData);
            },
            error: (error) => {
               console.error('Error loading resume data:', error);
               // Fallback: load template without data (empty object)
               this.processTemplateAndData(htmlContent, templatePath, {});
            }
          });
        }
      },
      error: (error) => {
        console.error('Error loading template:', error);
        alert('Failed to load template. Please try again.');
      }
    });
  }
  


  // Download as DOCX
  async downloadDocx(): Promise<void> {
    try {
      // Get the actual rendered editor content
      const editorElement = document.querySelector('.editor .ProseMirror') as HTMLElement;
      if (!editorElement) {
        alert('No content to download');
        return;
      }

      // Clone the editor content
      const clonedContent = editorElement.cloneNode(true) as HTMLElement;
      
      // Function to recursively apply computed styles as inline styles
      const applyComputedStyles = (sourceElement: HTMLElement, targetElement: HTMLElement) => {
        // Get computed styles from the source
        const computedStyle = window.getComputedStyle(sourceElement);
        
        // List of important CSS properties to preserve
        const importantProps = [
          'color', 'background-color', 'background-image', 'background',
          'font-family', 'font-size', 'font-weight', 'font-style',
          'text-align', 'text-decoration', 'text-transform',
          'line-height', 'letter-spacing', 'word-spacing',
          'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
          'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
          'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
          'border-color', 'border-width', 'border-style',
          'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
          'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
          'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
          'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
          'display', 'vertical-align',
          'list-style-type', 'list-style-position'
        ];
        
        let inlineStyle = '';
        
        importantProps.forEach(prop => {
          const value = computedStyle.getPropertyValue(prop);
          if (value && value !== 'none' && value !== 'normal' && value !== '0px' && value !== 'auto') {
            // Skip default values
            if (prop === 'color' && value === 'rgb(0, 0, 0)') return;
            if (prop === 'background-color' && (value === 'rgba(0, 0, 0, 0)' || value === 'transparent')) return;
            
            // Convert gradients to solid colors (Word doesn't support gradients well)
            if (prop === 'background-image' && value.includes('gradient')) {
              // Extract first color from gradient
              const colorMatch = value.match(/rgba?\([^)]+\)|#[0-9a-fA-F]{3,6}/);
              if (colorMatch) {
                inlineStyle += `background-color: ${colorMatch[0]}; `;
              }
              return; // Skip the gradient itself
            }
            
            // Simplify display values for Word compatibility
            if (prop === 'display') {
              if (value === 'flex' || value === 'grid' || value === 'inline-flex') {
                inlineStyle += 'display: block; '; // Word doesn't support flex/grid
                return;
              }
            }
            
            inlineStyle += `${prop}: ${value}; `;
          }
        });
        
        // Handle box-shadow by converting to border (Word doesn't support box-shadow)
        const boxShadow = computedStyle.getPropertyValue('box-shadow');
        if (boxShadow && boxShadow !== 'none') {
          // If there's a box shadow but no border, add a subtle border
          const hasBorder = computedStyle.getPropertyValue('border-width') !== '0px';
          if (!hasBorder) {
            inlineStyle += 'border: 1px solid #e0e0e0; ';
          }
        }
        
        // Handle border-radius by ensuring borders are visible (Word has limited border-radius support)
        const borderRadius = computedStyle.getPropertyValue('border-radius');
        if (borderRadius && borderRadius !== '0px') {
          // Ensure there's a border if border-radius is set
          const borderWidth = computedStyle.getPropertyValue('border-width');
          const borderStyle = computedStyle.getPropertyValue('border-style');
          const borderColor = computedStyle.getPropertyValue('border-color');
          
          if (borderWidth === '0px' || borderStyle === 'none') {
            // Add a default border if none exists
            inlineStyle += 'border: 1px solid #d0d0d0; ';
          }
        }
        
        if (inlineStyle) {
          targetElement.setAttribute('style', inlineStyle);
        }
        
        // Recursively process children
        const sourceChildren = Array.from(sourceElement.children) as HTMLElement[];
        const targetChildren = Array.from(targetElement.children) as HTMLElement[];
        
        for (let i = 0; i < sourceChildren.length && i < targetChildren.length; i++) {
          applyComputedStyles(sourceChildren[i], targetChildren[i]);
        }
      };
      
      // Apply all computed styles to the cloned content
      applyComputedStyles(editorElement, clonedContent);
      
      // Post-process the cloned content for better Word compatibility
      const cleanForWord = (element: HTMLElement) => {
        // Remove background images (Word doesn't handle them well)
        const bgImage = element.style.backgroundImage;
        if (bgImage && bgImage !== 'none') {
          element.style.backgroundImage = 'none';
          // If there was a background image, add a border to maintain visual structure
          if (!element.style.border || element.style.border === 'none') {
            element.style.border = '2px solid #e0e0e0';
          }
        }
        
        // Convert flex/grid containers to simple blocks
        if (element.style.display === 'flex' || element.style.display === 'grid') {
          element.style.display = 'block';
        }
        
        // Remove absolute/fixed positioning
        if (element.style.position === 'absolute' || element.style.position === 'fixed') {
          element.style.position = 'relative';
        }
        
        // Recursively clean children
        Array.from(element.children).forEach(child => {
          if (child instanceof HTMLElement) {
            cleanForWord(child);
          }
        });
      };
      
      cleanForWord(clonedContent);
      
      // Get the template CSS for reference (though we're using inline styles now)
      let templateCss = '';
      const templateStyleElement = document.querySelector('style[data-template-styles="true"]');
      if (templateStyleElement) {
        templateCss = templateStyleElement.textContent || '';
        // Remove the .editor scoping
        templateCss = templateCss.replace(/\.editor\s+/g, '');
      }
      
      // Create the DOCX HTML structure
      const docxContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
          <head>
            <meta charset='utf-8'>
            <meta name="ProgId" content="Word.Document">
            <meta name="Generator" content="Microsoft Word 15">
            <meta name="Originator" content="Microsoft Word 15">
            <title>Resume</title>
            <!--[if gte mso 9]>
            <xml>
              <w:WordDocument>
                <w:View>Print</w:View>
                <w:Zoom>100</w:Zoom>
                <w:DoNotOptimizeForBrowser/>
              </w:WordDocument>
            </xml>
            <![endif]-->
            <style>
              /* Base styles for Word compatibility */
              @page {
                size: 8.5in 11in;
                margin: 1in;
              }
              
              body {
                font-family: 'Calibri', 'Arial', sans-serif;
                font-size: 11pt;
                line-height: 1.6;
                color: #000000;
              }
              
              /* Preserve table layouts */
              table {
                border-collapse: collapse;
                width: 100%;
              }
              
              td, th {
                vertical-align: top;
              }
              
              /* Additional template CSS as fallback */
              ${templateCss}
            </style>
          </head>
          <body>
            ${clonedContent.innerHTML}
          </body>
        </html>
      `;

      // Create blob with proper DOCX MIME type
      const blob = new Blob(['\ufeff', docxContent], {
        type: 'application/msword'
      });

      // Save the file
      const fileName = `resume_${new Date().toISOString().split('T')[0]}.doc`;
      saveAs(blob, fileName);
      
      console.log('DOCX file generated successfully');
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Failed to generate document file. Please try again.');
    }
  }

  // Download as PDF
  async downloadPdf(): Promise<void> {
    try {
      // Ensure html2canvas is available globally for jsPDF
      if (typeof window !== 'undefined') {
        (window as any).html2canvas = html2canvas;
      }

      const htmlContent = this.getHTML();
      
      // Get the injected template CSS
      let templateCss = '';
      const templateStyleElement = document.querySelector('style[data-template-styles="true"]');
      if (templateStyleElement) {
        templateCss = templateStyleElement.textContent || '';
        // Remove the .editor scoping for the PDF
        templateCss = templateCss.replace(/\.editor\s+/g, '');
      }
      
      // Parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.id = 'pdf-temp-container';
      
      
      // Set dimensions to A4 at 96 DPI (standard screen resolution)
      // A4 width = 794px
      const a4WidthPx = 794;
      const pagePadding = 40; // 40px padding on each side
      
      // We set the container to exactly A4 width
      tempContainer.style.width = `${a4WidthPx}px`; 
      // Allow height to grow as needed, we'll paginate or cut it
      tempContainer.style.minHeight = '1123px';
      
      // Add padding to create margins
      tempContainer.style.padding = `${pagePadding}px`; 
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.boxSizing = 'border-box';
      
      // Ensure base font settings match browser defaults
      tempContainer.style.fontFamily = 'Arial, Helvetica, sans-serif';
      tempContainer.style.fontSize = '16px'; 
      tempContainer.style.lineHeight = '1.5';
      tempContainer.style.color = '#000000';
      
      // Position off-screen
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '0';
      tempContainer.style.left = '0';
      tempContainer.style.zIndex = '-1000';
      
      // Add a style element to the container
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        ${templateCss}
        #pdf-temp-container {
          box-sizing: border-box;
        }
        #pdf-temp-container * {
          box-sizing: border-box;
        }
        
        /* Force the resume container to fit exactly in our PDF container */
        .resume-container, .container, .main-container {
          width: 100% !important;
          max-width: 100% !important;
          box-shadow: none !important; /* Remove shadows for cleaner print */
        }
        
        /* Ensure tables render correctly */
        table {
          width: 100%;
          border-collapse: collapse;
        }
      `;
      tempContainer.appendChild(styleElement);
      
      // Add the content
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = doc.body.innerHTML;
      tempContainer.appendChild(contentDiv);
      
      // Append to body
      document.body.appendChild(tempContainer);
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get the actual height of the content
      const contentHeight = tempContainer.scrollHeight;
      const a4HeightPx = 1123;
      
      // Create PDF with jsPDF using PIXEL units
      // We set the format height to the content height to avoid ugly cutoffs if it's a single page
      // OR we stick to A4. Let's stick to A4 multiple pages logic if possible, 
      // but autoPaging of jsPDF works better if we give it the whole container.
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px', 
        format: [a4WidthPx, a4HeightPx], // Standard A4
        compress: true,
        hotfixes: ['px_scaling']
      });
      
      await pdf.html(tempContainer, {
        callback: function(doc) {
          doc.save(`resume_${new Date().toISOString().split('T')[0]}.pdf`);
          
          if (document.body.contains(tempContainer)) {
            document.body.removeChild(tempContainer);
          }
          console.log('PDF file generated successfully');
        },
        x: 0,
        y: 0,
        width: a4WidthPx, 
        windowWidth: a4WidthPx,
        margin: [0, 0, 0, 0], // No extra margins since we're using padding on the container
        autoPaging: 'text',
        html2canvas: {
          scale: 1,
          useCORS: true,
          logging: false,
          letterRendering: true,
          backgroundColor: '#ffffff'
        }
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF file. Please try again.');
      
      const tempContainer = document.getElementById('pdf-temp-container');
      if (tempContainer && document.body.contains(tempContainer)) {
         document.body.removeChild(tempContainer);
      }
    }
  }



  // Helper method to estimate element height for page break calculations
  private estimateElementHeight(element: HTMLElement): number {
    const tagName = element.tagName.toLowerCase();
    
    // Rough estimates based on common element types
    if (tagName === 'h1') return 40;
    if (tagName === 'h2') return 35;
    if (tagName === 'h3') return 30;
    if (tagName === 'h4' || tagName === 'h5' || tagName === 'h6') return 25;
    if (tagName === 'p') {
      const text = element.textContent || '';
      const lines = Math.ceil(text.length / 80); // Rough estimate: 80 chars per line
      return lines * 20;
    }
    if (tagName === 'ul' || tagName === 'ol') {
      const items = element.querySelectorAll('li').length;
      return items * 20;
    }
    if (tagName === 'table') return 100; // Tables vary widely
    if (tagName === 'div') {
      // For divs, sum up children or use a default
      const children = Array.from(element.children) as HTMLElement[];
      if (children.length > 0) {
        return children.reduce((sum, child) => sum + this.estimateElementHeight(child), 0);
      }
      return 20;
    }
    
    return 20; // Default height
  }
  
  // Handle keyboard events for chat input (ChatGPT-like behavior)
  handleChatKeydown(event: KeyboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    
    // If Enter is pressed without Shift, send the message
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default new line
      this.sendMessage();
      // Reset textarea height after sending
      setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }, 0);
    } else {
      // Auto-resize textarea as user types
      setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
      }, 0);
    }
    // If Shift+Enter is pressed, allow default behavior (new line)
    // No need to handle this explicitly, browser will add new line
  }
  
  // Chat functionality
  async sendMessage(): Promise<void> {
    if (!this.chatInput.trim()) return;
    
    this.isSending = true;
    
    try {
      // Get current HTML content from the editor
      const resumeHtml = this.getHTML();
      
      // Extract structured data from the HTML
      const extractedData = this.extractDataFromHTML(resumeHtml);
      
      console.log('User Message:', this.chatInput);
      console.log('Resume HTML:', resumeHtml);
      console.log('Extracted Data from Resume:', extractedData);
      
      // Send to backend API for enhancement
      const chatId = this.currentChatId || '';
      if (!chatId) {
          console.error('No chat ID selected');
          this.isSending = false;
          return;
      }

      this.templateService.enhanceResume(chatId, this.chatInput, extractedData, resumeHtml, this.currentTemplateId).subscribe({
        next: (response) => {
          console.log('Enhancement Response:', response);
          
          if (response.status && response.data && response.data.currentResume) {
            // Update the global resume data
            this.currentResumeData = response.data.currentResume;
            
            // Update the resume with enhanced data (patches content, preserves styling)
            // Pass the full response data so we can access enhancedHtml if needed
            this.updateResumeWithEnhancedData(response.data);
            
            // Clear the chat input
            this.chatInput = '';
            
            // Reset textarea height
            setTimeout(() => {
              const textarea = document.querySelector('.chat-input') as HTMLTextAreaElement;
              if (textarea) {
                textarea.style.height = 'auto';
              }
            }, 0);
            
            // IMPORTANT: Refresh the history tab to show the new enhancement
            this.refreshHistory();
          } else {
            alert(response.error || response.message || 'Failed to enhance resume. Please try again.');
          }
        },
        error: (error) => {
          console.error('API Error:', error);
          this.isSending = false; // Stop animation on error!
          
          // Check if it's a network error or backend is not running
          if (error.status === 0) {
            alert(`Cannot connect to backend server. Please ensure the backend is running on ${environment.apiUrl.replace('/api', '')}`);
          } else if (error.status === 404) {
            alert('API endpoint not found. Please check the backend route configuration.');
          } else {
            alert(`Error: ${error.error?.message || error.message || 'Failed to enhance resume'}`);
          }
        },
        complete: () => {
          this.isSending = false;
        }
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An unexpected error occurred. Please try again.');
      this.isSending = false;
    }
  }

  // Helper method to update resume content with enhanced data
  private updateResumeWithEnhancedData(responseData: any): void {
    
    // Check which mode we're in
    if (this.useHtmlMode) {
      // HTML MODE: Use enhancedHtml from API response
      console.log('📄 HTML Mode: Using enhancedHtml from API');
      
      if (responseData.enhancedHtml) {
        // Directly set the enhanced HTML content
        this.editor.commands.setContent(responseData.enhancedHtml);
        console.log('✅ Editor content replaced with enhancedHtml');
        
        // Update global resume data
        if (responseData.currentResume) {
          this.currentResumeData = responseData.currentResume;
        }
      } else {
        console.warn('⚠️ No enhancedHtml in response, falling back to JSON mode');
        // Fallback to JSON mode if enhancedHtml not available
        this.patchJsonData(responseData);
      }
    } else {
      // JSON MODE: Patch JSON data into existing DOM (preserves styling)
      console.log('🔧 JSON Mode: Patching data into existing DOM (preserving styling)');
      this.patchJsonData(responseData);
    }
  }
  
  /**
   * Helper to patch JSON data (used in JSON mode)
   */
  private patchJsonData(responseData: any): void {
    const enhancedData = responseData.currentResume || responseData;
    
    // Normalize data keys
    if (enhancedData) {
      this.normalizeResumeData(enhancedData);
    }

    // Capture old data for highlight diffing
    const oldData = this.currentResumeData;

    // Patch the content directly into the existing editor HTML
    console.log('Patching enhanced data into existing editor content...');
    this.patchEnhancedDataIntoEditor(enhancedData, oldData);
    
    // Update global variable
    this.currentResumeData = enhancedData;
  }
  
  /**
   * Patch enhanced data into the current editor content WITHOUT reloading the template.
   * This preserves all user styling changes (fonts, sizes, colors, etc.)
   * CRITICAL: We manipulate the LIVE DOM directly, not parse/setContent
   */
  private patchEnhancedDataIntoEditor(newData: any, oldData: any = null): void {
    console.log('🔧 Patching enhanced data into live editor DOM...');
    
    // Get the actual editor DOM element (not HTML string!)
    const editorElement = document.querySelector('.ProseMirror');
    if (!editorElement) {
      console.error('❌ Editor element not found!');
      return;
    }
    
    // Helper function to patch data into the LIVE DOM
    const patchLiveData = (container: Element, dataObj: any, oldDataObj: any) => {
      // 1. Handle single-value fields with data-field attribute
      const fieldsWithData = container.querySelectorAll('[data-field]');
      fieldsWithData.forEach(el => {
        const field = el.getAttribute('data-field');
        if (field && dataObj[field] !== undefined) {
          const newValue = String(dataObj[field]);
          const oldValue = oldDataObj ? String(oldDataObj[field] || '') : '';
          
          // Check if value actually changed
          const hasChanged = oldDataObj && newValue !== oldValue;
          
          console.log(`Field: ${field}, Old: "${oldValue}", New: "${newValue}", Changed: ${hasChanged}`);
          
          // Get new content (with linkify)
          let content = this.linkify(newValue);
          
          // Wrap in highlight span if changed
          if (hasChanged) {
            console.log(`🎨 Highlighting change for field: ${field}`);
            content = `<span class="change-highlight">${content}</span>`;
          }
          
          // CRITICAL: Only update innerHTML, all attributes/styles preserved
          el.innerHTML = content;
        }
      });
      
      // 2. Handle repeated data (arrays) with data-repeat attribute
      const repeatElements = container.querySelectorAll('[data-repeat]');
      repeatElements.forEach(repeatEl => {
        const arrayName = repeatEl.getAttribute('data-repeat');
        if (arrayName && Array.isArray(dataObj[arrayName])) {
          console.log(`📋 Processing array: ${arrayName}, items: ${dataObj[arrayName].length}`);
          
          // Get existing children as templates
          const existingChildren = Array.from(repeatEl.children);
          if (existingChildren.length === 0) {
            console.warn(`⚠️ No template found for array: ${arrayName}`);
            return;
          }
          
          // Use first child as template
          const itemTemplate = existingChildren[0].cloneNode(true) as Element;
          
          // Clear the container
          repeatEl.innerHTML = '';
          
          // For each item in the new data array
          dataObj[arrayName].forEach((item: any, index: number) => {
            // Clone the template to preserve its structure and styling
            const itemElement = itemTemplate.cloneNode(true) as Element;
            
            // Get corresponding old item for comparison
            const oldItem = (oldDataObj && Array.isArray(oldDataObj[arrayName])) 
              ? oldDataObj[arrayName][index] 
              : null;
            
            // Find all data-field elements in this cloned item
            const fields = itemElement.querySelectorAll('[data-field]');
            fields.forEach(field => {
              const fieldName = field.getAttribute('data-field');
              if (fieldName) {
                let val;
                let oldVal;
                
                // Handle both string arrays and object arrays
                if (typeof item === 'string') {
                  val = item;
                  oldVal = oldItem;
                } else if (typeof item === 'object') {
                  val = item[fieldName];
                  oldVal = oldItem ? oldItem[fieldName] : null;
                }
                
                if (val !== undefined) {
                  let content = this.linkify(String(val));
                  
                  // Highlight if changed
                  if (oldVal !== undefined && String(val) !== String(oldVal)) {
                    console.log(`🎨 Highlighting array item change: ${fieldName}`);
                    content = `<span class="change-highlight">${content}</span>`;
                  }
                  
                  field.innerHTML = content;
                }
              }
            });
            
            // Also check if the item element itself has data-field (for simple arrays)
            const itemField = itemElement.getAttribute('data-field');
            if (itemField && typeof item === 'string') {
              let content = this.linkify(item);
              if (oldItem && item !== oldItem) {
                console.log(`🎨 Highlighting simple array item change`);
                content = `<span class="change-highlight">${content}</span>`;
              }
              itemElement.innerHTML = content;
            }
            
            // Append the patched item to the live DOM
            repeatEl.appendChild(itemElement);
          });
        }
      });
    };
    
    // Apply the patching to the LIVE editor DOM
    patchLiveData(editorElement, newData, oldData);
    
    console.log('✅ Content patched successfully in live DOM, user styling preserved');
    
    // Activate highlighting - will be removed on next keyboard or mouse interaction
    this.activateHighlighting();
  }
  
  // Normalize resume data to handle typos and inconsistent field names
  private normalizeResumeData(resumeData: any): void {
    if (!resumeData) return;

    // Handle Experience/Experiance
    if (resumeData.experience && !resumeData.experiance) {
      resumeData.experiance = resumeData.experience;
    } else if (resumeData.experiance && !resumeData.experience) {
      resumeData.experience = resumeData.experiance;
    }

    // Handle Education/Eduction
    if (resumeData.education && !resumeData.eduction) {
      resumeData.eduction = resumeData.education;
    } else if (resumeData.eduction && !resumeData.education) {
      resumeData.education = resumeData.eduction;
    }

    // Handle Phone
    if (resumeData.phoneNo && !resumeData.phoneno) {
      resumeData.phoneno = resumeData.phoneNo;
    } else if (resumeData.phoneno && !resumeData.phoneNo) {
      resumeData.phoneNo = resumeData.phoneno;
    }

    // Handle LinkedIn (camelCase vs lowercase)
    if (resumeData.linkedIn && !resumeData.linkedin) {
      resumeData.linkedin = resumeData.linkedIn;
    } else if (resumeData.linkedin && !resumeData.linkedIn) {
      resumeData.linkedIn = resumeData.linkedin;
    }

    // Handle GitHub (camelCase vs lowercase)
    if (resumeData.gitHub && !resumeData.github) {
      resumeData.github = resumeData.gitHub;
    } else if (resumeData.github && !resumeData.gitHub) {
      resumeData.gitHub = resumeData.github;
    }
  }

  // Extract data from HTML based on data-field and data-repeat attributes
  private extractDataFromHTML(htmlContent: string): any {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const result: any = {};
    
    // Helper to set nested value
    const setPath = (obj: any, path: string, value: string) => {
      if (!path) return;
      const keys = path.split('.');
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[keys[keys.length - 1]] = value.trim();
    };
    
    // 1. Extract global fields (not inside repeats)
    // We select all [data-field] but filter out those that are descendants of [data-repeat]
    const allFields = Array.from(doc.body.querySelectorAll('[data-field]'));
    
    allFields.forEach((el: Element) => {
      // Check if this element is inside a data-repeat
      // We check if the closest [data-repeat] exists and if the element is inside it
      const closestRepeat = el.closest('[data-repeat]');
      if (closestRepeat) return; // Skip fields inside repeats
      
      const key = el.getAttribute('data-field');
      if (key) {
        setPath(result, key, el.textContent || '');
      }
    });
    
    // 2. Extract repeated data
    const repeatContainers = Array.from(doc.body.querySelectorAll('[data-repeat]'));
    
    repeatContainers.forEach((container: Element) => {
      const arrayName = container.getAttribute('data-repeat');
      if (!arrayName) return;
      
      const arrayData: any[] = [];
      
      // Iterate over the direct children of the container
      // In the binding logic, we append items to the container
      Array.from(container.children).forEach(item => {
        const itemData: any = {};
        let hasData = false;
        
        // Find fields inside this item - need to look at ALL descendants, not just direct children
        const itemFields = Array.from(item.querySelectorAll('[data-field]'));
        
        itemFields.forEach((field: Element) => {
          // Ensure this field belongs to *this* repeat level
          // The closest [data-repeat] for this field MUST be the current container
          const closestRepeat = field.closest('[data-repeat]');
          if (closestRepeat !== container) return;
          
          const key = field.getAttribute('data-field');
          if (key) {
            setPath(itemData, key, field.textContent || '');
            hasData = true;
          }
        });
        
        // Handle simple string arrays (like skills) where the item itself has data-field
        const itemField = item.getAttribute('data-field');
        if (itemField) {
           setPath(itemData, itemField, item.textContent || '');
           hasData = true;
        }

        if (hasData) {
          // Special handling for string arrays like 'skills'
          if (arrayName === 'skills' && itemData['skill']) {
            arrayData.push(itemData['skill']);
          } else {
            arrayData.push(itemData);
          }
        }
      });
      
      if (arrayData.length > 0) {
        result[arrayName] = arrayData;
      }
    });
    
    return result;
  }
}
