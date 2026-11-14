import { createFileRoute } from "@tanstack/react-router";
import { getAllCheatsheets } from "@/lib/content";
import { CheatsheetCard } from "@/components/cards/CheatsheetCard";

export const Route = createFileRoute("/cheatsheets")({
  head: () => ({
    meta: [
      { title: "Cheatsheets · EDA with Python Docs" },
      {
        name: "description",
        content: "Quick visual references to keep open while working through a project.",
      },
      { property: "og:title", content: "Cheatsheets" },
      {
        property: "og:description",
        content: "Quick visual references to keep open while working through a project.",
      },
    ],
  }),
  component: CheatsheetsPage,
});

function CheatsheetsPage() {
  const sheets = getAllCheatsheets();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Cheatsheets</h1>
        <p className="mt-2 text-muted-foreground">
          Quick visual references you can keep open while working through a project.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sheets.map((s) => (
          <CheatsheetCard key={s.slug} sheet={s} />
        ))}
      </div>
    </div>
  );
}
