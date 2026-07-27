/**
 * ============================================================================
 *  CENTRAL PROJECT DATA — single source of truth for every project on the site
 * ============================================================================
 *
 *  Everything about projects (Home "Featured Projects", the Projects page,
 *  sidebar categories, project cards, badges) is generated from this file.
 *
 *  --------------------------------------------------------------------------
 *  HOW TO ADD A NEW PROJECT
 *  --------------------------------------------------------------------------
 *  1. Drop a cover image into `src/assets/projects/<name>.jpg` and add an
 *     `import` for it at the top of this file.
 *  2. Append a new object to the `PROJECTS` array below.
 *  3. Set `category: 'eda'` OR `category: 'ml'` — this decides the section it
 *     appears under, its badge label, and the sidebar it scrolls to.
 *  4. Set `featured: true` if you want it on the Home page.
 *  5. Fill in the standard project metadata (title, description, workflow…).
 *
 *  The Projects page, sidebar, category badges, and Featured Projects list
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

import type { ProjectMetadata } from '@/lib/types';

import tipsImg from '@/assets/projects/tips.jpg';
import netflixImg from '@/assets/projects/netflix.jpg';
import vgsalesImg from '@/assets/projects/vgsales.jpg';
import houseImg from '@/assets/projects/house.jpg';
import titanicImg from '@/assets/projects/titanic.jpg';

export type ProjectCategoryId = 'eda' | 'ml';

export interface ProjectCategory {
  id: ProjectCategoryId;
  title: string;
  /** Anchor id used for smooth-scrolling from the sidebar. */
  anchor: string;
  /** Short label used on project cards (e.g. "EDA Project"). */
  badge: string;
  description: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: 'eda',
    title: 'EDA Projects',
    anchor: 'eda',
    badge: 'EDA Project',
    description:
      'Exploratory data analysis on real datasets — cleaning, visualization, and insight.',
  },
  {
    id: 'ml',
    title: 'End-to-End Machine Learning Projects',
    anchor: 'ml',
    badge: 'End-to-End ML',
    description:
      'Full ML workflows — from raw data through feature engineering to a trained, evaluated model.',
  },
];

export interface Project extends ProjectMetadata {
  category: ProjectCategoryId;
  featured?: boolean;
  image?: string;
}

/**
 * Add new projects here. Order within the array doesn't matter — the site
 * sorts projects alphabetically inside each category.
 */
