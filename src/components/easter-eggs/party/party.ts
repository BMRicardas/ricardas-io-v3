// src/components/easter-eggs/party.ts

import { mode, isIdle } from "../state";
import { launchConfetti, clearConfetti } from "../confetti/confetti";

const COOLDOWN = 600;

let interval = 0;
let lastBurst = 0;

export function startPartyMode() {
  const root = document.documentElement;
  mode.set("party");
  root.classList.add("party-mode");
  lastBurst = Date.now();
  launchConfetti();

  let hue = 0;
  interval = window.setInterval(() => {
    hue = (hue + 3) % 360;
    root.style.setProperty("--c-accent", `hsl(${hue}, 100%, 55%)`);
  }, 50);
}

export function stopPartyMode() {
  const root = document.documentElement;
  root.classList.remove("party-mode");
  clearInterval(interval);
  root.style.removeProperty("--c-accent");
  clearConfetti();
}

export function triggerParty() {
  if (isIdle.get()) return startPartyMode();
  if (mode.get() !== "party") return;
  const now = Date.now();
  if (now - lastBurst > COOLDOWN) {
    lastBurst = now;
    launchConfetti();
  }
}
