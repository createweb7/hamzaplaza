import type { MetadataRoute } from "next";

const BASE_URL = "https://www.hamzaplaza.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/rooms",
    "/contact",
    "/rooms-in-adirampattinam",
    "/hotel-in-adirampattinam",
    "/lodge-in-adirampattinam",
    "/family-rooms-in-adirampattinam",
    "/ac-rooms-in-adirampattinam",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
