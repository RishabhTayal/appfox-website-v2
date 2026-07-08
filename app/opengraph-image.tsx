import { brandOgImage } from "@/lib/og";

export const alt = "AppFox - Grow revenue from every order";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Grow revenue from every order");
}
