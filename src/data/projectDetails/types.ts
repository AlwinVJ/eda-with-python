/**
 * Detailed, long-form content for a project detail page.
 * Short metadata (title, tags, links, image…) lives in `src/data/projects.ts`.
 */
export type ProjectSectionId =
  | "overview"
  | "problem"
  | "objectives"
  | "dataset"
  | "workflow"
  | "preprocessing"
  | "features"
  | "researchQuestions"
  | "eda"
  | "statisticalAnalysis"
  | "modeling"
  | "evaluation"
  | "results"
  | "recommendations"
  | "deployment"
  | "learnings"
  | "enhancements";

export interface ProjectImage {
  src: string;
  caption: string;
  className?: string;
  containerClassName?: string;
}

export interface ProjectSubsection {
  title: string;
  body?: string[];
  bullets?: string[];
  steps?: string[];
  images?: ProjectImage[];
}

export interface ProjectSection {
  /** Paragraphs of prose. */
  body?: string[];
  /** Bullet list items. */
  bullets?: string[];
  /** Ordered steps. */
  steps?: string[];
  /** Figures (real project outputs) with captions. */
  images?: ProjectImage[];
  /** Structured subsections. */
  subsections?: ProjectSubsection[];
  /** Marks content as an editable placeholder (rendered with a "to be added" note). */
  placeholder?: boolean;
}

export type ProjectDetails = Partial<Record<ProjectSectionId, ProjectSection>>;

/** Canonical display order + headings. Sections without content are skipped. */
export const PROJECT_SECTION_ORDER: { id: ProjectSectionId; title: string }[] = [
  { id: "overview", title: "Project Overview" },
  { id: "problem", title: "Business Problem & Objectives" },
  { id: "objectives", title: "Project Objectives" },
  { id: "dataset", title: "Dataset Understanding" },
  { id: "workflow", title: "Project Workflow" },
  { id: "preprocessing", title: "Data Preparation & Cleaning" },
  { id: "features", title: "Feature Engineering" },
  { id: "researchQuestions", title: "Research Questions" },
  { id: "eda", title: "Exploratory Data Analysis" },
  { id: "statisticalAnalysis", title: "Statistical Analysis & Validation" },
  { id: "modeling", title: "Model Development" },
  { id: "evaluation", title: "Model Evaluation" },
  { id: "results", title: "Key Findings & Insights" },
  { id: "recommendations", title: "Business Recommendations" },
  { id: "deployment", title: "Deployment" },
  { id: "learnings", title: "Key Learnings" },
  { id: "enhancements", title: "Key Learnings & Future Enhancements" },
];
