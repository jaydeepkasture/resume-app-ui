import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService, ApiResponse } from '../../services/http.service';
import { AuthService } from '../../auth/auth.service';

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

export interface UpdateChatTitleRequest {
  title: string;
}

export interface UpdateChatTitleResponse {
  chatId: string;
  title: string;
  updatedAt: string;
}

@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  
  // Edit state
  editingChatId: string | null = null;
  editingTitle: string = '';

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {}

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
   * Handle resume file upload
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['.docx', '.pdf', '.doc'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(extension)) {
      alert('Invalid file type. Only DOCX, DOC, and PDF files are allowed.');
      return;
    }

    this.loading = true;
    console.log('📤 Uploading resume:', file.name);

    this.httpService.uploadFile<ApiResponse<any>>('resume/upload', file).subscribe({
      next: (response) => {
        if (response.status) {
          console.log('✅ Resume uploaded successfully');
          alert('Resume uploaded successfully. We will enhance it for you!');
          this.loadSessions(1); // Refresh sessions to show the potential new chat
        } else {
          console.error('❌ Upload failed:', response.message);
          alert(response.message || 'Failed to upload resume.');
        }
        this.loading = false;
        // Reset file input
        event.target.value = '';
      },
      error: (err) => {
        console.error('❌ Upload error:', err);
        alert('An error occurred during upload. Please try again.');
        this.loading = false;
        // Reset file input
        event.target.value = '';
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

    this.httpService.delete<ApiResponse<void>>(`resume/chat/${chatId}`).subscribe({
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
   * Start editing chat title
   */
  startEditingTitle(chatId: string, currentTitle: string, event: Event): void {
    event.stopPropagation(); // Prevent chat selection
    this.editingChatId = chatId;
    this.editingTitle = currentTitle;
  }

  /**
   * Cancel editing chat title
   */
  cancelEditingTitle(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.editingChatId = null;
    this.editingTitle = '';
  }

  /**
   * Save updated chat title
   */
  saveTitle(chatId: string, event: Event): void {
    event.stopPropagation();
    
    const newTitle = this.editingTitle.trim();
    if (!newTitle) {
      this.error = 'Title cannot be empty';
      return;
    }

    const body: UpdateChatTitleRequest = { title: newTitle };

    this.httpService.patch<ApiResponse<UpdateChatTitleResponse>>(`resume/chat/${chatId}/title`, body).subscribe({
      next: (response) => {
        if (response.status && response.data) {
          console.log('✅ Updated chat title:', response.data);
          
          // Update the session in the list
          const session = this.sessions.find(s => s.chatId === chatId);
          if (session) {
            session.title = response.data.title;
            session.updatedAt = response.data.updatedAt;
          }
          
          this.cancelEditingTitle();
        } else {
          this.error = response.message || 'Failed to update title';
        }
      },
      error: (error) => {
        console.error('❌ Error updating title:', error);
        this.error = 'Failed to update title';
      }
    });
  }

  /**
   * Handle Enter key in title input
   */
  onTitleKeydown(event: KeyboardEvent, chatId: string): void {
    if (event.key === 'Enter') {
      this.saveTitle(chatId, event);
    } else if (event.key === 'Escape') {
      this.cancelEditingTitle(event);
    }
  }

  /**
   * Format date for display
   */
  /* Existing formatDate method */
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

  // User Profile Methods
  
  get currentUser(): any {
    return this.authService.currentUserValue;
  }
  
  getUserInitials(): string {
    const user = this.currentUser;
    if (!user) return 'U';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    } else if (user.name) {
      return user.name.substring(0, 2).toUpperCase();
    } else if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return 'U';
  }
  
  getUserDisplayName(): string {
    const user = this.currentUser;
    if (!user) return 'User';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.name) {
      return user.name;
    } else if (user.email) {
      // Return email prefix if no name
      const atIndex = user.email.indexOf('@');
      return atIndex > -1 ? user.email.substring(0, atIndex) : user.email;
    }
    
    return 'User';
  }
  
  navigateToProfile(): void {
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      this.isOpen = false;
      this.sidebarToggled.emit(false);
    }
    this.router.navigate(['/profile']);
  }
  
  logout(): void {
    if (confirm('Are you sure you want to sign out?')) {
      this.authService.logout();
    }
  }
}

