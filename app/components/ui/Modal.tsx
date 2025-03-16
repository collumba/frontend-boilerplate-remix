import { Dialog, Transition } from "@headlessui/react";
import { cn } from "@utils/cn";
import { X } from "lucide-react";
import {
  Fragment,
  HTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { Typography } from "./Typography";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  position?: "center" | "top";
}

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      className,
      closeOnEsc = true,
      closeOnOverlayClick = true,
      size = "md",
      position = "center",
    },
    ref
  ) => {
    const hasMounted = useHasMounted();

    useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
        if (closeOnEsc && event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen && hasMounted) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      }

      return () => {
        if (hasMounted) {
          document.removeEventListener("keydown", handleEsc);
          document.body.style.overflow = "unset";
        }
      };
    }, [isOpen, onClose, closeOnEsc, hasMounted]);

    if (!isOpen || !hasMounted) return null;

    const sizes = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full mx-4",
    };

    const positions = {
      center: "items-center",
      top: "items-start pt-16",
    };

    const modalContent = (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeOnOverlayClick ? onClose : () => {}}
          ref={ref}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              role="presentation"
              onClick={closeOnOverlayClick ? onClose : undefined}
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={cn(
                    "w-full transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all",
                    sizes[size],
                    positions[position],
                    className
                  )}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );

    return hasMounted ? createPortal(modalContent, document.body) : null;
  }
);

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, title, subtitle, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 border-b border-border", className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div>
            <Typography variant="h6" color="primary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="secondary">
                {subtitle}
              </Typography>
            )}
          </div>
          {onClose && (
            <Button size="sm" onClick={onClose} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4", className)}
        data-testid="modal-content"
        {...props}
      >
        {children}
      </div>
    );
  }
);

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end border-t border-border px-6 py-4",
          className
        )}
        data-testid="modal-footer"
        {...props}
      >
        {children}
      </div>
    );
  }
);

Modal.displayName = "Modal";
ModalHeader.displayName = "ModalHeader";
ModalContent.displayName = "ModalContent";
ModalFooter.displayName = "ModalFooter";
