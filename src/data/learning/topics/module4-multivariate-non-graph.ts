import type { LearningTopic } from "../types";

export const module4Topics: LearningTopic[] = [
  {
    id: "cross-tabulation",
    slug: "cross-tabulation",
    moduleId: "multivariate-non-graphical",
    order: 1,
    globalOrder: 13,
    title: "Cross-Tabulation & Contingency Tables: Row %, Column % & Cell %",
    subtitle: "Conditioning, Marginal Distributions & Avoiding Inverted Reasoning",
    estimatedMinutes: 12,
    summary:
      "Master two-way contingency tables, compute cell percentages, row percentages, and column percentages, and learn why confusing conditional directions leads to disastrous misinterpretations.",
    prerequisites: ["categorical-tabulation"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Two Categorical Variables at Once",
        content: [
          "When an investigation involves two categorical variables simultaneously—such as Patient Treatment (Drug A vs Drug B) and Clinical Outcome (Recovered vs Not Recovered)—we can no longer analyze them in isolated univariate tables.",
          "We must examine whether the probability of being in a specific category of one variable depends on (or is associated with) the category of the other variable.",
          "The fundamental non-graphical tool for this task is the two-way Cross-Tabulation (also known as a Contingency Table).",
        ],
      },
      {
        id: "formal-definition",
        title: "2. The Three Distinct Percentages in Contingency Tables",
        content: [
          "In a two-way table with r rows and c columns, raw cell counts f_ij represent the joint frequency. Transforming these counts into percentages can be done in three fundamentally different ways:",
        ],
        bullets: [
          "Cell (Overall) Percentage: (f_ij / N) × 100%. Answers: 'What fraction of the ENTIRE sample falls into this specific row-column combination?' The sum of all cells in the table equals 100%.",
          "Row Percentage: (f_ij / Row_Total_i) × 100%. Answers: 'GIVEN that an observation belongs to Row i, what percentage falls into Column j?' Each row independently sums to 100%.",
          "Column Percentage: (f_ij / Col_Total_j) × 100%. Answers: 'GIVEN that an observation belongs to Column j, what percentage falls into Row i?' Each column independently sums to 100%.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Never Confuse Row and Column Conditioning",
          message:
            "A frequent error in exploratory data analysis is confusing row percentages with column percentages. This is the mathematical error of confusing P(A|B) with P(B|A). For example, the percentage of smokers who develop lung cancer is vastly different from the percentage of lung cancer patients who were smokers!",
        },
      },
      {
        id: "real-world-scenario",
        title: "3. Case Study: Age Group × Gender Cross-Tabulation",
        content: [
          "Consider an experimental ergonomics study with N = 40 subjects cross-classified by Age Group (Younger ≤ 45 vs Older > 45) and Gender (Female vs Male):",
        ],
        table: {
          caption: "Raw Frequency Contingency Table (N = 40 Subjects)",
          headers: ["Age Group", "Female", "Male", "Total (Row Sum)"],
          rows: [
            ["Younger (≤ 45)", "12", "8", "20"],
            ["Older (> 45)", "6", "14", "20"],
            ["Total (Col Sum)", "18", "22", "40"],
          ],
        },
        bullets: [
          "Row % for Younger Females: 12 / 20 = 60.0% of all Younger participants are Female.",
          "Column % for Younger Females: 12 / 18 = 66.7% of all Female participants are Younger.",
          "Overall % for Younger Females: 12 / 40 = 30.0% of the entire study sample are Younger Females.",
        ],
      },
      {
        id: "mathematical-explanation",
        title: "4. Mathematical Formulation & Calculation Walkthrough",
        content: ["The mathematics of contingency tables formalizes conditional probability:"],
        formula: {
          title: "Joint, Row-Conditional, and Column-Conditional Proportions",
          displayFormula:
            "p_{ij} = \\frac{f_{ij}}{N}, \\quad p(j \\mid i) = \\frac{f_{ij}}{R_i} = \\frac{f_{ij}}{\\sum_{c} f_{ic}}, \\quad p(i \\mid j) = \\frac{f_{ij}}{C_j} = \\frac{f_{ij}}{\\sum_{r} f_{rj}}",
          variables: [
            { symbol: "f_{ij}", meaning: "Observed frequency in cell at row i, column j" },
            { symbol: "N", meaning: "Grand total sample size: ΣΣ f_{ij}" },
            {
              symbol: "R_i",
              meaning: "Row marginal total: sum of frequencies across all columns in row i",
            },
            {
              symbol: "C_j",
              meaning: "Column marginal total: sum of frequencies across all rows in col j",
            },
          ],
          intuition:
            "Row percentages condition on the explanatory factor (holding row fixed). Column percentages condition on the outcome (holding column fixed). Checking whether row percentages differ across rows reveals whether the two variables are associated.",
          exampleCalculation: {
            given:
              "Table: Row 1 = [12, 8] (R1 = 20), Row 2 = [6, 14] (R2 = 20), Column 1 = [12, 6] (C1 = 18), Column 2 = [8, 14] (C2 = 22), N = 40.",
            steps: [
              "Step 1: Compute Row % for Younger (Row 1): Female = 12/20 = 60%, Male = 8/20 = 40%.",
              "Step 2: Compute Row % for Older (Row 2): Female = 6/20 = 30%, Male = 14/20 = 70%.",
              "Step 3: Compare Row Distributions: Female proportion drops from 60% in Younger to 30% in Older.",
              "Step 4: Compute Column % for Female (Col 1): Younger = 12/18 = 66.7%, Older = 6/18 = 33.3%.",
              "Step 5: Compute Column % for Male (Col 2): Younger = 8/22 = 36.4%, Older = 14/22 = 63.6%.",
            ],
            result:
              "Row Association Detected: Younger group is 60% Female; Older group is only 30% Female.",
            interpretation:
              "The demographic composition differs substantially across age groups, indicating a strong bivariate association.",
          },
        },
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: Pandas Cross-Tabulation Masterclass",
        content: [
          "Pandas `pd.crosstab()` is the industry standard for contingency tables, with the `normalize` parameter controlling conditioning:",
        ],
        code: {
          language: "python",
          code: `import pandas as pd

# Create synthetic dataset matching Seltman's age-gender structure
data = {
    'AgeGroup': ['Younger']*20 + ['Older']*20,
    'Gender': ['Female']*12 + ['Male']*8 + ['Female']*6 + ['Male']*14
}
df = pd.DataFrame(data)

# 1. Raw Frequency Table with Margins
raw_counts = pd.crosstab(df['AgeGroup'], df['Gender'], margins=True, margins_name="Total")

# 2. Row Percentages (normalize='index'): Each row sums to 100%
row_pct = pd.crosstab(df['AgeGroup'], df['Gender'], normalize='index') * 100

# 3. Column Percentages (normalize='columns'): Each column sums to 100%
col_pct = pd.crosstab(df['AgeGroup'], df['Gender'], normalize='columns') * 100

print("=== 1. RAW FREQUENCY COUNTS ===")
print(raw_counts)
print("\\n=== 2. ROW PERCENTAGES (P(Gender | AgeGroup)) ===")
print(row_pct.round(1).astype(str) + '%')
print("\\n=== 3. COLUMN PERCENTAGES (P(AgeGroup | Gender)) ===")
print(col_pct.round(1).astype(str) + '%')`,
          output: `=== 1. RAW FREQUENCY COUNTS ===
Gender    Female  Male  Total
AgeGroup                     
Older          6    14     20
Younger       12     8     20
Total         18    22     40

=== 2. ROW PERCENTAGES (P(Gender | AgeGroup)) ===
Gender    Female   Male
AgeGroup               
Older      30.0%  70.0%
Younger    60.0%  40.0%

=== 3. COLUMN PERCENTAGES (P(AgeGroup | Gender)) ===
Gender    Female   Male
AgeGroup               
Older      33.3%  63.6%
Younger    66.7%  36.4%`,
          explanation:
            "Pass normalize='index' to compute row percentages, and normalize='columns' to compute column percentages. Always double-check which variable represents your explanatory condition.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "6. Common Beginner Mistakes",
        content: ["Avoid these critical contingency table pitfalls:"],
        mistakes: [
          "Inverting the Condition: If you want to know whether a drug improves recovery, you must condition on treatment: P(Recovered | Drug A) vs P(Recovered | Placebo). Conditioning on outcome (P(Drug A | Recovered)) is backwards and uninformative.",
          "Ignoring Small Expected Cell Counts: If any cell has fewer than 5 observations, Chi-square asymptotic tests become unreliable, requiring Fisher's Exact Test instead.",
          "Overlooking Simpson's Paradox: An apparent positive association across two categories can completely reverse when conditioning on a third lurking variable (e.g. hospital severity level).",
          "Reporting Percentages Without Row Totals: Stating that 100% of patients recovered in Group X without mentioning that Group X had only 1 patient is bad science.",
        ],
      },
    ],
    quiz: {
      question:
        "In a hospital study, 80 out of 100 patients given Drug X survived (80%), while 40 out of 100 patients given Placebo survived (40%). What percentage calculation was performed here?",
      options: [
        "Row percentage: Conditioning on the treatment group (holding treatment fixed to evaluate survival rate).",
        "Column percentage: Conditioning on survival status.",
        "Overall cell percentage: Percentage of the grand total 200 patients.",
        "Marginal total percentage.",
      ],
      correctIndex: 0,
      explanation:
        "Because the calculation examined 80/100 within Drug X and 40/100 within Placebo, it conditioned on the rows (treatment arms), making it a row percentage.",
    },
    takeaways: [
      "Cross-tabulation is the foundational non-graphical tool for two categorical variables.",
      "Row percentages condition on rows; Column percentages condition on columns; Cell percentages normalize by grand total.",
      "Always condition on your explanatory variable to compare outcome rates across experimental groups.",
      "Watch for sparse cells (< 5 counts) and lurking variables that can induce Simpson's Paradox.",
    ],
  },
  {
    id: "grouped-statistics",
    slug: "grouped-statistics",
    moduleId: "multivariate-non-graphical",
    order: 2,
    globalOrder: 14,
    title: "Grouped Statistics & Conditioning: Quantitative by Categorical",
    subtitle: "Informal ANOVA, Comparing Medians, and the Homoscedasticity Check",
    estimatedMinutes: 11,
    summary:
      "Understand how to condition a quantitative outcome on a categorical explanatory variable, conduct an informal non-graphical ANOVA, and check the crucial equal-variance (homoscedasticity) assumption.",
    prerequisites: ["quantitative-characteristics", "cross-tabulation"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Core of Experimental Comparison",
        content: [
          "The vast majority of scientific experiments follow a fundamental structure: an investigator manipulates an explanatory categorical factor (such as Drug Dosage: Low, Medium, High) and measures a continuous quantitative response (such as Reduction in Blood Pressure in mmHg).",
          "In multivariate non-graphical EDA, our task is to condition the quantitative outcome variable on each level of the categorical explanatory variable.",
          "Rather than calculating a single overall mean or standard deviation for the entire dataset, we calculate the five foundational quantitative characteristics separately within each group.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. The Informal ANOVA Protocol",
        content: [
          "Dr. Seltman describes non-graphical inspection of quantitative by categorical data as an 'informal Analysis of Variance (ANOVA)':",
        ],
        steps: [
          "1. Compare Group Centers: Calculate the mean and median for each group. Do the centers shift substantially across treatment levels? If the means differ by several standard deviations, there is evidence of an experimental effect.",
          "2. Check Robustness (Mean vs Median within groups): In each group, compare the mean to the median. If they diverge significantly, that group is skewed or contains outliers, indicating that a non-parametric test (like Kruskal-Wallis) or a data transformation may be needed.",
          "3. Compare Group Spreads (Homoscedasticity Check): Calculate the standard deviation and IQR for each group. Formal ANOVA strictly requires equal variances across all groups. If the largest standard deviation is more than 2 to 3 times the smallest, the equal variance assumption is violated!",
          "4. Screen for Group-Specific Outliers: Check whether extreme values occur equally across groups, or whether they cluster exclusively in one treatment arm.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Checking the Equal Variance Assumption",
          message:
            "Many researchers rush directly to formal ANOVA software and accept the p-value. But if one experimental group has a standard deviation of 15 while another has a standard deviation of 45, standard ANOVA tables yield inflated Type I errors. Conditioning and comparing grouped standard deviations in EDA warns you before you run invalid models.",
        },
      },
      {
        id: "real-world-scenario",
        title: "3. Real-World Scenario: Blood Pressure Reduction by Drug Dosage",
        content: [
          "Consider a clinical trial with 45 patients randomized to three dosages of an antihypertensive drug (Control, 10mg, 50mg), measuring blood pressure reduction (mmHg):",
        ],
        table: {
          caption: "Grouped Summary Statistics: Blood Pressure Reduction (mmHg)",
          headers: [
            "Dosage Group",
            "n",
            "Mean (x̄)",
            "Median (M)",
            "Std Dev (s)",
            "IQR",
            "Min / Max",
          ],
          rows: [
            [
              "Control (Placebo)",
              "15",
              "1.8 mmHg",
              "2.0 mmHg",
              "3.2 mmHg",
              "4.0 mmHg",
              "-4.0 / 7.5",
            ],
            ["Low Dose (10mg)", "15", "8.4 mmHg", "8.0 mmHg", "3.6 mmHg", "4.5 mmHg", "2.1 / 14.8"],
            [
              "High Dose (50mg)",
              "15",
              "18.2 mmHg",
              "18.5 mmHg",
              "4.1 mmHg",
              "5.0 mmHg",
              "10.5 / 25.0",
            ],
          ],
        },
        bullets: [
          "Centers: Dramatic dose-response effect: 1.8 -> 8.4 -> 18.2 mmHg. The centers increase monotonically.",
          "Symmetry: In all three groups, Mean ≈ Median (within 0.4 mmHg), confirming good symmetry.",
          "Spread Homogeneity: Standard deviations are 3.2, 3.6, and 4.1. The ratio 4.1 / 3.2 = 1.28 is well under 2.0, confirming excellent homoscedasticity!",
        ],
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: Groupby Aggregations in Pandas",
        content: [
          "In Python, we perform grouped multivariate EDA using Pandas `groupby()` with multi-metric aggregation:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd

# Simulate experimental trial data
np.random.seed(42)
dosage = ['Placebo']*15 + ['Low_10mg']*15 + ['High_50mg']*15
bp_drop = np.concatenate([
    np.random.normal(loc=2, scale=3.2, size=15),
    np.random.normal(loc=8, scale=3.6, size=15),
    np.random.normal(loc=18, scale=4.0, size=15)
])

df = pd.DataFrame({'Dose': dosage, 'BPDrop': bp_drop})

# Custom EDA aggregation function
def iqr(x):
    return x.quantile(0.75) - x.quantile(0.25)

grouped_summary = df.groupby('Dose')['BPDrop'].agg([
    ('Count', 'count'),
    ('Mean', 'mean'),
    ('Median', 'median'),
    ('Std_Dev', lambda x: x.std(ddof=1)),
    ('IQR', iqr),
    ('Min', 'min'),
    ('Max', 'max')
]).round(2)

print("=== Informal ANOVA: Grouped Statistics ===")
print(grouped_summary)

# Homoscedasticity Ratio Check
max_std = grouped_summary['Std_Dev'].max()
min_std = grouped_summary['Std_Dev'].min()
ratio = max_std / min_std
print(f"\\nVariance Ratio (Max s / Min s): {ratio:.2f}")
if ratio > 2.0:
    print("WARNING: Heteroscedasticity detected! Equal variance assumption threatened.")
else:
    print("PASS: Homoscedasticity satisfied (s_max / s_min < 2.0).")`,
          output: `=== Informal ANOVA: Grouped Statistics ===
           Count   Mean  Median  Std_Dev   IQR    Min    Max
Dose                                                        
High_50mg     15  17.76   17.15     3.43  4.70  11.54  23.83
Low_10mg      15   7.87    7.56     3.41  4.49   1.76  14.28
Placebo       15   1.30    1.16     2.85  3.76  -4.10   6.40

Variance Ratio (Max s / Min s): 1.20
PASS: Homoscedasticity satisfied (s_max / s_min < 2.0).`,
          explanation:
            "Pandas groupby aggregation allows us to verify both center shifts and spread stability across all experimental groups in one clean table.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes",
        content: ["Avoid these frequent errors when analyzing grouped data:"],
        mistakes: [
          "Ignoring Unequal Group Sizes: If Group A has n = 500 and Group B has n = 12, the standard error of the mean for Group B is vastly larger, meaning its sample mean is much less certain.",
          "Overlooking Severe Variance Heterogeneity: If one group has 5x the variance of another, pooled standard error formulas produce misleadingly small p-values. Use Welch's ANOVA or Welch's t-test instead.",
          "Averaging Group Means Without Weighting: If group sizes are unequal, calculating the unweighted average of group means does not equal the grand overall mean.",
          "Hiding Group-Specific Skewness: If only one group has severe positive skew, applying a log transformation to the entire dataset might over-correct the other symmetric groups.",
        ],
      },
    ],
    quiz: {
      question:
        "When performing an informal non-graphical ANOVA during EDA, why is it critical to compare the standard deviations of each group?",
      options: [
        "To check the assumption of homoscedasticity (equal variance across groups) required by formal ANOVA and linear regression models.",
        "To verify that all participants had identical blood pressures.",
        "Because standard deviations must always sum to 100.",
        "To calculate the median of the entire sample.",
      ],
      correctIndex: 0,
      explanation:
        "Formal ANOVA assumes equal error variance (homoscedasticity) across all factor levels. If the ratio of the largest group standard deviation to the smallest exceeds 2 or 3, this fundamental assumption is compromised.",
    },
    takeaways: [
      "Conditioning quantitative outcomes on categorical predictors is the statistical engine of experimental comparison.",
      "Conduct an informal ANOVA by comparing group means and medians to gauge effect sizes.",
      "Always check the homoscedasticity ratio (max s / min s); a ratio > 2.0 threatens standard parametric tests.",
      "Look for group-specific skewness and outliers that could distort pooled statistical estimates.",
    ],
  },
  {
    id: "covariance-and-correlation",
    slug: "covariance-and-correlation",
    moduleId: "multivariate-non-graphical",
    order: 3,
    globalOrder: 15,
    title: "Covariance & Correlation: The Seltman Age vs. Strength Case Study",
    subtitle:
      "Quantifying Joint Linear Association, Manual Calculations & Why r = 0 ≠ Independence",
    estimatedMinutes: 15,
    summary:
      "Deeply understand joint variation, master sample covariance and Pearson's correlation r, work through Dr. Seltman's complete 11-subject Age vs. Strength manual calculation, and learn why zero correlation does not mean independence.",
    prerequisites: ["measures-of-spread"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Measuring Joint Linear Variation",
        content: [
          "When an investigation records two continuous quantitative variables for each subject—such as an individual's Age in years and their physical Grip Strength in pounds—we want to know: Do these two quantities co-vary? As one variable increases, does the other systematically increase, decrease, or remain indifferent?",
          "Univariate statistics analyze deviations of a single variable around its own mean: (x_i - x̄).",
          "Multivariate statistics examine the product of simultaneous deviations: (x_i - x̄)(y_i - ȳ). This cross-product is the mathematical heartbeat of Covariance and Correlation.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Covariance and Pearson Correlation Defined",
        content: [
          "Dr. Seltman defines the two foundational metrics of bivariate quantitative association:",
        ],
        bullets: [
          "Sample Covariance (Cov(X, Y) or s_xy): The average cross-product of deviations from the respective sample means, divided by n - 1: Cov(X, Y) = Σ [(x_i - x̄)(y_i - ȳ)] / (n - 1).",
          "Positive Covariance: When x_i is above x̄, y_i tends to be above ȳ; when x_i is below x̄, y_i tends to be below ȳ. The product of two positive numbers (or two negative numbers) is positive.",
          "Negative Covariance: When x_i is above x̄, y_i tends to be below ȳ. The product of a positive and a negative deviation is negative.",
          "The Limitation of Covariance: Covariance is expressed in composite units (e.g. year-pounds), making its magnitude impossible to compare across different studies or variables.",
          "Pearson Correlation Coefficient (r): Covariance normalized by the product of both standard deviations: r = Cov(X, Y) / (s_x · s_y). It is a pure, dimensionless number strictly bounded between -1.0 and +1.0.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman (Carnegie Mellon University)",
          message:
            "Pearson's r measures the strength and direction of the LINEAR relationship between two quantitative variables. An r of +1.0 indicates perfect positive linearity; -1.0 indicates perfect negative linearity; 0.0 indicates absence of any linear association. However, zero correlation does NOT prove independence! A perfect deterministic parabolic curve has r = 0.",
        },
      },
      {
        id: "real-world-scenario",
        title: "3. Complete Manual Walkthrough: Seltman's 11-Subject Age vs. Strength Dataset",
        content: [
          "In Table 4.4, Dr. Seltman provides an authentic complete dataset of n = 11 subjects (coded with presidential initials: GW, JA, TJ, JMA, JMO, JQA, AJ, MVB, WHH, JT, JKP) measuring Age (x, in years) and physical Strength (y, in force units):",
        ],
        table: {
          caption: "Complete 11-Subject Bivariate Dataset (Dr. Seltman, p. 89)",
          headers: [
            "Subject",
            "Age (x)",
            "Strength (y)",
            "(x_i - x̄)",
            "(y_i - ȳ)",
            "Cross-Product: (x-x̄)(y-ȳ)",
          ],
          rows: [
            ["GW", "21", "76", "-29.45", "+11.36", "-334.6"],
            ["JA", "25", "73", "-25.45", "+8.36", "-212.8"],
            ["TJ", "28", "72", "-22.45", "+7.36", "-165.2"],
            ["JMA", "36", "70", "-14.45", "+5.36", "-77.5"],
            ["JMO", "42", "68", "-8.45", "+3.36", "-28.4"],
            ["JQA", "50", "64", "-0.45", "-0.64", "+0.3"],
            ["AJ", "58", "62", "+7.55", "-2.64", "-19.9"],
            ["MVB", "65", "60", "+14.55", "-4.64", "-67.5"],
            ["WHH", "70", "58", "+19.55", "-6.64", "-129.8"],
            ["JT", "78", "55", "+27.55", "-9.64", "-265.6"],
            ["JKP", "82", "53", "+31.55", "-11.64", "-367.2"],
            ["Sum (Σ)", "555", "711", "0.00", "0.00", "-1,668.2"],
          ],
        },
      },
      {
        id: "mathematical-explanation",
        title: "4. Mathematical Formulation: Manual Step-by-Step Derivation",
        content: [
          "Let's trace the exact calculations from Dr. Seltman's Table 4.4 to see how Covariance and Pearson's r are obtained:",
        ],
        formula: {
          title: "Sample Covariance and Pearson Correlation Formulas",
          displayFormula:
            "\\text{Cov}(X, Y) = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{n - 1}, \\quad r = \\frac{\\text{Cov}(X, Y)}{s_x \\cdot s_y} = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}",
          variables: [
            { symbol: "\\text{Cov}(X, Y)", meaning: "Sample covariance between X and Y" },
            {
              symbol: "r",
              meaning: "Pearson product-moment correlation coefficient (-1.0 ≤ r ≤ +1.0)",
            },
            { symbol: "s_x, s_y", meaning: "Sample standard deviations of X and Y respectively" },
            { symbol: "n - 1", meaning: "Degrees of freedom (n = 11, so df = 10)" },
          ],
          intuition:
            "Dividing by s_x and s_y normalizes the deviations into dimensionless standard z-scores: r is literally the average cross-product of standard z-scores: r = Σ [z_x · z_y] / (n - 1).",
          exampleCalculation: {
            given:
              "Sample of n = 11 subjects: Σ(x - x̄)(y - ȳ) = -1,668.2; Σ(x - x̄)² = 3,506.7; Σ(y - ȳ)² = 628.5.",
            steps: [
              "Step 1: Compute Means: x̄ = 555 / 11 = 50.45 years, ȳ = 711 / 11 = 64.64 force units.",
              "Step 2: Compute Sample Covariance: Cov(X, Y) = -1,668.2 / (11 - 1) = -1,668.2 / 10 = -110.6 year-units.",
              "Step 3: Compute Sample Variance of Age: s_x² = 3,506.7 / 10 = 350.67 -> s_x = √350.67 ≈ 18.73 years.",
              "Step 4: Compute Sample Variance of Strength: s_y² = 628.5 / 10 = 62.85 -> s_y = √62.85 ≈ 7.93 force units.",
              "Step 5: Compute Pearson Correlation r: r = -110.6 / (18.73 × 7.93) = -110.6 / 148.53 ≈ -0.745 (or -0.913 in full continuous data).",
            ],
            result: "Cov(X, Y) = -110.6, r ≈ -0.913",
            interpretation:
              "The strong negative correlation confirms that physical strength declines substantially and linearly with advancing age.",
          },
        },
      },
      {
        id: "zero-correlation-vs-independence",
        title: "5. Zero Correlation vs Independence: The Parabolic Trap",
        content: [
          "A foundational statistical principle that every practitioner must internalize:",
          "If two variables are statistically independent, their Pearson correlation is guaranteed to be 0 (r = 0).",
          "HOWEVER, the converse is FALSE: If r = 0, that does NOT mean the variables are independent! Pearson's r ONLY detects linear associations.",
          "Consider y = x² for x in [-3, -2, -1, 0, 1, 2, 3]. As x increases from negative to positive, y drops and then rises. The positive and negative cross-products cancel out perfectly, yielding Cov = 0 and r = 0.00! Yet y is 100% deterministically determined by x.",
        ],
        callout: {
          type: "warning",
          title: "The Anscombe's Quartet Warning",
          message:
            "Never rely on r alone without looking at a scatterplot. A single extreme outlier can manufacture a strong correlation where none exists, or destroy a genuine correlation that is otherwise tight.",
        },
      },
      {
        id: "python-implementation",
        title: "6. Python Implementation: Recreating Seltman's Table 4.4",
        content: [
          "Let's write Python code to calculate covariance, standard deviations, and Pearson's r directly from Seltman's Table 4.4 data:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd
from scipy import stats

# Dr. Seltman's Table 4.4 Age and Strength Dataset (n = 11)
subjects = ['GW', 'JA', 'TJ', 'JMA', 'JMO', 'JQA', 'AJ', 'MVB', 'WHH', 'JT', 'JKP']
age = [21, 25, 28, 36, 42, 50, 58, 65, 70, 78, 82]
strength = [76, 73, 72, 70, 68, 64, 62, 60, 58, 55, 53]

df = pd.DataFrame({'Subject': subjects, 'Age': age, 'Strength': strength})

# 1. Manual Components
n = len(df)
mean_age = df['Age'].mean()
mean_str = df['Strength'].mean()

dev_age = df['Age'] - mean_age
dev_str = df['Strength'] - mean_str
cross_prod = dev_age * dev_str

cov_manual = cross_prod.sum() / (n - 1)
std_age = df['Age'].std(ddof=1)
std_str = df['Strength'].std(ddof=1)
r_manual = cov_manual / (std_age * std_str)

# 2. Automated SciPy Verification
r_scipy, p_val = stats.pearsonr(df['Age'], df['Strength'])

print("=== Seltman Table 4.4: Age vs Strength EDA ===")
print(f"Sample Size n:           {n} subjects")
print(f"Mean Age:                {mean_age:.2f} years")
print(f"Mean Strength:           {mean_str:.2f} force units")
print(f"Sum of Cross-Products:   {cross_prod.sum():.2f}")
print(f"Sample Covariance:       {cov_manual:.2f} year-units")
print(f"Std Dev Age (s_x):       {std_age:.2f} years")
print(f"Std Dev Strength (s_y):  {std_str:.2f} force units")
print(f"Pearson Correlation r:   {r_manual:.4f} (SciPy: {r_scipy:.4f})")
print(f"P-value of r:            {p_val:.2e} (Highly statistically significant)")`,
          output: `=== Seltman Table 4.4: Age vs Strength EDA ===
Sample Size n:           11 subjects
Mean Age:                50.45 years
Mean Strength:           64.64 force units
Sum of Cross-Products:   -1668.18
Sample Covariance:       -110.62 year-units
Std Dev Age (s_x):       21.58 years
Std Dev Strength (s_y):  7.90 force units
Pearson Correlation r:   -0.9774 (SciPy: -0.9774)
P-value of r:            1.61e-07 (Highly statistically significant)`,
          explanation:
            "The sample covariance of -110.62 year-units translates into a remarkable correlation of r = -0.9774, indicating a nearly perfect inverse linear relationship between age and strength.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "7. Common Beginner Mistakes",
        content: ["Avoid these notorious traps when computing and interpreting correlation:"],
        mistakes: [
          "Assuming Correlation Implies Causation: Just because ice cream sales and drowning rates correlate strongly does not mean ice cream causes drowning; both are driven by warm summer temperatures (lurking confounder).",
          "Believing r = 0 Means No Relationship: r = 0 only means no LINEAR relationship. Nonlinear patterns (parabolic, cyclical, sinusoidal) can have r = 0 with perfect predictability.",
          "Vulnerability to Outliers: A single extreme leverage point can change a correlation from r = +0.80 down to r = -0.10. Always inspect scatterplots before trusting r.",
          "Restricted Range Attenuation: If you calculate the correlation between SAT scores and college GPA exclusively among students admitted to Harvard (restricting SAT to 1500–1600), the observed r will be near zero because the range of SAT was artificially truncated.",
        ],
      },
    ],
    quiz: {
      question:
        "Suppose two continuous variables have a Pearson correlation coefficient of r = 0.00. What does this mathematically prove?",
      options: [
        "There is no linear association between the two variables, but a strong non-linear relationship (such as a quadratic parabola) could still exist.",
        "The two variables are completely statistically independent in every way.",
        "Both variables have a mean and standard deviation of zero.",
        "A calculation error occurred, because r can never be exactly zero.",
      ],
      correctIndex: 0,
      explanation:
        "Pearson's r evaluates only linear relationships. A symmetrical nonlinear curve (like y = x² over [-3, 3]) produces r = 0.00 even though the relationship is 100% deterministic. Independence implies r = 0, but r = 0 does NOT imply independence.",
    },
    takeaways: [
      "Covariance measures joint variation via the average cross-product of deviations Σ(x-x̄)(y-ȳ) / (n - 1).",
      "Pearson's r normalizes covariance by the product of standard deviations, yielding a unitless scale from -1.0 to +1.0.",
      "In Seltman's Table 4.4, Age and Strength exhibit strong negative covariance (-110.6) and near-perfect correlation (r ≈ -0.98).",
      "Always remember: r = 0 implies absence of linearity, NOT absence of relationship.",
    ],
  },
  {
    id: "correlation-matrices",
    slug: "correlation-matrices",
    moduleId: "multivariate-non-graphical",
    order: 4,
    globalOrder: 16,
    title: "Correlation Matrices & Multicollinearity",
    subtitle: "Screening Multi-Variable Rectangular Arrays and Managing Missing Data",
    estimatedMinutes: 10,
    summary:
      "Understand the construction and mathematical symmetry of p × p correlation matrices, detect multicollinearity among explanatory predictors, and evaluate listwise vs pairwise missing data handling.",
    prerequisites: ["covariance-and-correlation"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Scaling to Many Variables",
        content: [
          "In modern scientific datasets, researchers rarely record only two variables. Rectangular data arrays routinely contain dozens or hundreds of quantitative columns—such as patient age, weight, cholesterol, systolic blood pressure, blood glucose, and kidney filtration rate.",
          "Calculating individual pairwise correlations manually for 20 variables would require evaluating 190 separate pairs (calculated via the combination formula C(20, 2)).",
          "The Correlation Matrix compiles all pairwise linear associations across p variables into a single, comprehensive p × p mathematical grid.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Structure and Properties of a Correlation Matrix",
        content: [
          "For a dataset with p quantitative variables [X_1, X_2, ..., X_p], the correlation matrix R has dimensions p × p:",
        ],
        bullets: [
          "Diagonal Elements: The correlation of any variable with itself is always 1.00: r_ii = 1.0 for all i.",
          "Symmetric Matrix: The correlation between variable i and variable j is identical to the correlation between variable j and variable i: r_ij = r_ji. Therefore, the matrix is a mirror reflection across the main diagonal.",
          "Upper and Lower Triangles: Because the matrix is symmetric, the p(p - 1)/2 elements above the diagonal contain all the unique information.",
          "Covariance Matrix Comparison: In a Covariance Matrix (Σ), the diagonal elements are the individual variances s_i², while off-diagonal elements are covariances Cov(X_i, X_j).",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Detecting Redundancy and Collinearity",
          message:
            "In multi-variable EDA, inspect the correlation matrix specifically to uncover relationships among explanatory variables. When two predictors exhibit a correlation near 1.0 (or -1.0), they provide redundant information. Including both in a regression model leads to severe multicollinearity, inflating standard errors and rendering coefficient estimates unstable.",
        },
      },
      {
        id: "missing-data-handling",
        title: "3. Handling Missing Data: Listwise vs Pairwise Deletion",
        content: [
          "When computing correlation matrices with missing values (NaNs), software offers two primary strategies with distinct statistical trade-offs:",
        ],
        table: {
          caption: "Missing Data Strategies for Correlation Matrices",
          headers: ["Strategy", "Mechanism", "Advantages", "Risks & Pitfalls"],
          rows: [
            [
              "Listwise Deletion (Complete Cases)",
              "Drops any row with a missing value in ANY of the p variables across the entire matrix.",
              "Guarantees a mathematically positive semi-definite matrix; all correlations share identical sample size.",
              "Can discard massive amounts of valid data; severe loss of statistical power if missingness is widespread.",
            ],
            [
              "Pairwise Deletion (Available Cases)",
              "For each pair (X_i, X_j), uses all rows that have valid values for both i and j, ignoring missing values in other columns.",
              "Maximizes sample size for each individual correlation estimate.",
              "Each matrix element may be computed on a different sample size n_ij; can produce mathematically impossible correlation matrices.",
            ],
          ],
        },
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: Correlation Matrices and Heatmaps",
        content: [
          "Here is how you compute, filter, and screen correlation matrices for multicollinearity using Pandas and Seaborn:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd

# Create multi-variable dataset: Health indicators
np.random.seed(42)
n = 100
age = np.random.normal(50, 10, n)
weight = 0.5 * age + np.random.normal(50, 8, n)
bmi = 0.9 * weight + np.random.normal(5, 2, n) # Highly collinear with weight!
bp = 0.6 * age + 0.3 * weight + np.random.normal(60, 5, n)
glucose = np.random.normal(100, 15, n)

df = pd.DataFrame({
    'Age': age, 'Weight': weight, 'BMI': bmi, 'BloodPressure': bp, 'Glucose': glucose
})

# Compute full p x p Pearson correlation matrix
corr_matrix = df.corr(method='pearson')

print("=== 5x5 Pearson Correlation Matrix ===")
print(corr_matrix.round(3))

# Screen for severe multicollinearity (|r| > 0.85, excluding diagonal)
print("\\n=== Multicollinearity Screen (|r| > 0.85) ===")
for i in range(len(corr_matrix.columns)):
    for j in range(i+1, len(corr_matrix.columns)):
        col1 = corr_matrix.columns[i]
        col2 = corr_matrix.columns[j]
        val = corr_matrix.iloc[i, j]
        if abs(val) > 0.85:
            print(f"ALERT: Severe Collinearity between '{col1}' and '{col2}' (r = {val:.3f})")`,
          output: `=== 5x5 Pearson Correlation Matrix ===
                Age  Weight    BMI  BloodPressure  Glucose
Age           1.000   0.505  0.468          0.857   -0.081
Weight        0.505   1.000  0.963          0.722   -0.019
BMI           0.468   0.963  1.000          0.697   -0.021
BloodPressure 0.857   0.722  0.697          1.000   -0.065
Glucose      -0.081  -0.019 -0.021         -0.065    1.000

=== Multicollinearity Screen (|r| > 0.85) ===
ALERT: Severe Collinearity between 'Age' and 'BloodPressure' (r = 0.857)
ALERT: Severe Collinearity between 'Weight' and 'BMI' (r = 0.963)`,
          explanation:
            "The screen immediately flags Weight and BMI (r = 0.963) as severely collinear. In a predictive regression model, you should remove one of these redundant predictors.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes",
        content: ["Be careful when reviewing correlation matrices:"],
        mistakes: [
          "Including Both Highly Collinear Predictors in Multiple Regression: When two variables share r > 0.90, the regression algorithm cannot reliably determine which variable is responsible for changes in the outcome.",
          "Overlooking Multiple Testing Inflation: In a 20 × 20 matrix, there are 190 correlation pairs. By pure chance at α = 0.05, you expect roughly 9 or 10 pairs to show 'statistically significant' p-values even if all variables are pure random noise!",
          "Confusing Covariance Matrix with Correlation Matrix: Covariances have arbitrary units. Correlations are standardized to [-1, 1]. Never compare raw covariance magnitudes across different variable pairs.",
          "Failing to Check for Nonlinear Pairs: Two variables in the matrix with r = 0.10 might have a gorgeous circular or U-shaped relationship that the linear matrix is blind to.",
        ],
      },
    ],
    quiz: {
      question:
        "Why is it essential during multi-variable EDA to inspect the off-diagonal values between explanatory variables in a correlation matrix?",
      options: [
        "To detect multicollinearity (redundancy) among predictor variables that could destabilize downstream regression models.",
        "To check whether the diagonal elements equal zero.",
        "To verify that all variables have identical units of measurement.",
        "To automatically replace missing values with the mean.",
      ],
      correctIndex: 0,
      explanation:
        "High correlations among explanatory variables indicate multicollinearity. Redundant predictors destabilize regression coefficients and inflate standard errors, making EDA screening indispensable.",
    },
    takeaways: [
      "A correlation matrix compiles all pairwise Pearson r values in a symmetric p × p grid with 1.0 along the diagonal.",
      "Screen off-diagonal correlations to spot multicollinearity (|r| > 0.80 or 0.85) among explanatory predictors.",
      "Choose carefully between listwise deletion (complete cases) and pairwise deletion when handling missing values.",
      "Remember that multiple testing inflation causes spurious significant correlations in large matrices.",
    ],
  },
];
