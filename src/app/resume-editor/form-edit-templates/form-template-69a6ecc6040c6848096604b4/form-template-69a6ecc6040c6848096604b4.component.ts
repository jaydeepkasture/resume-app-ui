import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../template.service';
import { AutowidthDirective } from '../../../directives/autowidth.directive';

@Component({
  selector: 'app-form-template-69a6ecc6040c6848096604b4',
  standalone: true,
  imports: [CommonModule, FormsModule, AutowidthDirective],
  templateUrl: './form-template-69a6ecc6040c6848096604b4.component.html',
  styleUrls: ['./form-template-69a6ecc6040c6848096604b4.component.css']
})
export class FormTemplate69a6ecc6040c6848096604b4Component implements OnInit, AfterViewInit {
  private _resumeData!: ResumeData;

  @Input() 
  set resumeData(value: ResumeData) {
    this._resumeData = value;
    this.ensureDescriptionArray();
    this.resizeAllTextareas();
  }
  get resumeData(): ResumeData {
    return this._resumeData;
  }

  @Output() dataChange = new EventEmitter<ResumeData>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    console.log('hsere');
    if (!this._resumeData) {
      this._resumeData = {
        name: '',
        role: '',
        phoneNo: '',
        email: '',
        location: '',
        linkedIn: '',
        gitHub: '',
        summary: '',
        experience: [],
        skills: [],
        education: []
      };
    }
    // Initialize arrays if missing
    if (!this._resumeData.experience) this._resumeData.experience = [];
    if (!this._resumeData.education) this._resumeData.education = [];
    if (!this._resumeData.skills) this._resumeData.skills = [];

    this.ensureDescriptionArray();
  }

  private ensureDescriptionArray() {
    if (this._resumeData) {
      if (this._resumeData.experience) {
        this._resumeData.experience.forEach(exp => {
          if (typeof exp.description === 'string') {
            exp.description = [(exp.description as string)];
          }
          if (!exp.description || !Array.isArray(exp.description) || exp.description.length === 0) {
            exp.description = [''];
          }
        });
      }
      if (this._resumeData.education) {
        this._resumeData.education.forEach(edu => {
          if (Array.isArray(edu.description)) {
            edu.description = edu.description.join('\n');
          } else if (!edu.description) {
            edu.description = '';
          }
        });
      }
    }
  }

  ngAfterViewInit() {
    this.resizeAllTextareas();
  }

  resizeAllTextareas() {
    setTimeout(() => {
        const textareas = this.elementRef.nativeElement.querySelectorAll('textarea');
        textareas.forEach((ta: HTMLTextAreaElement) => {
            if (ta) {
                ta.style.height = 'auto';
                ta.style.height = ta.scrollHeight + 'px';
            }
        });
    }, 100); 
  }

  adjustTextAreaHeight(event: any) {
    const element = event.target as HTMLTextAreaElement;
    if (element) {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    }
  }

  onModelChange() {
    this.dataChange.emit(this.resumeData);
  }

  addExperience() {
    this.resumeData.experience.push({
      position: 'Job Title',
      company: 'Company',
      from: 'YYYY',
      to: 'Present',
      description: ['Responsibilities and achievements']
    });
    this.resizeAllTextareas();
    this.onModelChange();
  }

  addExpBullet(index: number) {
    this.resumeData.experience[index].description.push('');
    this.onModelChange();
    this.resizeAllTextareas();
  }

  removeExpBullet(expIndex: number, bulletIndex: number) {
    this.resumeData.experience[expIndex].description.splice(bulletIndex, 1);
    if (this.resumeData.experience[expIndex].description.length === 0) {
      this.resumeData.experience[expIndex].description.push('');
    }
    this.onModelChange();
  }

  removeExperience(index: number) {
    this.resumeData.experience.splice(index, 1);
    this.onModelChange();
  }

  addEducation() {
      this.resumeData.education.push({
          degree: 'Degree',
          institution: 'Institution',
          year: 'Year',
          description: ''
      });
      this.resizeAllTextareas();
      this.onModelChange();
  }


  removeEducation(index: number) {
      this.resumeData.education.splice(index, 1);
      this.onModelChange();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  addSkill() {
    this.resumeData.skills.push('');
    this.onModelChange();
  }

  removeSkill(index: number) {
    this.resumeData.skills.splice(index, 1);
    this.onModelChange();
  }
}
