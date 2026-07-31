import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { detailedProjects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...detailedProjects.map((p) => ({
      url: new URL(`projects/${p.slug}/`, site.siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
