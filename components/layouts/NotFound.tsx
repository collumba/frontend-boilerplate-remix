import { forwardRef, HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

export const NotFoundLayout = forwardRef<HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    const { t } = useTranslation();
    return <div>not found</div>;
  }
);

NotFoundLayout.displayName = "NotFoundLayout";
