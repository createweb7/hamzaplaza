import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hamza Residency Plaza",
    short_name: "Hamza Plaza",
    description: "Daily-rental AC & Non-AC rooms in Adirampattinam, on ECR Road.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0a08",
    theme_color: "#0b0a08",
    icons: [
      { src: "/assets/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
