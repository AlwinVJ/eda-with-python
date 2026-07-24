import { GlobalSearch } from './Search';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
      <MobileNav />
      <div className="flex-1 max-w-md">
        <GlobalSearch />
      </div>
      <ThemeToggle />
    </header>
  );
}
