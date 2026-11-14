import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, Clock } from "lucide-react";
import { getDoc, getDocCategory, getDocNeighbors } from "@/data/docs";
import { DifficultyBadge, TechBadge } from "@/components/ui/badge";

export const Route = createFileRoute("/docs/$slug")({
  loader: ({ params }) => {
    const doc = getDoc(params.slug);
    if (!doc) throw notFound();
    const { icon: _icon, ...serializableDoc } = doc;
    return { doc: serializableDoc };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { doc } = loaderData;
    return {
      meta: [
        { title: `${doc.title} · Documentation` },
        { name: "description", content: doc.description },
        { property: "og:title", content: doc.title },
        { property: "og:description", content: doc.description },
      ],
    };
  },
  component: DocDetailPage,
});

function DocDetailPage() {
  const { doc } = Route.useLoaderData();
  const fullDoc = getDoc(doc.slug);
  const category = getDocCategory(doc.category);
  const { prev, next } = getDocNeighbors(doc.slug);
  const Icon = fullDoc?.icon;

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/docs"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All documentation
        </Link>
        <div className="mt-4 flex items-start gap-3">
          {Icon ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-foreground" />
            </span>
          ) : null}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {category ? <span>{category.title}</span> : null}
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {doc.estimatedReadingTime}
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-semibold leading-snug">{doc.title}</h1>
            <p className="mt-2 text-muted-foreground">{doc.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <DifficultyBadge difficulty={doc.difficulty} />
              {doc.tags.map((t: string) => (
                <TechBadge key={t}>{t}</TechBadge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {doc.body ? (
        <section className="prose-invert max-w-none rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-foreground">
          {doc.body}
        </section>
      ) : null}

      {doc.resourceUrl ? (
        <a
          href={doc.resourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Open resource <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}

      <nav className="grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/docs/$slug"
            params={{ slug: prev.slug }}
            className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
          >
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </span>
            <span className="font-medium group-hover:text-accent">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/docs/$slug"
            params={{ slug: next.slug }}
            className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-accent/40 sm:text-right"
          >
            <span className="inline-flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium group-hover:text-accent">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
