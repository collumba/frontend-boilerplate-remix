import { cn } from "@utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        {
          "rounded-md": variant === "rectangular",
          "rounded-full": variant === "circular",
          "h-4 w-full rounded": variant === "text",
        },
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      {...props}
    />
  );
}

// Compound components for common use cases
Skeleton.Text = function SkeletonText({ className, ...props }: Omit<SkeletonProps, "variant">) {
  return <Skeleton variant="text" className={className} {...props} />;
};

Skeleton.Rectangle = function SkeletonRectangle({
  className,
  ...props
}: Omit<SkeletonProps, "variant">) {
  return <Skeleton variant="rectangular" className={className} {...props} />;
};

Skeleton.Circle = function SkeletonCircle({ className, ...props }: Omit<SkeletonProps, "variant">) {
  return <Skeleton variant="circular" className={className} {...props} />;
};

// Example of a card skeleton
Skeleton.Card = function SkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton.Rectangle className="h-48 w-full" />
      <Skeleton.Text className="h-4 w-3/4" />
      <Skeleton.Text className="h-4 w-1/2" />
    </div>
  );
}; 