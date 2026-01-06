'use client';

import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  Trash2, 
  Save, 
  AlertTriangle,
  X,
  Loader
} from 'lucide-react';

// ==================== REUSABLE PROMPT COMPONENTS ====================

// Success Prompt
export function SuccessPrompt({ isOpen, onClose, title, message, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div 
        className="backdrop-blur-xl bg-white/90 rounded-xl p-5 max-w-xs w-full shadow-lg border border-white/30 animate-in zoom-in duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Success Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle className="text-white" size={24} />
        </div>

        {/* Content */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {title || 'Success!'}
          </h2>
          <p className="text-sm text-gray-600">
            {message || 'Your action was completed successfully.'}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onConfirm || onClose}
          className="w-full py-2 px-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:from-green-700 hover:to-emerald-700"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

// Error Prompt
export function ErrorPrompt({ isOpen, onClose, title, message, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div 
        className="backdrop-blur-xl bg-white/90 rounded-xl p-5 max-w-xs w-full shadow-lg border border-white/30 animate-in zoom-in duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Error Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <XCircle className="text-white" size={24} />
        </div>

        {/* Content */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {title || 'Error'}
          </h2>
          <p className="text-sm text-gray-600">
            {message || 'Something went wrong. Please try again.'}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onConfirm || onClose}
          className="w-full py-2 px-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:from-red-700 hover:to-rose-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Warning/Confirmation Prompt
export function ConfirmPrompt({ isOpen, onClose, title, message, onConfirm, confirmText, cancelText, type = 'warning' }) {
  if (!isOpen) return null;

  const colors = {
    warning: {
      gradient: 'from-orange-500 to-amber-600',
      hoverGradient: 'hover:from-orange-700 hover:to-amber-700',
      button: 'from-orange-600 to-amber-600',
      buttonHover: 'hover:from-orange-700 hover:to-amber-700'
    },
    danger: {
      gradient: 'from-red-500 to-rose-600',
      hoverGradient: 'hover:from-red-700 hover:to-rose-700',
      button: 'from-red-600 to-rose-600',
      buttonHover: 'hover:from-red-700 hover:to-rose-700'
    }
  };

  const colorScheme = colors[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div 
        className="backdrop-blur-xl bg-white/90 rounded-xl p-5 max-w-xs w-full shadow-lg border border-white/30 animate-in zoom-in duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Warning Icon */}
        <div className={`w-12 h-12 bg-gradient-to-br ${colorScheme.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
          <AlertTriangle className="text-white" size={24} />
        </div>

        {/* Content */}
        <div className="text-center mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {title || 'Are you sure?'}
          </h2>
          <p className="text-sm text-gray-600">
            {message || 'This action cannot be undone.'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all border border-gray-300"
          >
            {cancelText || 'Cancel'}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 px-3 bg-gradient-to-r ${colorScheme.button} text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all ${colorScheme.buttonHover}`}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Info Prompt
export function InfoPrompt({ isOpen, onClose, title, message, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div 
        className="backdrop-blur-xl bg-white/90 rounded-xl p-5 max-w-xs w-full shadow-lg border border-white/30 animate-in zoom-in duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Info Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Info className="text-white" size={24} />
        </div>

        {/* Content */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {title || 'Information'}
          </h2>
          <p className="text-sm text-gray-600">
            {message || 'Here is some important information.'}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onConfirm || onClose}
          className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:from-blue-700 hover:to-indigo-700"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

// Loading Prompt
export function LoadingPrompt({ isOpen, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div 
        className="backdrop-blur-xl bg-white/90 rounded-xl p-6 shadow-lg border border-white/30 animate-in zoom-in duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Spinning Loader */}
          <div className="relative">
            <div className="w-14 h-14 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {message || 'Processing...'}
            </h3>
            <div className="flex justify-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation (specific for delete actions)
export function DeletePrompt({ isOpen, onClose, itemName, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div 
        className="backdrop-blur-xl bg-white/90 rounded-xl p-5 max-w-xs w-full shadow-lg border border-white/30 animate-in zoom-in duration-300"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Delete Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Trash2 className="text-white" size={24} />
        </div>

        {/* Content */}
        <div className="text-center mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Delete {itemName || 'Item'}?
          </h2>
          <p className="text-sm text-gray-600">
            This action cannot be undone. This will permanently delete the {itemName?.toLowerCase() || 'item'}.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:from-red-700 hover:to-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== CSS ANIMATIONS ====================

export const PromptStyles = () => (
  <style jsx global>{`
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes zoom-in {
      from { transform: scale(0.9); }
      to { transform: scale(1); }
    }
    
    @keyframes slide-in-from-bottom {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .animate-in {
      animation-fill-mode: both;
    }
    
    .fade-in {
      animation-name: fade-in;
    }
    
    .zoom-in {
      animation-name: zoom-in;
    }
    
    .slide-in-from-bottom {
      animation-name: slide-in-from-bottom;
    }
    
    .duration-300 {
      animation-duration: 300ms;
    }
    
    .duration-500 {
      animation-duration: 500ms;
    }
    
    .duration-700 {
      animation-duration: 700ms;
    }
    
    .duration-1000 {
      animation-duration: 1000ms;
    }
  `}</style>
);
