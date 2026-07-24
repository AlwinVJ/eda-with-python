'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, isNavItemActive, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Desktop-only sidebar. Mobile uses components/layout/MobileNav.tsx instead —
// both read from the same NAV_ITEMS source in lib/constants.ts.
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border md:flex md:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-border px-5">
        <span className="font-mono text-sm font-semibold">{SITE_NAME}</span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(item, pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors',
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
      </nav>
    </aside>
  );
}
