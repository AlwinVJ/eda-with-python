import type { ProjectDetails } from "./types";
import targetDistribution from "@/assets/projects/credit-risk/target-distribution.png.asset.json";
import correlation from "@/assets/projects/credit-risk/correlation.png.asset.json";
import confusionMatrices from "@/assets/projects/credit-risk/confusion-matrices.png.asset.json";
import precisionRecall from "@/assets/projects/credit-risk/precision-recall.png.asset.json";
import calibration from "@/assets/projects/credit-risk/calibration.png.asset.json";
import shapSummary from "@/assets/projects/credit-risk/shap-summary.png.asset.json";

// Source: AlwinVJ/Credit-Risk-Assessment, revision 4aaf9b4:
// README.md, credit_risk_assessment.ipynb, credit_risk_dataset.csv and main.py.
// Figures are original notebook outputs, not regenerated illustrations.
// Keep tuned uncalibrated test results separate from the deployed calibrated model.
export const creditRiskAssessment: ProjectDetails = {
  overview: {
    body: [
      "Credit Risk Assessment System is an end-to-end binary classification project that estimates loan-default probability from applicant, loan and credit-history information. Its live application is branded CredWise.",
      "The workflow covers data exploration, cleaning, preprocessing pipelines, logistic regression and XGBoost comparison, hyperparameter search, probability calibration, threshold analysis and model explanations. A FastAPI service exposes the saved model through an HTML, CSS and JavaScript dashboard.",
      "This is an educational decision-support system, not a certified lending engine. Its risk estimate is not a guaranteed outcome, a binding credit decision or a substitute for financial compliance and professional review.",
    ],
  },
  problem: {
    body: [
      "Predict loan_status: 0 represents non-default and 1 represents default. The task is to identify default risk, not to predict an observed loan-approval or rejection decision.",
      "Defaults are the minority class, so accuracy alone can conceal missed risky borrowers. Precision measures how often a default flag is correct; recall measures how many actual defaults are detected. Both matter when weighing unnecessary reviews against undetected defaults.",
    ],
  },
  objectives: {
    bullets: [
      "Explore credit-risk patterns and class imbalance",
      "Clean invalid applicant records",
      "Build reusable preprocessing pipelines",
      "Compare logistic regression and XGBoost",
      "Investigate probability calibration and decision thresholds",
      "Explain model behavior with SHAP",
      "Serve predictions through a validated web application",
    ],
  },
  dataset: {
    body: [
      "The repository includes credit_risk_dataset.csv: 32,581 records and 12 columns, comprising 11 predictors and the loan_status target. The original data contains 25,473 non-default records and 7,108 default records (approximately 21.82% defaults).",
      "Numeric predictors: person_age, person_income, person_emp_length, loan_amnt, loan_int_rate, loan_percent_income and cb_person_cred_hist_length. Categorical predictors: person_home_ownership, loan_intent, loan_grade and cb_person_default_on_file.",
      "Home ownership has RENT, MORTGAGE, OWN and OTHER categories; loan purpose includes personal, education, medical, venture, home improvement and debt consolidation; loan grades run from A to G; previous default is recorded as Y or N.",
      "Missing values: 895 employment-length entries and 3,116 interest-rate entries in the original data. Cleaning leaves 27,436 eligible records. The repository does not establish the original collector, upstream dataset URL, geography, collection period or explicit dataset license.",
      "The live form labels income and loan amount in rupees (₹). That interface label does not establish the training dataset’s currency or demonstrate validation for Indian lending conditions.",
    ],
  },
  eda: {
    steps: [
      "Inspect dataset shape, column types, descriptive statistics, missing values and duplicate records.",
      "Plot the original target distribution to make the minority default class visible.",
      "Explore numeric-feature correlations and relationships among income, loan burden, interest rate and credit history.",
      "Inspect implausible ages and employment lengths before defining row filters.",
      "Check loan-intent-specific interest-rate ranges; after row filtering, the recorded check reports no unrealistic rates, 2,631 missing rates and no unknown intents.",
    ],
    images: [
      {
        src: targetDistribution.url,
        caption:
          "Default and non-default counts in the original 32,581-row dataset, before cleaning.",
      },
      {
        src: correlation.url,
        caption: "Original notebook correlation heatmap for numeric credit-risk features.",
      },
    ],
  },
  preprocessing: {
    steps: [
      "Remove 165 duplicate records, reducing the data to 32,416 rows.",
      "Keep ages from 18 to 100 inclusive, employment length strictly greater than zero and less than age, and positive loan amounts. These filters leave 27,436 records; they also remove missing employment lengths and applicants with zero employment years.",
      "Normalize loan-intent strings and inspect interest-rate validity.",
      "Use an 80/20 stratified split with random_state=42: 21,948 training rows and 5,488 test rows. The test set contains 4,355 non-defaults and 1,133 defaults.",
      "Fit numeric median imputation within model pipelines. Apply StandardScaler for logistic regression, but not for XGBoost.",
      'Impute categorical missing values with the constant “Missing” and apply OneHotEncoder(handle_unknown="ignore") inside a ColumnTransformer.',
    ],
  },
  features: {
    body: [
      "The models use the 11 supplied predictors. One-hot encoding represents categories such as loan purpose, grade and home ownership; the loan-to-income ratio is already a dataset feature rather than a newly created notebook feature.",
      "The web interface automatically calculates loan amount divided by annual income and allows a manual override. The backend expects the ratio as an explicit input alongside the other applicant fields.",
      "SHAP analysis in the notebook explains the original uncalibrated XGBoost research model. Income, loan-to-income ratio and interest rate rank highly in its global summary, with home ownership and loan-purpose indicators also contributing. These are model associations, not causal findings.",
    ],
    images: [
      {
        src: shapSummary.url,
        caption:
          "Global SHAP summary for the original uncalibrated XGBoost model—not the saved calibrated model. Contributions are model-output values, not calibrated probability-point changes.",
      },
    ],
  },
  modeling: {
    steps: [
      "Train a balanced-class logistic regression baseline with imputation, scaling and categorical encoding.",
      "Compare logistic regression and a weighted XGBoost configuration using shuffled five-fold StratifiedKFold cross-validation on training data, with seed 42.",
      "Fit a separate XGBoost pipeline and tune it with RandomizedSearchCV: 150 candidates × five folds (750 fits), optimizing average precision. This separately initialized model does not inherit the earlier cross-validation model’s class weighting.",
      "Recorded best configuration: 359 estimators, maximum depth 8, learning rate 0.0996679, minimum child weight 5, subsample 0.941005, column sample 0.810481 and gamma 0.874522. The best cross-validation average precision is printed as 0.89.",
      "Wrap the tuned estimator in CalibratedClassifierCV with sigmoid calibration (Platt scaling) and five-fold calibration, then save the calibrated pipeline with Joblib as credit_risk_model.pkl.",
      "Save a separate decision threshold as best_threshold.pkl. The notebook derives this threshold from the original uncalibrated model; it does not establish that this cutoff is optimal for the saved calibrated estimator.",
    ],
  },
  evaluation: {
    body: [
      "Held-out test results on 5,488 records, as recorded in the notebook’s model comparison:",
      "Logistic regression — accuracy 0.8123 · default precision 0.5318 · default recall 0.7608 · F1 0.6260 · average precision 0.7058.",
      "Tuned, uncalibrated XGBoost — accuracy 0.9357 · default precision 0.9733 · default recall 0.7079 · F1 0.8196 · average precision 0.9016. Average precision is the implementation’s metric; the notebook table labels it “PR-AUC.”",
      "Mean training cross-validation ROC-AUC: logistic regression 0.8656; the separately configured weighted XGBoost model 0.9350. These values are not the final calibrated model’s test ROC-AUC.",
      "At the tuned uncalibrated model’s evaluated decision rule, the notebook reports 22 false positives and 331 false negatives: roughly 29.2% of actual defaults were missed despite high precision.",
      "A separate experiment maximizes F1 on the test set for the original uncalibrated XGBoost model, selecting a cutoff of approximately 0.4328 and reporting best F1 0.8238. Because test labels were used to choose the cutoff, this is not an independent generalization estimate.",
      "The saved calibrated model uses that separately selected cutoff. No final calibrated-model metric table, Brier score, log loss or external-validation results are reported. The scores above must not be presented as verified performance of the deployed app.",
    ],
    images: [
      {
        src: confusionMatrices.url,
        caption:
          "Held-out confusion matrices comparing logistic regression and tuned, uncalibrated XGBoost.",
      },
      {
        src: precisionRecall.url,
        caption: "Precision–recall comparison from the notebook’s held-out model evaluation.",
      },
      {
        src: calibration.url,
        caption:
          "Notebook probability-calibration comparison: original uncalibrated XGBoost versus calibrated tuned XGBoost. The underlying model also changes, so this is not a calibration-only comparison.",
      },
    ],
  },
  results: {
    body: [
      "Tuned uncalibrated XGBoost improves test average precision from 0.7058 to 0.9016 and F1 from 0.6260 to 0.8196 relative to logistic regression. It flags defaults much more precisely, but has lower default recall at the evaluated decision rule (0.7079 versus 0.7608).",
      "The project demonstrates why a high accuracy headline is insufficient in credit risk: model selection, calibration and decision thresholds answer different questions, and missed defaults remain consequential.",
      "The SHAP summary highlights income, loan burden and interest rate as important signals for the explained research model. The live dashboard serves probabilities and risk labels; it does not generate these SHAP explanations per request.",
      "Limitations include undocumented upstream data provenance, restrictive employment filtering, test-set threshold selection, a threshold/model mismatch, no reported independent calibrated-model evaluation, and no established subgroup fairness audit, temporal validation or deployment drift monitoring.",
    ],
  },
  deployment: {
    steps: [
      "FastAPI loads credit_risk_model.pkl and best_threshold.pkl once during startup using paths relative to the application file.",
      "Pydantic validates all 11 inputs, including numeric bounds and allowed categories, and rejects unexpected fields. The prediction handler builds a one-row DataFrame in the expected feature order.",
      "POST /predict returns default probability, the binary prediction, the stored threshold and a High Risk or Low Risk message. The API flags high risk when probability is greater than or equal to the threshold.",
      "GET /health reports artifact readiness; GET /api/info provides model metadata; the service exposes generated API documentation. The supplied live service responds successfully and reports a CalibratedClassifierCV model.",
      "The static HTML, CSS and JavaScript dashboard collects loan details, calculates loan-to-income ratio and presents the result with a probability gauge and risk spectrum, including loading, validation and error states.",
      "The app is hosted on Render at the supplied Live Demo link. The repository includes a Render service configuration and a Python 3.12-slim Dockerfile with a non-root user and health check.",
    ],
  },
  learnings: {
    bullets: [
      "Stratified evaluation for imbalanced classification",
      "Pipeline-based imputation and encoding",
      "Average precision versus accuracy",
      "Precision–recall trade-offs",
      "Probability calibration versus classification thresholds",
      "SHAP interpretation and its model scope",
      "Validated model serving with FastAPI",
      "Future: tune calibrated-model thresholds on a validation set",
      "Future: untouched test and external validation",
      "Future: fairness, provenance and drift audits",
    ],
  },
};
