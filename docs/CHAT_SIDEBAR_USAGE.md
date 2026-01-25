# Chat Sidebar Component - Usage Guide

## Overview

A ChatGPT-style sliding sidebar for managing resume chat sessions with features like:
- ✅ Create new resume chats
- ✅ List all chat sessions with pagination
- ✅ Delete chat sessions
- ✅ Responsive design (mobile & desktop)
- ✅ Smooth animations
- ✅ Dark theme

## Features

### 1. **New Resume Button**
- Creates a new chat session via `POST /api/chat/create`
- Adds the new session to the top of the list
- Automatically selects the new chat

### 2. **Chat Sessions List**
- Fetches sessions from `GET /api/chat/sessions?page=1&pageSize=20`
- Displays session title and last updated time
- Shows relative time (e.g., "5m ago", "2h ago", "3d ago")
- Pagination support with "Load More" button

### 3. **Delete Chat**
- Delete button appears on hover
- Confirmation dialog before deletion
- Removes session from list after successful deletion

### 4. **Responsive Design**
- **Desktop**: Sidebar always visible on the left
- **Mobile**: Sidebar slides in/out with toggle button
- Overlay background on mobile when sidebar is open

## API Integration

### Get Chat Sessions
```
GET /api/chat/sessions?page=1&pageSize=20

Response:
{
  "status": true,
  "message": "Sessions retrieved successfully",
  "data": {
    "sessions": [
      {
        "chatId": "uuid",
        "title": "My Resume Chat",
        "createdAt": "2026-01-20T10:00:00Z",
        "updatedAt": "2026-01-20T12:00:00Z",
        "messageCount": 5
      }
    ],
    "totalCount": 50,
    "page": 1,
    "pageSize": 20
  }
}
```

### Create New Chat
```
POST /api/chat/create

Request Body:
{
  "title": "New Resume Chat"  // Optional
}

Response:
{
  "status": true,
  "message": "Chat created successfully",
  "data": {
    "chatId": "new-uuid",
    "title": "New Resume Chat",
    "createdAt": "2026-01-20T13:00:00Z"
  }
}
```

### Delete Chat
```
DELETE /api/chat/{chatId}

Response:
{
  "status": true,
  "message": "Chat deleted successfully"
}
```

## Usage in Resume Editor

### 1. Import the Component

```typescript
import { ChatSidebarComponent } from '../components/chat-sidebar/chat-sidebar.component';

@Component({
  selector: 'app-resume-editor',
  standalone: true,
  imports: [
    CommonModule,
    ChatSidebarComponent,  // Add this
    // ... other imports
  ],
  // ...
})
```

### 2. Add to Template

```html
<!-- Add sidebar -->
<app-chat-sidebar
  (chatSelected)="onChatSelected($event)"
  (sidebarToggled)="onSidebarToggled($event)"
></app-chat-sidebar>

<!-- Your existing editor content -->
<div class="editor-container" [class.sidebar-open]="sidebarOpen">
  <!-- Editor content -->
</div>
```

### 3. Handle Events in Component

```typescript
export class ResumeEditorComponent {
  sidebarOpen = false;
  currentChatId: string | null = null;

  onChatSelected(chatId: string): void {
    console.log('Selected chat:', chatId);
    this.currentChatId = chatId;
    // Load chat messages or resume data for this chat
    this.loadChatData(chatId);
  }

  onSidebarToggled(isOpen: boolean): void {
    this.sidebarOpen = isOpen;
    // Adjust editor layout if needed
  }

  loadChatData(chatId: string): void {
    // Implement your logic to load chat data
  }
}
```

### 4. Add CSS for Layout

```css
/* Adjust editor container when sidebar is open */
.editor-container {
  margin-left: 0;
  transition: margin-left 0.3s;
}

@media (min-width: 769px) {
  .editor-container {
    margin-left: 280px;  /* Sidebar width */
  }
}
```

## Customization

### Change Colors

Edit `chat-sidebar.component.css`:

```css
/* Background gradient */
.sidebar {
  background: linear-gradient(180deg, #your-color-1 0%, #your-color-2 100%);
}

/* New Resume button */
.new-chat-btn {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### Change Sidebar Width

```css
.sidebar {
  width: 320px;  /* Change from 280px */
  left: -320px;  /* Match width */
}

.sidebar-toggle.open {
  left: 340px;  /* Width + 20px */
}
```

### Change Page Size

```typescript
export class ChatSidebarComponent {
  pageSize = 50;  // Change from 20
}
```

## Component API

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `chatSelected` | `EventEmitter<string>` | Emits when a chat is selected (chatId) |
| `sidebarToggled` | `EventEmitter<boolean>` | Emits when sidebar is toggled (isOpen) |

### Methods

| Method | Description |
|--------|-------------|
| `toggleSidebar()` | Toggle sidebar open/close |
| `loadSessions(page)` | Load chat sessions for a specific page |
| `loadMore()` | Load next page of sessions |
| `createNewChat()` | Create a new chat session |
| `selectChat(chatId)` | Select a chat session |
| `deleteChat(chatId)` | Delete a chat session |

## Styling

The sidebar uses:
- **Dark theme** with gradient background
- **Smooth animations** for all interactions
- **Hover effects** on session items
- **Responsive design** for mobile and desktop
- **Custom scrollbar** styling
- **Loading states** with spinners
- **Empty states** with helpful messages

## Mobile Behavior

- Sidebar hidden by default
- Toggle button in top-left corner
- Overlay background when open
- Swipe to close (via overlay click)
- Auto-close after selecting a chat

## Desktop Behavior

- Sidebar always visible
- No toggle button
- Editor content has left margin
- No overlay

## Error Handling

The component handles:
- ✅ Network errors
- ✅ Empty response
- ✅ Failed API calls
- ✅ Loading states
- ✅ Retry functionality

## Performance

- ✅ Pagination to avoid loading all sessions at once
- ✅ Lazy loading with "Load More"
- ✅ Efficient re-rendering with Angular change detection
- ✅ CSS transitions for smooth animations

## Accessibility

- ✅ Keyboard navigation support
- ✅ ARIA labels (can be added)
- ✅ Focus management
- ✅ Screen reader friendly (can be enhanced)

## Summary

✅ ChatGPT-style sidebar component
✅ Full CRUD operations for chat sessions
✅ Responsive design
✅ Smooth animations
✅ Dark theme
✅ Pagination support
✅ Error handling
✅ Loading states

Ready to use in your resume editor! 🎉
