import Link from 'next/link';
import { Rows3, Columns3 } from 'lucide-react';
import type { DatasetMetadata } from '@/lib/types';

export function DatasetCard({ dataset }: { dataset: DatasetMetadata }) {
  return (
    <Link href={`/datasets/${dataset.slug}`} className="block rounded-xl border border-border bg-card p-5 hover:border-accent/40">
      <h3 className="font-semibold">{dataset.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{dataset.description}</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Rows3 className="h-3.5 w-3.5" /> {dataset.rows.toLocaleString()} rows</span>
        <span className="inline-flex items-center gap-1"><Columns3 className="h-3.5 w-3.5" /> {dataset.columns} columns</span>
        <span>{dataset.source}</span>
      </div>
    </Link>
  );
}
