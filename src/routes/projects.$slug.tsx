import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Github, FileText, NotebookPen, Database, ExternalLink } from 'lucide-react';
import {
  getProject, getDataset, getAllHandbooks, getAllCheatsheets, githubUrl, githubBlobUrl,
} from '@/lib/content';
import { DifficultyBadge, StatusBadge, TechBadge } from '@/components/ui/badge';

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }): { project: NonNullable<ReturnType<typeof getProject>> } => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: 'Project not found' }, { name: 'robots', content: 'noindex' }] };
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} · EDA with Python Docs` },
        { name: 'description', content: project.description },
        { property: 'og:title', content: project.title },
        { property: 'og:description', content: project.description },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <p className="mt-2 text-muted-foreground">This project doesn't exist.</p>
    </div>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const dataset = getDataset(project.dataset);
  const relatedHandbooks = getAllHandbooks().filter((h) => project.relatedHandbooks?.includes(h.slug));
  const relatedCheatsheets = getAllCheatsheets().filter((c) => project.relatedCheatsheets?.includes(c.slug));

  return (
    <article className="space-y-10">
      <header className="space-y-3 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={project.difficulty} />
          <StatusBadge status={project.status} />
          {project.estimatedTime && <span className="text-xs text-muted-foreground">{project.estimatedTime}</span>}
        </div>
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.librariesUsed.map((l: string) => <TechBadge key={l}>{l}</TechBadge>)}
        </div>
      </header>

      <Section title="Business Problem">
        <p className="text-sm text-muted-foreground">{project.businessProblem}</p>
      </Section>

      <Section title="Workflow">
        <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
          {project.workflow.map((step: string, i: number) => <li key={i}>{step}</li>)}
        </ol>
      </Section>

      <Section title="Skills Learned">
        <div className="flex flex-wrap gap-1.5">
          {project.skillsLearned.map((s: string) => (
            <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs">{s}</span>
          ))}
        </div>
      </Section>

      {project.results && (
        <Section title="Results"><p className="text-sm text-muted-foreground">{project.results}</p></Section>
      )}

      {project.lessonsLearned && (
        <Section title="Lessons Learned"><p className="text-sm text-muted-foreground">{project.lessonsLearned}</p></Section>
      )}

      <Section title="Explore This Project">
        <div className="flex flex-wrap gap-2 text-sm">
          {project.files.notebook && (
            <a href={githubBlobUrl(`${project.githubPath}/${project.files.notebook}`)} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted">
              <NotebookPen className="h-4 w-4" /> Open Notebook
            </a>
          )}
          {project.files.report && (
            <a href={githubBlobUrl(`${project.githubPath}/${project.files.report}`)} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted">
              <FileText className="h-4 w-4" /> Report
            </a>
          )}
          <a href={githubUrl(project.githubPath)} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted">
            <Github className="h-4 w-4" /> View Source Code (GitHub)
          </a>
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </Section>

      {dataset && (
        <Section title="Dataset">
          <Link to="/datasets/$slug" params={{ slug: dataset.slug }} className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-primary hover:underline transition-colors">
            <Database className="h-4 w-4" /> {dataset.title}
          </Link>
        </Section>
      )}

      {project.visualizations && project.visualizations.length > 0 && (
        <Section title="Visualizations">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.visualizations.map((v: string) => (
              <img
                key={v}
                src={githubBlobUrl(`${project.githubPath}/${v}`).replace('/blob/', '/raw/')}
                alt={`${project.title} visualization`}
                className="w-full rounded-lg border border-border object-cover"
              />
            ))}
          </div>
        </Section>
      )}

      {(relatedHandbooks.length > 0 || relatedCheatsheets.length > 0) && (
        <Section title="Related Documentation">
          <ul className="space-y-1 text-sm">
            {relatedHandbooks.map((h) => (
              <li key={h.slug}><a href={`/handbooks#${h.slug}`} className="text-accent hover:text-primary hover:underline transition-colors">{h.title} (Handbook)</a></li>
            ))}
            {relatedCheatsheets.map((c) => (
              <li key={c.slug}><a href={`/cheatsheets#${c.slug}`} className="text-accent hover:text-primary hover:underline transition-colors">{c.title} (Cheatsheet)</a></li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}
