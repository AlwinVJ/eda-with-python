/**
 * ============================================================================
 *  CENTRAL PROJECT DATA — single source of truth for every project on the site
 * ============================================================================
 *
 *  Everything about projects (Home "Featured Projects", the Projects page,
 *  category sections, project cards, badges) is generated from this file.
 *
 *  --------------------------------------------------------------------------
 *  HOW TO ADD A NEW PROJECT
 *  --------------------------------------------------------------------------
 *  1. Drop a cover image into `src/assets/projects/<name>.jpg` and add an
 *     `import` for it at the top of this file.
 *  2. Append a new object to the `PROJECTS` array below.
 *  3. Set `category: 'eda'` OR `category: 'ml'` — this decides the section it
 *     appears under and its badge label.
 *  4. Set `featured: true` if you want it on the Home page.
 *  5. Fill in the standard project metadata (title, description, workflow…).
 *  6. (Optional) For a rich detail page, create
 *     `src/data/projectDetails/<name>.ts` and register it in
 *     `src/data/projectDetails/index.ts`. Without it, the detail page falls
 *     back to the standard sections built from this metadata.
 *
 *  The Projects page, category badges, and Featured Projects list
 *  will update automatically. No component code needs to change.
 *
 *  --------------------------------------------------------------------------
 *  FIELD REFERENCE
 *  --------------------------------------------------------------------------
 *    category      'eda' | 'ml'        — controls grouping + badge label
 *    featured      boolean             — show on the Home page
 *    image         imported asset URL  — cover image on the card
 *    githubPath    repo-relative path  — used to build the "GitHub" link
 *    liveDemoUrl   optional string     — adds a "Live Demo" button on the card
 * ============================================================================
 */

import type { ProjectMetadata } from "@/lib/types";

import discountVsProfitImg from "@/assets/projects/discount-vs-profit.jpg";
import netflixImg from "@/assets/projects/netflix.jpg";
import amazonConveyorImg from "@/assets/projects/amazon-conveyor.jpg";
import vgsalesImg from "@/assets/projects/vgsales.jpg";
import houseImg from "@/assets/projects/house.jpg";
import titanicImg from "@/assets/projects/titanic.jpg";
import mentalHealthImg from "@/assets/projects/mental-health.jpg";
import creditRiskImg from "@/assets/projects/credit-risk.jpg";
import nycAirbnbImg from "@/assets/projects/nyc-airbnb.jpg";

export type ProjectCategoryId = "eda" | "ml";

export interface ProjectCategory {
  id: ProjectCategoryId;
  title: string;
  /** Anchor id used for section navigation and deep linking. */
  anchor: string;
  /** Short label used on project cards (e.g. "EDA Project"). */
  badge: string;
  description: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "eda",
    title: "EDA Projects",
    anchor: "eda",
    badge: "EDA Project",
    description:
      "Exploratory data analysis on real datasets — cleaning, visualization, and insight.",
  },
  {
    id: "ml",
    title: "End-to-End Machine Learning Projects",
    anchor: "ml",
    badge: "End-to-End ML",
    description:
      "Full ML workflows — from raw data through feature engineering to a trained, evaluated model.",
  },
];

export interface Project extends ProjectMetadata {
  category: ProjectCategoryId;
  featured?: boolean;
  image?: string;
}

/**
 * Add new projects here. Order within the array doesn't matter — the site
 * sorts by `order`, then alphabetically, inside each category.
 */
