import { createFileRoute } from "@tanstack/react-router";
import { getAllDatasets } from "@/lib/content";
import { DatasetCard } from "@/components/cards/DatasetCard";

export const Route = createFileRoute("/datasets/")({
  head: () => ({
    meta: [
      { title: "Datasets · EDA with Python Docs" },
      {
        name: "description",
        content: "Every dataset used across the projects, with feature breakdowns.",
      },
      { property: "og:title", content: "Datasets" },
      {
        property: "og:description",
        content: "Every dataset used across the projects, with feature breakdowns.",
      },
    ],
  }),
  component: DatasetsPage,
});

function DatasetsPage() {
  const datasets = getAllDatasets();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Datasets</h1>
        <p className="mt-2 text-muted-foreground">
          Every dataset used across the projects, with a feature breakdown and the projects it
          powers.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {datasets.map((d) => (
          <DatasetCard key={d.slug} dataset={d} />
        ))}
      </div>
    </div>
  );
}
