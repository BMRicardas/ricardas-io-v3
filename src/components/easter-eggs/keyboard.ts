import { getMode, setMode } from "./state";

export function initKeyboardShortcuts() {
  document.addEventListener("keydown", async (e) => {
    // Ignore when typing in inputs
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

    if (e.key.toLowerCase() === "p") {
      const { triggerParty } = await import("./party/party");
      triggerParty();
    }

    if (e.key.toLowerCase() === "r") {
      const { stopPartyMode } = await import("./party/party");
      if (getMode() === "party") {
        stopPartyMode();
        setMode("none");
      }
    }
  });
}
