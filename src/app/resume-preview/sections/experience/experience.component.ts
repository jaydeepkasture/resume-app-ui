import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="section">
      <h2 class="section-title">{{ customTitle || 'Experience' }}</h2>
      <div class="experience-list">
        <div class="experience-item" *ngFor="let job of resume.experience; let i = index; let last = last; trackBy: trackByIndex"
             [class.last-item]="last">
          <div class="job-container">
            <div class="job-header">
              <input class="editable editable-job" 
                     [(ngModel)]="job.position" 
                     (input)="autoSizeInput($event)"
                     (focus)="onEdit.emit()" />
              <span class="separator">|</span>
              <input class="editable editable-job" 
                     [(ngModel)]="job.company" 
                     (input)="autoSizeInput($event)"
                     (focus)="onEdit.emit()" />
              <span class="separator">|</span>
              <span class="date-group">
                <input class="editable editable-date" 
                       [(ngModel)]="job.from" 
                       (input)="autoSizeInput($event)"
                       (focus)="onEdit.emit()" />
                <span class="dash">–</span>
                <input class="editable editable-date" 
                       [(ngModel)]="job.to" 
                       (input)="autoSizeInput($event)"
                       (focus)="onEdit.emit()" />
              </span>
            </div>
            <button class="delete-btn" (click)="deleteExperience(i)" title="Delete Experience">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <ul class="job-description">
            <li *ngFor="let bullet of job.description; let j = index; trackBy: trackByIndex">
              <div class="bullet-container">
                <textarea
                  class="editable editable-bullet"
                  [(ngModel)]="job.description[j]"
                  (input)="autoSizeTextarea($event)"
                  (focus)="onEdit.emit()"
                  rows="1"></textarea>
                <button class="bullet-delete-btn" (click)="deleteBullet(i, j)" title="Delete Bullet">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </li>
            <li class="add-bullet-li">
              <button class="add-btn" (click)="addBullet(i)">+ Add Bullet</button>
            </li>
          </ul>
        </div>
        <div class="add-experience-container">
          <button class="add-btn add-exp-btn" (click)="addExperience()">+ Add Work Experience</button>
        </div>
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

    .experience-item {
      margin-bottom: var(--paragraph-gap);
      position: relative;
    }

    .job-container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 15px;
    }

    .experience-item.last-item {
      margin-bottom: 0;
    }

    .job-header {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      text-transform: var(--job-title-transform);
      font-weight: var(--job-title-weight);
      font-size: var(--body-size);
      font-family: var(--font-family);
      color: var(--text-primary);
      margin-bottom: var(--list-gap);
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
      width: 22px;
      height: 22px;
      padding: 0;
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s ease;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .experience-item:hover .delete-btn {
      opacity: 1;
    }

    .delete-btn:hover {
      background: #df4759;
      color: white;
    }

    .date-group {
      display: inline-flex;
      align-items: baseline;
      white-space: nowrap;
    }

    .separator, .dash {
      flex-shrink: 0;
      padding: 0 0.5ch;
      color: var(--primary-color);
      opacity: 0.8;
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

    .editable-job, .editable-date {
      width: auto;
    }

    .job-description {
      margin: 0;
      padding-left: 18px;
      list-style-type: disc;
    }

    .job-description li {
      font-size: var(--body-size);
      line-height: var(--body-line-height);
      font-family: var(--font-family);
      color: var(--text-primary);
      margin-bottom: var(--list-gap);
    }

    .bullet-container {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .bullet-delete-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
      color: #6c757d;
      border: none;
      border-radius: 3px;
      width: 16px;
      height: 16px;
      padding: 0;
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s ease;
      flex-shrink: 0;
      margin-top: 4px;
    }

    .bullet-container:hover .bullet-delete-btn {
      opacity: 1;
    }

    .bullet-delete-btn:hover {
      background: #dc3545;
      color: white;
    }

    .job-description li:last-child {
      margin-bottom: 0;
    }

    .editable-bullet {
      width: 100%;
      resize: none;
      overflow: hidden;
      display: block;
      min-height: 1.2em;
    }

    .add-bullet-li {
      list-style-type: none !important;
      margin-top: 4px;
    }

    .add-experience-container {
      margin-top: 20px;
      padding-top: 15px;
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

    .add-exp-btn {
      font-size: 14px;
      padding: 6px 16px;
    }
  `]
})
export class ExperienceSectionComponent {
  @Input() resume!: ResumeDto;
  @Input() customTitle?: string;
  @Output() onEdit = new EventEmitter<void>();

  deleteExperience(index: number): void {
    if (this.resume.experience && this.resume.experience.length > index) {
      this.onEdit.emit(); // Save state before delete
      this.resume.experience.splice(index, 1);
    }
  }

  deleteBullet(jobIndex: number, bulletIndex: number): void {
    const job = this.resume.experience[jobIndex];
    if (job && job.description && job.description.length > bulletIndex) {
      this.onEdit.emit(); // Save state before delete
      job.description.splice(bulletIndex, 1);
    }
  }

  addExperience(): void {
    this.onEdit.emit();
    this.resume.experience.push({
      position: 'New Position',
      company: 'Company Name',
      from: 'MM/YYYY',
      to: 'Present',
      description: ['New accomplishment...']
    });
  }

  addBullet(jobIndex: number): void {
    this.onEdit.emit();
    this.resume.experience[jobIndex].description.push('New accomplishment...');
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

  autoSizeTextarea(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      document.querySelectorAll('.editable-bullet').forEach((el: any) => {
        el.style.height = el.scrollHeight + 'px';
      });
      document.querySelectorAll('.editable-job, .editable-date').forEach((el: any) => {
        this.sizeInput(el as HTMLInputElement);
      });
    }, 100);
  }
}
