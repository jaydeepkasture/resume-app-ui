# Enhancement Mode Toggle Feature

## Overview
The resume editor now includes a toggle button that switches between two enhancement modes:
1. **JSON Mode** (Default) - Preserves user styling
2. **HTML Mode** - Uses enhanced HTML from API

## Visual Indicator

The toggle button appears in the toolbar with:
- **JSON Mode** (inactive): Gray background, document icon with JSON symbol
- **HTML Mode** (active): Purple gradient background, code brackets icon

## How It Works

### JSON Mode (Default - Preserves Styling)
When the toggle is **OFF** (gray):
- ✅ Patches JSON data into existing DOM
- ✅ Preserves all user styling (fonts, sizes, colors)
- ✅ Only updates text content
- ✅ Shows change highlights
- ✅ User's manual formatting is never lost

**Use this when**: You want to keep your custom styling and formatting

### HTML Mode (Uses enhancedHtml)
When the toggle is **ON** (purple):
- 📄 Directly replaces editor content with `enhancedHtml` from API
- 📄 Uses whatever HTML the backend generates
- 📄 May include backend-generated styling
- 📄 Faster update (no DOM manipulation)
- ⚠️ User styling may be lost

**Use this when**: You trust the backend to generate complete, styled HTML

## API Response Structure

The enhance API returns:
```json
{
  "status": true,
  "data": {
    "currentResume": {
      "name": "John Doe",
      "summary": "Enhanced summary...",
      // ... other JSON fields
    },
    "enhancedHtml": "<div>...complete HTML...</div>"
  }
}
```

- **JSON Mode** uses `data.currentResume`
- **HTML Mode** uses `data.enhancedHtml`

## User Interface

### Button Location
The toggle button is located in the toolbar:
```
[Template] | [Undo/Redo] | [Format] | ... | [JSON/HTML Toggle] | [History]
```

### Button States

**JSON Mode (Default)**:
```
┌─────────────┐
│ 📄 JSON     │  ← Gray background
└─────────────┘
```

**HTML Mode (Active)**:
```
┌─────────────┐
│ </> HTML    │  ← Purple gradient background
└─────────────┘
```

### Tooltip
- **JSON Mode**: "JSON Mode: Preserving your styling"
- **HTML Mode**: "HTML Mode: Using enhancedHtml from API"

## Code Implementation

### TypeScript Component

**Property**:
```typescript
useHtmlMode: boolean = false; // false = JSON mode, true = HTML mode
```

**Toggle Method**:
```typescript
toggleEnhancementMode(): void {
  this.useHtmlMode = !this.useHtmlMode;
  console.log(`🔄 Enhancement mode switched to: ${this.useHtmlMode ? 'HTML Mode' : 'JSON Mode'}`);
}
```

**Update Logic**:
```typescript
private updateResumeWithEnhancedData(responseData: any): void {
  if (this.useHtmlMode) {
    // HTML MODE: Use enhancedHtml from API
    if (responseData.enhancedHtml) {
      this.editor.commands.setContent(responseData.enhancedHtml);
    }
  } else {
    // JSON MODE: Patch JSON data (preserves styling)
    this.patchJsonData(responseData);
  }
}
```

### HTML Template

```html
<button 
  class="toolbar-btn enhancement-mode-toggle" 
  (click)="toggleEnhancementMode()" 
  [class.active]="useHtmlMode"
  [title]="useHtmlMode ? 'HTML Mode: Using enhancedHtml from API' : 'JSON Mode: Preserving your styling'">
  <!-- Icon changes based on mode -->
  <svg *ngIf="!useHtmlMode"><!-- Document icon --></svg>
  <svg *ngIf="useHtmlMode"><!-- Code brackets icon --></svg>
  <span>{{ useHtmlMode ? 'HTML' : 'JSON' }}</span>
</button>
```

### CSS Styling

```css
.enhancement-mode-toggle {
  background: #f0f0f0 !important;  /* Gray when inactive */
  color: #666 !important;
}

.enhancement-mode-toggle.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;  /* Purple gradient when active */
}
```

## Use Cases

### Use Case 1: Preserving Custom Styling
**Scenario**: User has carefully styled their resume with specific fonts and colors

**Solution**: Keep toggle in **JSON Mode** (OFF)
- User's styling is preserved
- Only text content updates
- Highlights show what changed

### Use Case 2: Backend-Generated HTML
**Scenario**: Backend generates complete, styled HTML with complex formatting

