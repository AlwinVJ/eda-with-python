'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/constants';

// The actual theme is already applied before hydration by the inline script
// in app/layout.tsx (see THEME_INIT_SCRIPT) — this component only needs to
// read the resulting class to sync its own icon state, then toggle + persist
// on click. This avoids a flash of the wrong theme on load.
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {/* Render nothing theme-specific until mounted, to avoid a hydration mismatch */}
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
