import {
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldLabel, FieldError } from "./field";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { useFormField } from "./use-form-field";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type?: "text" | "email" | "textarea";
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
};

export function FormField<T extends FieldValues>({
  name,
  label,
  control,
  type = "text",
  disabled,
  autoComplete,
  placeholder,
  maxLength,
  rows,
}: Props<T>) {
  const { fieldProps, labelProps, errorProps } = useFormField({ name, control });

  const isTextarea = type === "textarea";

  return (
    <Field>
      <FieldLabel {...labelProps}>{label}</FieldLabel>
      {isTextarea ? (
        <Textarea
          {...fieldProps}
          disabled={disabled}
          placeholder={placeholder ?? " "}
          maxLength={maxLength}
          rows={rows}
          length={(fieldProps.value as string)?.length ?? 0}
        />
      ) : (
        <Input
          {...fieldProps}
          type={type}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder ?? " "}
        />
      )}
      <FieldError {...errorProps} />
    </Field>
  );
}
