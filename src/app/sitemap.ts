import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes = ["", "/about", "/programs", "/impact", "/governance", "/donate", "/volunteer", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: r === "" ? "weekly" : "monthly", priority: r === "" ? 1 : r === "/donate" ? 0.9 : 0.7 }));
}
