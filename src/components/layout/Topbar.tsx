import { GlobalSearch } from './Search';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur sm:gap-3 sm:px-4 md:px-6">
      <MobileNav />
      <div className="min-w-0 flex-1 sm:max-w-md">
        <GlobalSearch />
      </div>
      <div className="ml-auto shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
}
