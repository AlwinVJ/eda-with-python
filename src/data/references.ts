/**
 * ============================================================================
 *  CENTRAL REFERENCES DATA — single source of truth for every reference
 * ============================================================================
 *
 *  Everything in the References system (the /references page, its Videos /
 *  Blogs / Articles sections, topic filters, sidebar scroll targets, and the
 *  Home page "Featured References" section) is generated from this file.
 *
 *  --------------------------------------------------------------------------
 *  HOW TO ADD A NEW REFERENCE  (video, blog, or article)
 *  --------------------------------------------------------------------------
 *  1. Append a new object to the `REFERENCES` array.
 *  2. Set `type` to one of: 'video' | 'blog' | 'article'. That decides which
 *     section on the /references page it appears under.
 *  3. Set `category` to any string from `REFERENCE_CATEGORIES` (or add a new
 *     one — the filter chips are generated from the list).
 *  4. Provide `url` (required), plus `thumbnail` if you want an image on the
 *     card. Otherwise a fallback tile is rendered.
 *  5. Set `featured: true` to have it appear in "Featured References" on
 *     the Home page.
 *
 *  The References page, its filter chips, section counts, and Featured
 *  References on the Home page all update automatically. No component code
 *  needs to change.
 *
 *  --------------------------------------------------------------------------
 *  HOW TO ADD A VIDEO / BLOG / ARTICLE
 *  --------------------------------------------------------------------------
 *  It's the same object — only `type` changes:
 *    { type: 'video',   ... }   → shows under the Videos heading
 *    { type: 'blog',    ... }   → shows under the Blogs heading
 *    { type: 'article', ... }   → shows under the Articles heading
 *
 *  --------------------------------------------------------------------------
 *  HOW TO FEATURE AN ITEM
 *  --------------------------------------------------------------------------
 *  Set `featured: true`. It stays in its section on /references AND appears
 *  under "Featured References" on the Home page.
 * ============================================================================
 */

import type { Difficulty } from "@/lib/types";

export type ReferenceType = "video" | "blog" | "article";

export interface ReferenceTypeMeta {
  id: ReferenceType;
  title: string;
  /** Anchor id used for smooth-scrolling from the sidebar. */
  anchor: string;
  description: string;
  order: number;
}

export const REFERENCE_TYPES: ReferenceTypeMeta[] = [
  {
    id: "video",
    title: "Videos",
    anchor: "videos",
    order: 1,
    description: "Talks, tutorials, and course lectures worth your time.",
  },
  {
    id: "blog",
    title: "Blogs",
    anchor: "blogs",
    order: 2,
    description: "Long-running blogs and posts with practical takeaways.",
  },
  {
    id: "article",
    title: "Articles",
    anchor: "articles",
    order: 3,
    description: "Deeper articles, papers, and reference write-ups.",
  },
];

/** Filter chips on /references. Edit this list to add / remove topics. */
export const REFERENCE_CATEGORIES = [
  "EDA",
  "Data Analysis",
  "Statistics",
  "Python",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "Seaborn",
  "Machine Learning",
  "Feature Engineering",
  "End-to-End ML Projects",
  "SQL",
  "Data Visualization",
] as const;

export type ReferenceCategory = (typeof REFERENCE_CATEGORIES)[number];

export interface Reference {
  id: string;
  title: string;
  description: string;
  type: ReferenceType;
  category: ReferenceCategory;
  author?: string;
  source?: string;
  thumbnail?: string;
  url: string;
  featured?: boolean;
  tags?: string[];
  difficulty?: Difficulty;
  /** ISO date string, used for sorting inside a section. */
  dateAdded: string;
}

