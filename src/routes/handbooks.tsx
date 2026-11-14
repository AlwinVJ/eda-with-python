import { createFileRoute } from "@tanstack/react-router";
import { getAllHandbooks } from "@/lib/content";
import { HandbookCard } from "@/components/cards/HandbookCard";

export const Route = createFileRoute("/handbooks")({
  head: () => ({
    meta: [
      { title: "Handbooks · EDA with Python Docs" },
      { name: "description", content: "In-depth references for each library and workflow." },
      { property: "og:title", content: "Handbooks" },
      { property: "og:description", content: "In-depth references for each library and workflow." },
    ],
  }),
  component: HandbooksPage,
});

function HandbooksPage() {
  const handbooks = getAllHandbooks();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Handbooks</h1>
        <p className="mt-2 text-muted-foreground">
          In-depth references for each library and workflow used across the projects. Start with the
          first two before moving on to a project.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {handbooks.map((h) => (
          <HandbookCard key={h.slug} handbook={h} />
        ))}
      </div>
    </div>
  );
}
