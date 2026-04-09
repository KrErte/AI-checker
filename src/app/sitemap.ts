import type { MetadataRoute } from "next"

const SITE = "https://hirecheck.eu"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/et`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/human-review`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/cv-check`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/submit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/companies`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE}/ai-act-ready`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/for-employers`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/et/tooandjatele`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/my-rights`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}
