// Runs after `next build` (see package.json "build" could be extended, or
// wired as a postbuild step) to emit public/search-index.json, which the
// client-side GlobalSearch component fetches. Keeps search fully static —
// no server, no third-party search service.
import fs from 'node:fs';
import path from 'node:path';

// Re-implemented here in plain JS (no TS runtime at this stage) mirroring
// lib/content.ts's buildSearchIndex(). Kept in sync manually — see comment
// in lib/content.ts.
function readMetadataDir(subdir) {
  const dir = path.join(process.cwd(), 'content', subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => {
      const metaPath = path.join(dir, e.name, 'metadata.json');
      if (!fs.existsSync(metaPath)) return null;
      return JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    })
    .filter(Boolean);
}

const projects = readMetadataDir('projects').map((p) => ({ type: 'project', slug: p.slug, title: p.title, description: p.description, tags: p.tags, href: `/projects/${p.slug}` }));
const handbooks = readMetadataDir('handbooks').map((h) => ({ type: 'handbook', slug: h.slug, title: h.title, description: h.description, tags: h.tags, href: `/handbooks#${h.slug}` }));
const cheatsheets = readMetadataDir('cheatsheets').map((c) => ({ type: 'cheatsheet', slug: c.slug, title: c.title, description: c.description, tags: c.tags, href: `/cheatsheets#${c.slug}` }));
const datasets = readMetadataDir('datasets').map((d) => ({ type: 'dataset', slug: d.slug, title: d.title, description: d.description, tags: d.tags, href: `/datasets/${d.slug}` }));
const resources = readMetadataDir('resources').map((r) => ({ type: 'resource', slug: r.slug, title: r.title, description: r.description, tags: r.tags, href: `/resources#${r.slug}` }));

const index = [...projects, ...handbooks, ...cheatsheets, ...datasets, ...resources];

fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'public', 'search-index.json'), JSON.stringify(index, null, 2));
console.log(`[search-index] wrote ${index.length} entries to public/search-index.json`);
