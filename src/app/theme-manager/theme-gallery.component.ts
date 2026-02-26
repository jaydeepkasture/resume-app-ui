import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from './theme.service';
import { Theme } from './models/theme.model';

@Component({
  selector: 'app-theme-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="theme-gallery-container">
      <header class="gallery-header">
        <div class="header-content">
          <h1>Theme Gallery</h1>
          <p>Choose or customize a style for your resume</p>
        </div>
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="onSearch()" 
              placeholder="Search themes..."
              class="search-input"
            />
          </div>
          <button class="btn-primary" (click)="onCreateNew()">+ Create Theme</button>
        </div>
      </header>

      <div class="gallery-grid" *ngIf="!isLoading; else loading">
        <div class="theme-card" *ngFor="let theme of themes" (click)="onSelectTheme(theme)">
          <div class="theme-preview" [style.background-color]="theme.theme?.colors?.primary || '#eee'">
            <div class="preview-content">
              <span class="preview-text" [style.color]="theme.theme?.colors?.textPrimary || '#333'">Aa</span>
            </div>
          </div>
          <div class="theme-info">
            <h3>{{ theme.name }}</h3>
            <div class="card-actions">
              <button class="btn-use" (click)="onUseTheme($event, theme)">Use Theme</button>
              <button class="btn-use empty" (click)="onUseTheme($event, theme, true)">Use Empty</button>
              <div class="action-icons">
                <button class="btn-icon" (click)="onEdit($event, theme)" title="Edit">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button class="btn-icon delete" (click)="onDelete($event, theme)" title="Delete">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ng-template #loading>
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading themes...</p>
        </div>
      </ng-template>

      <div class="pagination" *ngIf="totalCount > pageSize">
        <button [disabled]="currentPage === 1" (click)="onPageChange(currentPage - 1)">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button [disabled]="currentPage === totalPages" (click)="onPageChange(currentPage + 1)">Next</button>
      </div>
    </div>
  `,
  styles: [`
    .theme-gallery-container {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .gallery-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 40px;
      gap: 20px;
    }

    .header-content h1 {
      font-size: 32px;
      font-weight: 800;
      color: #1a1a1a;
      margin: 0 0 8px 0;
    }

    .header-content p {
      color: #666;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .search-input {
      padding: 10px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      width: 250px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: #007bff;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 24px;
    }

    .theme-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      border: 1px solid #eee;
    }

    .theme-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    .theme-preview {
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
    }

    .preview-content {
      width: 60px;
      height: 60px;
      background: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .preview-text {
      font-size: 24px;
      font-weight: 800;
    }

    .theme-info {
      padding: 16px;
    }

    .theme-info h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 12px 0;
      color: #333;
    }

    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .btn-use {
      width: 100%;
      padding: 8px;
      background: var(--primary-color, #007bff);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .btn-use:hover {
      opacity: 0.9;
    }

    .btn-use.empty {
      background: white;
      color: #555;
      border: 1px solid #ddd;
    }

    .btn-use.empty:hover {
      background: #f8f9fa;
    }

    .action-icons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      border-top: 1px solid #f0f0f0;
      padding-top: 10px;
      margin-top: 2px;
    }

    .btn-icon {
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #666;
      padding: 0;
    }

    .btn-icon:hover {
      background: #e9ecef;
      color: #333;
    }

    .btn-icon.delete:hover {
      background: #fff5f5;
      color: #dc3545;
      border-color: #ffc9c9;
    }

    .loading-state {
      text-align: center;
      padding: 60px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    .pagination {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
  `]
})
export class ThemeGalleryComponent implements OnInit {
  themes: Theme[] = [];
  isLoading = true;
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.isLoading = true;
    this.themeService.getThemes(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (res: any) => {
        // Handle both wrapped { status, data: { items } } and direct { items } responses
        const responseData = res.data || res;
        this.themes = responseData.items || [];
        this.totalCount = responseData.totalCount || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load themes', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadThemes();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadThemes();
  }

  onCreateNew(): void {
    this.router.navigate(['/themes', 'new']);
  }

  onUseTheme(event: Event, theme: Theme, isEmpty: boolean = false): void {
    event.stopPropagation();
    console.log('Using theme:', theme.id, 'isEmpty:', isEmpty);
    this.router.navigate(['/resume-preview'], { 
      queryParams: { 
        themeId: theme.id,
        empty: isEmpty ? 'true' : undefined
      }
    });
  }

  onSelectTheme(theme: Theme): void {
    console.log('Selected theme:', theme);
  }

  onEdit(event: Event, theme: Theme): void {
    event.stopPropagation();
    this.router.navigate(['/themes', theme.id]);
  }

  onDelete(event: Event, theme: Theme): void {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete theme "${theme.name}"?`)) {
      this.themeService.deleteTheme(theme.id).subscribe({
        next: () => {
          this.loadThemes();
        },
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
}
