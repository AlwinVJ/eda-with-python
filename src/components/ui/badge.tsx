import { cn } from '@/lib/utils';
import type { Difficulty, Status } from '@/lib/types';

export function Badge({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'muted' | 'secondary';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border',
        variant === 'default' && 'bg-border/60 text-foreground border-transparent',
        variant === 'outline' && 'bg-transparent border-border text-foreground',
        variant === 'muted' && 'bg-muted text-foreground border-transparent',
        variant === 'secondary' && 'bg-muted text-foreground border-transparent',
        className,
      )}
    >
      {children}
    </span>
  );
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner: 'bg-border/60 text-foreground border-transparent',
  intermediate: 'bg-accent text-accent-foreground border-transparent',
  advanced: 'bg-primary text-primary-foreground border-transparent',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border capitalize', DIFFICULTY_STYLES[difficulty])}>
      {difficulty}
    </span>
  );
}

const STATUS_STYLES: Record<Status, string> = {
  completed: 'bg-primary text-primary-foreground border-transparent',
  'in-progress': 'bg-accent text-accent-foreground border-transparent',
  planned: 'bg-border/60 text-foreground border-transparent',
};

const STATUS_LABEL: Record<Status, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border', STATUS_STYLES[status])}>
      {STATUS_LABEL[status]}
    </span>
  );
}

export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-border/60 px-2 py-0.5 text-xs font-mono text-foreground">
      {children}
    </span>
  );
}
