import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eraser, Save } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { MdmService } from "@/shared/api/mdm";
import { ENTITY_CONFIG } from "@/shared/config/mdm";
import { ClientOnly } from "@/shared/lib/client-only";
import { cn } from "@/shared/lib/cn";
import { EntityType } from "@/shared/types/mdm";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { DatePickerField } from "@/shared/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { MaskedInput } from "@/shared/ui/masked-input";
import { MultiSelect } from "@/shared/ui/multi-select";
import PageHeader from "@/shared/ui/page-header";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SelectFromApi } from "@/shared/ui/select-api";
import { Skeleton } from "@/shared/ui/skeleton";
import { Textarea } from "@/shared/ui/textarea";
const REQUIRED_FIELD_MARKER = "*";

// Define field types
type FieldType = "text" | "number" | "checkbox" | "date" | "textarea" | "select" | "radio" | "multiselect";

// Update FormFieldValue to handle all possible field types
type FormFieldValue = string | number | boolean | string[] | null | undefined;

type FormValues = Record<string, FormFieldValue>;

// Helper function to get typed form field value
function getTypedFormFieldValue(value: FormFieldValue, type: FieldType): FormFieldValue {
  if (type === "number") {
    return (value as number) || 0;
  } else if (type === "checkbox") {
    return (value as boolean) || false;
  } else if (type === "date") {
    // Store dates as ISO strings
    return value ? (value as string) : null;
  } else if (type === "multiselect") {
    return (value as string[]) || [];
  } else {
    return (value as string) || "";
  }
}

