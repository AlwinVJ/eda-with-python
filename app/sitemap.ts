import type { MetadataRoute } from 'next';
import { getAllProjects, getAllDatasets, getAllHandbooks } from '@/lib/content';

// NEXT_PUBLIC_SITE_URL is the deployed site's own URL (see .env.example) —
// distinct from NEXT_PUBLIC_REPO_URL, which points at the GitHub repo.
// Previously this was a second hardcoded placeholder, independent from the
// one in next.config.mjs; now both come from the same env source.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-username.github.io/EDA-With-Python';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/learning-guide', '/projects', '/documentation', '/handbooks', '/cheatsheets', '/datasets', '/resources', '/about', '/contact']
    .map((route) => ({ url: `${BASE_URL}${route}`, lastModified: new Date() }));

  const projectRoutes = getAllProjects().map((p) => ({ url: `${BASE_URL}/projects/${p.slug}`, lastModified: p.lastUpdated }));
  const datasetRoutes = getAllDatasets().map((d) => ({ url: `${BASE_URL}/datasets/${d.slug}`, lastModified: d.lastUpdated }));
  const handbookRoutes = getAllHandbooks().map((h) => ({ url: `${BASE_URL}/handbooks/${h.slug}`, lastModified: h.lastUpdated }));

  return [...staticRoutes, ...projectRoutes, ...datasetRoutes, ...handbookRoutes];
}
