import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ExternalLink, ArrowRight, Clock } from 'lucide-react';
import { getDocsByCategory } from '@/data/docs';
import type { Doc } from '@/data/docs';
import { DifficultyBadge } from '@/components/ui/badge';

export const Route = createFileRoute('/docs/')({
  head: () => ({
    meta: [
      { title: 'Documentation · EDA with Python Docs' },
      { name: 'description', content: 'All documentation, grouped by topic — Python, NumPy, Pandas, EDA, ML, and more.' },
      { property: 'og:title', content: 'Documentation' },
      { property: 'og:description', content: 'All documentation, grouped by topic — Python, NumPy, Pandas, EDA, ML, and more.' },
    ],
  }),
  component: DocsIndexPage,
});

function DocsIndexPage() {
  const groups = getDocsByCategory();

  // Scroll to the section referenced in the URL hash (used by sidebar).
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Documentation</h1>
        <p className="mt-2 text-muted-foreground">
          Handbooks and topic guides for every step of the roadmap. Add or reorder items by editing <code className="rounded bg-muted px-1 py-0.5 text-xs">src/data/docs.ts</code>.
        </p>
      </div>

      {groups.map(({ category, docs }) => (
        <section key={category.id} id={category.anchor} className="scroll-mt-20">
          <div className="mb-3 flex items-center gap-2">
            <category.icon className="h-4 w-4 text-accent" />
            <h2 className="text-lg font-semibold">{category.title}</h2>
            <span className="text-xs text-muted-foreground">· {docs.length}</span>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">{category.description}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {docs.map((doc) => <DocCard key={doc.id} doc={doc} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function DocCard({ doc }: { doc: Doc }) {
  const Icon = doc.icon;
  return (
    <Link
      to="/docs/$slug"
      params={{ slug: doc.slug }}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {Icon ? (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <Icon className="h-4 w-4 text-foreground" />
            </span>
          ) : null}
          <div>
            <h3 className="font-semibold leading-snug group-hover:text-accent">{doc.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{doc.description}</p>
          </div>
        </div>
        <DifficultyBadge difficulty={doc.difficulty} />
      </div>
      <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {doc.estimatedReadingTime}
        </span>
        <span className="inline-flex items-center gap-1 text-accent">
          Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      {doc.resourceUrl ? (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <ExternalLink className="h-3 w-3" /> External resource
        </span>
      ) : null}
    </Link>
  );
}
