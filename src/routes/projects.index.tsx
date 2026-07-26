import { createFileRoute } from '@tanstack/react-router';
import { getAllProjects } from '@/lib/content';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { PROJECT_CATEGORIES, groupProjectsByCategory } from '@/lib/project-categories';

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: 'Projects · EDA with Python Docs' },
      { name: 'description', content: 'Hands-on EDA and end-to-end machine learning projects.' },
      { property: 'og:title', content: 'Projects' },
      { property: 'og:description', content: 'Hands-on EDA and end-to-end machine learning projects.' },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const grouped = groupProjectsByCategory(getAllProjects());

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Hands-on projects grouped by focus area. Start with EDA to build your foundation, then move on to end-to-end machine learning.
        </p>
      </div>

      {PROJECT_CATEGORIES.map((cat) => {
        const items = grouped[cat.id];
        if (!items || items.length === 0) return null;
        return (
          <section key={cat.id} className="space-y-4" id={cat.id}>
            <div className="border-b border-border pb-2">
              <h2 className="text-lg font-semibold">{cat.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
