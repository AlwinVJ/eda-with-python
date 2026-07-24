import { createFileRoute } from '@tanstack/react-router';
import { getAllProjects } from '@/lib/content';
import { ProjectCard } from '@/components/cards/ProjectCard';

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: 'Projects · EDA with Python Docs' },
      { name: 'description', content: 'Hands-on, end-to-end data science projects.' },
      { property: 'og:title', content: 'Projects' },
      { property: 'og:description', content: 'Hands-on, end-to-end data science projects.' },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Hands-on, end-to-end data science projects. Each one applies concepts from the handbooks to a real dataset.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  );
}
