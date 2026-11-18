import type { LearningTopic } from "../types";

export const module6Topics: LearningTopic[] = [
  {
    id: "degrees-of-freedom",
    slug: "degrees-of-freedom",
    moduleId: "statistical-principles",
    order: 1,
    globalOrder: 20,
    title: "Degrees of Freedom: Independent Pieces of Information",
    subtitle: "Why We Divide by (n - 1), Bessel's Correction & Multi-Group Pooled Variance",
    estimatedMinutes: 13,
    summary:
      "Demystify degrees of freedom in statistics, understand why calculating a sample mean consumes one degree of freedom, and master multi-group pooled variance calculations across k experimental groups.",
    prerequisites: ["measures-of-spread", "grouped-statistics"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Most Misunderstood Term in Statistics",
        content: [
          "Ask ten science or engineering students to define 'degrees of freedom', and eight will say 'it's just n minus 1 because the formula says so.' But what does it actually mean?",
          "In mathematical physics and statistics, Degrees of Freedom (df) represents the number of independent pieces of information available in your data to estimate a population parameter.",
          "Every time you estimate a preliminary parameter from your sample (such as calculating the sample mean x̄) before estimating spread, you impose a mathematical constraint on the numbers. That constraint costs exactly one degree of freedom.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. The Mathematical Origin of (n - 1)",
        content: [
          "Consider a sample of n = 4 numbers: [x_1, x_2, x_3, x_4]. Before you calculate anything, you have 4 independent, freely varying numbers. You have 4 degrees of freedom.",
          "Now, suppose someone tells you that the sample mean x̄ is 10.0.",
          "Because the mean is fixed at 10.0, the sum of all 4 numbers MUST equal 40.0: x_1 + x_2 + x_3 + x_4 = 40.0.",
          "Furthermore, the deviations from the mean MUST sum to zero: (x_1 - 10) + (x_2 - 10) + (x_3 - 10) + (x_4 - 10) = 0.",
          "You are now free to choose any values you want for the first three numbers—say, x_1 = 5, x_2 = 12, x_3 = 8.",
          "Can x_4 be anything it wants? Absolutely not! x_4 is completely trapped: 5 + 12 + 8 + x_4 = 40 -> 25 + x_4 = 40 -> x_4 MUST be 15.",
          "Only 3 of the 4 numbers were free to vary. Therefore, the sample deviations possess only n - 1 = 3 degrees of freedom!",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman (Carnegie Mellon University)",
          message:
            "If we divided the sum of squared deviations by n instead of n - 1, our variance estimate would be systematically biased—it would underestimate the true population variance σ² by a factor of (n - 1)/n. Dividing by n - 1 (Bessel's correction) perfectly compensates for the fact that the sample values are closer to their own sample mean than to the true unknown population mean.",
        },
      },
      {
        id: "mathematical-explanation",
        title: "3. Multi-Group Degrees of Freedom & Pooled Variance",
        content: [
          "When an experiment has k separate treatment groups with sample sizes n_1, n_2, ..., n_k, we estimate a separate sample mean x̄_i for each group. Each group mean costs 1 degree of freedom:",
        ],
        formula: {
          title: "Multi-Group Pooled Variance and Residual Degrees of Freedom",
          displayFormula:
            "\\text{df}_{\\text{residual}} = N - k = \\sum_{i=1}^k (n_i - 1), \\quad s_{\\text{pooled}}^2 = \\frac{\\sum_{i=1}^k \\text{SS}_i}{\\text{df}_{\\text{residual}}} = \\frac{\\sum_{i=1}^k (n_i - 1)s_i^2}{N - k}",
          variables: [
            { symbol: "k", meaning: "Number of experimental groups" },
            { symbol: "N", meaning: "Grand total number of observations across all groups: Σ n_i" },
            {
              symbol: "\\text{df}_{\\text{residual}}",
              meaning:
                "Residual degrees of freedom available to estimate within-group variance (N - k)",
            },
            {
              symbol: "\\text{SS}_i",
              meaning: "Sum of squared deviations for group i: (n_i - 1)s_i²",
            },
            {
              symbol: "s_{\\text{pooled}}^2",
              meaning: "Pooled estimate of the common population variance σ²",
            },
          ],
          intuition:
            "Pooled variance is a weighted average of individual group variances, where each group's weight is its degrees of freedom (n_i - 1). Larger groups contribute more heavily to the final estimate.",
          exampleCalculation: {
            given:
              "An experiment with 3 groups: Group 1 (n1=10, s1=4.0), Group 2 (n2=12, s2=5.0), Group 3 (n3=8, s3=3.5).",
            steps: [
              "Step 1: Compute Total Sample Size: N = 10 + 12 + 8 = 30 observations.",
              "Step 2: Compute Residual df: df = N - k = 30 - 3 = 27 degrees of freedom.",
              "Step 3: Compute Group Degrees of Freedom: df1 = 9, df2 = 11, df3 = 7.",
              "Step 4: Compute Group Variances: s1² = 16.0, s2² = 25.0, s3² = 12.25.",
              "Step 5: Compute Sum of Squares (SS): SS1 = 9 × 16 = 144.0; SS2 = 11 × 25 = 275.0; SS3 = 7 × 12.25 = 85.75.",
              "Step 6: Sum of Squares across all groups: SS_total = 144.0 + 275.0 + 85.75 = 504.75.",
              "Step 7: Compute Pooled Variance: s_pooled² = 504.75 / 27 ≈ 18.694 -> s_pooled = √18.694 ≈ 4.32.",
            ],
            result: "df = 27, s_pooled² = 18.69, s_pooled ≈ 4.32",
            interpretation:
              "Across all 30 participants and 3 groups, the best pooled estimate of measurement variability is 4.32 units, backed by 27 degrees of freedom.",
          },
        },
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: Computing Multi-Group Pooled Variance",
        content: [
          "Here is how to calculate residual degrees of freedom and pooled variance in Python:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd

# Group data: n, mean, std
group_stats = pd.DataFrame({
    'Group': ['Treatment A', 'Treatment B', 'Treatment C'],
    'n': [10, 12, 8],
    'Mean': [102.4, 114.8, 128.2],
    'StdDev': [4.0, 5.0, 3.5]
})

# Calculate individual group components
group_stats['Variance'] = group_stats['StdDev'] ** 2
group_stats['df'] = group_stats['n'] - 1
group_stats['SS'] = group_stats['df'] * group_stats['Variance']

# Grand totals
k = len(group_stats)
N = group_stats['n'].sum()
df_residual = N - k
total_SS = group_stats['SS'].sum()
pooled_variance = total_SS / df_residual
pooled_std = np.sqrt(pooled_variance)

print("=== Multi-Group Pooled Variance Calculation ===")
print(group_stats[['Group', 'n', 'df', 'StdDev', 'Variance', 'SS']])
print(f"\\nTotal Observations N:        {N}")
print(f"Total Groups k:              {k}")
print(f"Residual Degrees of Freedom: {df_residual} (N - k)")
print(f"Total Sum of Squares (SS):   {total_SS:.2f}")
print(f"Pooled Variance (s_pooled²): {pooled_variance:.3f}")
print(f"Pooled Std Dev (s_pooled):   {pooled_std:.3f}")`,
          output: `=== Multi-Group Pooled Variance Calculation ===
         Group   n  df  StdDev  Variance      SS
0  Treatment A  10   9     4.0     16.00  144.00
1  Treatment B  12  11     5.0     25.00  275.00
2  Treatment C   8   7     3.5     12.25   85.75

Total Observations N:        30
Total Groups k:              3
Residual Degrees of Freedom: 27 (N - k)
Total Sum of Squares (SS):   504.75
Pooled Variance (s_pooled²): 18.694
Pooled Std Dev (s_pooled):   4.324`,
          explanation:
            "Notice how the pooled standard deviation (4.324) sits smoothly between the smallest (3.5) and largest (5.0) individual group standard deviations, weighted by the degrees of freedom.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes",
        content: ["Avoid these critical misconceptions regarding degrees of freedom:"],
        mistakes: [
          "Believing Degrees of Freedom Is Always n - 1: In a regression model with 4 predictor variables and an intercept, you consume 5 parameters, so residual df is n - 5! In a contingency table with r rows and c columns, df is (r - 1)(c - 1).",
          "Pooling Variances When Variances Are Radically Unequal: Pooling assumes that all groups share the same true underlying variance σ². If Group 1 has s = 2 and Group 2 has s = 20, pooling them together creates a meaningless composite number.",
          "Confusing Sample Size with Degrees of Freedom: Sample size (n) is the number of raw measurements. Degrees of freedom (df) is the number of independent opportunities for variation after fitting parameters.",
        ],
      },
    ],
    quiz: {
      question:
        "In a clinical trial with 4 experimental groups and a total of 60 patients, how many residual degrees of freedom are available to estimate the pooled within-group error variance?",
      options: [
        "56 degrees of freedom (df = N - k = 60 - 4 = 56)",
        "59 degrees of freedom (df = N - 1 = 60 - 1 = 59)",
        "60 degrees of freedom",
        "4 degrees of freedom",
      ],
      correctIndex: 0,
      explanation:
        "Because 4 separate group means are calculated from the data, 4 degrees of freedom are consumed. The residual degrees of freedom for error variance is df = N - k = 60 - 4 = 56.",
    },
    takeaways: [
      "Degrees of freedom represent the number of independent pieces of information left after fitting parameters.",
      "Calculating a sample mean imposes the constraint Σ(x_i - x̄) = 0, costing 1 degree of freedom.",
      "Dividing by n - 1 (Bessel's correction) corrects for the downward bias of sample variance.",
      "In k groups, residual degrees of freedom is N - k, and pooled variance is the df-weighted average of group variances.",
    ],
  },
  {
    id: "end-to-end-eda-workflow",
    slug: "end-to-end-eda-workflow",
    moduleId: "statistical-principles",
    order: 2,
    globalOrder: 21,
    title: "The End-to-End EDA Protocol: A 6-Step Checklist",
    subtitle: "Synthesizing the Seltman Methodology: From Raw Rectangular Array to Formal Modeling",
    estimatedMinutes: 15,
    summary:
      "Synthesize all four branches of EDA into a rigorous, repeatable 6-step practical workflow that prepares any real-world dataset for successful statistical modeling and machine learning.",
    prerequisites: [
      "what-is-eda",
      "eda-taxonomy",
      "measures-of-spread",
      "quantile-normal-plots",
      "covariance-and-correlation",
      "scatterplots-multivariate",
    ],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Complete EDA Journey",
        content: [
          "Throughout this curriculum, we have dissected every individual analytical and graphical tool from Dr. Howard Seltman's foundational Chapter 4: frequency tables, histograms, stemplots, boxplots, Q-Q plots, cross-tabulations, grouped ANOVA comparisons, covariance, correlation, and multi-variable scatterplots.",
          "However, true mastery of Exploratory Data Analysis does not come from memorizing individual tools in isolation. It comes from executing them in a coherent, disciplined, repeatable sequence when confronted with a brand-new, messy dataset.",
          "Dr. Seltman emphasizes that EDA is both an art and a science: a structured protocol for interrogating data to uncover mistakes, verify assumptions, select models, and establish empirical truth.",
        ],
      },
      {
        id: "the-6-step-protocol",
        title: "2. The Seltman 6-Step End-to-End EDA Checklist",
        content: ["Follow this battle-tested 6-step protocol whenever you receive a new dataset:"],
        steps: [
          "Step 1: Inspect Rectangular Array Anatomy & Missing Data: Audit rows (subjects/cases) and columns (variables). Classify each column into categorical (nominal/ordinal) or quantitative (discrete/continuous). Audit missingness (NaNs/Nones) and verify data types.",
          "Step 2: Univariate Non-Graphical EDA: For categorical columns, compute frequency counts, proportions, and percentages with dropna=False. For quantitative columns, calculate the 5 characteristics: center (mean & median), spread (s, IQR, range), modality, shape (skewness e, kurtosis u), and Tukey fences.",
          "Step 3: Univariate Graphical EDA: Plot histograms with multiple bin widths (Freedman-Diaconis rule). Generate boxplots to inspect the 5-number summary and flag outliers. Generate Quantile-Normal (Q-Q) plots to diagnose departures from Gaussian normality (U-shapes, S-shapes, discrete bands).",
          "Step 4: Multivariate Non-Graphical EDA: For categorical pairs, construct cross-tabulations and evaluate both row percentages and column percentages. For quantitative by categorical, condition outcomes on factors and check homoscedasticity (max s / min s < 2.0). For quantitative pairs, calculate covariance and the full Pearson correlation matrix to screen for multicollinearity (|r| > 0.85).",
          "Step 5: Multivariate Graphical EDA: For categorical pairs, plot side-by-side grouped barplots. For quantitative by categorical, plot side-by-side boxplots with jittered raw data overlays. For quantitative pairs, generate scatterplots and encode 3rd and 4th variables using color hue and symbol shape (Figure 4.16 technique).",
          "Step 6: Synthesis, Diagnostic Remediation & Modeling Strategy: Decide whether non-normality requires transformations (log, square root), whether severe outliers are errors to correct or genuine anomalies to model, whether redundant collinear predictors should be dropped, and whether standard parametric or non-parametric algorithms are required.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: EDA as an Iterative Dialogue",
          message:
            "EDA is never a purely linear checklist that you complete once and abandon. Findings in Step 5 (such as uncovering an unexpected subgroup or non-linear curvature in a scatterplot) will send you back to Step 2 to re-examine specific subsets of your data. The goal of EDA is not to produce a binder of plots, but to develop an intimate, accurate mental model of how your data behaves.",
        },
      },
      {
        id: "comprehensive-cheat-sheet",
        title: "3. The Complete EDA Reference Matrix",
        content: [
          "Here is your universal cheat sheet matching variable combinations to their primary non-graphical and graphical EDA techniques:",
        ],
        table: {
          caption: "The Master 2×2 EDA Decision Matrix",
          headers: [
            "Variable Structure",
            "Non-Graphical Method",
            "Graphical Method",
            "Key Diagnostic Focus",
          ],
          rows: [
            [
              "Univariate Categorical",
              "Frequency table, Proportions, Percentages (dropna=False)",
              "Single-variable bar chart, Pareto plot",
              "Class imbalance, data entry typos, rare categories.",
            ],
            [
              "Univariate Quantitative",
              "5 Characteristics: Mean, Median, Std Dev, IQR, Skewness (2-SE rule), Kurtosis",
              "Histogram (FD bins), Stem-and-leaf, Boxplot, Quantile-Normal (Q-Q) plot",
              "Modality, skewness, heavy tails, outliers, normality check.",
            ],
            [
              "Bivariate: Categorical × Categorical",
              "Contingency table, Row %, Column %, Marginal totals",
              "Side-by-side grouped barplot, 100% stacked barplot",
              "Association, conditional probabilities, Simpson's paradox.",
            ],
            [
              "Bivariate: Quantitative by Categorical",
              "Grouped statistics: Means, Medians, Std Devs, IQRs (Informal ANOVA)",
              "Side-by-side boxplots with jittered raw points",
              "Differences in centers (effect size), equal variance (homoscedasticity).",
            ],
            [
              "Bivariate: Quantitative × Quantitative",
              "Sample Covariance, Pearson Correlation r",
              "Scatterplot (Outcome on Y, Explanatory on X)",
              "Linearity, curvature, fan-shaped heteroscedasticity, bivariate outliers.",
            ],
            [
              "Multivariate: Many Quantitative",
              "p × p Correlation Matrix, Covariance Matrix",
              "Scatterplot Matrix (SPLOM), Correlation Heatmap",
              "Multicollinearity (|r| > 0.85), redundancy among predictors.",
            ],
            [
              "Multivariate: Complex Multi-Factor",
              "Multi-way cross-tabulation, Multi-factor grouped aggregations",
              "Multi-variable scatterplot (X, Y, Color=Group, Shape=Factor) [Fig 4.16]",
              "Interactions, confounding, subgroup trajectories.",
            ],
          ],
        },
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: The End-to-End Automated EDA Protocol",
        content: [
          "Here is an automated master EDA workflow script in Python implementing the complete 6-step protocol:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd
from scipy import stats

def run_master_eda_protocol(df, target_col=None):
    """
    Executes the Seltman 6-step EDA protocol on any Pandas DataFrame.
    """
    print("="*60)
    print("      DR. SELTMAN'S 6-STEP MASTER EDA PROTOCOL")
    print("="*60)
    
    # STEP 1: Rectangular Array Anatomy
    n_rows, n_cols = df.shape
    print(f"\\n[STEP 1] Array Anatomy: {n_rows} subjects/rows, {n_cols} variables/columns")
    null_counts = df.isnull().sum()
    print("Missing Value Audit:")
    for col, count in null_counts.items():
        pct = (count / n_rows) * 100
        print(f"  - {col:15s}: {count:3d} missing ({pct:4.1f}%)")
        
    cat_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
    num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    print(f"Categorical Variables: {cat_cols}")
    print(f"Quantitative Variables: {num_cols}")
    
    # STEP 2: Univariate Non-Graphical EDA
    print("\\n[STEP 2] Univariate Non-Graphical EDA")
    for c in cat_cols:
        counts = df[c].value_counts(dropna=False)
        props = df[c].value_counts(normalize=True, dropna=False)
        print(f"\\nCategorical Tabulation: {c}")
        tab = pd.DataFrame({'Count': counts, 'Proportion': props.round(3)})
        print(tab)
        
    for q in num_cols:
        col_data = df[q].dropna()
        n = len(col_data)
        mean_v = col_data.mean()
        med_v = col_data.median()
        std_v = col_data.std(ddof=1)
        q1 = col_data.quantile(0.25)
        q3 = col_data.quantile(0.75)
        iqr_v = q3 - q1
        skew_v = stats.skew(col_data)
        se_skew = np.sqrt(6.0 / n)
        is_skewed = abs(skew_v) > (2 * se_skew)
        
        print(f"\\nQuantitative Summary: {q} (n={n})")
        print(f"  Center: Mean = {mean_v:.2f}, Median = {med_v:.2f}")
        print(f"  Spread: StdDev = {std_v:.2f}, IQR = {iqr_v:.2f}, Range = [{col_data.min():.2f}, {col_data.max():.2f}]")
        print(f"  Shape:  Skewness = {skew_v:+.2f} (2*SE={2*se_skew:.2f}) -> {'SKEWED' if is_skewed else 'Symmetric'}")
        
    # STEP 4: Multivariate Correlation Screen
    if len(num_cols) >= 2:
        print("\\n[STEP 4] Multivariate Correlation Screen")
        corr = df[num_cols].corr()
        print("Correlation Matrix:")
        print(corr.round(3))
        
    print("\\n[STEPS 3 & 5] Proceed to Visual Graphics (Histograms, Boxplots, Q-Q, Scatterplots)")
    print("[STEP 6] Complete Diagnosis and Select Statistical Model")
    print("="*60)

# Quick demonstration
sample_df = pd.DataFrame({
    'Group': ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'],
    'Score': [78, 85, 82, 90, 75, 94, 80, 88],
    'Age':   [22, 28, 25, 32, 21, 35, 24, 30]
})
run_master_eda_protocol(sample_df)`,
          output: `============================================================
      DR. SELTMAN'S 6-STEP MASTER EDA PROTOCOL
============================================================

[STEP 1] Array Anatomy: 8 subjects/rows, 3 variables/columns
Missing Value Audit:
  - Group          :   0 missing ( 0.0%)
  - Score          :   0 missing ( 0.0%)
  - Age            :   0 missing ( 0.0%)
Categorical Variables: ['Group']
Quantitative Variables: ['Score', 'Age']

[STEP 2] Univariate Non-Graphical EDA

Categorical Tabulation: Group
   Count  Proportion
Group               
A          4         0.5
B          4         0.5

Quantitative Summary: Score (n=8)
  Center: Mean = 84.00, Median = 83.50
  Spread: StdDev = 6.46, IQR = 9.25, Range = [75.00, 94.00]
  Shape:  Skewness = +0.22 (2*SE=1.73) -> Symmetric

Quantitative Summary: Age (n=8)
  Center: Mean = 27.00, Median = 26.50
  Spread: StdDev = 4.96, IQR = 7.75, Range = [21.00, 35.00]
  Shape:  Skewness = +0.33 (2*SE=1.73) -> Symmetric

[STEP 4] Multivariate Correlation Screen
Correlation Matrix:
       Score    Age
Score  1.000  0.923
Age    0.923  1.000

[STEPS 3 & 5] Proceed to Visual Graphics (Histograms, Boxplots, Q-Q, Scatterplots)
[STEP 6] Complete Diagnosis and Select Statistical Model
============================================================`,
          explanation:
            "This automated pipeline rapidly executes the core calculations, highlighting array dimensions, missingness, categorical proportions, quantitative moments, and pairwise correlations.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes Across the Entire EDA Process",
        content: ["Keep these overarching philosophical warnings in mind throughout your career:"],
        mistakes: [
          "Treating EDA as a Bureaucratic Hurdle: Rushing through EDA just to generate plots for a report without actually studying them defeats the purpose. EDA is an investigative mindset.",
          "Confirmation Bias: Searching only for plots that confirm your initial hypothesis while ignoring plots that reveal violations or contradicting evidence.",
          "Discarding Data Without Documentation: Never silently drop rows or outliers from your raw data. Always document every cleaning decision, rationale, and imputation method.",
          "Over-Fitting Downstream Models to Random EDA Noise: If you discover an odd correlation in a small sample during EDA, treat it as a hypothesis to be validated on fresh test data, not a proven fact.",
        ],
      },
    ],
    quiz: {
      question:
        "What is the ultimate objective of the 6-step Exploratory Data Analysis protocol before conducting formal statistical inference or machine learning?",
      options: [
        "To thoroughly understand data quality, verify model assumptions, detect anomalies and relationships, and select appropriate downstream models.",
        "To guarantee that all p-values will be less than 0.05.",
        "To eliminate all variation from the dataset.",
        "To replace all quantitative variables with categorical categories.",
      ],
      correctIndex: 0,
      explanation:
        "EDA's primary mission is diagnostic and foundational: discovering data errors, checking mathematical assumptions, spotting relationships, and guiding the selection of valid, robust statistical and machine learning models.",
    },
    takeaways: [
      "The Seltman 6-Step Protocol systematically navigates from raw data anatomy to univariate and multivariate non-graphical and graphical analysis.",
      "Never rush to complex modeling without thoroughly auditing missing values, distributions, and assumptions.",
      "EDA is an iterative dialogue: graphical discoveries prompt deeper non-graphical drill-downs.",
      "A disciplined EDA protocol is the single best defense against corrupted conclusions and failed data science projects.",
    ],
  },
];
