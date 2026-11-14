export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Status = 'planned' | 'in-progress' | 'completed';

export interface BaseMetadata {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  status: Status;
  tags: string[];
  lastUpdated: string;
  githubPath: string;
}

export interface ProjectMetadata extends BaseMetadata {
  type: 'project';
  dataset: string;
  librariesUsed: string[];
  skillsLearned: string[];
  businessProblem: string;
  workflow: string[];
  results?: string;
  lessonsLearned?: string;
  preview?: string;
  visualizations?: string[];
  files: { readme?: string; notebook?: string; report?: string };
  relatedHandbooks?: string[];
  relatedCheatsheets?: string[];
  estimatedTime?: string;
  liveDemoUrl?: string;
  /** Full repository URL (overrides githubPath-based link when set). */
  githubRepoUrl?: string;
  /** Display order (lower first). Falls back to title order. */
  order?: number;
  /** Old slugs that should redirect to this project. */
  legacySlugs?: string[];
}

export interface HandbookMetadata extends BaseMetadata {
  type: 'handbook';
  version: string;
  pages: number;
  cover?: string;
  file: string;
  topics: string[];
  order?: number;
}

export interface CheatsheetMetadata extends BaseMetadata {
  type: 'cheatsheet';
  version: string;
  library: string;
  topicsCovered: string[];
  image: string;
}

export interface DatasetMetadata extends BaseMetadata {
  type: 'dataset';
  source: string;
  sourceUrl?: string;
  rows: number;
  columns: number;
  features: { name: string; type: string; description?: string }[];
  usedInProjects: string[];
  downloadFile: string;
}

export type ResourceCategory =
  | 'books' | 'documentation' | 'videos' | 'courses' | 'research-papers' | 'official-links';

export interface ResourceMetadata extends BaseMetadata {
  type: 'resource';
  category: ResourceCategory;
  officialUrl: string;
  author?: string;
}

export type LearningGuideTargetType = 'handbook' | 'project' | 'cheatsheet' | 'dataset';

export interface LearningGuideAction {
  verb: string;
  label: string;
  targetType?: LearningGuideTargetType;
  targetSlug?: string;
}

export interface LearningGuideStep {
  id: string;
  order: number;
  title: string;
  summary: string;
  actions: LearningGuideAction[];
}

export interface LearningGuideStepResolved extends Omit<LearningGuideStep, 'actions'> {
  actions: (LearningGuideAction & { href?: string })[];
}
