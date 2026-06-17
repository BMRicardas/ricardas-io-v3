import { Activity, type ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./field.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Field({ children, className }: Props) {
  return (
    <div role="group" className={clsx(styles.field, className)}>
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
      className={clsx(srOnly ? "sr-only" : styles.label, className)}
    >
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
  message: string;
  className?: string;
}) {
  return (
    <Activity mode={message ? "visible" : "hidden"}>
      <p id={id} role="alert" className={clsx(styles.error, className)}>
        {message}
      </p>
    </Activity>
  );
}
