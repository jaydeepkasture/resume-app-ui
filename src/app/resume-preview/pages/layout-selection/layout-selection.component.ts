import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  previewClass: string;
}

@Component({
  selector: 'app-layout-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="layout-selection-container">
      <header class="selection-header">
        <h1>Choose Your Resume <span>Structure</span></h1>
        <p>Select a layout that best represents your professional journey. You can change themes later.</p>
      </header>

      <div class="layout-grid">
        @for (layout of layouts; track layout.id) {
          <div class="layout-card" (click)="selectLayout(layout.id)">
            <div class="layout-preview" [ngClass]="layout.previewClass">
              <div class="preview-skeleton">
                <div class="header-blob"></div>
                <div class="content-blobs">
                  @if (layout.id === 'single-column') {
                    <div class="blob full"></div>
                    <div class="blob full"></div>
                    <div class="blob full"></div>
                  } @else if (layout.id === 'two-column') {
                    <div class="row">
                      <div class="blob half"></div>
                      <div class="blob half"></div>
                    </div>
                    <div class="row">
                      <div class="blob half"></div>
                      <div class="blob half"></div>
                    </div>
                  } @else if (layout.id === 'sidebar') {
                    <div class="sidebar-row">
                      <div class="blob side"></div>
                      <div class="blob main"></div>
                    </div>
                    <div class="sidebar-row">
                      <div class="blob side"></div>
                      <div class="blob main"></div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div class="layout-info">
              <h3>{{ layout.name }}</h3>
              <p>{{ layout.description }}</p>
              <button class="select-btn">Select Layout</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .layout-selection-container {
      min-height: 100vh;
      background: radial-gradient(circle at top right, #f8faff 0%, #eef2ff 100%);
      padding: 4rem 2rem;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .selection-header {
      text-align: center;
      margin-bottom: 4rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .selection-header h1 {
      font-size: 3rem;
      font-weight: 800;
      color: #1a1c2d;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .selection-header h1 span {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .selection-header p {
      font-size: 1.125rem;
      color: #64748b;
      line-height: 1.6;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .layout-card {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
    }

    .layout-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.3);
    }

    .layout-preview {
      height: 240px;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .layout-preview::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
      z-index: 1;
    }

    .preview-skeleton {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      z-index: 2;
    }

    .header-blob {
      height: 20px;
      width: 60%;
      background: #e2e8f0;
      border-radius: 4px;
      margin: 0 auto;
    }

    .blob {
      background: #f1f5f9;
      border-radius: 4px;
      height: 12px;
    }

    .blob.full { width: 100%; margin-bottom: 8px;}
    .blob.half { width: 45%; margin-bottom: 8px;}
    .blob.side { width: 30%; height: 80px;}
    .blob.main { width: 65%; height: 80px;}

    .row {
      display: flex;
      justify-content: space-between;
    }

    .sidebar-row {
      display: flex;
      gap: 5%;
    }

    .layout-info {
      padding: 2rem;
      text-align: center;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .layout-info h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.75rem;
    }

    .layout-info p {
      color: #64748b;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .select-btn {
      background: #f8fafc;
      color: #6366f1;
      border: 2px solid #e2e8f0;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.2s;
      width: 100%;
    }

    .layout-card:hover .select-btn {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
      box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.39);
    }
  `]
})
export class LayoutSelectionComponent {
  layouts: LayoutOption[] = [
    {
      id: 'single-column',
      name: 'Single Column',
      description: 'Elegant and traditional. Perfect for academic or simple professional resumes.',
      icon: 'view_headline',
      previewClass: 'preview-single'
    },
    {
      id: 'two-column',
      name: 'Two Column',
      description: 'Modern and space-efficient. Great for showing a lot of information clearly.',
      icon: 'view_column',
      previewClass: 'preview-two'
    },
    {
      id: 'sidebar',
      name: 'Sidebar Layout',
      description: 'Premium and punchy. Highlights your profile and contact info in a dedicated sidebar.',
      icon: 'side_navigation',
      previewClass: 'preview-sidebar'
    }
  ];

  constructor(private router: Router) {}

  selectLayout(layoutType: string) {
    window.location.href = `https://localhost:1800/resume-preview?layoutType=${layoutType}&themeId=699ddd8ee2238e66906dce29`;
  }
}
