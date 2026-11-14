import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Film, FileText, Newspaper } from "lucide-react";
import {
  getReferencesByType,
  getActiveReferenceCategories,
  type Reference,
  type ReferenceType,
} from "@/data/references";
import { DifficultyBadge, TechBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/references")({
  head: () => ({
    meta: [
      { title: "References · EDA with Python Docs" },
      {
        name: "description",
        content: "Curated videos, blogs, and articles for every topic in the roadmap.",
      },
      { property: "og:title", content: "References" },
      {
        property: "og:description",
        content: "Curated videos, blogs, and articles for every topic in the roadmap.",
      },
    ],
  }),
  component: ReferencesPage,
});

const TYPE_ICON: Record<ReferenceType, typeof Film> = {
  video: Film,
  blog: FileText,
  article: Newspaper,
};

function ReferencesPage() {
  const groups = getReferencesByType();
  const categories = getActiveReferenceCategories();
  const [filter, setFilter] = useState<string | null>(null);

  // Scroll to type section on hash change.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ block: "start" });
  }, []);

  const filteredGroups = useMemo(() => {
    if (!filter) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((r) => r.category === filter) }))
      .filter((g) => g.items.length > 0);
  }, [filter, groups]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">References</h1>
        <p className="mt-2 text-muted-foreground">
          Hand-picked videos, blogs, and articles that pair well with the handbooks and projects.
          Add new entries in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">src/data/references.ts</code>.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <FilterChip active={filter === null} onClick={() => setFilter(null)}>
          All topics
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
            {c}
          </FilterChip>
        ))}
      </div>

      {filteredGroups.length === 0 ? (
        <p className="text-sm text-muted-foreground">No references match this topic yet.</p>
      ) : null}

      {filteredGroups.map(({ type, items }) => {
        const Icon = TYPE_ICON[type.id];
        return (
          <section key={type.id} id={type.anchor} className="scroll-mt-20">
            <div className="mb-3 flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent" />
              <h2 className="text-lg font-semibold">{type.title}</h2>
              <span className="text-xs text-muted-foreground">· {items.length}</span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">{type.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((r) => (
                <ReferenceCard key={r.id} reference={r} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-2.5 py-1 text-xs transition-colors",
        active
          ? "border-accent bg-accent/15 text-accent"
          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ReferenceCard({ reference: r }: { reference: Reference }) {
  const Icon = TYPE_ICON[r.type];
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[16/9] bg-muted">
        {r.thumbnail ? (
          <img
            src={r.thumbnail}
            alt={`${r.title} thumbnail`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Icon className="h-8 w-8" />
          </div>
        )}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-background/90 px-1.5 py-0.5 text-xs capitalize">
          <Icon className="h-3 w-3" /> {r.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug">{r.title}</h3>
          {r.difficulty ? <DifficultyBadge difficulty={r.difficulty} /> : null}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{r.description}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {r.author ? <span>By {r.author}</span> : null}
          {r.source ? (
            <>
              <span>·</span>
              <span>{r.source}</span>
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <TechBadge>{r.category}</TechBadge>
          {r.tags?.map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>
        <div className="mt-auto pt-2">
          <a
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-sm hover:bg-muted"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open resource
          </a>
        </div>
      </div>
    </div>
  );
}
