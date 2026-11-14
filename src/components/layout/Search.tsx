import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search as SearchIcon,
  X,
  FolderGit2,
  FileText,
  Tag,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  searchGlobal,
  getInitialSuggestions,
  POPULAR_SEARCH_TERMS,
  type ProjectSearchResult,
  type SectionSearchResult,
  type SearchResult,
} from "@/lib/search";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const searchId = useId();

  // Detect platform for shortcut symbol (⌘K on macOS, Ctrl K on others)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent);
      setIsMac(isApple);
    }
  }, []);

  // Global Ctrl+K / Cmd+K and Esc listener
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      setActiveIndex(-1);
    } else {
      setQuery("");
      setActiveIndex(-1);
    }
  }, [open]);

  // Execute global search
  const { projects, sections, total } = useMemo(() => {
    return searchGlobal(query);
  }, [query]);

  // Flattened results for keyboard navigation
  const flatResults: SearchResult[] = useMemo(() => {
    return [...projects, ...sections];
  }, [projects, sections]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(flatResults.length > 0 ? 0 : -1);
  }, [flatResults]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeElement = listRef.current.querySelector(
        `[data-search-index="${activeIndex}"]`,
      ) as HTMLElement | null;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  // Initial state suggestions
  const initialSuggestions = useMemo(() => getInitialSuggestions(), []);

  // Handle navigation on select
  const handleSelect = (item: SearchResult) => {
    setOpen(false);
    setQuery("");

    if (item.type === "project") {
      navigate({ to: item.href });
    } else {
      navigate({ to: `/projects/${item.slug}` });
      // Scroll to specific section
      setTimeout(() => {
        const target = document.getElementById(item.sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (typeof window !== "undefined") {
          window.location.hash = item.sectionId;
        }
      }, 100);
    }
  };

  // Keyboard navigation inside input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatResults.length > 0) {
        setActiveIndex((prev) => (prev + 1) % flatResults.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatResults.length > 0) {
        setActiveIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && flatResults[activeIndex]) {
        handleSelect(flatResults[activeIndex]);
      } else if (flatResults.length > 0) {
        handleSelect(flatResults[0]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <>
      {/* 1. Desktop Search Trigger (Immediately beside theme toggle) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex h-10 w-48 lg:w-64 items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 text-xs text-muted-foreground shadow-xs transition-all hover:border-accent/40 hover:bg-muted/50 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search projects, topics, technologies"
      >
        <SearchIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">Search projects, topics...</span>
        <kbd className="ml-auto inline-flex items-center gap-0.5 rounded border border-border/80 bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground shadow-2xs">
          <span>{isMac ? "⌘" : "Ctrl"}</span>
          <span>K</span>
        </kbd>
      </button>

      {/* 2. Tablet / Mobile Compact Search Trigger (< 768px) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xs transition-all hover:border-accent/40 hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search"
      >
        <SearchIcon className="h-4 w-4" />
      </button>

      {/* 3. Global Search Dialog Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-3 pt-14 backdrop-blur-xs sm:p-4 sm:pt-20"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Global Search"
        >
          <div
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Row */}
            <div className="flex h-13 sm:h-14 items-center gap-3 border-b border-border px-4">
              <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search projects, topics, technologies..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden"
                role="combobox"
                aria-expanded={open}
                aria-autocomplete="list"
                aria-controls={`search-list-${searchId}`}
                aria-activedescendant={activeIndex >= 0 ? `search-item-${activeIndex}` : undefined}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Clear search query"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="hidden sm:inline-flex items-center rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground hover:bg-muted"
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            {/* Results / Suggestions Container */}
            <div
              ref={listRef}
              id={`search-list-${searchId}`}
              className="max-h-[60vh] sm:max-h-[460px] overflow-y-auto p-2 scroll-py-2"
              role="listbox"
            >
              {/* Initial State (Empty query) */}
              {!query.trim() && (
                <div className="space-y-4 p-2">
                  <div>
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-accent" />
                      Suggested Projects
                    </div>
                    <div className="space-y-1">
                      {initialSuggestions.map((project) => (
                        <button
                          key={project.slug}
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            navigate({ to: `/projects/${project.slug}` });
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <FolderGit2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="font-medium text-foreground">{project.title}</span>
                          </div>
                          <Badge variant="outline" className="text-[10px]">
                            {project.category === "eda" ? "EDA" : "ML"}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Tag className="h-3 w-3 text-accent" />
                      Popular Search Topics
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SEARCH_TERMS.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => {
                            setQuery(term);
                            inputRef.current?.focus();
                          }}
                          className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:bg-muted hover:text-foreground"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Results State */}
              {query.trim() && total > 0 && (
                <div className="space-y-3 p-1">
                  {/* Results Count Header */}
                  <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
                    <span>
                      {total} result{total === 1 ? "" : "s"} found
                    </span>
                    <span className="text-[11px] font-mono">Use ↑ ↓ to navigate</span>
                  </div>

                  {/* Group 1: Projects */}
                  {projects.length > 0 && (
                    <div className="space-y-1">
                      <div className="px-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Projects ({projects.length})
                      </div>
                      {projects.map((item) => {
                        const index = flatResults.indexOf(item);
                        const isSelected = index === activeIndex;
                        return (
                          <div
                            key={item.id}
                            id={`search-item-${index}`}
                            data-search-index={index}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`group flex cursor-pointer items-start justify-between gap-3 rounded-lg p-2.5 transition-colors ${
                              isSelected
                                ? "bg-accent/15 text-accent-foreground"
                                : "hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <FolderGit2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm leading-tight">
                                    <HighlightText text={item.title} query={query} />
                                  </span>
                                  <Badge variant="outline" className="text-[10px] py-0 shrink-0">
                                    {item.categoryBadge}
                                  </Badge>
                                </div>
                                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                  <HighlightText text={item.description} query={query} />
                                </p>
                                {item.matchingText && (
                                  <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                    <HighlightText text={item.matchingText} query={query} />
                                  </div>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Group 2: Project Sections */}
                  {sections.length > 0 && (
                    <div className="space-y-1 pt-2">
                      <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Project Detail Sections ({sections.length})
                      </div>
                      {sections.map((item) => {
                        const index = flatResults.indexOf(item);
                        const isSelected = index === activeIndex;
                        return (
                          <div
                            key={item.id}
                            id={`search-item-${index}`}
                            data-search-index={index}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`group flex cursor-pointer items-start justify-between gap-3 rounded-lg p-2.5 transition-colors ${
                              isSelected
                                ? "bg-accent/15 text-accent-foreground"
                                : "hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm leading-tight text-foreground">
                                    <HighlightText text={item.sectionTitle} query={query} />
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    in{" "}
                                    <span className="font-medium text-foreground/80">
                                      {item.projectTitle}
                                    </span>
                                  </span>
                                </div>
                                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                                  <HighlightText text={item.snippet} query={query} />
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Empty State (Query returns 0 results) */}
              {query.trim() && total === 0 && (
                <div className="p-8 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground">No results found</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No matching projects or content sections found for &quot;{query}&quot;.
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground max-w-sm mx-auto">
                    Try searching for technologies (<span className="text-foreground">Python</span>,{" "}
                    <span className="text-foreground">XGBoost</span>), project names (
                    <span className="text-foreground">Netflix</span>,{" "}
                    <span className="text-foreground">Discount</span>), or concepts (
                    <span className="text-foreground">ANOVA</span>,{" "}
                    <span className="text-foreground">Correlation</span>).
                  </p>
                </div>
              )}
            </div>

            {/* Footer Navigation Bar */}
            <div className="hidden sm:flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono text-[9px]">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono text-[9px]">
                    ↓
                  </kbd>{" "}
                  to navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono text-[9px]">
                    ↵
                  </kbd>{" "}
                  to select
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-border bg-card px-1 py-0.5 font-mono text-[9px]">
                    esc
                  </kbd>{" "}
                  to close
                </span>
              </div>
              <span className="font-mono text-[10px]">Global Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Component that highlights query tokens in text */
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!text || !query.trim()) return <>{text}</>;

  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  if (tokens.length === 0) return <>{text}</>;

  // Escape regex special chars
  const escapedTokens = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escapedTokens.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = tokens.some((t) => t.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <mark
            key={i}
            className="rounded-2xs bg-accent/25 px-0.5 font-semibold text-accent-foreground"
          >
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </>
  );
}
