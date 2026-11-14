import { BookOpen, Download } from "lucide-react";
import type { HandbookMetadata } from "@/lib/types";
import { DifficultyBadge } from "@/components/ui/badge";
import { assetUrl } from "@/lib/content";

export function HandbookCard({ handbook }: { handbook: HandbookMetadata }) {
  const fileHref = assetUrl(handbook.githubPath, handbook.file);
  return (
    <div id={handbook.slug} className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-snug">{handbook.title}</h3>
        <DifficultyBadge difficulty={handbook.difficulty} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{handbook.description}</p>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground xs:grid-cols-3 sm:grid-cols-3">
        <div>
          <dt className="font-medium text-foreground">v{handbook.version}</dt>
          <dd>Version</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">{handbook.pages}</dt>
          <dd>Pages</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">{handbook.lastUpdated}</dt>
          <dd>Updated</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <a
          href={fileHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 hover:bg-muted"
        >
          <BookOpen className="h-3.5 w-3.5" /> Read Handbook
        </a>
        <a
          href={fileHref}
          download
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 hover:bg-muted"
        >
          <Download className="h-3.5 w-3.5" /> Download PDF
        </a>
      </div>
    </div>
  );
}
