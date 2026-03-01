import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';
import { LayoutConfig } from '../../models/layout.model';

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  previewClass: string;
  baseType: string;
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
        
        <div class="view-toggle">
          <button [class.active]="viewMode === 'grid'" (click)="viewMode = 'grid'">
             Grid View
          </button>
          <button [class.active]="viewMode === 'list'" (click)="viewMode = 'list'">
             List View
          </button>
        </div>
      </header>

      <div *ngIf="isLoading" class="loading-state">
        <p>Loading layouts...</p>
      </div>

      <div *ngIf="!isLoading" class="layout-grid" [ngClass]="{'list-view': viewMode === 'list'}">
        @for (layout of layouts; track layout.id) {
          <div class="layout-card" (click)="selectLayout(layout.id)">
            <div class="layout-preview" [ngClass]="layout.previewClass">
              <div class="preview-skeleton">
                <div class="header-blob"></div>
                <div class="content-blobs">
                  @if (layout.baseType === 'single-column') {
                    <div class="blob full"></div>
                    <div class="blob full"></div>
                    <div class="blob full"></div>
                  } @else if (layout.baseType === 'two-column') {
                    <div class="row">
                      <div class="blob half"></div>
                      <div class="blob half"></div>
                    </div>
                    <div class="row">
                      <div class="blob half"></div>
                      <div class="blob half"></div>
                    </div>
                  } @else if (layout.baseType === 'sidebar') {
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
      margin-bottom: 2rem;
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
      margin-bottom: 1.5rem;
    }

    .view-toggle {
      display: inline-flex;
      background: #e2e8f0;
      border-radius: 8px;
      padding: 4px;
      margin-bottom: 2rem;
    }

    .view-toggle button {
      background: transparent;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      color: #64748b;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .view-toggle button.active {
      background: white;
      color: #6366f1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .loading-state {
      text-align: center;
      padding: 4rem;
      color: #64748b;
      font-size: 1.2rem;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .layout-grid.list-view {
      grid-template-columns: 1fr;
      max-width: 800px;
    }

    .layout-grid.list-view .layout-card {
      flex-direction: row;
      align-items: center;
      padding-right: 2rem;
      padding-left: 1rem;
    }

    .layout-grid.list-view .layout-preview {
      width: 250px;
      height: 180px;
      padding: 1rem;
      flex-shrink: 0;
      background: transparent;
    }

    .layout-grid.list-view .layout-info {
      text-align: left;
      padding: 2rem;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 1rem;
    }

    .layout-grid.list-view .select-btn {
      width: auto;
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
export class LayoutSelectionComponent implements OnInit {
  layouts: LayoutOption[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  isLoading: boolean = true;

  constructor(private router: Router, private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.getLayouts(1, 100).subscribe({
      next: (response) => {
        if (response.status && response.data && response.data.length > 0) {
          this.layouts = response.data.map((config: LayoutConfig) => this.mapConfigToOption(config));
        } else {
          this.loadFallbackLayouts();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Failed to load layouts", err);
        this.loadFallbackLayouts();
        this.isLoading = false;
      }
    });
  }

  private mapConfigToOption(config: LayoutConfig): LayoutOption {
    let baseType = 'single-column';
    let description = 'Professional and clean structure.';
    let icon = 'view_headline';
    
    const lowerId = config.layoutId ? config.layoutId.toLowerCase() : '';
    
    if (lowerId.includes('two')) {
      baseType = 'two-column';
      description = 'Modern and space-efficient.';
      icon = 'view_column';
    } else if (lowerId.includes('side')) {
      baseType = 'sidebar';
      description = 'Highlights your profile with a sidebar.';
      icon = 'side_navigation';
    }
    
    return {
      id: config.layoutId,
      name: config.name || 'Untitled Layout',
      description: description,
      icon: icon,
      previewClass: `preview-${baseType.replace('-column', '')}`,
      baseType: baseType
    };
  }

  private loadFallbackLayouts() {
    this.layouts = [
      {
        id: 'single-column-standard',
        name: 'Single Column',
        description: 'Elegant and traditional. Perfect for academic or simple professional resumes.',
        icon: 'view_headline',
        previewClass: 'preview-single',
        baseType: 'single-column'
      },
      {
        id: 'two-column-standard',
        name: 'Two Column',
        description: 'Modern and space-efficient. Great for showing a lot of information clearly.',
        icon: 'view_column',
        previewClass: 'preview-two',
        baseType: 'two-column'
      },
      {
        id: 'sidebar-standard',
        name: 'Sidebar Layout',
        description: 'Premium and punchy. Highlights your profile and contact info in a dedicated sidebar.',
        icon: 'side_navigation',
        previewClass: 'preview-sidebar',
        baseType: 'sidebar'
      }
    ];
  }

  selectLayout(layoutType: string) {
    window.location.href = `https://localhost:1800/resume-preview?layoutType=${layoutType}&themeId=699ddd8ee2238e66906dce29`;
  }
}
