import React, { createContext, useContext, useEffect } from 'react';
import { X } from 'lucide-react';

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const Dialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}> = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => onOpenChange(false)}
        />
        {/* Modal wrapper */}
        <div className="relative z-50 w-full flex justify-center">
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
};

export const DialogContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => {
  const ctx = useContext(DialogContext);

  return (
    <div
      className={`w-full max-w-lg rounded-2xl border border-white/15 bg-[#14112E] p-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 ${className}`}
    >
      <button
        onClick={() => ctx?.onOpenChange(false)}
        className="absolute top-4 right-4 rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => (
  <div className={`flex flex-col space-y-1.5 text-left mb-4 border-b border-white/10 pb-3 ${className}`}>
    {children}
  </div>
);

export const DialogTitle: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => (
  <h2 className={`text-lg font-bold leading-none tracking-tight text-white ${className}`}>
    {children}
  </h2>
);
