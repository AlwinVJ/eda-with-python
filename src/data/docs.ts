/**
 * ============================================================================
 *  CENTRAL DOCUMENTATION DATA — single source of truth for every doc
 * ============================================================================
 *
 *  Everything in the Documentation system (the /docs page, individual
 *  /docs/<slug> pages, sidebar categories, previous / next navigation, home
 *  page featured docs) is generated from this file.
 *
 *  --------------------------------------------------------------------------
 *  HOW TO ADD A NEW DOCUMENT
 *  --------------------------------------------------------------------------
 *  1. Append a new object to the `DOCS` array.
 *  2. Give it a unique `slug` (used in the URL `/docs/<slug>`).
 *  3. Pick a `category` id from `DOC_CATEGORIES` below. If none fits,
 *     add a new one to `DOC_CATEGORIES` first.
 *  4. Set an `order` number — docs are sorted by (category order, doc order).
 *  5. Set `featured: true` if you want it highlighted on the Home page.
 *  6. Provide `resourceUrl` if the actual content lives elsewhere (PDF, blog
 *     post, GitHub file). The detail page renders an "Open resource" button.
 *
 *  The Documentation page, sidebar, and previous / next navigation all
 *  update automatically. No component code needs to change.
 *
 *  --------------------------------------------------------------------------
 *  HOW TO CHANGE THE ORDER
 *  --------------------------------------------------------------------------
 *  Change the `order` number on either the category or the doc. Lower
 *  numbers come first. Docs within a category are grouped together, and
 *  categories are rendered in `order` sequence.
 *
 *  --------------------------------------------------------------------------
 *  HOW TO CREATE A NEW CATEGORY
 *  --------------------------------------------------------------------------
 *  Add an object to `DOC_CATEGORIES` with a unique `id`, a human `title`,
 *  and an `order`. Reference that id from any doc's `category` field.
 * ============================================================================
 */

import {
  BookOpen,
  Code2,
  Database,
  LineChart,
  Sparkles,
  Wrench,
  Rocket,
  Layers,
  Sigma,
  Brush,
  type LucideIcon,
} from "lucide-react";
import type { Difficulty } from "@/lib/types";

export type DocCategoryId =
  | "python"
  | "numpy"
  | "pandas"
  | "data-cleaning"
  | "data-visualization"
  | "eda"
  | "feature-engineering"
  | "machine-learning"
  | "deployment";

export interface DocCategory {
  id: DocCategoryId;
  title: string;
  /** Anchor id used for smooth-scrolling from the sidebar. */
  anchor: string;
  description: string;
  order: number;
  icon: LucideIcon;
}

export const DOC_CATEGORIES: DocCategory[] = [
  {
    id: "python",
    title: "Python",
    anchor: "python",
    order: 1,
    icon: Code2,
    description: "Language basics that every later library relies on.",
  },
  {
    id: "numpy",
    title: "NumPy",
    anchor: "numpy",
    order: 2,
    icon: Sigma,
    description: "The numerical foundation for data work in Python.",
  },
  {
    id: "pandas",
    title: "Pandas",
    anchor: "pandas",
    order: 3,
    icon: Database,
    description: "Tabular data manipulation with DataFrames.",
  },
  {
    id: "data-cleaning",
    title: "Data Cleaning",
    anchor: "data-cleaning",
    order: 4,
    icon: Wrench,
    description: "Turn raw, messy data into an analysis-ready dataset.",
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    anchor: "data-visualization",
    order: 5,
    icon: Brush,
    description: "Communicate findings with clear, readable charts.",
  },
  {
    id: "eda",
    title: "Exploratory Data Analysis",
    anchor: "eda",
    order: 6,
    icon: LineChart,
    description: "Explore, question, and understand a dataset.",
  },
  {
    id: "feature-engineering",
    title: "Feature Engineering",
    anchor: "feature-engineering",
    order: 7,
    icon: Layers,
    description: "Design inputs that make models perform better.",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    anchor: "machine-learning",
    order: 8,
    icon: Sparkles,
    description: "Train, tune, and evaluate models.",
  },
  {
    id: "deployment",
    title: "Deployment",
    anchor: "deployment",
    order: 9,
    icon: Rocket,
    description: "Ship models and dashboards to production.",
  },
];

