// Backwards-compatible re-exports. The real data lives in `src/data/projects.ts`.
export {
  PROJECT_CATEGORIES,
  groupProjectsByCategory,
  getProjectCategoryMeta,
} from '@/data/projects';
export type { ProjectCategoryId, ProjectCategory } from '@/data/projects';

import { getProjectBySlug } from '@/data/projects';

export function getProjectCategory(slug: string) {
  return getProjectBySlug(slug)?.category ?? 'eda';
}

/** Kept only so any lingering imports don't break; consumers should read
 *  `image` off the project object instead. */
import { PROJECTS } from '@/data/projects';
export const PROJECT_IMAGES: Record<string, string | undefined> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p.image]),
);
