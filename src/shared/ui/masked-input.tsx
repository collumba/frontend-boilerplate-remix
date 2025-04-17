'use client';

import IMask from 'imask';
import * as React from 'react';
import { useEffect } from 'react';

import { cn } from '@/shared/lib/cn';

// Criar um componente que emula uma entrada mascarada usando um input nativo
export interface MaskedInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'max' | 'min' | 'value' | 'defaultValue' | 'onChange'
  > {
  mask: string;
  definitions?: Record<string, RegExp>;
  min?: string | number;
  max?: string | number;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAccept?: (value: string) => void;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    { className, mask, definitions, min, max, onAccept, onChange, value, defaultValue, ...props },
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

      // Se temos um valor inicial, defina-o
      if (value !== undefined && element.value !== value) {
        maskInstance.value = value;
      }

      // Manipulador para o evento de aceitação da máscara
      if (onAccept) {
        maskInstance.on('accept', () => {
          onAccept(maskInstance.value);
        });
      }

      // Manipulador para sincronizar com onChange do React
      if (onChange) {
        maskInstance.on('accept', () => {
          const event = {
            target: {
              ...inputRef.current,
              name: props.name,
              value: maskInstance.value,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(event);
        });
      }

      // Limpeza
      return () => {
        maskInstance.destroy();
      };
    }, [mask, definitions, onAccept, onChange, value, props.name]);

    // Usamos defaultValue para o input subjacente para evitar warning
    const inputProps = {
      ...props,
      defaultValue: value || defaultValue,
    };

    // Renderiza um input básico sobre o qual o IMask atuará
    return (
      <input
        ref={inputRef}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus:border-ring focus:outline-none',
          'aria-invalid:border-destructive',
          className
        )}
        min={min}
        max={max}
        {...inputProps}
      />
    );
  }
);

MaskedInput.displayName = 'MaskedInput';

export { MaskedInput };
