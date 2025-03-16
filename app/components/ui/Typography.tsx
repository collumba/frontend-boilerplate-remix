import { cn } from '@utils/cn'
import React from 'react'

type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline'
  component?: React.ElementType
  className?: string
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info'
  children: React.ReactNode
}

const variantStyles = {
  h1: 'text-5xl font-bold tracking-tight',
  h2: 'text-4xl font-bold tracking-tight',
  h3: 'text-3xl font-bold tracking-tight',
  h4: 'text-2xl font-bold tracking-tight',
  h5: 'text-xl font-bold tracking-tight',
  h6: 'text-lg font-bold tracking-tight',
  subtitle1: 'text-lg font-medium',
  subtitle2: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wider'
}

const colorStyles = {
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-600 dark:text-gray-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  success: 'text-green-600 dark:text-green-400',
  info: 'text-blue-600 dark:text-blue-400'
}

const defaultElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span'
}

export function Typography({
  variant = 'body1',
  component,
  className,
  color = 'primary',
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  const Component = component || defaultElements[variant]

  return (
    <Component
      className={cn(variantStyles[variant], colorStyles[color], className)}
      {...props}
    >
      {children}
    </Component>
  )
} 