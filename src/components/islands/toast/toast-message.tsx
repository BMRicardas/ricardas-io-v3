import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { type Variant } from "@/stores/toast";
import styles from "./toast-message.module.css";

type Props = {
  message: string;
  variant?: Variant;
  duration?: number;
  onClose?: () => void;
};

export function ToastMessage({
  message,
  variant = "info",
  duration,
  onClose,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  const timeRemainingRef = useRef(duration ?? 0);
  const timeoutRef = useRef<number | null>(null);

  const handleClose = () => {
    if (isClosing) return;

    setIsClosing(true);

    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!duration || duration <= 0 || isPaused || isClosing) return;

    let frameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      timeRemainingRef.current = Math.max(0, timeRemainingRef.current - delta);
      setProgress((timeRemainingRef.current / duration) * 100);

      if (timeRemainingRef.current <= 0) {
        handleClose();
      } else {
        lastTime = now;
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [duration, isPaused, isClosing]);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        styles.toast,
        styles[`toast--${variant}`],
        isClosing && styles.closing,
      )}
      style={
        {
          ...(duration && duration > 1
            ? { "--duration": `${duration}ms` }
            : ""),
        } as React.CSSProperties
      }
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <p role="status" aria-live="polite">
        {message}
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <Icon name="close" size={20} />
      </Button>

      {duration && duration > 0 && (
        <progress className={styles.progressBar} value={progress} max="100" />
      )}
    </div>
  );
}
