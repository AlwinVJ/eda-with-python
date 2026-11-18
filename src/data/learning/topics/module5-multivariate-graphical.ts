import type { LearningTopic } from "../types";

export const module5Topics: LearningTopic[] = [
  {
    id: "grouped-barplots",
    slug: "grouped-barplots",
    moduleId: "multivariate-graphical",
    order: 1,
    globalOrder: 17,
    title: "Grouped & Stacked Barplots: Visualizing Categorical Relationships",
    subtitle: "Side-by-Side vs Stacked Formats, Common Baselines & Avoiding 3D Gimmicks",
    estimatedMinutes: 10,
    summary:
      "Learn how to translate two-way contingency tables into clear visual bar charts, compare side-by-side vs stacked layouts, and understand why common baselines are essential for accurate visual perception.",
    prerequisites: ["cross-tabulation"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Visualizing Two Categorical Factors",
        content: [
          "While cross-tabulation tables provide exact numerical counts and percentages, tables can be slow to read and difficult to interpret when sharing findings with stakeholders or scanning for high-level patterns.",
          "Grouped Barplots are the graphical counterpart to two-way contingency tables. They visually represent the joint frequency or conditional proportions of two categorical variables using colored or patterned rectangular bars.",
          "However, how you arrange those bars—side-by-side or stacked—fundamentally alters what comparisons the human eye can make easily.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Side-by-Side vs Stacked Barplots Defined",
        content: [
          "Dr. Seltman discusses two primary visual layouts for two categorical variables:",
        ],
        bullets: [
          "Side-by-Side (Grouped / Clustered) Barplot: For each category of variable A, bars for each level of variable B are placed adjacent to one another along a shared baseline. All bars share a common ground (y = 0), allowing effortless comparison of individual heights.",
          "Stacked Barplot (Count): Bars for variable B are stacked vertically on top of one another. The total height of the bar represents the marginal total of variable A. Comparing the lowest segment is easy, but comparing middle or upper segments is difficult because they lack a common zero baseline.",
          "100% Normalized Stacked Barplot: Every bar is stretched to 100% height, and segments represent conditional row percentages. This is ideal for comparing relative proportions across groups when sample sizes differ greatly.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Cognitive Perception and Common Baselines",
          message:
            "Human visual perception is exceptionally accurate at comparing lengths along a common aligned scale, but notoriously poor at judging lengths that start at arbitrary floating offsets. In stacked barplots, only the bottom segment shares a common baseline. Middle and top segments float at varying heights, making precise visual comparison nearly impossible. Whenever individual category comparisons are paramount, prefer side-by-side grouped bars.",
        },
      },
      {
        id: "avoiding-3d-gimmicks",
        title: "3. Chartjunk: Why 3D Barplots Are Forbidden in EDA",
        content: [
          "Dr. Seltman and data visualization pioneers like Edward Tufte strongly condemn pseudo-3D bar charts:",
          "Adding a 3D isometric tilt or cylinder perspective introduces optical illusions: bars in the foreground block bars in the background, angles distort relative heights, and reading the true value against the y-axis becomes impossible.",
          "EDA requires honest, undistorted scientific graphics. Keep barplots strictly 2-dimensional with clean axis lines, legible labels, and high-contrast color palettes.",
        ],
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: Grouped and 100% Stacked Barplots",
        content: [
          "Here is how to generate both side-by-side and 100% normalized stacked barplots in Python using Pandas and Seaborn:",
        ],
        code: {
          language: "python",
          code: `import pandas as pd
import matplotlib.pyplot as plt

# Dataset: Survey satisfaction across subscription tiers
data = {
    'Tier': ['Free']*60 + ['Pro']*40,
    'Status': ['Churned']*24 + ['Retained']*36 + ['Churned']*6 + ['Retained']*34
}
df = pd.DataFrame(data)

# 1. Contingency table of proportions
ct_counts = pd.crosstab(df['Tier'], df['Status'])
ct_pct = pd.crosstab(df['Tier'], df['Status'], normalize='index') * 100

print("=== Contingency Table: Counts ===")
print(ct_counts)
print("\\n=== Row Conditional Percentages (%) ===")
print(ct_pct.round(1).astype(str) + '%')

# Note: In Matplotlib/Pandas, plotting side-by-side is done via:
# ct_pct.plot(kind='bar', figsize=(7, 4), rot=0)
# And 100% stacked is done via:
# ct_pct.plot(kind='bar', stacked=True, figsize=(7, 4), rot=0)`,
          output: `=== Contingency Table: Counts ===
Status  Churned  Retained
Tier                     
Free         24        36
Pro           6        34

=== Row Conditional Percentages (%) ===
Status  Churned Retained
Tier                    
Free      40.0%    60.0%
Pro       15.0%    85.0%`,
          explanation:
            "Notice how the Pro tier has a 15% churn rate compared to 40% in the Free tier. Plotting these row percentages side-by-side visually highlights the 25 percentage point retention advantage of Pro customers.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes",
        content: ["Watch out for these common visual traps with bar charts:"],
        mistakes: [
          "Truncating the Y-Axis: Starting a bar chart at y = 30% instead of y = 0% visually exaggerates minor differences into massive chasms. Bar charts encode value through length from baseline, so the baseline MUST start at zero.",
          "Stacking When Comparing Magnitudes: Using stacked bars when you want readers to compare the exact counts of the middle category leads to inaccurate perceptual judgments.",
          "Using Rainbow Colors for Unordered Categories: Excessive, gaudy color schemes distract from data patterns. Use neutral tones with an accent color or a cohesive colorblind-friendly palette.",
          "Overcrowding Categories: Displaying 30 categories side-by-side turns the chart into an illegible sea of bars. Aggregate small categories into 'Other' or use a horizontal bar chart.",
        ],
      },
    ],
    quiz: {
      question:
        "Why do statisticians prefer side-by-side grouped barplots over standard stacked barplots when comparing individual category sizes across groups?",
      options: [
        "Because side-by-side bars all share a common baseline (y = 0), allowing accurate visual length comparisons, whereas middle segments in stacked bars float at varying offsets.",
        "Because stacked barplots cannot be rendered in Python or R.",
        "Because side-by-side bar charts use less ink than stacked bar charts.",
        "Because stacked bar charts are only allowed for continuous variables.",
      ],
      correctIndex: 0,
      explanation:
        "Human perceptual accuracy is highest when comparing lengths aligned to a shared baseline. Floating segments in stacked bars lose that reference line, making accurate judgment difficult.",
    },
    takeaways: [
      "Grouped barplots provide the visual representation of two-way contingency tables.",
      "Side-by-side bars share a common baseline, making individual level comparisons effortless.",
      "100% normalized stacked bars are ideal for comparing relative compositional proportions across groups of unequal size.",
      "Always start bar chart baselines at zero and strictly avoid 3D chartjunk.",
    ],
  },
  {
    id: "side-by-side-boxplots",
    slug: "side-by-side-boxplots",
    moduleId: "multivariate-graphical",
    order: 2,
    globalOrder: 18,
    title: "Side-by-Side Boxplots: Conditioning Quantitative on Categorical",
    subtitle: "The Seltman Age-Grouped Strength Case Study & Banishing Dynamite Plots",
    estimatedMinutes: 12,
    summary:
      "Master side-by-side boxplots for comparing continuous distributions across factor levels, explore Dr. Seltman's grouped Age vs. Strength case study, and learn why modern science replaces 'dynamite plots' with boxplots.",
    prerequisites: ["boxplots-outliers", "grouped-statistics"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Workhorse of Comparative EDA",
        content: [
          "Whenever you want to compare a continuous quantitative measurement across two or more discrete experimental groups, the Side-by-Side Boxplot is arguably the single most informative, compact, and robust visualization in statistics.",
          "By placing individual boxplots along a shared continuous vertical axis, you can simultaneously evaluate changes in center (median), spread (IQR), skewness, and extreme outliers across every single group in a single glance.",
        ],
      },
      {
        id: "real-world-scenario",
        title: "2. Case Study from PDF: Seltman's Grouped Age vs. Strength Study",
        content: [
          "In Section 4.5.2, Dr. Seltman takes the 11-subject physical strength dataset and bins the continuous Age variable into three discrete demographic brackets: Younger (21–42], Middle (42–62], and Older (62–82]:",
        ],
        table: {
          caption: "Grouped Summary Statistics: Age Brackets vs Strength (Dr. Seltman, p. 94)",
          headers: ["Age Bracket", "Subjects", "Median Strength", "IQR", "Visual Boxplot Features"],
          rows: [
            [
              "Younger (21–42]",
              "GW, JA, TJ, JMA, JMO (n = 5)",
              "72.0 force units",
              "4.0 units",
              "High median; compact box; no outliers.",
            ],
            [
              "Middle (42–62]",
              "JQA, AJ (n = 2)",
              "63.0 force units",
              "2.0 units",
              "Intermediate center; slightly lower; tight spread.",
            ],
            [
              "Older (62–82]",
              "MVB, WHH, JT, JKP (n = 4)",
              "56.5 force units",
              "5.0 units",
              "Markedly lower center; moderate spread; no outliers.",
            ],
          ],
        },
        bullets: [
          "Monotonic Decline: Medians drop cleanly: 72.0 -> 63.0 -> 56.5 units, visually demonstrating the degradation of strength with age.",
          "Homoscedasticity Confirmation: The heights of the three boxes (IQRs) are very similar (4.0, 2.0, 5.0), confirming that error variance is reasonably consistent across groups.",
          "Absence of Outliers: None of the groups show individual outlier points outside the whiskers, indicating clean, well-behaved subgroups.",
        ],
      },
      {
        id: "banishing-dynamite-plots",
        title: "3. Why Science Banned 'Dynamite Plots' in Favor of Boxplots",
        content: [
          "For decades, scientific papers commonly presented data using 'dynamite plots'—bar charts showing the group mean with a single vertical 'T-shaped' error bar for standard deviation.",
          "Modern statistics and journals have largely banned dynamite plots for three critical reasons:",
        ],
        steps: [
          "1. Hiding the Distribution: A bar chart fills the area from 0 to the mean with solid ink, suggesting that values exist uniformly throughout the bar, even if all actual data is clustered far from zero.",
          "2. Concealing Outliers and Skewness: An error bar cannot show whether a group is symmetric, right-skewed, or contaminated by a single massive outlier.",
          "3. Concealing Sample Sizes: A dynamite plot looks identical whether n = 4 or n = 40,000.",
          "By contrast, side-by-side boxplots reveal the true five-number summary, show asymmetry, and explicitly plot every outlier dot.",
        ],
        callout: {
          type: "tip",
          title: "Pro-Tip: Overlaying Raw Data Jitter",
          message:
            "When sample sizes are small to moderate (n < 50 per group), superimpose semi-transparent raw data points (strip plot / jitter) directly over the boxplots. This shows readers both the summary statistics and every individual raw data point!",
        },
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: Recreating Seltman's Grouped Boxplots",
        content: [
          "Here is how to create side-by-side boxplots with categorized age groups using Pandas and Seaborn:",
        ],
        code: {
          language: "python",
          code: `import pandas as pd
import numpy as np

# Recreate Seltman's Table 4.4 Data
subjects = ['GW', 'JA', 'TJ', 'JMA', 'JMO', 'JQA', 'AJ', 'MVB', 'WHH', 'JT', 'JKP']
age = [21, 25, 28, 36, 42, 50, 58, 65, 70, 78, 82]
strength = [76, 73, 72, 70, 68, 64, 62, 60, 58, 55, 53]

df = pd.DataFrame({'Subject': subjects, 'Age': age, 'Strength': strength})

# Bin Age into Seltman's 3 intervals: (21, 42], (42, 62], (62, 82]
bins = [20, 42, 62, 85]
labels = ['Younger (21-42)', 'Middle (43-62)', 'Older (63-82)']
df['AgeGroup'] = pd.cut(df['Age'], bins=bins, labels=labels)

# Compute five-number summary per age group
grouped = df.groupby('AgeGroup', observed=False)['Strength'].agg([
    ('Count', 'count'),
    ('Min', 'min'),
    ('Q1', lambda x: x.quantile(0.25)),
    ('Median', 'median'),
    ('Q3', lambda x: x.quantile(0.75)),
    ('Max', 'max'),
    ('IQR', lambda x: x.quantile(0.75) - x.quantile(0.25))
])

print("=== Seltman Grouped Strength Summary ===")
print(grouped)

# Visualization syntax:
# sns.boxplot(x='AgeGroup', y='Strength', data=df, palette='Blues')
# sns.stripplot(x='AgeGroup', y='Strength', data=df, color='black', alpha=0.7, jitter=0.1)`,
          output: `=== Seltman Grouped Strength Summary ===
                 Count  Min    Q1  Median    Q3  Max  IQR
AgeGroup                                                 
Younger (21-42)      5   68  70.0    72.0  73.0   76  3.0
Middle (43-62)       2   62  62.5    63.0  63.5   64  1.0
Older (63-82)        4   53  54.5    56.5  58.5   60  4.0`,
          explanation:
            "The output mirrors Dr. Seltman's Section 4.5.2 text, clearly showing medians decreasing from 72.0 down to 56.5 as age brackets increase.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes",
        content: ["Avoid these common errors with side-by-side boxplots:"],
        mistakes: [
          "Forgetting to Order Ordinal Categories: If groups have a natural progression (e.g. Low, Med, High dose), make sure they appear in logical order along the x-axis, rather than alphabetical order ('High', 'Low', 'Med').",
          "Misjudging Sample Sizes: A boxplot looks just as substantial for a group of n = 3 as it does for n = 3,000. Always print group counts (n) below the category labels.",
          "Ignoring Collapsed Boxes on Discrete Data: If data has many tied values, Q1 and Median can coincide, causing the bottom half of the box to disappear.",
          "Overlooking Severe Variance Differences: If one group's box is 5 times taller than the others, you are visually witnessing heteroscedasticity, which violates standard linear model assumptions.",
        ],
      },
    ],
    quiz: {
      question:
        "What critical diagnostic insight did Dr. Seltman's side-by-side boxplots of Age Group vs Strength reveal?",
      options: [
        "A clear downward shift in median strength as age increased, with similar box heights (IQRs) confirming consistent spread across age groups.",
        "That strength increased with age.",
        "That older participants had 15 extreme outliers.",
        "That physical strength is unrelated to chronological age.",
      ],
      correctIndex: 0,
      explanation:
        "The side-by-side boxplots clearly demonstrated that median strength decreased across the age groups (72 -> 63 -> 56.5), while similar box heights visually confirmed the assumption of roughly equal variances.",
    },
    takeaways: [
      "Side-by-side boxplots are the premier tool for conditioning quantitative outcomes on categorical predictors.",
      "They allow simultaneous visual comparison of centers, spreads, skewness, and outliers across groups.",
      "Dynamite plots (bars with error sticks) hide raw distributions and outliers, and should be avoided.",
      "Always order ordinal categories logically along the axis and annotate sample sizes.",
    ],
  },
  {
    id: "scatterplots-multivariate",
    slug: "scatterplots-multivariate",
    moduleId: "multivariate-graphical",
    order: 3,
    globalOrder: 19,
    title: "Scatterplots & Multi-Variable Encodings: Dr. Seltman's Figure 4.16",
    subtitle: "Conventions, Bivariate Patterns & Encoding 3rd and 4th Variables in 2D",
    estimatedMinutes: 14,
    summary:
      "Master scatterplot conventions, identify linear and non-linear patterns, spot bivariate outliers, and explore Dr. Seltman's Figure 4.16 technique for encoding 3rd and 4th variables on a 2D plane.",
    prerequisites: ["covariance-and-correlation", "side-by-side-boxplots"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The King of Bivariate Graphics",
        content: [
          "When exploring two continuous quantitative variables, the Scatterplot is the single most powerful visualization ever devised. By plotting one variable on the horizontal axis and the second on the vertical axis, every individual observation appears as an exact point in a 2-dimensional Cartesian space.",
          "A scatterplot reveals patterns that no summary metric can capture: linear trajectories, parabolic curves, exponential growth, distinct clusters, gaps, and bivariate outliers that look completely normal when viewed in univariate histograms.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Scatterplot Conventions and Diagnostic Patterns",
        content: ["In professional scientific EDA, scatterplots follow strict conventions:"],
        bullets: [
          "Axis Conventions: The explanatory (independent / predictor) variable is placed on the horizontal x-axis. The outcome (dependent / response) variable is placed on the vertical y-axis.",
          "Linear Association: Points follow a straight diagonal trajectory (positive slope indicates positive r; negative slope indicates negative r).",
          "Curvature: Points follow a curved trajectory (parabolic, logarithmic, sigmoidal). Alerts the analyst that linear regression is inappropriate without transformations.",
          "Heteroscedasticity (Fan Shape): Scatter starts tightly clustered at low x-values and fans out widely as x increases. Signals non-constant variance.",
          "Bivariate Outliers: Points that lie far away from the overall joint relationship, even if their individual x and y values are within normal univariate limits.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Figure 4.16 and Multi-Variable Encodings",
          message:
            "In Figure 4.16, Dr. Seltman illustrates how a 2D scatterplot can be extended to display 3 or 4 variables simultaneously. In his Age vs. Strength plot, Gender is encoded using different point symbols (circles for females, triangles for males), and Political Party is encoded using colors or fills. This reveals whether the relationship between Age and Strength holds equally across genders and parties, exposing potential confounding and interaction effects.",
        },
      },
      {
        id: "real-world-scenario",
        title: "3. Case Study: Seltman Figure 4.16 (Age, Strength, Gender & Party)",
        content: [
          "Consider the multi-variable extension of the Age vs. Strength experiment:",
          "When Age (x) and Strength (y) are plotted alone, there is an overall negative linear slope.",
          "When we encode Gender (Male vs Female) with different symbols, a deeper insight emerges: Within every age group, Males have higher average strength than Females. However, BOTH groups exhibit parallel declining slopes with age!",
          "If Gender had not been encoded, an analyst might mistake gender-based strength differences for pure age-related variation, or miss that the rate of age decline is parallel across sexes.",
        ],
        table: {
          caption: "Visual Encoding Hierarchy for Multi-Variable Scatterplots",
          headers: ["Dimension", "Visual Channel", "Variable Type", "Perceptual Accuracy"],
          rows: [
            [
              "1st Variable",
              "Horizontal Position (X-axis)",
              "Continuous Explanatory",
              "Highest precision",
            ],
            [
              "2nd Variable",
              "Vertical Position (Y-axis)",
              "Continuous Outcome",
              "Highest precision",
            ],
            [
              "3rd Variable",
              "Color / Hue",
              "Categorical (e.g. Gender, Treatment)",
              "High precision (up to 6-8 distinct colors)",
            ],
            [
              "4th Variable",
              "Point Shape / Symbol",
              "Categorical (e.g. Political Party, Cohort)",
              "Moderate precision (circles, squares, triangles)",
            ],
            [
              "5th Variable (Optional)",
              "Point Size",
              "Continuous (e.g. Body Mass)",
              "Moderate to low precision (perceptually difficult to quantify area)",
            ],
          ],
        },
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: Recreating Seltman's Figure 4.16",
        content: [
          "Here is how to create a multi-variable scatterplot encoding 4 dimensions in Python using Seaborn and Matplotlib:",
        ],
        code: {
          language: "python",
          code: `import pandas as pd
import numpy as np

# Recreate Seltman Figure 4.16 Multi-Variable Dataset
np.random.seed(42)
n_per_group = 10

# Generate synthetic ages
age_f = np.random.uniform(20, 80, n_per_group)
age_m = np.random.uniform(20, 80, n_per_group)

# Generate strength with parallel age decline and male offset (+15 units)
str_f = 75 - 0.28 * age_f + np.random.normal(0, 2.5, n_per_group)
str_m = 90 - 0.28 * age_m + np.random.normal(0, 2.5, n_per_group)

df = pd.DataFrame({
    'Age': np.concatenate([age_f, age_m]),
    'Strength': np.concatenate([str_f, str_m]),
    'Gender': ['Female']*n_per_group + ['Male']*n_per_group,
    'Party': np.random.choice(['Democrat', 'Republican'], size=2*n_per_group)
})

print("=== Multi-Variable Dataset Preview (Figure 4.16) ===")
print(df.head(6).round(1))

# Seaborn 4-variable plotting syntax:
# import seaborn as sns
# import matplotlib.pyplot as plt
# plt.figure(figsize=(8, 5))
# sns.scatterplot(
#     data=df,
#     x='Age', y='Strength',
#     hue='Gender',          # 3rd variable: Color
#     style='Party',         # 4th variable: Symbol shape
#     s=100, alpha=0.85
# )
# plt.title("Figure 4.16: Strength vs Age by Gender & Political Party")`,
          output: `=== Multi-Variable Dataset Preview (Figure 4.16) ===
    Age  Strength  Gender       Party
0  42.5      64.0  Female    Democrat
1  77.0      54.4  Female  Republican
2  63.9      56.6  Female    Democrat
3  55.9      58.6  Female  Republican
4  29.4      66.1  Female  Republican
5  29.3      68.0  Female    Democrat`,
          explanation:
            "Encoding Gender via hue and Party via style on the 2D plane enables the analyst to inspect all four variables simultaneously, spotting subgroup slopes and interaction effects without running complex models.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes",
        content: ["Be careful when constructing and interpreting multi-variable scatterplots:"],
        mistakes: [
          "Inverting X and Y Axes: Placing the outcome on the x-axis and predictor on the y-axis violates scientific convention and confuses readers trying to gauge effect direction.",
          "Overplotting in Dense Datasets: When plotting 50,000 points, dots merge into a solid ink blob. Use transparency (alpha=0.2), hexagonal binning, or 2D density contours.",
          "Encoding Too Many Variables at Once: Trying to encode 6 variables simultaneously (x, y, color, shape, size, texture) creates cognitive overload. Limit 2D plots to 3 or at most 4 variables.",
          "Ignoring Conditioning / Simpson's Paradox: Failing to color-code by group can hide the fact that within every group the slope is positive, even though the combined aggregate slope looks negative!",
        ],
      },
    ],
    quiz: {
      question:
        "In Dr. Seltman's Figure 4.16, how were the 3rd and 4th variables (Gender and Political Party) visually incorporated into the 2D scatterplot of Age vs Strength?",
      options: [
        "By using distinct point symbols/shapes for Gender and different colors/styles for Political Party.",
        "By drawing separate 3D holographic projections.",
        "By averaging all males and females together into a single point.",
        "By converting the continuous Age and Strength variables into categorical bar charts.",
      ],
      correctIndex: 0,
      explanation:
        "Dr. Seltman mapped Gender to point symbols (e.g. circles and triangles) and Political Party to colors/styles, allowing all four dimensions to be analyzed in a single 2D graphic.",
    },
    takeaways: [
      "Scatterplots are the premier graphical method for examining relationships between two quantitative variables.",
      "Always place the explanatory variable on the x-axis and the outcome on the y-axis.",
      "Check for linearity, curvature, fan-shaped heteroscedasticity, and bivariate outliers.",
      "Multi-variable encodings (color, point shape) allow 3 or 4 variables to be visualized simultaneously to expose confounding and interaction effects.",
    ],
  },
];
