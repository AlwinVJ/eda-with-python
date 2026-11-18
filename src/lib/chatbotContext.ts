/**
 * Centralized Chatbot Context Generator
 *
 * Provides structured, authoritative, page-specific context to the chatbot (Eddie)
 * dynamically derived from central project data, project details, learning curriculum,
 * and route metadata. Decouples the chatbot from fragile DOM scraping.
 */

import {
  PROJECTS,
  PROJECT_CATEGORIES,
  getProjectBySlug,
  getProjectByLegacySlug,
  type Project,
} from "@/data/projects";
import {
  getProjectDetails,
  PROJECT_SECTION_ORDER,
  type ProjectDetails,
} from "@/data/projectDetails";
import { getAllModules, getAllTopics, getTopicBySlug, type LearningTopic } from "@/data/learning";

export type PageType =
  "home" | "projects-index" | "project-detail" | "learn-index" | "learn-topic" | "unknown";

export interface ContextSection {
  id: string;
  title: string;
  content: string;
}

export interface PageContextInfo {
  pageType: PageType;
  pageTitle: string;
  path: string;
  shortLabel: string;
  summary: string;
  starterQuestions: string[];
  sections: ContextSection[];
  fullTextContext: string;
  metadata: {
    category?: string;
    technologies?: string[];
    dataset?: string;
    githubRepoUrl?: string;
    liveDemoUrl?: string;
    status?: string;
    [key: string]: unknown;
  };
}

/**
 * Normalizes a URL pathname to determine the target route and optional resource slug.
 */
export function normalizeRoute(pathname: string): { type: PageType; slug?: string } {
  if (!pathname || pathname === "" || pathname === "/") {
    return { type: "home" };
  }

  const cleanPath = pathname.replace(/\/+$/, "");

  if (cleanPath === "/projects") {
    return { type: "projects-index" };
  }

  if (cleanPath.startsWith("/projects/")) {
    const slug = cleanPath.replace("/projects/", "").trim();
    if (slug) {
      return { type: "project-detail", slug };
    }
  }

  if (cleanPath === "/learn") {
    return { type: "learn-index" };
  }

  if (cleanPath.startsWith("/learn/")) {
    const slug = cleanPath.replace("/learn/", "").trim();
    if (slug) {
      return { type: "learn-topic", slug };
    }
  }

  return { type: "unknown" };
}

/**
 * Formats a single project's detailed sections into structured context sections.
 */
function extractProjectDetailSections(
  project: Project,
  details?: ProjectDetails,
): ContextSection[] {
  const sections: ContextSection[] = [];

  // 1. Core Metadata Section
  const techList = project.librariesUsed?.join(", ") || "Python, Pandas, NumPy";
  const metaLines = [
    `Project Title: ${project.title}`,
    `Category: ${project.category === "ml" ? "End-to-End Machine Learning" : "Exploratory Data Analysis (EDA)"}`,
    `Status: ${project.status || "Completed"}`,
    `Description: ${project.description}`,
    `Technologies & Libraries: ${techList}`,
    project.dataset ? `Dataset: ${project.dataset}` : "",
    project.githubRepoUrl ? `GitHub Repository: ${project.githubRepoUrl}` : "",
    project.liveDemoUrl ? `Live Interactive Demo: ${project.liveDemoUrl}` : "",
  ].filter(Boolean);

  sections.push({
    id: "core-metadata",
    title: "Project Core Metadata",
    content: metaLines.join("\n"),
  });

  // 2. Extract sections from ProjectDetails registry
  if (details) {
    for (const { id: sectionId, title: sectionTitle } of PROJECT_SECTION_ORDER) {
      const section = details[sectionId];
      if (!section || section.placeholder) continue;

      const lines: string[] = [];

      if (section.body && section.body.length > 0) {
        lines.push(...section.body);
      }

      if (section.steps && section.steps.length > 0) {
        lines.push(...section.steps.map((s, idx) => `${idx + 1}. ${s}`));
      }

      if (section.bullets && section.bullets.length > 0) {
        lines.push(...section.bullets.map((b) => `• ${b}`));
      }

      if (section.subsections && section.subsections.length > 0) {
        for (const sub of section.subsections) {
          lines.push(`\n[${sub.title}]`);
          if (sub.body) lines.push(...sub.body);
          if (sub.bullets) lines.push(...sub.bullets.map((b) => `• ${b}`));
          if (sub.steps) lines.push(...sub.steps.map((s, idx) => `${idx + 1}. ${s}`));
        }
      }

      if (lines.length > 0) {
        sections.push({
          id: sectionId,
          title: sectionTitle,
          content: lines.join("\n\n"),
        });
      }
    }
  }

  // 3. Fallback to Project fields if details registry is absent or has fewer than 2 sections
  if (sections.length <= 1) {
    if (project.businessProblem) {
      sections.push({
        id: "problem",
        title: "Problem Statement & Objective",
        content: project.businessProblem,
      });
    }
    if (project.workflow && project.workflow.length > 0) {
      sections.push({
        id: "workflow",
        title: "Methodology & Analytical Workflow",
        content: project.workflow.map((s, idx) => `${idx + 1}. ${s}`).join("\n"),
      });
    }
    if (project.results) {
      sections.push({
        id: "results",
        title: "Key Findings & Results",
        content: project.results,
      });
    }
    if (project.lessonsLearned) {
      sections.push({
        id: "lessons",
        title: "Lessons Learned & Data Gotchas",
        content: project.lessonsLearned,
      });
    }
    if (project.skillsLearned && project.skillsLearned.length > 0) {
      sections.push({
        id: "skills",
        title: "Skills & Analytical Techniques",
        content: project.skillsLearned.map((s) => `• ${s}`).join("\n"),
      });
    }
  }

  return sections;
}

