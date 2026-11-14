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
import vgsalesImg from "@/assets/projects/vgsales.jpg";
import houseImg from "@/assets/projects/house.jpg";
import titanicImg from "@/assets/projects/titanic.jpg";
import mentalHealthImg from "@/assets/projects/mental-health.jpg";
import creditRiskImg from "@/assets/projects/credit-risk.jpg";

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
  },
  {
    type: "project",
    category: "eda",
    featured: true,
    image: vgsalesImg,
    slug: "video-game-sales-analysis",
    title: "Video Game Sales Analysis",
    description:
      "Performed complete exploratory data analysis on a video game sales dataset — from data cleaning through genre, platform, and publisher-level sales trends.",
    difficulty: "intermediate",
    status: "completed",
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
    category: "eda",
    image: titanicImg,
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
    category: "ml",
    featured: true,
    image: houseImg,
    order: 1,
    slug: "house-price-prediction",
    legacySlugs: ["house-prices"],
    title: "House Price Prediction",
    description:
      "End-to-end machine learning project on the Ames Housing dataset — from data cleaning and feature engineering through regularized regression and gradient boosting models to predict final home sale prices.",
    difficulty: "intermediate",
    status: "in-progress",
    tags: ["regression", "machine-learning", "feature-engineering"],
    lastUpdated: "2026-06-30",
    githubPath: "projects/house-prices",
    dataset: "house-prices-dataset",
    librariesUsed: ["pandas", "numpy", "scikit-learn", "xgboost", "matplotlib", "seaborn"],
    skillsLearned: [
      "Correlation-based feature selection",
      "Target encoding",
      "Regularized regression",
      "Gradient boosting",
      "Model evaluation with RMSE",
    ],
    businessProblem:
      "Predict the final sale price of residential homes in Ames, Iowa from 79 explanatory variables describing (almost) every aspect of the property.",
    workflow: [
      "Explore the SalePrice target distribution and log-transform for skew",
      "Impute missing values across numeric and categorical features",
      "Handle high-cardinality categorical features with target encoding",
      "Engineer features (total square footage, age, remodel age, quality scores)",
      "Select features via correlation and mutual information",
      "Train Ridge, Lasso, and XGBoost models with cross-validation",
      "Evaluate with RMSE on log-transformed SalePrice",
    ],
    files: { readme: "README.md", notebook: "notebook.ipynb" },
    relatedHandbooks: ["pandas-developer-handbook"],
    estimatedTime: "5-6 hours",
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
