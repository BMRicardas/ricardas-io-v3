import { atom } from "nanostores";

export type Variant = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  variant?: Variant;
  duration?: number;
}

export const toasts = atom<Toast[]>([]);

export function addToast(toast: Omit<Toast, "id">) {
  const currentToasts = toasts.get();
  const existingIndex = currentToasts.findIndex(
    (t) => t.message === toast.message,
  );

  if (existingIndex !== -1) {
    const updatedToasts = [...currentToasts];

    updatedToasts[existingIndex] = {
      ...toast,
      id: Math.random().toString(36).slice(2, 9),
    };
    toasts.set(updatedToasts);
  } else {
    const id = Math.random().toString(36).slice(2, 9);
    toasts.set([{ ...toast, id }, ...currentToasts]);
  }
}

export function removeToast(id: string) {
  toasts.set(toasts.get().filter((t) => t.id !== id));
}

export const toast = {
  info: (msg: string, duration = 5000) =>
    addToast({ message: msg, variant: "info", duration }),
  success: (msg: string, duration = 5000) =>
    addToast({ message: msg, variant: "success", duration }),
  error: (msg: string, duration?: number) =>
    addToast({ message: msg, variant: "error", duration }), // Errors might default to no duration!
};
