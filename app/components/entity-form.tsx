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
import { ROUTES } from "@app/config/routes";
import { MdmService } from "@app/services/mdm";
import { EntityType } from "@app/types/mdm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Save } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

interface EntityFieldConfig {
  name: string;
  type: "text" | "number" | "checkbox" | "select";
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface EntityFormConfig {
  fields: Record<string, EntityFieldConfig>;
}

// This would typically come from a config file
const ENTITY_FORM_CONFIG: Record<string, EntityFormConfig> = {
  character: {
    fields: {
      name: { name: "name", type: "text", required: true },
      status: { name: "status", type: "text", required: true },
      species: { name: "species", type: "text", required: true },
      gender: { name: "gender", type: "text", required: true },
    },
  },
  location: {
    fields: {
      name: { name: "name", type: "text", required: true },
      type: { name: "type", type: "text", required: true },
    },
  },
  episode: {
    fields: {
      name: { name: "name", type: "text", required: true },
      air_date: { name: "air_date", type: "text", required: true },
      episode: { name: "episode", type: "text", required: true },
    },
  },
};

export function generateZodSchema(entity: string) {
  const config = ENTITY_FORM_CONFIG[entity];
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(ROUTES.app.mdm.list(entity))}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("actions.back")}
        </Button>
        <h2 className="text-2xl font-bold">
          {isCreate
            ? t(`entities.${entity}.create`)
            : t(`entities.${entity}.edit`)}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(ENTITY_FORM_CONFIG[entity].fields).map(
              ([key, field]) => (
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
              )
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={mutation.isPending}>
              <Save className="mr-2 h-4 w-4" />
              {t("actions.save")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
