import { useState } from "react";
import { CheckCircle2, HelpCircle, RefreshCw, XCircle } from "lucide-react";
import type { KnowledgeCheck } from "@/data/learning/types";

interface InteractiveQuizProps {
  quiz: KnowledgeCheck;
}

export function InteractiveQuiz({ quiz }: InteractiveQuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedIndex(idx);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setSubmitted(false);
  };

  const isCorrect = selectedIndex === quiz.correctIndex;

  return (
    <div className="my-8 rounded-xl border border-primary/20 bg-card p-5 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Interactive Knowledge Check
          </span>
          <h4 className="text-base sm:text-lg font-semibold text-foreground">
            Test Your Understanding
          </h4>
        </div>
      </div>

      <p className="text-sm sm:text-base font-medium text-foreground mb-4">{quiz.question}</p>

      {/* Multiple Choice Options */}
      <div className="space-y-2.5">
        {quiz.options.map((option, idx) => {
          let optionStyles = "border-border bg-background hover:bg-muted/50 text-foreground";
          let badge = (
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground">
              {String.fromCharCode(65 + idx)}
            </span>
          );

          if (submitted) {
            if (idx === quiz.correctIndex) {
              optionStyles =
                "border-green-500/60 bg-green-500/10 text-green-950 dark:text-green-200 font-medium";
              badge = <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />;
            } else if (idx === selectedIndex) {
              optionStyles = "border-red-500/60 bg-red-500/10 text-red-950 dark:text-red-200";
              badge = <XCircle className="h-5 w-5 text-red-600 shrink-0" />;
            } else {
              optionStyles = "opacity-50 border-border bg-muted/20 text-muted-foreground";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`flex w-full items-start gap-3 rounded-lg border p-3.5 text-left text-xs sm:text-sm transition-all ${optionStyles}`}
            >
              {badge}
              <span className="flex-1 leading-relaxed">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback and Explanation */}
      {submitted && (
        <div
          className={`mt-4 rounded-lg border p-4 text-xs sm:text-sm ${
            isCorrect
              ? "border-green-500/30 bg-green-500/5 text-foreground"
              : "border-amber-500/30 bg-amber-500/5 text-foreground"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`font-bold flex items-center gap-1.5 ${
                isCorrect
                  ? "text-green-600 dark:text-green-400"
                  : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Correct Answer!
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" /> Not Quite
                </>
              )}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="h-3 w-3" /> Retry Question
            </button>
          </div>
          <p className="text-muted-foreground leading-relaxed">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
