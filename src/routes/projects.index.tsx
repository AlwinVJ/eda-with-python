import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { PROJECT_CATEGORIES, groupProjectsByCategory } from '@/data/projects';

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
  const grouped = groupProjectsByCategory();

  // Smooth-scroll to the section named in the URL hash (e.g. /projects#eda),
  // then keep responding to hash changes without a full navigation.
  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Initial scroll after mount so anchors exist.
    const t = setTimeout(scrollToHash, 0);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <div id="all-projects" className="space-y-10 scroll-mt-20">
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
          <section key={cat.id} className="space-y-4 scroll-mt-20" id={cat.anchor}>
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
