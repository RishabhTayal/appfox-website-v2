import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#181818",
    theme_color: "#181818",
    icons: [
      {
        src: "/icon.png",
        sizes: "1200x1200",
        type: "image/png",
      },
    ],
  };
}
