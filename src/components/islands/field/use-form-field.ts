import { useId } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

export function useFormField<T extends FieldValues>({
  name,
  control,
}: {
  name: Path<T>;
  control: Control<T>;
}) {
  const id = useId();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const errorId = `${id}-error`;

  return {
    id,
    error,
    fieldProps: {
      ...field,
      id,
      "aria-invalid": !!error,
      "aria-describedby": error ? errorId : undefined,
    },
    labelProps: {
      htmlFor: id,
    },
    errorProps: {
      id: errorId,
      message: error?.message ?? "",
    },
  };
}
