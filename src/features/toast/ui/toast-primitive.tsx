import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@shared/lib/cn';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-background border-border text-foreground',
        success:
          'dark:bg-green-950 dark:border-green-800 dark:text-green-200 bg-green-50 border-green-200 text-green-800',
        error:
          'dark:bg-red-950 dark:border-red-800 dark:text-red-200 bg-red-50 border-red-200 text-red-800',
        warning:
          'dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200 bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200 bg-blue-50 border-blue-200 text-blue-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, onClose, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        {children}
        {onClose && (
          <button
            onClick={onClose}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = 'Toast';

export interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastTitle = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('font-medium text-sm', className)} {...props} />
  )
);
ToastTitle.displayName = 'ToastTitle';

export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ToastDescription = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
  )
);
ToastDescription.displayName = 'ToastDescription';
