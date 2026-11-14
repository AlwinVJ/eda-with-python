import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon, X } from "lucide-react";
import { buildSearchIndex } from "@/lib/content";

const INDEX = buildSearchIndex();

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)),
    ).slice(0, 8);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted"
        aria-label="Open search"
      >
        <SearchIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">Search projects…</span>
        <kbd className="ml-auto hidden shrink-0 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] sm:inline-block">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-primary/40 px-4 pt-16 sm:pt-24"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl rounded-xl border border-border bg-card shadow-xl">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button onClick={() => setOpen(false)} aria-label="Close search">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <ul className="max-h-96 overflow-y-auto p-2">
              {results.map((item) => (
                <li key={`${item.type}-${item.slug}`}>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate({ to: item.href });
                    }}
                    className="flex w-full flex-col items-start rounded-md px-3 py-2 text-left hover:bg-muted"
                  >
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {item.type}
                    </span>
                    <span className="text-sm font-medium">{item.title}</span>
                  </button>
                </li>
              ))}
              {query && results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No results for &quot;{query}&quot;
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
