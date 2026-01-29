import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../template.service';

@Component({
  selector: 'app-form-template-697a55ac89449a11f51085ec',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-template-697a55ac89449a11f51085ec.component.html',
  styleUrls: ['./form-template-697a55ac89449a11f51085ec.component.css']
})
export class FormTemplate697a55ac89449a11f51085ecComponent implements OnInit, AfterViewInit {
  private _resumeData!: ResumeData;

  @Input() 
  set resumeData(value: ResumeData) {
    this._resumeData = value;
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
    // Ensure contact structure exists
    if (!this._resumeData['contact']) {
        this._resumeData['contact'] = {
            phone: this._resumeData.phoneNo || '',
            email: this._resumeData.email || '',
            website: '',
            linkedin: this._resumeData.linkedIn || '',
            location: this._resumeData.location || ''
        };
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
      position: 'JOB TITLE',
      company: 'Company Name',
      from: 'YYYY',
      to: 'Present',
      description: 'Description of your responsibilities and achievements...'
    });
    // Trigger height adjustment
    this.resizeAllTextareas();
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
          year: 'Year'
      });
      this.resizeAllTextareas();
      this.onModelChange();
  }

  removeEducation(index: number) {
      this.resumeData.education.splice(index, 1);
      this.onModelChange();
  }
}
