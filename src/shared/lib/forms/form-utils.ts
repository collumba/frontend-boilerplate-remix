import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Path, useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

export function useZodForm<T extends FieldValues>(
  schema: z.ZodType<T>,
  options?: Omit<UseFormProps<T>, "resolver">
) {
  return useForm<T>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    ...options,
  });
}

export function getFieldErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return "Invalid field";
}

export function getFormErrorsFromZodError(error: z.ZodError) {
  return error.errors.reduce((acc, curr) => {
    const path = curr.path.join(".");
    if (!acc[path]) {
      acc[path] = curr.message;
    }
    return acc;
  }, {} as Record<string, string>);
}

export function validateFormData<T>(
  schema: z.ZodType<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

// Infer the type from a zod schema
export type InferSchema<T extends z.ZodType<any, any, any>> = z.infer<T>;

// Helper to infer the type of a React Hook Form field
export type FieldType<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>
> = TFormValues[TFieldName];

// Helper to create a form schema with common validations
export const createFormSchema = {
  email: () => z.string().email("Invalid email format"),

  password: (minLength = 6) =>
    z
      .string()
      .min(minLength, `Password must be at least ${minLength} characters`),

  text: (field: string, minLength = 1, maxLength = 100) =>
    z
      .string()
      .min(minLength, `${field} is required`)
      .max(maxLength, `${field} must be less than ${maxLength} characters`),

  number: (field: string, min?: number, max?: number) => {
    let schema = z.number({ invalid_type_error: `${field} must be a number` });
    if (min !== undefined)
      schema = schema.min(min, `${field} must be at least ${min}`);
    if (max !== undefined)
      schema = schema.max(max, `${field} must be at most ${max}`);
    return schema;
  },
};
