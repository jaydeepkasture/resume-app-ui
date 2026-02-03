import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../template.service';
import { RichTextInputComponent } from '../../../shared/components/rich-text-input/rich-text-input.component';

@Component({
  selector: 'app-form-template-69760da5141f61da2dbb924e',
  standalone: true,
  imports: [CommonModule, FormsModule, RichTextInputComponent],
  templateUrl: './form-template-69760da5141f61da2dbb924e.component.html',
  styleUrls: ['./form-template-69760da5141f61da2dbb924e.component.css']
})
export class FormTemplate69760da5141f61da2dbb924eComponent implements OnInit, AfterViewInit, OnChanges {
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
      description: 'Description of your responsibilities and achievements...'
    });
    // Trigger height adjustment after DOM update
    setTimeout(() => {
        const textareas = this.elementRef.nativeElement.querySelectorAll('textarea');
        const lastTextarea = textareas[textareas.length - 1]; // Assume newly added is last or close to end
        if(lastTextarea) this.adjustTextAreaHeight({ target: lastTextarea });
    }, 0);
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
      this.onModelChange();
  }

  removeEducation(index: number) {
      this.resumeData.education.splice(index, 1);
      this.onModelChange();
  }
}
