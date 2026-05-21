export type ThemeId = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function getStoredTheme(): ThemeId {
  return (
    (localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null) ?? "system"
  );
}

export function resolveTheme(theme: ThemeId): ResolvedTheme {
  if (theme === "light" || theme === "dark") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
