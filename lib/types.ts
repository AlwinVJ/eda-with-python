// ============================================================================
// METADATA SCHEMA
// Single source of truth for the shape of every content type.
// The website reads ONLY these metadata.json files — it never stores
// educational content itself. Every field maps to something the repo
// already has (a folder, a PDF, a notebook, a dataset).
// ============================================================================

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Status = 'planned' | 'in-progress' | 'completed';

export interface BaseMetadata {
  slug: string;                // folder name, used as the URL segment
  title: string;
  description: string;
  difficulty: Difficulty;
  status: Status;
  tags: string[];
  lastUpdated: string;         // ISO date, set manually on edit
  githubPath: string;          // path within the repo, e.g. "projects/titanic"
}

export interface ProjectMetadata extends BaseMetadata {
  type: 'project';
  dataset: string;             // slug referencing a DatasetMetadata
  librariesUsed: string[];
  skillsLearned: string[];
  businessProblem: string;
  workflow: string[];          // ordered high-level steps
  results?: string;
  lessonsLearned?: string;
  preview?: string;            // relative path to assets/preview.png
  visualizations?: string[];   // relative paths to chart/plot images produced by the project
  files: {
    readme?: string;
    notebook?: string;         // relative path -> notebook.ipynb
    report?: string;           // relative path -> report.pdf
  };
  relatedHandbooks?: string[]; // slugs
  relatedCheatsheets?: string[]; // slugs
  estimatedTime?: string;      // e.g. "3-4 hours"
  liveDemoUrl?: string;        // optional — omit the Live Demo button entirely if not set
}

export interface HandbookMetadata extends BaseMetadata {
  type: 'handbook';
  version: string;
  pages: number;
  cover?: string;
  file: string;                // relative path -> handbook.pdf
  topics: string[];
  order?: number;               // controls position within the Handbooks list (intro handbooks first)
}

export interface CheatsheetMetadata extends BaseMetadata {
  type: 'cheatsheet';
  version: string;
  library: string;             // e.g. "pandas", "numpy", "matplotlib"
  topicsCovered: string[];
  image: string;                // relative path -> preview.png/.jpg/.webp — the cheatsheet itself
}

export interface DatasetMetadata extends BaseMetadata {
  type: 'dataset';
  source: string;              // e.g. "Kaggle", "UCI ML Repository"
  sourceUrl?: string;
  rows: number;
  columns: number;
  features: { name: string; type: string; description?: string }[];
  usedInProjects: string[];    // project slugs
  downloadFile: string;        // relative path -> data.csv
}

export type ResourceCategory =
  | 'books'
  | 'documentation'
  | 'videos'
  | 'courses'
  | 'research-papers'
  | 'official-links';

export interface ResourceMetadata extends BaseMetadata {
  type: 'resource';
  category: ResourceCategory;
  officialUrl: string;
  author?: string;
}

// ----------------------------------------------------------------------------
// LEARNING GUIDE
// This replaces the old generic "technology stack roadmap". It is an
// onboarding sequence that teaches a visitor how to move through the
// platform: which handbook to read, then which project to apply it in.
// Each action optionally resolves to a real page via targetType + targetSlug
// (resolved at build time in lib/content.ts) so links never go stale.
// ----------------------------------------------------------------------------
export type LearningGuideTargetType = 'handbook' | 'project' | 'cheatsheet' | 'dataset';

export interface LearningGuideAction {
  verb: string;                 // "Read" | "Study" | "Complete" | "Continue" | "Practice" | "Perform"
  label: string;                // display text, e.g. "NumPy Essentials"
  targetType?: LearningGuideTargetType;
  targetSlug?: string;          // resolved to an href at build time; omit for non-linked actions
}

export interface LearningGuideStep {
  id: string;
  order: number;
  title: string;                // e.g. "Step 1"
  summary: string;              // short line under the step title
  actions: LearningGuideAction[];
}

// Build-time resolved version — every action gains an `href` once its
// targetType/targetSlug is cross-referenced against real content.
export interface LearningGuideStepResolved extends Omit<LearningGuideStep, 'actions'> {
  actions: (LearningGuideAction & { href?: string })[];
}

export type AnyMetadata =
  | ProjectMetadata
  | HandbookMetadata
  | CheatsheetMetadata
  | DatasetMetadata
  | ResourceMetadata;
