import { useState } from "react";
import { Calculator, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import type { FormulaDefinition } from "@/data/learning/types";

interface FormulaCardProps {
  formula: FormulaDefinition;
}

export function FormulaCard({ formula }: FormulaCardProps) {
  const [showExample, setShowExample] = useState(true);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-primary/20 bg-card shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border bg-primary/5 px-4 py-3">
        <Calculator className="h-5 w-5 text-primary shrink-0" />
        <h4 className="font-semibold text-foreground text-sm sm:text-base">{formula.title}</h4>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Display Formula */}
        <div className="rounded-lg border border-border/80 bg-muted/40 p-4 text-center">
          <div className="overflow-x-auto py-1 font-mono text-base sm:text-lg font-bold text-foreground tracking-wide">
            {formula.displayFormula}
          </div>
        </div>

        {/* Variables Glossary */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Variable Definitions & Symbols
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {formula.variables.map((v, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 rounded-md bg-muted/30 p-2 border border-border/40"
              >
                <code className="font-mono font-bold text-primary shrink-0 px-1.5 py-0.5 rounded bg-primary/10">
                  {v.symbol}
                </code>
                <span className="text-muted-foreground">{v.meaning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intuition Callout */}
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs sm:text-sm">
          <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-foreground">Intuitive Meaning: </span>
            <span className="text-muted-foreground">{formula.intuition}</span>
          </div>
        </div>

        {/* Step-by-Step Example Calculation */}
        {formula.exampleCalculation && (
          <div className="rounded-lg border border-border bg-muted/20">
            <button
              type="button"
              onClick={() => setShowExample((prev) => !prev)}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
            >
              <span className="font-semibold flex items-center gap-2">
                Step-by-Step Manual Calculation Walkthrough
              </span>
              {showExample ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {showExample && (
              <div className="border-t border-border px-3.5 py-3 space-y-2.5 text-xs sm:text-sm">
                <div className="font-medium text-foreground bg-muted/40 p-2 rounded border border-border/50">
                  <span className="text-muted-foreground font-normal">Given: </span>
                  {formula.exampleCalculation.given}
                </div>

                <div className="space-y-1.5 pl-1">
                  {formula.exampleCalculation.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="font-mono text-primary text-xs shrink-0 mt-0.5 font-bold">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-md bg-primary/10 border border-primary/20 p-2.5">
                  <div className="font-mono font-bold text-foreground">
                    Result: {formula.exampleCalculation.result}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formula.exampleCalculation.interpretation}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
