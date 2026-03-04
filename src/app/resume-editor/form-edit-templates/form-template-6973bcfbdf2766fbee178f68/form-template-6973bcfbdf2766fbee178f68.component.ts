import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeData } from '../../template.service';

@Component({
  selector: 'app-form-template-6973bcfbdf2766fbee178f68',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-template-6973bcfbdf2766fbee178f68.component.html',
  styleUrls: ['./form-template-6973bcfbdf2766fbee178f68.component.css']
})
export class FormTemplate6973bcfbdf2766fbee178f68Component implements OnInit {
  @Input() resumeData!: ResumeData;
  @Output() dataChange = new EventEmitter<ResumeData>();

  ngOnInit() {
    if (!this.resumeData) {
      this.resumeData = {
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
    if (!this.resumeData.experience) this.resumeData.experience = [];
    if (!this.resumeData.education) this.resumeData.education = [];
    if (!this.resumeData.skills) this.resumeData.skills = [];

    this.ensureDescriptionArray();
  }

  private ensureDescriptionArray() {
    if (this.resumeData) {
      if (this.resumeData.experience) {
        this.resumeData.experience.forEach(exp => {
          if (typeof exp.description === 'string') {
            exp.description = [(exp.description as string)];
          }
          if (!exp.description || !Array.isArray(exp.description) || exp.description.length === 0) {
            exp.description = [''];
          }
        });
      }
      if (this.resumeData.education) {
        this.resumeData.education.forEach(edu => {
          if (Array.isArray(edu.description)) {
            edu.description = edu.description.join('\n');
          } else if (!edu.description) {
            edu.description = '';
          }
        });
      }
    }
  }

  onModelChange() {
    this.dataChange.emit(this.resumeData);
  }

  addExperience() {
    this.resumeData.experience.push({
      position: 'Role',
      company: 'Company',
      from: 'YYYY',
      to: 'Present',
      description: ['Description']
    });
    this.onModelChange();
  }

  addExpBullet(index: number) {
    this.resumeData.experience[index].description.push('');
    this.onModelChange();
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
      institution: 'University',
      year: 'Year',
      description: ''
    });
    this.onModelChange();
  }


  removeEducation(index: number) {
    this.resumeData.education.splice(index, 1);
    this.onModelChange();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
