import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="section">
      <h2 class="section-title">Education</h2>
      <div class="education-list">
        <div class="education-item" *ngFor="let edu of resume.education; let i = index; let last = last; trackBy: trackByIndex"
             [class.last-item]="last">
          <div class="edu-container">
            <div class="edu-line">
              <input class="editable editable-edu" 
                     [(ngModel)]="edu.degree" 
                     (input)="autoSizeInput($event)"
                     (focus)="onEdit.emit()" />
              <input class="editable editable-edu" 
                     [(ngModel)]="edu.field" 
                     (input)="autoSizeInput($event)"
                     (focus)="onEdit.emit()" />
              <span class="separator">|</span>
              <input class="editable editable-edu" 
                     [(ngModel)]="edu.year" 
                     (input)="autoSizeInput($event)"
                     (focus)="onEdit.emit()" />
              <span class="separator">|</span>
              <span class="inst-group">
                <input class="editable editable-edu" 
                       [(ngModel)]="edu.institution" 
                       (input)="autoSizeInput($event)"
                       (focus)="onEdit.emit()" />
              </span>
            </div>
            <button class="delete-btn" (click)="deleteEducation(i)" title="Delete Education">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="add-education-container">
        <button class="add-btn" (click)="addEducation()">+ Add Education</button>
      </div>
    </div>
  `,
  styles: [`
    .section-title {
      color: var(--primary-color);
      font-size: var(--section-title-size);
      font-weight: var(--section-title-weight);
      font-family: var(--font-family);
      margin: 0 0 var(--paragraph-gap) 0;
    }

    .education-item {
      margin-bottom: var(--list-gap);
      position: relative;
    }

    .edu-container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 15px;
    }

    .education-item.last-item {
      margin-bottom: 0;
    }

    .edu-line {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      font-size: var(--body-size);
      font-family: var(--font-family);
      color: var(--text-primary);
      text-transform: uppercase;
      font-weight: bold;
      flex: 1;
    }

    .delete-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffeded;
      color: #df4759;
      border: none;
      border-radius: 4px;
      width: 20px;
      height: 20px;
      padding: 0;
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .education-item:hover .delete-btn {
      opacity: 1;
    }

    .delete-btn:hover {
      background: #df4759;
      color: white;
    }

    .inst-group {
      display: inline-flex;
    }

    .label, .separator {
      flex-shrink: 0;
      font-weight: bold;
      padding: 0 0.5ch;
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

    .editable-edu {
      width: auto;
    }

    .add-education-container {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px dashed #eee;
    }

    .add-btn {
      background: transparent;
      border: 1px dashed var(--primary-color);
      color: var(--primary-color);
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }

    .add-btn:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  `]
})
export class EducationSectionComponent {
  @Input() resume!: ResumeDto;
  @Output() onEdit = new EventEmitter<void>();

  deleteEducation(index: number): void {
    if (this.resume.education && this.resume.education.length > index) {
      this.onEdit.emit(); // Save state before delete
      this.resume.education.splice(index, 1);
    }
  }

  addEducation(): void {
    this.onEdit.emit();
    this.resume.education.push({
      degree: 'Degree Name',
      field: 'Field of Study',
      institution: 'University/College Name',
      year: 'YYYY'
    });
  }

  trackByIndex(index: number): number {
    return index;
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
      document.querySelectorAll('.editable-edu').forEach((el: any) => {
        this.sizeInput(el as HTMLInputElement);
      });
    }, 100);
  }
}
