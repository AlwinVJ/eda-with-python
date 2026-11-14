import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/Credit-Risk-Assessment
// Figures are real outputs exported from notebook execution and static assets.
const images = import.meta.glob<{ default: string }>("../../assets/projects/credit-risk/*.png", {
  eager: true,
});

const fig = (name: string) =>
  images[`../../assets/projects/credit-risk/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/credit-risk/${name}`;

export const creditRiskAssessment: ProjectDetails = {
  overview: {
    body: [
      "Credit Risk Assessment System (deployed as CredWise) is an end-to-end, production-ready machine learning underwriting assistance platform. The system evaluates loan applicant default risk by analyzing demographic indicators, annual earnings, debt-to-income ratios, interest rates, and credit bureau repayment histories.",
      "In commercial and retail banking, credit risk assessment is the foundational discipline of determining whether a prospective borrower is likely to fulfill their debt obligations or default. Evaluating default risk before loan origination protects financial institutions against catastrophic capital write-offs, ensures regulatory capital adequacy, and enables objective, data-driven lending decisions.",
      "The motivation behind this project is to address the limitations of traditional credit scoring: rigid rule-based scorecards often fail to capture non-linear feature interactions, penalize non-traditional borrowers, or lack statistical calibration. CredWise combines an optimized, calibrated XGBoost classification pipeline with game-theoretic SHAP explainability, served through an enterprise-grade FastAPI REST service and an interactive financial underwriting dashboard.",
      "Responsible Use Disclaimer: This application is an educational decision-support tool. It outputs statistical default risk estimates to augment human credit analysis. It is not an autonomous credit approval engine, a legally binding lending decision, or a substitute for institutional underwriting audits, regulatory compliance, and fair-lending reviews.",
    ],
  },
  problem: {
    body: [
      "Financial institutions must evaluate the probability of loan default prior to extending credit. Inaccurate risk assessment introduces severe dual penalties:",
    ],
    bullets: [
      "False Negatives (Missed Defaults): Approving high-risk borrowers who subsequently default leads to direct capital loss, recovery expenses, and increased loan-loss reserves.",
      "False Positives (Lost Opportunities): Mistakenly classifying creditworthy borrowers as high risk leads to customer churn, forgone interest income, and competitive disadvantage.",
      "Class Imbalance Obstacle: Historical defaults represent a minority of loan applications (~22% in the dataset). Naive models can report deceivingly high accuracy while failing to detect actual defaults.",
      "Calibration & Interpretability Deficits: Uncalibrated ensemble models output skewed confidence scores that cannot be interpreted as true default probabilities, while black-box predictions violate adverse action regulatory requirements.",
    ],
  },
  objectives: {
    bullets: [
      "Perform thorough exploratory data analysis and data validation across 32,581 historical loan applicant records",
      "Construct leakage-safe Scikit-Learn ColumnTransformer preprocessing pipelines handling missing values and one-hot encodings",
      "Mitigate severe class imbalance using empirical scale_pos_weight class weighting (3.84) during ensemble training",
      "Benchmark a balanced Logistic Regression baseline against an advanced XGBoost classifier using 5-fold Stratified Cross-Validation",
      "Perform hyperparameter optimization via RandomizedSearchCV across 150 candidate configurations (750 fits) targeting Average Precision (PR-AUC)",
      "Calibrate predicted default probabilities using Platt Scaling (CalibratedClassifierCV) to ensure posterior alignment",
      "Optimize the classification decision threshold to approximately 0.4328 to maximize minority-class F1 performance",
      "Provide global and local model interpretability using TreeSHAP to uncover key risk drivers",
      "Develop a production FastAPI microservice with strict Pydantic v2 validation and structured monitoring endpoints",
      "Create an interactive, responsive underwriting dashboard (CredWise) with dynamic loan-to-income calculation and risk spectrum gauges",
      "Containerize the application with Docker and deploy to Render with automated test coverage across 8 unit test suites",
    ],
  },
  dataset: {
    body: [
      "The project analyzes credit_risk_dataset.csv, comprising 32,581 records across 12 attributes (11 predictor features and 1 binary target). Each record represents an individual loan application with financial, personal, and credit bureau indicators.",
      "The prediction target is loan_status, a binary classification indicator where 0 denotes Non-Default (25,473 records, 78.18%) and 1 denotes Default (7,108 records, 21.82%).",
    ],
    subsections: [
      {
        title: "11 Model Input Features Dictionary",
        body: [
          "The model consumes 11 verified input features spanning personal demographics, requested loan terms, and historical credit bureau records:",
        ],
        steps: [
          "person_age (int64): Applicant age in years. Raw range: 20 to 144 years (filtered to valid range 18–100 years during preprocessing).",
          "person_income (float64): Annual gross earnings in currency units. Raw range: $4,000 to $6,000,000 with right-skewed distribution.",
          "person_home_ownership (object / categorical): Residential status with 4 categories: RENT (16,446), MORTGAGE (13,444), OWN (2,584), and OTHER (107).",
          "person_emp_length (float64): Total continuous employment duration in years (895 missing values; range: 0 to 123 years raw).",
          "loan_intent (object / categorical): Purpose of requested financing across 6 categories: EDUCATION (6,453), MEDICAL (6,071), VENTURE (5,719), PERSONAL (5,521), DEBTCONSOLIDATION (5,212), and HOMEIMPROVEMENT (3,605).",
          "loan_grade (object / categorical): Assigned credit quality tier from A (lowest risk) to G (highest risk): A (10,777), B (10,451), C (6,458), D (3,626), E (964), F (241), and G (64).",
          "loan_amnt (float64): Total requested loan principal amount. Raw range: $500 to $35,000.",
          "loan_int_rate (float64): Annual percentage interest rate (3,116 missing values; raw range: 5.42% to 23.22%).",
          "loan_percent_income (float64): Loan-to-income ratio (loan_amnt / person_income). Expresses debt burden relative to applicant earnings (raw range: 0.00 to 0.83).",
          "cb_person_default_on_file (object / categorical): Historical credit bureau default indicator with 2 categories: N (No prior default recorded, 26,836) and Y (Prior default recorded, 5,745).",
          "cb_person_cred_hist_length (int64): Number of years the applicant has maintained an active credit bureau profile (raw range: 2 to 30 years).",
        ],
      },
    ],
  },
  workflow: {
    body: [
      "The end-to-end credit risk assessment system connects client-side underwriting input to calibrated cloud inference through an 11-step architectural pipeline:",
    ],
    steps: [
      "Applicant Input: Credit officer enters demographic and loan parameters into the CredWise underwriting dashboard.",
      "Dynamic Loan-to-Income Calculation: Client-side JavaScript calculates loan_percent_income (loan_amnt / person_income) with manual override support.",
      "FastAPI POST Request: Frontend dispatches an asynchronous HTTP POST payload to the /predict API endpoint.",
      "Pydantic v2 Schema Validation: Request is validated against LoanApplication schema (bounds checking, type coercion, extra='forbid').",
      "Pandas DataFrame Construction: Validated dictionary is mapped into a single-row DataFrame ordered by EXPECTED_FEATURES.",
      "Scikit-Learn ColumnTransformer Pipeline: Numeric features undergo median imputation; categorical features undergo one-hot encoding.",
      "Calibrated XGBoost Inference: Tuned tree ensemble outputs Platt-scaled sigmoid calibrated posterior default probabilities.",
      "Optimized Threshold Comparison: Predicted probability is compared against the pre-computed optimal threshold (0.4328).",
      "Risk Classification Assignment: Loan flagged as 'High Risk' (if probability >= 0.4328) or 'Low Risk' (if probability < 0.4328).",
      "Structured API Response: Endpoint returns default_probability, default_prediction, threshold, and Result label.",
      "Dashboard Rendering: CredWise interface visualizes the result with an animated SVG gauge, risk spectrum indicator, and metric summary.",
    ],
  },
  eda: {
    body: [
      "Exploratory Data Analysis diagnosed dataset distributions, identified data entry anomalies, evaluated class imbalance, and explored multi-feature correlations.",
    ],
    images: [
      {
        src: fig("target-distribution.png"),
        caption:
          "Target Class Imbalance: Default status distribution in the original dataset showing 25,473 non-defaults (78.18%) vs 7,108 defaults (21.82%).",
      },
      {
        src: fig("correlation-heatmap.png"),
        caption:
          "Numerical Feature Correlation Heatmap: loan_percent_income (r = +0.38) and loan_int_rate (r = +0.34) show the strongest positive correlations with loan default.",
      },
    ],
    subsections: [
      {
        title: "1. Missing Value and Data Integrity Analysis",
        body: ["Data audit identified missingness concentrated in two numerical variables:"],
        bullets: [
          "person_emp_length: 895 missing entries (2.75% of dataset).",
          "loan_int_rate: 3,116 missing entries (9.56% of dataset).",
          "Duplicate check: 165 duplicate records identified (df.duplicated().sum() == 165).",
          "Anomalous values: 5 records with person_age > 100 years (including impossible age 144), and 2 records with person_emp_length > 60 years (including an impossible 123-year tenure for a 22-year-old applicant!).",
        ],
      },
      {
        title: "2. Multivariate Correlation Dynamics",
        body: ["Pearson correlation analysis on numerical features revealed primary risk signals:"],
        bullets: [
          "loan_percent_income vs loan_status (r = +0.38): The single strongest predictor of default; borrowers committing a high fraction of their earnings to debt service default at substantially higher rates.",
          "loan_int_rate vs loan_status (r = +0.34): High interest rates reflect underlying credit risk and simultaneously increase repayment burden.",
          "person_income vs loan_status (r = -0.14): Modest negative correlation; higher earnings provide a buffer against financial distress.",
          "person_age vs cb_person_cred_hist_length (r = +0.86): Strong collinear relationship reflecting natural accumulation of credit history tenure with age.",
        ],
      },
    ],
  },
  preprocessing: {
    body: [
      "Data preprocessing establishes a clean, leakage-safe pipeline converting raw records into numerical arrays for model ingestion.",
    ],
    steps: [
      "Deduplication: Removed 165 duplicate rows, reducing the dataset from 32,581 to 32,416 rows.",
      "Outlier & Validity Filtering: Filtered applicant age to 18 <= person_age <= 100, employment length to 0 < person_emp_length < person_age, and loan_amnt > 0. These filters pruned corrupt data entries and left 27,436 eligible records.",
      "Stratified Train-Test Split: 80/20 train-test split with random_state=42 and stratify=y. Training set: 21,948 rows (17,417 non-defaults, 4,531 defaults); Test set: 5,488 rows (4,355 non-defaults, 1,133 defaults).",
      "Leakage Prevention: Preprocessing transformers were strictly fitted on the training split (X_train) and applied to the test split (X_test).",
      "Numeric Pipeline: SimpleImputer(strategy='median') for handling missing interest rates and employment durations. (StandardScaler applied for Logistic Regression; tree models ingested unscaled values).",
      "Categorical Pipeline: SimpleImputer(strategy='constant', fill_value='Missing') followed by OneHotEncoder(handle_unknown='ignore') for robust handling of categorical variables.",
      "ColumnTransformer Integration: Bundled numerical and categorical sub-pipelines into unified preprocessor objects (preprocessor_lr and preprocessor_xg).",
    ],
  },
  features: {
    body: [
      "Credit risk data exhibits substantial class imbalance. Handling this imbalance during model training is essential to prevent models from defaulting to trivial majority-class predictions.",
    ],
    subsections: [
      {
        title: "1. Class Imbalance Mitigation & scale_pos_weight",
        body: [
          "In the training dataset (21,948 samples), only 4,531 applicants defaulted (20.64%) while 17,417 repaid (79.36%). A naive model predicting 'No Default' for every applicant achieves 79.4% accuracy while detecting 0% of actual defaults — an unacceptable outcome for credit underwriting.",
          "To force XGBoost to penalize false negatives (missed defaults), the scale_pos_weight hyperparameter was computed directly from the training fold class distribution:",
        ],
        steps: [
          "Majority Class (Non-Defaults in X_train): 17,417",
          "Minority Class (Defaults in X_train): 4,531",
          "Empirical Scale Weight: scale_pos_weight = 17,417 / 4,531 = 3.84",
          "In XGBoost's loss function, each positive instance (default) is weighted 3.84x relative to negative instances during gradient computation.",
        ],
      },
      {
        title: "2. Metric Selection: Average Precision over Accuracy",
        body: [
          "Because accuracy is insensitive to minority-class performance in imbalanced regimes, model evaluation and cross-validation optimization prioritized Average Precision (PR-AUC) and minority-class Recall. Average Precision summarizes the trade-off between precision and recall across all classification thresholds without distortion from true negative volume.",
        ],
      },
    ],
  },
  modeling: {
    body: [
      "The modeling workflow benchmarked an interpretable linear baseline against gradient boosted decision trees, followed by hyperparameter tuning.",
    ],
    steps: [
      "Baseline Model: L2-regularized Logistic Regression (balanced class weights, standard scaling, median imputation, one-hot encoding). Evaluated as a linear benchmark.",
      "Primary Candidate: XGBoost Classifier (incorporating scale_pos_weight=3.84 and ColumnTransformer without scaling).",
      "5-Fold Stratified Cross-Validation: Evaluated using StratifiedKFold(n_splits=5, shuffle=True, random_state=42) on training data.",
      "Cross-Validation Results: Logistic Regression achieved mean CV ROC-AUC of 0.8656; weighted XGBoost achieved mean CV ROC-AUC of 0.9350.",
      "Algorithmic Conclusion: XGBoost captured complex non-linear debt tipping points and multi-feature credit bureau interactions that linear boundaries failed to separate.",
    ],
  },
  statisticalAnalysis: {
    body: [
      "Model optimization encompasses systematic hyperparameter exploration via RandomizedSearchCV and classification decision threshold tuning.",
    ],
    images: [
      {
        src: fig("threshold-optimization.png"),
        caption:
          "Precision-Recall vs Threshold Optimization: Evaluates the trade-off across thresholds, identifying the optimal F1 threshold at approximately 0.4328.",
      },
      {
        src: fig("optimal-confusion-matrix.png"),
        caption:
          "Confusion Matrix at Optimal Threshold (0.4328): Yields 95% default precision, 73% default recall, and an overall F1-score of 0.82 on the test set.",
      },
    ],
    subsections: [
      {
        title: "1. Hyperparameter Optimization via RandomizedSearchCV",
        body: [
          "XGBoost was tuned using RandomizedSearchCV with 150 candidate combinations evaluated across 5 stratified folds (750 total model fits), optimizing for average_precision:",
        ],
        bullets: [
          "n_estimators: randint(150, 600) — optimal: 359",
          "max_depth: randint(3, 9) — optimal: 8",
          "learning_rate: uniform(0.01, 0.5) — optimal: 0.09967 (~0.10)",
          "min_child_weight: randint(1, 10) — optimal: 5",
          "subsample: uniform(0.6, 0.4) — optimal: 0.9410",
          "colsample_bytree: uniform(0.6, 0.4) — optimal: 0.8105",
          "gamma: uniform(0, 5) — optimal: 0.8745",
          "Best Cross-Validation Score: Average Precision = 0.89",
        ],
      },
      {
        title: "2. Decision Threshold Optimization (Cutoff = 0.4328)",
        body: [
          "The default classification threshold of 0.50 assumes symmetric misclassification costs. In credit underwriting, the cost of an undetected default far outweighs the operational cost of an additional credit review.",
          "By scanning predicted probabilities across the test set precision-recall curve, the threshold that maximizes the positive-class F1-score was identified at exactly 0.4328 (stored in best_threshold.pkl):",
        ],
        steps: [
          "Default Threshold (0.50): High precision (0.9733) but lower recall (0.7079), missing 331 defaults.",
          "Optimized Threshold (0.4328): Precision = 0.95, Recall = 0.73, F1-Score = 0.8238, Accuracy = 0.94.",
          "Decision Rule: An applicant is classified as 'High Risk' if calibrated default probability >= 0.4328, reducing missed defaults while maintaining a 95% precision rate.",
        ],
      },
    ],
  },
  evaluation: {
    body: [
      "Model evaluation benchmarks test set discrimination across multiple performance metrics and evaluates probability calibration.",
    ],
    images: [
      {
        src: fig("confusion-matrices.png"),
        caption:
          "Held-out Confusion Matrices: Logistic Regression (left) vs Tuned XGBoost (right) on 5,488 test records.",
      },
      {
        src: fig("precision-recall.png"),
        caption:
          "Precision-Recall Comparison: Tuned XGBoost achieves Average Precision of 0.9016 (PR-AUC) compared to 0.7058 for Logistic Regression.",
      },
      {
        src: fig("calibration.png"),
        caption:
          "Probability Calibration Curve: Platt Scaling (CalibratedClassifierCV) aligns predicted probabilities with the ideal 45-degree calibration line.",
      },
    ],
    subsections: [
      {
        title: "1. Model Performance Benchmark on Held-Out Test Set (5,488 Records)",
        body: [
          "Comparing Logistic Regression against Tuned XGBoost on the unseen 5,488-record test set (4,355 non-defaults, 1,133 defaults):",
        ],
        bullets: [
          "Logistic Regression: Accuracy = 0.8123 · Precision = 0.5318 · Recall = 0.7608 · F1-Score = 0.6260 · Average Precision = 0.7058.",
          "Tuned XGBoost: Accuracy = 0.9357 · Precision = 0.9733 · Recall = 0.7079 · F1-Score = 0.8196 · Average Precision = 0.9016.",
          "Mean CV ROC-AUC: Logistic Regression = 0.8656 vs Weighted XGBoost = 0.9350.",
          "Tuned XGBoost improves Average Precision by +19.58 percentage points and F1-score by +19.36 percentage points over the baseline.",
        ],
      },
      {
        title: "2. Probability Calibration via Platt Scaling (CalibratedClassifierCV)",
        body: [
          "Tree-based models output decision probabilities based on leaf sample fractions that often cluster near 0 and 1, distorting the empirical risk distribution. In credit risk, a predicted score of 0.30 must correspond to an actual 30% default rate among similar applicants.",
          "Platt Scaling was implemented using CalibratedClassifierCV(best_model, method='sigmoid', cv=5). This fits a logistic regression mapping over the cross-validated ensemble scores, pulling uncalibrated probabilities back toward the empirical diagonal calibration line (saved as credit_risk_model.pkl).",
        ],
      },
    ],
  },
  results: {
    body: [
      "Explainability is mandatory in credit risk to fulfill regulatory compliance (adverse action reporting) and establish underwriting trust. TreeSHAP was executed on the test set to explain global feature rankings and individual application predictions.",
    ],
    images: [
      {
        src: fig("shap-summary.png"),
        caption:
          "Global SHAP Summary Plot: loan_percent_income, person_income, loan_int_rate, and loan_grade dominate credit risk predictions.",
      },
      {
        src: fig("shap-waterfall-high-risk.png"),
        caption:
          "Local SHAP Explanation (High Risk): Applicant prediction shifted from base E[f(X)] = -1.58 upward to -1.509 by high loan-to-income and loan grade.",
      },
      {
        src: fig("shap-waterfall-low-risk.png"),
        caption:
          "Local SHAP Explanation (Low Risk): Applicant prediction shifted downward from -1.58 to -3.019 by strong annual income and minimal debt burden.",
      },
    ],
    subsections: [
      {
        title: "1. Global Feature Attribution",
        body: [
          "The SHAP summary plot ranks features by mean absolute SHAP value across all test applicants:",
        ],
        bullets: [
          "loan_percent_income (Rank 1): High values (red points) push SHAP values strongly positive (increasing default risk). Low values push risk negative.",
          "person_income (Rank 2): High income acts as the strongest protective feature, driving SHAP values negative.",
          "loan_int_rate (Rank 3): Elevated interest rates increase monthly debt service burden, contributing to positive risk attribution.",
          "loan_grade (Rank 4): Subprime grades (D, E, F) shift risk upward.",
          "person_home_ownership (Rank 5): RENT status increases default risk relative to MORTGAGE or OWN.",
          "person_emp_length (Rank 6): Longer employment tenure provides steady protective stability.",
        ],
      },
      {
        title: "2. Local Decision Analysis (Waterfall Case Studies)",
        body: [
          "Waterfall plots illustrate how individual feature values alter the base expected log-odds E[f(X)] = -1.58:",
        ],
        bullets: [
          "High-Risk Applicant Case Study: Base score (-1.58) was pushed upward by high loan-to-income ratio (+0.82) and low annual income, resulting in final model output f(x) = -1.509 (classified High Risk).",
          "Low-Risk Applicant Case Study: Base score (-1.58) was driven sharply downward by substantial annual income ($85,000) and modest loan percent income (0.12), achieving f(x) = -3.019 (classified Low Risk).",
        ],
      },
    ],
  },
  deployment: {
    body: [
      "The system is deployed as an asynchronous FastAPI application serving both REST API endpoints and the interactive CredWise underwriting dashboard.",
    ],
    images: [
      {
        src: fig("credwise-dashboard.png"),
        caption:
          "CredWise Underwriting Dashboard: Interactive applicant input interface with live ratio calculation, test presets, and risk spectrum gauge.",
      },
    ],
    subsections: [
      {
        title: "1. FastAPI REST Microservice Architecture",
        body: ["The backend (main.py) provides three operational endpoints:"],
        steps: [
          "GET /health: Operational monitoring endpoint. Validates that credit_risk_model.pkl and best_threshold.pkl are loaded in memory. Returns HTTP 200 with model readiness or 503 if uninitialized.",
          "GET /api/info: Metadata endpoint exposing service name, model architecture (Calibrated XGBoost Classifier), feature count (11), decision threshold (0.4328), and feature names.",
          "POST /predict: Primary inference endpoint. Ingests LoanApplication payload, executes ColumnTransformer preprocessing, computes calibrated default probability, compares against 0.4328, and returns Risk classification.",
        ],
      },
      {
        title: "2. Input Validation Schema & Sample Payloads",
        body: [
          "Requests are strictly validated using Pydantic v2 with ConfigDict(extra='forbid'):",
        ],
        bullets: [
          "Sample High Risk Request: { person_age: 23, person_income: 22000, person_home_ownership: 'RENT', person_emp_length: 1.0, loan_intent: 'DEBTCONSOLIDATION', loan_grade: 'E', loan_amnt: 15000, loan_int_rate: 18.5, loan_percent_income: 0.68, cb_person_default_on_file: 'Y', cb_person_cred_hist_length: 2 }",
          "Sample Response: { 'default_probability': 0.8421, 'default_prediction': 1, 'threshold': 0.4328, 'Result': 'High Risk' }",
          "Sample Low Risk Request: { person_age: 30, person_income: 65000, person_home_ownership: 'RENT', person_emp_length: 6.0, loan_intent: 'EDUCATION', loan_grade: 'B', loan_amnt: 8000, loan_int_rate: 9.5, loan_percent_income: 0.12, cb_person_default_on_file: 'N', cb_person_cred_hist_length: 6 }",
          "Sample Response: { 'default_probability': 0.1145, 'default_prediction': 0, 'threshold': 0.4328, 'Result': 'Low Risk' }",
        ],
      },
      {
        title: "3. CredWise Frontend Dashboard",
        body: [
          "The client application (static/index.html, static/style.css, static/script.js) provides a modern financial interface:",
        ],
        bullets: [
          "Dynamic Ratio Calculation: Automatically computes Loan-to-Income percentage on input change while supporting manual overrides.",
          "Preset Applicant Profiles: Instant buttons to test Prime (Low Risk), Subprime (High Risk), and Borderline applicant configurations.",
          "Animated Probability Gauge: SVG semi-circle gauge rendering calibrated default probability percentage with dynamic color transitions.",
          "Risk Spectrum Indicator: Visual gradient positioning the applicant relative to the 43.28% decision threshold.",
          "Zero-Flash Theme Toggle: System and user-selectable Light and Dark theme modes with local storage persistence.",
        ],
      },
      {
        title: "4. Docker Containerization & Automated Test Suite",
        body: [
          "The application includes containerization and comprehensive automated test coverage:",
        ],
        steps: [
          "Dockerfile: Python 3.12 slim bookworm base, OpenMP (libgomp1) for XGBoost, unprivileged non-root appuser, built-in HEALTHCHECK probe.",
          "Cloud Hosting (Render): Configured via render.yaml utilizing dynamic $PORT injection and /health endpoint polling.",
          "Test Suite (test_app.py): 8 automated pytest tests verifying health check, metadata info, low-risk prediction, high-risk prediction, underage rejection (age < 18 returns 422), invalid categorical value rejection (returns 422), extra forbidden field rejection (returns 422), and static frontend delivery (returns 200).",
        ],
      },
    ],
  },
  recommendations: {
    body: [
      "Deploying machine learning models in credit underwriting requires rigorous adherence to ethical, legal, and operational governance.",
    ],
    bullets: [
      "Statistical Aid vs Autonomous Decision Engine: CredWise outputs risk probabilities designed to assist human credit officers; it must not be used as an autonomous loan rejection engine.",
      "Macroeconomic Distribution Shift: Model parameters reflect historical conditions. Economic shocks, inflation spikes, or interest rate increases can shift default distributions, necessitating regular drift monitoring and model retraining.",
      "Regulatory Compliance (FCRA / ECOA): Under the Equal Credit Opportunity Act and Fair Credit Reporting Act, adverse credit decisions require adverse action notices detailing specific reasons. SHAP local explanations can assist in identifying top negative factors.",
      "Secondary Review for Borderline Applicants: Applications with default probabilities within ±5% of the 0.4328 threshold should be automatically escalated for manual underwriter review.",
    ],
  },
  learnings: {
    body: [
      "The Credit Risk Assessment System demonstrates end-to-end machine learning engineering from exploratory diagnostics through calibrated serving.",
    ],
    bullets: [
      "Class Imbalance Governance: Applying empirical scale_pos_weight (3.84) and optimizing for Average Precision ensures robust minority-class detection.",
      "Probability Calibration is Essential: Platt Scaling (CalibratedClassifierCV) is necessary when raw ensemble probabilities must be interpreted as actual default risks.",
      "Threshold Tuning vs Calibration: Threshold tuning optimizes decision boundaries for specific asymmetric business costs; calibration ensures score validity across the entire distribution.",
      "Explainability Bridges the Trust Gap: SHAP values provide transparent feature attribution, transforming complex tree ensembles into auditable decision support tools.",
      "Future Enhancements: Validate optimal decision thresholds on a dedicated validation split, conduct protected-class fairness audits (disparate impact testing), and implement automated population stability index (PSI) monitoring.",
    ],
  },
};
