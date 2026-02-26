import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../theme-manager/theme.service';
import { Theme } from '../../../theme-manager/models/theme.model';

@Component({
  selector: 'app-theme-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-slider" [class.open]="isOpen">
      <div class="slider-toggle" (click)="toggleSlider()">
        <svg *ngIf="!isOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <svg *ngIf="isOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </div>

      <div class="slider-content">
        <div class="slider-header">
            <h3>Style Presets</h3>
            <p>Select a theme to apply</p>
        </div>

        <div class="themes-list" (scroll)="onScroll($event)">
          @for (theme of themes; track theme.id) {
            <div 
              class="theme-card" 
              [class.active]="activeThemeId === theme.id"
              (click)="onThemeSelect(theme)">
              <div class="theme-preview" [style.background-color]="theme.theme.colors.primary">
                @if (theme.theme.colors.primary) {
                    <div class="color-bubbles">
                        <div class="bubble secondary" [style.background-color]="theme.theme.colors.textPrimary"></div>
                        <div class="bubble accent" [style.background-color]="theme.theme.colors.primary"></div>
                    </div>
                }
              </div>
              <div class="theme-info">
                <span class="theme-name">{{ theme.name }}</span>
              </div>
            </div>
          }

          @if (isLoading) {
            <div class="loader">
              <div class="spinner"></div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .theme-slider {
      position: fixed;
      right: -320px;
      top: 0;
      width: 320px;
      height: 100vh;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.05);
      border-left: 1px solid rgba(255, 255, 255, 0.3);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      display: flex;
    }

    .theme-slider.open {
      transform: translateX(-320px);
    }

    .slider-toggle {
      position: absolute;
      left: -54px;
      top: 50%;
      transform: translateY(-50%);
      width: 54px;
      height: 54px;
      background: white;
      border-radius: 16px 0 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: -4px 0 15px rgba(0, 0, 0, 0.05);
      color: #6366f1;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-right: none;
    }

    .slider-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
    }

    .slider-header {
        margin-bottom: 2rem;
    }

    .slider-header h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 0.25rem;
    }

    .slider-header p {
        font-size: 0.875rem;
        color: #64748b;
    }

    .themes-list {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .themes-list::-webkit-scrollbar {
      width: 4px;
    }

    .themes-list::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 4px;
    }

    .theme-card {
      background: white;
      border-radius: 16px;
      padding: 0.75rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.2s;
      border: 2px solid transparent;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .theme-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border-color: #e2e8f0;
    }

    .theme-card.active {
      border-color: #6366f1;
      background: #f5f3ff;
    }

    .theme-preview {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .color-bubbles {
        display: flex;
        gap: 2px;
    }

    .bubble {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.2);
    }

    .theme-info {
        flex: 1;
    }

    .theme-name {
      font-weight: 600;
      color: #334155;
      font-size: 0.95rem;
    }

    .loader {
        padding: 1rem;
        display: flex;
        justify-content: center;
    }

    .spinner {
        width: 24px;
        height: 24px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
  `]
})
export class ThemeSliderComponent implements OnInit {
  @Input() layoutType: string = '';
  @Output() themeSelected = new EventEmitter<Theme>();

  themes: Theme[] = [];
  activeThemeId: string = '';
  isOpen = true;
  isLoading = false;
  currentPage = 1;
  pageSize = 5;
  hasMore = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.loadThemes();
  }

  loadThemes() {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;
    this.themeService.getThemes(this.currentPage, this.pageSize, '', this.layoutType)
      .subscribe({
        next: (response) => {
          if (response.status && response.data) {
            const newThemes = response.data.items || [];
            this.themes = [...this.themes, ...newThemes];
            this.hasMore = this.themes.length < (response.data.totalCount || 0);
            this.currentPage++;
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load themes:', err);
          this.isLoading = false;
        }
      });
  }

  onScroll(event: any) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
      this.loadThemes();
    }
  }

  onThemeSelect(theme: Theme) {
    this.activeThemeId = theme.id;
    this.themeSelected.emit(theme);
  }

  toggleSlider() {
    this.isOpen = !this.isOpen;
  }
}
