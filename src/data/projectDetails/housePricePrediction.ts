import type { ProjectDetails } from './types';

// Content derived from the existing House Price Prediction metadata.
export const housePricePrediction: ProjectDetails = {
  overview: {
    body: [
      'End-to-end machine learning project on the Ames Housing dataset — from data cleaning and feature engineering through regularized regression and gradient boosting models to predict final home sale prices.',
    ],
  },
  problem: {
    body: [
      'Predict the final sale price of residential homes in Ames, Iowa from 79 explanatory variables describing (almost) every aspect of the property.',
    ],
  },
  eda: { steps: ['Explore the SalePrice target distribution and log-transform for skew'] },
  preprocessing: {
    steps: [
      'Impute missing values across numeric and categorical features',
      'Handle high-cardinality categorical features with target encoding',
    ],
  },
  features: {
    steps: [
      'Engineer features (total square footage, age, remodel age, quality scores)',
      'Select features via correlation and mutual information',
    ],
  },
  modeling: { steps: ['Train Ridge, Lasso, and XGBoost models with cross-validation'] },
  evaluation: { steps: ['Evaluate with RMSE on log-transformed SalePrice'] },
  learnings: {
    bullets: [
      'Correlation-based feature selection',
      'Target encoding',
      'Regularized regression',
      'Gradient boosting',
      'Model evaluation with RMSE',
    ],
  },
};
