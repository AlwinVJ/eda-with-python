import type { ProjectDetails } from './types';

// Source of truth: https://github.com/AlwinVJ/Mental-Health-Score
// (README.md, ML_Project.ipynb, main.py). Figures are exported from the notebook outputs.
const fig = (n: number) => `/projects/mental-health/fig${n}.png`;

export const mentalHealthSignal: ProjectDetails = {
  overview: {
    body: [
      'Mental Health Signal (repository: Mental Health Score Predictor) is a machine learning web application that estimates a student\'s mental health score on a 0–10 scale from lifestyle factors, digital usage patterns, academic habits and perceived stress.',
      'A scikit-learn Random Forest regression pipeline is exposed through a FastAPI REST API and presented in a responsive HTML, CSS and JavaScript interface with an animated score gauge.',
      'Disclaimer: the app gives an experimental, model-generated estimate. It is not a clinical assessment, diagnosis, or substitute for professional mental health support.',
    ],
  },
  problem: {
    body: [
      'Predict a student\'s Mental_Health_Score (a continuous value ranging from about 3 to 10 in the data) from social media habits, study time, sleep, physical activity and stress level.',
      'Because the target is a number rather than a category, this is treated as a regression problem.',
    ],
  },
  objectives: {
    bullets: [
      'Understand how usage, sleep and stress relate to the score',
      'Build a leakage-safe preprocessing + model pipeline',
      'Compare a linear baseline with Random Forest',
      'Serve predictions through a REST API',
      'Provide a simple web form for users',
    ],
  },
  dataset: {
    body: [
      'Source file: "Student Social Media And Mental Health Impact.csv" (included in the repository). 5,000 rows × 13 columns, with no missing values and 2 duplicate rows.',
      'Target: Mental_Health_Score. Numeric features: Age, Avg_Daily_Usage_Hours, Daily_Unlocks, Study_Hours, Physical_Activity_Hours, Sleep_Hours_Per_Night. Categorical features: Gender, Country (111 unique values), Academic_Level, Most_Used_Platform, Purpose_Of_Use, and Stress_Level (Low, Medium, High, Very High).',
      'Most common platforms: Instagram (1,130), TikTok (918), Facebook (719), LinkedIn (523), YouTube (491).',
    ],
  },
  eda: {
    steps: [
      'Checked shape, data types, missing values (none) and duplicates (2).',
      'Found an impossible minimum of -0.4 in Physical_Activity_Hours — a data-entry glitch.',
      'Plotted the target distribution, a correlation heatmap, stress vs score, usage vs score, sleep vs score, and platform counts.',
      'IQR outlier check: 2 outliers in Study_Hours and 22 in Physical_Activity_Hours; none elsewhere.',
      'Skewness: all numeric columns near symmetric; Study_Hours was the most skewed (0.44).',
    ],
    images: [
      { src: fig(1), caption: 'Distribution of Mental_Health_Score' },
      { src: fig(2), caption: 'Correlation heatmap of numeric features' },
      { src: fig(3), caption: 'Stress level vs mental health score' },
      { src: fig(4), caption: 'Average daily usage hours vs score' },
      { src: fig(5), caption: 'Sleep hours per night vs score' },
      { src: fig(6), caption: 'Most used platform (count)' },
    ],
  },
  preprocessing: {
    steps: [
      'Dropped the duplicate rows.',
      'Clipped negative Physical_Activity_Hours to 0 instead of dropping the row, keeping the student\'s other valid data.',
      '80/20 train-test split made before fitting any preprocessing, to prevent data leakage.',
      'ColumnTransformer: Study_Hours → log1p + StandardScaler; other numeric columns → StandardScaler.',
      'Stress_Level → OrdinalEncoder with explicit order Low < Medium < High < Very High.',
      'Gender, Academic_Level, Most_Used_Platform, Purpose_Of_Use, Grouped_country → OneHotEncoder.',
    ],
  },
  features: {
    body: [
      'Country grouping: Country had 111 unique values, so the top 10 countries were kept and the rest grouped as "Other" (11 categories). This avoids 110+ sparse one-hot columns while keeping the country signal.',
      'Stress_Level is ordinally encoded because the score falls step by step as stress rises (seen in EDA). No separate feature-selection algorithm was applied; all cleaned features are used.',
    ],
  },
  modeling: {
    steps: [
      'Baseline: Linear Regression inside the same preprocessing pipeline.',
      'Random Forest Regressor (default settings, random_state=42) to capture non-linear patterns.',
      'Tuning: RandomizedSearchCV (15 iterations, 5-fold CV, R² scoring) over n_estimators, max_depth, min_samples_split, min_samples_leaf. Best: 200 trees, max_depth 15, min_samples_split 5, min_samples_leaf 2.',
      'The full pipeline (preprocessing + default Random Forest) was saved with joblib as Mental_Health_Model.pkl.',
    ],
  },
  evaluation: {
    body: [
      'Test-set results from the notebook (1,000 held-out rows):',
      'Linear Regression — R² 0.740 · training R² 0.724 · MAE 0.536 · RMSE 0.676.',
      'Random Forest (default) — R² 0.878 · training R² 0.981 · MAE 0.347 · RMSE 0.464.',
      'Random Forest (tuned) — R² 0.865 · training R² 0.955 · MAE 0.369 · RMSE 0.487.',
      'R² is the share of variation in scores the model explains; MAE is the average error in score points; RMSE penalises large misses more. Since this is regression, classification metrics (confusion matrix, precision, recall, ROC-AUC) do not apply.',
    ],
  },
  results: {
    body: [
      'The default Random Forest was the strongest model, explaining about 88% of score variation with predictions off by roughly 0.35 points on average — a clear gain over the linear baseline.',
      'Tuning narrowed the train–test gap (0.981 → 0.955 training R²) but did not improve test scores. The large gap for the default model indicates some overfitting.',
      'Limitations: survey data, a correlational (not causal) model, and no feature-importance analysis documented in the notebook.',
    ],
  },
  deployment: {
    steps: [
      'FastAPI backend (main.py) loads the serialized pipeline and exposes a prediction endpoint plus a health check.',
      'Pydantic validates incoming requests; CORS middleware lets the frontend call the API; OpenAPI docs are generated automatically.',
      'Static frontend (HTML/CSS/JS) collects inputs, validates them, calls the API and shows the score on an animated SVG gauge with loading and error states.',
      'A Dockerfile is provided for containerised deployment. The app is deployed on Render — see the Live Demo button below.',
    ],
  },
  learnings: {
    bullets: [
      'Split before preprocessing',
      'ColumnTransformer + Pipeline',
      'Grouping high-cardinality categories',
      'Ordinal vs one-hot encoding',
      'Spotting overfitting via train/test R²',
      'Serving models with FastAPI',
      'Future: feature importance analysis',
      'Future: cross-validated model comparison',
      'Future: public live demo',
    ],
  },
};
