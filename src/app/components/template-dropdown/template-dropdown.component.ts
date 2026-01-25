import { Component, Output, Input, EventEmitter, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateService, BackendTemplate } from '../../resume-editor/template.service';

@Component({
  selector: 'app-template-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-dropdown.component.html',
  styleUrl: './template-dropdown.component.css'
})
export class TemplateDropdownComponent implements OnInit {
  @Output() templateSelected = new EventEmitter<string>();
  @Input() currentTemplateName = 'Select Template';
  
  isOpen = false;
  templates: BackendTemplate[] = [];
  searchQuery = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  hasMore = true;
  isLoading = false;
  sortOrder = 'asc';

  constructor(
    private templateService: TemplateService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.templates.length === 0) {
      this.loadTemplates();
    }
  }

  loadTemplates(reset: boolean = false): void {
    if (this.isLoading || (!this.hasMore && !reset)) return;

    if (reset) {
      this.currentPage = 1;
      this.templates = [];
      this.hasMore = true;
    }

    this.isLoading = true;

    this.templateService.getBackendTemplates(
      this.currentPage,
      this.pageSize,
      this.sortOrder,
      this.searchQuery
    ).subscribe({
      next: (response: any) => {
        if (response.status && response.data) {
          console.log('Template API Response Data:', response.data);
          
          let newTemplates: BackendTemplate[] = [];
          
          // robust check: is data an array?
          if (Array.isArray(response.data)) {
            newTemplates = response.data;
          } else if (response.data.templates && Array.isArray(response.data.templates)) {
            // Handle the specific response structure: data.templates
            newTemplates = response.data.templates;
            
            // Check distinct pagination logic if totalCount is present
            if (response.data.totalCount !== undefined) {
               // If we have loaded all items, stop loading more
               // But our simple infinite scroll logic relies on result length < pageSize
               // We can also check totalCount
               const currentTotal = this.templates.length + (reset ? 0 : newTemplates.length);
               // If the received batch is smaller than pageSize OR we've reached totalCount (approx logic)
            }
          } else if (response.data.items && Array.isArray(response.data.items)) {
            // Handle common pagination wrapper pattern
            newTemplates = response.data.items;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            // Handle nested data property
            newTemplates = response.data.data;
          }
          
          if (reset) {
            this.templates = newTemplates;
          } else {
            this.templates = [...this.templates, ...newTemplates];
          }

          // Check if there are more items
          // If we received fewer items than requested page size, we've reached the end
          if (newTemplates.length < this.pageSize) {
            this.hasMore = false;
          } else {
            // Also check against totalCount if available
            if (response.data.totalCount && this.templates.length >= response.data.totalCount) {
                this.hasMore = false;
            } else {
                this.currentPage++;
            }
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading templates:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.loadTemplates(true);
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 50; // Load more when 50px from bottom
    
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + threshold) {
      this.loadTemplates();
    }
  }

  selectTemplate(template: BackendTemplate): void {
    // this.selectedTemplateName = template.templateName; // Driven by Input now
    this.isOpen = false;
    this.templateSelected.emit(template.id);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
