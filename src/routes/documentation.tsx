import { createFileRoute, Link } from '@tanstack/react-router';
import { BookOpen, FileStack, Database, Library, ArrowRight } from 'lucide-react';
import { getAllHandbooks, getAllCheatsheets, getAllDatasets, getAllResources } from '@/lib/content';

export const Route = createFileRoute('/documentation')({
  head: () => ({
    meta: [
      { title: 'Documentation · EDA with Python Docs' },
      { name: 'description', content: 'Handbooks, cheatsheets, datasets, and curated resources.' },
      { property: 'og:title', content: 'Documentation' },
      { property: 'og:description', content: 'Handbooks, cheatsheets, datasets, and curated resources.' },
    ],
  }),
  component: DocumentationPage,
});

function DocumentationPage() {
  const sections = [
    { to: '/handbooks' as const, title: 'Handbooks', icon: BookOpen, count: getAllHandbooks().length, description: 'In-depth references for each library and workflow.' },
    { to: '/cheatsheets' as const, title: 'Cheatsheets', icon: FileStack, count: getAllCheatsheets().length, description: 'Quick visual references to keep open while working.' },
    { to: '/datasets' as const, title: 'Datasets', icon: Database, count: getAllDatasets().length, description: 'Every dataset used across the projects.' },
    { to: '/resources' as const, title: 'Resources', icon: Library, count: getAllResources().length, description: 'Curated external books, docs, courses, and papers.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Documentation</h1>
        <p className="mt-2 text-muted-foreground">
          Everything you need for reference while working through a project.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link key={s.to} to={s.to} className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <s.icon className="h-5 w-5 text-foreground" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold group-hover:text-accent">{s.title}</h2>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.count} available</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
