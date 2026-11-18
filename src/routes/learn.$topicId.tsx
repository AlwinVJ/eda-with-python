import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTopicBySlug, type LearningTopic } from "@/data/learning";
import { TopicView } from "@/components/learning/TopicView";
import { LearningSidebar } from "@/components/learning/LearningSidebar";

export const Route = createFileRoute("/learn/$topicId")({
  loader: ({ params }): { topic: LearningTopic } => {
    const topic = getTopicBySlug(params.topicId);
    if (!topic) {
      throw notFound();
    }
    return { topic };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Lesson Not Found · Learn EDA" }, { name: "robots", content: "noindex" }],
      };
    }
    const { topic } = loaderData;
    return {
      meta: [
        { title: `${topic.title} · Learn EDA` },
        { name: "description", content: topic.summary },
        { property: "og:title", content: `${topic.title} · Learn EDA` },
        { property: "og:description", content: topic.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: LearnTopicPage,
  notFoundComponent: () => (
    <div className="py-16 text-center space-y-3">
      <h1 className="text-2xl font-semibold text-foreground">Lesson Not Found</h1>
      <p className="text-muted-foreground">The requested EDA learning lesson does not exist.</p>
    </div>
  ),
});

function LearnTopicPage() {
  const { topic } = Route.useLoaderData();

  return (
    <div className="flex flex-col lg:flex-row -mx-3 sm:-mx-6 md:-mx-8 -my-6 sm:-my-8">
      {/* Sidebar Navigation (Desktop sticky, Mobile inline accordion) */}
      <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
        <LearningSidebar currentTopicSlug={topic.slug} />
      </div>

      {/* Main Lesson Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto py-2 px-2 sm:px-4 lg:px-8">
        <TopicView topic={topic} />
      </main>
    </div>
  );
}