/**
 * Builds project-specific starter questions based on real project topics.
 */
function getProjectStarterQuestions(project: Project): string[] {
  const slug = project.slug;

  if (slug === "house-price-prediction") {
    return [
      "Which model and algorithm was selected for this project?",
      "What features and transformations were used?",
      "Is there an interactive live demo available?",
      "What were the evaluation metrics and validation strategy?",
    ];
  }

  if (slug === "mental-health-signal") {
    return [
      "What is the primary objective of this project?",
      "What were the key EDA findings regarding student depression and CGPA?",
      "Which machine learning algorithms were evaluated?",
      "What were the final model evaluation results?",
    ];
  }

  if (slug === "credit-risk-assessment") {
    return [
      "What dataset and features does this credit risk project use?",
      "How is the optimal decision threshold calculated?",
      "How are model predictions explained using SHAP values?",
      "What business recommendations were made to the risk committee?",
    ];
  }

  if (slug === "nyc-airbnb-room-type-predictor") {
    return [
      "What is the target variable and classification problem?",
      "Which features are most predictive of room type?",
      "What algorithms were tested and what was the final performance?",
      "Is there a live deployed demo for this predictor?",
    ];
  }

  if (slug === "discount-vs-profit") {
    return [
      "At what discount percentage does profit margin turn negative?",
      "Which product categories suffer the most severe margin erosion?",
      "What are the major statistical findings of this study?",
      "What markdown pricing strategy is recommended?",
    ];
  }

  if (slug === "amazon-conveyor-eda") {
    return [
      "What is the operational objective of the Amazon Conveyor EDA?",
      "Which floor and alarm types cause the greatest downtime?",
      "What does the Pareto 80/20 downtime distribution reveal?",
      "What maintenance recommendations were proposed?",
    ];
  }

  if (slug === "titanic") {
    return [
      "How were missing values in Age and Cabin handled?",
      "What features had the strongest correlation with passenger survival?",
      "Explain the IQR outlier detection used on ticket Fares.",
      "What was the survival rate discrepancy between females and males?",
    ];
  }

  if (slug === "video-game-sales-analysis") {
    return [
      "Which gaming platforms had the highest global sales?",
      "How do North American, European, and Japanese sales trends differ?",
      "Which genres dominated historical video game sales?",
      "What libraries were used for this EDA?",
    ];
  }

  if (slug === "netflix-eda") {
    return [
      "How has the proportion of Movies versus TV Shows evolved over time?",
      "Which countries produce the highest volume of content on Netflix?",
      "What are the most common movie runtimes and ratings?",
      "What data cleaning steps were performed on release years and dates?",
    ];
  }

  return [
    `What is the primary objective of ${project.title}?`,
    `What dataset and technologies are used in ${project.title}?`,
    `What were the major findings or results?`,
  ];
}

/**
 * Builds context for a specific Project Detail page (`/projects/$slug`).
 */
