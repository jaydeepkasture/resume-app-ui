import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, HostListener, ViewChild, ElementRef, ViewContainerRef, Type, ComponentRef } from '@angular/core';

// Map of Template IDs to Component Classes
const FORM_TEMPLATE_COMPONENTS: { [key: string]: Type<any> } = {
  '6973bcfbdf2766fbee178f68': FormTemplate6973bcfbdf2766fbee178f68Component,
  '69760da5141f61da2dbb924e': FormTemplate69760da5141f61da2dbb924eComponent,
  '697a55ac89449a11f51085ec': FormTemplate697a55ac89449a11f51085ecComponent
};

import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { TemplateService, ResumeTemplate, EnhanceResumeResponse, ResumeData } from './template.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { environment } from '../../environments/environment';
import { ChatSidebarComponent } from '../components/chat-sidebar/chat-sidebar.component';
import { TemplateDropdownComponent } from '../components/template-dropdown/template-dropdown.component';
import { FormTemplate6973bcfbdf2766fbee178f68Component } from './form-edit-templates/form-template-6973bcfbdf2766fbee178f68/form-template-6973bcfbdf2766fbee178f68.component';
import { FormTemplate69760da5141f61da2dbb924eComponent } from './form-edit-templates/form-template-69760da5141f61da2dbb924e/form-template-69760da5141f61da2dbb924e.component';
import { FormTemplate697a55ac89449a11f51085ecComponent } from './form-edit-templates/form-template-697a55ac89449a11f51085ec/form-template-697a55ac89449a11f51085ec.component';
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

