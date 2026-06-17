import type { ComponentProps } from "react";

import styles from "./input.module.css";

type Props = ComponentProps<"input">;
export function Input({ id, ref, ...rest }: Props) {
  return (
    <input
      {...rest}
      id={id}
      ref={ref}
      className={styles.input}
      placeholder=" "
    />
  );
}
