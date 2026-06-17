export type ThemeId = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";

function resolveTheme(theme: ThemeId) {
  if (theme === "light" || theme === "dark") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredTheme(): ThemeId {
  return (
    (localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null) ?? "system"
  );
}

export function applyTheme(
  theme: ThemeId,
  radios?: NodeListOf<HTMLInputElement>,
) {
  if (theme === "system") {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  const resolved = resolveTheme(theme);

  document.documentElement.classList.toggle("dark", resolved === "dark");

  radios?.forEach((radio) => {
    radio.checked = radio.value === theme;
  });
}
