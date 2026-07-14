import { MetadataRoute } from "next";
import { projects } from "@/components/sections/Work/work.data";

const DEFAULT_SITE_URL = "https://heetportfolio.vercel.app";

function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const baseUrl = envUrl && envUrl.length > 0 ? envUrl : DEFAULT_SITE_URL;
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();
  const lastModified = new Date();

  // Main site routes
  const staticRoutes = [
    {
      path: "",
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      path: "/resume",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/projects",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic project routes
  const projectRoutes = projects.map((project) => ({
    path: `/projects/${project.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
