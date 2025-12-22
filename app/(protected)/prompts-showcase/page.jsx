'use client';

import { useState } from 'react';
import { usePrompt } from '@/src/components/usePrompt';

export default function PromptShowcase() {
  const prompt = usePrompt();

  const demonstrations = [
    {
      id: 'success',
      label: 'Success Prompt',
      color: 'from-green-600 to-emerald-600',
      action: () => prompt.showSuccess(
        'Changes Saved!',
        'Your settings have been updated successfully.'
      )
    },
    {
      id: 'error',
      label: 'Error Prompt',
      color: 'from-red-600 to-rose-600',
      action: () => prompt.showError(
        'Something Went Wrong',
        'We couldn&apos;t process your request. Please try again later.'
      )
    },
    {
      id: 'warning',
      label: 'Warning Confirm',
      color: 'from-orange-600 to-amber-600',
      action: () => prompt.showConfirm(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to leave?',
        () => console.log('Confirmed'),
        { confirmText: 'Discard', cancelText: 'Keep Editing', type: 'warning' }
      )
    },
    {
      id: 'danger',
      label: 'Danger Confirm',
      color: 'from-red-600 to-rose-600',
      action: () => prompt.showConfirm(
        'Delete Account?',
        'This will permanently delete your account and all your data. This action cannot be undone.',
        () => console.log('Deletion confirmed'),
        { confirmText: 'Delete Forever', cancelText: 'Cancel', type: 'danger' }
      )
    },
    {
      id: 'info',
      label: 'Info Prompt',
      color: 'from-blue-600 to-indigo-600',
      action: () => prompt.showInfo(
        'New Feature',
        'We&apos;ve added AI-powered reply suggestions to help you respond faster!'
      )
    },
    {
      id: 'loading',
      label: 'Loading Prompt',
      color: 'from-indigo-600 to-purple-600',
      action: () => {
        prompt.showLoading('Processing your request...');
        setTimeout(() => {
          prompt.closePrompt();
          prompt.showSuccess('Complete!', 'Your request has been processed.');
        }, 2500);
      }
    },
    {
      id: 'delete',
      label: 'Delete Prompt',
      color: 'from-red-600 to-rose-600',
      action: () => prompt.showDelete(
        'Review',
        () => console.log('Delete confirmed')
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Prompt Components Showcase</h1>
          <p className="text-gray-600 text-lg">
            Click any button below to see the prompt in action
          </p>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {demonstrations.map((demo) => (
            <button
              key={demo.id}
              onClick={demo.action}
              className={`py-4 px-6 bg-gradient-to-r ${demo.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col items-center gap-2`}
            >
              <span>{demo.label}</span>
              <span className="text-xs opacity-90">Click to preview</span>
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="backdrop-blur-lg bg-white/60 rounded-xl border border-white/30 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Import the hook in your component:</h3>
              <code className="bg-gray-900 text-green-400 p-3 rounded-lg block text-sm overflow-x-auto">
                {`import { usePrompt } from '@/src/components/usePrompt';`}
              </code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Initialize the hook:</h3>
              <code className="bg-gray-900 text-green-400 p-3 rounded-lg block text-sm overflow-x-auto">
                {`const prompt = usePrompt();`}
              </code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Use prompts in your functions:</h3>
              <code className="bg-gray-900 text-green-400 p-3 rounded-lg block text-sm overflow-x-auto">
                {`prompt.showSuccess('Success!', 'Your action completed.');`}
              </code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4. Add the renderer at the end of your JSX:</h3>
              <code className="bg-gray-900 text-green-400 p-3 rounded-lg block text-sm overflow-x-auto">
                {`<prompt.PromptRenderer />`}
              </code>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 <strong>Tip:</strong> The usePrompt hook manages all prompt states and animations automatically. 
              You just need to call the appropriate method and provide your content!
            </p>
          </div>
        </div>
      </div>

      {/* Prompt Renderer */}
      <prompt.PromptRenderer />
    </div>
  );
}
