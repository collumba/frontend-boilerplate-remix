import { LucideIcon, LucideProps } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';

interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export const ClientIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIcon, ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Renderiza um placeholder vazio no servidor e até que o componente seja montado no cliente
    if (!isMounted) {
      return (
        <svg
          ref={ref}
          width={props.size || 24}
          height={props.size || 24}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className={props.className}
        />
      );
    }

    // Depois de montado, renderiza o ícone completo
    return <LucideIcon ref={ref} aria-hidden="true" focusable="false" {...props} />;
  }
);
ClientIcon.displayName = 'ClientIcon';