export interface Doc {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: DocCategoryId;
  difficulty: Difficulty;
  /** Lower comes first inside the category. */
  order: number;
  estimatedReadingTime: string;
  icon?: LucideIcon;
  featured?: boolean;
  tags: string[];
  /** External resource (PDF, GitHub file, external doc). */
  resourceUrl?: string;
  /** Optional short body shown on the detail page. */
  body?: string;
}

/** Add new documents here. */
export const DOCS: Doc[] = [
  {
    id: "doc-python-foundations",
    slug: "python-foundations",
    title: "Python Foundations",
    description:
      "Core Python — syntax, data structures, functions, and file I/O — the baseline for every later library.",
    category: "python",
    difficulty: "beginner",
    order: 1,
    estimatedReadingTime: "30 min",
    icon: Code2,
    tags: ["python", "foundations"],
    body: "A gentle introduction to Python for data work: variables, control flow, functions, list comprehensions, and reading files.",
  },
  {
    id: "doc-numpy-essentials",
    slug: "numpy-essentials",
    title: "NumPy Essentials",
    description:
      "Array creation, broadcasting, indexing, and vectorized operations — the foundation for every project.",
    category: "numpy",
    difficulty: "beginner",
    order: 1,
    estimatedReadingTime: "25 min",
    icon: Sigma,
    featured: true,
    tags: ["numpy"],
    resourceUrl:
      "https://raw.githubusercontent.com/your-username/EDA-With-Python/main/docs/handbooks/numpy-essentials/handbook.pdf",
  },
  {
    id: "doc-numpy-developer",
    slug: "numpy-developer-handbook",
    title: "NumPy Developer Handbook",
    description:
      "A deeper reference for NumPy — memory layout, advanced indexing, and performance patterns for larger projects.",
    category: "numpy",
    difficulty: "intermediate",
    order: 2,
    estimatedReadingTime: "45 min",
    icon: Sigma,
    tags: ["numpy", "reference"],
    resourceUrl:
      "https://raw.githubusercontent.com/your-username/EDA-With-Python/main/docs/handbooks/numpy-developer-handbook/handbook.pdf",
  },
  {
    id: "doc-pandas-developer",
    slug: "pandas-developer-handbook",
    title: "Pandas Developer Handbook",
    description:
      "A complete, project-oriented reference for data manipulation with pandas — indexing, grouping, merging, and performance.",
    category: "pandas",
    difficulty: "beginner",
    order: 1,
    estimatedReadingTime: "60 min",
    icon: Database,
    featured: true,
    tags: ["pandas", "reference"],
    resourceUrl:
      "https://raw.githubusercontent.com/your-username/EDA-With-Python/main/docs/handbooks/pandas-developer-handbook/handbook.pdf",
  },
  {
    id: "doc-data-cleaning",
    slug: "data-preprocessing-eda-handbook",
    title: "Data Preprocessing & EDA Handbook",
    description:
      "The complete data preprocessing and exploratory analysis workflow used throughout every project on this platform.",
    category: "data-cleaning",
    difficulty: "beginner",
    order: 1,
    estimatedReadingTime: "35 min",
    icon: Wrench,
    featured: true,
    tags: ["overview", "workflow", "eda"],
    resourceUrl: "https://www.stat.cmu.edu/~hseltman/309/Book/chapter4.pdf",
  },
  {
    id: "doc-matplotlib",
    slug: "matplotlib-developer-handbook",
    title: "Matplotlib Developer Handbook",
    description:
      "Building readable, publication-quality plots — figure/axes structure, styling, and multi-panel layouts.",
    category: "data-visualization",
    difficulty: "beginner",
    order: 1,
    estimatedReadingTime: "40 min",
    icon: Brush,
    tags: ["matplotlib", "visualization"],
    resourceUrl:
      "https://raw.githubusercontent.com/your-username/EDA-With-Python/main/docs/handbooks/matplotlib-developer-handbook/handbook.pdf",
  },
  {
    id: "doc-seaborn",
    slug: "seaborn-developer-handbook",
    title: "Seaborn Developer Handbook",
    description:
      "Statistical visualization patterns — distributions, categorical plots, and relationships between variables.",
    category: "data-visualization",
    difficulty: "intermediate",
    order: 2,
    estimatedReadingTime: "30 min",
    icon: Brush,
    tags: ["seaborn", "visualization", "statistics"],
    resourceUrl:
      "https://raw.githubusercontent.com/your-username/EDA-With-Python/main/docs/handbooks/seaborn-developer-handbook/handbook.pdf",
  },
  {
    id: "doc-eda-workflow",
    slug: "eda-workflow",
    title: "EDA Workflow",
    description: "A repeatable questioning-and-visualization loop for exploring any new dataset.",
    category: "eda",
    difficulty: "beginner",
    order: 1,
    estimatedReadingTime: "20 min",
    icon: LineChart,
    tags: ["eda", "workflow"],
    body: "Frame questions, inspect distributions, look for missingness patterns, and iterate.",
  },
  {
    id: "doc-feature-engineering",
    slug: "feature-engineering-basics",
    title: "Feature Engineering Basics",
    description:
      "Encoding, scaling, interactions, and feature selection strategies before modelling.",
    category: "feature-engineering",
    difficulty: "intermediate",
    order: 1,
    estimatedReadingTime: "30 min",
    icon: Layers,
    tags: ["feature-engineering"],
    body: "Techniques for turning raw columns into signal-rich model inputs.",
  },
  {
    id: "doc-ml-basics",
    slug: "machine-learning-basics",
    title: "Machine Learning Basics",
    description: "Model families, training loops, evaluation metrics, and validation strategies.",
    category: "machine-learning",
    difficulty: "intermediate",
    order: 1,
    estimatedReadingTime: "45 min",
    icon: Sparkles,
    tags: ["ml", "training"],
    body: "Choose the right family, train on a clean split, evaluate honestly.",
  },
  {
    id: "doc-deployment",
    slug: "model-deployment",
    title: "Model Deployment",
    description:
      "Package trained models, expose them behind an API, and monitor them in production.",
    category: "deployment",
    difficulty: "advanced",
    order: 1,
    estimatedReadingTime: "35 min",
    icon: Rocket,
    tags: ["deployment", "mlops"],
    body: "From notebook to service: packaging, serving, and monitoring.",
  },
];

