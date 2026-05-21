import { resolveTheme, THEME_STORAGE_KEY, type ThemeId } from "./theme";

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
