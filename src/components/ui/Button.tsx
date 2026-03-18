import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white',
          {
            'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800':
              variant === 'primary',
            'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200':
              variant === 'danger',
            'bg-transparent hover:bg-gray-100 text-gray-700':
              variant === 'ghost',
            'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200':
              variant === 'secondary',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
