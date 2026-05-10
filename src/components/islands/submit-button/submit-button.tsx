import type { ComponentProps } from "react";
import styles from "./submit-button.module.css";

type Props = ComponentProps<"button"> & {
  isSubmitting: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
};

export function SubmitButton({
  isSubmitting,
  disabled,
  label = "Send my message",
  loadingLabel = "Sending…",
  ...rest
}: Props) {
  const isDisabled = isSubmitting || disabled;

  return (
    <button
      {...rest}
      type="submit"
      disabled={isDisabled}
      className={styles.button}
    >
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
