import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import type { CodeSnippet } from "@/data/learning/types";

interface CodeBlockProps {
  codeSnippet: CodeSnippet;
}

export function CodeBlock({ codeSnippet }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is blocked
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 font-mono text-xs font-semibold text-muted-foreground uppercase">
            {codeSnippet.language || "python"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 bg-muted/20 font-mono text-xs sm:text-sm leading-relaxed text-foreground">
        <pre>
          <code>{codeSnippet.code}</code>
        </pre>
      </div>

      {/* Expected Console Output */}
      {codeSnippet.output && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-foreground">Expected Terminal Output</span>
            </div>
            <button
              type="button"
              onClick={() => setShowOutput((prev) => !prev)}
              className="text-xs text-primary hover:underline"
            >
              {showOutput ? "Hide" : "Show"} Output
            </button>
          </div>

          {showOutput && (
            <div className="overflow-x-auto bg-black/90 p-4 font-mono text-xs leading-relaxed text-emerald-400 dark:text-emerald-300">
              <pre>
                <code>{codeSnippet.output}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Pedagogical Explanation */}
      {codeSnippet.explanation && (
        <div className="border-t border-border/80 bg-primary/5 px-4 py-3 text-xs sm:text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Code Insight: </span>
          {codeSnippet.explanation}
        </div>
      )}
    </div>
  );
}
