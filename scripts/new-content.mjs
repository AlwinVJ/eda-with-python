// Scaffolds a new content folder + metadata.json skeleton.
// Usage: npm run new:project -- my-new-project
import fs from 'node:fs';
import path from 'node:path';

const [, , type, slugArg] = process.argv;
const slug = slugArg ?? process.argv[3];
const TYPE_DIR = { project: 'projects', handbook: 'handbooks', cheatsheet: 'cheatsheets', dataset: 'datasets' };

if (!type || !TYPE_DIR[type] || !slug) {
  console.error('Usage: node scripts/new-content.mjs <project|handbook|cheatsheet|dataset> <slug>');
  process.exit(1);
}

const dir = path.join(process.cwd(), 'content', TYPE_DIR[type], slug);
if (fs.existsSync(dir)) {
  console.error(`Folder already exists: ${dir}`);
  process.exit(1);
}
fs.mkdirSync(dir, { recursive: true });

const today = new Date().toISOString().split('T')[0];
const base = {
  slug,
  title: 'TODO Title',
  description: 'TODO description',
  difficulty: 'beginner',
  status: 'planned',
  tags: [],
  lastUpdated: today,
  githubPath: `${TYPE_DIR[type]}/${slug}`,
};

fs.writeFileSync(path.join(dir, 'metadata.json'), JSON.stringify({ type, ...base }, null, 2));
console.log(`Created content/${TYPE_DIR[type]}/${slug}/metadata.json — fill in the required fields (see lib/types.ts).`);
