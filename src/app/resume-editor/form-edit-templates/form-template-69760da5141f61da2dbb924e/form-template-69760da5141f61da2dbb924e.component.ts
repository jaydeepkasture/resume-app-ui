import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-template-69760da5141f61da2dbb924e',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-template-69760da5141f61da2dbb924e.component.html',
  styleUrls: ['./form-template-69760da5141f61da2dbb924e.component.css']
})
export class FormTemplate69760da5141f61da2dbb924eComponent implements OnInit {
  @Input() resumeData: any;
  @Output() dataChange = new EventEmitter<any>();

  ngOnInit() {
    if (!this.resumeData) {
      this.resumeData = {};
    }
    // Initialize arrays if missing to prevent errors
    if (!this.resumeData.experience) this.resumeData.experience = [];
    if (!this.resumeData.education) this.resumeData.education = [];
    if (!this.resumeData.skills) this.resumeData.skills = [];
    // Ensure contact structure exists
    if (!this.resumeData.contact) {
        this.resumeData.contact = {
            phone: '',
            email: '',
            website: '',
            linkedin: '',
            location: ''
        };
    }
  }

  onModelChange() {
    this.dataChange.emit(this.resumeData);
  }

  addExperience() {
    this.resumeData.experience.push({
      role: 'JOB TITLE',
      company: 'Company Name',
      duration: 'YYYY - Present',
      description: 'Description of your responsibilities and achievements...'
    });
    this.onModelChange();
  }

  removeExperience(index: number) {
    this.resumeData.experience.splice(index, 1);
    this.onModelChange();
  }

  addEducation() {
      this.resumeData.education.push({
          degree: 'Degree',
          university: 'University Name',
          year: 'Year'
      });
      this.onModelChange();
  }

  removeEducation(index: number) {
      this.resumeData.education.splice(index, 1);
      this.onModelChange();
  }
}