// --------------------------------------------------------------------------
// Selectors (used by pages, sidebar, prev/next nav)
// --------------------------------------------------------------------------

/** All docs sorted by (category order, doc order, title). */
export function getAllDocs(): Doc[] {
  const catOrder = new Map(DOC_CATEGORIES.map((c) => [c.id, c.order]));
  return [...DOCS].sort((a, b) => {
    const ca = catOrder.get(a.category) ?? 999;
    const cb = catOrder.get(b.category) ?? 999;
    if (ca !== cb) return ca - cb;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export function getDoc(slug: string): Doc | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export function getFeaturedDocs(): Doc[] {
  return getAllDocs().filter((d) => d.featured);
}

export function getDocsByCategory(): { category: DocCategory; docs: Doc[] }[] {
  const sortedCats = [...DOC_CATEGORIES].sort((a, b) => a.order - b.order);
  return sortedCats
    .map((category) => ({
      category,
      docs: getAllDocs().filter((d) => d.category === category.id),
    }))
    .filter((g) => g.docs.length > 0);
}

/** Previous / next in the flattened, ordered list. */
export function getDocNeighbors(slug: string): { prev?: Doc; next?: Doc } {
  const all = getAllDocs();
  const i = all.findIndex((d) => d.slug === slug);
  if (i === -1) return {};
  return { prev: all[i - 1], next: all[i + 1] };
}

export function getDocCategory(id: DocCategoryId): DocCategory | undefined {
  return DOC_CATEGORIES.find((c) => c.id === id);
}
