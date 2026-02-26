import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="section">
      <h2 class="section-title">Skills &amp; Abilities</h2>
      <ul class="skills-list">
        <li *ngFor="let skill of resume.skills; let i = index; trackBy: trackByIndex" class="skill-item">
          <div class="skill-content">
            <input
              class="editable editable-skill"
              [(ngModel)]="resume.skills[i]"
              (input)="autoSizeInput($event)"
              (focus)="onEdit.emit()" />
            <button class="delete-btn" (click)="deleteSkill(i)" title="Delete Skill">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </li>
        <li class="add-item-li">
          <button class="add-btn" (click)="addSkill()">+ Add Skill</button>
        </li>
      </ul>
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

    .skills-list {
      column-count: 2;
      column-gap: 40px;
      margin: 0;
      padding-left: 18px;
    }

    .skill-item {
      font-size: var(--body-size);
      line-height: var(--body-line-height);
      font-family: var(--font-family);
      color: var(--text-primary);
      margin-bottom: var(--list-gap);
      break-inside: avoid;
      list-style-type: disc;
    }

    .skill-content {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
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

    .skill-item:hover .delete-btn {
      opacity: 1;
    }

    .delete-btn:hover {
      background: #df4759;
      color: white;
    }

    .add-item-li {
      list-style-type: none !important;
      margin-left: -18px;
    }

    .add-btn {
      background: transparent;
      border: 1px dashed var(--primary-color);
      color: var(--primary-color);
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      margin-top: 8px;
      transition: all 0.2s;
    }

    .add-btn:hover {
      background: rgba(var(--primary-color-rgb, 0,0,0), 0.05);
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
      min-width: 10px;
    }

    .editable:focus {
      background: rgba(0, 0, 0, 0.04);
      border-radius: 1px;
    }

    .editable-skill {
      width: auto;
    }
  `]
})
export class SkillsSectionComponent {
  @Input() resume!: ResumeDto;
  @Output() onEdit = new EventEmitter<void>();

  deleteSkill(index: number): void {
    if (this.resume.skills && this.resume.skills.length > index) {
      this.onEdit.emit(); // Save state before delete
      this.resume.skills.splice(index, 1);
    }
  }

  addSkill(): void {
    this.onEdit.emit();
    this.resume.skills.push('New Skill');
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
      document.querySelectorAll('.editable-skill').forEach((el: any) => {
        this.sizeInput(el as HTMLInputElement);
      });
    }, 100);
  }
}
