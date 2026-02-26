import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeDto } from '../../models/resume.model';
import { ResumeTemplate } from '../../models/template.model';
import { SingleColumnLayoutComponent } from '../../layouts/single-column/single-column-layout.component';
import { TwoColumnLayoutComponent } from '../../layouts/two-column/two-column-layout.component';
import { SidebarLayoutComponent } from '../../layouts/sidebar/sidebar-layout.component';

@Component({
  selector: 'app-resume-renderer',
  standalone: true,
  imports: [CommonModule, SingleColumnLayoutComponent, TwoColumnLayoutComponent, SidebarLayoutComponent],
  template: `
    <ng-container [ngSwitch]="resolvedLayout">
      <app-single-column-layout
        *ngSwitchCase="'single-column'"
        [resume]="resume"
        [template]="template"
        (onEdit)="onEdit.emit()">
      </app-single-column-layout>

      <app-two-column-layout
        *ngSwitchCase="'two-column'"
        [resume]="resume"
        [template]="template"
        (onEdit)="onEdit.emit()">
      </app-two-column-layout>

      <app-sidebar-layout
        *ngSwitchCase="'sidebar'"
        [resume]="resume"
        [template]="template"
        (onEdit)="onEdit.emit()">
      </app-sidebar-layout>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ResumeRendererComponent implements OnChanges {
  @Input() resume!: ResumeDto;
  @Input() template!: ResumeTemplate;
  @Output() onEdit = new EventEmitter<void>();

  // Handles difference between 'layout' and 'layoutType' from backend
  get resolvedLayout() {
    return this.template?.layoutType || this.template?.layout || 'single-column';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['template'] && this.template) {
      this.applyTheme();
    }
  }

  private applyTheme(): void {
    const root = document.documentElement.style;
    const theme = this.template.theme;
    if (!theme) return;

    // Colors
    root.setProperty('--primary-color', theme.colors?.primary || '#2f6f73');
    root.setProperty('--text-primary', theme.colors?.textPrimary || '#333333');

    // Typography
    root.setProperty('--font-family', theme.typography?.fontFamily || 'Georgia, serif');
    root.setProperty('--name-size', theme.typography?.name?.size || '36px');
    root.setProperty('--name-weight', theme.typography?.name?.weight || 'normal');
    root.setProperty('--contact-size', theme.typography?.contact?.size || '14px');
    root.setProperty('--section-title-size', theme.typography?.sectionTitle?.size || '20px');
    root.setProperty('--section-title-weight', theme.typography?.sectionTitle?.weight || 'bold');
    root.setProperty('--body-size', theme.typography?.body?.size || '14px');
    root.setProperty('--body-line-height', theme.typography?.body?.lineHeight || '1.6');
    
    // Defensive access for jobTitle
    root.setProperty('--job-title-transform', theme.typography?.jobTitle?.transform || 'uppercase');
    root.setProperty('--job-title-weight', theme.typography?.jobTitle?.weight || 'bold');

    // Spacing
    root.setProperty('--header-bottom', theme.spacing?.headerBottom || '15px');
    root.setProperty('--section-gap', theme.spacing?.sectionGap || '25px');
    root.setProperty('--paragraph-gap', theme.spacing?.paragraphGap || '10px');
    root.setProperty('--list-gap', theme.spacing?.listGap || '6px');
  }
}
