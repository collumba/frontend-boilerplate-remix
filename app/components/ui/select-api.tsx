"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { MdmService } from "@app/services/mdm";
import { cn } from "@app/utils/cn";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

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
          <div className="px-2 py-1 text-sm text-destructive">{error}</div>
        ) : options.length === 0 ? (
          <div className="px-2 py-1 text-sm text-muted-foreground">
            {t("common.status.noOptions", "Sem opções disponíveis")}
          </div>
        ) : (
          options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {t(option.label)}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
