import React, { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: () => React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that only renders its children on the client, not during SSR
 * This is useful for components that use browser APIs or cause hydration issues
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children()}</> : <>{fallback}</>;
}
