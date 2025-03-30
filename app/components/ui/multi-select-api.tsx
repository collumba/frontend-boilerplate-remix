"use client";

import { MultiSelect } from "@app/components/ui/multi-select";
import { MdmService } from "@app/services/mdm";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [options, setOptions] = useState<
    Array<{ label: string; value: string }>
  >(field.options || []);
  const [isLoading, setIsLoading] = useState(field.optionsSource === "api");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Se as opções vêm da API, busca-as ao montar o componente
    if (field.optionsSource === "api" && field.optionsEndpoint) {
      const fetchOptions = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Usa o entity da configuração do campo ou 'common' como padrão
          const entity = field.entity || "common";
          const service = new MdmService(entity);

          const apiOptions = await service.getOptions(
            field.optionsEndpoint,
            field.optionsParams
          );

          setOptions(apiOptions);
        } catch (err) {
          console.error("Erro ao carregar opções:", err);
          setError(
            t("common.errors.loadingOptions", "Erro ao carregar opções")
          );
          // Usa opções de fallback se disponíveis
          setOptions([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOptions();
    }
  }, [
    field.optionsSource,
    field.optionsEndpoint,
    field.optionsParams,
    field.entity,
    fieldKey,
    t,
  ]);

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
        {error}
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