export function generateZodSchema(entity: EntityType) {
  const config = ENTITY_CONFIG[entity];
  const schemaObj: Record<string, z.ZodTypeAny> = {};

  if (!config.fields) {
    return z.object({});
  }

  Object.entries(config.fields).forEach(([key, field]) => {
    let fieldSchema: z.ZodTypeAny = z.string();

    if (field.type === "number") {
      fieldSchema = z.coerce.number();
    } else if (field.type === "checkbox") {
      fieldSchema = z.boolean();
    } else if (field.type === "date") {
      fieldSchema = z.date().optional();
    } else if (field.type === "textarea") {
      fieldSchema = z.string();
    } else if (field.type === "select") {
      fieldSchema = z.string();
    } else if (field.type === "radio") {
      fieldSchema = z.string();
    } else if (field.type === "multiselect") {
      fieldSchema = z.array(z.string());
    }

    if (field.required) {
      if (field.type === "checkbox") {
        // For checkboxes, just use the boolean schema
      } else if (field.type === "date") {
        fieldSchema = z.date({
          required_error: `${key} is required`,
        });
      } else {
        fieldSchema = (fieldSchema as z.ZodString).min(1, { message: `${key} is required` });
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }

    schemaObj[key] = fieldSchema;
  });

  return z.object(schemaObj);
}

interface EntityFormProps {
  entity: EntityType;
  id?: string;
  isCreate?: boolean;
}

// Client-only component to handle the form functionality
function EntityFormClient({ entity, id, isCreate = true }: EntityFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const service = new MdmService(entity);
  const entityConfig = ENTITY_CONFIG[entity];
  const isMobile = useIsMobile();

  // Define form schema based on entity
  const formSchema = generateZodSchema(entity);

  // Create default values for all fields
  const defaultValues = React.useMemo(() => {
    const values: FormValues = {};
    if (entityConfig.fields) {
      Object.entries(entityConfig.fields).forEach(([key, field]) => {
        // Set appropriate default value based on field type
        if (field.type === "checkbox") {
          values[key] = false;
        } else if (field.type === "number") {
          values[key] = 0;
        } else if (field.type === "date") {
          values[key] = null;
        } else if (field.type === "multiselect") {
          values[key] = [];
        } else {
          values[key] = "";
        }
      });
    }
    return values;
  }, [entityConfig.fields]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const submissionData = { ...data };
      if (entityConfig.fields) {
        Object.entries(entityConfig.fields).forEach(([key, field]) => {
          if (field.type === "date" && submissionData[key]) {
            // Ensure dates are handled as strings
            submissionData[key] = submissionData[key] as string;
          }
        });
      }
      return isCreate ? service.create(submissionData) : service.update(id!, submissionData);
    },
    onSuccess: () => {
      navigate(`/mdm/${entity}`);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  // Fetch entity data for edit mode
  const { data: entityData, isLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      if (!id || isCreate) return {} as Partial<FormValues>;
      const data = await service.getById(id);
      return data as unknown as Partial<FormValues>;
    },
    enabled: !!id && !isCreate,
  });

  // Set form values when entity data is loaded
  React.useEffect(() => {
    if (entityData && !isCreate) {
      const processedData: Partial<FormValues> = { ...entityData };
      if (entityConfig.fields) {
        Object.entries(entityConfig.fields).forEach(([key, field]) => {
          if (field.type === "date" && processedData[key as keyof FormValues]) {
            // Keep dates as ISO strings
            const dateValue = processedData[key as keyof FormValues];
            processedData[key as keyof FormValues] = typeof dateValue === 'string' ? dateValue : (dateValue as unknown as Date).toISOString();
          }
        });
      }
      form.reset(processedData);
    }
  }, [entityData, form, isCreate, entityConfig.fields]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!entityConfig.fields || Object.keys(entityConfig.fields).length === 0) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
        {t("common.errors.noFieldsConfigured")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        hasBackButton={true}
        title={
          isCreate
            ? `${t(`entities.${entity}.name`)} - ${t("common.action.create")}`
            : `${t(`entities.${entity}.name`)} - ${t("common.action.edit")}`
        }
      >
        <div
          className={`flex gap-2 flex-wrap ${
            isMobile ? "w-full" : "w-auto"
          } justify-end`}
        >
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => {
              form.reset(defaultValues);
            }}
            fullWidth={isMobile}
          >
            <Eraser className="mr-2 h-4 w-4" />
            {t("common.action.clear")}
          </Button>

          <Button
            type="submit"
            disabled={mutation.isPending}
            form="entity-form"
            fullWidth={isMobile}
          >
            <Save className="mr-2 h-4 w-4" />
            {t("common.action.save")}
          </Button>
        </div>
      </PageHeader>
      <Form {...form}>
        <form
          id="entity-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="text-sm text-muted-foreground mb-4">
            {t("common.form.requiredFieldsNote", "Os campos marcados com")}
            <span className="text-destructive">{` ${REQUIRED_FIELD_MARKER} `}</span>
            {t("common.form.areRequired", t("common.form.areRequired"))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(entityConfig.fields || {}).map(([key, field]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as keyof FormValues}
                render={({ field: formField, formState }) => {
                  const fieldKey = key as keyof FormValues;
                  // Update field configuration for SelectFromApi
                  const selectFieldConfig = {
                    entity: "character" as const,
                    optionsSource: field.optionsSource || "static",
                    optionsEndpoint: field.optionsEndpoint || "",
                    optionsParams: field.optionsParams || {},
                    options: field.options || [],
                    disabled: field.disabled || false,
                    placeholder: field.placeholder || "",
                  };
                  return (
                    <FormItem>
                      <FormLabel htmlFor={`field-${key}`} id={`label-${key}`}>
                        {t(`entities.${entity}.fields.${key}`)}
                        {field.required && (
                          <span className="text-destructive ml-0.5">
                            {REQUIRED_FIELD_MARKER}
                          </span>
                        )}
                      </FormLabel>
                      <FormControl>
                        {field.type === "text" || field.type === "number" ? (
                          field.mask ? (
                            <MaskedInput
                              id={`field-${key}`}
                              mask={field.mask}
                              placeholder={field.placeholder ? t(field.placeholder) : undefined}
                              disabled={field.disabled}
                              value={getTypedFormFieldValue(formField.value, "text") as string}
                              onChange={formField.onChange}
                              onBlur={formField.onBlur}
                              name={formField.name}
                              ref={formField.ref}
                            />
                          ) : (
                            <Input
                              id={`field-${key}`}
                              type={field.type === "number" ? "number" : "text"}
                              placeholder={field.placeholder ? t(field.placeholder) : undefined}
                              min={field.min}
                              max={field.max}
                              pattern={field.pattern}
                              disabled={field.disabled}
                              readOnly={field.readonly}
                              value={getTypedFormFieldValue(formField.value, field.type) as string}
                              onChange={formField.onChange}
                              onBlur={formField.onBlur}
                              name={formField.name}
                              ref={formField.ref}
                            />
                          )
                        ) : field.type === "textarea" ? (
                          <Textarea
                            id={`field-${key}`}
                            placeholder={field.placeholder ? t(field.placeholder) : undefined}
                            minLength={typeof field.min === "string" ? parseInt(field.min) : field.min}
                            maxLength={typeof field.max === "string" ? parseInt(field.max) : field.max}
                            disabled={field.disabled}
                            readOnly={field.readonly}
                            className="min-h-[120px]"
                            value={getTypedFormFieldValue(formField.value, "textarea") as string}
                            onChange={formField.onChange}
                            onBlur={formField.onBlur}
                            name={formField.name}
                            ref={formField.ref}
                          />
                        ) : field.type === "select" ? (
                          field.optionsSource === "api" ? (
                            <SelectFromApi
                              fieldId={`field-${key}`}
                              field={{
                                entity: field.entity || "character",
                                optionsSource: field.optionsSource || "static",
                                optionsEndpoint: field.optionsEndpoint || "",
                                optionsParams: field.optionsParams || {},
                                options: field.options || [],
                                disabled: field.disabled || false,
                                placeholder: field.placeholder || "",
                              }}
                              formField={{
                                onChange: formField.onChange,
                                value: formField.value as string || "",
                              }}
                              formState={{
                                errors: Object.fromEntries(
                                  Object.entries(formState.errors).map(([key, error]) => [
                                    key,
                                    { message: error?.message },
                                  ])
                                ),
                              }}
                              t={t}
                              fieldKey={key}
                            />
                          ) : (
                            <Select
                              onValueChange={formField.onChange}
                              value={getTypedFormFieldValue(formField.value, "select") as string}
                              disabled={field.disabled}
                            >
                              <SelectTrigger
                                id={`field-${key}`}
                                className={cn(
                                  "w-full",
                                  !!formState.errors[fieldKey] && "border-destructive"
                                )}
                                aria-invalid={!!formState.errors[fieldKey]}
                              >
                                <SelectValue
                                  placeholder={
                                    field.placeholder
                                      ? t(field.placeholder)
                                      : t("common.action.select")
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map(
                                  (option: { label: string; value: string }) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {t(option.label)}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          )
                        ) : field.type === "checkbox" ? (
                          <Checkbox
                            id={`field-${key}`}
                            checked={getTypedFormFieldValue(formField.value, "checkbox") as boolean}
                            onCheckedChange={formField.onChange}
                            disabled={field.disabled}
                          />
                        ) : field.type === "date" ? (
                          <DatePickerField
                            key={key}
                            fieldId={`field-${key}`}
                            field={field}
                            formField={formField}
                            t={t}
                            hasError={!!formState.errors[fieldKey]}
                          />
                        ) : field.type === "radio" ? (
                          <div
                            className="radio-group-wrapper"
                            aria-invalid={!!formState.errors[fieldKey]}
                          >
                            <RadioGroup
                              onValueChange={formField.onChange}
                              value={getTypedFormFieldValue(formField.value, "radio") as string}
                              className={cn(
                                "flex flex-col space-y-2",
                                !!formState.errors[fieldKey] && "border-destructive"
                              )}
                              disabled={field.disabled}
                              aria-labelledby={`label-${key}`}
                            >
                              {field.options?.map(
                                (option: { label: string; value: string }) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`field-${key}-${option.value}`}
                                      disabled={field.disabled}
                                      className={
                                        formState.errors[fieldKey]
                                          ? "border-destructive"
                                          : ""
                                      }
                                    />
                                    <label
                                      htmlFor={`field-${key}-${option.value}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {t(option.label)}
                                    </label>
                                  </div>
                                )
                              )}
                            </RadioGroup>
                          </div>
                        ) : field.type === "multiselect" ? (
                          <div className="multiselect-wrapper">
                            {field.optionsSource === "api" ? (
                              <SelectFromApi
                                fieldId={`field-${key}`}
                                field={selectFieldConfig}
                                formField={{
                                  onChange: formField.onChange,
                                  value: formField.value as string || "",
                                }}
                                formState={{
                                  errors: Object.fromEntries(
                                    Object.entries(formState.errors).map(([key, error]) => [    
                                      key,
                                      { message: error?.message },
                                    ])
                                  ),
                                }}
                                t={t}
                                fieldKey={key}
                              />
                            ) : (
                              <MultiSelect
                                options={field.options || []}
                                selected={getTypedFormFieldValue(formField.value, "multiselect") as string[]}
                                onChange={formField.onChange}
                                placeholder={field.placeholder ? t(field.placeholder) : t("common.action.selectOptions")}
                                disabled={field.disabled}
                                t={t}
                                id={`field-${key}`}
                                className={formState.errors[fieldKey] ? "border-destructive" : ""}
                              />
                            )}
                          </div>
                        ) : null}
                      </FormControl>
                      {field.helperText && (
                        <p className="text-sm text-muted-foreground">
                          {t(field.helperText)}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
}

// Wrapper component to handle client-only rendering
export default function EntityForm(props: EntityFormProps) {
  return (
    <ClientOnly fallback={<Skeleton className="h-[500px] w-full" />}>
      {() => <EntityFormClient {...props} />}
    </ClientOnly>
  );
}