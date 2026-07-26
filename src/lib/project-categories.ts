import type { ProjectMetadata } from './types';

export const ML_PROJECT_SLUGS = new Set<string>(['house-prices']);

export type ProjectCategoryId = 'eda' | 'ml';

export interface ProjectCategory {
  id: ProjectCategoryId;
  title: string;
  description: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: 'eda',
    title: 'EDA Projects',
    description: 'Exploratory data analysis on real datasets — cleaning, visualization, and insight.',
  },
  {
    id: 'ml',
    title: 'End-to-End Machine Learning Projects',
    description: 'Full ML workflows — from raw data through feature engineering to a trained, evaluated model.',
  },
];

export function getProjectCategory(slug: string): ProjectCategoryId {
  return ML_PROJECT_SLUGS.has(slug) ? 'ml' : 'eda';
}

export function groupProjectsByCategory(projects: ProjectMetadata[]): Record<ProjectCategoryId, ProjectMetadata[]> {
  const groups: Record<ProjectCategoryId, ProjectMetadata[]> = { eda: [], ml: [] };
  for (const p of projects) groups[getProjectCategory(p.slug)].push(p);
  return groups;
}

// Static import so Vite bundles the image URLs
import tipsImg from '@/assets/projects/tips.jpg';
import netflixImg from '@/assets/projects/netflix.jpg';
import vgsalesImg from '@/assets/projects/vgsales.jpg';
import houseImg from '@/assets/projects/house.jpg';
import titanicImg from '@/assets/projects/titanic.jpg';

export const PROJECT_IMAGES: Record<string, string> = {
  tips: tipsImg,
  'netflix-eda': netflixImg,
  'video-game-sales-analysis': vgsalesImg,
  'house-prices': houseImg,
  titanic: titanicImg,
};