import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-resume-editor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ChatSidebarComponent, TemplateDropdownComponent, FormTemplate6973bcfbdf2766fbee178f68Component, FormTemplate69760da5141f61da2dbb924eComponent, FormTemplate697a55ac89449a11f51085ecComponent, SafeHtmlPipe],
  templateUrl: './resume-editor.component.html',
  styleUrl: './resume-editor.component.css'
})
export class ResumeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dynamicFormContainer', { read: ViewContainerRef }) dynamicFormContainer!: ViewContainerRef;
  private currentFormComponentRef: ComponentRef<any> | null = null;

  @HostListener('document:click')
  @HostListener('document:keydown')
  onUserInteraction() {
    this.clearHighlights();
  }

  isManualEdit: boolean = false;
  isSaving: boolean = false;
  private isProgrammaticUpdate: boolean = false;

  saveResume(): void {
    if (!this.isManualEdit || this.isSaving) return;
    
    if (!this.currentResumeData) {
      console.warn('Cannot save: No resume data available');
      return;
    }

    // If templateId is not set, we can't save effectively? Or we use default?
    // The requirement says "send templateid in query paramater".
    const templateId = this.currentTemplateId || this.currentChatId; // Fallback? No, chatId is not templateId.
    const chatId = this.currentChatId;

    if (!templateId) {
      alert('Cannot save: No template selected.');
      return;
    }

    if (!chatId) {
      alert('Cannot save: No chat session active.');
      return;
    }

    this.isSaving = true;
    console.log('💾 Saving resume data...', this.currentResumeData);

    this.templateService.saveResume(this.currentResumeData, templateId, chatId).subscribe({
      next: (response) => {
        console.log('✅ Resume saved successfully:', response);
        this.isSaving = false;
        this.isManualEdit = false; // Reset modification flag
        
        // Refresh history to show the latest saved state if applicable
        this.refreshHistory();
      },
      error: (err) => {
        console.error('❌ Failed to save resume:', err);
        this.isSaving = false;
        alert('Failed to save resume. Please try again.');
      }
    });
  }

  // Listen for browser back button
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // If editor is visible and we hit back, we should show gallery if possible?
    console.log('🔙 Browser Back Button Detected');
  }

  // Clear all highlight spans but keep content
  private clearHighlights() {
    const highlights = document.querySelectorAll('.change-highlight');
    if (highlights.length > 0) {
      console.log(`Clearing ${highlights.length} highlights due to interaction.`);
      highlights.forEach(el => {
        // Remove the class to stop highlighting (CSS transition handles fade if defined)
        el.classList.remove('change-highlight');
      });
    }
  }

  editor!: Editor;
  templates: ResumeTemplate[] = []; 
  
  // Legacy Gallery Properties (Dead Code - Gallery moved to TemplateGalleryComponent)
  backendTemplates: any[] = []; 
  filteredBackendTemplates: any[] = [];
  galleryViewMode: 'grid' | 'list' = 'grid';
  galleryFilter: 'all' | 'free' | 'form' = 'all';
  gallerySearch: string = '';
  
  isFormEditMode: boolean = false;
  selectedFormTemplateId: string | null = null;
  
  selectedTemplate: string = '';

  // Sidebar state
  sidebarOpen = false;
  historySidebarOpen = false;
  
  // Mobile Toolbar Toggle
  isToolbarVisible = true;
  
  toggleToolbar(): void {
    this.isToolbarVisible = !this.isToolbarVisible;
    // Re-calculate scale after layout change (giving time for DOM to update)
    setTimeout(() => this.updateMobileScale(), 100);
  }
  
  currentChatId: string | null = null;
  isEditorVisible = false;
  currentResumeData: ResumeData | null = null;
  currentTemplateName: string = 'Select Template';
  currentTemplateId: string | undefined;

  // Handle template selection from backend API
  onBackendTemplateSelected(templateId: string, updateUrl: boolean = true): void {
    console.log('📌 Backend Template Selected:', templateId);
    this.currentTemplateId = templateId;

    // Check if this is a Form Edit template (Type 2) OR present in our map
    const componentClass = FORM_TEMPLATE_COMPONENTS[templateId];

    if (componentClass) {
        console.log('📝 Switching to Dynamic Form Edit Mode for template:', templateId);
        this.isFormEditMode = true;
        this.selectedFormTemplateId = templateId;
        this.isEditorVisible = true;
        
        // Dynamically load the component
        this.loadDynamicFormTemplate(templateId);

        
        if (updateUrl) {
            this.updateUrlWithParams(this.currentChatId, templateId);
        }
        
        // Avoid NG0100 by running detection
        this.cdr.detectChanges();
        return;
    }
    // Backward compatibility for potential unmapped IDs if hardcoded before
    if (templateId === '6973bcfbdf2766fbee178f68' || templateId === '69760da5141f61da2dbb924e') {
       console.log('📝 Switching to Legacy Form Edit Mode for template:', templateId);
       this.isFormEditMode = true;
       this.selectedFormTemplateId = templateId;
       this.isEditorVisible = true;
       
       this.loadDynamicFormTemplate(templateId); 
       this.refreshHistory();
        
       if (updateUrl) {
           this.updateUrlWithParams(this.currentChatId, templateId);
       }
       this.cdr.detectChanges();
       return;
    }
    
    // Default: Free Edit Mode
    this.isFormEditMode = false;
    this.selectedFormTemplateId = null;
    this.isEditorVisible = true;
    
    
    if (updateUrl) {
      this.updateUrlWithParams(this.currentChatId, templateId);
    }

    // Avoid NG0100
    this.cdr.detectChanges();

    this.templateService.getTemplateById(templateId).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          console.log('✅ Loaded template HTML:', response.data.templateName);
          this.currentTemplateName = response.data.templateName;
          
          const htmlContent = response.data.htmlTemplate;
          
          if (this.currentResumeData) {
            // If we have data, bind it to the new template
            this.processTemplateAndData(htmlContent, 'backend/template', this.currentResumeData);
          } else {
            // Just load the empty template
            this.setContent(htmlContent);
          }
        } else {
          console.error('❌ Failed to load template:', response.message);
        }
      },
      error: (error) => {
        console.error('❌ Error loading template:', error);
      }
    });
  }

  // Helper to load dynamic form component
  private loadDynamicFormTemplate(templateId: string): void {
      if (!this.dynamicFormContainer) {
          // If container is not ready (e.g. initial load), wait for next tick or ViewInit
          setTimeout(() => this.loadDynamicFormTemplate(templateId), 0);
          return;
      }

      this.dynamicFormContainer.clear();
      this.currentFormComponentRef = null;
      
      const componentClass = FORM_TEMPLATE_COMPONENTS[templateId];
      if (componentClass) {
          const componentRef = this.dynamicFormContainer.createComponent(componentClass);
          this.currentFormComponentRef = componentRef;
          
          // Set Inputs
          if (componentRef.instance) {
              (componentRef.instance as any).resumeData = this.currentResumeData;
              
              // Subscribe to Outputs
              if ((componentRef.instance as any).dataChange) {
                  (componentRef.instance as any).dataChange.subscribe((newData: ResumeData) => {
                      this.onFormDataChange(newData);
                  });
              }
          }
      } else {
          console.warn(`No component mapped for template ID: ${templateId}`);
      }
  }

  // Back button handler
  goBackToGallery(): void {
      this.router.navigate(['/templates']);
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
      } else {
        // Explicitly remove templateId if not provided (e.g. going back to gallery)
        queryParams.templateId = null;
      }
      
      this.router.navigate(commands, { 
          queryParams: queryParams,
          queryParamsHandling: 'merge', // Merge with existing params
          replaceUrl: !templateId // Replace history if we are clearing template (going back)
      });
  }

  // Load the first available template from the backend
  private loadDefaultBackendTemplate(): void {
      console.log('🔄 Loading backend templates...');
      this.templateService.getBackendTemplates(1, 100, 'asc').subscribe({ // Load more for gallery
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

              this.backendTemplates = templates;
              this.applyGalleryFilters();

              // Only auto-select if we came from a reload with no params, 
              // BUT now we want to show Gallery if no chat/template is selected.
              // So we might NOT want to auto-select a template unless we really want one.
              // The user said: "if the chat and template is not selected we get... welcome... now i want to show a grid"
              // So removing auto-selection logic for default view.
              
              if (templates.length > 0) {
                 // Verify if specific ID needs type injection (Mocking for dev if backend isn't ready)
                 // Also map templateTypeId to type if present (1=Free, 2=Form)
                 templates.forEach(t => {
                     if (t.templateTypeId) {
                         t.type = t.templateTypeId;
                     }
                     // Fallback/Override for specific ID if backend data is missing type
                     if (FORM_TEMPLATE_COMPONENTS[t.id]) {
                         t.type = 2;
                         // Load preview HTML for form templates
                         this.loadFormTemplatePreview(t);
                     } else if (!t.type) {
                         t.type = 1; // Default to free if unknown
                     }
                 });
              }
          },
          error: (err) => console.error('Failed to load default template list', err)
      });
  }

  /**
   * Load preview HTML for form edit templates
   * Uses pre-created static HTML files from assets folder
   */
  private loadFormTemplatePreview(template: any): void {
    const previewPath = `assets/templates/form-preview-${template.id}.html`;
    
    this.http.get(previewPath, { responseType: 'text' }).subscribe({
      next: (html: string) => {
        template.htmlTemplate = html;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.warn(`Preview HTML not found for template ${template.id}`, err);
        // Preview will fall back to icon
      }
    });
  }

  /**
   * Get sample data for form template preview
   */
  getEmptyResumeData(): ResumeData {
    return {
      name: '',
      role: '',
      phoneNo: '',
      email: '',
      location: '',
      linkedIn: '',
      gitHub: '',
      summary: '',
      experience: [],
      skills: [],
      education: []
    };
  }

  getPreviewData(): ResumeData {
    return {
      name: 'JOHN DOE',
      role: 'SOFTWARE ENGINEER',
      email: 'john.doe@email.com',
      phoneNo: '(555) 123-4567',
      location: 'New York, NY',
      linkedIn: 'linkedin.com/in/johndoe',
      gitHub: 'github.com/johndoe',
      summary: 'Experienced software engineer with 5+ years of expertise in full-stack development.',
      experience: [
        {
          company: 'TECH COMPANY INC',
          position: 'SENIOR SOFTWARE ENGINEER',
          from: '2020',
          to: 'PRESENT',
          description: 'Led development of enterprise applications using modern technologies.'
        }
      ],
      education: [
        {
          institution: 'STANFORD UNIVERSITY',
          degree: 'Bachelor of Science in Computer Science',
          year: '2016 - 2020'
        }
      ],
      skills: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js', 'Python', 'AWS'],
      // Allow hobbies as extra property via index signature if needed, or remove if strict
      hobbies: 'Photography, Hiking, Reading'
    };
  }

  /**
   * Handle data change from preview (no-op for gallery preview)
   */
  onPreviewDataChange(data: any): void {
    // No action needed for preview
  }
  
  applyGalleryFilters() {}



  onGalleryTemplateSelect(template: any) {
    console.log('Gallery Template Selected:', template);
    
    // Call API to create a new chat session with this template
    this.templateService.createChatSession(template.id).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          // Assuming response.data contains the chat object with _id
          const chatId = response.data._id || response.data.chatId;
          console.log('✅ Created new chat session:', chatId);
          
          this.currentChatId = chatId;
          this.currentTemplateId = template.id;

          // Check type

          // Check type
          // Check type: Use existing type or check if ID is in our component map
          // FORM_TEMPLATE_COMPONENTS check determines if it is a Form Template (Type 2) recursively without hardcoding
          const type = template.type || (FORM_TEMPLATE_COMPONENTS[template.id] ? 2 : 1);
          
          if (type === 2) {
              // Form Edit Logic
              this.isFormEditMode = true;
              this.selectedFormTemplateId = template.id;
              
              // Load Dynamic Component
              this.loadDynamicFormTemplate(template.id);

              this.currentTemplateName = template.templateName;
              
              // If we have resume Data, the Form component should pick it up via Input or Service
              // Ensure dirty checking or initial state is set
              
          } else {
              // Free Edit (HTML) Logic - Standard Flow
              this.isFormEditMode = false;
              this.selectedFormTemplateId = null;
              
              // Load the external template HTML logic will be triggered by URL update
              // via ngOnInit subscription
          }

          // Show the editor
          this.isEditorVisible = true;
          
          // Update URL
          this.updateUrlWithParams(chatId, template.id);
          
        } else {
          console.error('❌ Failed to create chat session:', response.message);
          // Fallback or Alert?
          // For now, alert to notify user
          alert('Could not start a new session. Please try again.');
        }
      },
      error: (err) => {
        console.error('❌ Error creating chat session:', err);
        alert('Error connecting to server.');
      }
    });
  }
  
  // Handling data change from Form Component
  onFormDataChange(newData: ResumeData) {
      this.currentResumeData = newData;
      this.isManualEdit = true;
      // Maybe auto-save or simple local state update
  }


  // Sidebar Handlers
  onChatSelected(chatId: string): void {
    // Prevent reload if clicking the same chat
    if (this.currentChatId === chatId && this.isEditorVisible) {
        console.log('⏩ Already viewing this chat:', chatId);
        return;
    }

    console.log('📝 Resume Editor: Chat selected:', chatId);
    this.currentChatId = chatId;
    
    // Refresh history for the new chat
    this.refreshHistory();
    
    // Load resume data and template for this chat
    this.templateService.getChatSession(chatId).subscribe({
      next: (response: any) => {
        if (response.status && response.data) {
          console.log('✅ Loaded chat session data:', response.data);
          const data = response.data;
          
          this.isEditorVisible = true; // Show editor when chat is loaded
          
          // 1. Handle Resume Data
          const resumeData = data.currentResume || data.resumeData || data; 
          
          if (resumeData) {
             console.log('📥 Updating editor with remote resume data');
             this.currentResumeData = resumeData;
             this.normalizeResumeData(this.currentResumeData);
             this.cdr.detectChanges(); 
          }

          // 2. Handle Template ID (from templateId)
          // Use this variable to load the editor url
          if (data.templateId) {
             console.log('📍 Found templateId from chat session:', data.templateId);
             this.currentTemplateId = data.templateId;
             
             // Navigate directly with the templateId
             this.router.navigate(['/editor', chatId], { 
                queryParams: { templateId: data.templateId },
                replaceUrl: true 
             });
             
             // Load this specific template (updateUrl=false because we just navigated)
             this.onBackendTemplateSelected(data.templateId, false);
             
          } else {
             console.warn('⚠️ No templateId found in chat session.');
             
             // Fallback navigation (no template param)
             this.router.navigate(['/editor', chatId], { replaceUrl: true });
             
             if (this.currentTemplateId) {
                 this.onBackendTemplateSelected(this.currentTemplateId, false);
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
             
             // Critical: If in Form Edit Mode, we must update the dynamic component instance explicitly
             if (this.isFormEditMode && this.currentFormComponentRef) {
                 console.log('📝 Updating dynamic form component with history data...');
                 (this.currentFormComponentRef.instance as any).resumeData = this.currentResumeData;
                 // Force change detection on the child component if it uses OnPush or needs manual trigger
                 if ((this.currentFormComponentRef.instance as any).cdr) {
                     (this.currentFormComponentRef.instance as any).cdr.markForCheck(); 
                 }
                 this.cdr.detectChanges();
             }
          }
          
          // 2. Patch resume HTML to editor
          if (historyData.resumeHtml) {
            console.log('Updating editor with history HTML...');
            this.setContent(historyData.resumeHtml);
            
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
  private loadTemplateWithData(templatePath: string, resumeData: ResumeData, oldData: ResumeData | null = null): void {
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
  private processTemplateAndData(htmlContent: string, templatePath: string, resumeData: ResumeData, oldData: ResumeData | null = null): void {
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
         this.setContent(doc.body.innerHTML);
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
        this.historySearchQuery
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
      const btn = (event.currentTarget as HTMLElement);
      
      navigator.clipboard.writeText(text).then(() => {
          if (btn) {
            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 2000);
          }
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
   * Load the first history item automatically when editor URL is opened
   */
  loadFirstHistoryItem() {
    if (!this.currentChatId) {
      console.warn('⚠️ Cannot load first history item: No chat ID');
      return;
    }
    
    console.log('📜 Loading first history item for chat:', this.currentChatId);
    
    // Load the first page of history with page size 1 to get only the first item
    this.templateService.getChatHistory(
      this.currentChatId, 
      1, // page 1
      1, // pageSize 1 (only get first item)
      'desc', // most recent first
      '' // no search
    ).subscribe({
      next: (response) => {
        if (response.status && response.data && response.data.length > 0) {
          const firstHistoryItem = response.data[0];
          console.log('✅ Loaded first history item:', firstHistoryItem);
          
          // Automatically select this history item
          if (firstHistoryItem._id || firstHistoryItem.id) {
            const historyId = firstHistoryItem._id || firstHistoryItem.id;
            this.onHistorySelected(historyId);
          } else {
            console.error('❌ First history item has no ID');
          }
        } else {
          console.log('ℹ️ No history items found for this chat');
        }
      },
      error: (err) => {
        console.error('❌ Error loading first history item:', err);
      }
    });
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
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.templateService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
    
    // Debug code removed
  }

  ngOnInit(): void {
    // Check for passed data from navigation (e.g. Create Chat flow)
    
    const tempData = this.templateService.getAndClearTempResumeData();
    if (tempData) {
        console.log('🔄 Restoring temp resume data from navigation');
        this.currentResumeData = tempData;
        this.normalizeResumeData(this.currentResumeData);
    }

    // Check if there's a chatId in the URL
    this.route.params.subscribe(params => {
      const chatId = params['chatId'];
      if (chatId && chatId !== this.currentChatId) {
        console.log('📍 Chat ID from URL:', chatId);
        this.currentChatId = chatId;
        
        // Load the first history item automatically when chat is loaded
        this.loadFirstHistoryItem();
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
          // No template ID? 
          // If we ARE in editor mode, this means we should go back to gallery.
          // Or if we just landed on /editor with no params
          // if (!this.currentChatId) {
          //    this.router.navigate(['/templates']);
          // }
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
      },
      onUpdate: () => {
        if (this.isProgrammaticUpdate) {
            this.isProgrammaticUpdate = false;
            return;
        }
        if (!this.isManualEdit) {
            console.log('✏️ Manual edit detected in editor');
            this.isManualEdit = true;
        }
      }
    });
    
    // Initial scale check for mobile
    setTimeout(() => this.updateMobileScale(), 100);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateMobileScale();
  }

  updateMobileScale() {
    const editorEl = document.querySelector('.editor') as HTMLElement;
    if (!editorEl) return;

    // If using Form Edit Mode (Templates), disable scaling and let CSS media queries handle responsiveness
    if (this.isFormEditMode) {
        editorEl.style.transform = 'none';
        editorEl.style.margin = '0 auto';
        return;
    }

    const containerWidth = window.innerWidth;
    const targetWidth = 840; // 8.5in (816px) + padding

    if (containerWidth < targetWidth) {
      // Scale to fit, leaving small padding (20px total)
      // 816px is the specific width of the resume paper
      const scale = (containerWidth - 20) / 816;
      const safeScale = Math.min(Math.max(scale, 0.3), 1); // Cap scale between 0.3 and 1

      editorEl.style.transform = `scale(${safeScale})`;
      editorEl.style.transformOrigin = 'top center'; 
      editorEl.style.margin = '0 auto'; 
    } else {
      editorEl.style.transform = 'none';
      editorEl.style.margin = '0 auto';
    }
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

  // Getter for current heading value to support ngModel
  get currentHeadingValue(): string {
    if (this.isActive('paragraph')) return 'paragraph';
    if (this.isActive('heading', { level: 1 })) return '1';
    if (this.isActive('heading', { level: 2 })) return '2';
    if (this.isActive('heading', { level: 3 })) return '3';
    if (this.isActive('heading', { level: 4 })) return '4';
    if (this.isActive('heading', { level: 5 })) return '5';
    if (this.isActive('heading', { level: 6 })) return '6';
    return 'paragraph';
  }

  setHeadingValue(value: string): void {
      if (value === 'paragraph') {
        this.setParagraph();
      } else {
        const level = parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6;
        this.setHeading(level);
      }
  }

  onHeadingChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.setHeadingValue(value);
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
    this.isProgrammaticUpdate = true;
    this.editor.commands.setContent(content);
    // Reset manual edit flag as this is a programmatic set
    this.isManualEdit = false;
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
  private bindDataToTemplate(htmlContent: string, data: ResumeData, oldData: ResumeData | null = null): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Sanitize broken images from Word export or local paths
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src && (src.includes('Document') && src.includes('_files') || src.startsWith('file:'))) {
            console.warn('Removing broken image link from template:', src);
            img.remove();
        }
    });
    
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
               this.processTemplateAndData(htmlContent, templatePath, this.getEmptyResumeData());
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
  


  // Helper to prepare form content for export (flattens inputs to text)
  private async prepareFormForExport(): Promise<HTMLElement | null> {
      const sourceElement = document.getElementById('form-template-container');
      if (!sourceElement) return null;

      // Clone the element
      const clonedElement = sourceElement.cloneNode(true) as HTMLElement;
      
      // Fix styles for export - Ensure it looks like a page
      clonedElement.id = 'form-export-container';
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = '0'; 
      clonedElement.style.left = '0';
      clonedElement.style.width = '794px'; 
      clonedElement.style.minHeight = '1123px';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '0'; 
      clonedElement.style.background = '#ffffff';
      clonedElement.style.zIndex = '-1000'; 
      
      // Normalize specific template styles for PDF
      const resumeContainer = clonedElement.querySelector('.resume-container') as HTMLElement;
      if (resumeContainer) {
          resumeContainer.style.width = '100%';
          resumeContainer.style.maxWidth = '100%';
          resumeContainer.style.boxShadow = 'none';
          resumeContainer.style.margin = '0';
      }

      // 1. Flatten INPUTS
      // We explicitly pull styles from the SOURCE element because getComputedStyle() 
      // fails on detached nodes (the clone is not in DOM yet).
      const sourceInputs = sourceElement.querySelectorAll('input');
      const cloneInputs = clonedElement.querySelectorAll('input');
      
      sourceInputs.forEach((sourceInput, index) => {
          if (!cloneInputs[index]) return;
          const cloneInput = cloneInputs[index];
          
          const computedStyle = window.getComputedStyle(sourceInput);
          
          // Use div for block-level inputs (like headers), span for inline
          const isBlock = computedStyle.display === 'block' || computedStyle.display === 'flex';
          const replacement = document.createElement(isBlock ? 'div' : 'span');
          
          replacement.textContent = sourceInput.value;
          
          // Explicitly copy all font text styles
          replacement.style.fontFamily = computedStyle.fontFamily;
          replacement.style.fontSize = computedStyle.fontSize;
          replacement.style.fontWeight = computedStyle.fontWeight;
          replacement.style.fontStyle = computedStyle.fontStyle;
          replacement.style.color = computedStyle.color;
          replacement.style.textAlign = computedStyle.textAlign;
          replacement.style.textTransform = computedStyle.textTransform;
          replacement.style.letterSpacing = computedStyle.letterSpacing;
          replacement.style.lineHeight = computedStyle.lineHeight;
          
          // Copy box model properties that affect layout
          replacement.style.width = computedStyle.width;
          replacement.style.margin = computedStyle.margin;
          replacement.style.padding = computedStyle.padding;
          replacement.style.display = computedStyle.display;
          
          // Remove form styles
          replacement.style.border = 'none';
          replacement.style.background = 'transparent';
          replacement.style.outline = 'none';
          replacement.style.minHeight = 'auto'; // allow text to define height
          
          if (cloneInput.parentNode) {
              cloneInput.parentNode.replaceChild(replacement, cloneInput);
          }
      });

      // 2. Flatten TEXTAREAS
      const sourceTextareas = sourceElement.querySelectorAll('textarea');
      const cloneTextareas = clonedElement.querySelectorAll('textarea');
      
      sourceTextareas.forEach((sourceTextarea, index) => {
          if (!cloneTextareas[index]) return;
          const cloneTextarea = cloneTextareas[index];
          
          const computedStyle = window.getComputedStyle(sourceTextarea);
          
          const div = document.createElement('div');
          // Preserve newlines
          div.innerHTML = (sourceTextarea.value || '').replace(/\n/g, '<br>');
          
          // Copy font styles
          div.style.fontFamily = computedStyle.fontFamily;
          div.style.fontSize = computedStyle.fontSize;
          div.style.fontWeight = computedStyle.fontWeight;
          div.style.fontStyle = computedStyle.fontStyle;
          div.style.color = computedStyle.color;
          div.style.textAlign = computedStyle.textAlign;
          div.style.textTransform = computedStyle.textTransform;
          div.style.letterSpacing = computedStyle.letterSpacing;
          div.style.lineHeight = computedStyle.lineHeight;

          // Copy box layout
          div.style.width = computedStyle.width;
          div.style.margin = computedStyle.margin;
          div.style.padding = computedStyle.padding;
          
          div.style.border = 'none';
          div.style.background = 'transparent';
          div.style.outline = 'none';
          div.style.height = 'auto'; // Auto expand to fit content
          div.style.overflow = 'visible';
          
          if (cloneTextarea.parentNode) {
              cloneTextarea.parentNode.replaceChild(div, cloneTextarea);
          }
      });

      // Remove UI buttons (Add/Remove)
      const buttons = clonedElement.querySelectorAll('button');
      buttons.forEach(btn => btn.remove());
      
      // Force Desktop Layout (Override Mobile Styles)
      const bodyContent = clonedElement.querySelector('.body-content') as HTMLElement;
      if (bodyContent) {
          bodyContent.style.flexDirection = 'row';
          bodyContent.style.padding = '40px';
      }

      const leftColumn = clonedElement.querySelector('.left-column') as HTMLElement;
      if (leftColumn) {
          leftColumn.style.flex = '6';
          leftColumn.style.width = 'auto'; // Reset width from 100%
          leftColumn.style.paddingRight = '30px';
      }

      const rightColumn = clonedElement.querySelector('.right-column') as HTMLElement;
      if (rightColumn) {
          rightColumn.style.flex = '4';
          rightColumn.style.width = 'auto'; // Reset width from 100%
          rightColumn.style.paddingLeft = '30px';
      }

      const vDivider = clonedElement.querySelector('.vertical-divider') as HTMLElement;
      if (vDivider) {
          vDivider.style.display = 'block';
      }
      
      const headerArt = clonedElement.querySelector('.header-art') as HTMLElement;
      if (headerArt) {
          headerArt.style.display = 'block';
      }

      const headerSection = clonedElement.querySelector('.header-section') as HTMLElement;
      if (headerSection) {
          headerSection.style.padding = '40px';
      }

      // Append to body to ensure it is rendered for capture
      document.body.appendChild(clonedElement);
      
      // Small delay to allow rendering and font loading
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return clonedElement;
  }



  // Download as DOCX using html-to-docx library
  async downloadDocx(): Promise<void> {
    alert('DOCX download is currently disabled as it requires server-side processing.');
    console.warn('DOCX download disabled to resolve browser-stream compatibility issues.');
  }

  // Post-process for Word compatibility (Helper)
  private cleanForWord(element: HTMLElement): void {
     // Clean background images
     const bgImage = element.style.backgroundImage;
     if (bgImage && bgImage !== 'none') {
         element.style.backgroundImage = 'none';
     }
     
     // Remove positioning that breaks Word flow
     if (element.style.position === 'absolute' || element.style.position === 'fixed') {
         element.style.position = 'static'; 
     }
     
     // Recursion
     Array.from(element.children).forEach(child => {
         if (child instanceof HTMLElement) this.cleanForWord(child);
     });
  }
  
  // Heuristic to convert Flexbox layouts to Tables for Word (Helper)
  private convertFlexToTable(element: HTMLElement): void {
      // Check if this element is a row-oriented flex container
      const style = element.style;
      const display = style.display;
      // specific check for the main resume container or large layout blocks
      if (display === 'flex' || display === 'inline-flex' || element.classList.contains('row') || element.style.display.includes('flex')) {
           // Check flex direction
           if (style.flexDirection === 'column' || style.flexDirection === 'column-reverse') {
               // Keep as block, just process children
           } else {
               // Assume Row: Convert to Table
               const children = Array.from(element.children) as HTMLElement[];
               if (children.length > 1) {
                    const table = document.createElement('table');
                    table.setAttribute('width', '100%');
                    table.style.width = '100%';
                    table.style.borderCollapse = 'collapse';
                    table.style.tableLayout = 'fixed'; 
                    
                    // Copy background and borders
                    table.style.backgroundColor = style.backgroundColor;
                    table.style.background = style.background;
                    table.style.border = style.border;
                    
                    const tr = document.createElement('tr');
                    
                    children.forEach(child => {
                         const td = document.createElement('td');
                         td.style.verticalAlign = 'top';
                         
                         // Determine width
                         const childWidth = child.style.width;
                         const childFlex = child.style.flex;
                         
                         if (childWidth && childWidth !== 'auto') {
                             td.style.width = childWidth;
                         } else if (childFlex && childFlex !== '0 1 auto' && !childFlex.startsWith('0')) {
                             td.style.width = `${100 / children.length}%`; 
                         }
                         
                         child.style.margin = '0'; 
                         td.appendChild(child);
                         tr.appendChild(td);
                    });
                    
                    table.appendChild(tr);
                    
                    if (element.parentNode) {
                        element.parentNode.replaceChild(table, element);
                    }
                    return; // Done with this level
               }
           }
      }
      
      // Recurse
      Array.from(element.children).forEach(child => {
          if (child instanceof HTMLElement) this.convertFlexToTable(child);
      });
  }

  // Download as PDF
  async downloadPdf(): Promise<void> {
    let exportElement: HTMLElement | null = null;
    let isTemp = false;

    // 1. Prepare Content
    if (this.isFormEditMode) {
        console.log('📄 Preparing PDF for Form Template...');
        exportElement = await this.prepareFormForExport();
        if (!exportElement) return;
        isTemp = true;
    } else {
        // Free Edit Mode - Use existing logic via Free Edit helper but adapted to specific flow if needed
        return this.downloadPdfFreeEdit();
    }

    try {
        // 2. Setup jsPDF
        const a4WidthPx = 794;
        const a4HeightPx = 1123;
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px', 
            format: [a4WidthPx, a4HeightPx],
            compress: true,
            hotfixes: ['px_scaling']
        });

        // 3. Render HTML to PDF
        // Using pdf.html which creates selectable text vectors mostly
        await pdf.html(exportElement, {
            callback: function(doc) {
                doc.save(`resume_${new Date().toISOString().split('T')[0]}.pdf`);
                
                // Cleanup inside callback
                if (isTemp && exportElement && exportElement.parentNode) {
                    exportElement.parentNode.removeChild(exportElement);
                }
                console.log('PDF generated.');
            },
            x: 0,
            y: 0,
            width: a4WidthPx,
            windowWidth: a4WidthPx,
            margin: [0, 0, 0, 0], // No extra margins, we control padding in CSS
            autoPaging: 'text',
            html2canvas: {
                scale: 1,
                useCORS: true, 
                logging: false,
                letterRendering: true,
                backgroundColor: '#ffffff'
            }
        });

    } catch (err) {
        console.error('Error generating PDF:', err);
        if (isTemp && exportElement && exportElement.parentNode) {
            exportElement.parentNode.removeChild(exportElement);
        }
    }
  }

  // Legacy PDF Logic for Free Edit (Preserved/Renamed)
  async downloadPdfFreeEdit(): Promise<void> {
    try {
       // ... (Original logic from downloadPdf lines 1727-1867)
       // We need to include this entire block here
      if (typeof window !== 'undefined') {
        (window as any).html2canvas = html2canvas;
      }
      const htmlContent = this.editor.getHTML();
      let templateCss = '';
      const templateStyleElement = document.querySelector('style[data-template-styles="true"]');
      if (templateStyleElement) {
        templateCss = templateStyleElement.textContent || '';
        templateCss = templateCss.replace(/\.editor\s+/g, '');
      }
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      const tempContainer = document.createElement('div');
      tempContainer.id = 'pdf-temp-container';
      const a4WidthPx = 794;
      const pagePadding = 40;
      
      tempContainer.style.width = `${a4WidthPx}px`; 
      tempContainer.style.minHeight = '1123px';
      tempContainer.style.padding = `${pagePadding}px`; 
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.boxSizing = 'border-box';
      tempContainer.style.fontFamily = 'Arial, Helvetica, sans-serif';
      tempContainer.style.fontSize = '16px'; 
      tempContainer.style.lineHeight = '1.5';
      tempContainer.style.color = '#000000';
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '0';
      tempContainer.style.left = '0';
      tempContainer.style.zIndex = '-1000';
      
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        ${templateCss}
        #pdf-temp-container { box-sizing: border-box; }
        .resume-container, .container { width: 100% !important; box-shadow: none !important; }
        table { width: 100%; border-collapse: collapse; }
      `;
      tempContainer.appendChild(styleElement);
      
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = doc.body.innerHTML;
      tempContainer.appendChild(contentDiv);
      document.body.appendChild(tempContainer);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const a4HeightPx = 1123;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px', 
        format: [a4WidthPx, a4HeightPx],
        compress: true,
        hotfixes: ['px_scaling']
      });
      
      await pdf.html(tempContainer, {
        callback: function(doc) {
          doc.save(`resume_${new Date().toISOString().split('T')[0]}.pdf`);
          if (document.body.contains(tempContainer)) {
            document.body.removeChild(tempContainer);
          }
        },
        x: 0, y: 0,
        width: a4WidthPx, windowWidth: a4WidthPx,
        margin: [0, 0, 0, 0],
        autoPaging: 'text',
        html2canvas: { scale: 1, useCORS: true, logging: false, letterRendering: true, backgroundColor: '#ffffff' }
      });
    } catch (error) {
       console.error('Error generating PDF (Free Edit):', error);
       const temp = document.getElementById('pdf-temp-container');
       if (temp) temp.remove();
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
      let resumeHtml = '';
      let extractedData: any = {};

      if (this.isFormEditMode) {
          // In Form Edit Mode, we use the live object from the form component
          console.log('📝 Form Mode: Sending structured data directly');
          extractedData = this.currentResumeData;
          // We don't send HTML in this mode as it's not the primary source of truth
          // unless we want to send what's in the background editor, which might be stale.
          resumeHtml = ''; 
      } else {
          // Free Edit Mode: Extract from Tiptap HTML
          resumeHtml = this.getHTML();
          extractedData = this.extractDataFromHTML(resumeHtml);
      }
      
      console.log('User Message:', this.chatInput);
      console.log('Resume HTML Length:', resumeHtml.length);
      console.log('Extracted Data:', extractedData);
      
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
    
    // Check if we are in Form Edit Mode
    if (this.isFormEditMode) {
        console.log('📝 Form Mode: Updating dynamic component with enhanced data');
        const enhancedData = responseData.currentResume || responseData;
        
        if (enhancedData) {
            // Update global data
            this.currentResumeData = enhancedData;
            this.normalizeResumeData(this.currentResumeData);
            
            // Update the Dynamic Component using stored reference
            if (this.currentFormComponentRef) {
                 // Update Input
                 (this.currentFormComponentRef.instance as any).resumeData = this.currentResumeData;
                 
                 // Force Change Detection
                 if ((this.currentFormComponentRef.instance as any).cdr) {
                     (this.currentFormComponentRef.instance as any).cdr.markForCheck(); 
                 }
                 
                 // Also try standard detection cycle
                 this.cdr.detectChanges();
                 console.log('✅ Dynamic Form Component updated with new data');
            }
        }
        return; // Stop here for Form Mode
    }

    // Check which mode we're in (Free Edit)
    if (this.useHtmlMode) {
      // HTML MODE: Use enhancedHtml from API response
      console.log('📄 HTML Mode: Using enhancedHtml from API');
      
      if (responseData.enhancedHtml) {
        // Directly set the enhanced HTML content
        this.setContent(responseData.enhancedHtml);
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
    
    this.isProgrammaticUpdate = true;
    this.patchEnhancedDataIntoEditor(enhancedData, oldData);
    
    // Safety timeout to reset flag if onUpdate doesn't fire or fires late
    setTimeout(() => {
        if (this.isProgrammaticUpdate) {
            this.isProgrammaticUpdate = false;
        }
    }, 500);

    // Update global variable
    this.currentResumeData = enhancedData;
    this.isManualEdit = false; // Ensure patches don't count as manual edits
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

    // Ensure contact structure exists (Bridge for Form Templates that expect 'contact' object)
    if (!resumeData.contact) {
        resumeData.contact = {
            phone: resumeData.phoneNo || resumeData.phoneno || '',
            email: resumeData.email || '',
            linkedin: resumeData.linkedIn || resumeData.linkedin || '',
            location: resumeData.location || '',
            website: resumeData.website || ''
        };
    } else {
        // Ensure contact fields are populated if they exist at root but not in contact
        if (!resumeData.contact.phone && (resumeData.phoneNo || resumeData.phoneno)) {
            resumeData.contact.phone = resumeData.phoneNo || resumeData.phoneno;
        }
        if (!resumeData.contact.email && resumeData.email) {
            resumeData.contact.email = resumeData.email;
        }
        if (!resumeData.contact.linkedin && (resumeData.linkedIn || resumeData.linkedin)) {
            resumeData.contact.linkedin = resumeData.linkedIn || resumeData.linkedin;
        }
        if (!resumeData.contact.location && resumeData.location) {
            resumeData.contact.location = resumeData.location;
        }
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
