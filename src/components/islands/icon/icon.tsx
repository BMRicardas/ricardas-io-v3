import { icons, type IconName } from "@/lib/icons";
import type { ComponentProps } from "react";

import styles from "./icon.module.css";

type Props = ComponentProps<"svg"> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 40, ...rest }: Props) {
  const path = icons[name];
  const resolvedSize = size;

  return (
    <svg
      className={styles.icon}
      viewBox="0 0 640 640"
      width={resolvedSize}
      height={resolvedSize}
      aria-hidden="true"
      fill="currentColor"
      {...rest}
    >
      <path d={path}></path>
    </svg>
  );
}
