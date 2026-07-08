import { brandOgImage } from "@/lib/og";

export const alt = "AppFox features - Every order, handled";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Every order, handled");
}
