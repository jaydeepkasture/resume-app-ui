import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';

@Component({
  selector: 'app-summary-section',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="section">
      <h2 class="section-title">Profile</h2>
      <textarea
        class="editable section-body"
        [(ngModel)]="resume.summary"
        (input)="autoSizeTextarea($event)"
        (focus)="onEdit.emit()"
        rows="1">
      </textarea>
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

    .section-body {
      font-size: var(--body-size);
      line-height: var(--body-line-height);
      font-family: var(--font-family);
      color: var(--text-primary);
      margin: 0;
      width: 100%;
      resize: none;
      overflow: hidden;
      display: block;
    }

    .editable {
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      color: inherit;
      padding: 0;
      box-sizing: border-box;
    }

    .editable:focus {
      background: rgba(var(--primary-color-rgb, 0,0,0), 0.05);
      border-radius: 2px;
    }
  `]
})
export class SummarySectionComponent {
  @Input() resume!: ResumeDto;
  @Output() onEdit = new EventEmitter<void>();

  autoSizeTextarea(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const textarea = document.querySelector('.section-body') as any;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 100);
  }
}
