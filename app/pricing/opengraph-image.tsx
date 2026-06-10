import { brandOgImage } from "@/lib/og";

export const alt = "AppFox pricing — Free · $19 · $49 — no per-edit fees";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Free · $19 · $49 — no per-edit fees");
}
