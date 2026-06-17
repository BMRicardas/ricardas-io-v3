import type { ComponentProps } from "react";
import { clsx } from "clsx";
import styles from "./button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "icon";
  fullWidth?: boolean;
};

export function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
    >
      {children}
    </button>
  );
}
