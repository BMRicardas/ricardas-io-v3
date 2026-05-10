export type Mode = "none" | "party";

let mode: Mode = "none";

// const listeners = new Set<(mode: Mode) => void>();

export function getMode(): Mode {
  return mode;
}

export function setMode(next: Mode) {
  mode = next;
}

export function isIdle(): boolean {
  return mode === "none";
}

export const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const pick = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
