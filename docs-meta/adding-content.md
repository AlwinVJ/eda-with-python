# Adding Content

The website has **zero hardcoded content**. Every page is generated from a
`metadata.json` file. To add something new, you only ever do two things:

1. Create a folder
2. Add a `metadata.json`

No component, route, or page file needs to change.

## Add a Project

```bash
cd website
npm run new:project -- customer-churn
```

This creates `content/projects/customer-churn/metadata.json` pre-filled with
required fields. Fill it in following the schema in `lib/types.ts`
(`ProjectMetadata`). Then place the real files it references — `README.md`,
`notebook.ipynb`, `report.pdf`, `assets/preview.png` — inside the matching
repo folder at `projects/customer-churn/`.

The page at `/projects/customer-churn` is generated automatically the next
time the site builds (`generateStaticParams` in
`app/projects/[slug]/page.tsx` reads every project folder).

## Add a Handbook / Cheatsheet / Dataset

Same pattern:

```bash
npm run new:handbook -- my-handbook
npm run new:cheatsheet -- my-cheatsheet
npm run new:dataset -- my-dataset
```

Fill in the type-specific fields (`HandbookMetadata`, `CheatsheetMetadata`,
`DatasetMetadata` in `lib/types.ts`), and make sure the referenced PDF/CSV
file actually exists at the `githubPath` in the repository.

## Add a Resource

Resources don't have a scaffold script (they're link-only, no repo files to
place) — copy `content/resources/pandas-official-docs/metadata.json` as a
template into a new folder under `content/resources/<slug>/`.

## Wire a Project into the Learning Guide

Add a new step (or extend an existing one) in `content/learning-guide.json`.
Each action can optionally reference a real piece of content via
`targetType` + `targetSlug` (e.g. `"targetType": "project", "targetSlug": "titanic"`),
which the Learning Guide page resolves into a real link at build time.

## Before Committing

```bash
npm run validate:metadata
```

This checks every metadata.json has its required fields and that
`slug` matches the folder name. CI runs this automatically and fails the
build on any error.

## Why This Works

`lib/content.ts` is the only file that touches the filesystem. It walks each
`content/<type>/` directory, reads every `metadata.json`, and returns typed
arrays. Every page (`app/projects/page.tsx`, `app/handbooks/page.tsx`, ...)
just calls `getAllX()` and renders. Dynamic routes
(`app/projects/[slug]/page.tsx`) use `generateStaticParams()` to pre-render
one page per metadata file at build time — this is what lets the site scale
to 100+ projects, PDFs, and datasets without touching a single component.
