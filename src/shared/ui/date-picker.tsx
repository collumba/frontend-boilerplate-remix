'use client';

import { cn } from '@/shared/lib/cn';
import { ButtonInput } from '@/shared/ui/button-input';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { format } from 'date-fns';
import { enUS, es, ptBR } from 'date-fns/locale';
import { TFunction } from 'i18next';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DatePickerFieldProps {
  fieldId: string;
  field: {
    disabled?: boolean;
    placeholder?: string;
    min?: string;
    max?: string;
  };
  formField: {
    onChange: (date: Date) => void;
    value: Date;
  };
  formState: {
    errors: Record<string, { message?: string }>;
  };
  t: TFunction;
  hasError?: boolean;
}

function DatePicker({ fieldId, field, formField, t, hasError }: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const langLocales = {
    en: enUS,
    'pt-BR': ptBR,
    es: es,
  };

  const dateLocale = langLocales[i18n.language as keyof typeof langLocales] || enUS;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ButtonInput
          id={fieldId}
          leadingIcon={<CalendarIcon className="h-4 w-4" />}
          className={cn(
            !formField.value && 'text-muted-foreground',
            isOpen && 'border-ring',
            hasError && 'border-destructive'
          )}
          disabled={field.disabled}
          aria-invalid={hasError}
        >
          {formField.value ? (
            format(new Date(formField.value), 'PPP', { locale: dateLocale })
          ) : (
            <span>{field.placeholder ? t(field.placeholder) : t('common.action.pickDate')}</span>
          )}
        </ButtonInput>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={formField.value}
          onSelect={(date) => {
            if (date) {
              formField.onChange(date);
              setIsOpen(false);
            }
          }}
          disabled={(date) => {
            if (field?.min && date < new Date(field.min)) return true;
            if (field?.max && date > new Date(field.max)) return true;
            return false;
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker as DatePickerField };
