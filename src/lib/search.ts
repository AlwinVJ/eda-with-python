import {
  PROJECTS,
  getProjectCategoryMeta,
  type Project,
  type ProjectCategoryId,
} from "@/data/projects";
import { getProjectDetails, PROJECT_SECTION_ORDER } from "@/data/projectDetails";

export interface ProjectSearchResult {
  type: "project";
  id: string;
  slug: string;
  title: string;
  category: ProjectCategoryId;
  categoryBadge: string;
  description: string;
  librariesUsed: string[];
  tags: string[];
  difficulty: string;
  dataset?: string;
  href: string;
  score: number;
  matchingText?: string;
}

export interface SectionSearchResult {
  type: "section";
  id: string;
  slug: string;
  sectionId: string;
  sectionTitle: string;
  projectTitle: string;
  category: ProjectCategoryId;
  categoryBadge: string;
  href: string;
  snippet: string;
  score: number;
}

export type SearchResult = ProjectSearchResult | SectionSearchResult;

interface SearchableSection {
  slug: string;
  projectTitle: string;
  category: ProjectCategoryId;
  categoryBadge: string;
  sectionId: string;
  sectionTitle: string;
  content: string;
}

/** Pre-built flattened searchable sections extracted from project details */
function buildSearchableSections(): SearchableSection[] {
  const sections: SearchableSection[] = [];

  for (const project of PROJECTS) {
    const details = getProjectDetails(project.slug);
    if (!details) continue;

    const categoryMeta = getProjectCategoryMeta(project.category);

    for (const { id: sectionId, title: sectionTitle } of PROJECT_SECTION_ORDER) {
      const section = details[sectionId];
      if (!section) continue;

      const textParts: string[] = [];

      if (section.body) {
        textParts.push(...section.body);
      }
      if (section.bullets) {
        textParts.push(...section.bullets);
      }
      if (section.steps) {
        textParts.push(...section.steps);
      }
      if (section.subsections) {
        for (const sub of section.subsections) {
          textParts.push(sub.title);
          if (sub.body) textParts.push(...sub.body);
          if (sub.bullets) textParts.push(...sub.bullets);
          if (sub.steps) textParts.push(...sub.steps);
        }
      }

      const content = textParts.join(" ");
      if (content.trim()) {
        sections.push({
          slug: project.slug,
          projectTitle: project.title,
          category: project.category,
          categoryBadge: categoryMeta.badge,
          sectionId,
          sectionTitle,
          content,
        });
      }
    }
  }

  return sections;
}

const SEARCHABLE_SECTIONS: SearchableSection[] = buildSearchableSections();

/** Extract a clean contextual snippet centered around the matching query */
function extractSnippet(text: string, query: string, maxLen = 140): string {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
  }

  const half = Math.floor(maxLen / 2);
  let start = Math.max(0, index - half);
  let end = Math.min(text.length, index + lowerQuery.length + half);

  // Adjust to word boundaries where practical
  if (start > 0) {
    const spaceBefore = text.lastIndexOf(" ", start);
    if (spaceBefore > start - 15 && spaceBefore !== -1) {
      start = spaceBefore + 1;
    }
  }
  if (end < text.length) {
    const spaceAfter = text.indexOf(" ", end);
    if (spaceAfter !== -1 && spaceAfter < end + 15) {
      end = spaceAfter;
    }
  }

  let snippet = text.slice(start, end).trim();
  if (start > 0) snippet = `…${snippet}`;
  if (end < text.length) snippet = `${snippet}…`;

  return snippet;
}

/** Check if all search tokens are matched across an array of fields */
function matchesAllTokens(tokens: string[], fields: string[]): boolean {
  const combined = fields.join(" ").toLowerCase();
  return tokens.every((token) => combined.includes(token));
}

