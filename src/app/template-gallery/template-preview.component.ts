import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preview-scaler">
      <div [innerHTML]="safeContent"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: white;
      position: relative;
    }
    .preview-scaler {
      width: 210mm; /* A4 width approx */
      min-height: 297mm; /* A4 height */
      transform-origin: 0 0;
      transform: scale(0.23); /* Scale down to fit card */
      pointer-events: none;
      background: white;
      color: black; /* Ensure text is visible */
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom 
})
export class TemplatePreviewComponent implements OnChanges {
  @Input() htmlContent: string = '';
  safeContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['htmlContent']) { 
      let rawHtml = this.htmlContent || '';
      
      // Sanitize: Remove broken local image paths typical of Word exports (e.g. "Document 4_files/image001.png")
      // This prevents 404 errors in the console.
      rawHtml = rawHtml.replace(/src=["'][^"']*_files\/[^"']*["']/gi, 'src="" style="display:none"');
      
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    }
  }
}
