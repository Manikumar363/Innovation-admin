import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectContextType {
  value: string;
  onValueChange: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled?: boolean;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const Select: React.FC<{
  value: string;
  onValueChange: (val: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}> = ({ value, onValueChange, disabled = false, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen, disabled }}>
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => {
  const ctx = useContext(SelectContext);
  if (!ctx) return null;

  return (
    <button
      type="button"
      disabled={ctx.disabled}
      onClick={() => ctx.setIsOpen(!ctx.isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-lg border border-white/15 bg-[#03091F] px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F68E2D] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${className}`}
    >
      {children}
      <ChevronDown className={`h-4 w-4 text-white/60 transition-transform ${ctx.isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export const SelectValue: React.FC<{
  placeholder?: string;
}> = ({ placeholder = 'Select an option...' }) => {
  const ctx = useContext(SelectContext);
  return (
    <span className={ctx?.value ? 'text-white' : 'text-white/50'}>
      {ctx?.value ? ctx.value : placeholder}
    </span>
  );
};

export const SelectContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => {
  const ctx = useContext(SelectContext);
  if (!ctx || !ctx.isOpen) return null;

  return (
    <div
      className={`absolute left-0 top-full mt-1.5 z-50 max-h-60 w-full overflow-auto rounded-lg border border-white/15 bg-[#14112E] p-1 text-white shadow-xl animate-in fade-in-80 ${className}`}
    >
      {children}
    </div>
  );
};

export const SelectItem: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className = '' }) => {
  const ctx = useContext(SelectContext);
  if (!ctx) return null;

  const isSelected = ctx.value === value;

  return (
    <div
      onClick={() => {
        ctx.onValueChange(value);
        ctx.setIsOpen(false);
      }}
      className={`relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-[#F68E2D]/20 hover:text-[#F68E2D] ${
        isSelected ? 'bg-[#F68E2D]/30 text-[#F68E2D] font-semibold' : 'text-white/90'
      } ${className}`}
    >
      <span className="flex-1 text-left">{children}</span>
      {isSelected && <Check className="h-4 w-4 text-[#F68E2D]" />}
    </div>
  );
};
