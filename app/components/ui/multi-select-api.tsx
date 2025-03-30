"use client";

import { MultiSelect } from "@app/components/ui/multi-select";
import { MdmService } from "@app/services/mdm";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  fieldId: string;
  field: any;
  formField: any;
  formState: any;
  t: any;
  fieldKey: string;
}

export function MultiSelectFromApi({
  fieldId,
  field,
  formField,
  formState,
  fieldKey,
  t,
}: MultiSelectFieldProps) {
  const entity = field.entity || "common";
  const service = new MdmService(entity);

  const {
    data: options = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "multiSelectOptions",
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

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 h-9 px-3 border border-input rounded-md text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{t("common.status.loading", "Carregando...")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center h-9 px-3 border border-destructive rounded-md text-sm text-destructive">
        {t("common.errors.loadingOptions", "Erro ao carregar opções")}
      </div>
    );
  }

  return (
    <MultiSelect
      options={options}
      selected={formField.value || []}
      onChange={formField.onChange}
      placeholder={
        field.placeholder
          ? t(field.placeholder)
          : t("common.action.selectOptions")
      }
      disabled={field.disabled}
      t={t}
      id={fieldId}
      className={formState.errors[fieldKey] ? "border-destructive" : ""}
    />
  );
}
