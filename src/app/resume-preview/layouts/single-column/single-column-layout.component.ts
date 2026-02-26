import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';
import { ResumeTemplate } from '../../models/template.model';
import { DynamicSectionComponent } from '../../components/dynamic-section/dynamic-section.component';

@Component({
  selector: 'app-single-column-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicSectionComponent],
  template: `
    <!-- Header -->
    <div class="resume-header">
      <input
        class="editable editable-name"
        [(ngModel)]="resume.name"
        (input)="autoSizeInput($event)"
        (focus)="onEdit.emit()" />
      <div class="resume-contact">
        <input
          *ngIf="resume.location"
          class="editable editable-contact editable-contact-inline"
          [(ngModel)]="resume.location"
          (input)="autoSizeInput($event)"
          (focus)="onEdit.emit()" />
        
        <ng-container *ngIf="resume.phoneNo">
          <span class="separator" *ngIf="resume.location">|</span>
          <input
            class="editable editable-contact editable-contact-inline"
            [(ngModel)]="resume.phoneNo"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>

        <ng-container *ngIf="resume.email">
          <span class="separator" *ngIf="resume.location || resume.phoneNo">|</span>
          <input
            class="editable editable-contact editable-contact-inline"
            [(ngModel)]="resume.email"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>

        <ng-container *ngIf="resume.linkedIn">
          <span class="separator" *ngIf="resume.location || resume.phoneNo || resume.email">|</span>
          <input
            class="editable editable-contact editable-contact-inline"
            [(ngModel)]="resume.linkedIn"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>

        <ng-container *ngIf="resume.gitHub">
          <span class="separator" *ngIf="resume.location || resume.phoneNo || resume.email || resume.linkedIn">|</span>
          <input
            class="editable editable-contact editable-contact-inline"
            [(ngModel)]="resume.gitHub"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>
      </div>
    </div>

    <!-- Header Divider Decoration -->
    <div
      *ngIf="template.decorations.headerDivider.enabled"
      class="header-divider"
      [style.height]="template.decorations.headerDivider.height"
      [style.background-color]="template.decorations.headerDivider.color"
      [style.margin-top]="template.decorations.headerDivider.marginTop"
      [style.margin-bottom]="template.decorations.headerDivider.marginBottom">
    </div>

    <!-- Dynamic Sections -->
    <div class="resume-sections">
      <ng-container *ngFor="let section of template.sectionOrder">
        <div class="section-wrapper">
          <app-dynamic-section
            [type]="section"
            [resume]="resume">
          </app-dynamic-section>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .resume-header {
      margin-bottom: var(--header-bottom);
    }

    .resume-contact {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      margin-top: 4px;
      font-family: var(--font-family);
      font-size: var(--contact-size);
      color: var(--text-primary);
      line-height: 1.4;
    }

    .separator {
      font-family: var(--font-family);
      font-size: var(--contact-size);
      color: var(--text-primary);
      padding: 0 0.5ch;
      flex-shrink: 0;
      opacity: 0.8;
    }

    .header-divider {
      width: 100%;
    }

    .section-wrapper {
      margin-bottom: var(--section-gap);
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
      font-family: var(--font-family);
      font-size: var(--name-size);
      font-weight: var(--name-weight);
      color: var(--primary-color);
      line-height: 1.1;
    }

    .editable-contact {
      font-family: var(--font-family);
      font-size: var(--contact-size);
      color: var(--text-primary);
    }

    .editable-contact-inline {
      width: auto;
    }
  `]
})
export class SingleColumnLayoutComponent {
  @Input() resume!: ResumeDto;
  @Input() template!: ResumeTemplate;
  @Output() onEdit = new EventEmitter<void>();

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

  ngAfterViewInit() {
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
