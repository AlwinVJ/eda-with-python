import { Download, Maximize2 } from 'lucide-react';
import type { CheatsheetMetadata } from '@/lib/types';
import { TechBadge, DifficultyBadge } from '@/components/ui/badge';
import { assetUrl } from '@/lib/content';

// Cheatsheets are high-resolution images (PNG/JPG/WEBP), not PDFs — the
// image itself is both the preview and the content.
export function CheatsheetCard({ sheet }: { sheet: CheatsheetMetadata }) {
  const imgSrc = assetUrl(sheet.githubPath, sheet.image);

  return (
    <div id={sheet.slug} className="overflow-hidden rounded-xl border border-border bg-card">
      <a href={imgSrc} target="_blank" rel="noreferrer" className="group relative block aspect-[4/3] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt={`${sheet.title} preview`} className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]" />
        <span className="absolute right-2 top-2 rounded-md bg-background/90 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </a>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">{sheet.title}</h3>
          <TechBadge>{sheet.library}</TechBadge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{sheet.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={sheet.difficulty} />
          <span className="text-xs text-muted-foreground">Updated {sheet.lastUpdated}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sheet.topicsCovered.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
        </div>
        <div className="mt-4 flex gap-2 text-sm">
          <a href={imgSrc} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 hover:bg-muted">
            <Maximize2 className="h-3.5 w-3.5" /> View Image
          </a>
          <a href={imgSrc} download
            className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 hover:bg-muted">
            <Download className="h-3.5 w-3.5" /> Download Image
          </a>
        </div>
      </div>
    </div>
  );
}
