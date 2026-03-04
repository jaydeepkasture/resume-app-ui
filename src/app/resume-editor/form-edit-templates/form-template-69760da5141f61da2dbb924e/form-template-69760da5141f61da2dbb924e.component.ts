import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../template.service';

@Component({
  selector: 'app-form-template-69760da5141f61da2dbb924e',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-template-69760da5141f61da2dbb924e.component.html',
  styleUrls: ['./form-template-69760da5141f61da2dbb924e.component.css']
})
export class FormTemplate69760da5141f61da2dbb924eComponent implements OnInit, AfterViewInit, OnChanges {
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
    // Initialize arrays if missing to prevent errors
    if (!this._resumeData.experience) this._resumeData.experience = [];
    if (!this._resumeData.education) this._resumeData.education = [];
    if (!this._resumeData.skills) this._resumeData.skills = [];
    // Ensure contact structure exists - using bracket notation for index signature property
    if (!this._resumeData['contact']) {
        this._resumeData['contact'] = {
            phone: this._resumeData.phoneNo || '',
            email: this._resumeData.email || '',
            website: '',
            linkedin: this._resumeData.linkedIn || '',
            location: this._resumeData.location || ''
        };
    }
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

  ngOnChanges(changes: SimpleChanges) {
    // handled by setter
  }

  ngAfterViewInit() {
    this.resizeAllTextareas();
  }

  resizeAllTextareas() {
    // Initial resize for all textareas
    // We increase delay to ensure data binding has updated the DOM
    setTimeout(() => {
        const textareas = this.elementRef.nativeElement.querySelectorAll('textarea');
        textareas.forEach((ta: HTMLTextAreaElement) => {
            if (ta) {
                // Reset height to auto first to get correct scrollHeight if it shrank
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
      position: 'JOB TITLE',
      company: 'Company Name',
      from: 'YYYY',
      to: 'Present',
      description: ['Description of your responsibilities and achievements...']
    });
    // Trigger height adjustment after DOM update
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
          institution: 'University Name',
          year: 'Year',
          description: ''
      });
      this.onModelChange();
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }

  removeEducation(index: number) {
      this.resumeData.education.splice(index, 1);
      this.onModelChange();
  }
}
