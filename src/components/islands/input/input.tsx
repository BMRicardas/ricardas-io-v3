import type { ComponentPropsWithRef } from "react";

import styles from "./input.module.css";

type Props = ComponentPropsWithRef<"input"> & {
  id: string;
};
export function Input({ id, ref, ...rest }: Props) {
  return <input {...rest} id={id} ref={ref} className={styles.input} />;
}
