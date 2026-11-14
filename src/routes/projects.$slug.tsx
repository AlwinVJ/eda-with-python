import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { getProjectBySlug, getProjectByLegacySlug, type Project } from '@/data/projects';
import { getProjectDetails } from '@/data/projectDetails';
import { ProjectDetailLayout } from '@/components/project/ProjectDetailLayout';

// One dynamic route for every project: metadata from `src/data/projects.ts`,
// long-form content from `src/data/projectDetails`. No per-project pages.
export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }): { project: Project } => {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      const moved = getProjectByLegacySlug(params.slug);
      if (moved) throw redirect({ to: '/projects/$slug', params: { slug: moved.slug }, statusCode: 301 });
      throw notFound();
    }
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
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
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
  return <ProjectDetailLayout project={project} details={getProjectDetails(project.slug)} />;
}
