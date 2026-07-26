import { useEffect, useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, isNavItemActive, SITE_NAME } from '@/lib/constants';
import { NavLink, ProjectsNavGroup } from './Sidebar';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = prevOverflow;
      };
    }
    setVisible(false);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className={cn(
              'absolute inset-0 bg-primary/40 transition-opacity duration-200',
              visible ? 'opacity-100' : 'opacity-0',
            )}
            onClick={close}
          />
          <nav
            className={cn(
              'absolute left-0 top-0 flex max-h-[100dvh] w-72 max-w-[80vw] flex-col overflow-hidden rounded-br-xl border-b border-r border-border bg-card shadow-lg transition-transform duration-200',
              visible ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
              <span className="font-mono text-sm font-semibold">{SITE_NAME}</span>
              <button
                onClick={close}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 space-y-0.5 overflow-y-auto px-3 py-3 pb-4">
              {NAV_ITEMS.map((item) =>
                item.href === '/projects' ? (
                  <ProjectsNavGroup key={item.href} item={item} pathname={pathname} onNavigate={close} />
                ) : (
                  <MobileTopLink key={item.href} href={item.href} label={item.label} icon={item.icon} active={isNavItemActive(item, pathname)} onNavigate={close} />
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function MobileTopLink({
  href, label, icon: Icon, active, onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={href}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
        active ? 'bg-accent/15 font-medium text-accent' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

// Silence unused import warning: NavLink is re-exported convenience for consumers.
void NavLink;
