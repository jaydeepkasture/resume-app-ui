import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-template-6973bcfbdf2766fbee178f68',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-template-6973bcfbdf2766fbee178f68.component.html',
  styleUrls: ['./form-template-6973bcfbdf2766fbee178f68.component.css']
})
export class FormTemplate6973bcfbdf2766fbee178f68Component implements OnInit {
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
  }

  onModelChange() {
    this.dataChange.emit(this.resumeData);
  }

  addExperience() {
    this.resumeData.experience.push({
      role: 'Role',
      company: 'Company',
      duration: 'Duration',
      description: 'Description'
    });
    this.onModelChange();
  }

  removeExperience(index: number) {
    this.resumeData.experience.splice(index, 1);
    this.onModelChange();
  }
}
