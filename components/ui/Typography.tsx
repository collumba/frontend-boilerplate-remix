import { cn } from "@lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      subtitle1: "text-base",
      subtitle2: "text-sm",
      body1: "text-base leading-7",
      body2: "text-sm leading-7",
      caption: "text-sm",
      overline: "text-xs uppercase tracking-wide",
    },
    colorVariant: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
    },
  },
  defaultVariants: {
    variant: "body1",
    colorVariant: "default",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    { className, variant, colorVariant, as: Component = "div", ...props },
    ref
  ) => {
    return (
      <Component
        className={cn(typographyVariants({ variant, colorVariant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
