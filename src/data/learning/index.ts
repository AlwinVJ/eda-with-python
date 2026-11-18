import { LEARNING_MODULES } from "./modules";
import type { LearningModule, LearningTopic } from "./types";
import { module1Topics } from "./topics/module1-foundations";
import { module2Topics } from "./topics/module2-univariate-non-graph";
import { module3Topics } from "./topics/module3-univariate-graphical";
import { module4Topics } from "./topics/module4-multivariate-non-graph";
import { module5Topics } from "./topics/module5-multivariate-graphical";
import { module6Topics } from "./topics/module6-statistical-principles";

export * from "./types";
export * from "./modules";

export const allLearningTopics: LearningTopic[] = [
  ...module1Topics,
  ...module2Topics,
  ...module3Topics,
  ...module4Topics,
  ...module5Topics,
  ...module6Topics,
];

const topicMap = new Map<string, LearningTopic>(
  allLearningTopics.map((topic) => [topic.slug, topic]),
);

const moduleMap = new Map<string, LearningModule>(
  LEARNING_MODULES.map((mod: LearningModule) => [mod.id, mod]),
);

export function getAllTopics(): LearningTopic[] {
  return allLearningTopics;
}

export function getTopicBySlug(slug: string): LearningTopic | undefined {
  return topicMap.get(slug);
}

export function getAllModules(): LearningModule[] {
  return LEARNING_MODULES;
}

export function getModuleById(id: string): LearningModule | undefined {
  return moduleMap.get(id);
}

export function getTopicsByModule(moduleId: string): LearningTopic[] {
  return allLearningTopics.filter((t) => t.moduleId === moduleId);
}

export function getTopicNavigation(slug: string): {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
} {
  const currentIndex = allLearningTopics.findIndex((t) => t.slug === slug);
  if (currentIndex === -1) return {};

  const prev =
    currentIndex > 0
      ? {
          slug: allLearningTopics[currentIndex - 1].slug,
          title: allLearningTopics[currentIndex - 1].title,
        }
      : undefined;

  const next =
    currentIndex < allLearningTopics.length - 1
      ? {
          slug: allLearningTopics[currentIndex + 1].slug,
          title: allLearningTopics[currentIndex + 1].title,
        }
      : undefined;

  return { prev, next };
}