function buildProjectDetailContext(slug: string, rawPath: string): PageContextInfo {
  let project = getProjectBySlug(slug);
  if (!project) {
    const legacy = getProjectByLegacySlug(slug);
    if (legacy) project = legacy;
  }

  if (!project) {
    return {
      pageType: "project-detail",
      pageTitle: `Project: ${slug}`,
      path: rawPath,
      shortLabel: `Project: ${slug}`,
      summary: `Documentation for project '${slug}' was not found.`,
      starterQuestions: ["What projects are available on this website?"],
      sections: [],
      fullTextContext: `PROJECT NOT FOUND: The requested project '${slug}' does not exist in the website registry.`,
      metadata: {},
    };
  }

  const details = getProjectDetails(project.slug);
  const sections = extractProjectDetailSections(project, details);

  const fullText = [
    `CURRENT PAGE: ${project.title} · Project Documentation`,
    `URL PATH: ${rawPath}`,
    `CATEGORY: ${project.category === "ml" ? "End-to-End Machine Learning" : "Exploratory Data Analysis"}`,
    `STATUS: ${project.status || "Completed"}`,
    `LIBRARIES/TECH: ${project.librariesUsed?.join(", ") || "Python"}`,
    project.githubRepoUrl ? `GITHUB REPO: ${project.githubRepoUrl}` : "",
    project.liveDemoUrl ? `LIVE DEMO: ${project.liveDemoUrl}` : "",
    "",
    "--- DETAILED DOCUMENTED SECTIONS ---",
    ...sections.map((s) => `[SECTION: ${s.title}]\n${s.content}`),
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    pageType: "project-detail",
    pageTitle: project.title,
    path: rawPath,
    shortLabel: project.title,
    summary: project.description,
    starterQuestions: getProjectStarterQuestions(project),
    sections,
    fullTextContext: fullText,
    metadata: {
      slug: project.slug,
      category: project.category,
      status: project.status,
      technologies: project.librariesUsed,
      dataset: project.dataset,
      githubRepoUrl: project.githubRepoUrl,
      liveDemoUrl: project.liveDemoUrl,
    },
  };
}

/**
 * Builds context for the Projects Listing page (`/projects`).
 */
function buildProjectsIndexContext(rawPath: string): PageContextInfo {
  const edaProjects = PROJECTS.filter((p) => p.category === "eda");
  const mlProjects = PROJECTS.filter((p) => p.category === "ml");

  const edaSummary = edaProjects
    .map(
      (p, i) =>
        `${i + 1}. ${p.title} (/projects/${p.slug})\n   - Description: ${p.description}\n   - Tech: ${p.librariesUsed?.join(", ")}\n   - Status: ${p.status || "Completed"}${p.liveDemoUrl ? `\n   - Live Demo: ${p.liveDemoUrl}` : ""}`,
    )
    .join("\n\n");

  const mlSummary = mlProjects
    .map(
      (p, i) =>
        `${i + 1}. ${p.title} (/projects/${p.slug})\n   - Description: ${p.description}\n   - Tech: ${p.librariesUsed?.join(", ")}\n   - Status: ${p.status || "Completed"}${p.liveDemoUrl ? `\n   - Live Demo: ${p.liveDemoUrl}` : ""}`,
    )
    .join("\n\n");

  const sections: ContextSection[] = [
    {
      id: "project-categories",
      title: "Project Categories Overview",
      content:
        "The website organizes projects into two distinct categories:\n" +
        "1. EDA Projects: Focused on exploratory data analysis, distribution analysis, missing value diagnosis, and data visualization.\n" +
        "2. End-to-End Machine Learning Projects: Full pipelines covering data cleaning, feature engineering, model training, cross-validation, hyperparameter tuning, model evaluation, and deployment.",
    },
    {
      id: "eda-projects-list",
      title: "Exploratory Data Analysis (EDA) Projects",
      content: edaSummary,
    },
    {
      id: "ml-projects-list",
      title: "End-to-End Machine Learning Projects",
      content: mlSummary,
    },
  ];

  const fullText = [
    "CURRENT PAGE: Projects Listing Page",
    `URL PATH: ${rawPath}`,
    `TOTAL PROJECTS: ${PROJECTS.length} (${edaProjects.length} EDA Projects, ${mlProjects.length} End-to-End ML Projects)`,
    "",
    "--- EXPLORATORY DATA ANALYSIS (EDA) PROJECTS ---",
    edaSummary,
    "",
    "--- END-TO-END MACHINE LEARNING (ML) PROJECTS ---",
    mlSummary,
  ].join("\n\n");

  return {
    pageType: "projects-index",
    pageTitle: "Projects Directory",
    path: rawPath,
    shortLabel: "Projects Listing",
    summary: `Explore all ${PROJECTS.length} hands-on projects grouped into EDA Projects and End-to-End Machine Learning Projects.`,
    starterQuestions: [
      "Which EDA projects are available on this website?",
      "Show me the available End-to-End Machine Learning projects.",
      "Which projects use Scikit-learn and machine learning pipelines?",
      "Which projects include live interactive web demos?",
    ],
    sections,
    fullTextContext: fullText,
    metadata: {
      totalProjects: PROJECTS.length,
      edaCount: edaProjects.length,
      mlCount: mlProjects.length,
      categories: PROJECT_CATEGORIES.map((c) => c.title),
    },
  };
}

