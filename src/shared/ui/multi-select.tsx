'use client';

import { Badge } from '@shared/ui/badge';
import { cn } from '@shared/ui/cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { X } from 'lucide-react';
import * as React from 'react';

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  creatable?: boolean;
  disabled?: boolean;
  className?: string;
  badgeClassName?: string;
  t?: (key: string) => string;
  id?: string;
}

// Selected item badge component
function SelectedItem({
  item,
  options,
  onUnselect,
  t,
  badgeClassName,
}: {
  item: string;
  options: Option[];
  onUnselect: (item: string) => void;
  t?: (key: string) => string;
  badgeClassName?: string;
}) {
  const option = options.find((o) => o.value === item);

  return (
    <Badge
      key={item}
      variant="outline"
      className={cn(
        'flex items-center gap-1 py-1 px-2 rounded-md text-sm font-medium bg-secondary',
        badgeClassName
      )}
    >
      {t ? t(option?.label || item) : option?.label || item}
      <button
        className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-muted"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onUnselect(item);
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={() => onUnselect(item)}
      >
        <X className="h-3 w-3 text-foreground/70 hover:text-foreground" />
      </button>
    </Badge>
  );
}

// Trigger component that displays selected items
function SelectionDisplay({
  selected,
  options,
  placeholder,
  className,
  badgeClassName,
  onUnselect,
  t,
  id,
  open,
  setOpen,
}: {
  selected: string[];
  options: Option[];
  placeholder?: string;
  className?: string;
  badgeClassName?: string;
  onUnselect: (item: string) => void;
  t?: (key: string) => string;
  id?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div
      id={id}
      role="combobox"
      aria-expanded={open}
      aria-controls="multi-select-options"
      aria-haspopup="listbox"
      aria-labelledby="multi-select"
      tabIndex={0}
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
      }}
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-auto min-h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus:border-ring focus:outline-none',
        'data-[state=open]:border-ring',
        'aria-invalid:border-destructive',
        'flex-wrap gap-1.5 flex cursor-pointer',
        open && 'border-ring',
        className
      )}
    >
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 py-0.5">
          {selected.map((item) => (
            <SelectedItem
              key={item}
              item={item}
              options={options}
              onUnselect={onUnselect}
              t={t}
              badgeClassName={badgeClassName}
            />
          ))}
        </div>
      )}
      {selected.length === 0 && (
        <div className="flex h-full items-center text-muted-foreground text-sm">
          {t ? t('common.action.selectOptions') : placeholder}
        </div>
      )}
    </div>
  );
}

// Options list component
function SelectOptions({
  selectables,
  selected,
  inputValue,
  onChange,
  setInputValue,
  creatable,
  t,
}: {
  selectables: Option[];
  selected: string[];
  inputValue: string;
  onChange: (selected: string[]) => void;
  setInputValue: (value: string) => void;
  creatable?: boolean;
  t?: (key: string) => string;
}) {
  return (
    <CommandList>
      <CommandEmpty>{t ? t('common.action.noResults') : 'No results found.'}</CommandEmpty>
      <CommandGroup>
        {selectables.map((option) => (
          <CommandItem
            key={option.value}
            onSelect={() => {
              onChange([...selected, option.value]);
              setInputValue('');
            }}
          >
            {t ? t(option.label) : option.label}
          </CommandItem>
        ))}
        {creatable && inputValue.length > 0 && (
          <CommandItem
            onSelect={() => {
              onChange([...selected, inputValue]);
              setInputValue('');
            }}
          >
            Create &quot;{inputValue}&quot;
          </CommandItem>
        )}
      </CommandGroup>
    </CommandList>
  );
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  creatable = false,
  disabled = false,
  className,
  badgeClassName,
  t,
  id,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '' && selected.length > 0) {
          handleUnselect(selected[selected.length - 1]);
        }
      }
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  };

  const selectables = options.filter((option) => !selected.includes(option.value));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SelectionDisplay
          selected={selected}
          options={options}
          placeholder={placeholder}
          className={className}
          badgeClassName={badgeClassName}
          onUnselect={handleUnselect}
          t={t}
          id={id}
          open={open}
          setOpen={setOpen}
        />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command onKeyDown={handleKeyDown}>
          <CommandInput
            disabled={disabled}
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            placeholder={t ? t('common.action.searchOptions') : 'Search options...'}
            className="h-9"
          />
          <SelectOptions
            selectables={selectables}
            selected={selected}
            inputValue={inputValue}
            onChange={onChange}
            setInputValue={setInputValue}
            creatable={creatable}
            t={t}
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
