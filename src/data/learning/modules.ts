import type { LearningModule } from "./types";

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "foundations",
    order: 1,
    title: "Module 1: Foundations & Taxonomy of EDA",
    shortTitle: "Foundations & Taxonomy",
    description:
      "Understand what Exploratory Data Analysis is, the 5 core reasons why analysts perform it, and the foundational 2×2 cross-classification matrix that governs all EDA techniques.",
    iconName: "Search",
    pdfReference: "Chapter 4 Intro & Section 4.1 (pp. 61–63)",
    topics: [
      {
        slug: "what-is-eda",
        title: "What is EDA & The 5 Core Objectives",
        subtitle: "A First Look at the Data",
        summary:
          "Discover what EDA really means, why looking at raw numbers is overwhelming, and the 5 critical purposes of exploratory analysis.",
        estimatedMinutes: 8,
      },
      {
        slug: "eda-taxonomy",
        title: "Data Anatomy & The 2×2 Taxonomy of EDA",
        subtitle: "The Four Types of Exploratory Analysis",
        summary:
          "Master rectangular data arrays, explanatory vs outcome roles, and the universal 2×2 classification: univariate vs multivariate, graphical vs non-graphical.",
        estimatedMinutes: 10,
      },
      {
        slug: "population-vs-sample",
        title: "Populations, Samples & Sampling Distributions",
        subtitle: "Parameters as Secrets of Nature",
        summary:
          "Differentiate fixed population parameters from variable sample statistics, and understand why sample distributions vary from experiment to experiment.",
        estimatedMinutes: 9,
      },
    ],
  },
  {
    id: "univariate-non-graphical",
    order: 2,
    title: "Module 2: Univariate Non-Graphical EDA",
    shortTitle: "Univariate Non-Graphical",
    description:
      "Analyze single variables using numerical summary statistics. Learn tabulation for categorical data, central tendency, dispersion metrics, robustness, skewness, and kurtosis.",
    iconName: "Table",
    pdfReference: "Section 4.2 (pp. 63–72)",
    topics: [
      {
        slug: "categorical-tabulation",
        title: "Categorical Data Tabulation & Proportions",
        subtitle: "Counts, Relative Frequencies & Data Integrity",
        summary:
          "Construct frequency tables, calculate proportions and percentages, and use totals to verify data integrity and prevent data loss.",
        estimatedMinutes: 8,
      },
      {
        slug: "quantitative-characteristics",
        title: "The Five Characteristics of Quantitative Data",
        subtitle: "Center, Spread, Modality, Shape, and Outliers",
        summary:
          "Learn the five foundational dimensions that describe any quantitative distribution before calculating formal statistics.",
        estimatedMinutes: 7,
      },
      {
        slug: "central-tendency",
        title: "Measures of Central Tendency & Robustness",
        subtitle: "Mean, Median, Mode & The Fulcrum Analogy",
        summary:
          "Compare the arithmetic mean as a physical balance point against the robust median, examining the US Census income case study.",
        estimatedMinutes: 12,
      },
      {
        slug: "measures-of-spread",
        title: "Measures of Spread & Dispersion",
        subtitle: "Variance, Standard Deviation, IQR & Range",
        summary:
          "Understand deviations summing to zero, sample variance with n-1, standard deviation units, quartiles, IQR, and the danger of range.",
        estimatedMinutes: 14,
      },
      {
        slug: "skewness-and-kurtosis",
        title: "Shape Metrics: Skewness & Kurtosis",
        subtitle: "Asymmetry, Peakedness & Standard Error Rules",
        summary:
          "Measure distribution asymmetry and tail weight, and evaluate statistical normality using ±2 standard error decision rules.",
        estimatedMinutes: 11,
      },
    ],
  },
  {
    id: "univariate-graphical",
    order: 3,
    title: "Module 3: Univariate Graphical EDA",
    shortTitle: "Univariate Graphical",
    description:
      "Visualize single-variable distributions. Master histogram binning strategies, stem-and-leaf displays, Tukey boxplot outlier diagnostics, and quantile-normal (Q-Q) plots.",
    iconName: "BarChart2",
    pdfReference: "Section 4.3 (pp. 72–88)",
    topics: [
      {
        slug: "histograms-and-bins",
        title: "Histograms & Binning Strategies",
        subtitle: "The Art of Choosing Bin Widths",
        summary:
          "Construct frequency and density histograms, observe how bin width choices alter shape perception, and examine sample-size variability.",
        estimatedMinutes: 10,
      },
      {
        slug: "stem-and-leaf",
        title: "Stem-and-Leaf Displays",
        subtitle: "Visualizing Data Without Hiding Values",
        summary:
          "Build manual stem-and-leaf plots that display distribution shape while preserving every single raw measurement value.",
        estimatedMinutes: 7,
      },
      {
        slug: "boxplots-outliers",
        title: "Boxplots & Outlier Diagnostics",
        subtitle: "Tukey Hinges, 1.5×IQR Rule & Whiskers",
        summary:
          "Deconstruct boxplot anatomy, learn the 1.5×IQR outlier rule, explore the hen-and-eggs case study, and diagnose skewness and fat tails.",
        estimatedMinutes: 13,
      },
      {
        slug: "quantile-normal-plots",
        title: "Quantile-Normal (Q-Q) Plots",
        subtitle: "Diagnosing Violations of Normality",
        summary:
          "Plot sample quantiles against theoretical Gaussian values to detect skewness, fat tails, discrete ties, single outliers, and bimodality.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "multivariate-non-graphical",
    order: 4,
    title: "Module 4: Multivariate Non-Graphical EDA",
    shortTitle: "Multivariate Non-Graphical",
    description:
      "Explore relationships between two or more variables numerically. Calculate cross-tabulations, condition quantitative variables on categories, and derive covariance and correlation matrices.",
    iconName: "Grid",
    pdfReference: "Section 4.4 (pp. 88–94)",
    topics: [
      {
        slug: "cross-tabulation",
        title: "Cross-Tabulation & Contingency Tables",
        subtitle: "Two-Way Frequency & Percentage Analysis",
        summary:
          "Analyze two categorical variables using contingency tables, calculating and interpreting cell, row, and column percentages.",
        estimatedMinutes: 10,
      },
      {
        slug: "grouped-statistics",
        title: "Univariate Statistics by Category",
        subtitle: "Conditioning & Informal ANOVA",
        summary:
          "Condition quantitative variables on categorical factors to perform informal ANOVA, check medians, and test equal variance assumptions.",
        estimatedMinutes: 9,
      },
      {
        slug: "covariance-and-correlation",
        title: "Covariance & Pearson Correlation",
        subtitle: "Theory, Formula & Manual Calculation",
        summary:
          "Derive sample covariance and Pearson's r, walk through a manual calculation with Age and Strength, and learn why zero correlation does not mean independence.",
        estimatedMinutes: 14,
      },
      {
        slug: "correlation-matrices",
        title: "Covariance & Correlation Matrices",
        subtitle: "Pairwise Multi-Feature Relationships",
        summary:
          "Assemble and interpret p×p symmetric covariance and correlation matrices for multivariate datasets.",
        estimatedMinutes: 8,
      },
    ],
  },
  {
    id: "multivariate-graphical",
    order: 5,
    title: "Module 5: Multivariate Graphical EDA",
    shortTitle: "Multivariate Graphical",
    description:
      "Visualize relationships across multiple variables simultaneously. Use grouped barplots, side-by-side boxplots for categorical comparisons, and scatterplots with multi-attribute visual encodings.",
    iconName: "Scatter",
    pdfReference: "Section 4.5 (pp. 94–97)",
    topics: [
      {
        slug: "grouped-barplots",
        title: "Grouped Barplots for Categorical Pairs",
        subtitle: "Side-by-Side & Stacked Frequency Displays",
        summary:
          "Visualize pairs of categorical variables using grouped barplots to compare proportions and joint frequency distributions.",
        estimatedMinutes: 8,
      },
      {
        slug: "side-by-side-boxplots",
        title: "Side-by-Side Boxplots & Conditioning",
        subtitle: "Categorical Explanatory × Quantitative Outcome",
        summary:
          "Condition quantitative metrics across category levels, comparing medians, IQRs, and outliers across Age Groups in the Strength study.",
        estimatedMinutes: 10,
      },
      {
        slug: "scatterplots-multivariate",
        title: "Scatterplots & Multi-Variable Encodings",
        subtitle: "Explanatory vs Outcome & 3rd/4th Variable Encodings",
        summary:
          "Map quantitative relationships with scatterplots, applying conventions (outcome on y) and encoding additional variables via color and symbols.",
        estimatedMinutes: 11,
      },
    ],
  },
  {
    id: "statistical-principles",
    order: 6,
    title: "Module 6: Statistical Principles & EDA Protocol",
    shortTitle: "Statistical Principles & Protocol",
    description:
      "Deepen your theoretical statistical intuition with degrees of freedom and master the complete end-to-end EDA protocol to analyze any real-world dataset independently.",
    iconName: "ShieldCheck",
    pdfReference: "Section 4.6 & Holistic Synthesis (pp. 98–100)",
    topics: [
      {
        slug: "degrees-of-freedom",
        title: "A Deep Dive into Degrees of Freedom",
        subtitle: "Independent Information & Pooled Variance",
        summary:
          "Demystify degrees of freedom, understand why sample variance requires n-1 df, and learn pooled variance formulas across k groups.",
        estimatedMinutes: 12,
      },
      {
        slug: "end-to-end-eda-workflow",
        title: "The Complete EDA Protocol & Beginner's Checklist",
        subtitle: "From Raw Data to Modeling Recommendations",
        summary:
          "Synthesize the 4 types of EDA into a structured, repeatable 6-step checklist that you can apply to any real-world data science project.",
        estimatedMinutes: 15,
      },
    ],
  },
];

export function getModuleById(id: string): LearningModule | undefined {
  return LEARNING_MODULES.find((m) => m.id === id);
}

export function getAllModules(): LearningModule[] {
  return LEARNING_MODULES;
}
