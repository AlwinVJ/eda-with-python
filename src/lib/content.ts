import type {
  ProjectMetadata,
  HandbookMetadata,
  CheatsheetMetadata,
  DatasetMetadata,
  ResourceMetadata,
  LearningGuideStep,
  LearningGuideStepResolved,
  LearningGuideTargetType,
} from "./types";
import { getProjectBySlug, getProjectsSorted } from "@/data/projects";

// Build-time import of every metadata.json under src/content/. Vite's
// import.meta.glob replaces this with a static map at bundle time — works
// in both SSR and the browser with no filesystem access.
// Projects live in `src/data/projects.ts` (single source of truth).
const handbookModules = import.meta.glob("../content/handbooks/*/metadata.json", {
  eager: true,
}) as Record<string, { default: HandbookMetadata }>;
const cheatsheetModules = import.meta.glob("../content/cheatsheets/*/metadata.json", {
  eager: true,
}) as Record<string, { default: CheatsheetMetadata }>;
const datasetModules = import.meta.glob("../content/datasets/*/metadata.json", {
  eager: true,
}) as Record<string, { default: DatasetMetadata }>;
const resourceModules = import.meta.glob("../content/resources/*/metadata.json", {
  eager: true,
}) as Record<string, { default: ResourceMetadata }>;
import learningGuideRaw from "../content/learning-guide.json";

function extractSlug(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 2];
}

function loadAll<T extends { slug: string }>(mods: Record<string, { default: T }>): T[] {
  return Object.entries(mods).map(([path, mod]) => {
    const folder = extractSlug(path);
    const data = { ...mod.default };
    if (data.slug !== folder) data.slug = folder;
    return data;
  });
}

export function getAllProjects(): ProjectMetadata[] {
  return getProjectsSorted();
}
export function getProject(slug: string) {
  return getProjectBySlug(slug);
}

export function getAllHandbooks(): HandbookMetadata[] {
  return loadAll(handbookModules).sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    return a.title.localeCompare(b.title);
  });
}
export function getHandbook(slug: string) {
  return getAllHandbooks().find((h) => h.slug === slug);
}

export function getAllCheatsheets(): CheatsheetMetadata[] {
  return loadAll(cheatsheetModules);
}
export function getAllDatasets(): DatasetMetadata[] {
  return loadAll(datasetModules);
}
export function getDataset(slug: string) {
  return getAllDatasets().find((d) => d.slug === slug);
}
export function getAllResources(): ResourceMetadata[] {
  return loadAll(resourceModules);
}

function resolveLearningGuideHref(
  targetType?: LearningGuideTargetType,
  targetSlug?: string,
): string | undefined {
  if (!targetType || !targetSlug) return undefined;
  switch (targetType) {
    case "handbook":
      return `/handbooks#${targetSlug}`;
    case "project":
      return `/projects/${targetSlug}`;
    case "cheatsheet":
      return `/cheatsheets#${targetSlug}`;
    case "dataset":
      return `/datasets/${targetSlug}`;
    default:
      return undefined;
  }
}

export function getLearningGuide(): LearningGuideStepResolved[] {
  const steps = learningGuideRaw as LearningGuideStep[];
  return [...steps]
    .sort((a, b) => a.order - b.order)
    .map((step) => ({
      ...step,
      actions: step.actions.map((action) => ({
        ...action,
        href: resolveLearningGuideHref(action.targetType, action.targetSlug),
      })),
    }));
}

export function getRepoStats() {
  return {
    projects: getAllProjects().length,
    handbooks: getAllHandbooks().length,
    cheatsheets: getAllCheatsheets().length,
    datasets: getAllDatasets().length,
    resources: getAllResources().length,
  };
}

export function buildSearchIndex() {
  return getAllProjects().map((p) => ({
    type: "project" as const,
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags,
    href: `/projects/${p.slug}`,
  }));
}

const REPO_BASE =
  (import.meta.env.VITE_REPO_URL as string | undefined) ??
  "https://github.com/your-username/EDA-With-Python";

export function githubUrl(relPath: string): string {
  return `${REPO_BASE}/tree/main/${relPath}`.replace(/\/+$/, "");
}
export function githubBlobUrl(relPath: string): string {
  return `${REPO_BASE}/blob/main/${relPath}`;
}
export function githubRawUrl(relPath: string): string {
  return `${REPO_BASE.replace("github.com", "raw.githubusercontent.com")}/main/${relPath}`;
}
export function assetUrl(githubPath: string, filename: string): string {
  return githubRawUrl(`${githubPath}/${filename}`);
}

export const REPO_URL = REPO_BASE;
