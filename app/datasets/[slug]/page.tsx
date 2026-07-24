import { notFound } from 'next/navigation';
import { Download } from 'lucide-react';
import { getAllDatasets, getDataset, getAllProjects, assetUrl } from '@/lib/content';

export function generateStaticParams() {
  return getAllDatasets().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const dataset = getDataset(params.slug);
  if (!dataset) return {};
  return { title: dataset.title, description: dataset.description };
}

export default function DatasetPage({ params }: { params: { slug: string } }) {
  const dataset = getDataset(params.slug);
  if (!dataset) notFound();
  const usedIn = getAllProjects().filter((p) => dataset.usedInProjects.includes(p.slug));

  return (
    <article className="space-y-8">
      <header className="space-y-2 border-b border-border pb-6">
        <h1 className="text-2xl font-semibold">{dataset.title}</h1>
        <p className="text-muted-foreground">{dataset.description}</p>
      </header>

      <section className="grid grid-cols-3 gap-4 text-sm">
        <Stat label="Source" value={dataset.source} />
        <Stat label="Rows" value={dataset.rows.toLocaleString()} />
        <Stat label="Columns" value={String(dataset.columns)} />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Features</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs text-foreground">
              <tr><th className="px-3 py-2">Name</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Description</th></tr>
            </thead>
            <tbody>
              {dataset.features.map((f) => (
                <tr key={f.name} className="border-t border-border">
                  <td className="px-3 py-2 font-mono">{f.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{f.type}</td>
                  <td className="px-3 py-2 text-muted-foreground">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {usedIn.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Projects Using It</h2>
          <ul className="space-y-1 text-sm">
            {usedIn.map((p) => (
              <li key={p.slug}><a href={`/projects/${p.slug}`} className="text-accent hover:text-primary hover:underline transition-colors">{p.title}</a></li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex gap-2 text-sm">
        <a href={assetUrl(dataset.githubPath, dataset.downloadFile)} download
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted">
          <Download className="h-4 w-4" /> Download Source
        </a>
      </section>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3 text-center">
      <div className="font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