/** Add new references here. */
export const REFERENCES: Reference[] = [
  {
    id: "ref-video-python-crash-course",
    type: "video",
    title: "Python Crash Course for Data Science",
    description: "A fast-paced overview of the Python you need before touching NumPy or Pandas.",
    category: "Python",
    author: "freeCodeCamp",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
    difficulty: "beginner",
    tags: ["python", "crash-course"],
    featured: true,
    dateAdded: "2026-01-15",
  },
  {
    id: "ref-video-pandas",
    type: "video",
    title: "Pandas in 10 Minutes",
    description: "Concise tour of DataFrames, selection, groupby, and merges.",
    category: "Pandas",
    author: "Corey Schafer",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=vmEHCJofslg",
    thumbnail: "https://img.youtube.com/vi/vmEHCJofslg/hqdefault.jpg",
    difficulty: "beginner",
    tags: ["pandas", "tutorial"],
    dateAdded: "2026-02-04",
  },
  {
    id: "ref-video-eda",
    type: "video",
    title: "A Complete EDA Walkthrough",
    description: "Start-to-finish exploratory analysis on a real dataset.",
    category: "EDA",
    author: "Data School",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=xi0vhXFPegw",
    thumbnail: "https://img.youtube.com/vi/xi0vhXFPegw/hqdefault.jpg",
    difficulty: "intermediate",
    tags: ["eda"],
    dateAdded: "2026-03-10",
  },
  {
    id: "ref-blog-real-python-pandas",
    type: "blog",
    title: "Real Python — Pandas Series",
    description: "A long-running series of hands-on tutorials covering every corner of pandas.",
    category: "Pandas",
    author: "Real Python",
    source: "realpython.com",
    url: "https://realpython.com/learning-paths/pandas-data-science/",
    difficulty: "intermediate",
    tags: ["pandas", "tutorial"],
    featured: true,
    dateAdded: "2026-01-22",
  },
  {
    id: "ref-blog-tds-eda",
    type: "blog",
    title: "Towards Data Science — EDA Tag",
    description: "Community-written posts on EDA techniques, tools, and case studies.",
    category: "EDA",
    author: "Various",
    source: "towardsdatascience.com",
    url: "https://towardsdatascience.com/tagged/exploratory-data-analysis",
    difficulty: "intermediate",
    tags: ["eda"],
    dateAdded: "2026-02-18",
  },
  {
    id: "ref-blog-seaborn-gallery",
    type: "blog",
    title: "Seaborn Example Gallery",
    description: "Reference plots you can copy and adapt for your own analysis.",
    category: "Seaborn",
    author: "Seaborn team",
    source: "seaborn.pydata.org",
    url: "https://seaborn.pydata.org/examples/index.html",
    difficulty: "beginner",
    tags: ["seaborn", "visualization"],
    dateAdded: "2026-03-01",
  },
  {
    id: "ref-article-numpy-docs",
    type: "article",
    title: "NumPy — The Absolute Basics for Beginners",
    description: "Official NumPy quickstart written for people brand-new to arrays.",
    category: "NumPy",
    author: "NumPy team",
    source: "numpy.org",
    url: "https://numpy.org/doc/stable/user/absolute_beginners.html",
    difficulty: "beginner",
    tags: ["numpy", "official"],
    featured: true,
    dateAdded: "2026-01-05",
  },
  {
    id: "ref-article-sklearn-user-guide",
    type: "article",
    title: "scikit-learn User Guide",
    description: "The definitive reference for classical ML — pipelines, models, and evaluation.",
    category: "Machine Learning",
    author: "scikit-learn team",
    source: "scikit-learn.org",
    url: "https://scikit-learn.org/stable/user_guide.html",
    difficulty: "intermediate",
    tags: ["sklearn", "ml"],
    dateAdded: "2026-02-10",
  },
  {
    id: "ref-article-feature-engineering",
    type: "article",
    title: "Feature Engineering for ML — A Practical Guide",
    description: "Encoding, scaling, and interaction features explained with worked examples.",
    category: "Feature Engineering",
    author: "Kaggle",
    source: "kaggle.com",
    url: "https://www.kaggle.com/learn/feature-engineering",
    difficulty: "intermediate",
    tags: ["feature-engineering"],
    dateAdded: "2026-04-02",
  },
  {
    id: "ref-article-sql-for-analysts",
    type: "article",
    title: "SQL for Data Analysts",
    description: "The joins, window functions, and aggregations you actually use day-to-day.",
    category: "SQL",
    author: "Mode Analytics",
    source: "mode.com",
    url: "https://mode.com/sql-tutorial/",
    difficulty: "beginner",
    tags: ["sql"],
    dateAdded: "2026-03-28",
  },
];

// --------------------------------------------------------------------------
// Selectors
// --------------------------------------------------------------------------

export function getAllReferences(): Reference[] {
  return [...REFERENCES].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
}

export function getFeaturedReferences(): Reference[] {
  return getAllReferences().filter((r) => r.featured);
}

export function getReferencesByType(): { type: ReferenceTypeMeta; items: Reference[] }[] {
  const ordered = [...REFERENCE_TYPES].sort((a, b) => a.order - b.order);
  return ordered
    .map((type) => ({ type, items: getAllReferences().filter((r) => r.type === type.id) }))
    .filter((g) => g.items.length > 0);
}

export function getActiveReferenceCategories(): ReferenceCategory[] {
  const used = new Set(REFERENCES.map((r) => r.category));
  return REFERENCE_CATEGORIES.filter((c) => used.has(c));
}
