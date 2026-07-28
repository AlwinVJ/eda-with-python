import { Home, Compass, FolderKanban, BookOpen, Library, Info, Mail } from 'lucide-react';
import type { ComponentType } from 'react';

export const SITE_NAME = 'EDA-With-Python';
export const SITE_TAGLINE = 'A practical, project-driven roadmap for mastering modern Data Science.';

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  matchPrefixes?: string[];
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learning-guide', label: 'Learning Guide', icon: Compass },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  {
    href: '/documentation',
    label: 'Documentation',
    icon: BookOpen,
    matchPrefixes: ['/docs', '/handbooks', '/cheatsheets', '/datasets', '/resources'],
  },
  { href: '/references', label: 'References', icon: Library },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function isNavItemActive(item: NavItem, pathname: string | null): boolean {
  if (!pathname) return false;
  if (item.href === '/') return pathname === '/';
  if (pathname.startsWith(item.href)) return true;
  return item.matchPrefixes?.some((prefix) => pathname.startsWith(prefix)) ?? false;
}

export const THEME_STORAGE_KEY = 'eda-docs-theme';
export type Theme = 'light' | 'dark';