/**
 * Builds context for the Homepage (`/`).
 */
function buildHomeContext(rawPath: string): PageContextInfo {
  const sections: ContextSection[] = [
    {
      id: "site-purpose",
      title: "Website Purpose & Mission",
      content:
        "EDA-with-Python is a comprehensive educational platform and project portfolio dedicated to Exploratory Data Analysis (EDA), Data Preprocessing, and End-to-End Machine Learning in Python. It bridges statistical theory with practical code.",
    },
    {
      id: "eda-definition",
      title: "What is Exploratory Data Analysis (EDA)?",
      content:
        "Exploratory Data Analysis is the disciplined practice of taking a first look at raw data without jumping prematurely into complex modeling. It investigates distributions, detects errors/outliers, checks parametric assumptions (normality, equal variance), and uncovers relationships among variables.",
    },
    {
      id: "eda-preprocessing-connection",
      title: "How EDA and Data Preprocessing Connect",
      content:
        "EDA and Preprocessing are interdependent stages in the data science lifecycle:\n" +
        "1. Raw Dataset: Unprocessed real-world measurements with missing entries and noisy types.\n" +
        "2. Exploratory Inspection: Uncovers missingness patterns, skewness, outliers, and collinearity.\n" +
        "3. Targeted Preprocessing: Imputes missing values, applies log/box-cox transformations, encodes categorical variables, and scales features.\n" +
        "4. Model-Ready Splitting: Splits features and targets into training and testing sets without data leakage.",
    },
    {
      id: "interactive-curriculum",
      title: "Interactive EDA Curriculum (Dr. Howard Seltman, CMU)",
      content:
        "The platform includes a 6-module, 21-lesson curriculum based on Dr. Howard Seltman's Carnegie Mellon University textbook (Experimental Design and Analysis, Chapter 4, pp. 61–100). Available at /learn. Textbook PDF: https://www.stat.cmu.edu/~hseltman/309/Book/Book.pdf",
    },
    {
      id: "featured-projects",
      title: "Available Projects on the Site",
      content: `The site features ${PROJECTS.length} real-world projects across EDA and End-to-End Machine Learning, including California House Price Prediction, Retail Discount vs Profit, Titanic Survival, Mental Health Signal, Credit Risk Assessment, NYC Airbnb Room Type Predictor, and Amazon Conveyor EDA.`,
    },
  ];

  const fullText = [
    "CURRENT PAGE: Homepage (EDA-with-Python)",
    `URL PATH: ${rawPath}`,
    "WEBSITE: EDA-with-Python Documentation & Learning Platform",
    "",
    ...sections.map((s) => `[SECTION: ${s.title}]\n${s.content}`),
  ].join("\n\n");

  return {
    pageType: "home",
    pageTitle: "Home: Exploratory Data Analysis Guide",
    path: rawPath,
    shortLabel: "Home: Foundations",
    summary:
      "A comprehensive guide to Exploratory Data Analysis, Data Preprocessing, and Machine Learning workflows with hands-on projects and interactive learning lessons.",
    starterQuestions: [
      "What is this website about and what can I learn here?",
      "What is the difference between EDA and Data Preprocessing?",
      "Tell me about the interactive EDA curriculum based on Dr. Seltman's book.",
      "What hands-on projects can I explore?",
    ],
    sections,
    fullTextContext: fullText,
    metadata: {
      cmuBookUrl: "https://www.stat.cmu.edu/~hseltman/309/Book/Book.pdf",
      totalProjects: PROJECTS.length,
    },
  };
}

/**
 * Builds context for the Learning Curriculum Roadmap (`/learn`).
 */
