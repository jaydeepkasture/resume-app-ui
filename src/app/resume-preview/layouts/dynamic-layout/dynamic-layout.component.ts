import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';
import { LayoutConfig } from '../../models/layout.model';
import { DynamicSectionComponent } from '../../components/dynamic-section/dynamic-section.component';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-dynamic-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicSectionComponent],
  template: `
    <div *ngIf="layoutConfig" class="resume-wrapper" [ngStyle]="dynamicStyles">
      
      <!-- DYNAMIC HEADER -->
      <div class="resume-header" [style.text-align]="layoutConfig.header.alignment">
        
        <!-- Name -->
        <input
          *ngIf="layoutConfig.header.name.visible"
          class="editable editable-name"
          [(ngModel)]="resume.name"
          (input)="autoSizeInput($event)"
          (focus)="onEdit.emit()" />
        
        <!-- Contact Information -->
        <div *ngIf="layoutConfig.header.contact.visible" 
             class="resume-contact" 
             [style.justify-content]="layoutConfig.header.alignment === 'center' ? 'center' : (layoutConfig.header.alignment === 'right' ? 'flex-end' : 'flex-start')">
          
          <ng-container *ngFor="let field of getVisibleContactFields(); let i = index">
            <!-- Separator -->
            <span class="separator" *ngIf="i > 0">{{ layoutConfig.header.contact.separator }}</span>
            <!-- Contact Field -->
            <input
              class="editable editable-contact editable-contact-inline"
              [(ngModel)]="resume[field]"
              (input)="autoSizeInput($event)"
              (focus)="onEdit.emit()" />
          </ng-container>

        </div>
      </div>

      <!-- HEADER DIVIDER -->
      <div *ngIf="layoutConfig.header.divider.enabled"
           class="header-divider"
           [style.height]="layoutConfig.header.divider.height"
           [style.background-color]="layoutConfig.header.divider.color"
           [style.width]="layoutConfig.header.divider.width"
           [style.margin-top]="layoutConfig.header.divider.marginTop"
           [style.margin-bottom]="layoutConfig.header.divider.marginBottom">
      </div>

      <!-- DYNAMIC SECTIONS -->
      <div class="resume-sections">
        <ng-container *ngFor="let section of layoutConfig.sections">
          <div class="section-wrapper" *ngIf="section.enabled">
             <!-- Inject Custom Title from Layout JSON via input to DynamicSectionComponent if possible, 
                  Right now DynamicSectionComponent uses hardcoded titles or handles its own logic, 
                  to fully support layout JSON we can pass [customTitle]="section.title" 
             -->
            <app-dynamic-section
              [type]="section.type"
              [resume]="resume"
              [customTitle]="section.title"
              (onEdit)="onEdit.emit()">
            </app-dynamic-section>
          </div>
        </ng-container>
      </div>

    </div>
    
    <!-- Loading State Placeholder -->
    <div *ngIf="isLoading" class="layout-loading">
       <p>Loading layout...</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .resume-wrapper {
      /* Dynamic variables injection happens here */
    }

    .resume-header {
      margin-bottom: var(--header-bottom, 16px);
    }

    .resume-contact {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      margin-top: 4px;
      font-family: var(--font-family, inherit);
      font-size: var(--contact-size, 14px);
      color: var(--text-primary, inherit);
      line-height: 1.4;
    }

    .separator {
      font-family: var(--font-family, inherit);
      font-size: var(--contact-size, 14px);
      color: var(--text-primary, inherit);
      padding: 0 0.5ch;
      flex-shrink: 0;
      opacity: 0.8;
    }

    .header-divider {
      width: 100%;
    }

    .section-wrapper {
      margin-bottom: var(--section-gap, 24px);
    }

    .section-wrapper:last-child {
      margin-bottom: 0;
    }

    /* ─── Editable Field Base ──────────────────────── */
    .editable {
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      color: inherit;
      padding: 0;
      margin: 0;
      box-sizing: content-box;
      min-width: 1px;
    }

    .editable:focus {
      background: rgba(0, 0, 0, 0.04);
      border-radius: 1px;
    }

    .editable-name {
      display: block;
      width: 100%;
      font-family: var(--font-family, inherit);
      font-size: var(--name-size, 32px);
      font-weight: var(--name-weight, bold);
      color: var(--primary-color, inherit);
      line-height: 1.1;
    }

    .editable-contact {
      font-family: var(--font-family, inherit);
      font-size: var(--contact-size, 14px);
      color: var(--text-primary, inherit);
    }

    .editable-contact-inline {
      width: auto;
    }
    
    .layout-loading {
      padding: 2rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class DynamicLayoutComponent implements OnInit, OnChanges {
  @Input() resume!: ResumeDto | any;
  @Input() layoutId!: string;
  @Output() onEdit = new EventEmitter<void>();

  layoutConfig: LayoutConfig | null = null;
  isLoading = false;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.fetchLayout();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['layoutId'] && !changes['layoutId'].firstChange) {
      this.fetchLayout();
    }
  }

  fetchLayout() {
    if (!this.layoutId) return;
    this.isLoading = true;
    this.layoutService.getLayoutConfig(this.layoutId).subscribe(config => {
      this.layoutConfig = config;
      this.isLoading = false;
      this.triggerAutoResize();
    });
  }

  get dynamicStyles() {
    if (!this.layoutConfig) return {};
    
    const styles = this.layoutConfig.styles;
    const header = this.layoutConfig.header;
    
    return {
      '--font-family': styles.fontFamily,
      '--primary-color': styles.primaryColor,
      '--text-primary': styles.textPrimary,
      '--header-bottom': styles.headerBottom,
      '--section-gap': styles.sectionGap,
      '--name-size': header.name.size,
      '--name-weight': header.name.weight,
      '--contact-size': header.contact.size
    };
  }

  getVisibleContactFields(): string[] {
    if (!this.layoutConfig || !this.resume) return [];
    // Only return fields that the layout JSON wants visible AND the user has filled in (to avoid blank fields acting weird)
    return this.layoutConfig.header.contact.visibleFields.filter(f => !!this.resume[f]);
  }

  autoSizeInput(event: any): void {
    const input = event.target;
    this.sizeInput(input);
  }

  private sizeInput(input: HTMLInputElement): void {
    const value = input.value || '';
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.style.font = window.getComputedStyle(input).font;
    tempSpan.innerText = value;
    document.body.appendChild(tempSpan);
    input.style.width = Math.ceil(tempSpan.getBoundingClientRect().width + 1) + 'px';
    document.body.removeChild(tempSpan);
  }

  triggerAutoResize() {
    setTimeout(() => {
      const inputs = document.querySelectorAll('.resume-header .editable-contact-inline, .resume-header .editable-name');
      inputs.forEach((el: any) => {
        if (el instanceof HTMLInputElement) {
          this.sizeInput(el);
        }
      });
    }, 100);
  }
}
