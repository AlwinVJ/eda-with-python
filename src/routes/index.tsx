import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getAllHandbooks, getRepoStats } from '@/lib/content';
import { getFeaturedProjects } from '@/data/projects';
import { getFeaturedReferences } from '@/data/references';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { HandbookCard } from '@/components/cards/HandbookCard';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'EDA With Python — Documentation' },
      { name: 'description', content: 'A practical, project-driven roadmap for mastering modern Data Science.' },
      { property: 'og:title', content: 'EDA With Python — Documentation' },
      { property: 'og:description', content: 'A practical, project-driven roadmap for mastering modern Data Science.' },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const latestHandbooks = getAllHandbooks().slice(0, 2);
  const featuredReferences = getFeaturedReferences();
  const stats = getRepoStats();

  return (
    <div className="space-y-16">
      <section className="space-y-5 border-b border-border pb-10">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Data Preprocessing & EDA with Python
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          A practical, project-driven roadmap for mastering modern Data Science.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link to="/learning-guide" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover">
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/projects" className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            Browse Projects
          </Link>
          <Link to="/handbooks" className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            Read Handbooks
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Featured Projects</h2>
          <Link to="/projects" className="text-sm text-accent hover:text-primary hover:underline transition-colors">View all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest Handbooks</h2>
          <Link to="/handbooks" className="text-sm text-accent hover:text-primary hover:underline transition-colors">View all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {latestHandbooks.map((h) => <HandbookCard key={h.slug} handbook={h} />)}
        </div>
      </section>

      {featuredReferences.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Featured References</h2>
            <Link to="/references" className="text-sm text-accent hover:text-primary hover:underline transition-colors">View all →</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredReferences.map((r) => (
              <a key={r.id} href={r.url} target="_blank" rel="noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40">
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{r.type}</div>
                  <h3 className="mt-1 text-sm font-medium group-hover:text-accent">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-lg font-semibold">At a Glance</h2>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="rounded-xl border border-border p-4 text-center">
              <dt className="text-2xl font-semibold">{value}</dt>
              <dd className="mt-1 text-xs capitalize text-muted-foreground">{key}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
