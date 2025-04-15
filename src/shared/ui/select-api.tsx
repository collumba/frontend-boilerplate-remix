"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { MdmService } from "src/shared/api/mdm";
import { cn } from "src/shared/lib/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/shared/ui/select";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  fieldId: string;
  field: any;
  formField: any;
  formState: any;
  t: any;
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
  const entity = field.entity || "common";
  const service = new MdmService(entity);

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
