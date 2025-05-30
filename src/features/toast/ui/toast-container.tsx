import * as React from 'react';

import { TOAST_TIMEOUT } from '../config';
import { ToastMessage, useToast } from './internal';
import { Toast, ToastDescription, ToastTitle } from './toast-primitive';

interface ToastItemProps {
  toast: ToastMessage;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, TOAST_TIMEOUT);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-item transition-all duration-300 animate-fade-in-up">
      <Toast variant={toast.type} onClose={onClose}>
        <div className="grid gap-1">
          <ToastTitle>{toast.title}</ToastTitle>
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
        </div>
      </Toast>
    </div>
  );
};

export function ToastContainer() {
  const { toasts, actions } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col p-4 sm:bottom-4 sm:right-4 sm:top-auto max-w-[420px] gap-2 md:gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => actions.removeToast(toast.id)} />
      ))}
    </div>
  );
}
