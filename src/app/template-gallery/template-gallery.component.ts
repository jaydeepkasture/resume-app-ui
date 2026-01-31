import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TemplateService } from '../resume-editor/template.service'; 
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';
import { ChatSidebarComponent } from '../components/chat-sidebar/chat-sidebar.component';

import { TemplatePreviewComponent } from './template-preview.component';

@Component({
  selector: 'app-template-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ChatSidebarComponent, TemplatePreviewComponent],
  templateUrl: './template-gallery.component.html',
  styleUrl: './template-gallery.component.css'
})
export class TemplateGalleryComponent implements OnInit {
  backendTemplates: any[] = [];
  filteredBackendTemplates: any[] = [];
  galleryViewMode: 'grid' | 'list' = 'grid';
  galleryFilter: 'all' | 'free' | 'form' = 'all';
  gallerySearch: string = '';

  constructor(
    private templateService: TemplateService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  // Sidebar state
  sidebarOpen = false;

  onSidebarToggled(isOpen: boolean): void {
    this.sidebarOpen = isOpen;
  }

  onChatSelected(chatId: string): void {
     console.log('Chat selected from gallery:', chatId);
     
     this.templateService.getChatSession(chatId).subscribe({
        next: (response: any) => {
          const initialData = response.data.resumeData ;
          console.log('📦 API Response:', response.data,initialData);
            if (initialData) {
                console.log('📦 Passing initial resume data to editor via service');
                this.templateService.setTempResumeData(initialData);
            }
          
            // Navigate to editor with chat session
            this.router.navigate(['/editor', chatId], { 
              queryParams: { templateId: response.data.templateId }
            });
        },
        error: (err) => console.error('Failed to load default template list', err)
     });
  }

  ngOnInit() {
    this.loadDefaultBackendTemplate();
  }

  loadDefaultBackendTemplate(): void {
      console.log('🔄 Loading backend templates...');
      this.templateService.getBackendTemplates(1, 100, 'asc').subscribe({ 
          next: (response: any) => {
              // Handle various response structures
              let templates: any[] = [];
              console.log('📦 API Response:', response);

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
              
              console.log('✅ Extracted templates:', templates.length);

              if (templates.length > 0) {
                 // Process templates BEFORE assigning to component state
                 templates.forEach(t => {
                     // Safety check for name
                     if (!t.templateName) t.templateName = 'Untitled Template';

                     // Verify or inject type
                     if (t.templateTypeId) {
                         t.type = t.templateTypeId;
                     }
                     // Fallback/Override for specific ID if backend data is missing type
                     if (t.id === '6973bcfbdf2766fbee178f68' || t.id === '69760da5141f61da2dbb924e') {
                         t.type = 2; // Form Edit
                         // Load preview HTML for form templates
                         this.loadFormTemplatePreview(t);
                     } else if (!t.type) {
                         t.type = 1; // Default to free if unknown
                     }
                 });
              }

              this.backendTemplates = templates;
              this.applyGalleryFilters();
              console.log('🔎 Filtered count:', this.filteredBackendTemplates.length);
          },
          error: (err) => console.error('Failed to load default template list', err)
      });
  }

  applyGalleryFilters() {
      this.filteredBackendTemplates = this.backendTemplates.filter(t => {
          const matchesSearch = !this.gallerySearch || t.templateName.toLowerCase().includes(this.gallerySearch.toLowerCase());
          const matchesFilter = this.galleryFilter === 'all' || 
                               (this.galleryFilter === 'free' && t.type === 1) ||
                               (this.galleryFilter === 'form' && t.type === 2);
          return matchesSearch && matchesFilter;
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
        // Sanitize potentially broken image links before displaying
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const images = doc.querySelectorAll('img');
        let hasChanges = false;
        
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && (src.includes('Document') && src.includes('_files') || src.startsWith('file:'))) {
                console.warn('Removing broken image link from preview:', src);
                img.remove();
                hasChanges = true;
            }
        });

        // Use sanitized HTML if changes were made, otherwise original (faster)
        template.htmlTemplate = hasChanges ? doc.documentElement.innerHTML : html;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.warn(`Preview HTML not found for template ${template.id}`, err);
      }
    });
  }

  onGalleryTemplateSelect(template: any) {
    console.log('Gallery Template Selected:', template);
    
    // Call API to create a new chat session with this template
    this.templateService.createChatSession(template.id).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          // Assuming response.data contains the chat object with _id
          const chatId = response.data._id || response.data.chatId;
          console.log('✅ Created new chat session:', chatId);
          
          // Check for initial/dummy resume data in the response and store it for the Editor
          const initialData = response.data.resumeData || response.data.current_resume || response.data.resume_data;
          if (initialData) {
              console.log('📦 Passing initial resume data to editor via service');
              this.templateService.setTempResumeData(initialData);
          }
          
          // Navigate to editor with chat session
          this.router.navigate(['/editor', chatId], { 
            queryParams: { templateId: template.id }
          });
          
        } else {
          console.error('❌ Failed to create chat session:', response.message);
          alert('Could not start a new session. Please try again.');
        }
      },
      error: (err) => {
        console.error('❌ Error creating chat session:', err);
        alert('Error connecting to server.');
      }
    });
  }
}
