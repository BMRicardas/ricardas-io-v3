import { atom, computed } from "nanostores";

export type Mode = "none" | "party";

export const mode = atom<Mode>("none");

export const isIdle = computed(mode, ($mode) => $mode === "none");

export const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const pick = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
