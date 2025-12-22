# Prompts Library Usage Guide

This document explains how to use the reusable prompt components throughout the Review UI application.

## Overview

The prompts system provides beautiful, animated modal dialogs for user feedback and confirmations. All prompts are built with:
- ✨ Smooth animations and glass-morphism design
- 🎨 Gradient icons and buttons
- 🎯 Easy state management with the `usePrompt` hook
- 📱 Responsive and mobile-friendly

## Available Prompts

### 1. Success Prompt
Used to confirm successful actions to the user.

```jsx
prompt.showSuccess(
  'Profile Updated',
  'Your account information has been saved successfully.'
);
```

**Features:**
- Green gradient icon (CheckCircle)
- Customizable title and message
- Single "Got it" button
- Auto-close with onConfirm callback

---

### 2. Error Prompt
Used to display error messages to the user.

```jsx
prompt.showError(
  'Invalid Email',
  'Please enter a valid email address.'
);
```

**Features:**
- Red gradient icon (XCircle)
- Clear error messaging
- Single "Close" button
- onConfirm callback support

---

### 3. Confirmation Prompt
Used for warnings and confirmations before destructive actions.

```jsx
prompt.showConfirm(
  'Logout from All Devices?',
  'You will be logged out from all your active sessions.',
  () => {
    // Handle confirmation
    handleLogout();
  },
  {
    confirmText: 'Yes, Logout All',
    cancelText: 'Cancel',
    type: 'danger'  // 'warning' or 'danger'
  }
);
```

**Features:**
- Orange icon for warnings, Red for danger
- Two-button layout (Cancel/Confirm)
- Customizable button text
- Type-based styling (warning/danger)

---

### 4. Info Prompt
Used to display informational messages.

```jsx
prompt.showInfo(
  'New Feature Available',
  'We&apos;ve added AI-powered reply suggestions to help you respond faster!'
);
```

**Features:**
- Blue gradient icon (Info)
- Single "Got it" button
- Great for announcements

---

### 5. Loading Prompt
Used during asynchronous operations to show progress.

```jsx
prompt.showLoading('Sending your reply...');

// Later, close it:
prompt.closePrompt();
```

**Features:**
- Spinning loader with bouncing indicator dots
- Prevents user interaction during loading
- No close button (user must wait)
- Customizable loading message

---

### 6. Delete Prompt
Specialized prompt for delete confirmations.

```jsx
prompt.showDelete(
  'Account',  // Item name
  () => {
    // Handle deletion
    deleteAccount();
  }
);
```

**Features:**
- Red gradient icon (Trash2)
- Pre-formatted delete message
- Clear warning about permanent deletion
- Cancel and Delete buttons

---

## Setup

### 1. Import the Hook
```jsx
'use client';

import { usePrompt } from '@/src/components/usePrompt';

export default function MyComponent() {
  const prompt = usePrompt();
  
  // ... your code
}
```

### 2. Add Prompt Renderer
At the end of your component, add the prompt renderer:

```jsx
return (
  <div>
    {/* Your component JSX */}
    
    {/* Add this at the bottom */}
    <prompt.PromptRenderer />
  </div>
);
```

---

## Common Patterns

### Pattern 1: Form Submission with Loading State
```jsx
const handleSubmit = async (formData) => {
  prompt.showLoading('Saving your profile...');
  
  try {
    await api.updateProfile(formData);
    
    prompt.closePrompt();
    prompt.showSuccess(
      'Profile Updated',
      'Your changes have been saved.'
    );
  } catch (error) {
    prompt.closePrompt();
    prompt.showError(
      'Error',
      error.message || 'Something went wrong'
    );
  }
};
```

### Pattern 2: Confirmation Before Deletion
```jsx
const handleDelete = (itemId) => {
  prompt.showConfirm(
    'Delete Item?',
    'This action cannot be undone.',
    async () => {
      prompt.showLoading('Deleting...');
      
      try {
        await api.deleteItem(itemId);
        prompt.closePrompt();
        prompt.showSuccess('Deleted', 'Item has been removed.');
      } catch (error) {
        prompt.closePrompt();
        prompt.showError('Error', error.message);
      }
    },
    { type: 'danger', confirmText: 'Delete', cancelText: 'Cancel' }
  );
};
```

