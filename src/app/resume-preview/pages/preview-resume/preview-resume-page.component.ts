import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResumeRendererComponent } from '../../components/resume-renderer/resume-renderer.component';
import { ThemeSliderComponent } from '../../components/theme-slider/theme-slider.component';
import { ResumeDto, ExperienceDto, EducationDto } from '../../models/resume.model';
import { ResumeTemplate } from '../../models/template.model';
import { Theme } from '../../../theme-manager/models/theme.model';

@Component({
  selector: 'app-preview-resume-page',
  standalone: true,
  imports: [CommonModule, ResumeRendererComponent, ThemeSliderComponent],
  template: `
    <div class="preview-page">
      <!-- Toolbar Top -->
      <nav class="top-nav">
        <div class="nav-left">
          <button class="back-btn" (click)="goBack()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Change Layout
          </button>
          <span class="layout-badge">{{ currentLayout }} Layout</span>
        </div>
        <div class="nav-center">
            <span class="logo">1min<span>cv.com</span></span>
        </div>
        <div class="nav-right">
            <button class="primary-btn">Download PDF</button>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="preview-main">
        <div class="resume-workspace">
          @if (resume && template) {
            <div class="resume-paper shadow-2xl">
              <app-resume-renderer
                [resume]="resume"
                [template]="template">
              </app-resume-renderer>
            </div>
          } @else if (isLoading) {
            <div class="loading-state">
              <div class="skeleton-resume"></div>
              <p>Preparing your preview...</p>
            </div>
          } @else if (error) {
            <div class="error-state">
              <p>{{ error }}</p>
              <button (click)="loadData()">Retry</button>
            </div>
          }
        </div>
      </main>

      <!-- Vertical Theme Slider -->
      <app-theme-slider 
        [layoutType]="currentLayout"
        (themeSelected)="onThemeChange($event)">
      </app-theme-slider>
    </div>
  `,
  styles: [`
    .preview-page {
      min-height: 100vh;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    .top-nav {
      height: 64px;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .nav-left, .nav-right {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    }

    .nav-right {
        justify-content: flex-end;
    }

    .nav-center {
        flex: 1;
        text-align: center;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: 800;
        color: #1e293b;
    }

    .logo span { color: #6366f1; }

    .layout-badge {
        background: #f1f5f9;
        color: #64748b;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      color: #64748b;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s;
    }

    .back-btn:hover { color: #6366f1; }

    .primary-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.625rem 1.25rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .primary-btn:hover { background: #4f46e5; }

    .preview-main {
      flex: 1;
      padding: 3rem 1rem;
      display: flex;
      justify-content: center;
      overflow-y: auto;
    }

    .resume-workspace {
      width: 100%;
      max-width: 900px;
      display: flex;
      justify-content: center;
    }

    .resume-paper {
        background: white;
        width: 210mm; /* A4 width approx */
        min-height: 297mm; /* A4 height approx */
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        margin-bottom: 4rem;
        transform-origin: top center;
    }

    .loading-state, .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5rem;
        color: #64748b;
    }

    .skeleton-resume {
        width: 210mm;
        height: 297mm;
        background: #f1f5f9;
        border-radius: 8px;
        margin-bottom: 2rem;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 0.8; }
        100% { opacity: 0.6; }
    }
  `]
})
export class PreviewResumePageComponent implements OnInit {
  resume: ResumeDto | null = null;
  template: ResumeTemplate | null = null;
  currentLayout: string = 'single-column';
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentLayout = params['layoutType'] || 'single-column';
      this.loadData();
    });
  }

  loadData() {
    this.isLoading = true;
    this.error = null;

    // Fetch default resume JSON from assets
    this.http.get<any>('assets/resume-data.json').subscribe({
      next: (data) => {
        // Map JSON to ResumeDto (misspellings in JSON: experiance, eduction)
        this.resume = {
          name: data.name,
          role: data.role || 'Software Developer', // Fallback if not in JSON
          phoneNo: data.phoneno,
          email: data.email,
          location: data.location,
          linkedIn: data.linkedin,
          gitHub: data.github,
          summary: data.summary,
          skills: data.skills,
          experience: (data.experiance || []).map((exp: any) => ({
            company: exp.company,
            position: exp.position,
            from: exp.from,
            to: exp.to,
            description: Array.isArray(exp.description) ? exp.description : [exp.description]
          })),
          education: (data.eduction || []).map((edu: any) => ({
            degree: edu.degree,
            field: edu.field,
            institution: edu.institution,
            year: edu.year
          }))
        };

        // Initialize template with selected layout
        this.template = {
          id: Date.now(),
          name: 'Preview Template',
          layout: this.currentLayout as 'single-column' | 'two-column' | 'sidebar',
          layoutType: this.currentLayout as 'single-column' | 'two-column' | 'sidebar',
          sectionOrder: ['summary', 'experience', 'skills', 'education'],
          theme: {
            colors: {
                primary: '#6366f1',
                textPrimary: '#1e293b'
            },
            typography: {
                fontFamily: 'Inter',
                name: { size: '32px', weight: '800' },
                contact: { size: '14px' },
                sectionTitle: { size: '18px', weight: '700' },
                body: { size: '14px', lineHeight: '1.6' }
            },
            spacing: {
                headerBottom: '20px',
                sectionGap: '24px'
            }
          },
          decorations: {
            headerDivider: {
                enabled: false,
                height: '1px',
                color: '#e2e8f0',
                marginTop: '10px',
                marginBottom: '10px'
            }
          }
        };

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load default resume data:', err);
        this.error = 'Failed to load resume data.';
        this.isLoading = false;
      }
    });
  }

  onThemeChange(theme: Theme) {
    if (this.template) {
      // Force change detection by creating new object
      this.template = {
        ...this.template,
        theme: {
          ...theme.theme
        }
      };
      
      // Update CSS variables for the page theme if needed (already handled by ResumeRenderer? let's check)
      // ResumeRenderer handles its own theme application to CSS variables.
    }
  }

  goBack() {
    this.router.navigate(['/layouts']);
  }
}
