import type { ReactNode } from "react";
import styles from "./field.module.css";

type Props = {
  invalid?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({ invalid = false, children, className }: Props) {
  return (
    <div
      role="group"
      data-slot="field"
      data-invalid={invalid}
      className={`${styles.field} ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  className,
  srOnly = false,
}: {
  htmlFor: string;
  children: ReactNode;
  className?: string;
  srOnly?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      data-slot="field-label"
      className={
        srOnly ? "sr-only" : `${styles.label} ${className ?? ""}`.trim()
      }>
      {children}
    </label>
  );
}

export function FieldError({
  id,
  message,
  className,
}: {
  id: string;
  message: string | undefined;
  className?: string;
}) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      data-slot="field-error"
      className={`${styles.error} ${className ?? ""}`.trim()}>
      {message}
    </p>
  );
}