export const PROJECTS: Project[] = [
  {
    type: "project",
    category: "eda",
    featured: true,
    image: discountVsProfitImg,
    slug: "discount-vs-profit",
    title: "Retail Discount Strategy Analysis",
    description:
      "An extensive exploratory data analysis investigating how retail discount strategies influence profitability, identifying loss-making discount thresholds, and deriving statistically validated pricing recommendations.",
    difficulty: "advanced",
    status: "completed",
    tags: ["eda", "retail", "pricing-strategy", "statistical-analysis", "hypothesis-testing"],
    lastUpdated: "2026-07-20",
    githubPath: "projects/discount-vs-profit",
    githubRepoUrl: "https://github.com/AlwinVJ/discount_vs_profit_extensive_EDA",
    dataset: "superstore-dataset",
    librariesUsed: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "SciPy",
      "Jupyter Notebook",
    ],
    skillsLearned: [
      "Advanced EDA",
      "Feature engineering",
      "Statistical hypothesis testing",
      "One-Way ANOVA",
      "Independent t-tests",
      "Correlation analysis",
      "Threshold optimization",
      "Pricing policy formulation",
    ],
    businessProblem:
      "How do discount levels affect retail profitability, and what pricing strategy maximizes sustainable profit?",
    workflow: [
      "Raw dataset ingestion and quality assessment",
      "Data cleaning and uninformative column pruning",
      "Business feature engineering and metric derivation",
      "U.S. Federal Holiday calendar enrichment",
      "Univariate and categorical distribution analysis",
      "Bivariate discount vs profitability modeling",
      "Identification of the 20% loss-making discount cliff",
      "Statistical validation using ANOVA, t-tests, and correlation",
      "Executive pricing guardrails and discount governance",
    ],
    results:
      "Discount is the primary driver of profit margin erosion (r = -0.86). Transactions with discounts up to 20% remain profitable, but discounts above 20% produce consistent net losses across all customer segments and regions.",
    lessonsLearned:
      "Revenue volume can create an illusion of business health ('profitless prosperity'). Calibrating discount thresholds using statistical validation protects unit margins and prevents structural losses.",
    files: {
      readme: "README.md",
      report:
        "https://github.com/AlwinVJ/discount_vs_profit_extensive_EDA/blob/d123874b4f4123686d37ec3647861cc2aee7fc4b/reports/EDA%20final%20report.pdf",
    },
    estimatedTime: "15-20 hours (Comprehensive EDA & Statistical Study)",
    order: 1,
  },
  {
    type: "project",
    category: "eda",
    featured: true,
    image: netflixImg,
    slug: "netflix-eda",
    title: "Netflix Movies and TV Shows EDA",
    description:
      "Comprehensive exploratory data analysis of the Netflix catalog — cleaning, country and genre analysis, ratings, release trends, and duration patterns.",
    difficulty: "intermediate",
    status: "completed",
    tags: ["eda", "streaming", "visualization"],
    lastUpdated: "2026-07-12",
    githubPath: "projects/netflix-eda",
    githubRepoUrl: "https://github.com/AlwinVJ/netflix_EDA",
    dataset: "netflix-dataset",
    librariesUsed: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    skillsLearned: [
      "Data cleaning",
      "Missing values",
      "Duplicate removal",
      "Feature engineering",
      "Country analysis",
      "Genre analysis",
      "Ratings analysis",
      "Release trend analysis",
      "Duration analysis",
      "Correlation analysis",
    ],
    businessProblem:
      "Explore what the Netflix catalog reveals about content strategy — which countries, genres, and ratings dominate, and how the catalog has shifted over time.",
    workflow: [
      "Clean the dataset and remove duplicate entries",
      "Handle missing values across cast, country, and rating fields",
      "Engineer features to separate movies from TV show durations",
      "Analyze content by country and genre",
      "Analyze ratings and release-year trends",
      "Explore correlations across catalog attributes",
      "Visualize findings and summarize business insights",
    ],
    results:
      "US-produced titles and the Drama/Comedy genres dominate the catalog; content additions accelerated sharply in the years leading up to the dataset's cutoff.",
    lessonsLearned:
      "The `country` and `cast` fields required careful multi-value parsing before any group-level analysis was reliable.",
    files: {
      readme: "README.md",
      notebook: "notebooks/03_Univariate_EDA.ipynb",
      report: "https://github.com/AlwinVJ/netflix_EDA/blob/main/reports/Final_EDA_Report.docx",
    },
    relatedHandbooks: ["pandas-developer-handbook", "matplotlib-developer-handbook"],
    estimatedTime: "5-6 hours",
    order: 2,
  },
  {
    type: "project",
    category: "eda",
    featured: true,
    image: amazonConveyorImg,
    order: 3,
    slug: "amazon-conveyor-eda",
    title: "Amazon Conveyor EDA",
    description:
      "Exploratory data analysis and root cause investigation of 9,686 SCADA alarm logs from Amazon's Pick to Rebin (P2R) conveyor system, identifying primary downtime drivers, bottleneck locations, and flow-balancing solutions.",
    difficulty: "intermediate",
    status: "completed",
    tags: ["eda", "logistics", "scada", "root-cause-analysis", "pareto-analysis"],
    lastUpdated: "2026-07-29",
    githubPath: "",
    githubRepoUrl: "https://github.com/AlwinVJ/amazon_conveyor_EDA",
    dataset: "",
    librariesUsed: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "SciPy",
      "Jupyter Notebook",
    ],
    skillsLearned: [
      "SCADA telemetry analysis",
      "Pareto analysis",
      "Spatial bottleneck mapping",
      "Ishikawa (Fishbone) diagramming",
      "5 Whys root cause analysis",
      "Flow balancing strategy",
    ],
    businessProblem:
      "Identify the primary causes of conveyor alarms and downtime within Amazon's Pick to Rebin (P2R) system across warehouse floors P2, P3, and P4 to reduce jams and protect shipping SLAs.",
    workflow: [
      "SCADA telemetry ingestion and schema validation across floors P2, P3, and P4",
      "Timestamp parsing and alarm duration standardization (minutes and hours)",
      "Alarm categorization into Congestion Indicators, Critical Faults, and Operational Events",
      "Univariate and Pareto frequency distribution modeling",
      "Spatial mapping to conveyor lines (2400, 2600, 2800) and photo-eye sensors",
      "Floor-wise comparative analysis of alarm volume versus cumulative downtime",
      "Root cause evaluation using Ishikawa (Fishbone) diagram and 5 Whys drill-down",
      "Actionable engineering recommendations for dynamic routing and preventive maintenance",
    ],
    results:
      "Congestion indicators account for 95.0% of all alarms, while Jam PEC 71 represents 88.05% of critical faults. P3 generates the most alarms (3,710), but P2 experiences the highest downtime (57.66 hours), dominated by a 66-hour cracked belt failure.",
    lessonsLearned:
      "Alarm frequency does not equal operational severity; a single catastrophic belt crack caused 45% of total downtime. Integrating SCADA logs with spatial conveyor mapping pinpointed localized bottlenecks at PEC 71 on the 2600 line.",
    files: {
      readme: "README.md",
      notebook: "notebooks/04_exploratory_data_analysis.ipynb",
      report:
        "https://github.com/AlwinVJ/amazon_conveyor_EDA/blob/main/reports/eda_report/Conveyor_Alarm_EDA_Report.pdf",
    },
    relatedHandbooks: ["pandas-developer-handbook", "matplotlib-developer-handbook"],
    relatedCheatsheets: ["matplotlib-cheatsheet"],
    estimatedTime: "8-10 hours (Comprehensive SCADA & Root Cause Study)",
  },
  {
    type: "project",
    category: "eda",
    image: titanicImg,
    order: 4,
    slug: "titanic",
    title: "Titanic Survival Analysis",
    description:
      "End-to-end EDA and feature engineering on the classic Titanic dataset, from missing-value handling to a baseline survival model.",
    difficulty: "beginner",
    status: "completed",
    tags: ["classification", "eda", "feature-engineering"],
    lastUpdated: "2026-05-12",
    githubPath: "projects/titanic",
    githubRepoUrl: "https://github.com/AlwinVJ/titanic_preprocessing",
    dataset: "titanic-dataset",
    librariesUsed: ["pandas", "numpy", "matplotlib", "seaborn", "scikit-learn"],
    skillsLearned: [
      "Missing value imputation",
      "Categorical encoding",
      "Univariate & bivariate analysis",
      "Feature engineering",
    ],
    businessProblem:
      "Predict which passengers survived the Titanic disaster using demographic and ticketing data, and understand what factors most influenced survival.",
    workflow: [
      "Load and inspect the raw dataset",
      "Handle missing values in Age, Cabin, and Embarked",
      "Engineer features: FamilySize, Title, IsAlone",
      "Perform univariate and bivariate EDA",
      "Encode categorical variables",
      "Train and evaluate a baseline classifier",
    ],
    results:
      "A baseline logistic regression achieved ~81% accuracy; sex and passenger class were the strongest predictors of survival.",
    lessonsLearned:
      "Title extraction from passenger names was a stronger signal than raw Age after imputation.",
    visualizations: ["assets/survival-by-class.png", "assets/age-distribution.png"],
    files: {
      readme: "README.md",
      notebook: "notebook/preprocessing.ipynb",
    },
    relatedHandbooks: ["pandas-developer-handbook", "numpy-essentials"],
    relatedCheatsheets: ["matplotlib-cheatsheet"],
    estimatedTime: "3-4 hours",
  },
  {
    type: "project",
    category: "eda",
    featured: true,
    image: vgsalesImg,
    order: 5,
    slug: "video-game-sales-analysis",
    title: "Video Game Sales Analysis",
    description:
      "Performed complete exploratory data analysis on a video game sales dataset — from data cleaning through genre, platform, and publisher-level sales trends.",
    difficulty: "intermediate",
    status: "in-progress",
    tags: ["eda", "sales", "visualization"],
    lastUpdated: "2026-07-10",
    githubPath: "projects/video-game-sales-analysis",
    dataset: "video-game-sales-dataset",
    librariesUsed: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
    skillsLearned: [
      "Data cleaning",
      "Missing value handling",
      "Feature engineering",
      "Sales trend analysis",
      "Genre analysis",
      "Platform analysis",
      "Publisher analysis",
      "Correlation analysis",
    ],
    businessProblem:
      "Understand what drives video game sales performance across platforms, genres, and publishers to surface actionable business insights.",
    workflow: [
      "Clean and prepare the raw sales dataset",
      "Handle missing values across platform and publisher fields",
      "Engineer features for trend and regional analysis",
      "Analyze sales trends over time",
      "Break down performance by genre, platform, and publisher",
      "Run correlation analysis across sales regions",
      "Visualize findings and summarize business insights",
    ],
    results:
      "Action and Sports genres led global sales volume; a small number of publishers accounted for a disproportionate share of top-selling titles.",
    lessonsLearned:
      "Regional sales columns were highly correlated, which shaped how the correlation analysis was interpreted and presented.",
    files: { readme: "README.md", notebook: "notebook.ipynb" },
    relatedHandbooks: ["pandas-developer-handbook", "seaborn-developer-handbook"],
    relatedCheatsheets: ["matplotlib-cheatsheet"],
    estimatedTime: "5-6 hours",
  },
  {
    type: "project",
    category: "ml",
    featured: true,
    image: houseImg,
    order: 1,
    slug: "house-price-prediction",
    legacySlugs: ["house-prices"],
    title: "House Price Prediction",
    description:
      "End-to-end regression machine learning pipeline predicting California census block-group median home values using HistGradientBoostingRegressor, Scikit-learn pipelines, cross-validation, and an interactive Streamlit web dashboard.",
    difficulty: "intermediate",
    status: "completed",
    tags: ["regression", "machine-learning", "california-housing", "gradient-boosting"],
    lastUpdated: "2026-11-15",
    githubPath: "",
    githubRepoUrl: "https://github.com/AlwinVJ/california_house_price_prediction_model",
    liveDemoUrl: "https://californiahousepricepredictionmodel.streamlit.app/",
    dataset: "",
    librariesUsed: [
      "Python",
      "Scikit-learn",
      "Streamlit",
      "Pandas",
      "NumPy",
      "HistGradientBoostingRegressor",
      "Joblib",
      "Matplotlib",
      "Seaborn",
    ],
    skillsLearned: [
      "HistGradientBoostingRegressor",
      "Scikit-learn ColumnTransformer",
      "GridSearchCV hyperparameter tuning",
      "Residual diagnostics",
      "Interactive Streamlit deployment",
    ],
    businessProblem:
      "Predict California census block-group median home values using demographic, geographic, and housing indicators to deliver real-time automated valuation benchmarks.",
    workflow: [
      "Explore 20,640 California census records and handle right-skewed distributions",
      "Diagnose missing total_bedrooms and apply median imputation",
      "Standardize numeric features and one-hot encode ocean proximity",
      "Benchmark 5 regression models across 5-fold cross-validation",
      "Optimize HistGradientBoostingRegressor with GridSearchCV (243 candidates)",
      "Perform residual diagnostics and evaluate with RMSE, MAE, and R²",
      "Deploy interactive Streamlit web application for real-time inference",
    ],
    files: {
      readme: "README.md",
      notebook: "house_price_prediction.ipynb",
      report: "California_House_Price_Prediction_Sample_Project_Report.pdf",
    },
    relatedHandbooks: ["pandas-developer-handbook"],
    estimatedTime: "6-8 hours",
  },
  {
    type: "project",
    category: "ml",
    featured: true,
    image: mentalHealthImg,
    order: 2,
    slug: "mental-health-signal",
    title: "Mental Health Signal",
    description:
      "End-to-end machine learning project that estimates a student's mental health score (0–10) from social media usage, sleep, study habits and stress, served through a FastAPI backend and a web interface.",
    difficulty: "intermediate",
    status: "completed",
    tags: ["regression", "machine-learning", "mental-health"],
    lastUpdated: "2026-11-12",
    githubPath: "",
    githubRepoUrl: "https://github.com/AlwinVJ/Mental-Health-Score",
    liveDemoUrl: "https://mental-health-score-mbgd.onrender.com/",
    dataset: "",
    librariesUsed: [
      "pandas",
      "numpy",
      "scikit-learn",
      "matplotlib",
      "seaborn",
      "FastAPI",
      "Pydantic",
      "Uvicorn",
      "Docker",
    ],
    skillsLearned: [
      "ColumnTransformer pipelines",
      "High-cardinality grouping",
      "Random Forest regression",
      "Hyperparameter tuning",
      "Model serving with FastAPI",
    ],
    businessProblem:
      "Estimate a student's mental health score from lifestyle, digital-usage and stress factors.",
    workflow: [],
    files: {},
  },
  {
    type: "project",
    category: "ml",
    featured: true,
    image: creditRiskImg,
    order: 3,
    slug: "credit-risk-assessment",
    title: "Credit Risk Assessment System",
    description:
      "End-to-end loan-default prediction with XGBoost, probability calibration and SHAP analysis, served through FastAPI and the CredWise web dashboard.",
    difficulty: "intermediate",
    status: "completed",
    tags: ["classification", "machine-learning", "credit-risk"],
    lastUpdated: "2026-11-14",
    githubPath: "",
    githubRepoUrl: "https://github.com/AlwinVJ/Credit-Risk-Assessment",
    liveDemoUrl: "https://credit-risk-assessment-5cnu.onrender.com/",
    dataset: "",
    librariesUsed: [
      "pandas",
      "numpy",
      "scikit-learn",
      "XGBoost",
      "SHAP",
      "matplotlib",
      "seaborn",
      "Joblib",
      "FastAPI",
      "Pydantic",
      "Uvicorn",
      "Docker",
    ],
    skillsLearned: [
      "Imbalanced classification",
      "ColumnTransformer pipelines",
      "XGBoost tuning",
      "Probability calibration",
      "Threshold evaluation",
      "SHAP explanations",
      "Model serving with FastAPI",
    ],
    businessProblem:
      "Estimate loan-default probability from applicant, loan and credit-history features for educational credit-risk decision support.",
    workflow: [],
    files: {
      readme: "README.md",
      notebook: "credit_risk_assessment.ipynb",
    },
  },
  {
    type: "project",
    category: "ml",
    featured: true,
    image: nycAirbnbImg,
    order: 4,
    slug: "nyc-airbnb-room-type-predictor",
    title: "NYC Airbnb Room Type Predictor",
    description:
      "Multi-class classification pipeline predicting NYC Airbnb accommodation room types using ColumnTransformer preprocessing, SMOTE resampling, and tuned Random Forest, served via FastAPI.",
    difficulty: "intermediate",
    status: "in-progress",
    tags: ["classification", "machine-learning", "imbalanced-data", "fastapi", "smote"],
    lastUpdated: "2026-11-17",
    githubPath: "",
    githubRepoUrl: "https://github.com/AlwinVJ/NYC-Airbnb-Room-Type-Predictor",
    dataset: "",
    librariesUsed: [
      "Python",
      "Scikit-learn",
      "Imbalanced-learn",
      "FastAPI",
      "Pydantic",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Joblib",
      "Uvicorn",
    ],
    skillsLearned: [
      "Multi-class imbalanced classification",
      "SMOTE synthetic oversampling",
      "Scikit-learn ColumnTransformer",
      "RandomForest hyperparameter tuning",
      "Microservice deployment with FastAPI",
      "Model evaluation with Macro F1",
    ],
    businessProblem:
      "Predict NYC Airbnb room type (Entire home/apt, Private room, Shared room) from location, price, and listing activity while handling severe class imbalance (~2.4% shared rooms).",
    workflow: [
      "Data ingestion, missing value imputation, and 99th-percentile outlier capping",
      "Exploratory spatial, price, and class distribution analysis",
      "Stratified train-test split (67% train / 33% test)",
      "ColumnTransformer numerical scaling & categorical one-hot encoding",
      "SMOTE oversampling on training data to balance minority classes",
      "Algorithm benchmarking (Logistic Regression, Decision Tree, Gradient Boosting, Random Forest)",
      "Hyperparameter optimization via RandomizedSearchCV targeting Macro F1",
      "Model evaluation on 16,136 holdout test listings",
      "FastAPI inference microservice and interactive web dashboard",
    ],
    files: {
      readme: "README.md",
      notebook: "nyc_airbnb_room_type_classification.ipynb",
    },
  },
];

// ---------------------------------------------------------------------------
// Derived helpers — components consume these instead of touching PROJECTS.
// ---------------------------------------------------------------------------

export function getProjectsSorted(): Project[] {
  return [...PROJECTS].sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || a.title.localeCompare(b.title),
  );
}

export function getFeaturedProjects(): Project[] {
  return getProjectsSorted().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Resolves an old slug (e.g. 'house-prices') to its current project. */
export function getProjectByLegacySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.legacySlugs?.includes(slug));
}

export function getProjectCategoryMeta(id: ProjectCategoryId): ProjectCategory {
  return PROJECT_CATEGORIES.find((c) => c.id === id)!;
}

export function groupProjectsByCategory(
  projects: Project[] = getProjectsSorted(),
): Record<ProjectCategoryId, Project[]> {
  const groups: Record<ProjectCategoryId, Project[]> = { eda: [], ml: [] };
  for (const p of projects) groups[p.category].push(p);
  return groups;
}

/** GitHub link for a project, or undefined if none is configured yet. */
export function getProjectRepoUrl(p: Project, base: (path: string) => string): string | undefined {
  if (p.githubRepoUrl) return p.githubRepoUrl;
  return p.githubPath ? base(p.githubPath) : undefined;
}
