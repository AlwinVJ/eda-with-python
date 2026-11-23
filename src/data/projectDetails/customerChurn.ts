import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/Customer_churn_prediction.git
// Figures are real outputs exported from notebook execution and pipeline assets.
const images = import.meta.glob<{ default: string }>("../../assets/projects/customer-churn/*.png", {
  eager: true,
});

const fig = (name: string) =>
  images[`../../assets/projects/customer-churn/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/customer-churn/${name}`;

export const customerChurn: ProjectDetails = {
  overview: {
    body: [
      "Customer Churn Prediction is an end-to-end machine learning classification project designed to identify telecommunications customers who are at high risk of cancelling their service or switching to a competitor.",
      "In subscription-based industries such as telecommunications, SaaS, and digital services, customer retention is a critical driver of profitability. Industry research consistently shows that acquiring a new customer costs 5 to 7 times more than retaining an existing one. Furthermore, churn directly erodes recurring monthly revenue and decreases overall Customer Lifetime Value (CLV).",
      "Analyzing 7,043 customer accounts from a major telecommunications provider, this project establishes a disciplined, leak-free data science workflow: from exploratory analysis of behavioral churn drivers and rigorous missing value imputation, through automated ColumnTransformer preprocessing, benchmarking multiple classification algorithms using 5-fold Stratified cross-validation, and optimizing class weights with GridSearchCV, to production deployment via an interactive Streamlit web dashboard.",
      "Project Status: Completed. The end-to-end model pipeline is serialized to Joblib and deployed live on Streamlit at https://customer-churn--prediction-model.streamlit.app/.",
    ],
  },
  problem: {
    body: [
      "Customer churn is among the most costly operational challenges in subscription businesses. Proactively identifying churn candidates introduces several machine learning and business complexities:",
    ],
    bullets: [
      "Target Class Imbalance: In the observed dataset, approximately 73.46% of customers stayed while 26.54% churned. A naive majority-class model achieves ~73.5% accuracy simply by predicting that no customer ever leaves, but fails to identify a single churner (0% recall).",
      "Business Cost Asymmetry: In customer retention, a False Negative (failing to identify a customer who actually churns) is far more detrimental than a False Positive (proactively reaching out to a customer who might have stayed). The modeling strategy must explicitly prioritize recall over raw accuracy.",
      "Heterogeneous Feature Types: Customer records span demographics, contract terms, payment methods, service options (16 categorical features), and billing numbers (3 numerical features), requiring specialized preprocessing without data leakage.",
      "New Customer Data Quirks: Eleven customer accounts in the dataset had blank TotalCharges fields. Inspecting these revealed that all 11 had zero months of tenure (brand-new accounts), requiring domain-specific numerical handling rather than naive row deletion.",
    ],
  },
  objectives: {
    body: [
      "The primary objective of this project is to build, evaluate, and deploy a robust binary classification system capable of estimating churn probability and identifying high-risk customers prior to contract cancellation.",
    ],
    bullets: [
      "Perform exploratory data analysis to identify significant behavioral, demographic, and contractual drivers of churn",
      "Address data quality anomalies, converting blank TotalCharges fields to numerical values and removing arbitrary identifier columns",
      "Implement a leak-free Scikit-Learn ColumnTransformer pipeline encapsulating imputation, StandardScaler, and OneHotEncoder",
      "Benchmark multiple classification algorithms: DummyClassifier baseline, Logistic Regression, K-Nearest Neighbors (KNN), Decision Tree, and Support Vector Machine (SVM)",
      "Conduct 5-fold Stratified Cross-Validation evaluating Accuracy, Precision, Recall, F1-Score, and ROC-AUC",
      "Fine-tune hyperparameters and address class imbalance using GridSearchCV with balanced class weighting",
      "Evaluate final model generalization on an untouched 20% stratified test set (1,409 customer accounts)",
      "Export the complete preprocessor and tuned model into a standalone Joblib pipeline artifact",
      "Deploy an interactive, user-friendly Streamlit web application providing real-time churn predictions and probability estimates",
    ],
  },
  dataset: {
    body: [
      "The project analyzes the Telco Customer Churn dataset comprising 7,043 customer records across 21 columns.",
      "Target Variable: Churn (Binary: 'Yes' / 'No', mapped to 1 / 0). Out of 7,043 customers, 5,174 stayed (73.46%) and 1,869 churned (26.54%).",
      "Features are grouped into three operational dimensions:",
    ],
    bullets: [
      "Demographics: gender, SeniorCitizen, Partner, Dependents",
      "Service Subscriptions: PhoneService, MultipleLines, InternetService (DSL, Fiber optic, No), OnlineSecurity, OnlineBackup, DeviceProtection, TechSupport, StreamingTV, StreamingMovies",
      "Account & Billing: tenure (months with company), Contract (Month-to-month, One year, Two year), PaperlessBilling, PaymentMethod (Electronic check, Mailed check, Bank transfer, Credit card), MonthlyCharges, TotalCharges",
    ],
    images: [
      {
        src: fig("churn-target-distribution.png"),
        caption:
          "Target Variable Distribution: 73.46% (5,174 customers) stayed vs. 26.54% (1,869 customers) churned, demonstrating the class imbalance in the raw dataset.",
      },
    ],
  },
  workflow: {
    steps: [
      "Data Ingestion & Type Coercion: Load the raw dataset, inspect feature datatypes, and convert TotalCharges from object string to numeric.",
      "Data Quality Auditing: Detect 11 blank TotalCharges strings, associate them with tenure = 0 (new signups), and impute them with 0.0.",
      "Exploratory Data Analysis: Perform univariate and bivariate distributions across tenure, monthly charges, contract types, and service categories.",
      "Stratified Train-Test Split: Partition the 7,043 records into 80% training (5,634 rows) and 20% test (1,409 rows) sets using stratified sampling to preserve the 26.54% churn ratio.",
      "Pipeline Preprocessing: Construct a Scikit-Learn ColumnTransformer using median imputation and StandardScaler for numericals, plus most-frequent imputation and OneHotEncoder for categoricals.",
      "Algorithm Benchmarking: Train and evaluate DummyClassifier, Logistic Regression, KNN, Decision Tree, and SVM using 5-fold StratifiedKFold cross-validation.",
      "Hyperparameter Optimization: Perform GridSearchCV on candidate models, tuning regularization C and setting class_weight='balanced' to prioritize churn recall.",
      "Holdout Evaluation: Score the final model on 1,409 unseen test records using classification reports, confusion matrices, and ROC-AUC curves.",
      "Production Deployment: Build and launch an interactive Streamlit web dashboard allowing customer risk evaluation with dynamic probability gauges.",
    ],
  },
  preprocessing: {
    body: [
      "To prevent data leakage, all preprocessing transformations were fitted strictly on the training set and subsequently applied to test and production inputs.",
    ],
    bullets: [
      "Target Encoding: Mapped 'No' to 0 (Customer stayed) and 'Yes' to 1 (Customer churned).",
      "Feature Exclusion: Excluded customerID from model features as it represents an arbitrary alphanumeric identifier.",
      "Handling TotalCharges Blank Values: Eleven records had whitespace strings in TotalCharges. All 11 records had tenure = 0 months, meaning these were new customers who had not yet been billed. These were coerced to 0.0.",
      "Numerical Pipeline: SimpleImputer(strategy='median') followed by StandardScaler() applied to tenure, MonthlyCharges, and TotalCharges.",
      "Categorical Pipeline: SimpleImputer(strategy='most_frequent') followed by OneHotEncoder(handle_unknown='ignore') applied to 16 categorical features.",
      "ColumnTransformer Assembly: Combines numerical and categorical pipelines into a unified preprocessor yielding 46 processed input dimensions.",
    ],
  },
  eda: {
    body: [
      "Exploratory data analysis revealed several critical patterns distinguishing churners from loyal customers:",
    ],
    subsections: [
      {
        title: "1. Customer Tenure Distribution",
        body: [
          "Tenure is one of the strongest predictive indicators in the dataset. Customers who churned had a median tenure of only 10.0 months (mean: 18.00 months, std: 19.53), compared to a median tenure of 38.0 months (mean: 37.57 months, std: 24.11) for customers who remained.",
          "This indicates that the risk of churn is heavily concentrated during the first year of the customer relationship.",
        ],
        images: [
          {
            src: fig("tenure-by-churn.png"),
            caption:
              "Tenure Box Plot by Churn Status: Churned customers show a heavily right-skewed tenure distribution with a median of 10 months, while retained customers have a median of 38 months.",
          },
        ],
      },
      {
        title: "2. Monthly Charges Distribution",
        body: [
          "Customers who churned had noticeably higher median monthly charges compared to customers who stayed. While retained customers were distributed broadly across lower fee tiers (including basic phone-only plans), churners clustered in the higher fee brackets ($70 - $100/month).",
        ],
        images: [
          {
            src: fig("monthly-charges-by-churn.png"),
            caption:
              "Monthly Charges by Churn Status: Customers who churned display a higher median monthly recurring charge than those who stayed.",
          },
        ],
      },
      {
        title: "3. Contract Duration Association",
        body: [
          "Contract type demonstrates an overwhelming association with customer retention:",
          "• Month-to-month contracts: 42.71% churn rate (1,655 churned out of 3,875 accounts).",
          "• One-year contracts: 11.27% churn rate (166 churned out of 1,473 accounts).",
          "• Two-year contracts: 2.83% churn rate (48 churned out of 1,695 accounts).",
          "Customers committing to longer contract durations exhibit substantially higher retention, highlighting long-term agreements as a primary retention lever.",
        ],
        images: [
          {
            src: fig("contract-type-by-churn.png"),
            caption:
              "Contract Type vs. Churn Rate: Churn drops from 42.71% for month-to-month contracts to 11.27% for one-year contracts and 2.83% for two-year contracts.",
          },
        ],
      },
    ],
  },
  modeling: {
    body: [
      "Four classification algorithms were benchmarked alongside a DummyClassifier baseline using 5-fold Stratified Cross-Validation on the training data (5,634 samples):",
    ],
    bullets: [
      "DummyClassifier (Baseline): Accuracy: 73.46%, Precision: 0.00%, Recall: 0.00%, F1-Score: 0.0000. (Predicts the majority class 'Stayed' every time).",
      "Logistic Regression: Accuracy: 80.19%, Precision: 65.21%, Recall: 54.38%, F1-Score: 0.5924, ROC-AUC: 0.8461 (F1 Std: 0.0298).",
      "Support Vector Machine (SVM): Accuracy: 80.48%, Precision: 68.11%, Recall: 49.83%, F1-Score: 0.5753, ROC-AUC: 0.7988 (F1 Std: 0.0136).",
      "K-Nearest Neighbors (KNN): Accuracy: 76.57%, Precision: 56.17%, Recall: 53.24%, F1-Score: 0.5466, ROC-AUC: 0.7821 (F1 Std: 0.0132).",
      "Decision Tree: Accuracy: 73.02%, Precision: 49.19%, Recall: 49.23%, F1-Score: 0.4919, ROC-AUC: 0.6558 (F1 Std: 0.0232).",
    ],
    images: [
      {
        src: fig("model-comparison-f1.png"),
        caption:
          "Cross-Validated F1-Score Comparison: Logistic Regression achieved the highest baseline F1-score (0.5924) across 5 folds, followed by SVM (0.5753).",
      },
      {
        src: fig("model-comparison-recall.png"),
        caption:
          "Cross-Validated Recall Comparison: Logistic Regression achieved the highest baseline churn recall (54.38%), vital for identifying at-risk customers.",
      },
    ],
    subsections: [
      {
        title: "Hyperparameter Optimization via GridSearchCV",
        body: [
          "Because Logistic Regression achieved the top F1-score and highest ROC-AUC in cross-validation, it was selected for hyperparameter tuning using GridSearchCV with 5-fold StratifiedKFold:",
          "• Parameter Grid: classifier__C: [0.01, 0.1, 1, 10, 100], classifier__class_weight: [None, 'balanced'].",
          "• Best Parameters: {'classifier__C': 0.1, 'classifier__class_weight': 'balanced'}.",
          "• Result: The cross-validated F1-score increased from 0.5924 to 0.6288, with class weighting dramatically boosting the model's sensitivity to churners.",
        ],
      },
    ],
  },
  evaluation: {
    body: [
      "The final tuned Logistic Regression pipeline was evaluated on the untouched holdout test set of 1,409 customer records (1,035 Stayed, 374 Churned).",
    ],
    bullets: [
      "Test Accuracy: 74.17% (0.7417)",
      "Test Precision (Churn): 50.87% (0.5087)",
      "Test Recall (Churn): 78.61% (0.7861) — accurately detects nearly 8 out of every 10 churning customers!",
      "Test F1-Score (Churn): 61.76% (0.6176)",
      "Test ROC-AUC: 84.08% (0.8408)",
      "Macro Average F1: 71.13% (0.7113)",
      "Weighted Average F1: 75.52% (0.7552)",
    ],
    images: [
      {
        src: fig("optimal-confusion-matrix.png"),
        caption:
          "Test Set Confusion Matrix: True Negatives (Stayed) = 751, False Positives = 284, False Negatives = 80, True Positives (Churned) = 294. Out of 374 actual churners, 294 (78.6%) were correctly flagged.",
      },
    ],
  },
  results: {
    body: [
      "The machine learning investigation established three fundamental empirical insights regarding customer churn:",
    ],
    bullets: [
      "Tenure as a Vulnerability Window: Customers are most vulnerable to churn during their first 12 months with the provider. As customer tenure exceeds 24 months, churn rates decline significantly.",
      "Contract Type Dominance: Month-to-month contracts account for over 88% of all churn events. Customers with one- or two-year commitments have churn rates below 12% and 3%, respectively.",
      "Value of Add-On Services: Customers subscribed to security and support services (Online Security, Tech Support, Online Backup) churned at less than half the rate of customers without these services, indicating that service integration builds customer stickiness.",
    ],
  },
  recommendations: {
    body: [
      "Based on the analytical findings and model predictions, the following data-driven business retention strategies are recommended:",
    ],
    bullets: [
      "First-Year Onboarding Interventions: Establish automated engagement triggers (e.g. satisfaction surveys, usage guides, concierge onboarding) during the first 3 to 6 months of a customer's tenure.",
      "Contract Migration Campaigns: Offer targeted incentives (e.g. discounted monthly rates, free streaming service add-ons) to convert month-to-month subscribers into 1-year or 2-year contracts.",
      "Promote High-Stickiness Add-ons: Bundle complimentary Online Security or Tech Support for customers subscribing to high-speed Fiber Optic plans, addressing the elevated churn observed in high-bill accounts.",
      "Threshold-Driven Proactive Outreach: Use the model's predicted probability to route high-risk customers (>65% churn likelihood) to a dedicated retention team with pre-authorized loyalty credits.",
    ],
  },
  deployment: {
    body: [
      "The trained customer churn model is deployed as an interactive web application on Streamlit Community Cloud:",
      "🌐 Live Demo: https://customer-churn--prediction-model.streamlit.app/",
      "📁 GitHub Repository: https://github.com/AlwinVJ/Customer_churn_prediction.git",
    ],
    bullets: [
      "Interactive Inputs: Allows business analysts to configure customer demographics, service choices, contract terms, tenure, and monthly charges.",
      "Real-Time Inference: Feeds form inputs into the joblib pipeline (customer_churn_pipeline.joblib), producing immediate binary classifications ('Customer may stay' vs. 'Customer may churn').",
      "Confidence Probability: Displays calibrated churn probability percentage alongside a visual progress bar indicating risk level.",
      "Lightweight Stack: Built purely with Python, Streamlit, Scikit-Learn, Pandas, and Joblib for maximum reproducibility and zero-maintenance cloud hosting.",
    ],
  },
  learnings: {
    body: ["Key takeaways from developing the Customer Churn Prediction project:"],
    bullets: [
      "Accuracy is Misleading on Imbalanced Data: A naive model predicting zero churn achieves 73.5% accuracy but zero business utility. Evaluating F1-Score, Recall, and ROC-AUC is mandatory for retention modeling.",
      "Class Weight Tuning is Critical: Utilizing class_weight='balanced' in Logistic Regression elevated churn recall from 54.38% to 78.61%, enabling the business to catch 294 out of 374 churners in the holdout set.",
      "Leak-Free Pipelines Protect Integrity: Encapsulating imputation, scaling, and one-hot encoding within Scikit-Learn's ColumnTransformer eliminates subtle data leakage and guarantees that production inputs are transformed identically to training data.",
    ],
  },
};
