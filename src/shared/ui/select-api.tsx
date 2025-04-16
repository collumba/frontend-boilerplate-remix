"use client";

import { MdmService } from "@/shared/api/mdm";
import { cn } from "@/shared/lib/cn";
import { EntityType } from "@/shared/types/mdm";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Select } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { TFunction } from "i18next";
import { Loader2 } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  fieldId: string;
  field: {
    entity?: EntityType;
    optionsSource: "api" | "static";
    optionsEndpoint: string;
    optionsParams: Record<string, string>;
    options: Option[];
    disabled: boolean;
    placeholder: string;
  };
  formField: {
    onChange: (value: string) => void;
    value: string;
  };
  formState: {
    errors: Record<string, { message?: string }>;
  };
  t: TFunction;
  fieldKey: string;
}

export function SelectFromApi({
  fieldId,
  field,
  formField,
  formState,
  fieldKey,
  t,
}: SelectFieldProps) {
  const entity = field.entity || "character";
  const service = new MdmService(entity as "character");

  const {
    data: options = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "selectOptions",
      field.optionsEndpoint,
      field.optionsParams,
      entity,
    ],
    queryFn: async () => {
      if (!(field.optionsSource === "api") || !field.optionsEndpoint) {
        return field.options || [];
      }

      return service.getOptions(field.optionsEndpoint, field.optionsParams);
    },
    enabled: field.optionsSource === "api" && !!field.optionsEndpoint,
  });

  return (
    <Select
      onValueChange={formField.onChange}
      value={formField.value}
      disabled={field.disabled || isLoading}
    >
      <SelectTrigger
        id={fieldId}
        className={cn(
          "w-full",
          !!formState.errors[fieldKey] && "border-destructive"
        )}
        aria-invalid={!!formState.errors[fieldKey]}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t("common.status.loading", "Carregando...")}</span>
          </div>
        ) : (
          <SelectValue
            placeholder={
              field.placeholder
                ? t(field.placeholder)
                : t("common.action.select")
            }
          />
        )}
      </SelectTrigger>
      <SelectContent>
        {error ? (
          <div className="px-2 py-1 text-sm text-destructive">
            {t("common.errors.loadingOptions", "Erro ao carregar opções")}
          </div>
        ) : options.length === 0 ? (
          <div className="px-2 py-1 text-sm text-muted-foreground">
            {t("common.status.noOptions", "Sem opções disponíveis")}
          </div>
        ) : (
          options.map((option: Option) => (
            <SelectItem key={option.value} value={option.value}>
              {t(option.label)}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