### Pattern 3: Sequential Operations
```jsx
const handleComplexOperation = async () => {
  // Step 1: Confirm
  prompt.showConfirm(
    'Proceed?',
    'This will perform a complex operation.',
    async () => {
      // Step 2: Show loading
      prompt.showLoading('Processing...');
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 3: Show success
      prompt.closePrompt();
      prompt.showSuccess(
        'Complete!',
        'Your operation was successful.'
      );
    }
  );
};
```

### Pattern 4: Validation Feedback
```jsx
const handlePasswordChange = () => {
  if (newPassword !== confirmPassword) {
    prompt.showError(
      'Password Mismatch',
      'Your passwords do not match. Please try again.'
    );
    return;
  }
  
  if (newPassword.length < 8) {
    prompt.showError(
      'Weak Password',
      'Password must be at least 8 characters long.'
    );
    return;
  }
  
  // Proceed with password change
};
```

---

## Real-World Examples from Codebase

### Settings Page - Password Change
```jsx
const handleChangePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    prompt.showError('Password Mismatch', 'Passwords do not match.');
    return;
  }
  
  prompt.showLoading('Updating password...');
  setTimeout(() => {
    prompt.closePrompt();
    prompt.showSuccess('Password Changed', 'Your password has been updated.');
  }, 1500);
};
```

### Reviews Page - Reply Submission
```jsx
const handleReplySubmit = () => {
  if (!selectedReply.trim()) {
    prompt.showError('Empty Reply', 'Please write a reply.');
    return;
  }

  prompt.showLoading('Sending your reply...');
  setTimeout(() => {
    prompt.closePrompt();
    prompt.showSuccess('Reply Sent', 'Your reply has been published.');
  }, 1500);
};
```

### Reviews Page - Mark as Resolved
```jsx
const handleMarkResolved = (review) => {
  prompt.showConfirm(
    'Mark as Resolved?',
    `Mark "${review.name}'s" review as resolved.`,
    () => {
      prompt.showLoading('Marking as resolved...');
      setTimeout(() => {
        prompt.closePrompt();
        prompt.showSuccess('Marked Resolved', 'Review marked as resolved.');
      }, 1200);
    },
    { confirmText: 'Mark Resolved', cancelText: 'Cancel', type: 'warning' }
  );
};
```

---

## Styling & Customization

All prompts come with default styling. To customize:

### Custom Colors
Modify the gradient classes in `src/components/Prompts.jsx`:
```jsx
// Change success color
<div className="bg-gradient-to-br from-blue-500 to-blue-600">
```

### Custom Icons
Replace icons from lucide-react:
```jsx
import { AlertCircle } from 'lucide-react';

<AlertCircle className="text-white" size={32} />
```

### Animation Timing
Adjust duration classes in CSS or via setTimeout:
```jsx
// Fast: duration-300
// Normal: duration-500
// Slow: duration-700
```

---

## Best Practices

✅ **DO:**
- Use loading prompts during async operations
- Confirm destructive actions (delete, logout)
- Provide clear, concise messages
- Close loading prompts after operations complete
- Give users feedback on success/failure

❌ **DON'T:**
- Show too many prompts in sequence
- Use error prompts for simple validation
- Leave loading prompts open indefinitely
- Use success prompts for minor updates
- Show prompts on page load

---

## Component Files

- **`src/components/Prompts.jsx`** - Reusable prompt components
- **`src/components/usePrompt.js`** - Hook for managing prompts
- **`app/layout.jsx`** - Global prompt styles initialization

---

## Support

For issues or questions about the prompts system, refer to the component files or the examples in:
- `app/(protected)/settings/page.jsx`
- `app/(protected)/reviews/page.jsx`
- `app/(protected)/account/page.jsx`
