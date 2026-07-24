// ============================================================================
// CONTENT LOADER
// This is the ONLY place that touches the filesystem for metadata.
// It walks each content directory, reads metadata.json, validates it,
// and returns typed arrays the pages consume via generateStaticParams
// and getStaticProps-equivalent server components.
//
// ADD A NEW PROJECT / HANDBOOK / CHEATSHEET / DATASET:
//   1. Create a folder under content/<type>/<slug>/
//   2. Add metadata.json following lib/types.ts
//   3. Run `npm run validate:metadata`
//   4. Done — no component changes needed, the page is generated automatically.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import type {
  ProjectMetadata,
  HandbookMetadata,
  CheatsheetMetadata,
  DatasetMetadata,
  ResourceMetadata,
  LearningGuideStep,
  LearningGuideStepResolved,
  LearningGuideTargetType,
} from './types';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function readMetadataDir<T>(subdir: string): T[] {
  const dir = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory());

  const items: T[] = [];
  for (const entry of entries) {
    const metaPath = path.join(dir, entry.name, 'metadata.json');
    if (!fs.existsSync(metaPath)) {
      console.warn(`[content] Skipping "${entry.name}" in ${subdir} — no metadata.json found.`);
      continue;
    }
    const raw = fs.readFileSync(metaPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.slug !== entry.name) {
      console.warn(
        `[content] Mismatch: folder "${entry.name}" has metadata.slug="${parsed.slug}". Using folder name.`
      );
      parsed.slug = entry.name;
    }
    items.push(parsed as T);
  }
  return items;
}

export function getAllProjects(): ProjectMetadata[] {
  return readMetadataDir<ProjectMetadata>('projects');
}

export function getProject(slug: string): ProjectMetadata | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllHandbooks(): HandbookMetadata[] {
  // Introductory handbooks (e.g. NumPy Essentials) surface first via `order`;
  // handbooks without an explicit order fall to the end, sorted by title.
  return readMetadataDir<HandbookMetadata>('handbooks').sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getHandbook(slug: string): HandbookMetadata | undefined {
  return getAllHandbooks().find((h) => h.slug === slug);
}

export function getAllCheatsheets(): CheatsheetMetadata[] {
  return readMetadataDir<CheatsheetMetadata>('cheatsheets');
}

export function getAllDatasets(): DatasetMetadata[] {
  return readMetadataDir<DatasetMetadata>('datasets');
}

export function getDataset(slug: string): DatasetMetadata | undefined {
  return getAllDatasets().find((d) => d.slug === slug);
}

export function getAllResources(): ResourceMetadata[] {
  return readMetadataDir<ResourceMetadata>('resources');
}

// Resolves a Learning Guide action's targetType+targetSlug into a real href,
// so guide content never hardcodes a URL and never goes stale.
function resolveLearningGuideHref(targetType?: LearningGuideTargetType, targetSlug?: string): string | undefined {
  if (!targetType || !targetSlug) return undefined;
  switch (targetType) {
    case 'handbook':
      return `/handbooks#${targetSlug}`;
    case 'project':
      return `/projects/${targetSlug}`;
    case 'cheatsheet':
      return `/cheatsheets#${targetSlug}`;
    case 'dataset':
      return `/datasets/${targetSlug}`;
    default:
      return undefined;
  }
}

export function getLearningGuide(): LearningGuideStepResolved[] {
  const guidePath = path.join(CONTENT_ROOT, 'learning-guide.json');
  if (!fs.existsSync(guidePath)) return [];
  const steps: LearningGuideStep[] = JSON.parse(fs.readFileSync(guidePath, 'utf-8'));
  return steps
    .sort((a, b) => a.order - b.order)
    .map((step) => ({
      ...step,
      actions: step.actions.map((action) => ({
        ...action,
        href: resolveLearningGuideHref(action.targetType, action.targetSlug),
      })),
    }));
}

// Aggregate stats for the homepage "Repository Statistics" section.
export function getRepoStats() {
  return {
    projects: getAllProjects().length,
    handbooks: getAllHandbooks().length,
    cheatsheets: getAllCheatsheets().length,
    datasets: getAllDatasets().length,
    resources: getAllResources().length,
  };
}

// Flat index used to power the global search (built at compile time,
// shipped as static JSON, searched client-side with no backend).
export function buildSearchIndex() {
  const projects = getAllProjects().map((p) => ({
    type: 'project' as const,
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags,
    href: `/projects/${p.slug}`,
  }));
  const handbooks = getAllHandbooks().map((h) => ({
    type: 'handbook' as const,
    slug: h.slug,
    title: h.title,
    description: h.description,
    tags: h.tags,
    href: `/handbooks#${h.slug}`,
  }));
  const cheatsheets = getAllCheatsheets().map((c) => ({
    type: 'cheatsheet' as const,
    slug: c.slug,
    title: c.title,
    description: c.description,
    tags: c.tags,
    href: `/cheatsheets#${c.slug}`,
  }));
  const datasets = getAllDatasets().map((d) => ({
    type: 'dataset' as const,
    slug: d.slug,
    title: d.title,
    description: d.description,
    tags: d.tags,
    href: `/datasets/${d.slug}`,
  }));
  const resources = getAllResources().map((r) => ({
    type: 'resource' as const,
    slug: r.slug,
    title: r.title,
    description: r.description,
    tags: r.tags,
    href: `/resources#${r.slug}`,
  }));
  return [...projects, ...handbooks, ...cheatsheets, ...datasets, ...resources];
}

export function githubUrl(relPath: string): string {
  const base = process.env.NEXT_PUBLIC_REPO_URL ?? 'https://github.com/<your-username>/EDA-With-Python';
  return `${base}/tree/main/${relPath}`.replace(/\/+$/, '');
}

export function githubBlobUrl(relPath: string): string {
  const base = process.env.NEXT_PUBLIC_REPO_URL ?? 'https://github.com/<your-username>/EDA-With-Python';
  return `${base}/blob/main/${relPath}`;
}

export function githubRawUrl(relPath: string): string {
  const base = process.env.NEXT_PUBLIC_REPO_URL ?? 'https://github.com/<your-username>/EDA-With-Python';
  return `${base.replace('github.com', 'raw.githubusercontent.com')}/main/${relPath}`;
}

// Generic asset URL used for handbook PDFs, cheatsheet images, and dataset
// downloads. Wraps githubRawUrl but is named neutrally since these surfaces
// (handbooks, cheatsheets) should never expose "GitHub" in their UI copy —
// only project pages link to GitHub directly.
export function assetUrl(githubPath: string, filename: string): string {
  return githubRawUrl(`${githubPath}/${filename}`);
}
