import { GlobalSearch } from "./Search";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border bg-background/80 px-3 backdrop-blur sm:px-4 md:px-6">
      <div className="flex items-center gap-2">
        <MobileNav />
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <GlobalSearch />
        <ThemeToggle />
      </div>
    </header>
  );
}