function buildLearnIndexContext(rawPath: string): PageContextInfo {
  const modules = getAllModules();
  const allTopics = getAllTopics();

  const moduleSummaries = modules
    .map(
      (m) =>
        `Module ${m.order}: ${m.title}\n` +
        `  - Short Title: ${m.shortTitle}\n` +
        `  - Citation: ${m.pdfReference}\n` +
        `  - Description: ${m.description}\n` +
        `  - Lessons: ${m.topics.map((t) => t.title).join(", ")}`,
    )
    .join("\n\n");

  const sections: ContextSection[] = [
    {
      id: "curriculum-overview",
      title: "Curriculum Overview",
      content: `A 6-module, 21-lesson curriculum grounded in Dr. Howard Seltman's Carnegie Mellon University text (Experimental Design and Analysis, Chapter 4, pp. 61–100). Total estimated study time: ~${Math.round(allTopics.reduce((a, b) => a + b.estimatedMinutes, 0) / 60)} hours.`,
    },
    {
      id: "taxonomy-matrix",
      title: "The 2×2 Taxonomy of EDA",
      content:
        "All EDA is categorized into 4 quadrants:\n" +
        "1. Univariate Non-Graphical (Module 2): Tabulation, center (mean, median), spread (s, IQR), skewness, kurtosis.\n" +
        "2. Univariate Graphical (Module 3): Histograms (Freedman-Diaconis), Stem-and-leaf, Boxplots (1.5*IQR), Q-Q plots.\n" +
        "3. Multivariate Non-Graphical (Module 4): Cross-tabulation (row %, col %), grouped statistics (informal ANOVA), covariance, correlation.\n" +
        "4. Multivariate Graphical (Module 5): Grouped barplots, side-by-side boxplots, multi-variable scatterplots (Fig 4.16).",
    },
    {
      id: "module-breakdown",
      title: "Module Breakdown",
      content: moduleSummaries,
    },
  ];

  const fullText = [
    "CURRENT PAGE: EDA Learning Roadmap (/learn)",
    `URL PATH: ${rawPath}`,
    `TOTAL MODULES: ${modules.length}`,
    `TOTAL LESSONS: ${allTopics.length}`,
    "",
    ...sections.map((s) => `[SECTION: ${s.title}]\n${s.content}`),
  ].join("\n\n");

  return {
    pageType: "learn-index",
    pageTitle: "EDA Learning Roadmap",
    path: rawPath,
    shortLabel: "Learn: Roadmap",
    summary:
      "Comprehensive 6-module, 21-lesson interactive EDA curriculum based on Dr. Howard Seltman's Carnegie Mellon University textbook.",
    starterQuestions: [
      "What is Dr. Seltman's 2×2 taxonomy of EDA?",
      "Which module teaches histograms, boxplots, and Q-Q plots?",
      "What is the difference between univariate and multivariate EDA?",
      "Where does the curriculum discuss degrees of freedom and pooled variance?",
    ],
    sections,
    fullTextContext: fullText,
    metadata: {
      moduleCount: modules.length,
      lessonCount: allTopics.length,
    },
  };
}

/**
 * Builds context for an individual Learning Lesson (`/learn/$topicId`).
 */
