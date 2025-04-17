import { cn } from '@/shared/lib/cn';
import * as React from 'react';
import { Button } from './button';

// Extend from React.ComponentPropsWithoutRef<"button"> instead of using ButtonProps from Radix
type ButtonInputProps = React.ComponentPropsWithoutRef<'button'> & {
  className?: string;
  leadingIcon?: React.ReactNode;
};

const ButtonInput = React.forwardRef<HTMLButtonElement, ButtonInputProps>(
  ({ className, leadingIcon, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type="button"
        variant="outline"
        data-slot="button-input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus:border-ring focus:outline-none',
          'data-[state=open]:border-ring',
          'aria-invalid:border-destructive',
          'hover:border-muted-foreground/20',
          'justify-start text-left font-normal',
          className
        )}
        {...props}
      >
        {leadingIcon && <span className="mr-2">{leadingIcon}</span>}
        {children}
      </Button>
    );
  }
);

ButtonInput.displayName = 'ButtonInput';

export { ButtonInput };
