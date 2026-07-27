import { useState, useEffect } from 'react';
import { Link, useRouter, useRouterState } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS, isNavItemActive, SITE_NAME, type NavItem } from '@/lib/constants';
import { PROJECT_CATEGORIES } from '@/data/projects';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border md:flex md:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-border px-5">
        <span className="font-mono text-sm font-semibold">{SITE_NAME}</span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) =>
          item.href === '/projects'
            ? <ProjectsNavGroup key={item.href} item={item} pathname={pathname} onNavigate={() => {}} />
            : <NavLink key={item.href} item={item} pathname={pathname} />
        )}
      </nav>
    </aside>
  );
}

export function NavLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate?: () => void }) {
  const active = isNavItemActive(item, pathname);
  return (
    <Link
      to={item.href}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors',
        active ? 'bg-accent/15 font-medium text-accent' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}

/**
 * Smoothly scroll to a section on the /projects page. If the user is on a
 * different route, navigate to /projects first and let the page's hashchange
 * handler do the scroll.
 */
function useScrollToProjectSection() {
  const router = useRouter();
  return (anchor: string | null) => {
    const targetHash = anchor ?? '';
    const alreadyOnProjects = window.location.pathname === '/projects';
    if (alreadyOnProjects) {
      const newUrl = `/projects${targetHash ? `#${targetHash}` : ''}`;
      window.history.replaceState(null, '', newUrl);
      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.navigate({ to: '/projects', hash: targetHash || undefined });
    }
  };
}

export function ProjectsNavGroup({
  item, pathname, onNavigate,
}: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const active = isNavItemActive(item, pathname);
  const [open, setOpen] = useState(active);
  useEffect(() => { if (active) setOpen(true); }, [active]);
  const scrollTo = useScrollToProjectSection();

  const sections: { label: string; anchor: string | null }[] = [
    { label: 'All Projects', anchor: null },
    ...PROJECT_CATEGORIES.map((c) => ({ label: c.title, anchor: c.anchor })),
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors',
          active ? 'bg-accent/15 font-medium text-accent' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.label}</span>
        <ChevronDown className={cn('ml-auto h-3.5 w-3.5 transition-transform', open ? 'rotate-180' : 'rotate-0')} />
      </button>

      <div
        className={cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-1 space-y-0.5 pl-6">
            {sections.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s.anchor);
                  onNavigate();
                }}
                className={cn(
                  'block w-full truncate rounded-md px-3 py-1 text-left text-xs transition-colors',
                  'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
