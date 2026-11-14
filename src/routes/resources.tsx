import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { getAllResources } from "@/lib/content";
import type { ResourceCategory } from "@/lib/types";
import { DifficultyBadge } from "@/components/ui/badge";

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  books: "Books",
  documentation: "Documentation",
  videos: "Videos",
  courses: "Courses",
  "research-papers": "Research Papers",
  "official-links": "Official Links",
};

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources · EDA with Python Docs" },
      {
        name: "description",
        content: "Curated external material — books, docs, courses, papers, and official links.",
      },
      { property: "og:title", content: "Resources" },
      {
        property: "og:description",
        content: "Curated external material — books, docs, courses, papers, and official links.",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const resources = getAllResources();
  const byCategory = (Object.keys(CATEGORY_LABELS) as ResourceCategory[])
    .map((cat) => ({
      cat,
      items: resources.filter((r) => r.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Curated external material — books, docs, courses, papers, and official links.
        </p>
      </div>

      {byCategory.map(({ cat, items }) => (
        <section key={cat}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {CATEGORY_LABELS[cat]}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((r) => (
              <a
                key={r.slug}
                id={r.slug}
                href={r.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent/40"
              >
                <div>
                  <h3 className="text-sm font-medium group-hover:text-accent">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                  <div className="mt-2">
                    <DifficultyBadge difficulty={r.difficulty} />
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
