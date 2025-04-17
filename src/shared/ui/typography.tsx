import { cn } from '@/shared/lib/cn';
import React from 'react';

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'blockquote'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted';
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = React.forwardRef<
  HTMLHeadingElement | HTMLParagraphElement,
  TypographyProps
>(({ className, variant = 'p', as, ...props }, ref) => {
  const Component =
    as ||
    (variant === 'blockquote'
      ? 'span'
      : variant === 'lead'
        ? 'span'
        : variant === 'large'
          ? 'span'
          : variant === 'small'
            ? 'span'
            : variant === 'muted'
              ? 'span'
              : 'p');
  return React.createElement(Component, {
    ref,
    className: cn(
      {
        // Headings
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl': variant === 'h1',
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0':
          variant === 'h2',
        'scroll-m-20 text-2xl font-semibold tracking-tight': variant === 'h3',
        'scroll-m-20 text-xl font-semibold tracking-tight': variant === 'h4',
        'scroll-m-20 text-lg font-semibold tracking-tight': variant === 'h5',
        'scroll-m-20 text-base font-semibold tracking-tight': variant === 'h6',
        // Paragraph styles
        'leading-7 [&:not(:first-child)]:mt-6': variant === 'p',
        'mt-6 border-l-2 pl-6 italic': variant === 'blockquote',
        'text-xl text-muted-foreground': variant === 'lead',
        'text-lg font-semibold': variant === 'large',
        'text-sm font-medium leading-none': variant === 'small',
        'text-sm text-muted-foreground': variant === 'muted',
      },
      className
    ),
    ...props,
  });
});

Typography.displayName = 'Typography';

// Convenience components for common typography variants
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const Paragraph = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="p" {...props} />
);

export const Blockquote = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="blockquote" {...props} />
);

export const Lead = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="lead" {...props} />
);

export const Large = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="large" {...props} />
);

export const Small = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="small" {...props} />
);

export const Muted = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="muted" {...props} />
);
