import { useStore } from "@nanostores/react";
import { createPortal } from "react-dom";
import { toasts, removeToast } from "@/stores/toast";
import { ToastMessage } from "./toast-message";
import styles from "./toast-container.module.css";

export function ToastContainer() {
  const $toasts = useStore(toasts);

  return createPortal(
    <div className={styles.toastContainer}>
      {$toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body,
  );
}
