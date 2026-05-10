import styles from "./form-message.module.css";

type Props = {
  visible: boolean;
  message?: string;
  variant?: "success" | "error";
};

export function FormMessage({
  visible,
  message = "Sent! I'll get back to you soon.",
  variant,
}: Props) {
  if (!visible) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className={styles.message}
      data-variant={variant}>
      {message}
    </p>
  );
}
