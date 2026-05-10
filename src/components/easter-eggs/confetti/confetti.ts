// src/components/easter-eggs/confetti.ts

import { rand, pick } from "../state";

const COUNT = 120;
const COLORS = [
  "#ff3c00",
  "#002fa7",
  "#4d7cff",
  "#ccff00",
  "#ff006e",
  "#00d4ff",
  "#ffe600",
];

type Piece = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  life: number;
};

const pieces: Piece[] = [];
let running = false;

function getCanvas() {
  const el = document.getElementById(
    "confetti-canvas",
  ) as HTMLCanvasElement | null;
  return { canvas: el, ctx: el?.getContext("2d") ?? null };
}

export function launchConfetti() {
  const { canvas, ctx } = getCanvas();
  if (!canvas || !ctx) return;

  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvas.style.display = "block";

  const cx = innerWidth / 2;
  const cy = innerHeight / 2;

  for (let i = 0; i < COUNT; i++) {
    pieces.push({
      x: cx + rand(-150, 150),
      y: cy + rand(-50, 50),
      w: rand(4, 14),
      h: rand(2, 8),
      color: pick(COLORS),
      vx: rand(-12, 12),
      vy: rand(-24, -4),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.15, 0.15),
      life: 1,
    });
  }

  if (!running) {
    running = true;
    draw();
  }
}

export function clearConfetti() {
  const { canvas, ctx } = getCanvas();
  pieces.length = 0;
  if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (canvas) canvas.style.display = "none";
  running = false;
}

function draw() {
  const { canvas, ctx } = getCanvas();
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].life <= 0) {
      pieces.splice(i, 1);
      continue;
    }

    const p = pieces[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.4;
    p.vx *= 0.99;
    p.rot += p.vr;
    p.life -= 0.006;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }

  if (pieces.length === 0) {
    running = false;
    canvas.style.display = "none";
    return;
  }

  requestAnimationFrame(draw);
}
