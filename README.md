# EDA With Python — Documentation Website

A modern, fast, and responsive documentation and showcase platform for Exploratory Data Analysis (EDA) and Machine Learning projects in Python. Built with React 19, TanStack Router / TanStack Start, TypeScript, and Tailwind CSS.

---

## 1. Project Overview

This website serves as the central hub for practical, project-driven data science workflows, comprehensive developer handbooks, curated datasets, cheatsheets, and learning guides. It presents both Exploratory Data Analysis projects and End-to-End Machine Learning applications through an interactive, data-driven architecture.

---

## 2. Technology Stack & Versions

- **Frontend Library:** [React 19](https://react.dev/) (`^19.2.0`)
- **Routing & Framework:** [TanStack Router](https://tanstack.com/router) (`^1.170.46`) & [TanStack Start](https://tanstack.com/start) (`^1.169.5`)
- **Data Fetching / State:** [TanStack Query](https://tanstack.com/query) (`^5.107.1`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`^4.3.5`) via `@tailwindcss/vite`
- **Build Tool:** [Vite 8](https://vite.dev/) (`^8.3.8`)
- **Language & Types:** [TypeScript 5](https://www.typescriptlang.org/) (`^5.9.3`)
- **Icons:** [Lucide React](https://lucide.dev/) (`^0.575.0`)
- **UI Primitives:** Radix UI primitives & custom design token architecture
- **Code Quality:** ESLint 9 (`eslint`, `@typescript-eslint`, `eslint-plugin-prettier`) & Prettier 3

---

## 3. Prerequisites

- **Node.js:** Node 20+ (Node.js 22 LTS recommended)
- **Package Manager:** `npm` (version 10+)

---

## 4. Local Installation Instructions

Clone the repository and install dependencies using npm:

```bash
git clone https://github.com/AlwinVJ/eda-with-python.git
cd eda-docs-website
npm install
```

---

## 5. Development Commands

Start the local development server with Vite:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or the port indicated in your console).

---

## 6. Build Commands

Generate a production-ready static build:

```bash
npm run build
```

This command runs `vite build`, prerendering all 44 routes into static HTML files under `dist/client/`, and automatically prepares `404.html` and `.nojekyll` for GitHub Pages hosting.

To preview the production build locally:

```bash
npm run preview
```

---

## 7. Testing & Validation Commands

- **Type Check:**
  ```bash
  npx tsc --noEmit
  ```
- **Linting:**
  ```bash
  npm run lint
  ```
- **Code Formatting:**
  ```bash
  npm run format
  ```
- **Content Metadata Validation:**
  ```bash
  npm run validate:metadata
  ```
- **Search Index Regeneration:**
  ```bash
  npm run build:search-index
  ```
- **Dependency Security Audit:**
  ```bash
  npm audit
  ```

---

## 8. GitHub Pages Deployment Preparation

The project is preconfigured for static deployment on GitHub Pages:

1. **Static HTML Prerendering:** All core static and dynamic routes (`/`, `/projects`, `/projects/*`) are crawled and prerendered into static HTML files in `dist/client`.
2. **SPA Routing Fallback:** Direct navigation or refreshes on deep paths are supported via `404.html` fallback.
3. **Base Path Support:** Configurable base path via `VITE_BASE_PATH` (e.g., `VITE_BASE_PATH=/${{ github.event.repository.name }}/`).
4. **Jekyll Processing Disabled:** `.nojekyll` is generated in `dist/client` to ensure all asset paths and nested files are served without interference.
5. **CI/CD Workflow:** A GitHub Actions workflow is provided at `.github/workflows/deploy.yml`. When ready to publish, enable GitHub Pages in your repository settings (Settings -> Pages -> Build and deployment: GitHub Actions) and trigger the workflow.

---

## 9. Environment Variable Configuration

Copy `.env.example` to `.env.local` to override settings:

```bash
cp .env.example .env.local
```

Available variables:

| Variable | Description | Default |
|---|---|---|
| `VITE_BASE_PATH` | Base path URL for hosting (e.g. `/eda-with-python/`) | `/` |
| `VITE_REPO_URL` | Upstream GitHub repository URL for source code links | `https://github.com/AlwinVJ/eda-with-python` |
| `VITE_SITE_URL` | Live production website URL | `https://alwinvj.github.io/eda-with-python` |

---

## 10. Project Structure Overview

```text
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages deployment workflow
├── public/
│   ├── favicon.ico              # Website favicon
│   ├── projects/                # Static figures and media assets
│   └── search-index.json        # Generated client search index
├── scripts/
│   ├── build-search-index.mjs   # Generates public/search-index.json
│   └── validate-metadata.mjs    # Validates content metadata schemas
├── src/
│   ├── assets/                  # Images and asset metadata pointers
│   ├── components/
│   │   ├── cards/               # ProjectCard, HandbookCard
│   │   ├── layout/              # Sidebar, Topbar, Search, MobileNav
│   │   ├── project/             # ProjectDetailLayout and section renderers
│   │   └── ui/                  # Reusable UI component primitives
│   ├── content/                 # JSON metadata for datasets, handbooks, cheatsheets
│   ├── data/
│   │   ├── projects.ts          # Central project repository registry
│   │   ├── references.ts        # External references and learning resources
│   │   └── projectDetails/      # Long-form project case study details
│   ├── hooks/                   # Custom React hooks (use-mobile, etc.)
│   ├── lib/                     # Utilities, theme provider, types, content helpers
│   ├── routes/                  # TanStack Router route tree
│   │   ├── __root.tsx           # Application root layout, SEO head, and shell
│   │   ├── index.tsx            # Home page
│   │   ├── projects.index.tsx   # Projects catalog
│   │   └── projects.$slug.tsx   # Dynamic project detail view
│   ├── router.tsx               # TanStack Router instance creation
│   ├── routeTree.gen.ts         # Generated route tree
│   ├── start.ts                 # TanStack Start instance configuration
│   └── styles.css               # Tailwind CSS v4 design tokens and styles
├── .env.example                 # Environment configuration template
├── .gitignore                   # Git exclusion rules
├── eslint.config.js             # ESLint flat configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite bundler and plugin configuration
```
