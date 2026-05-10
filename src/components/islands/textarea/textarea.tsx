import type { ComponentPropsWithRef } from "react";

import styles from "./textarea.module.css";

type Props = ComponentPropsWithRef<"textarea"> & {
  id: string;
  length?: number;
  maxLength?: number;
};
export function Textarea({ id, ref, length = 0, maxLength, ...rest }: Props) {
  return (
    <div className={styles.wrapper}>
      <textarea
        {...rest}
        id={id}
        ref={ref}
        className={styles.textarea}
        maxLength={maxLength}
      />
      {maxLength !== undefined && (
        <span
          className={styles.counter}
          data-has-value={length > 0}
          data-near-limit={length >= maxLength * 0.9}
          data-at-limit={length >= maxLength}
          aria-live="polite"
          aria-label={`${length} of ${maxLength} characters used`}>
          {length}/{maxLength}
        </span>
      )}
    </div>
  );
}
