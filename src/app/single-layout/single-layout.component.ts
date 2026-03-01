import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-single-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #fieldRenderer let-field="field" let-context="context" let-parentArray="parentArray" let-index="index">
      
      <!-- Group Renderer -->
      <div *ngIf="field.type === 'group'" 
           [ngStyle]="field.style">
        <ng-container *ngFor="let child of field.children">
          <ng-container *ngTemplateOutlet="fieldRenderer; context: { field: child, context: context, parentArray: parentArray, index: index }"></ng-container>
        </ng-container>
      </div>

      <!-- Text / HTML / Tag Renderer -->
      <ng-container *ngIf="['text', 'html', 'tag'].includes(field.type)">
        <span *ngIf="field.prefix" [ngStyle]="{'white-space': 'pre'}">{{ field.prefix }}</span>
        
        <span *ngIf="field.static" [ngStyle]="field.style">{{ field.value }}</span>
        
        <span *ngIf="!field.static" 
              contenteditable="true"
              (input)="updateValue($event, field.binding, context, parentArray, index)"
              [innerText]="getBoundValue(field.binding, context, field.fallbackBinding)"
              [ngStyle]="field.style"
              [style.display]="field.type === 'tag' ? 'inline-block' : (field.style?.display || 'inline')"></span>
              
        <span *ngIf="field.suffix" [ngStyle]="{'white-space': 'pre'}">{{ field.suffix }}</span>
      </ng-container>

      <!-- List Renderer -->
      <ul *ngIf="field.type === 'list'" [ngStyle]="field.style">
        <li *ngFor="let listItem of getArray(field.binding, context); let lIdx = index" 
            [ngStyle]="field.itemStyle" 
            class="bullet-item">
          
          <span contenteditable="true"
                (input)="updateListValue($event, field.binding, context, lIdx)"
                [innerText]="listItem"></span>
                
          <button *ngIf="field.allowDelete" 
                  class="delete-btn nested-del-btn" 
                  (click)="deleteNestedListItem(field.binding, context, lIdx)"
                  (click)="$event.stopPropagation()"
                  title="Delete item">
            ❌
          </button>
        </li>
      </ul>

    </ng-template>

    <div class="layout-wrapper" [ngStyle]="{'background-color': '#f1f5f9'}">
      <div class="save-bar">
        <button class="save-btn" (click)="saveResume()">Save</button>
      </div>

      <div *ngIf="errorMsg" class="error-banner">
        {{ errorMsg }}
      </div>

      <div *ngIf="!resume && !errorMsg" class="loading-state">
        Loading backend resume data...
      </div>

      <div *ngIf="resume" class="page-container" 
           [ngStyle]="{
             'width': templateConfig.page.width,
             'min-height': templateConfig.page.minHeight,
             'padding': templateConfig.page.padding,
             'background': templateConfig.theme.colors.background,
             'font-family': templateConfig.theme.typography.fontFamily
           }">
        
        <!-- Decorations -->
        <ng-container *ngFor="let dec of templateConfig.decorations">
          <div *ngIf="dec.type === 'rectangle'"
               style="position: absolute;"
               [ngStyle]="{
                 'top': dec.top,
                 'left': dec.left,
                 'width': dec.width,
                 'height': dec.height,
                 'background-color': dec.color
               }"></div>
        </ng-container>

        <div class="layout-content" [ngClass]="templateConfig.layoutType + '-layout'">
          
          <!-- Header -->
          <div class="header-section" [ngStyle]="{'text-align': templateConfig.header.alignment}">
            <ng-container *ngFor="let el of templateConfig.header.elements">
              <ng-container *ngTemplateOutlet="fieldRenderer; context: { field: el, context: resume }"></ng-container>
            </ng-container>
          </div>

          <!-- Sections -->
          <div class="sections-container">
            <ng-container *ngFor="let section of templateConfig.sections; let sIdx = index">
              
              <div class="resume-section" [ngStyle]="{'margin-bottom': templateConfig.theme.spacing.sectionGap}">
                
                <h3 class="section-title"
                    [ngStyle]="{
                      'color': templateConfig.theme.colors.primary,
                      'font-size': templateConfig.theme.typography.sectionTitleSize,
                      'text-decoration': templateConfig.sectionStyle.titleDecoration,
                      'text-transform': templateConfig.sectionStyle.titleTransform,
                      'margin-bottom': templateConfig.sectionStyle.titleSpacing,
                      'border-bottom': templateConfig.sectionStyle.titleBorderBottom,
                      'padding-bottom': templateConfig.sectionStyle.titlePaddingBottom,
                      'margin-top': templateConfig.sectionStyle.titleMarginTop
                    }">
                  {{ section.title }}
                </h3>

                <!-- Repeatable Sections (Experience, Education, Skills) -->
                <ng-container *ngIf="section.repeatable">
                  <div class="section-list">
                    <ng-container *ngFor="let item of getArray(section.binding); let iIdx = index">
                      
                      <div class="list-item" [ngStyle]="{'margin-bottom': templateConfig.theme.spacing.itemGap}">
                        
                        <button *ngIf="section.allowDelete" 
                                class="delete-btn item-del-btn" 
                                (click)="deleteSectionItem(section.binding, iIdx)" 
                                title="Delete section item">
                          🗑️
                        </button>
                        
                        <!-- Drive contents strictly via JSON fields -->
                        <ng-container *ngFor="let field of section.fields">
                          <ng-container *ngTemplateOutlet="fieldRenderer; context: { field: field, context: item, parentArray: getArray(section.binding), index: iIdx }"></ng-container>
                        </ng-container>

                      </div>

                    </ng-container>
                  </div>
                </ng-container>

                <!-- Non-repeatable Sections (Summary) -->
                <ng-container *ngIf="!section.repeatable">
                  <ng-container *ngFor="let field of section.fields">
                    <ng-container *ngTemplateOutlet="fieldRenderer; context: { field: field, context: resume }"></ng-container>
                  </ng-container>
                </ng-container>

              </div>
              
            </ng-container>
          </div>
        
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }
    .error-banner {
      width: 100%;
      max-width: 210mm;
      padding: 15px;
      background: #fee2e2;
      color: #991b1b;
      margin-bottom: 20px;
      border-radius: 6px;
      font-weight: 500;
      text-align: center;
    }
    .loading-state {
      font-size: 18px;
      color: #555;
      padding: 40px;
    }
    .save-bar {
      width: 100%;
      max-width: 210mm;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }
    .save-btn {
      background-color: #2F6F73;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .save-btn:hover {
      background-color: #24585a;
    }
    .page-container {
      background: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .layout-content {
      position: relative;
      z-index: 10;
    }
    .header-section {
      margin-bottom: 40px;
      padding-top: 20px;
    }
    .list-item {
      position: relative;
      transition: background-color 0.2s;
    }
    .list-item:hover {
      background-color: #fcfcfc;
    }
    .bullet-item {
      position: relative;
    }
    .delete-btn {
      position: absolute;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .list-item:hover > .item-del-btn {
      opacity: 1;
    }
    .bullet-item:hover > .nested-del-btn {
      opacity: 1;
    }
    .item-del-btn {
      right: -30px;
      top: 0px;
      font-size: 16px;
    }
    .nested-del-btn {
      right: 0;
      top: 0px;
      font-size: 12px;
    }
    [contenteditable="true"] {
      outline: none;
      border: 1px dashed transparent;
      transition: border-color 0.2s;
      min-width: 10px;
    }
    [contenteditable="true"]:hover {
      border-color: #ccc;
    }
    [contenteditable="true"]:focus {
      border-color: #2F6F73;
      background: rgba(47, 111, 115, 0.05);
    }
  `]
})
export class SingleLayoutComponent implements OnInit {
  private http = inject(HttpClient);
  
  resume: any;
  errorMsg: string = '';

  templateConfig: any = {
    layoutType: "single",

    page: {
      width: "210mm",
      minHeight: "297mm",
      padding: "40px"
    },

    theme: {
      colors: {
        primary: "#2F6F73",
        textPrimary: "#222",
        background: "#ffffff"
      },
      typography: {
        fontFamily: "Inter, sans-serif",
        nameSize: "36px",
        sectionTitleSize: "18px",
        bodySize: "14px"
      },
      spacing: {
        sectionGap: "28px",
        itemGap: "10px"
      }
    },

    sectionStyle: {
      titleDecoration: "none",
      titleTransform: "uppercase",
      titleSpacing: "15px",
      titleBorderBottom: "2px solid #2F6F73",
      titlePaddingBottom: "5px",
      titleMarginTop: "0"
    },

    decorations: [
      {
        type: "rectangle",
        top: "0",
        left: "0",
        width: "100%",
        height: "120px",
        color: "#2F6F73"
      }
    ],

    header: {
      alignment: "center",
      elements: [
        { type: "text", binding: "resume.name", style: { color: "#2F6F73", fontSize: "36px", margin: "0 0 5px 0", fontWeight: "bold", display: "block" } },
        { type: "text", binding: "resume.role", style: { color: "#222", fontSize: "18px", margin: "0 0 10px 0", fontWeight: "400", display: "block" } },
        { 
          type: "group", 
          layout: "row", 
          style: { color: "#222", fontSize: "14px", justifyContent: "center", display: "flex", flexWrap: "wrap", gap: "8px" }, 
          children: [
            { type: "text", binding: "resume.email" },
            { type: "text", binding: "resume.phone", prefix: "| " },
            { type: "text", binding: "resume.location", prefix: "| " },
            { type: "text", binding: "resume.website", prefix: "| " }
          ]
        }
      ]
    },

    sections: [
      {
        title: "Professional Summary",
        repeatable: false,
        fields: [
          { type: "text", binding: "resume.summary", style: { color: "#222", fontSize: "14px", lineHeight: "1.6", margin: "0", display: "block" } }
        ]
      },
      {
        title: "Work Experience",
        binding: "resume.experience",
        repeatable: true,
        allowDelete: true,
        fields: [
          {
            type: "group",
            layout: "row",
            style: { justifyContent: "space-between", alignItems: "baseline", display: "flex", width: "100%" },
            children: [
              { type: "text", binding: "company", style: { fontWeight: "bold" } },
              { 
                type: "group", 
                layout: "row", 
                style: { display: "flex", gap: "4px" },
                children: [
                  { type: "text", binding: "from" },
                  { type: "text", value: "-", static: true },
                  { type: "text", binding: "to" }
                ]
              }
            ]
          },
          { type: "text", binding: "position", style: { fontStyle: "italic", marginBottom: "5px", display: "block" } },
          {
            type: "list",
            binding: "description",
            repeatable: true,
            allowDelete: true,
            style: { margin: "0", paddingLeft: "20px" },
            itemStyle: { marginBottom: "4px", position: "relative" }
          }
        ]
      },
      {
        title: "Education",
        binding: "resume.education",
        repeatable: true,
        allowDelete: true,
        fields: [
          {
            type: "group",
            layout: "row",
            style: { justifyContent: "space-between", alignItems: "baseline", display: "flex" },
            children: [
              { type: "text", binding: "institution", fallbackBinding: "school", style: { fontWeight: "bold" } },
              { 
                type: "group", 
                layout: "row", 
                style: { display: "flex", gap: "4px" },
                children: [
                  { type: "text", binding: "from" },
                  { type: "text", value: "-", static: true },
                  { type: "text", binding: "to" }
                ]
              }
            ]
          },
          { 
            type: "group", 
            layout: "row", 
            style: { display: "flex", gap: "4px" },
            children: [
              { type: "text", binding: "degree" },
              { type: "text", binding: "fieldOfStudy", prefix: "in " }
            ]
          }
        ]
      },
      {
        title: "Skills",
        binding: "resume.skills",
        repeatable: true,
        allowDelete: true,
        fields: [
          { 
            type: "tag", 
            binding: "$this", 
            style: { 
              background: "#f1f5f9", 
              padding: "4px 8px", 
              borderRadius: "4px", 
              display: "inline-block", 
              marginRight: "8px", 
              marginBottom: "8px" 
            } 
          }
        ]
      }
    ]
  };

  ngOnInit(): void {
    const apiUrl = environment.apiUrl ? environment.apiUrl + '/resume' : '/api/v1/resume';
    // Must strictly fetch from GET /api/v1/resume
    this.http.get('/api/v1/resume').subscribe({
      next: (data) => {
        this.resume = data;
      },
      error: (err) => {
        console.error('Failed to fetch resume', err);
        this.errorMsg = 'Failed to load resume payload. Ensure the backend API /api/v1/resume is accessible.';
        // DO NOT show mock data silently per user rules
      }
    });
  }

  // Two-way binding generic updater for text fields
  updateValue(event: any, binding: string, context: any, parentArray: any, index: number | null): void {
    const newValue = event.target.innerText;
                        
    if (binding === '$this' && parentArray && index !== null) {
      if (parentArray[index] !== newValue) {
        parentArray[index] = newValue;
      }
      return;
    }
    
    let obj = context;
    let path = binding;
    if (path.startsWith('resume.')) {
      obj = this.resume;
      path = path.substring(7);
    }
    
    const parts = path.split('.');
    const lastPart = parts.pop();
    if (!lastPart) return;
    
    for (const part of parts) {
      if (obj && typeof obj === 'object') {
        obj = obj[part];
      } else {
        return;
      }
    }
    
    if (obj && typeof obj === 'object') {
      obj[lastPart] = newValue;
    }
  }

  // Two-way binding updater for list items
  updateListValue(event: any, binding: string, context: any, index: number): void {
    let val = event.target.innerText;
    let arr = this.resolvePath(context, binding);
    if (Array.isArray(arr)) {
      arr[index] = val;
    }
  }

  // Binding resolution
  getBoundValue(binding: string, context: any, fallbackBinding?: string): any {
    if (!binding || !this.resume) return '';
    if (binding === '$this') {
      return context;
    }
    
    let val = this.resolvePath(context, binding);
    if ((val === undefined || val === null || val === '') && fallbackBinding) {
      val = this.resolvePath(context, fallbackBinding);
    }
    return val;
  }

  // Returns array context from path
  getArray(binding: string, context?: any): any[] {
    let target = context || this.resume;
    let val = this.resolvePath(target, binding);
    return Array.isArray(val) ? val : [];
  }

  // Deletion logic hooks
  deleteSectionItem(binding: string, index: number): void {
    let arr = this.getArray(binding, this.resume);
    if (arr) {
      arr.splice(index, 1);
    }
  }

  deleteNestedListItem(binding: string, context: any, index: number): void {
    let arr = this.resolvePath(context, binding);
    if (Array.isArray(arr)) {
      arr.splice(index, 1);
    }
  }

  // Core parsing utility
  resolvePath(obj: any, path: string): any {
    if (!obj || !path) return '';
    if (path.startsWith('resume.')) {
      obj = this.resume;
      path = path.substring(7);
    }
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current && typeof current === 'object') {
        current = current[part];
      } else {
        return '';
      }
    }
    return current;
  }

  saveResume(): void {
    console.log(this.resume);
  }
}
