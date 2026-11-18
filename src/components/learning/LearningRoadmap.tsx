import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  Grid,
  Layers,
  ScatterChart,
  Search,
  ShieldCheck,
  Sparkles,
  Table,
} from "lucide-react";
import { getAllModules, getAllTopics } from "@/data/learning";
import type { LearningModule } from "@/data/learning/types";

const moduleIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search: Search,
  Table: Table,
  BarChart2: BarChart2,
  Grid: Grid,
  Scatter: ScatterChart,
  ShieldCheck: ShieldCheck,
};

export function LearningRoadmap() {
  const modules = getAllModules();
  const allTopics = getAllTopics();
  const totalMinutes = allTopics.reduce((acc, t) => acc + t.estimatedMinutes, 0);

  return (
    <div className="space-y-12 py-4">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-muted/40 p-6 sm:p-8 md:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Comprehensive Learning Path · Beginner to Advanced</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Exploratory Data Analysis <br />
            <span className="text-primary font-extrabold">Learning Roadmap</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Master the foundational art and rigorous science of Exploratory Data Analysis. Directly
            derived from <strong className="text-foreground">Dr. Howard Seltman's</strong> acclaimed
            Carnegie Mellon University curriculum (<em>Experimental Design and Analysis</em>,
            Chapter 4), this interactive curriculum takes you from rectangular data arrays to
            multivariate diagnostics.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5 text-foreground bg-background/80 px-3 py-1.5 rounded-lg border border-border">
              <Layers className="h-4 w-4 text-primary" />
              <span>6 Modules</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground bg-background/80 px-3 py-1.5 rounded-lg border border-border">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>21 In-Depth Lessons</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground bg-background/80 px-3 py-1.5 rounded-lg border border-border">
              <Clock className="h-4 w-4 text-primary" />
              <span>
                ~{Math.round(totalMinutes / 60)} Hours of Study ({totalMinutes} mins)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground bg-background/80 px-3 py-1.5 rounded-lg border border-border">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>Interactive Quizzes & Python Code</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to="/learn/$topicId"
              params={{ topicId: "what-is-eda" }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all hover:gap-3"
            >
              <span>Start Lesson 1: What is EDA?</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#taxonomy-preview"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <Compass className="h-4 w-4 text-muted-foreground" />
              <span>Explore Taxonomy</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2x2 Taxonomy Visualization Card */}
      <section
        id="taxonomy-preview"
        className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-5 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Core Pedagogical Framework
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Dr. Seltman's 2×2 Cross-Classification Matrix
            </h2>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            Chapter 4, Section 4.1 (p. 63)
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          All exploratory data analysis techniques are systematically classified along two
          fundamental dimensions: the <strong>number of variables analyzed simultaneously</strong>{" "}
          (Univariate vs. Multivariate) and the <strong>method of presentation</strong>{" "}
          (Non-Graphical vs. Graphical).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Quadrant 1 */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-foreground">1. Univariate Non-Graphical</span>
              <span className="text-[11px] font-mono text-primary font-semibold">Module 2</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Single-variable numerical summaries: Tabulation for categorical; Center (mean,
              median), Spread (variance, s, IQR), Modality, Shape (skewness, kurtosis), and
              Outliers.
            </p>
          </div>

          {/* Quadrant 2 */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-foreground">2. Univariate Graphical</span>
              <span className="text-[11px] font-mono text-primary font-semibold">Module 3</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Single-variable visual representations: Histograms and Freedman-Diaconis binning,
              Stem-and-leaf plots, Tukey boxplots (1.5×IQR fences), and Quantile-Normal (Q-Q) plots.
            </p>
          </div>

          {/* Quadrant 3 */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-foreground">
                3. Multivariate Non-Graphical
              </span>
              <span className="text-[11px] font-mono text-primary font-semibold">Module 4</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Multi-variable numerical associations: Cross-tabulations (row %, col %), Grouped
              statistics (informal ANOVA & homoscedasticity checks), Covariance, and Correlation
              matrices.
            </p>
          </div>

          {/* Quadrant 4 */}
          <div className="rounded-xl border border-border/80 bg-muted/20 p-4 space-y-2 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-foreground">4. Multivariate Graphical</span>
              <span className="text-[11px] font-mono text-primary font-semibold">Module 5</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Multi-variable visual relationships: Grouped & 100% stacked barplots, Side-by-side
              boxplots across factor levels, and Scatterplots with 3rd/4th variable color & symbol
              encodings.
            </p>
          </div>
        </div>
      </section>

      {/* Module-by-Module Curriculum Cards */}
      <section className="space-y-8">
        <div className="border-b border-border pb-3">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Complete Curriculum (6 Modules · 21 Lessons)
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Follow the modules in sequence or jump directly to any topic of interest.
          </p>
        </div>

        <div className="space-y-6">
          {modules.map((mod: LearningModule) => {
            const Icon = moduleIconMap[mod.iconName] || BookOpen;
            const moduleTopics = allTopics.filter((t) => t.moduleId === mod.id);
            const modMinutes = moduleTopics.reduce((a, b) => a + b.estimatedMinutes, 0);

            return (
              <div
                key={mod.id}
                className="rounded-xl border border-border bg-card overflow-hidden shadow-2xs hover:border-primary/40 transition-colors"
              >
                {/* Module Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border bg-muted/30 p-5">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="rounded-xl bg-primary/10 p-2.5 text-primary shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          Module {mod.order}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {modMinutes} mins total
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">
                        {mod.title.replace(/^Module \d+:\s*/, "")}
                      </h3>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground font-mono bg-background/80 px-2.5 py-1 rounded border border-border shrink-0 self-start sm:self-auto">
                    {mod.pdfReference}
                  </div>
                </div>

                {/* Module Description */}
                <div className="p-5 border-b border-border/50 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {mod.description}
                </div>

                {/* Topics Grid */}
                <div className="divide-y divide-border/50 bg-background/50">
                  {moduleTopics.map((topic) => (
                    <Link
                      key={topic.slug}
                      to="/learn/$topicId"
                      params={{ topicId: topic.slug }}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {topic.globalOrder}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {topic.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {topic.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto pl-9 sm:pl-0">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {topic.estimatedMinutes} min
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Textbook Citation & Attribution Card */}
      <section className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-3">
        <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
          <BookMarked className="h-5 w-5" />
          <span>Curriculum Source & Academic Citation</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
          This comprehensive learning platform is built directly from Dr. Howard Seltman's course
          text:
        </p>
        <blockquote className="border-l-2 border-primary pl-3 py-1 font-mono text-xs text-muted-foreground">
          Seltman, Howard J. (2018). <em>Experimental Design and Analysis</em>. Chapter 4:
          "Exploratory Data Analysis", pp. 61–100. Carnegie Mellon University.
        </blockquote>
        <p className="text-xs text-muted-foreground">
          All case studies, datasets (CMU college enrollment sample, 2004 US Census Household
          Income, Seltman Table 4.4 Age vs Strength, Hen & Eggs, and EDA2.dat), formulas, and
          decision rules originate from this masterwork.
        </p>
      </section>
    </div>
  );
}
