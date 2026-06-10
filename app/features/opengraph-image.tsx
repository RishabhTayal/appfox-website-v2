import { brandOgImage } from "@/lib/og";

export const alt = "AppFox features — Everything after checkout, handled";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Everything after checkout, handled");
}
