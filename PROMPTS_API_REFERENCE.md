# Prompts API Reference

Quick reference for all available prompt methods.

## Methods

### `prompt.showSuccess(title, message, onConfirm?)`
Shows a success prompt with green checkmark.

```jsx
prompt.showSuccess(
  'Profile Updated',
  'Your changes have been saved successfully.'
);
```

**Parameters:**
- `title` (string) - Prompt title
- `message` (string) - Prompt message  
- `onConfirm` (function, optional) - Callback when user clicks "Got it"

---

### `prompt.showError(title, message, onConfirm?)`
Shows an error prompt with red X icon.

```jsx
prompt.showError(
  'Invalid Email',
  'Please enter a valid email address.'
);
```

**Parameters:**
- `title` (string) - Error title
- `message` (string) - Error message
- `onConfirm` (function, optional) - Callback when closed

---

### `prompt.showInfo(title, message, onConfirm?)`
Shows an info prompt with blue icon.

```jsx
prompt.showInfo(
  'New Feature Available',
  'Check out our new AI-powered suggestions!'
);
```

**Parameters:**
- `title` (string) - Info title
- `message` (string) - Info message
- `onConfirm` (function, optional) - Callback when closed

---

### `prompt.showConfirm(title, message, onConfirm, options?)`
Shows a confirmation prompt (warning or danger style).

```jsx
prompt.showConfirm(
  'Delete Item?',
  'This action cannot be undone.',
  () => {
    // User clicked confirm
    console.log('Item deleted');
  },
  {
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger'  // 'warning' | 'danger'
  }
);
```

**Parameters:**
- `title` (string) - Confirmation title
- `message` (string) - Confirmation message
- `onConfirm` (function) - Callback when user confirms
- `options` (object, optional)
  - `confirmText` (string) - Text for confirm button (default: "Confirm")
  - `cancelText` (string) - Text for cancel button (default: "Cancel")
  - `type` (string) - 'warning' (orange) or 'danger' (red) (default: 'warning')

---

### `prompt.showLoading(message)`
Shows a loading prompt with spinner. User cannot interact with the page.

```jsx
prompt.showLoading('Saving your profile...');

// Later, close it:
setTimeout(() => {
  prompt.closePrompt();
}, 2000);
```

**Parameters:**
- `message` (string) - Loading message with optional animated dots

---

### `prompt.showDelete(itemName, onConfirm)`
Shows a delete confirmation prompt. Specialized for delete operations.

```jsx
prompt.showDelete(
  'Review',  // Item being deleted
  () => {
    // User confirmed deletion
    console.log('Review deleted');
  }
);
```

**Parameters:**
- `itemName` (string) - Name of item being deleted
- `onConfirm` (function) - Callback when user confirms deletion

---

### `prompt.closePrompt()`
Manually close the currently open prompt.

```jsx
prompt.closePrompt();
```

**Use cases:**
- Close loading prompt after operation completes
- Close any prompt without callback
- Reset prompt state

---

## Common Patterns

### Loading → Success Flow
```jsx
const handleSave = async () => {
  prompt.showLoading('Saving...');
  
  try {
    await api.save(data);
    prompt.closePrompt();
    prompt.showSuccess('Saved!', 'Your changes have been saved.');
  } catch (error) {
    prompt.closePrompt();
    prompt.showError('Error', error.message);
  }
};
```

### Confirm → Action → Success
```jsx
const handleDelete = () => {
  prompt.showConfirm(
    'Delete Item?',
    'This action cannot be undone.',
    async () => {
      prompt.showLoading('Deleting...');
      
      try {
        await api.delete(id);
        prompt.closePrompt();
        prompt.showSuccess('Deleted!', 'Item has been removed.');
      } catch (error) {
        prompt.closePrompt();
        prompt.showError('Error', error.message);
      }
    },
    { type: 'danger' }
  );
};
```

### Validation Error
```jsx
const handleValidation = (email) => {
  if (!email.includes('@')) {
    prompt.showError(
      'Invalid Email',
      'Please enter a valid email address.'
    );
    return false;
  }
  return true;
};
```

### Info Announcement
```jsx
const showAnnouncement = () => {
  prompt.showInfo(
    'New Feature',
    'We&apos;ve added automatic reply suggestions!'
  );
};
```

---

## Prompt Renderer

Every component using prompts must include the renderer at the end of JSX:

```jsx
export default function MyComponent() {
  const prompt = usePrompt();
  
  return (
    <div>
      {/* Your component content */}
      
      {/* Always include this at the end */}
      <prompt.PromptRenderer />
    </div>
  );
}
```

---

## Styling Customization

### Colors

Edit gradient colors in `src/components/Prompts.jsx`:

```jsx
// Success - Green
from-green-500 to-emerald-600

// Error - Red
from-red-500 to-rose-600

// Info - Blue
from-blue-500 to-indigo-600

// Warning - Orange
from-orange-500 to-amber-600

// Danger - Red
from-red-500 to-rose-600

// Loading - Purple
// (Integrated colors)
```

### Animation Timing

Adjust durations:
- `duration-300` - 300ms (fast)
- `duration-500` - 500ms (normal)
- `duration-700` - 700ms (slow)

Modify in JSX style tags.

### Icons

Change icons in `src/components/Prompts.jsx`:

```jsx
import { 
  CheckCircle,      // Success
  XCircle,          // Error
  Info,             // Info
  AlertTriangle,    // Warning/Danger
  Trash2,           // Delete
  Loader            // Loading
} from 'lucide-react';
```

---

## Type Safety

For better type hints, you can create type definitions:

```typescript
// types/prompt.ts
export type PromptType = 'success' | 'error' | 'info' | 'confirm' | 'loading' | 'delete';

export interface PromptOptions {
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger';
}
```

---

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

---

## Accessibility

Prompts include:
- ✅ Proper z-index management
- ✅ Backdrop blur prevents interaction with background
- ✅ Clear button labels
- ✅ Color not sole indicator (icons + text)
- ✅ Keyboard support (Escape to close where applicable)

---

## Performance

- Lightweight components (~3KB minified)
- No external dependencies beyond React and Tailwind
- Smooth 60fps animations
- Efficient state management

---

## Troubleshooting

### Prompt not showing?
- Make sure you added `<prompt.PromptRenderer />` at end of JSX
- Check that you used `const prompt = usePrompt()` hook
- Verify you're in a client component (`'use client'` directive)

### Multiple prompts showing?
- Call `prompt.closePrompt()` before showing next prompt
- Prompts auto-stack but only one displays at a time

### Styles not applying?
- Ensure Tailwind CSS is properly configured
- Check that global styles loaded in `app/layout.jsx`
- Verify `PromptStyles` component is imported

### Callbacks not firing?
- Make sure `onConfirm` is passed as function
- Check that function doesn't throw errors
- Use `async/await` for async operations inside callbacks

---

## Examples in Codebase

Real-world usage:
- `app/(protected)/settings/page.jsx` - Password, account operations
- `app/(protected)/reviews/page.jsx` - Reply submission, resolution
- `app/(protected)/account/page.jsx` - Profile updates
- `app/(protected)/prompts-showcase/page.jsx` - Interactive demo

---

## Support

For more information:
- See `PROMPTS_USAGE.md` for detailed guide
- See `PROMPTS_INTEGRATION_COMPLETE.md` for overview
- Check example pages for real-world usage
