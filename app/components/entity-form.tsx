import { Button } from "@app/components/ui/button";
import { ButtonInput } from "@app/components/ui/button-input";
import { Calendar } from "@app/components/ui/calendar";
import { Checkbox } from "@app/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@app/components/ui/popover";
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
import { cn } from "@app/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Eraser, Save } from "lucide-react";
import * as React from "react";
import { useState } from "react";
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
        } else if (
          field.type === "textarea" ||
          field.type === "text" ||
          field.type === "select"
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
            onClick={() => form.reset()}
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
                    <FormLabel htmlFor={key}>
                      {t(`entities.${entity}.fields.${key}`)}
                    </FormLabel>
                    <FormControl>
                      {field.type === "text" || field.type === "number" ? (
                        <Input
                          id={key}
                          type={field.type === "number" ? "number" : "text"}
                          {...formField}
                        />
                      ) : field.type === "textarea" ? (
                        <Textarea
                          id={key}
                          placeholder={t(
                            `entities.${entity}.fields.${key}Placeholder`,
                            {
                              defaultValue: t("common.action.enterText"),
                            }
                          )}
                          className="min-h-[120px]"
                          {...formField}
                        />
                      ) : field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                        >
                          <SelectTrigger id={key} className="w-full">
                            <SelectValue
                              placeholder={t("common.action.select")}
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
                          id={key}
                          checked={formField.value}
                          onCheckedChange={formField.onChange}
                        />
                      ) : field.type === "date" ? (
                        <DatePickerField
                          key={key}
                          fieldId={key}
                          field={field}
                          formField={formField}
                          t={t}
                        />
                      ) : field.type === "radio" ? (
                        <RadioGroup
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                          className="flex flex-col space-y-2"
                        >
                          {field.options?.map(
                            (option: { label: string; value: string }) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={option.value}
                                  id={`${key}-${option.value}`}
                                />
                                <label
                                  htmlFor={`${key}-${option.value}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {t(option.label)}
                                </label>
                              </div>
                            )
                          )}
                        </RadioGroup>
                      ) : null}
                    </FormControl>
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

function DatePickerField({
  fieldId,
  field,
  formField,
  t,
}: {
  fieldId: string;
  field: any;
  formField: any;
  t: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ButtonInput
          id={fieldId}
          leadingIcon={<CalendarIcon className="h-4 w-4" />}
          className={cn(
            !formField.value && "text-muted-foreground",
            isOpen && "border-ring"
          )}
        >
          {formField.value ? (
            format(formField.value, "PPP", { locale: ptBR })
          ) : (
            <span>{t("common.action.pickDate")}</span>
          )}
        </ButtonInput>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={formField.value}
          onSelect={(date) => {
            formField.onChange(date);
            setIsOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
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
