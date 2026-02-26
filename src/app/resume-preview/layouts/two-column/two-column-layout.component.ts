import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';
import { ResumeTemplate } from '../../models/template.model';
import { DynamicSectionComponent } from '../../components/dynamic-section/dynamic-section.component';

@Component({
  selector: 'app-two-column-layout',
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
          class="editable editable-contact editable-inline"
          [(ngModel)]="resume.location"
          (input)="autoSizeInput($event)"
          (focus)="onEdit.emit()" />
        
        <ng-container *ngIf="resume.phoneNo">
          <span class="separator" *ngIf="resume.location">|</span>
          <input
            class="editable editable-contact editable-inline"
            [(ngModel)]="resume.phoneNo"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>

        <ng-container *ngIf="resume.email">
          <span class="separator" *ngIf="resume.location || resume.phoneNo">|</span>
          <input
            class="editable editable-contact editable-inline"
            [(ngModel)]="resume.email"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>

        <ng-container *ngIf="resume.linkedIn">
          <span class="separator" *ngIf="resume.location || resume.phoneNo || resume.email">|</span>
          <input
            class="editable editable-contact editable-inline"
            [(ngModel)]="resume.linkedIn"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>

        <ng-container *ngIf="resume.gitHub">
          <span class="separator" *ngIf="resume.location || resume.phoneNo || resume.email || resume.linkedIn">|</span>
          <input
            class="editable editable-contact editable-inline"
            [(ngModel)]="resume.gitHub"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
        </ng-container>
      </div>
    </div>

    <div *ngIf="template.decorations.headerDivider.enabled" class="header-divider"
      [style.height]="template.decorations.headerDivider.height"
      [style.background-color]="template.decorations.headerDivider.color"
      [style.margin-top]="template.decorations.headerDivider.marginTop"
      [style.margin-bottom]="template.decorations.headerDivider.marginBottom">
    </div>

    <!-- Two Column Grid -->
    <div class="resume-columns">
      <div class="column">
        <ng-container *ngFor="let section of leftSections">
          <div class="section-wrapper">
            <app-dynamic-section [type]="section" [resume]="resume" (onEdit)="onEdit.emit()"></app-dynamic-section>
          </div>
        </ng-container>
      </div>
      <div class="column">
        <ng-container *ngFor="let section of rightSections">
          <div class="section-wrapper">
            <app-dynamic-section [type]="section" [resume]="resume" (onEdit)="onEdit.emit()"></app-dynamic-section>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .resume-header {
      margin-bottom: var(--header-bottom);
    }

    .resume-columns {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 40px;
    }

    .section-wrapper {
      margin-bottom: var(--section-gap);
    }
    
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
      font-size: var(--name-size);
      font-weight: var(--name-weight);
      color: var(--primary-color);
      line-height: 1.1;
    }

    .editable-contact {
      font-size: var(--contact-size);
      font-family: var(--font-family);
      color: var(--text-primary);
    }

    .editable-inline {
      width: auto;
    }

    .resume-contact {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      margin-top: 4px;
      line-height: 1.4;
    }

    .separator {
      padding: 0 0.5ch;
      color: var(--text-primary);
      opacity: 0.8;
      flex-shrink: 0;
    }

    .header-divider {
      width: 100%;
    }
  `]
})
export class TwoColumnLayoutComponent {
  @Input() resume!: ResumeDto;
  @Input() template!: ResumeTemplate;
  @Output() onEdit = new EventEmitter<void>();

  get leftSections() {
    return this.template.sectionOrder.filter((_, i) => i % 2 === 0);
  }

  get rightSections() {
    return this.template.sectionOrder.filter((_, i) => i % 2 !== 0);
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

  ngAfterViewInit() {
    setTimeout(() => {
      const inputs = document.querySelectorAll('.resume-header .editable-inline, .resume-header .editable-name');
      inputs.forEach((el: any) => {
        if (el instanceof HTMLInputElement) {
          this.sizeInput(el);
        }
      });
    }, 100);
  }
}
