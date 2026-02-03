import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rich-text-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rich-text-wrapper">
      <!-- Floating Toolbar -->
      <!-- Added mouseenter/leave to track interaction -->
      <div 
        class="floating-toolbar" 
        *ngIf="showToolbar"
        [style.top.px]="toolbarPosition.top"
        [style.left.px]="toolbarPosition.left"
        (mousedown)="$event.preventDefault()"
        (mouseenter)="isToolbarFocused = true"
        (mouseleave)="isToolbarFocused = false">
        
        <!-- Font Family -->
        <div class="tool-group">
            <select class="tool-select" 
                (change)="handleDropdownChange('fontName', $any($event.target).value)" 
                (click)="$event.stopPropagation()"
                title="Font Family">
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier</option>
                <option value="Times New Roman">Times</option>
                <option value="Verdana">Verdana</option>
            </select>
        </div>

        <!-- Font Size -->
        <div class="tool-group">
            <select class="tool-select size" 
                (change)="handleDropdownChange('fontSize', $any($event.target).value)" 
                (click)="$event.stopPropagation()" 
                title="Size">
                <option value="1">XS</option>
                <option value="2">S</option>
                <option value="3" selected>M</option>
                <option value="4">L</option>
                <option value="5">XL</option>
                <option value="6">XXL</option>
            </select>
        </div>
        
        <div class="separator"></div>

        <!-- Bold -->
        <button class="tool-btn" (click)="exec('bold')" [class.active]="isBold" title="Bold">
             <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
        </button>

        <!-- Italic -->
        <button class="tool-btn" (click)="exec('italic')" [class.active]="isItalic" title="Italic">
             <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
        </button>

        <!-- Underline -->
        <button class="tool-btn" (click)="exec('underline')" [class.active]="isUnderline" title="Underline">
             <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
        </button>

        <div class="separator"></div>

        <!-- Link -->
        <button class="tool-btn link-btn" (click)="toggleLink()" [class.active]="isLinkSelected" title="Link">
             <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
        </button>
        
        <!-- Unlink -->
        <button class="tool-btn remove-btn" *ngIf="isLinkSelected" (click)="removeLink()" title="Remove Link">
             <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

      </div>

      <!-- Editable Content -->
      <div 
        #editor
        class="rich-editor" 
        contenteditable="true" 
        [attr.placeholder]="placeholder"
        (input)="onInput()"
        (blur)="onBlur()"
        (mouseup)="checkSelection()"
        (keyup)="checkSelection()"
        (touchend)="checkSelectionDelayed()">
      </div>
    </div>
  `,
  styles: [`
    .rich-text-wrapper { position: relative; display: block; width: 100%; }
    
    .rich-editor {
      width: 100%; min-height: 1.5em; padding: 6px 8px;
      font-family: inherit; font-size: inherit; color: inherit;
      background: transparent; outline: none; white-space: pre-wrap;
      border: 1px dashed transparent; border-radius: 4px; line-height: 1.4;
    }
    .rich-editor:hover, .rich-editor:focus { border-color: rgba(0,0,0,0.1); background: rgba(0,0,0,0.01); }
    .rich-editor:empty:before { content: attr(placeholder); color: rgba(0,0,0,0.4); pointer-events: none; display: block; }

    :host ::ng-deep .rich-editor a { color: #2563eb; text-decoration: underline; cursor: pointer; }
    :host ::ng-deep .rich-editor b, :host ::ng-deep .rich-editor strong { font-weight: 700; }
    :host ::ng-deep .rich-editor i, :host ::ng-deep .rich-editor em { font-style: italic; }
    :host ::ng-deep .rich-editor u { text-decoration: underline; }
    
    .floating-toolbar {
      position: fixed; z-index: 999999; background: #222; color: #fff;
      padding: 6px 8px; border-radius: 6px; display: flex; align-items: center; gap: 4px;
      transform: translateX(-50%) translateY(-120%);
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.15);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      white-space: nowrap;
    }
    
    .floating-toolbar::after {
      content: ''; position: absolute; bottom: -6px; left: 50%; margin-left: -6px;
      border-width: 6px 6px 0; border-style: solid; border-color: #222 transparent transparent transparent;
    }

    .separator { width: 1px; height: 18px; background: rgba(255,255,255,0.2); margin: 0 4px; }

    .tool-btn {
      background: transparent; border: none; color: #ccc; cursor: pointer;
      width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .tool-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .tool-btn.active { background: rgba(255,255,255,0.2); color: #fff; }
    .link-btn { color: #60a5fa; }
    .remove-btn { color: #f87171; }
    
    .tool-select {
        background: transparent; border: none; color: #eee; font-size: 12px;
        padding: 4px; cursor: pointer; outline: none; border-radius: 3px; max-width: 80px;
    }
    .tool-select:hover { background: rgba(255,255,255,0.1); }
    .tool-select option { background: #333; color: white; }
    .tool-select.size { max-width: 50px; }
  `]
})
export class RichTextInputComponent implements AfterViewInit, OnDestroy {
  @Input() value: string | any = '';
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('editor') editorElem!: ElementRef<HTMLDivElement>;

  showToolbar = false;
  toolbarPosition = { top: 0, left: 0 };
  
  isBold = false;
  isItalic = false;
  isUnderline = false;
  isLinkSelected = false;
  
  isToolbarFocused = false; // Key flag to prevent hiding
  
  private savedRange: Range | null = null;
  private selectionListener: any;
  private clickOutsideListener: any;
  private selectionTimer: any;

  ngAfterViewInit() {
    if (this.value) this.editorElem.nativeElement.innerHTML = this.value;

    this.selectionListener = () => this.checkSelectionDelayed();
    document.addEventListener('selectionchange', this.selectionListener);

    this.clickOutsideListener = (e: Event) => {
        const target = e.target as Node;
        // Logic to close toolbar ONLY if clicking completely outside both editor and toolbar
        if (!this.editorElem.nativeElement.contains(target) && 
            !(target as Element).closest('.floating-toolbar')) {
            
            // Should hide
            this.showToolbar = false;
            this.isToolbarFocused = false;
        }
    };
    document.addEventListener('mousedown', this.clickOutsideListener);
    document.addEventListener('touchstart', this.clickOutsideListener);
  }

  ngOnDestroy() {
    document.removeEventListener('selectionchange', this.selectionListener);
    document.removeEventListener('mousedown', this.clickOutsideListener);
    document.removeEventListener('touchstart', this.clickOutsideListener);
  }

  onInput() {
    const html = this.editorElem.nativeElement.innerHTML;
    const text = this.editorElem.nativeElement.innerText;
    const isEmpty = !text.trim() && !html.includes('<img') && !html.includes('<a');
    this.valueChange.emit(isEmpty ? '' : html);
    this.checkSelectionDelayed();
  }

  onBlur() {
      // Defer hiding mainly to let click events on toolbar happen
      setTimeout(() => {
          // If focus moved to toolbar, don't hide
          if (!this.isToolbarFocused && !this.showToolbar) {
              // already handled by click outside usually
          }
      }, 100);
  }

  checkSelectionDelayed() {
      if (this.selectionTimer) clearTimeout(this.selectionTimer);
      this.selectionTimer = setTimeout(() => this.checkSelection(), 50);
  }

  checkSelection() {
    // If user is messing with toolbar, DONT update selection from text
    // (As the selection might be technically 'none' or 'body' during dropdown interaction)
    if (this.isToolbarFocused) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) { 
        // DO NOT hide toolbar if just lost focus but potentially clicking it
        // Handled by click outside
        return; 
    }

    const range = selection.getRangeAt(0);
    
    // Check if selection is within THIS editor
    if (this.editorElem.nativeElement.contains(range.commonAncestorContainer)) {
        // Valid selection in this editor
        this.savedRange = range.cloneRange(); // Save it!
        
        // Update styling state
        this.isBold = document.queryCommandState('bold');
        this.isItalic = document.queryCommandState('italic');
        this.isUnderline = document.queryCommandState('underline');
        
        const linkNode = this.getLinkAtSelection();
        this.isLinkSelected = !!linkNode;

        const isCollapsed = selection.isCollapsed;
        
        // Show if text selected OR link selected
        if (!isCollapsed || this.isLinkSelected) {
            const rect = range.getBoundingClientRect();
            let top = rect.top;
            let left = rect.left + (rect.width / 2);

            // Fix for collapsed (cursor only) selection inside link
            if (this.isLinkSelected && rect.width === 0 && linkNode) {
                const linkRect = linkNode.getBoundingClientRect();
                top = linkRect.top;
                left = linkRect.left + (linkRect.width / 2);
            }

            if (top !== 0 || left !== 0) {
                this.toolbarPosition = { top: top - 10, left: left };
                this.showToolbar = true;
            }
        } else {
            // Collapsed selection and not in link -> hide toolbar
            this.showToolbar = false;
        }
    } else {
        // Selection is elsewhere
        // But if we are clicking the toolbar, we shouldn't be here (isToolbarFocused guard)
        // If we really clicked elsewhere, clickOutsideListener will hide it.
    }
  }

  restoreSelection() {
      if (this.savedRange) {
          const selection = window.getSelection();
          if (selection) {
              selection.removeAllRanges();
              selection.addRange(this.savedRange);
          }
      }
      this.editorElem.nativeElement.focus();
  }

  exec(command: string) {
      this.restoreSelection();
      document.execCommand(command, false);
      this.onInput(); 
  }

  handleDropdownChange(command: string, value: string) {
      // Restore range immediately before executing
      this.restoreSelection();
      document.execCommand(command, false, value);
      this.onInput();
  }

  toggleLink() {
      this.restoreSelection();
      const link = this.getLinkAtSelection();
      let url = '';
      
      if (link) {
          url = prompt('Edit Link URL:', link.getAttribute('href') || 'https://') || '';
      } else {
          url = prompt('Enter Link URL:', 'https://') || '';
      }

      if (url) {
          if (!url.match(/^https?:\/\//) && !url.match(/^mailto:/) && !url.match(/^\//)) {
              url = 'https://' + url;
          }
          this.restoreSelection();
          document.execCommand('createLink', false, url);
          
          const newLink = this.getLinkAtSelection();
          if (newLink) newLink.target = '_blank';
          
          this.onInput(); 
      }
  }

  removeLink() {
      this.restoreSelection();
      document.execCommand('unlink');
      this.onInput();
  }

  getLinkAtSelection(): HTMLAnchorElement | null {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return null;
      let node = selection.anchorNode;
      while (node && node !== this.editorElem.nativeElement) {
          if (node.nodeName === 'A') return node as HTMLAnchorElement;
          node = node.parentNode;
      }
      return null;
  }
}
