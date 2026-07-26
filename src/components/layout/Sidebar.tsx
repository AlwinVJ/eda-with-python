import { useState, useEffect } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS, isNavItemActive, SITE_NAME, type NavItem } from '@/lib/constants';
import { getAllProjects } from '@/lib/content';
import { PROJECT_CATEGORIES, groupProjectsByCategory } from '@/lib/project-categories';
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

export function ProjectsNavGroup({
  item, pathname, onNavigate,
}: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const active = isNavItemActive(item, pathname);
  const [open, setOpen] = useState(active);
  useEffect(() => { if (active) setOpen(true); }, [active]);

  const grouped = groupProjectsByCategory(getAllProjects());

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
          <div className="mt-1 space-y-2 pl-6">
            <Link
              to="/projects"
              onClick={onNavigate}
              className={cn(
                'block rounded-md px-3 py-1 text-xs transition-colors',
                pathname === '/projects'
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              All projects
            </Link>
            {PROJECT_CATEGORIES.map((cat) => {
              const items = grouped[cat.id];
              if (!items || items.length === 0) return null;
              return (
                <div key={cat.id}>
                  <div className="px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70">
                    {cat.title}
                  </div>
                  <div className="mt-0.5 space-y-0.5">
                    {items.map((p) => {
                      const isActive = pathname === `/projects/${p.slug}`;
                      return (
                        <Link
                          key={p.slug}
                          to="/projects/$slug"
                          params={{ slug: p.slug }}
                          onClick={onNavigate}
                          className={cn(
                            'block truncate rounded-md px-3 py-1 text-xs transition-colors',
                            isActive
                              ? 'bg-accent/15 font-medium text-accent'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                          )}
                        >
                          {p.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
