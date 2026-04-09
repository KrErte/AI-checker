import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/claim", "/audit", "/api/"],
    },
    sitemap: "https://hirecheck.eu/sitemap.xml",
  }
}
