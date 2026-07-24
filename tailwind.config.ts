import type { Config } from 'tailwindcss';

// Design language: minimal, documentation-first, typography-focused.
// No neon colors, no heavy gradients — an engineering aesthetic (think
// NumPy / FastAPI docs, not a SaaS landing page).
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        border: 'hsl(var(--border) / var(--border-opacity, 1))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-links': 'hsl(var(--accent))',
            '--tw-prose-bullets': 'hsl(var(--accent))',
            '--tw-prose-counters': 'hsl(var(--accent))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            '--tw-prose-quotes': 'hsl(var(--muted-foreground))',
            '--tw-prose-quote-borders': 'hsl(var(--border))',
            '--tw-prose-hr': 'hsl(var(--border))',
            a: { '&:hover': { color: 'hsl(var(--primary))' } },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
