import {
  Home, Compass, FolderKanban, BookOpen, Info, Mail,
} from 'lucide-react';
import type { ComponentType } from 'react';

// ============================================================================
// SITE IDENTITY
// ============================================================================
export const SITE_NAME = 'EDA-With-Python';
export const SITE_TAGLINE = 'A practical, project-driven roadmap for mastering modern Data Science.';

// ============================================================================
// NAVIGATION
// Global navigation items and routing definitions.
// `matchPrefixes` lists additional route prefixes that should count as
// "active" for this nav item (e.g. Documentation covers four sub-routes).
// ============================================================================
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
    matchPrefixes: ['/handbooks', '/cheatsheets', '/datasets', '/resources'],
  },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function isNavItemActive(item: NavItem, pathname: string | null): boolean {
  if (!pathname) return false;
  if (item.href === '/') return pathname === '/';
  if (pathname.startsWith(item.href)) return true;
  return item.matchPrefixes?.some((prefix) => pathname.startsWith(prefix)) ?? false;
}

// ============================================================================
// THEME
// ============================================================================
export const THEME_STORAGE_KEY = 'eda-docs-theme';
export type Theme = 'light' | 'dark';
