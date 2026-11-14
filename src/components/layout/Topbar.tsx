import { Link, useRouterState } from "@tanstack/react-router";
import { Home, FolderKanban } from "lucide-react";
import { GlobalSearch } from "./Search";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export function Topbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHomeActive = pathname === "/";
  const isProjectsActive = pathname.startsWith("/projects");

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-6 md:px-8">
      {/* Left Section – Website Branding */}
      <div className="flex items-center shrink-0 w-auto lg:w-48 xl:w-52">
        <Link
          to="/"
          className="group flex items-center select-none rounded-md transition-opacity hover:opacity-90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="EDA-with-Python Home"
        >
          <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
            EDA-with-Python
          </span>
        </Link>
      </div>

      {/* Navigation Buttons – Aligned with Main Content Start */}
      <nav
        aria-label="Main Navigation"
        className="flex items-center gap-1 sm:gap-1.5 md:gap-2 ml-3 sm:ml-4 lg:ml-0"
      >
        <Link
          to="/"
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
            isHomeActive
              ? "bg-accent/15 text-accent font-semibold"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span>Home</span>
        </Link>
        <Link
          to="/projects"
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
            isProjectsActive
              ? "bg-accent/15 text-accent font-semibold"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <FolderKanban className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span>Projects</span>
        </Link>
      </nav>

      {/* Right Section – Search & Theme Toggle */}
      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
        <GlobalSearch />
        <ThemeToggle />
      </div>
    </header>
  );
}
