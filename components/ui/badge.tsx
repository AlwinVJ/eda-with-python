import { cn } from '@/lib/utils';
import type { Difficulty, Status } from '@/lib/types';

// Generic badge — used directly, or wrapped by DifficultyBadge/StatusBadge below.
// Colors come only from the brand palette (navy / teal / sky / beige / white),
// resolved through the CSS variables in globals.css — never hardcoded here.
// Default badge styling follows the brand spec: sky-blue background, navy text.
export function Badge({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'muted';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border',
        variant === 'default' && 'bg-[hsl(var(--border))] text-[hsl(var(--foreground))] border-transparent',
        variant === 'outline' && 'bg-transparent border-border text-foreground',
        variant === 'muted' && 'bg-muted text-foreground border-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}

// Three-tier visual progression using only palette colors: sky (lightest) →
// teal (mid) → navy (strongest), so difficulty/status stay distinguishable
// without introducing hues outside the brand palette. Text colors are chosen
// to meet WCAG AA contrast against each fill (see contrast check in the
// palette-migration summary).
const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner: 'bg-[hsl(var(--border))] text-[hsl(var(--foreground))] border-transparent',       // sky / navy
  intermediate: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border-transparent', // teal / white
  advanced: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-transparent',   // navy / white
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border capitalize', DIFFICULTY_STYLES[difficulty])}>
      {difficulty}
    </span>
  );
}

const STATUS_STYLES: Record<Status, string> = {
  completed: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-transparent',  // navy / white — done
  'in-progress': 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border-transparent', // teal / white
  planned: 'bg-[hsl(var(--border))] text-[hsl(var(--foreground))] border-transparent',              // sky / navy
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
    <span className="inline-flex items-center rounded-md bg-[hsl(var(--border))] px-2 py-0.5 text-xs font-mono text-[hsl(var(--foreground))]">
      {children}
    </span>
  );
}
