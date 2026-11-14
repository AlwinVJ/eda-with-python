import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Database,
  Search,
  SlidersHorizontal,
  Layers,
  GitBranch,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Exploratory Data Analysis & Data Preprocessing · Guide" },
      {
        name: "description",
        content:
          "A concise educational introduction to Exploratory Data Analysis (EDA) and Data Preprocessing for machine learning workflows.",
      },
      {
        property: "og:title",
        content: "Exploratory Data Analysis & Data Preprocessing · Guide",
      },
      {
        property: "og:description",
        content:
          "A concise educational introduction to Exploratory Data Analysis (EDA) and Data Preprocessing for machine learning workflows.",
      },
    ],
  }),
  component: HomePage,
});

export function HomePage() {
  const RECOMMENDED_PDF_URL = "https://www.stat.cmu.edu/~hseltman/309/Book/chapter4.pdf";

  return (
    <div className="space-y-16 py-2">
      {/* Hero Section */}
      <section className="space-y-5 border-b border-border pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span>Foundational Data Science Concepts</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Exploratory Data Analysis & Data Preprocessing
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground leading-relaxed">
          A concise, educational guide to understanding raw datasets, diagnosing data-quality
          issues, and preparing features for reliable machine learning workflows.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Explore Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={RECOMMENDED_PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Read Recommended PDF <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </section>

      {/* Relationship & Workflow Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">How EDA & Preprocessing Connect</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Exploratory Data Analysis and Data Preprocessing are complementary, interdependent
            stages. EDA helps us inspect the dataset, understand its properties, and identify
            data-quality issues. Preprocessing takes those concrete observations and applies the
            necessary transformations to prepare clean, model-ready inputs.
          </p>
        </div>

        {/* Minimal Visual Workflow */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 rounded-lg border border-border/60 bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-muted-foreground">01</span>
                <Database className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Raw Dataset</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unprocessed records, real-world measurements, missing entries, and heterogeneous
                data types.
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-accent/40 bg-accent/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-accent">02</span>
                <Search className="h-4 w-4 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Exploratory Analysis</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Inspect distributions, quantify missing values, detect outliers, and uncover
                predictive signals.
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-accent/40 bg-accent/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-accent">03</span>
                <SlidersHorizontal className="h-4 w-4 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Data Preprocessing</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Impute nulls, encode categories, scale numerical features, and treat anomalies based
                on EDA findings.
              </p>
            </div>

            <div className="space-y-2 rounded-lg border border-border/60 bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-muted-foreground">04</span>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Model Development</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Train, evaluate, and deploy machine learning models on high-quality, leak-free
                feature representations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Exploratory Data Analysis */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
            <Search className="h-4 w-4" />
            <span>Stage 1</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Exploratory Data Analysis (EDA)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Exploratory Data Analysis is the critical diagnostic phase where data scientists
            investigate datasets through summary statistics and graphical representations before
            building statistical or machine learning models.
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Machine learning algorithms learn relationships directly from data. Skipping EDA risks
            training algorithms on corrupted records, unhandled anomalies, severe target imbalances,
            or leaked test signals—producing artificially high validation scores that fail in
            production.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Dataset Structure & Types</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Examine sample dimensions (rows × columns), inspect schema definitions, and
              distinguish between continuous numerical, discrete, ordinal, nominal categorical, and
              datetime variables.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Missing Values & Outliers</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Detect absent or corrupted entries across features, calculate missingness percentages,
              and identify extreme outliers that could distort statistical estimators or model
              weights.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Feature Distributions</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Analyze central tendency (mean, median, mode) and dispersion (variance, standard
              deviation, interquartile range), noting skewness, bimodal peaks, and class
              proportions.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Relationships & Correlations</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Examine pairwise interactions using correlation coefficients (Pearson, Spearman),
              cross-tabulations, and scatter matrices to detect multicollinearity and strong
              predictive patterns.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 sm:col-span-2">
            <h3 className="font-semibold text-foreground">Visual Summaries & Pattern Discovery</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Pair five-number statistical summaries with targeted visualizations—such as
              histograms, box plots, violin plots, and correlation heatmaps—to validate analytical
              assumptions and reveal subtle patterns hidden within tabular data.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Data Preprocessing */}
      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Stage 2</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Data Preprocessing</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Data Preprocessing is the systematic transformation of raw, uncurated data into a clean,
            mathematically consistent format suitable for training and evaluating machine learning
            models.
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Real-world data is rarely ready for algorithms out-of-the-box; it often contains missing
            entries, textual categories, varied measurement units, or redundant variables.
            Preprocessing elevates data quality, ensures convergence in optimization algorithms, and
            prevents runtime failures.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Missing Values & Duplicates</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Apply appropriate imputation strategies (mean, median, mode, or iterative estimators)
              or prune rows where missingness is non-informative, removing redundant duplicate
              records.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Outlier Treatment</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Evaluate whether extreme observations reflect genuine signals or errors, applying
              capping (winsorization), log transformations, or robust filters where appropriate.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Categorical Encoding</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Convert qualitative labels into numerical formats using one-hot encoding for nominal
              categories, ordinal encoding for ordered ranks, or target encoding for
              high-cardinality features.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Feature Scaling & Normalization</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Standardize (zero mean, unit variance) or normalize (min-max bounded) numerical
              features so distance-sensitive algorithms (KNN, SVM, gradient descent) are not
              dominated by large scales.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Feature Selection & Engineering</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Derive informative new indicators (domain-specific ratios, interaction terms, date
              decompositions) and remove low-variance or redundant attributes to reduce complexity.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground">Model-Ready Splitting</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Structure data into independent features and target labels, splitting cleanly into
              training, validation, and testing sets before fitting transformers to prevent data
              leakage.
            </p>
          </div>
        </div>

        {/* Note on technique selection */}
        <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-foreground">Techniques depend on the problem:</strong> Not every
            preprocessing step is mandatory for every dataset. For instance, tree-based models (like
            Random Forests and gradient boosted trees) naturally handle unscaled features, whereas
            linear models, neural networks, and distance-based estimators require explicit scaling
            and encoding.
          </p>
        </div>
      </section>

      {/* Section 3: Recommended Reading Resource Card */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Recommended Reading</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Academic resource for foundational statistical concepts and data preparation methods.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5 min-w-0">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-muted-foreground">
                <FileText className="h-3.5 w-3.5 text-accent" />
                <span>Carnegie Mellon University · Dr. Howard Seltman</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Recommended Reading – Data Preprocessing
              </h3>
              <p className="max-w-2xl text-xs text-muted-foreground leading-relaxed">
                A focused chapter covering data preparation, data cleaning principles, and related
                statistical concepts from Carnegie Mellon University.
              </p>
            </div>
            <div className="shrink-0 pt-2 sm:pt-0">
              <a
                href={RECOMMENDED_PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Read PDF <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA to Projects */}
      <section className="rounded-xl border border-border bg-muted/30 p-6 sm:p-8 text-center space-y-4">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
          <GitBranch className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Explore Practical Project Implementations
          </h2>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
            See these EDA and preprocessing workflows in action through hands-on case studies,
            interactive project reports, and machine learning pipelines.
          </p>
        </div>
        <div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Explore Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