/** Popular keywords to suggest in the initial empty search state */
export const POPULAR_SEARCH_TERMS = [
  "EDA",
  "Regression",
  "Classification",
  "ANOVA",
  "Random Forest",
  "XGBoost",
  "Correlation",
  "Visualization",
  "Netflix",
  "Pricing Strategy",
];

/** Search all projects and rich project detail sections */
export function searchGlobal(rawQuery: string): {
  projects: ProjectSearchResult[];
  sections: SectionSearchResult[];
  total: number;
} {
  const query = rawQuery.trim();
  if (!query) {
    return { projects: [], sections: [], total: 0 };
  }

  const lowerQuery = query.toLowerCase();
  const rootQuery =
    lowerQuery.length > 4 && lowerQuery.endsWith("s") ? lowerQuery.slice(0, -1) : lowerQuery;
  const tokens = lowerQuery.split(/\s+/).filter(Boolean);
  const rootTokens = tokens.map((t) => (t.length > 4 && t.endsWith("s") ? t.slice(0, -1) : t));

  const matchedProjects: ProjectSearchResult[] = [];
  const matchedSections: SectionSearchResult[] = [];

  // 1. Search Projects
  for (const project of PROJECTS) {
    const categoryMeta = getProjectCategoryMeta(project.category);
    const titleLower = project.title.toLowerCase();
    const descLower = project.description.toLowerCase();
    const tagsLower = project.tags.map((t) => t.toLowerCase());
    const libsLower = project.librariesUsed.map((l) => l.toLowerCase());
    const skillsLower = project.skillsLearned.map((s) => s.toLowerCase());
    const workflowLower = (project.workflow || []).map((w) => w.toLowerCase());
    const datasetLower = (project.dataset || "").toLowerCase();
    const problemLower = (project.businessProblem || "").toLowerCase();
    const resultsLower = (project.results || "").toLowerCase();

    let score = 0;
    let matchingText: string | undefined;

    // Exact title match
    if (titleLower === lowerQuery) {
      score += 1000;
    } else if (titleLower.startsWith(lowerQuery)) {
      score += 600;
    } else if (titleLower.includes(lowerQuery) || titleLower.includes(rootQuery)) {
      score += 400;
    } else if (tokens.every((t) => titleLower.includes(t))) {
      score += 300;
    }

    // Technology / Libraries match
    for (const lib of project.librariesUsed) {
      const libLower = lib.toLowerCase();
      if (libLower === lowerQuery) {
        score += 350;
        matchingText = `Technology: ${lib}`;
      } else if (libLower.includes(lowerQuery) || libLower.includes(rootQuery)) {
        score += 250;
        matchingText = `Technology: ${lib}`;
      }
    }

    // Tags match
    for (const tag of project.tags) {
      const tagLower = tag.toLowerCase();
      if (tagLower === lowerQuery) {
        score += 300;
        matchingText = `Tag: #${tag}`;
      } else if (
        tagLower.includes(lowerQuery) ||
        tagLower.includes(rootQuery) ||
        (rootQuery.length >= 4 && tagLower.includes(rootQuery.slice(0, 4)))
      ) {
        score += 220;
        matchingText = `Tag: #${tag}`;
      }
    }

    // Category match (e.g. "eda" -> "EDA Project", "ml" -> "End-to-End ML")
    if (
      project.category.toLowerCase().includes(lowerQuery) ||
      categoryMeta.badge.toLowerCase().includes(lowerQuery) ||
      categoryMeta.title.toLowerCase().includes(lowerQuery)
    ) {
      score += 200;
    }

    // Workflow match
    for (const step of project.workflow || []) {
      const stepLower = step.toLowerCase();
      if (stepLower.includes(lowerQuery) || stepLower.includes(rootQuery)) {
        score += 220;
        matchingText =
          matchingText || `Workflow: ${step.length > 60 ? `${step.slice(0, 60)}…` : step}`;
      }
    }

    // Skills match
    for (const skill of project.skillsLearned) {
      const skillLower = skill.toLowerCase();
      if (skillLower.includes(lowerQuery) || skillLower.includes(rootQuery)) {
        score += 180;
        matchingText = matchingText || `Skill: ${skill}`;
      }
    }

    // Dataset match
    if (datasetLower.includes(lowerQuery)) {
      score += 180;
      matchingText = matchingText || `Dataset: ${project.dataset}`;
    }

    // Description / Business Problem match
    if (descLower.includes(lowerQuery) || descLower.includes(rootQuery)) {
      score += 120;
    }
    if (problemLower.includes(lowerQuery) || problemLower.includes(rootQuery)) {
      score += 100;
    }
    if (resultsLower.includes(lowerQuery) || resultsLower.includes(rootQuery)) {
      score += 100;
    }

    // Multi-token match across all fields
    const allProjectFields = [
      project.title,
      project.description,
      project.category,
      categoryMeta.badge,
      ...project.librariesUsed,
      ...project.tags,
      ...project.skillsLearned,
      ...(project.workflow || []),
      project.dataset || "",
      project.businessProblem || "",
      project.results || "",
    ];

    if (
      tokens.length > 1 &&
      (matchesAllTokens(tokens, allProjectFields) || matchesAllTokens(rootTokens, allProjectFields))
    ) {
      score += 250;
    }

    if (score > 0) {
      matchedProjects.push({
        type: "project",
        id: project.slug,
        slug: project.slug,
        title: project.title,
        category: project.category,
        categoryBadge: categoryMeta.badge,
        description: project.description,
        librariesUsed: project.librariesUsed,
        tags: project.tags,
        difficulty: project.difficulty,
        dataset: project.dataset,
        href: `/projects/${project.slug}`,
        score,
        matchingText,
      });
    }
  }

  // 2. Search Project Detail Sections
  for (const sec of SEARCHABLE_SECTIONS) {
    const secTitleLower = sec.sectionTitle.toLowerCase();
    const contentLower = sec.content.toLowerCase();

    let score = 0;

    // Exact or partial query in section title
    if (secTitleLower === lowerQuery) {
      score += 500;
    } else if (secTitleLower.includes(lowerQuery) || secTitleLower.includes(rootQuery)) {
      score += 300;
    } else if (tokens.every((t) => secTitleLower.includes(t))) {
      score += 200;
    }

    // Query in content text
    if (contentLower.includes(lowerQuery) || contentLower.includes(rootQuery)) {
      score += 200;
    } else if (
      tokens.length > 1 &&
      (matchesAllTokens(tokens, [sec.projectTitle, sec.sectionTitle, sec.content]) ||
        matchesAllTokens(rootTokens, [sec.projectTitle, sec.sectionTitle, sec.content]))
    ) {
      score += 160;
    } else {
      // Individual token matches
      let tokenMatches = 0;
      for (const t of tokens) {
        if (contentLower.includes(t)) tokenMatches++;
      }
      if (tokenMatches > 0) {
        score += tokenMatches * 30;
      }
    }

    if (score > 0) {
      const snippet = extractSnippet(sec.content, query);
      matchedSections.push({
        type: "section",
        id: `${sec.slug}-${sec.sectionId}`,
        slug: sec.slug,
        sectionId: sec.sectionId,
        sectionTitle: sec.sectionTitle,
        projectTitle: sec.projectTitle,
        category: sec.category,
        categoryBadge: sec.categoryBadge,
        href: `/projects/${sec.slug}#${sec.sectionId}`,
        snippet,
        score,
      });
    }
  }

  // Sort descending by score
  matchedProjects.sort((a, b) => b.score - a.score);
  matchedSections.sort((a, b) => b.score - a.score);

  return {
    projects: matchedProjects,
    sections: matchedSections,
    total: matchedProjects.length + matchedSections.length,
  };
}

/** Get top featured projects for initial search state */
export function getInitialSuggestions(): Project[] {
  return PROJECTS.filter((p) => p.featured || p.order === 1).slice(0, 5);
}
