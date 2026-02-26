import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeDto } from '../../models/resume.model';
import { ResumeTemplate } from '../../models/template.model';
import { DynamicSectionComponent } from '../../components/dynamic-section/dynamic-section.component';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicSectionComponent],
  template: `
    <div class="sidebar-container" [class.reverse]="template.decorations.sidebar?.valign === 'right'">
      <!-- Sidebar Column -->
      <aside class="sidebar" [style.background-color]="template.decorations.sidebar?.background" 
             [style.width]="template.decorations.sidebar?.width">
        <div class="sidebar-content">
          <input
            class="editable editable-name"
            [(ngModel)]="resume.name"
            (input)="autoSizeInput($event)"
            (focus)="onEdit.emit()" />
          <div class="sidebar-sections">
            <ng-container *ngFor="let section of sidebarSections">
              <div class="section-wrapper">
                <app-dynamic-section [type]="section" [resume]="resume" (onEdit)="onEdit.emit()"></app-dynamic-section>
              </div>
            </ng-container>
          </div>
        </div>
      </aside>

      <!-- Main Column -->
      <main class="main-content">
        <div class="main-sections">
          <ng-container *ngFor="let section of mainSections">
            <div class="section-wrapper">
              <app-dynamic-section [type]="section" [resume]="resume" (onEdit)="onEdit.emit()"></app-dynamic-section>
            </div>
          </ng-container>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .sidebar-container {
      display: flex;
      min-height: 1000px;
      margin: -50px -60px;
    }

    .sidebar-container.reverse {
      flex-direction: row-reverse;
    }

    .sidebar {
      padding: 50px 30px;
      box-sizing: border-box;
    }

    .main-content {
      flex: 1;
      padding: 50px 40px;
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
      width: auto;
      font-size: 24px;
      font-weight: bold;
      color: var(--primary-color);
      margin-bottom: 20px;
      line-height: 1.2;
    }
  `]
})
export class SidebarLayoutComponent {
  @Input() resume!: ResumeDto;
  @Input() template!: ResumeTemplate;
  @Output() onEdit = new EventEmitter<void>();

  get sidebarSections() {
    // Put skills and education in sidebar by default
    return this.template.sectionOrder.filter(s => ['skills', 'education'].includes(s));
  }

  get mainSections() {
    return this.template.sectionOrder.filter(s => !['skills', 'education'].includes(s));
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
      const inputs = document.querySelectorAll('.editable-name');
      inputs.forEach((el: any) => {
        if (el instanceof HTMLInputElement) {
          this.sizeInput(el);
        }
      });
    }, 100);
  }
}
