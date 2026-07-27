import type { MetadataRoute } from "next";

const BASE_URL = "https://hamzaplaza.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/rooms", "/contact"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
