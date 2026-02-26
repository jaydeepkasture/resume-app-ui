import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeDto } from '../../models/resume.model';
import { SummarySectionComponent } from '../../sections/summary/summary.component';
import { ExperienceSectionComponent } from '../../sections/experience/experience.component';
import { EducationSectionComponent } from '../../sections/education/education.component';
import { SkillsSectionComponent } from '../../sections/skills/skills.component';

@Component({
  selector: 'app-dynamic-section',
  standalone: true,
  imports: [
    CommonModule,
    SummarySectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillsSectionComponent
  ],
  template: `
    <ng-container [ngSwitch]="type">
      <app-summary-section
        *ngSwitchCase="'summary'"
        [resume]="resume"
        (onEdit)="onEdit.emit()">
      </app-summary-section>

      <app-experience-section
        *ngSwitchCase="'experience'"
        [resume]="resume"
        (onEdit)="onEdit.emit()">
      </app-experience-section>

      <app-education-section
        *ngSwitchCase="'education'"
        [resume]="resume"
        (onEdit)="onEdit.emit()">
      </app-education-section>

      <app-skills-section
        *ngSwitchCase="'skills'"
        [resume]="resume"
        (onEdit)="onEdit.emit()">
      </app-skills-section>
    </ng-container>
  `
})
export class DynamicSectionComponent {
  @Input() type: string = '';
  @Input() resume!: ResumeDto;
  @Output() onEdit = new EventEmitter<void>();
}
