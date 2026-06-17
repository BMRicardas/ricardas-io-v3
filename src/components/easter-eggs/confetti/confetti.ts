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
let rafId = 0;

// Cache canvas & ctx once — never look them up inside the animation loop
let _canvas: HTMLCanvasElement | null = null;
let _ctx: CanvasRenderingContext2D | null = null;

function getCanvas() {
  if (!_canvas) {
    _canvas = document.getElementById(
      "confetti-canvas",
    ) as HTMLCanvasElement | null;
    _ctx = _canvas?.getContext("2d") ?? null;
  }
  return { canvas: _canvas, ctx: _ctx };
}

export function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
    rafId = requestAnimationFrame(draw);
  }
}

export function clearConfetti() {
  const { canvas, ctx } = getCanvas();
  cancelAnimationFrame(rafId);
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
    const p = pieces[i];

    if (p.life <= 0) {
      pieces.splice(i, 1);
      continue;
    }

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.4;
    p.vx *= 0.99;
    p.rot += p.vr;
    p.life -= 0.006;

    // Manual transform instead of save/restore — much cheaper
    const cos = Math.cos(p.rot);
    const sin = Math.sin(p.rot);
    const hw = p.w / 2;
    const hh = p.h / 2;

    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(p.x + cos * -hw - sin * -hh, p.y + sin * -hw + cos * -hh);
    ctx.lineTo(p.x + cos * hw - sin * -hh, p.y + sin * hw + cos * -hh);
    ctx.lineTo(p.x + cos * hw - sin * hh, p.y + sin * hw + cos * hh);
    ctx.lineTo(p.x + cos * -hw - sin * hh, p.y + sin * -hw + cos * hh);
    ctx.closePath();
    ctx.fill();
  }

  if (pieces.length === 0) {
    running = false;
    canvas.style.display = "none";
    return;
  }

  rafId = requestAnimationFrame(draw);
}
