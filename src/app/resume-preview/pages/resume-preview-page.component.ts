import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { ResumeRendererComponent } from '../components/resume-renderer/resume-renderer.component';
import { ResumePreviewService } from '../services/resume-preview.service';
import { ResumeDto } from '../models/resume.model';
import { ResumeTemplate } from '../models/template.model';
import { TemplateDropdownComponent } from '../../components/template-dropdown/template-dropdown.component';
import { TemplateService, ResumeData } from '../../resume-editor/template.service';
import { ThemeService } from '../../theme-manager/theme.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-resume-preview-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ResumeRendererComponent, TemplateDropdownComponent],
  template: `
    <div class="page-container" [style]="pageStyle">
      <!-- Toolbar -->
      <div class="toolbar" *ngIf="!isLoading && !error && resume && template" [style.border-top-color]="pageStyle['--primary-color']">
        <div class="toolbar-group">
          <div class="toolbar-logo-item">
            <div class="logo-text">1min<span>cv.com</span></div>
          </div>
          <button class="toolbar-btn back-btn" (click)="goBack()" title="Back to Gallery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            <span class="back-text">Back</span>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <button 
            class="toolbar-btn undo-btn" 
            (click)="undo()" 
            [disabled]="!undoEnabled"
            title="Undo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7v6h6"></path>
              <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"></path>
            </svg>
          </button>
          <button 
            class="toolbar-btn redo-btn" 
            (click)="redo()" 
            [disabled]="!redoEnabled"
            title="Redo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 7v6h-6"></path>
              <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"></path>
            </svg>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <button class="toolbar-btn save-btn" (click)="saveResume()" [disabled]="isSaving" title="Save Changes">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v13a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            <span style="font-weight: 600;">{{ isSaving ? 'Saving...' : 'Save' }}</span>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <app-template-dropdown 
            [currentTemplateName]="template.name || 'Select Template'" 
            (templateSelected)="onTemplateSelected($event)">
          </app-template-dropdown>
        </div>

        <div class="toolbar-divider"></div>

        <!-- AI Quick Actions -->
        <div class="toolbar-group ai-quick-actions">
          <button class="toolbar-btn ai-btn" (click)="applyQuickPrompt('summary')" [disabled]="isSending" title="Improve Summary">
            ✨ <span class="btn-label">Summary</span>
          </button>
          <button class="toolbar-btn ai-btn" (click)="applyQuickPrompt('experience')" [disabled]="isSending" title="Enhance Experience">
            💼 <span class="btn-label">Experience</span>
          </button>
          <button class="toolbar-btn ai-btn" (click)="applyQuickPrompt('skills')" [disabled]="isSending" title="Suggest Skills">
            🛠️ <span class="btn-label">Skills</span>
          </button>
          <button class="toolbar-btn ai-btn" (click)="applyQuickPrompt('professional')" [disabled]="isSending" title="Professional Tone">
            👔 <span class="btn-label">Tone</span>
          </button>
          <button class="toolbar-btn ai-btn" (click)="applyQuickPrompt('grammar')" [disabled]="isSending" title="Fix Grammar">
            ✅ <span class="btn-label">Grammar</span>
          </button>
        </div>

        <div class="toolbar-divider"></div>

        <div class="toolbar-group">
          <button class="toolbar-btn download-btn" (click)="downloadPdf()" title="Download as PDF">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span class="download-label">Download PDF</span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="state-container">
        <div class="loading-spinner"></div>
        <p class="state-message">Loading resume...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !isLoading" class="state-container">
        <div class="error-icon">⚠</div>
        <p class="state-message error-text">{{ error }}</p>
        <button class="retry-btn" (click)="loadData()">Retry</button>
      </div>

      <!-- Resume Preview -->
      <div *ngIf="!isLoading && !error && resume && template" class="preview-container">
        <div class="resume-paper" id="resume-paper" (focusin)="onFocusIn()">
          <app-resume-renderer
            [resume]="resume"
            [template]="template"
            (onEdit)="prepareEdit()">
          </app-resume-renderer>
        </div>
      </div>

      <!-- AI Chat Interface -->
      <div class="chat-interface" *ngIf="!isLoading && !error && resume && template">
        <div class="chat-container">
          <div class="chat-input-wrapper">
            <textarea 
              class="chat-input" 
              [(ngModel)]="chatInput" 
              (keydown)="handleChatKeydown($event)"
              placeholder="Ask AI to update your resume (e.g., 'Make the summary more professional')"
              [disabled]="isSending"
              rows="1"></textarea>
            <button 
              class="chat-send-btn" 
              (click)="sendMessage()" 
              [disabled]="!chatInput.trim() || isSending">
              <svg *ngIf="!isSending" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span *ngIf="isSending" class="spinner"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './resume-preview-page.component.css'
})
export class ResumePreviewPageComponent implements OnInit {

  resume: ResumeDto | null = null;
  template: ResumeTemplate | null = null;
  isLoading = true;
  error: string | null = null;
  isSaving = false;
  isSending = false;
  chatInput = '';
  pageStyle: any = {};

  // History management
  public historyStack: ResumeDto[] = [];
  public redoStack: ResumeDto[] = [];
  public undoEnabled = false;
  public redoEnabled = false;

  private resumeId?: string;
  private templateId?: string;
  private themeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private previewService: ResumePreviewService,
    private templateService: TemplateService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resumeId = this.route.snapshot.params['resumeId'];
    this.templateId = this.route.snapshot.params['templateId'];
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;

    this.themeId = this.route.snapshot.queryParamMap.get('themeId');
    const layoutType = this.route.snapshot.queryParamMap.get('layoutType');
    const useEmpty = this.route.snapshot.queryParamMap.get('empty') === 'true';

    forkJoin({
      resume: useEmpty ? of(this.getEmptyResume()) : this.previewService.getResume().pipe(
        catchError(err => {
          console.warn('Could not load user resume, falling back to mock');
          return of((this.previewService as any).getMockResume());
        })
      ),
      template: this.previewService.getTemplate(this.templateId),
      theme: this.themeId ? this.themeService.getThemeById(this.themeId).pipe(
        catchError(err => {
          console.error('Failed to load theme:', err);
          return of(null);
        })
      ) : of(null)
    }).subscribe({
      next: ({ resume, template, theme }) => {
        console.log('✅ Loaded resume:', resume?.name);
        console.log('✅ Loaded template:', template?.name);
        
        this.resume = resume;
        this.template = template;

        // Apply layoutType if provided in query params
        if (layoutType && this.template) {
           this.template = {
              ...this.template,
              layoutType: layoutType as any,
              layout: layoutType as any
           };
        }

        // Apply theme if provided
        const extractedTheme = (theme as any)?.data || theme;
        if (extractedTheme && extractedTheme.theme && this.template) {
          console.log('🎨 Applying theme:', extractedTheme.name);
          
          // Create a new reference for this.template to trigger change detection
          this.template = {
            ...this.template,
            theme: {
              ...this.template.theme,
              ...extractedTheme.theme
            }
          };

          if (extractedTheme.decorations) {
            this.template.decorations = {
              ...this.template.decorations,
              ...extractedTheme.decorations
            };
          }

          // Apply to the whole page
          const primaryColor = extractedTheme.theme?.colors?.primary;
          if (primaryColor) {
            this.pageStyle = {
              '--primary-color': primaryColor,
              '--primary-hover': this.adjustBrightness(primaryColor, -20),
              '--primary-light': this.adjustBrightness(primaryColor, 90),
              '--primary-border': this.adjustBrightness(primaryColor, 80),
              '--page-bg': this.adjustBrightness(primaryColor, 95)
            };
          }
        }

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Failed to load resume preview:', err);
        this.error = err.message || 'Failed to load resume data. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private getEmptyResume(): ResumeDto {
    return {
      name: 'Your Name',
      role: 'Your Professional Role',
      phoneNo: '(+91) 000-000-0000',
      email: 'hello@example.com',
      location: 'City, Country',
      linkedIn: 'linkedin.com/in/username',
      gitHub: 'github.com/username',
      summary: 'Write a brief overview of your professional background and key achievements...',
      experience: [
        {
          position: 'Work Position',
          company: 'Company Name',
          from: 'MM/YYYY',
          to: 'Present',
          description: ['Key achievement or responsibility...', 'Another major accomplishment...']
        }
      ],
      skills: ['Skill One', 'Skill Two', 'Skill Three'],
      education: [
        {
          degree: 'Your Degree',
          field: 'Field of Study',
          institution: 'University Name',
          year: 'YYYY'
        }
      ]
    };
  }

  goBack(): void {
    this.router.navigate(['/templates']);
  }

  onTemplateSelected(newTemplateId: string): void {
    // Save current state (including data) before switching templates
    this.saveToHistory();
    
    this.router.navigate(['/resume-preview', this.resumeId || 'default', newTemplateId], {
      replaceUrl: true
    }).then(() => {
      this.templateId = newTemplateId;
      this.loadData();
    });
  }

  // ─── History Management ───────────────────────────────────

  saveToHistory(): void {
    if (this.resume) {
      const currentState = JSON.stringify(this.resume);
      // Don't save if state hasn't changed from last history entry
      if (this.historyStack.length > 0 && JSON.stringify(this.historyStack[this.historyStack.length - 1]) === currentState) {
        return;
      }

      console.log('💾 Saving state to history. Stack size before:', this.historyStack.length);
      this.historyStack.push(JSON.parse(currentState));
      if (this.historyStack.length > 50) {
        this.historyStack.shift();
      }
      this.redoStack = []; 
      this.updateButtonStates();
    }
  }

  updateButtonStates(): void {
    this.undoEnabled = this.historyStack.length > 0;
    this.redoEnabled = this.redoStack.length > 0;
    this.cdr.detectChanges();
    console.log(`🔘 Button states updated: Undo=${this.undoEnabled}, Redo=${this.redoEnabled}`);
  }

  onFocusIn(): void {
    console.log('🎯 FocusIn detected in resume paper');
    this.saveToHistory();
  }

  prepareEdit(): void {
    console.log('📝 prepareEdit called from layout');
    this.saveToHistory();
  }

  undo(): void {
    console.log('↩️ Undo requested');
    if (this.undoEnabled && this.resume) {
      const prevState = this.historyStack.pop();
      if (prevState) {
        this.redoStack.push(JSON.parse(JSON.stringify(this.resume)));
        this.resume = prevState;
        this.updateButtonStates();
        console.log('✅ Undo complete');
      }
    }
  }

  redo(): void {
    console.log('↪️ Redo requested');
    if (this.redoEnabled && this.resume) {
      const nextState = this.redoStack.pop();
      if (nextState) {
        this.historyStack.push(JSON.parse(JSON.stringify(this.resume)));
        this.resume = nextState;
        this.updateButtonStates();
        console.log('✅ Redo complete');
      }
    }
  }

  canUndo(): boolean {
    return this.historyStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  saveResume(): void {
    if (this.isSaving || !this.resume || !this.templateId || !this.resumeId) return;

    this.isSaving = true;
    // Map ResumeDto to ResumeData format expected by TemplateService
    const resumeData: ResumeData = {
      ...this.resume,
      experience: this.resume.experience.map(exp => ({
        ...exp,
        description: Array.isArray(exp.description) ? exp.description.join('\n') : exp.description
      }))
    } as any;

    this.templateService.saveResume(resumeData, this.templateId, this.resumeId).subscribe({
      next: () => {
        this.isSaving = false;
        console.log('✅ Resume saved successfully');
      },
      error: (err) => {
        console.error('❌ Failed to save resume:', err);
        this.isSaving = false;
        alert('Failed to save resume. Please try again.');
      }
    });
  }

  async downloadPdf(): Promise<void> {
    if (!this.resume) return;

    // Use current themeId if available, otherwise fallback to templateId
    const activeThemeId = this.themeId || this.templateId;
    if (!activeThemeId) {
      alert('Cannot generate PDF: Theme or Template ID is missing.');
      return;
    }

    console.log('🚀 Requesting server-side PDF generation...', { themeId: activeThemeId });
    
    this.previewService.generatePdf(activeThemeId, this.resume).subscribe({
      next: (result) => {
        try {
          // 1. Convert Base64 string to a Blob
          const byteCharacters = atob(result.fileData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          // 2. Create a download link and trigger it
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = result.fileName || `resume_${Date.now()}.pdf`;
          
          document.body.appendChild(link);
          link.click();
          
          // 3. Cleanup
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          console.log('✅ PDF Downloaded successfully:', result.fileName);
        } catch (e) {
          console.error('❌ Error processing PDF data:', e);
          alert('Failed to process the generated PDF.');
        }
      },
      error: (err) => {
        console.error('❌ PDF generation failed:', err);
        alert('Failed to generate PDF on server. Please try again.');
      }
    });
  }

  handleChatKeydown(event: KeyboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
      setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }, 0);
    } else {
      setTimeout(() => {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
      }, 0);
    }
  }

  /**
   * Apply a quick AI prompt from the toolbar
   * @param promptType The type of enhancement to apply
   */
  applyQuickPrompt(promptType: string): void {
    let message = '';
    switch (promptType) {
      case 'summary':
        message = 'Please improve my professional summary to be more impactful and professional, highlighting my core strengths.';
        break;
      case 'experience':
        message = 'Enhance my work experience descriptions. Use strong action verbs, quantify achievements where possible, and make them more concise.';
        break;
      case 'skills':
        message = 'Based on my experience, suggest relevant technical and soft skills that I should add to my resume.';
        break;
      case 'professional':
        message = 'Please review my entire resume and adjust the tone to be highly professional and polished throughout.';
        break;
      case 'grammar':
        message = 'Check my resume for any grammatical errors, typos, or punctuation issues and fix them.';
        break;
      default:
        return;
    }
    
    if (message) {
      this.sendMessage(message);
    }
  }

  sendMessage(customMessage?: string): void {
    const text = customMessage || this.chatInput;
    if (!text.trim() || !this.resume || !this.resumeId || this.isSending) return;

    // Save current state before AI modification
    this.saveToHistory();

    this.isSending = true;
    if (!customMessage) {
        this.chatInput = '';
    }
    
    // Map ResumeDto to ResumeData
    const resumeData: ResumeData = {
      ...this.resume,
      experience: this.resume.experience.map(exp => ({
        ...exp,
        description: Array.isArray(exp.description) ? exp.description.join('\n') : exp.description
      }))
    } as any;

    this.templateService.enhanceResume(
      this.resumeId,
      text,
      resumeData,
      undefined,
      this.templateId
    ).subscribe({
      next: (response) => {
        if (response.status && response.data && response.data.currentResume) {
          // Map back to ResumeDto
          const enhanced = response.data.currentResume;
          this.resume = {
            ...enhanced,
            experience: (enhanced.experience || []).map((exp: any) => ({
              ...exp,
              description: Array.isArray(exp.description) ? exp.description : [exp.description]
            }))
          } as any;
          this.isSending = false;
          this.cdr.detectChanges();
        } else {
          alert(response.error || response.message || 'Failed to enhance resume.');
          this.isSending = false;
        }
      },
      error: (err) => {
        console.error('❌ Enhancement failed:', err);
        alert('Failed to connect to AI service. Please try again.');
        this.isSending = false;
      }
    });
  }

  private adjustBrightness(hex: string, percent: number): string {
    // Basic hex brightness adjustment
    if (!hex || !hex.startsWith('#')) return hex;
    
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.round(r * (100 + percent) / 100);
    g = Math.round(g * (100 + percent) / 100);
    b = Math.round(b * (100 + percent) / 100);

    r = Math.min(Math.max(0, r), 255);
    g = Math.min(Math.max(0, g), 255);
    b = Math.min(Math.max(0, b), 255);

    const rr = r.toString(16).padStart(2, '0');
    const gg = g.toString(16).padStart(2, '0');
    const bb = b.toString(16).padStart(2, '0');

    return `#${rr}${gg}${bb}`;
  }
}
