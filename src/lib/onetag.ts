/**
 * OneTag AI Integration & EDA Assistant Configuration
 *
 * Centralizes the OneTag AI JavaScript SDK typings, configuration key,
 * system persona prompt, page-context integration, and contextual responder.
 */

import { getPageContext, buildSystemPrompt, type PageContextInfo } from "./chatbotContext";
import { generateContextualResponse } from "./chatbotResponder";

export * from "./chatbotContext";
export * from "./chatbotResponder";

export interface OneTagAskOptions {
  stream?: (delta: string) => void;
  system?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  signal?: AbortSignal;
  json?: boolean;
  maxTokens?: number;
  key?: string;
  via?: string;
}

export interface OneTagSDK {
  ask: (prompt: string, input?: unknown, options?: OneTagAskOptions) => Promise<string>;
  configure: (options: { key?: string; endpoint?: string; via?: string }) => void;
}

declare global {
  interface Window {
    onetag?: OneTagSDK;
  }
}

/**
 * Public integration key for OneTag AI.
 * Falls back to "PASTE_MY_ONETAG_KEY_HERE" as documented by OneTag AI.
 * Can be overridden via the VITE_ONETAG_KEY environment variable.
 */
export const ONETAG_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_ONETAG_KEY) ||
  "PASTE_MY_ONETAG_KEY_HERE";

/**
 * Checks whether the active key is still the default template placeholder.
 */
export function isPlaceholderKey(key: string = ONETAG_KEY): boolean {
  if (!key) return true;
  const trimmed = key.trim();
  return (
    trimmed === "PASTE_MY_ONETAG_KEY_HERE" || /^YOUR_/i.test(trimmed) || trimmed === "placeholder"
  );
}

export const EDA_CHATBOT_NAME = "Eddie";

export const EDA_CHATBOT_WELCOME_MESSAGE =
  "Hey! I'm Eddie, your EDA and machine learning assistant. I understand the exact page you're currently viewing. Ask me anything about this page, project findings, Python code, or statistics!";

export const EDA_CHATBOT_SYSTEM_PROMPT = `You are Eddie, an educational assistant integrated into an Exploratory Data Analysis and Machine Learning learning website.

Your primary responsibility is to help learners understand EDA, Python, statistics, data preprocessing, and hands-on projects.

Prioritize the educational content available on the visitor's current page when answering questions.

Explain technical concepts using:
1. A simple, intuitive explanation.
2. A formal technical definition.
3. A practical example from the project/page.
4. Python code when relevant.

Assume the learner may be a beginner.

Avoid inventing information about the website's content. If a question concerns information not available on the current page, clearly distinguish general knowledge from page-specific information.

Keep explanations structured, technically accurate, and educational.`;

/**
 * Extracts clean, authoritative context for the active page.
 * Uses the centralized context generator.
 */
export function extractPageContext(pathname?: string): string {
  const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  const ctx: PageContextInfo = getPageContext(currentPath);
  return ctx.fullTextContext;
}

/**
 * Returns contextual starter questions based on the active route.
 */
export function getStarterQuestions(pathname: string): string[] {
  const ctx: PageContextInfo = getPageContext(pathname);
  return ctx.starterQuestions;
}

/**
 * Generates grounded, contextual answers using the page context.
 */
export function getEducationalFallbackResponse(
  prompt: string,
  _context?: string,
  pathname?: string,
): string {
  const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  const ctx: PageContextInfo = getPageContext(currentPath);
  return generateContextualResponse(prompt, ctx);
}
