import { Link } from '@tanstack/react-router';
import { ArrowRight, Database, Github, ExternalLink, ImageIcon } from 'lucide-react';
import type { ProjectMetadata } from '@/lib/types';
import { DifficultyBadge, StatusBadge, TechBadge } from '@/components/ui/badge';
import { githubUrl } from '@/lib/content';

export function ProjectCard({ project }: { project: ProjectMetadata }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/40">
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
        <div className="flex aspect-video items-center justify-center border-b border-border bg-muted">
          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
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
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Database className="h-3 w-3" /> {project.dataset}
          </span>
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
          <a href={githubUrl(project.githubPath)} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 hover:bg-muted">
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
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
