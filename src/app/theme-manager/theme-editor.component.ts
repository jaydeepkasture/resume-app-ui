import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from './theme.service';
import { Theme } from './models/theme.model';

@Component({
  selector: 'app-theme-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="editor-container">
      <header class="editor-header">
        <button class="btn-back" (click)="goBack()">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back to Gallery
        </button>
        <h1>{{ isEditMode ? 'Edit Theme' : 'Create New Theme' }}</h1>
      </header>

      <form [formGroup]="themeForm" (ngSubmit)="onSubmit()" class="theme-form">
        <div class="form-section">
          <h3>Basic Information</h3>
          <div class="form-group">
            <label for="name">Theme Name</label>
            <input id="name" type="text" formControlName="name" placeholder="e.g. Modern Professional" />
          </div>
          <div class="form-group checkbox">
            <input id="isActive" type="checkbox" formControlName="isActive" />
            <label for="isActive">Set as active theme</label>
          </div>
        </div>

        <div class="form-section" formGroupName="theme">
          <h3>Colors</h3>
          <div formGroupName="colors" class="grid-2">
            <div class="form-group">
              <label>Primary Color</label>
              <div class="color-input-wrapper">
                <input type="color" formControlName="primary" />
                <input type="text" formControlName="primary" />
              </div>
            </div>
            <div class="form-group">
              <label>Text Primary</label>
              <div class="color-input-wrapper">
                <input type="color" formControlName="textPrimary" />
                <input type="text" formControlName="textPrimary" />
              </div>
            </div>
          </div>

          <h3>Typography</h3>
          <div formGroupName="typography">
            <div class="form-group">
              <label>Font Family</label>
              <input type="text" formControlName="fontFamily" placeholder="e.g. 'Inter', sans-serif" />
            </div>
            
            <div class="grid-2">
              <div formGroupName="name" class="form-sub-group">
                <label>Name (Size/Weight)</label>
                <div class="flex-gap">
                  <input type="text" formControlName="size" placeholder="Size" />
                  <input type="text" formControlName="weight" placeholder="Weight" />
                </div>
              </div>
              <div formGroupName="sectionTitle" class="form-sub-group">
                <label>Section Title (Size/Weight)</label>
                <div class="flex-gap">
                  <input type="text" formControlName="size" placeholder="Size" />
                  <input type="text" formControlName="weight" placeholder="Weight" />
                </div>
              </div>
            </div>
          </div>

          <h3>Spacing</h3>
          <div formGroupName="spacing" class="grid-2">
            <div class="form-group">
              <label>Header Bottom</label>
              <input type="text" formControlName="headerBottom" placeholder="e.g. 40px" />
            </div>
            <div class="form-group">
              <label>Section Gap</label>
              <input type="text" formControlName="sectionGap" placeholder="e.g. 30px" />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="goBack()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="themeForm.invalid || isSaving">
            {{ isSaving ? 'Saving...' : 'Save Theme' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .editor-container {
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }

    .editor-header {
      margin-bottom: 30px;
    }

    .btn-back {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 0;
      margin-bottom: 16px;
      font-weight: 600;
    }

    .btn-back:hover {
      color: #007bff;
    }

    .theme-form {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      border: 1px solid #eee;
    }

    .form-section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
    }

    .form-section:last-of-type {
      border-bottom: none;
    }

    .form-section h3 {
      font-size: 18px;
      margin: 0 0 20px 0;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #555;
      font-size: 14px;
    }

    .form-group input[type="text"] {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      outline: none;
    }

    .form-group input:focus {
      border-color: #007bff;
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .checkbox input {
      width: 18px;
      height: 18px;
    }

    .checkbox label {
      margin-bottom: 0;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .color-input-wrapper {
      display: flex;
      gap: 10px;
    }

    .color-input-wrapper input[type="color"] {
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      padding: 0;
    }

    .flex-gap {
      display: flex;
      gap: 10px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 20px;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-secondary {
      background: #f8f9fa;
      border: 1px solid #ddd;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class ThemeEditorComponent implements OnInit {
  themeForm: FormGroup;
  isEditMode = false;
  isSaving = false;
  themeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.themeForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true],
      theme: this.fb.group({
        colors: this.fb.group({
          primary: ['#000000', Validators.required],
          textPrimary: ['#333333', Validators.required]
        }),
        typography: this.fb.group({
          fontFamily: ["'Inter', sans-serif", Validators.required],
          name: this.fb.group({
            size: ['32px', Validators.required],
            weight: ['800', Validators.required]
          }),
          sectionTitle: this.fb.group({
            size: ['18px', Validators.required],
            weight: ['700', Validators.required]
          }),
          body: this.fb.group({
            size: ['12px', Validators.required],
            lineHeight: ['1.5', Validators.required]
          })
        }),
        spacing: this.fb.group({
          headerBottom: ['40px', Validators.required],
          sectionGap: ['30px', Validators.required]
        })
      }),
      decorations: [null]
    });
  }

  ngOnInit(): void {
    this.themeId = this.route.snapshot.paramMap.get('id');
    if (this.themeId && this.themeId !== 'new') {
      this.isEditMode = true;
      this.loadTheme(this.themeId);
    }
  }

  loadTheme(id: string): void {
    this.themeService.getThemeById(id).subscribe({
      next: (res: any) => {
        const themeData = res.data || res;
        this.themeForm.patchValue(themeData);
      },
      error: (err) => console.error('Failed to load theme', err)
    });
  }

  onSubmit(): void {
    if (this.themeForm.invalid) return;

    this.isSaving = true;
    const themeData = this.themeForm.value;

    const request = this.isEditMode && this.themeId
      ? this.themeService.updateTheme(this.themeId, themeData)
      : this.themeService.createTheme(themeData);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/themes']);
      },
      error: (err) => {
        console.error('Failed to save theme', err);
        this.isSaving = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/themes']);
  }
}
