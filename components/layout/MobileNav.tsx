'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, isNavItemActive, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

// The desktop Sidebar is `hidden md:flex` — below the md breakpoint there was
// previously no way to navigate the site at all. This restores navigation on
// mobile via a hamburger button + slide-in drawer, sharing NAV_ITEMS with the
// desktop sidebar so both stay in sync automatically.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // drives the slide-in transition
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Mount the panel off-screen first, then transition it in on the next
  // frame — a plain CSS transition, no extra animation dependency.
  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [open]);

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
              'absolute inset-0 bg-[hsl(var(--primary))]/40 transition-opacity duration-200',
              visible ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => setOpen(false)}
          />
          <nav
            className={cn(
              'absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col border-r border-border bg-card transition-transform duration-200',
              visible ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-5">
              <span className="font-mono text-sm font-semibold">{SITE_NAME}</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
              {NAV_ITEMS.map((item) => {
                const active = isNavItemActive(item, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                      active
                        ? 'bg-accent/10 font-medium text-accent'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
