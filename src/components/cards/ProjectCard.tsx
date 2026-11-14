import { Link } from '@tanstack/react-router';
import { ArrowRight, Database, Github, ExternalLink, ImageIcon } from 'lucide-react';
import { DifficultyBadge, StatusBadge, TechBadge, Badge } from '@/components/ui/badge';
import { githubUrl } from '@/lib/content';
import { getProjectCategoryMeta, getProjectRepoUrl, type Project } from '@/data/projects';

export function ProjectCard({ project }: { project: Project }) {
  const image = project.image;
  const category = getProjectCategoryMeta(project.category);
  const repoUrl = getProjectRepoUrl(project, githubUrl);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/40">
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
        <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
          {image ? (
            <img
              src={image}
              alt={`${project.title} cover`}
              loading="lazy"
              width={1200}
              height={675}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
            </div>
          )}
          <Badge
            variant="default"
            className="absolute left-3 top-3 bg-primary/90 text-primary-foreground backdrop-blur-sm"
          >
            {category.badge}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
          <h3 className="font-semibold leading-snug group-hover:text-accent">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={project.difficulty} />
          <StatusBadge status={project.status} />
          {project.dataset && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Database className="h-3 w-3" /> {project.dataset}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.librariesUsed.slice(0, 4).map((lib) => (
            <TechBadge key={lib}>{lib}</TechBadge>
          ))}
        </div>

        {project.skillsLearned.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Skills: </span>
            {project.skillsLearned.slice(0, 3).join(', ')}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4 text-sm">
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 hover:bg-muted">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          )}
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 hover:bg-muted">
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          )}
          <Link to="/projects/$slug" params={{ slug: project.slug }}
            className="ml-auto inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-primary-foreground transition-colors hover:bg-primary-hover">
            Read More <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
