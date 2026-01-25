import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService, ApiResponse } from '../../services/http.service';

// DTOs
export interface ChatSession {
  chatId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
}

export interface ChatSessionsResponse {
  sessions: ChatSession[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface CreateChatRequest {
  title?: string;
}

export interface CreateChatResponse {
  chatId: string;
  title: string;
  createdAt: string;
}

@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.css'
})
export class ChatSidebarComponent implements OnInit, OnDestroy {
  @Output() chatSelected = new EventEmitter<string>();
  @Output() sidebarToggled = new EventEmitter<boolean>();

  // Initial state depends on screen size
  isOpen = window.innerWidth >= 769;
  
  sessions: ChatSession[] = [];
  loading = false;
  error = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 20;
  totalCount = 0;
  hasMore = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // Emit initial state
    setTimeout(() => this.sidebarToggled.emit(this.isOpen));
    this.loadSessions();
    
    // Listen for window resize
    window.addEventListener('resize', this.onResize.bind(this));
  }
  
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
  }
  
  onResize(): void {
    if (window.innerWidth < 769 && this.isOpen) {
      this.isOpen = false;
      this.sidebarToggled.emit(this.isOpen);
    }
  }

  /**
   * Toggle sidebar open/close
   */
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    this.sidebarToggled.emit(this.isOpen);
  }

  /**
   * Load chat sessions
   */
  loadSessions(page: number = 1): void {
    this.loading = true;
    this.error = '';
    
    // Use relative URL - HttpService will prepend API base URL
    const url = `resume/chat/sessions?page=${page}&pageSize=${this.pageSize}`;

    this.httpService.get<ApiResponse<any>>(url).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          const data = response.data;
          
          // Handle response as array (new format)
          if (Array.isArray(data)) {
            const newSessions: ChatSession[] = data.map((item: any) => ({
              chatId: item.sessionId || item.chatId, // Handle both just in case
              title: item.title || 'Untitled Chat',
              createdAt: item.createdAt || new Date().toISOString(),
              updatedAt: item.updatedAt || new Date().toISOString(),
              messageCount: 0
            }));

            if (page === 1) {
              this.sessions = newSessions;
            } else {
              this.sessions = [...this.sessions, ...newSessions];
            }

            // Since API doesn't return pagination meta, determine hasMore by checking if we got a full page
            this.hasMore = newSessions.length >= this.pageSize;
            this.currentPage = page;
            
            // Approximate total for display if needed
            this.totalCount = this.sessions.length; 
          } 
          // Handle legacy/alternate format with { sessions: [], totalCount: ... }
          else if (data.sessions) {
            if (page === 1) {
              this.sessions = data.sessions;
            } else {
              this.sessions = [...this.sessions, ...data.sessions];
            }
            this.totalCount = data.totalCount;
            this.currentPage = data.page;
            this.hasMore = (this.currentPage * this.pageSize) < this.totalCount;
          }
          
          console.log('✅ Loaded chat sessions:', this.sessions.length);
        } else {
          this.error = response.message || 'Failed to load sessions';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error loading sessions:', error);
        this.error = 'Failed to load chat sessions';
        this.loading = false;
      }
    });
  }

  /**
   * Load more sessions (pagination)
   */
  loadMore(): void {
    if (this.hasMore && !this.loading) {
      this.loadSessions(this.currentPage + 1);
    }
  }

  /**
   * Create new chat session
   */
  createNewChat(): void {
    this.loading = true;
    this.error = '';
    const body: CreateChatRequest = { title: 'New Resume Chat' };

    this.httpService.post<ApiResponse<CreateChatResponse>>('resume/chat/create', body).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          console.log('✅ Created new chat:', response.data.chatId);
          
          // Add new session to the top of the list
          const newSession: ChatSession = {
            chatId: response.data.chatId,
            title: response.data.title,
            createdAt: response.data.createdAt,
            updatedAt: response.data.createdAt,
            messageCount: 0
          };
          
          this.sessions.unshift(newSession);
          this.totalCount++;
          
          // Select the new chat
          this.selectChat(response.data.chatId);
        } else {
          this.error = response.message || 'Failed to create chat';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error creating chat:', error);
        this.error = 'Failed to create new chat';
        this.loading = false;
      }
    });
  }

  /**
   * Select a chat session
   */
  selectChat(chatId: string): void {
    console.log('📝 Selected chat:', chatId);
    this.chatSelected.emit(chatId);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      this.isOpen = false;
      this.sidebarToggled.emit(false);
    }
  }

  /**
   * Delete a chat session
   */
  deleteChat(chatId: string, event: Event): void {
    event.stopPropagation(); // Prevent chat selection
    
    if (!confirm('Are you sure you want to delete this chat?')) {
      return;
    }

    this.httpService.delete<ApiResponse<void>>(`chat/${chatId}`).subscribe({
      next: (response) => {
        if (response.status) {
          console.log('✅ Deleted chat:', chatId);
          this.sessions = this.sessions.filter(s => s.chatId !== chatId);
          this.totalCount--;
        } else {
          this.error = response.message || 'Failed to delete chat';
        }
      },
      error: (error) => {
        console.error('❌ Error deleting chat:', error);
        this.error = 'Failed to delete chat';
      }
    });
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }
}
