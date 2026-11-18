import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Info,
  Lightbulb,
} from "lucide-react";
import { FormulaCard } from "./FormulaCard";
import { CodeBlock } from "./CodeBlock";
import { InteractiveQuiz } from "./InteractiveQuiz";
import type { LearningTopic, TopicSection } from "@/data/learning/types";
import { getModuleById, getTopicNavigation } from "@/data/learning";

interface TopicViewProps {
  topic: LearningTopic;
}

export function TopicView({ topic }: TopicViewProps) {
  const currentModule = getModuleById(topic.moduleId);
  const { prev, next } = getTopicNavigation(topic.slug);

  return (
    <article className="min-w-0 max-w-4xl py-6 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumbs"
        className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap"
      >
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/learn" className="hover:text-foreground transition-colors">
          Learn EDA
        </Link>
        <span>/</span>
        <span className="text-muted-foreground truncate max-w-[200px]">
          {currentModule?.shortTitle || "Curriculum"}
        </span>
        <span>/</span>
        <span className="text-foreground font-semibold truncate max-w-[250px]">{topic.title}</span>
      </nav>

      {/* Lesson Hero Header */}
      <header className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            Lesson {topic.globalOrder} of 21
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {topic.estimatedMinutes} min read
          </span>
          {currentModule && (
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              {currentModule.title.split(":")[0]}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          {topic.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-medium">{topic.subtitle}</p>

        {/* Executive Summary Card */}
        <div className="rounded-xl border border-border/80 bg-muted/30 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <GraduationCap className="h-4 w-4" />
            <span>Executive Lesson Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground leading-relaxed">{topic.summary}</p>
        </div>

        {/* Prerequisites */}
        {topic.prerequisites.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap pt-1">
            <span className="font-semibold text-foreground">Prerequisites:</span>
            {topic.prerequisites.map((prereq, idx) => (
              <span
                key={idx}
                className="rounded bg-muted/60 px-2 py-0.5 border border-border/40 font-mono text-[11px]"
              >
                {prereq}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Quick Table of Contents / Outline */}
      <nav aria-label="Topic Outline" className="rounded-lg border border-border/60 bg-card p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
          In This Lesson
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {topic.sections.map((section, idx) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-1"
            >
              <span className="font-mono text-primary font-semibold">{idx + 1}.</span>
              <span className="truncate">{section.title.replace(/^\d+\.\s*/, "")}</span>
            </a>
          ))}
          <a
            href="#quiz"
            className="flex items-center gap-2 text-primary font-semibold hover:underline py-1"
          >
            <span className="font-mono">✓</span>
            <span>Interactive Knowledge Check</span>
          </a>
        </div>
      </nav>

      {/* Lesson Content Sections */}
      <div className="space-y-12">
        {topic.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground border-b border-border/60 pb-2">
              {section.title}
            </h2>

            {/* Paragraph Content */}
            {section.content && section.content.length > 0 && (
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-foreground/90">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {/* Steps */}
            {section.steps && section.steps.length > 0 && (
              <div className="my-4 space-y-2.5 pl-1">
                {section.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg bg-muted/20 border border-border/40 p-3 text-xs sm:text-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                    <span className="text-foreground leading-relaxed pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bullets */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="my-3 space-y-2 pl-2">
                {section.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tables */}
            {section.table && (
              <div className="my-6 overflow-hidden rounded-lg border border-border">
                {section.table.caption && (
                  <div className="bg-muted/60 px-4 py-2 text-xs font-semibold text-muted-foreground border-b border-border">
                    {section.table.caption}
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-muted/40 border-b border-border text-foreground font-semibold">
                      <tr>
                        {section.table.headers.map((h, idx) => (
                          <th key={idx} className="px-4 py-2.5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-2.5 text-foreground/90">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Callouts */}
            {section.callout && (
              <div
                className={`my-5 rounded-xl border p-4 text-xs sm:text-sm ${
                  section.callout.type === "pdf-source"
                    ? "border-primary/30 bg-primary/5 text-foreground"
                    : section.callout.type === "warning"
                      ? "border-amber-500/30 bg-amber-500/5 text-foreground"
                      : section.callout.type === "tip"
                        ? "border-green-500/30 bg-green-500/5 text-foreground"
                        : "border-border bg-muted/30 text-foreground"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1.5 text-xs">
                  {section.callout.type === "pdf-source" && (
                    <BookMarked className="h-4 w-4 text-primary" />
                  )}
                  {section.callout.type === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  )}
                  {section.callout.type === "tip" && (
                    <Lightbulb className="h-4 w-4 text-green-500" />
                  )}
                  {section.callout.type === "note" && <Info className="h-4 w-4 text-blue-500" />}
                  <span>{section.callout.title || "Note"}</span>
                </div>
                <p className="leading-relaxed text-muted-foreground">{section.callout.message}</p>
              </div>
            )}

            {/* Formula */}
            {section.formula && <FormulaCard formula={section.formula} />}

            {/* Code */}
            {section.code && <CodeBlock codeSnippet={section.code} />}

            {/* Content After */}
            {section.content_after && section.content_after.length > 0 && (
              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-foreground/90 mt-4">
                {section.content_after.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {/* Common Mistakes */}
            {section.mistakes && section.mistakes.length > 0 && (
              <div className="my-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 font-bold text-destructive text-sm mb-3">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Common Beginner Mistakes to Avoid</span>
                </div>
                <ul className="space-y-2">
                  {section.mistakes.map((mistake, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90"
                    >
                      <span className="text-destructive font-bold">✕</span>
                      <span className="leading-relaxed">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Key Takeaways */}
      {topic.takeaways && topic.takeaways.length > 0 && (
        <section className="rounded-xl border border-primary/30 bg-primary/5 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-lg">
            <CheckCircle2 className="h-5 w-5" />
            <span>Key Takeaways for Lesson {topic.globalOrder}</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {topic.takeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-lg bg-background/80 p-3 border border-border/50 text-xs sm:text-sm"
              >
                <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                <span className="text-foreground/90 leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Interactive Quiz Section */}
      <section id="quiz" className="scroll-mt-20">
        <InteractiveQuiz quiz={topic.quiz} />
      </section>

      {/* Bottom Prev / Next Navigation Footer */}
      <nav
        aria-label="Previous and Next Lesson"
        className="flex flex-col sm:flex-row items-stretch justify-between gap-4 border-t border-border pt-8"
      >
        {prev ? (
          <Link
            to="/learn/$topicId"
            params={{ topicId: prev.slug }}
            className="group flex flex-1 items-center gap-3 rounded-xl border border-border p-4 text-left hover:border-primary/50 hover:bg-muted/30 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground uppercase font-semibold">
                Previous Lesson
              </div>
              <div className="text-sm font-semibold text-foreground truncate">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            to="/learn/$topicId"
            params={{ topicId: next.slug }}
            className="group flex flex-1 items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 text-right hover:border-primary/60 hover:bg-primary/10 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="text-xs text-primary uppercase font-bold">Next Lesson</div>
              <div className="text-sm font-semibold text-foreground truncate">{next.title}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        ) : (
          <Link
            to="/learn"
            className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-green-500/30 bg-green-500/5 p-4 text-right hover:bg-green-500/10 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="text-xs text-green-600 dark:text-green-400 uppercase font-bold">
                Curriculum Completed
              </div>
              <div className="text-sm font-semibold text-foreground">
                Return to Curriculum Overview
              </div>
            </div>
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
          </Link>
        )}
      </nav>
    </article>
  );
}
