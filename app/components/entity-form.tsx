import { Button } from "@app/components/ui/button";
import { Checkbox } from "@app/components/ui/checkbox";
import { DatePickerField } from "@app/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import { MaskedInput } from "@app/components/ui/masked-input";
import { MultiSelect } from "@app/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@app/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { Textarea } from "@app/components/ui/textarea";
import { ENTITY_CONFIG } from "@app/config/mdm";
import { ROUTES } from "@app/config/routes";
import { MdmService } from "@app/services/mdm";
import { EntityType } from "@app/types/mdm";
import { ClientOnly } from "@app/utils/client-only";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eraser, Save } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import PageHeader from "./ui/page-header";
import { Skeleton } from "./ui/skeleton";

export function generateZodSchema(entity: EntityType) {
  const config = ENTITY_CONFIG[entity];
  const schemaObj: Record<string, any> = {};

  if (!config.fields) {
    return z.object({});
  }

  Object.entries(config.fields).forEach(([key, field]) => {
    let fieldSchema: any = z.string();

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
        fieldSchema = fieldSchema.min(1, { message: `${key} is required` });
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

  // Define form schema based on entity
  const formSchema = generateZodSchema(entity);
  type FormValues = z.infer<typeof formSchema>;

  // Create default values for all fields
  const defaultValues = React.useMemo(() => {
    const values: Record<string, any> = {};
    if (entityConfig.fields) {
      Object.entries(entityConfig.fields).forEach(([key, field]) => {
        // Set appropriate default value based on field type
        if (field.type === "checkbox") {
          values[key] = false;
        } else if (field.type === "number") {
          values[key] = 0;
        } else if (field.type === "date") {
          values[key] = undefined;
        } else if (field.type === "multiselect") {
          values[key] = [];
        } else if (
          field.type === "textarea" ||
          field.type === "text" ||
          field.type === "select" ||
          field.type === "radio"
        ) {
          values[key] = "";
        } else {
          values[key] = "";
        }
      });
    }
    return values;
  }, [entityConfig.fields]);

  // Initialize the form with explicit type and default values
  const form = useForm<Record<string, any>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Fetch entity data for edit mode
  const { data: entityData, isLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      if (!id || isCreate) return {};
      return service.getById(id);
    },
    enabled: !!id && !isCreate,
  });

  // Set form values when entity data is loaded
  React.useEffect(() => {
    if (entityData && !isCreate) {
      // Convert date strings to Date objects
      const processedData: Record<string, any> = { ...entityData };
      if (entityConfig.fields) {
        Object.entries(entityConfig.fields).forEach(([key, field]) => {
          if (field.type === "date" && typeof processedData[key] === "string") {
            processedData[key] = new Date(processedData[key]);
          }
        });
      }
      form.reset(processedData);
    }
  }, [entityData, form, isCreate, entityConfig.fields]);

  // Handle form submission
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return isCreate ? service.create(data) : service.update(id!, data);
    },
    onSuccess: () => {
      navigate(ROUTES.app.mdm.list(entity));
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

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
        title={
          isCreate
            ? `${t(`entities.${entity}.name`)} - ${t("common.action.create")}`
            : `${t(`entities.${entity}.name`)} - ${t("common.action.edit")}`
        }
      >
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => {
              form.reset(defaultValues);
            }}
          >
            <Eraser className="mr-2 h-4 w-4" />
            {t("common.action.clear")}
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            <Save className="mr-2 h-4 w-4" />
            {t("common.action.save")}
          </Button>
        </div>
      </PageHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(entityConfig.fields || {}).map(([key, field]) => (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel htmlFor={`field-${key}`} id={`label-${key}`}>
                      {t(`entities.${entity}.fields.${key}`)}
                    </FormLabel>
                    <FormControl>
                      {field.type === "text" || field.type === "number" ? (
                        field.mask ? (
                          <MaskedInput
                            id={`field-${key}`}
                            mask={field.mask}
                            placeholder={
                              field.placeholder
                                ? t(field.placeholder)
                                : undefined
                            }
                            disabled={field.disabled}
                            {...formField}
                          />
                        ) : (
                          <Input
                            id={`field-${key}`}
                            type={field.type === "number" ? "number" : "text"}
                            placeholder={
                              field.placeholder
                                ? t(field.placeholder)
                                : undefined
                            }
                            min={field.min}
                            max={field.max}
                            pattern={field.pattern}
                            disabled={field.disabled}
                            readOnly={field.readonly}
                            {...formField}
                          />
                        )
                      ) : field.type === "textarea" ? (
                        <Textarea
                          id={`field-${key}`}
                          placeholder={
                            field.placeholder
                              ? t(field.placeholder)
                              : t(
                                  `entities.${entity}.fields.${key}Placeholder`,
                                  {
                                    defaultValue: t("common.action.enterText"),
                                  }
                                )
                          }
                          minLength={field.min}
                          maxLength={field.max}
                          disabled={field.disabled}
                          readOnly={field.readonly}
                          className="min-h-[120px]"
                          {...formField}
                        />
                      ) : field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          value={formField.value}
                          disabled={field.disabled}
                        >
                          <SelectTrigger id={`field-${key}`} className="w-full">
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
                      ) : field.type === "checkbox" ? (
                        <Checkbox
                          id={`field-${key}`}
                          checked={formField.value}
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
                        />
                      ) : field.type === "radio" ? (
                        <div className="radio-group-wrapper">
                          <RadioGroup
                            onValueChange={formField.onChange}
                            value={formField.value}
                            className="flex flex-col space-y-2"
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
                          <MultiSelect
                            options={field.options || []}
                            selected={formField.value || []}
                            onChange={formField.onChange}
                            placeholder={
                              field.placeholder
                                ? t(field.placeholder)
                                : t("common.action.selectOptions")
                            }
                            disabled={field.disabled}
                            t={t}
                            id={`field-${key}`}
                          />
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
                )}
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
