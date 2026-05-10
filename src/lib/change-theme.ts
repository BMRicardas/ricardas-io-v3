export function applyTheme(theme: string) {
  if (theme === "system") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", theme);
  }

  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.classList.toggle("dark", resolved === "dark");

  document
    .querySelectorAll<HTMLButtonElement>(".theme-toggle button[data-theme]")
    .forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.theme === theme));
    });
}
