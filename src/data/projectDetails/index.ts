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
import { discountVsProfit } from "./discountVsProfit";
import { netflixEda } from "./netflixEda";
import { amazonConveyor } from "./amazonConveyor";
import { titanicDetails } from "./titanic";
import { nycAirbnb } from "./nycAirbnb";
import { customerChurn } from "./customerChurn";

const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  "amazon-conveyor-eda": amazonConveyor,
  "house-price-prediction": housePricePrediction,
  "mental-health-signal": mentalHealthSignal,
  "credit-risk-assessment": creditRiskAssessment,
  "nyc-airbnb-room-type-predictor": nycAirbnb,
  "customer-churn-prediction": customerChurn,
  "discount-vs-profit": discountVsProfit,
  "netflix-eda": netflixEda,
  titanic: titanicDetails,
};

export function getProjectDetails(slug: string): ProjectDetails | undefined {
  return PROJECT_DETAILS[slug];
}

export * from "./types";
