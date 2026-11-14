import { Home, FolderKanban } from "lucide-react";
import type { ComponentType } from "react";

export const SITE_NAME = "EDA-With-Python";
export const SITE_TAGLINE =
  "A practical, project-driven roadmap for mastering modern Data Science.";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  matchPrefixes?: string[];
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
];

export function isNavItemActive(item: NavItem, pathname: string | null): boolean {
  if (!pathname) return false;
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return item.matchPrefixes?.some((prefix) => pathname.startsWith(prefix)) ?? false;
}

export const THEME_STORAGE_KEY = "eda-docs-theme";
export type Theme = "light" | "dark";
