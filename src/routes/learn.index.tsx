import { createFileRoute } from "@tanstack/react-router";
import { LearningRoadmap } from "@/components/learning/LearningRoadmap";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Learn EDA · Exploratory Data Analysis Learning Roadmap" },
      {
        name: "description",
        content:
          "Comprehensive, absolute-beginner-friendly Exploratory Data Analysis (EDA) curriculum based on Dr. Howard Seltman's Carnegie Mellon University textbook. 6 modules, 21 in-depth lessons, formulas, Python code, and quizzes.",
      },
      { property: "og:title", content: "Learn EDA · Comprehensive Roadmap" },
      {
        property: "og:description",
        content:
          "Master the art and science of EDA: non-graphical & graphical univariate and multivariate analysis, formulas, and Python code.",
      },
    ],
  }),
  component: LearnRoadmapPage,
});

function LearnRoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <LearningRoadmap />
    </div>
  );
}
