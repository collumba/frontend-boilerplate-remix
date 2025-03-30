import { Button } from "@app/components/ui/button";
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
import { useEntityForm } from "@app/config/mdm";
import { ROUTES } from "@app/config/routes";
import { MdmService } from "@app/services/mdm";
import { EntityType } from "@app/types/mdm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Save } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import PageHeader from "./ui/page-header";

interface EntityFieldConfig {
  name: string;
  type: "text" | "number" | "checkbox" | "select";
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface EntityFormConfig {
  fields: Record<string, EntityFieldConfig>;
}

export function generateZodSchema(entity: string) {
  const config = useEntityForm(entity as EntityType);
  const schemaObj: Record<string, any> = {};

  Object.entries(config.fields).forEach(([key, field]) => {
    let fieldSchema: any = z.string();

    if (field.type === "number") {
      fieldSchema = z.coerce.number();
    } else if (field.type === "checkbox") {
      fieldSchema = z.boolean();
    }

    if (field.required) {
      if (field.type === "checkbox") {
        // For checkboxes, just use the boolean schema
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
  entity: string;
  id?: string;
  isCreate?: boolean;
}

export default function EntityForm({
  entity,
  id,
  isCreate = true,
}: EntityFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const service = new MdmService(entity as EntityType);
  const entityFormConfig = useEntityForm(entity as EntityType);

  // Define form schema based on entity
  const formSchema = generateZodSchema(entity);
  type FormValues = z.infer<typeof formSchema>;

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
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
      form.reset(entityData);
    }
  }, [entityData, form, isCreate]);

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
  const pageHeaderTitle = isCreate
    ? `${t("common.action.create")} - ${t(`entities.${entity}.name`)}`
    : `${t("common.action.edit")} - ${t(`entities.${entity}.name`)}`;

  return (
    <div className="space-y-6">
      <PageHeader title={pageHeaderTitle} hasBackButton={true}>
        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            <Save className="mr-2 h-4 w-4" />
            {t("common.actions.save")}
          </Button>
        </div>
      </PageHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(entityFormConfig.fields).map(([key, field]) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      {t(`entities.${entity}.fields.${key}`)}
                    </FormLabel>
                    <FormControl>
                      {field.type === "text" || field.type === "number" ? (
                        <Input
                          type={field.type === "number" ? "number" : "text"}
                          {...formField}
                        />
                      ) : field.type === "checkbox" ? (
                        <Checkbox
                          checked={formField.value}
                          onCheckedChange={formField.onChange}
                        />
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
