import createMDX from '@next/mdx';

// GitHub Pages deployment config.
// All environment-specific values are read from process.env (populated from
// .env.local in development, or repo/environment secrets in CI) — see
// .env.example for the full list and what each one controls. Nothing here
// should need to be hand-edited per deployment; set the env vars instead.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const REPO_NAME = process.env.NEXT_PUBLIC_GH_PAGES_REPO_NAME ?? 'EDA-With-Python';
const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? 'https://github.com/your-username/EDA-With-Python';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // Static HTML export — no server, no API routes
  trailingSlash: true,           // Required for GitHub Pages routing to work with static export
  images: {
    unoptimized: true,           // next/image optimization needs a server; disable for static export
  },
  basePath: isGithubActions ? `/${REPO_NAME}` : '',
  assetPrefix: isGithubActions ? `/${REPO_NAME}/` : '',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${REPO_NAME}` : '',
    NEXT_PUBLIC_REPO_URL: REPO_URL,
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
