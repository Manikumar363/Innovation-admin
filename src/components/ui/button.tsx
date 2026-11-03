import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    let baseStyles = 'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    let variantStyles = '';
    switch (variant) {
      case 'outline':
        variantStyles = 'border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30';
        break;
      case 'secondary':
        variantStyles = 'bg-white/10 text-white hover:bg-white/20';
        break;
      case 'ghost':
        variantStyles = 'text-white/80 hover:bg-white/10 hover:text-white';
        break;
      case 'destructive':
        variantStyles = 'bg-red-600 text-white hover:bg-red-700';
        break;
      default:
        variantStyles = 'bg-[#F68E2D] text-white hover:bg-[#e28124] shadow-md shadow-[#F68E2D]/20';
        break;
    }

    let sizeStyles = '';
    switch (size) {
      case 'sm':
        sizeStyles = 'h-8 px-3 text-xs';
        break;
      case 'lg':
        sizeStyles = 'h-11 px-6 text-base';
        break;
      case 'icon':
        sizeStyles = 'h-9 w-9 p-0';
        break;
      default:
        sizeStyles = 'h-9 px-4 py-2 text-sm';
        break;
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
