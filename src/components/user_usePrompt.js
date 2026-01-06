'use client';

import { useState } from 'react';
import { 
  SuccessPrompt, 
  ErrorPrompt, 
  ConfirmPrompt, 
  InfoPrompt, 
  LoadingPrompt, 
  DeletePrompt 
} from './user_Prompts';

/**
 * Custom hook for managing prompts throughout the application
 * Usage: const prompt = usePrompt();
 */
export function usePrompt() {
  const [activePrompt, setActivePrompt] = useState(null);
  const [promptData, setPromptData] = useState({});

  const showSuccess = (title, message, onConfirm) => {
    setPromptData({ title, message, onConfirm });
    setActivePrompt('success');
  };

  const showError = (title, message, onConfirm) => {
    setPromptData({ title, message, onConfirm });
    setActivePrompt('error');
  };

  const showConfirm = (title, message, onConfirm, options = {}) => {
    setPromptData({ 
      title, 
      message, 
      onConfirm,
      type: options.type || 'warning',
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel'
    });
    setActivePrompt('confirm');
  };

  const showInfo = (title, message) => {
    setPromptData({ title, message });
    setActivePrompt('info');
  };

  const showLoading = (message) => {
    setPromptData({ message });
    setActivePrompt('loading');
  };

  const showDelete = (itemName, onConfirm) => {
    setPromptData({ itemName, onConfirm });
    setActivePrompt('delete');
  };

  const closePrompt = () => {
    setActivePrompt(null);
    setPromptData({});
  };

  const PromptRenderer = () => (
    <>
      <SuccessPrompt
        isOpen={activePrompt === 'success'}
        onClose={closePrompt}
        title={promptData.title}
        message={promptData.message}
        onConfirm={promptData.onConfirm || closePrompt}
      />

      <ErrorPrompt
        isOpen={activePrompt === 'error'}
        onClose={closePrompt}
        title={promptData.title}
        message={promptData.message}
        onConfirm={promptData.onConfirm || closePrompt}
      />

      <ConfirmPrompt
        isOpen={activePrompt === 'confirm'}
        onClose={closePrompt}
        title={promptData.title}
        message={promptData.message}
        onConfirm={promptData.onConfirm || closePrompt}
        type={promptData.type}
        confirmText={promptData.confirmText}
        cancelText={promptData.cancelText}
      />

      <InfoPrompt
        isOpen={activePrompt === 'info'}
        onClose={closePrompt}
        title={promptData.title}
        message={promptData.message}
      />

      <LoadingPrompt
        isOpen={activePrompt === 'loading'}
        message={promptData.message}
      />

      <DeletePrompt
        isOpen={activePrompt === 'delete'}
        onClose={closePrompt}
        itemName={promptData.itemName}
        onConfirm={promptData.onConfirm || closePrompt}
      />
    </>
  );

  return {
    showSuccess,
    showError,
    showConfirm,
    showInfo,
    showLoading,
    showDelete,
    closePrompt,
    PromptRenderer,
    activePrompt
  };
}
