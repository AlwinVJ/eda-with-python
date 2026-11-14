/**
 * Registry: project slug -> detailed content.
 * To add a project detail page: create `<name>.ts` here, then add it below
 * using the slug from `src/data/projects.ts`. The `/projects/$slug` route
 * renders it automatically — no new page or route needed.
 */
import type { ProjectDetails } from "./types";
import { housePricePrediction } from "./housePricePrediction";
import { mentalHealthSignal } from "./mentalHealthSignal";
import { creditRiskAssessment } from "./creditRiskAssessment";

const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  "house-price-prediction": housePricePrediction,
  "mental-health-signal": mentalHealthSignal,
  "credit-risk-assessment": creditRiskAssessment,
};

export function getProjectDetails(slug: string): ProjectDetails | undefined {
  return PROJECT_DETAILS[slug];
}

export * from "./types";
