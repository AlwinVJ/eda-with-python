import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { SITE_NAME, SITE_TAGLINE, THEME_STORAGE_KEY } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME.replace(/-/g, ' ')} — Documentation`,
    template: '%s · EDA with Python Docs',
  },
  description: SITE_TAGLINE,
  openGraph: {
    title: 'Data Preprocessing & EDA with Python',
    description: SITE_TAGLINE,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// Blocking script, runs before first paint, so the correct theme class is
// already on <html> by the time anything renders — this is what prevents a
// flash of the wrong theme. It reads localStorage first, then falls back to
// the OS-level system preference on a first visit (no stored value yet).
// Kept as a plain string (not an imported .js file) so it's inlined directly
// and executes synchronously ahead of hydration.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-5xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
