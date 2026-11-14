/**
 * Detailed, long-form content for a project detail page.
 * Short metadata (title, tags, links, image…) lives in `src/data/projects.ts`.
 */
export type ProjectSectionId =
  | "overview"
  | "problem"
  | "objectives"
  | "dataset"
  | "eda"
  | "preprocessing"
  | "features"
  | "modeling"
  | "evaluation"
  | "results"
  | "deployment"
  | "learnings";

export interface ProjectSection {
  /** Paragraphs of prose. */
  body?: string[];
  /** Bullet list items. */
  bullets?: string[];
  /** Ordered steps. */
  steps?: string[];
  /** Figures (real project outputs) with captions. */
  images?: { src: string; caption: string }[];
  /** Marks content as an editable placeholder (rendered with a "to be added" note). */
  placeholder?: boolean;
}

export type ProjectDetails = Partial<Record<ProjectSectionId, ProjectSection>>;

/** Canonical display order + headings. Sections without content are skipped. */
export const PROJECT_SECTION_ORDER: { id: ProjectSectionId; title: string }[] = [
  { id: "overview", title: "Project Overview" },
  { id: "problem", title: "Problem Statement" },
  { id: "objectives", title: "Project Objectives" },
  { id: "dataset", title: "Dataset Description" },
  { id: "eda", title: "Exploratory Data Analysis" },
  { id: "preprocessing", title: "Data Preprocessing" },
  { id: "features", title: "Feature Engineering" },
  { id: "modeling", title: "Model Development" },
  { id: "evaluation", title: "Model Evaluation" },
  { id: "results", title: "Results and Insights" },
  { id: "deployment", title: "Deployment" },
  { id: "learnings", title: "Key Learnings" },
];
