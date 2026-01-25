import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateService } from '../../resume-editor/template.service';

interface HistoryItem {
  id: string;
  userMessage: string;
  createdAt: string;
}

@Component({
  selector: 'app-history-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-sidebar.component.html',
  styleUrl: './history-sidebar.component.css'
})
export class HistorySidebarComponent implements OnChanges {
  @Input() chatId: string | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() historySelected = new EventEmitter<string>();

  historyItems: HistoryItem[] = [];
  loading: boolean = false;
  error: string = '';
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 20;
  hasMore: boolean = true;
  
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private templateService: TemplateService) {
    console.log('HistorySidebarComponent initialized');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && this.chatId) {
      this.resetAndLoad();
    }
    
    // If opened and we have a chat ID but no items (and not loading), load them
    if (changes['isOpen'] && this.isOpen && this.chatId && this.historyItems.length === 0 && !this.loading) {
      this.loadHistory();
    }
  }

  resetAndLoad(): void {
    this.historyItems = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.error = '';
    if (this.isOpen) {
        this.loadHistory();
    }
  }

  loadHistory(): void {
    if (!this.chatId || this.loading || !this.hasMore) return;

    this.loading = true;
    this.templateService.getChatHistory(this.chatId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          const newItems = response.data;
          
          if (newItems.length < this.pageSize) {
            this.hasMore = false;
          }
          
          if (this.currentPage === 1) {
            this.historyItems = newItems;
          } else {
            this.historyItems = [...this.historyItems, ...newItems];
          }
          
          this.currentPage++;
        } else {
          this.error = response.message || 'Failed to load history';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading history:', err);
        this.error = 'Failed to load history';
        this.loading = false;
      }
    });
  }

  onScroll(event: any): void {
    const element = event.target;
    // Check if scrolled near bottom
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
      this.loadHistory();
    }
  }
  
  onCardClick(historyId: string): void {
    this.historySelected.emit(historyId);
    // Optional: close sidebar on selection? The user didn't specify.
    // this.closeSidebar.emit(); 
  }

  copyToClipboard(text: string, event: Event): void {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast here, for now just console
      console.log('Copied to clipboard');
      // maybe change icon temporarily?
      const btn = (event.currentTarget as HTMLElement);
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2000);
    }).catch(err => {
      console.error('Failed to copy', err);
    });
  }

  // Helper to truncate text
  truncate(text: string, limit: number): string {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  }

  // Helper to format date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
}
