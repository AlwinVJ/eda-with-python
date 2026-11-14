import { createContext, useContext } from "react";
import { THEME_STORAGE_KEY } from "./constants";

export type Theme = "light" | "dark";
export type ThemeCtx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

export const ThemeContext = createContext<ThemeCtx | null>(null);

export const themeNoFlashScript = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(m?'dark':'light');var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){}})();`;

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
