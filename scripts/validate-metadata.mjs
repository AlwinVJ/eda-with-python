// Sanity-checks every metadata.json against required fields before build.
// Run via `npm run validate:metadata`. Exits non-zero on error so it can
// be wired into CI (see .github/workflows/deploy.yml).
import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_BASE = ['slug', 'title', 'description', 'difficulty', 'status', 'tags', 'lastUpdated', 'githubPath'];
const REQUIRED_BY_TYPE = {
  project: ['dataset', 'librariesUsed', 'skillsLearned', 'businessProblem', 'workflow', 'files'],
  handbook: ['version', 'pages', 'file', 'topics'],
  cheatsheet: ['version', 'library', 'topicsCovered', 'image'],
  dataset: ['source', 'rows', 'columns', 'features', 'usedInProjects', 'downloadFile'],
  resource: ['category', 'officialUrl'],
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');
let errors = 0;

for (const type of ['projects', 'handbooks', 'cheatsheets', 'datasets', 'resources']) {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) continue;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const metaPath = path.join(dir, entry.name, 'metadata.json');
    if (!fs.existsSync(metaPath)) {
      console.error(`✗ ${type}/${entry.name}: missing metadata.json`);
      errors++;
      continue;
    }
    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch (e) {
      console.error(`✗ ${type}/${entry.name}: invalid JSON — ${e.message}`);
      errors++;
      continue;
    }
    const singularType = type.slice(0, -1);
    const required = [...REQUIRED_BASE, ...(REQUIRED_BY_TYPE[singularType] ?? [])];
    for (const field of required) {
      if (!(field in meta)) {
        console.error(`✗ ${type}/${entry.name}: missing required field "${field}"`);
        errors++;
      }
    }
    if (meta.slug !== entry.name) {
      console.error(`✗ ${type}/${entry.name}: metadata.slug ("${meta.slug}") must match folder name`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} metadata error(s) found.`);
  process.exit(1);
} else {
  console.log('✓ All metadata files valid.');
}
