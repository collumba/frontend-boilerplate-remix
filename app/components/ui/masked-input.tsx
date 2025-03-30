"use client";

import { cn } from "@app/utils/cn";
import IMask from "imask";
import * as React from "react";
import { useEffect } from "react";

// Criar um componente que emula uma entrada mascarada usando um input nativo
export interface MaskedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "max" | "min"> {
  mask: string;
  definitions?: Record<string, RegExp>;
  min?: string | number;
  max?: string | number;
  onAccept?: (value: string) => void;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    { className, mask, definitions, min, max, onAccept, onChange, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Aplicar a máscara quando o componente montar
    useEffect(() => {
      const element = inputRef.current;
      if (!element) return;

      const maskInstance = IMask(element, {
        mask,
        definitions,
      });

      // Manipulador para o evento de aceitação da máscara
      if (onAccept) {
        maskInstance.on("accept", () => {
          onAccept(maskInstance.value);
        });
      }

      // Manipulador para sincronizar com onChange do React
      if (onChange) {
        maskInstance.on("accept", () => {
          const event = {
            target: inputRef.current,
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        });
      }

      // Limpeza
      return () => {
        maskInstance.destroy();
      };
    }, [mask, definitions, onAccept, onChange]);

    // Renderiza um input básico sobre o qual o IMask atuará
    return (
      <input
        ref={inputRef}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus:border-ring focus:outline-none",
          "aria-invalid:border-destructive",
          className
        )}
        min={min}
        max={max}
        {...props}
        // O IMaskInput será aplicado a este elemento após a montagem
        // usando o padrão de hook ou useEffect
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
