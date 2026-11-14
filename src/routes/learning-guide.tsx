import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getLearningGuide } from "@/lib/content";

export const Route = createFileRoute("/learning-guide")({
  head: () => ({
    meta: [
      { title: "Learning Guide · EDA with Python Docs" },
      {
        name: "description",
        content: "Guided onboarding sequence for the EDA with Python curriculum.",
      },
      { property: "og:title", content: "Learning Guide" },
      {
        property: "og:description",
        content: "Guided onboarding sequence for the EDA with Python curriculum.",
      },
    ],
  }),
  component: LearningGuidePage,
});

function LearningGuidePage() {
  const steps = getLearningGuide();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Learning Guide</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          New here? Follow these steps in order. Each one builds on the last — by the end
          you&apos;ll have completed your first project and know exactly where to go next.
        </p>
      </div>

      <ol className="relative space-y-6 border-l border-border pl-6">
        {steps.map((step) => (
          <li key={step.id} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-accent" />
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="text-xs font-mono text-muted-foreground">{step.title}</span>
              <p className="mt-0.5 text-sm text-muted-foreground">{step.summary}</p>
              <ul className="mt-3 space-y-1.5">
                {step.actions.map((action, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {i > 0 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                    <span className="font-medium">{action.verb}</span>
                    {action.href ? (
                      <a
                        href={action.href}
                        className="text-accent hover:text-primary hover:underline transition-colors"
                      >
                        {action.label}
                      </a>
                    ) : (
                      <span>{action.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
