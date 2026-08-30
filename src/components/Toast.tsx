import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-neutral-900/95 border border-neutral-700 text-white px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-2.5 text-xs font-semibold">
        <span className="material-symbols-outlined text-indigo-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
};
