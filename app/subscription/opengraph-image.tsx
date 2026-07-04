import { brandOgImage } from "@/lib/og";

export const alt = "AppFox Subscription - Turn one-time buyers into subscribers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Turn one-time buyers into subscribers");
}