export const PROJECTS: Project[] = [
  {
    type: 'project',
    category: 'eda',
    featured: true,
    image: tipsImg,
    slug: 'tips',
    title: 'Tips Dataset',
    description:
      'Your first end-to-end project: apply NumPy and Pandas basics to clean and explore a small restaurant tips dataset, then visualize the results.',
    difficulty: 'beginner',
    status: 'completed',
    tags: ['numpy', 'pandas', 'eda', 'first-project'],
    lastUpdated: '2026-07-05',
    githubPath: 'projects/tips',
    dataset: 'tips-dataset',
    librariesUsed: ['numpy', 'pandas', 'matplotlib', 'seaborn'],
    skillsLearned: [
      'NumPy basics',
      'Pandas fundamentals',
      'Data cleaning',
      'Basic and statistical visualization',
    ],
    businessProblem:
      'Explore what factors are associated with higher tip amounts at a restaurant.',
    workflow: [
      'Load the dataset with pandas and inspect its structure',
      'Practice NumPy operations on the numeric columns',
      'Clean and prepare the data',
      'Explore relationships between bill size, party size, and tip',
      'Visualize findings with Matplotlib, then Seaborn',
    ],
    results:
      'Tip amount scales closely with total bill size; party size and day of week show smaller but visible effects.',
    lessonsLearned:
      'This project is designed to be revisited across Steps 2-6 of the Learning Guide, adding a new skill each pass.',
    visualizations: ['assets/tip-vs-bill.png'],
    files: { readme: 'README.md', notebook: 'notebook.ipynb' },
    relatedHandbooks: [
      'numpy-essentials',
      'pandas-developer-handbook',
      'matplotlib-developer-handbook',
      'seaborn-developer-handbook',
    ],
    estimatedTime: '4-6 hours (revisited across multiple steps)',
  },
  {
    type: 'project',
    category: 'eda',
    featured: true,
    image: netflixImg,
    slug: 'netflix-eda',
    title: 'Netflix Movies and TV Shows EDA',
    description:
      'Comprehensive exploratory data analysis of the Netflix catalog — cleaning, country and genre analysis, ratings, release trends, and duration patterns.',
    difficulty: 'intermediate',
    status: 'completed',
    tags: ['eda', 'streaming', 'visualization'],
    lastUpdated: '2026-07-12',
    githubPath: 'projects/netflix-eda',
    dataset: 'netflix-dataset',
    librariesUsed: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    skillsLearned: [
      'Data cleaning',
      'Missing values',
      'Duplicate removal',
      'Feature engineering',
      'Country analysis',
      'Genre analysis',
      'Ratings analysis',
      'Release trend analysis',
      'Duration analysis',
      'Correlation analysis',
    ],
    businessProblem:
      'Explore what the Netflix catalog reveals about content strategy — which countries, genres, and ratings dominate, and how the catalog has shifted over time.',
    workflow: [
      'Clean the dataset and remove duplicate entries',
      'Handle missing values across cast, country, and rating fields',
      'Engineer features to separate movies from TV show durations',
      'Analyze content by country and genre',
      'Analyze ratings and release-year trends',
      'Explore correlations across catalog attributes',
      'Visualize findings and summarize business insights',
    ],
    results:
      "US-produced titles and the Drama/Comedy genres dominate the catalog; content additions accelerated sharply in the years leading up to the dataset's cutoff.",
    lessonsLearned:
      'The `country` and `cast` fields required careful multi-value parsing before any group-level analysis was reliable.',
    files: { readme: 'README.md', notebook: 'notebook.ipynb' },
    relatedHandbooks: ['pandas-developer-handbook', 'matplotlib-developer-handbook'],
    estimatedTime: '5-6 hours',
  },
  {
    type: 'project',
    category: 'eda',
    featured: true,
    image: vgsalesImg,
    slug: 'video-game-sales-analysis',
    title: 'Video Game Sales Analysis',
    description:
      'Performed complete exploratory data analysis on a video game sales dataset — from data cleaning through genre, platform, and publisher-level sales trends.',
    difficulty: 'intermediate',
    status: 'completed',
    tags: ['eda', 'sales', 'visualization'],
    lastUpdated: '2026-07-10',
    githubPath: 'projects/video-game-sales-analysis',
    dataset: 'video-game-sales-dataset',
    librariesUsed: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    skillsLearned: [
      'Data cleaning',
      'Missing value handling',
      'Feature engineering',
      'Sales trend analysis',
      'Genre analysis',
      'Platform analysis',
      'Publisher analysis',
      'Correlation analysis',
    ],
    businessProblem:
      'Understand what drives video game sales performance across platforms, genres, and publishers to surface actionable business insights.',
    workflow: [
      'Clean and prepare the raw sales dataset',
      'Handle missing values across platform and publisher fields',
      'Engineer features for trend and regional analysis',
      'Analyze sales trends over time',
      'Break down performance by genre, platform, and publisher',
      'Run correlation analysis across sales regions',
      'Visualize findings and summarize business insights',
    ],
    results:
      'Action and Sports genres led global sales volume; a small number of publishers accounted for a disproportionate share of top-selling titles.',
    lessonsLearned:
      'Regional sales columns were highly correlated, which shaped how the correlation analysis was interpreted and presented.',
    files: { readme: 'README.md', notebook: 'notebook.ipynb' },
    relatedHandbooks: ['pandas-developer-handbook', 'seaborn-developer-handbook'],
    relatedCheatsheets: ['matplotlib-cheatsheet'],
    estimatedTime: '5-6 hours',
  },
  {
    type: 'project',
    category: 'eda',
    image: titanicImg,
    slug: 'titanic',
    title: 'Titanic Survival Analysis',
    description:
      'End-to-end EDA and feature engineering on the classic Titanic dataset, from missing-value handling to a baseline survival model.',
    difficulty: 'beginner',
    status: 'completed',
    tags: ['classification', 'eda', 'feature-engineering'],
    lastUpdated: '2026-05-12',
    githubPath: 'projects/titanic',
    dataset: 'titanic-dataset',
    librariesUsed: ['pandas', 'numpy', 'matplotlib', 'seaborn', 'scikit-learn'],
    skillsLearned: [
      'Missing value imputation',
      'Categorical encoding',
      'Univariate & bivariate analysis',
      'Feature engineering',
    ],
    businessProblem:
      'Predict which passengers survived the Titanic disaster using demographic and ticketing data, and understand what factors most influenced survival.',
    workflow: [
      'Load and inspect the raw dataset',
      'Handle missing values in Age, Cabin, and Embarked',
      'Engineer features: FamilySize, Title, IsAlone',
      'Perform univariate and bivariate EDA',
      'Encode categorical variables',
      'Train and evaluate a baseline classifier',
    ],
    results:
      'A baseline logistic regression achieved ~81% accuracy; sex and passenger class were the strongest predictors of survival.',
    lessonsLearned:
      'Title extraction from passenger names was a stronger signal than raw Age after imputation.',
    visualizations: ['assets/survival-by-class.png', 'assets/age-distribution.png'],
    files: { readme: 'README.md', notebook: 'notebook.ipynb', report: 'report.pdf' },
    relatedHandbooks: ['pandas-developer-handbook', 'numpy-essentials'],
    relatedCheatsheets: ['matplotlib-cheatsheet'],
    estimatedTime: '3-4 hours',
  },
  {
    type: 'project',
    category: 'ml',
    featured: true,
    image: houseImg,
    slug: 'house-prices',
    title: 'House Price Prediction',
    description:
      'End-to-end machine learning project on the Ames Housing dataset — from data cleaning and feature engineering through regularized regression and gradient boosting models to predict final home sale prices.',
    difficulty: 'intermediate',
    status: 'in-progress',
    tags: ['regression', 'machine-learning', 'feature-engineering'],
    lastUpdated: '2026-06-30',
    githubPath: 'projects/house-prices',
    dataset: 'house-prices-dataset',
    librariesUsed: ['pandas', 'numpy', 'scikit-learn', 'xgboost', 'matplotlib', 'seaborn'],
    skillsLearned: [
      'Correlation-based feature selection',
      'Target encoding',
      'Regularized regression',
      'Gradient boosting',
      'Model evaluation with RMSE',
    ],
    businessProblem:
      'Predict the final sale price of residential homes in Ames, Iowa from 79 explanatory variables describing (almost) every aspect of the property.',
    workflow: [
      'Explore the SalePrice target distribution and log-transform for skew',
      'Impute missing values across numeric and categorical features',
      'Handle high-cardinality categorical features with target encoding',
      'Engineer features (total square footage, age, remodel age, quality scores)',
      'Select features via correlation and mutual information',
      'Train Ridge, Lasso, and XGBoost models with cross-validation',
      'Evaluate with RMSE on log-transformed SalePrice',
    ],
    files: { readme: 'README.md', notebook: 'notebook.ipynb' },
    relatedHandbooks: ['pandas-developer-handbook'],
    estimatedTime: '5-6 hours',
  },
];

// ---------------------------------------------------------------------------
// Derived helpers — components consume these instead of touching PROJECTS.
// ---------------------------------------------------------------------------

export function getProjectsSorted(): Project[] {
  return [...PROJECTS].sort((a, b) => a.title.localeCompare(b.title));
}

export function getFeaturedProjects(): Project[] {
  return getProjectsSorted().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
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