function buildLearnTopicContext(topicSlug: string, rawPath: string): PageContextInfo {
  const topic: LearningTopic | undefined = getTopicBySlug(topicSlug);

  if (!topic) {
    return {
      pageType: "learn-topic",
      pageTitle: `Lesson: ${topicSlug}`,
      path: rawPath,
      shortLabel: `Lesson: ${topicSlug}`,
      summary: `Lesson '${topicSlug}' was not found in the curriculum registry.`,
      starterQuestions: ["What lessons are available in the EDA curriculum?"],
      sections: [],
      fullTextContext: `LESSON NOT FOUND: Lesson '${topicSlug}' does not exist in the curriculum.`,
      metadata: {},
    };
  }

  const sections: ContextSection[] = [
    {
      id: "lesson-overview",
      title: "Lesson Overview & Objectives",
      content: `Title: ${topic.title}\nSubtitle: ${topic.subtitle}\nSummary: ${topic.summary}\nPrerequisites: ${topic.prerequisites.join(", ")}\nEstimated Time: ${topic.estimatedMinutes} minutes`,
    },
  ];

  for (const s of topic.sections) {
    const lines: string[] = [];
    if (s.content) lines.push(...s.content);
    if (s.steps) lines.push(...s.steps.map((st, i) => `${i + 1}. ${st}`));
    if (s.bullets) lines.push(...s.bullets.map((b) => `• ${b}`));
    if (s.formula) {
      lines.push(`\nFormula: ${s.formula.title} (${s.formula.displayFormula})`);
      lines.push(`Intuition: ${s.formula.intuition}`);
      if (s.formula.exampleCalculation) {
        lines.push(`Example Given: ${s.formula.exampleCalculation.given}`);
        lines.push(`Result: ${s.formula.exampleCalculation.result}`);
      }
    }
    if (s.code) {
      lines.push(`\nPython Implementation:\n\`\`\`python\n${s.code.code}\n\`\`\``);
      if (s.code.explanation) lines.push(`Code Note: ${s.code.explanation}`);
    }
    if (s.mistakes) {
      lines.push(`\nCommon Mistakes:\n${s.mistakes.map((m) => `✕ ${m}`).join("\n")}`);
    }

    if (lines.length > 0) {
      sections.push({
        id: s.id,
        title: s.title,
        content: lines.join("\n\n"),
      });
    }
  }

  if (topic.takeaways && topic.takeaways.length > 0) {
    sections.push({
      id: "key-takeaways",
      title: "Key Takeaways",
      content: topic.takeaways.map((t) => `✓ ${t}`).join("\n"),
    });
  }

  const fullText = [
    `CURRENT PAGE: Lesson ${topic.globalOrder}: ${topic.title}`,
    `URL PATH: ${rawPath}`,
    `SUBTITLE: ${topic.subtitle}`,
    `SUMMARY: ${topic.summary}`,
    "",
    ...sections.map((s) => `[SECTION: ${s.title}]\n${s.content}`),
  ].join("\n\n");

  return {
    pageType: "learn-topic",
    pageTitle: `Lesson ${topic.globalOrder}: ${topic.title}`,
    path: rawPath,
    shortLabel: topic.title,
    summary: topic.summary,
    starterQuestions: [
      `What is the main concept taught in ${topic.title}?`,
      `Explain the mathematical intuition or formula for this topic.`,
      `What are the most common beginner mistakes to avoid here?`,
      `How do I implement this in Python?`,
    ],
    sections,
    fullTextContext: fullText,
    metadata: {
      lessonNumber: topic.globalOrder,
      moduleId: topic.moduleId,
      estimatedMinutes: topic.estimatedMinutes,
    },
  };
}

/**
 * Primary API: Returns structured, complete, authoritative context for any route.
 */
export function getPageContext(pathname: string): PageContextInfo {
  const { type, slug } = normalizeRoute(pathname);

  switch (type) {
    case "project-detail":
      return buildProjectDetailContext(slug || "", pathname);
    case "projects-index":
      return buildProjectsIndexContext(pathname);
    case "learn-index":
      return buildLearnIndexContext(pathname);
    case "learn-topic":
      return buildLearnTopicContext(slug || "", pathname);
    case "home":
    default:
      return buildHomeContext(pathname);
  }
}

/**
 * Builds the strict, grounded system prompt for OneTag AI or an external LLM.
 */
export function buildSystemPrompt(context: PageContextInfo): string {
  return `You are Eddie, the official educational AI assistant for the "EDA-with-Python" website.

CURRENT VISITOR CONTEXT:
- Active Page: "${context.pageTitle}"
- Page URL: ${context.path}
- Page Type: ${context.pageType}

STRICT OPERATIONAL RULES:
1. GROUNDED IN PAGE CONTEXT: The visitor is currently looking at "${context.pageTitle}". Prioritize the information provided in the CURRENT PAGE CONTENT above all else.
2. ACCURACY & NO FABRICATION:
   - NEVER invent or guess dataset sizes, statistical metrics, accuracy scores, model parameters, or algorithms not explicitly stated in the context.
   - If the user asks for information that is NOT documented on this page (e.g., an undocumented metric or details of a different project), explicitly state: "Based on the documentation for this page, that information is not documented here."
3. CONTEXT NAVIGATION:
   - If the visitor asks about a different project or topic available on the site, inform them that they are currently on "${context.pageTitle}", provide a brief helpful pointer, and direct them to the appropriate URL (e.g., /projects/<slug> or /learn/<topicId>).
4. TONE & EXPLANATION:
   - Keep answers clear, educational, and structured.
   - When answering technical questions, provide intuitive explanation, technical definition, and Python code if appropriate.
   - Speak directly to the visitor as a helpful data science mentor.`;
}
