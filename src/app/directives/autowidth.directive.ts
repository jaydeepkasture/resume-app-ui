import { Directive, ElementRef, HostListener, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAutowidth]',
  standalone: true
})
export class AutowidthDirective implements AfterViewInit, OnDestroy {
  private measurementSpan: HTMLSpanElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.createMeasurementSpan();
    // Delay slightly to ensure fonts are loaded and model is bound
    setTimeout(() => this.resize(), 0);
  }

  ngOnDestroy() {
    if (this.measurementSpan) {
      this.measurementSpan.remove();
    }
  }

  @HostListener('input')
  @HostListener('keyup')
  @HostListener('focus')
  onEvent() {
    this.resize();
  }

  private createMeasurementSpan() {
    // Create a hidden span that mirrors the input's styling
    this.measurementSpan = this.renderer.createElement('span');
    const style = window.getComputedStyle(this.el.nativeElement);
    
    const stylesToCopy = [
      'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 
      'letterSpacing', 'textTransform', 'paddingLeft', 'paddingRight'
    ];

    this.renderer.setStyle(this.measurementSpan, 'position', 'absolute');
    this.renderer.setStyle(this.measurementSpan, 'visibility', 'hidden');
    this.renderer.setStyle(this.measurementSpan, 'white-space', 'pre');
    this.renderer.setStyle(this.measurementSpan, 'top', '-9999px');
    this.renderer.setStyle(this.measurementSpan, 'left', '-9999px');
    
    stylesToCopy.forEach(key => {
      this.renderer.setStyle(this.measurementSpan, (key as any), (style as any)[key]);
    });

    this.renderer.appendChild(document.body, this.measurementSpan);
  }

  private resize() {
    if (!this.measurementSpan) return;

    // Measure the value or the placeholder
    const text = this.el.nativeElement.value || this.el.nativeElement.placeholder || '';
    this.measurementSpan.textContent = text;
    
    // Get exact width
    const width = this.measurementSpan.getBoundingClientRect().width;
    
    // Apply width in pixels. Adding a tiny 2px buffer for cursor breathing room.
    this.renderer.setStyle(this.el.nativeElement, 'width', (width + 4) + 'px');
  }
}