**Solution**: Switch toggle to **HTML Mode** (ON)
- Backend HTML is used directly
- Faster update
- Backend controls all styling

### Use Case 3: Testing Both Modes
**Scenario**: Developer wants to compare JSON vs HTML modes

**Solution**: 
1. Send enhancement in JSON mode → See result
2. Toggle to HTML mode
3. Send same enhancement → See result
4. Compare differences

## Workflow Examples

### Example 1: JSON Mode (Preserve Styling)

```
1. User loads resume
2. User changes name font to Arial 24px Blue
3. User sends: "Make my name all caps"
4. Toggle is OFF (JSON mode)
5. API returns:
   - currentResume: { name: "JOHN DOE" }
   - enhancedHtml: "<p>JOHN DOE</p>"
6. System uses currentResume (JSON)
7. Name becomes "JOHN DOE" but stays Arial 24px Blue ✅
```

### Example 2: HTML Mode (Use Backend HTML)

```
1. User loads resume
2. User changes name font to Arial 24px Blue
3. User sends: "Make my name all caps"
4. Toggle is ON (HTML mode)
5. API returns:
   - currentResume: { name: "JOHN DOE" }
   - enhancedHtml: "<p style='font-family: Times'>JOHN DOE</p>"
6. System uses enhancedHtml
7. Name becomes "JOHN DOE" in Times font (backend styling) ⚠️
```

## Console Output

### JSON Mode
```
🔄 Enhancement mode switched to: JSON Mode (Preserve Styling)
🔧 JSON Mode: Patching data into existing DOM (preserving styling)
Patching enhanced data into existing editor content...
🔧 Patching enhanced data into live editor DOM...
Field: name, Old: "John Doe", New: "JOHN DOE", Changed: true
🎨 Highlighting change for field: name
✅ Content patched successfully in live DOM, user styling preserved
```

### HTML Mode
```
🔄 Enhancement mode switched to: HTML Mode
📄 HTML Mode: Using enhancedHtml from API
✅ Editor content replaced with enhancedHtml
```

## Fallback Behavior

If `enhancedHtml` is not present in the API response while in HTML mode:
```typescript
if (!responseData.enhancedHtml) {
  console.warn('⚠️ No enhancedHtml in response, falling back to JSON mode');
  this.patchJsonData(responseData);
}
```

## Best Practices

### For Users
1. **Default to JSON Mode** - Preserves your work
2. **Use HTML Mode** only if backend generates complete HTML
3. **Toggle before enhancing** - Mode affects next enhancement
4. **Test both modes** to see which works better for your use case

### For Developers
1. **Ensure API returns both** `currentResume` and `enhancedHtml`
2. **Make enhancedHtml optional** - JSON mode should always work
3. **Log mode switches** for debugging
4. **Document backend HTML structure** if using HTML mode

## Troubleshooting

### Issue: Toggle doesn't change anything
**Solution**: Check console for mode switch message. Verify API returns both data types.

### Issue: Styling lost in JSON mode
**Solution**: This shouldn't happen. Check if live DOM manipulation is working correctly.

### Issue: HTML mode shows unstyled content
**Solution**: Backend's `enhancedHtml` may not include styles. Check API response.

### Issue: Toggle button not visible
**Solution**: Check toolbar CSS, ensure button is not hidden by overflow.

## Future Enhancements

1. **Auto-detect mode** - Automatically choose best mode based on API response
2. **Mode persistence** - Remember user's preference across sessions
3. **Preview mode** - Show preview before applying
4. **Hybrid mode** - Use HTML but preserve certain user styles

## Comparison Table

| Feature | JSON Mode | HTML Mode |
|---------|-----------|-----------|
| Preserves user styling | ✅ Yes | ❌ No |
| Uses backend HTML | ❌ No | ✅ Yes |
| Shows change highlights | ✅ Yes | ❌ No |
| Update speed | Slower (DOM manipulation) | Faster (direct replace) |
| Requires enhancedHtml | ❌ No | ✅ Yes |
| Fallback available | N/A | ✅ Yes (to JSON) |
| Best for | Custom styled resumes | Backend-generated HTML |

## Summary

The enhancement mode toggle gives users control over how AI enhancements are applied:
- **JSON Mode** (default): Preserves styling, patches data
- **HTML Mode**: Uses backend HTML, faster but may lose styling

Choose the mode that best fits your workflow!
