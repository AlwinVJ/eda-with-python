import { useState, useEffect } from 'react';
import { Link, useRouter, useRouterState } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS, isNavItemActive, SITE_NAME, type NavItem } from '@/lib/constants';
import { PROJECT_CATEGORIES } from '@/data/projects';
import { REFERENCE_TYPES } from '@/data/references';
import { DOC_CATEGORIES } from '@/data/docs';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border md:flex md:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-border px-5">
        <span className="font-mono text-sm font-semibold">{SITE_NAME}</span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => renderNavItem(item, pathname))}
      </nav>
    </aside>
  );
}

/** Render the right variant for each top-level nav item. */
export function renderNavItem(item: NavItem, pathname: string, onNavigate: () => void = () => {}) {
  if (item.href === '/projects') {
    return (
      <ScrollNavGroup
        key={item.href}
        item={item}
        pathname={pathname}
        onNavigate={onNavigate}
        basePath="/projects"
        sections={[
          { label: 'All Projects', anchor: null },
          ...PROJECT_CATEGORIES.map((c) => ({ label: c.title, anchor: c.anchor })),
        ]}
      />
    );
  }
  if (item.href === '/documentation') {
    // Documentation collapses into topic categories that scroll on /docs.
    // Categories come from `src/data/docs.ts` (imported lazily to avoid a
    // circular sidebar-icon import cycle at build time).
    return <DocumentationNavGroup key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />;
  }
  if (item.href === '/references') {
    return (
      <ScrollNavGroup
        key={item.href}
        item={item}
        pathname={pathname}
        onNavigate={onNavigate}
        basePath="/references"
        sections={[
          { label: 'All References', anchor: null },
          ...REFERENCE_TYPES.map((t) => ({ label: t.title, anchor: t.anchor })),
        ]}
      />
    );
  }
  return <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />;
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
 * Smoothly scroll to a section on a given base page. If the user is on a
 * different route, navigate first and let the page's own hash handler do the
 * scroll on arrival.
 */
function useScrollToSection() {
  const router = useRouter();
  return (basePath: string, anchor: string | null) => {
    const targetHash = anchor ?? '';
    const alreadyOnPage = window.location.pathname === basePath;
    if (alreadyOnPage) {
      const newUrl = `${basePath}${targetHash ? `#${targetHash}` : ''}`;
      window.history.replaceState(null, '', newUrl);
      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.navigate({ to: basePath, hash: targetHash || undefined });
    }
  };
}

interface ScrollSection { label: string; anchor: string | null }

/**
 * A collapsible sidebar group whose sub-items smoothly scroll to anchors on
 * a base page. Reused by Projects, Documentation, and References — all three
 * work the same way, only the data changes.
 */
export function ScrollNavGroup({
  item, pathname, onNavigate, basePath, sections,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
  basePath: string;
  sections: ScrollSection[];
}) {
  const active = isNavItemActive(item, pathname);
  const [open, setOpen] = useState(active);
  useEffect(() => { if (active) setOpen(true); }, [active]);
  const scrollTo = useScrollToSection();

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
                  scrollTo(basePath, s.anchor);
                  onNavigate();
                }}
                className="block w-full truncate rounded-md px-3 py-1 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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

/**
 * Documentation gets its own component because it links to the classic
 * /documentation hub AND expands into topic categories that scroll on /docs.
 */
function DocumentationNavGroup({
  item, pathname, onNavigate,
}: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const sections: ScrollSection[] = [
    { label: 'All Documentation', anchor: null },
    ...DOC_CATEGORIES.map((c) => ({ label: c.title, anchor: c.anchor })),
  ];
  return (
    <ScrollNavGroup
      item={item}
      pathname={pathname}
      onNavigate={onNavigate}
      basePath="/docs"
      sections={sections}
    />
  );
}

/** Kept for backwards compatibility with existing MobileNav imports. */
export function ProjectsNavGroup(props: { item: NavItem; pathname: string; onNavigate: () => void }) {
  return (
    <ScrollNavGroup
      {...props}
      basePath="/projects"
      sections={[
        { label: 'All Projects', anchor: null },
        ...PROJECT_CATEGORIES.map((c) => ({ label: c.title, anchor: c.anchor })),
      ]}
    />
  );
}
