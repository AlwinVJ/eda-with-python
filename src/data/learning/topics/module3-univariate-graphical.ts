import type { LearningTopic } from "../types";

export const module3Topics: LearningTopic[] = [
  {
    id: "histograms-and-bins",
    slug: "histograms-and-bins",
    moduleId: "univariate-graphical",
    order: 1,
    globalOrder: 9,
    title: "Histograms & Binning Sensitivity: Seeing the True Distribution",
    subtitle: "Bin Widths, Visual Artifacts, Sample Size Effects & The EDA2.dat Case Study",
    estimatedMinutes: 11,
    summary:
      "Explore the construction of histograms, understand how arbitrary bin widths can distort or reveal distribution shapes, examine Dr. Seltman's EDA2.dat case study, and master the Freedman-Diaconis rule.",
    prerequisites: ["quantitative-characteristics"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Universal Graphic",
        content: [
          "The histogram is the most ubiquitous graphical tool in data analysis. It translates a continuous stream of quantitative measurements into a visual landscape of columns, where the horizontal axis represents the range of the variable and the vertical axis represents the frequency (or density) of observations.",
          "However, histograms harbor a dangerous secret that many beginners fail to appreciate: the visual shape of a histogram is not an objective property of the data alone. It is intimately dependent on two arbitrary choices made by the analyst—the width of the bins and the starting boundary.",
          "A poorly binned histogram can completely mask genuine multimodality (over-smoothing) or generate deceptive spiky peaks that are purely random sampling noise (under-smoothing).",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Formal Construction and Binning Rules",
        content: [
          "A histogram partitions the range of a quantitative variable into a series of contiguous, non-overlapping intervals called bins or classes:",
        ],
        bullets: [
          "Bin Width (h): The horizontal span of each interval (e.g. h = 5 units).",
          "Bin Edges: The boundary thresholds [b_0, b_1, ..., b_k] where b_j - b_{j-1} = h.",
          "Bin Frequency: The count of observations x_i that satisfy b_{j-1} < x_i ≤ b_j (or half-open convention).",
          "Freedman-Diaconis Rule: A mathematically optimal choice for bin width that balances resolution and noise: h = 2 × IQR × n^(-1/3).",
          "Sturges' Formula: A classical rule for the number of bins: k = 1 + log_2(n). (Note: Dr. Seltman warns this often over-smooths large datasets).",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: The EDA2.dat Experiment",
          message:
            "In Section 4.3.1, Dr. Seltman demonstrates the profound effect of binning using the EDA2.dat dataset. When plotted with a bin width of 5, the data appears unimodal and gently skewed. When the bin width is reduced to 2, two distinct separate peaks emerge. When reduced to 1, the plot becomes an uninterpretable jagged comb of sampling noise. Always try multiple bin widths before drawing conclusions!",
        },
      },
      {
        id: "sample-size-effect",
        title: "3. Sample Size Effects: n = 50 vs n = 100",
        content: [
          "Dr. Seltman also highlights how sample size fundamentally limits what a histogram can show:",
          "With n = 50 observations, random sampling noise is substantial. Spurious valleys and false peaks appear regularly, and true underlying features like mild bimodality or moderate skewness can be easily obscured.",
          "With n = 100 or more observations, the true underlying distribution stabilizes. The Law of Large Numbers begins to assert itself, and reliable bin structures emerge.",
        ],
        table: {
          caption: "Bin Width Behavior on the EDA2.dat Dataset (Dr. Seltman, p. 74)",
          headers: ["Bin Width (h)", "Visual Appearance", "Diagnostic Risk", "Appropriate Use"],
          rows: [
            [
              "Width = 5",
              "Single smooth broad hump",
              "Over-smoothing: completely conceals the bimodal subpopulation",
              "Quick initial high-level glance",
            ],
            [
              "Width = 2",
              "Two distinct, balanced peaks clearly visible",
              "Optimal balance: reveals true scientific bimodality without noise",
              "Recommended for this dataset",
            ],
            [
              "Width = 1",
              "Jagged comb with dozens of tiny spikes and zero-count gaps",
              "Under-smoothing: confuses random variation with scientific reality",
              "Too noisy for general presentation",
            ],
          ],
        },
      },
      {
        id: "mathematical-explanation",
        title: "4. Mathematical Formulation: Freedman-Diaconis Optimal Binning",
        content: [
          "Rather than guessing bin widths arbitrarily, modern EDA relies on the Freedman-Diaconis rule, which uses the Interquartile Range to resist outliers:",
        ],
        formula: {
          title: "Freedman-Diaconis Bin Width Formula",
          displayFormula:
            "h_{\\text{FD}} = 2 \\times \\text{IQR} \\times n^{-1/3} = \\frac{2 \\times (Q_3 - Q_1)}{\\sqrt[3]{n}}, \\quad k = \\left\\lceil \\frac{\\text{Max} - \\text{Min}}{h_{\\text{FD}}} \\right\\rceil",
          variables: [
            { symbol: "h_{\\text{FD}}", meaning: "Optimal bin width" },
            {
              symbol: "\\text{IQR}",
              meaning: "Interquartile range (Q3 - Q1), robust against outliers",
            },
            { symbol: "n", meaning: "Total sample size" },
            { symbol: "k", meaning: "Total number of bins across the observed range" },
          ],
          intuition:
            "As sample size n grows, n^(-1/3) shrinks slowly, allowing bin width to narrow and reveal finer details without succumbing to noise. Because it uses IQR rather than standard deviation, extreme outliers do not artificially explode the bin width.",
          exampleCalculation: {
            given:
              "Sample of n = 125 measurements with Q1 = 40, Q3 = 55 (IQR = 15), Min = 22, Max = 82.",
            steps: [
              "Step 1: Compute Cube Root of n: ∛125 = 5.0.",
              "Step 2: Apply Freedman-Diaconis formula: h = 2 × 15 × (1 / 5.0) = 30 / 5 = 6.0 units.",
              "Step 3: Calculate Data Range: Range = Max - Min = 82 - 22 = 60 units.",
              "Step 4: Compute Total Bins: k = Range / h = 60 / 6 = 10 bins.",
            ],
            result: "Optimal Bin Width h = 6.0 units, Total Bins k = 10",
            interpretation:
              "Setting bin width to 6.0 provides the optimal trade-off between smoothing out random noise and capturing true distributional features.",
          },
        },
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: Exploring Bin Widths",
        content: [
          "Here is how you evaluate bin sensitivity programmatically in Python using Matplotlib and NumPy:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import matplotlib.pyplot as plt

# Simulate bimodal dataset mimicking Dr. Seltman's EDA2.dat
np.random.seed(42)
cluster1 = np.random.normal(loc=20, scale=3, size=50)
cluster2 = np.random.normal(loc=32, scale=3, size=50)
eda2_data = np.concatenate([cluster1, cluster2])

# Calculate Freedman-Diaconis bin width
q25, q75 = np.percentile(eda2_data, [25, 75])
iqr = q75 - q25
h_fd = 2 * iqr * (len(eda2_data) ** (-1/3))

print("=== Histogram Bin Analysis ===")
print(f"Sample Size n: {len(eda2_data)}")
print(f"IQR: {iqr:.2f}")
print(f"Optimal Freedman-Diaconis Bin Width: {h_fd:.2f}")

# Compare three bin settings: Wide (5), Optimal (FD ~2.5), Narrow (0.5)
bin_settings = [5.0, round(h_fd, 1), 0.5]
for w in bin_settings:
    bins = np.arange(np.floor(eda2_data.min()), np.ceil(eda2_data.max()) + w, w)
    counts, _ = np.histogram(eda2_data, bins=bins)
    print(f"\\nBin Width {w}: Created {len(bins)-1} bins. Max count in a bin: {counts.max()}")`,
          output: `=== Histogram Bin Analysis ===
Sample Size n: 100
IQR: 12.04
Optimal Freedman-Diaconis Bin Width: 5.19

Bin Width 5.0: Created 6 bins. Max count in a bin: 34
Bin Width 5.2: Created 6 bins. Max count in a bin: 34
Bin Width 0.5: Created 57 bins. Max count in a bin: 6`,
          explanation:
            "Always inspect histograms under multiple bin specifications. If your software defaults to 10 bins, try 5, 20, and the 'fd' (Freedman-Diaconis) setting in Matplotlib or Seaborn.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "6. Common Beginner Mistakes",
        content: ["Avoid these common errors when reading and plotting histograms:"],
        mistakes: [
          "Trusting the Default Software Bins Blindly: Software packages pick arbitrary default bin counts (often 10 or 30). These defaults frequently conceal crucial clusters or create artificial gaps.",
          "Confusing Bar Charts with Histograms: Bar charts represent discrete categorical counts with spaces between bars. Histograms represent continuous quantitative ranges with touching bars.",
          "Ignoring the Y-Axis (Frequency vs Density): When bin widths are unequal, the vertical axis MUST represent probability density (frequency / bin width), not raw frequency, or wider bins will visually over-represent data.",
          "Believing Small Samples Can Reveal Modality: With n = 25, histograms are extremely unreliable due to sampling variance. Use boxplots or stem-and-leaf plots instead.",
        ],
      },
    ],
    quiz: {
      question:
        "In Dr. Seltman's EDA2.dat experiment, what happened when the histogram bin width was reduced from 5 to 2?",
      options: [
        "It revealed two distinct separate peaks (bimodality) that had been completely concealed by the over-smoothed bin width of 5.",
        "It showed that the data was perfectly normally distributed.",
        "It reduced the sample size from 100 to 50 observations.",
        "It proved that the data contained no outliers.",
      ],
      correctIndex: 0,
      explanation:
        "A bin width of 5 over-smoothed the data, merging the two clusters into a single broad hump. Narrowing the bin width to 2 revealed the true bimodal structure.",
    },
    takeaways: [
      "Histograms are sensitive to bin width and bin origin; never rely on a single default plot.",
      "Over-smoothing conceals real multimodality; under-smoothing creates distracting random noise.",
      "Use the Freedman-Diaconis rule (h = 2 × IQR × n^(-1/3)) as a robust mathematical baseline.",
      "In small samples (n < 50), random noise makes histograms volatile; supplement them with boxplots.",
    ],
  },
  {
    id: "stem-and-leaf",
    slug: "stem-and-leaf",
    moduleId: "univariate-graphical",
    order: 2,
    globalOrder: 10,
    title: "Stem-and-Leaf Displays: Retaining Exact Numbers in Visual Form",
    subtitle: "John Tukey's Invaluable Semi-Graphical Tool for Small to Moderate Datasets",
    estimatedMinutes: 9,
    summary:
      "Learn how stem-and-leaf displays combine the visual distribution of a histogram with the complete numerical precision of raw data, and understand stems, leaves, leaf units, and split stems.",
    prerequisites: ["histograms-and-bins"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Best of Both Worlds",
        content: [
          "When you look at a histogram, you gain a clear visual impression of the distribution's shape, but you pay a steep price: you lose all the original numbers. A bar showing 8 observations between 20 and 30 doesn't tell you whether those values are all 21, all 29, or evenly spread.",
          "To solve this problem, legendary statistician John Tukey invented the Stem-and-Leaf display. It is an ingenious semi-graphical technique that displays the shape of a distribution while preserving the exact numerical value of every single observation.",
          "If you turn a stem-and-leaf plot sideways by 90 degrees, it looks identical to a histogram—except every bar is constructed from the actual digits of the data!",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Anatomy of a Stem-and-Leaf Display",
        content: ["A stem-and-leaf display splits every data value into two components:"],
        bullets: [
          "Stem: The leading digit or digits (representing the major bin or class interval). Stems are listed vertically in ascending order on the left of a vertical dividing bar.",
          "Leaf: The trailing digit (representing individual observations falling within that stem). Leaves are listed horizontally on the right of the bar, sorted in ascending order.",
          "Leaf Unit: The scaling multiplier that defines the decimal place of the leaf (e.g. 'Leaf Unit = 1.0', 'Leaf Unit = 0.1', or 'Leaf Unit = 10'). Without the leaf unit, the plot cannot be decoded.",
          "Split Stems: When too many leaves crowd onto a single stem, each stem digit can be split into two lines (e.g. leaves 0–4 on the first line, 5–9 on the second line) or five lines.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Why Stemplots Remain Crucial",
          message:
            "Stem-and-leaf displays are particularly useful for small to moderate sized datasets (n between 15 and 100). They allow the analyst to visually inspect shape, symmetry, and outliers while simultaneously checking for data entry errors, rounding artifacts, and repeated values, without needing computer graphics.",
        },
      },
      {
        id: "real-world-scenario",
        title: "3. Step-by-Step Construction: The Exam Scores Example",
        content: [
          "Consider a sample of n = 15 student exam scores:",
          "Raw scores: [58, 62, 65, 68, 71, 74, 74, 78, 80, 83, 85, 87, 88, 92, 95]",
          "Let the tens digit be the stem (5, 6, 7, 8, 9) and the units digit be the leaf. The leaf unit is 1.0.",
        ],
        table: {
          caption: "Complete Stem-and-Leaf Plot (Exam Scores, n = 15)",
          headers: ["Stem (Tens)", "|", "Leaves (Units)", "Decoded Values"],
          rows: [
            ["5", "|", "8", "58"],
            ["6", "|", "2 5 8", "62, 65, 68"],
            ["7", "|", "1 4 4 8", "71, 74, 74, 78"],
            ["8", "|", "0 3 5 7 8", "80, 83, 85, 87, 88"],
            ["9", "|", "2 5", "92, 95"],
          ],
        },
      },
      {
        id: "python-implementation",
        title: "4. Python Implementation: Generating Stemplots",
        content: [
          "While Pandas lacks a native stemplot, we can generate authentic Tukey stem-and-leaf displays using clean Python code:",
        ],
        code: {
          language: "python",
          code: `def stem_and_leaf(data, leaf_unit=1):
    """
    Generates an authentic Tukey stem-and-leaf display from numeric data.
    """
    sorted_data = sorted(data)
    stems = {}
    
    for val in sorted_data:
        stem = int(val // (leaf_unit * 10))
        leaf = int((val % (leaf_unit * 10)) // leaf_unit)
        stems.setdefault(stem, []).append(leaf)
    
    print(f"=== Stem-and-Leaf Display (n = {len(data)}) ===")
    print(f"Leaf Unit = {leaf_unit}\\n")
    
    min_stem = min(stems.keys())
    max_stem = max(stems.keys())
    
    for s in range(min_stem, max_stem + 1):
        leaves = stems.get(s, [])
        leaves_str = " ".join(str(d) for d in leaves)
        count = len(leaves)
        print(f"  {s:3d} | {leaves_str}")

scores = [58, 62, 65, 68, 71, 74, 74, 78, 80, 83, 85, 87, 88, 92, 95]
stem_and_leaf(scores, leaf_unit=1)`,
          output: `=== Stem-and-Leaf Display (n = 15) ===
Leaf Unit = 1

    5 | 8
    6 | 2 5 8
    7 | 1 4 4 8
    8 | 0 3 5 7 8
    9 | 2 5`,
          explanation:
            "From this display, we can directly read the exact median: with n=15, the 8th value is the median. Counting 8 leaves from the top (1 in stem 5, 3 in stem 6, 4 in stem 7) lands on the second 4 in stem 7 -> Median = 74!",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "5. Common Beginner Mistakes",
        content: ["Be careful when interpreting or constructing stem-and-leaf plots:"],
        mistakes: [
          "Leaving Out the Leaf Unit: A display showing 'stem 4 | leaf 5' could mean 45, 4.5, 450, or 0.45. Without the Leaf Unit statement, the display is impossible to interpret accurately.",
          "Skipping Empty Stems: If there are no observations in stem 7, you MUST still write '7 | ' with no leaves. Skipping the stem distorts the horizontal distance and hides gaps or bimodality.",
          "Using Stem-and-Leaf for Massive Datasets: Stemplots are designed for n < 100. If you have 50,000 observations, a stemplot will produce miles of printed numbers.",
          "Unsorted Leaves: Leaves on each line MUST be sorted in ascending order; otherwise, finding quantiles directly from the display is impossible.",
        ],
      },
    ],
    quiz: {
      question:
        "A stem-and-leaf display specifies 'Leaf Unit = 0.1'. A line reads '14 | 2 5 9'. What are the actual numbers represented on this line?",
      options: [
        "14.2, 14.5, and 14.9",
        "142, 145, and 149",
        "1.42, 1.45, and 1.49",
        "14, 2, 5, and 9",
      ],
      correctIndex: 0,
      explanation:
        "The stem is 14. With a leaf unit of 0.1, the leaves 2, 5, and 9 represent tenths: 14 + 0.2 = 14.2, 14 + 0.5 = 14.5, and 14 + 0.9 = 14.9.",
    },
    takeaways: [
      "Stem-and-leaf displays show distribution shape while retaining every single individual data point.",
      "Always state the Leaf Unit clearly so readers can decode the exact values.",
      "Never skip empty stems, as doing so destroys the physical spatial distance between values.",
      "Median and quartiles can be determined directly by counting leaves from either end.",
    ],
  },
  {
    id: "boxplots-outliers",
    slug: "boxplots-outliers",
    moduleId: "univariate-graphical",
    order: 3,
    globalOrder: 11,
    title: "Boxplots & Outlier Detection: Tukey Hinges & The Hen & Eggs Case Study",
    subtitle: "Mastering the 5-Number Summary, 1.5×IQR Whiskers, Discrete Ties & The 0.70% Rule",
    estimatedMinutes: 13,
    summary:
      "Master the construction of boxplots (box-and-whisker plots), understand Tukey hinges and whiskers, study Dr. Seltman's Hen & Eggs outlier case study, examine discrete data ties, and learn why normal data has 0.70% outliers by chance.",
    prerequisites: ["measures-of-spread"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Compact Power of the Boxplot",
        content: [
          "While histograms require careful bin tuning and stemplots become unwieldy with large datasets, the Boxplot (invented by John W. Tukey in 1977) provides an exceptionally compact, robust, five-number visual summary of any quantitative distribution.",
          "A single boxplot encapsulates center, spread, skewness, and outliers in one clean graphic. Furthermore, because it takes up minimal vertical space, it is the premier tool for side-by-side comparisons across multiple groups.",
          "However, interpreting boxplots requires precision: understanding where the whiskers end, how outliers are formally flagged, and how discrete data with ties can mislead the unwary.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Anatomy and Construction of a Boxplot",
        content: [
          "A standard Tukey boxplot is built from the Five-Number Summary plus outlier fences:",
        ],
        bullets: [
          "Median (Q2, 50th percentile): A solid horizontal line inside the box marking the center.",
          "Hinges / Box Edges (Q1 and Q3): The bottom of the box marks the 25th percentile (Q1); the top marks the 75th percentile (Q3). The height of the box is the Interquartile Range (IQR = Q3 - Q1).",
          "Inner Fences (Calculation Boundaries): Lower Fence = Q1 - 1.5 × IQR; Upper Fence = Q3 + 1.5 × IQR. (Note: These fences are NOT drawn on the final plot; they serve as diagnostic boundaries).",
          "Whiskers: Lines extending from the box edges to the most extreme data points that STILL FALL INSIDE the inner fences. Whiskers NEVER extend past the actual data!",
          "Outliers: Any individual observations that lie outside the inner fences (> 1.5 × IQR beyond Q1 or Q3). Plotted as individual dots or asterisks.",
          "Far Outliers: Observations beyond 3.0 × IQR (Q1 - 3*IQR or Q3 + 3*IQR). Often plotted with distinct symbols.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Expected Outliers in Normal Data (The 0.70% Rule)",
          message:
            "A critical insight from Section 4.3.3: In a purely normal (Gaussian) distribution, the probability of an observation falling beyond 1.5 × IQR from the hinges is approximately 0.0070 (0.70%, or roughly 7 out of every 1,000 data points). Therefore, in large datasets (e.g. n = 1,000), seeing 5 to 10 boxplot outliers is completely normal and expected! Do NOT immediately assume an outlier is an error.",
        },
      },
      {
        id: "real-world-scenario",
        title: "3. Case Study from PDF: The Hen & Eggs Outlier Experiment",
        content: [
          "Dr. Seltman presents a classic case study of daily egg production from a coop of hens over a multi-week observational period:",
          "Daily egg counts: [3, 4, 4, 3, 5, 4, 4, 5, 4, 3, 4, 4, 5, 4, 9]",
          "Notice the values are discrete counts clustered between 3 and 5, except for a single day with 9 eggs.",
        ],
        table: {
          caption: "Hen & Eggs Five-Number Summary & Outlier Calculations",
          headers: ["Statistic", "Value", "Calculation & Meaning"],
          rows: [
            ["Sample Size (n)", "15 days", "Total days observed"],
            ["Median (Q2)", "4 eggs", "Middle value of the sorted sample"],
            ["Q1 (25th percentile)", "4 eggs", "Lower hinge (note the tie with median!)"],
            ["Q3 (75th percentile)", "5 eggs", "Upper hinge"],
            ["IQR (Q3 - Q1)", "1 egg", "IQR = 5 - 4 = 1 egg"],
            ["Upper Fence", "6.5 eggs", "Q3 + 1.5 × IQR = 5 + 1.5 × 1 = 6.5 eggs"],
            ["Upper Whisker End", "5 eggs", "Highest observed value inside the fence (≤ 6.5)"],
            ["Outlier Day", "9 eggs", "Exceeds upper fence (9 > 6.5). Plotted as isolated dot!"],
          ],
        },
        callout: {
          type: "warning",
          title: "The Problem of Ties in Discrete Data",
          message:
            "Notice that in the Hen & Eggs data, Q1 = 4 and Median = 4! When data is discrete with small ranges, many observations share identical values (ties). This can cause the median line to sit directly on the bottom edge of the box, or cause the IQR to collapse to zero. Boxplots work best on continuous or broad discrete measurements.",
        },
      },
      {
        id: "mathematical-explanation",
        title: "4. Mathematical Formulation: Tukey Fences",
        content: [
          "The mathematical rules governing boxplot fences and whiskers are defined rigorously:",
        ],
        formula: {
          title: "Tukey Inner and Outer Fences",
          displayFormula:
            "\\text{Fence}_{\\text{lower}} = Q_1 - 1.5 \\times \\text{IQR}, \\quad \\text{Fence}_{\\text{upper}} = Q_3 + 1.5 \\times \\text{IQR}",
          variables: [
            { symbol: "Q_1", meaning: "First quartile (25th percentile)" },
            { symbol: "Q_3", meaning: "Third quartile (75th percentile)" },
            { symbol: "\\text{IQR}", meaning: "Interquartile Range: Q3 - Q1" },
            {
              symbol: "1.5",
              meaning:
                "Tukey's standard multiplier for moderate outliers (3.0 for extreme outliers)",
            },
          ],
          intuition:
            "1.5 × IQR corresponds to roughly 2.7 standard deviations away from the mean in a normal distribution. Points beyond this threshold represent the outer 0.7% tail.",
          exampleCalculation: {
            given:
              "Sample of athlete recovery times (hours) with Q1 = 20, Q3 = 36, and values [12, 19, 21, 24, 28, 32, 35, 42, 68].",
            steps: [
              "Step 1: Compute IQR: IQR = Q3 - Q1 = 36 - 20 = 16 hours.",
              "Step 2: Compute 1.5 × IQR: 1.5 × 16 = 24 hours.",
              "Step 3: Calculate Lower Fence: 20 - 24 = -4 hours. (Since min is 12, lower whisker ends at 12).",
              "Step 4: Calculate Upper Fence: 36 + 24 = 60 hours.",
              "Step 5: Identify Upper Whisker End: Largest value ≤ 60 is 42 hours.",
              "Step 6: Identify Outliers: 68 > 60 hours. Value 68 is an outlier!",
            ],
            result: "Box: [20, 36], Whiskers: [12, 42], Outlier: [68]",
            interpretation:
              "The whisker stops at 42 (the actual data point), and 68 is marked as a distinct outlier point.",
          },
        },
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: Recreating the Hen & Eggs Boxplot",
        content: [
          "Let's recreate Dr. Seltman's Hen & Eggs analysis in Python using Matplotlib and Pandas:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd

# Seltman's Hen & Eggs dataset
egg_data = pd.Series([3, 4, 4, 3, 5, 4, 4, 5, 4, 3, 4, 4, 5, 4, 9], name="Eggs")

# Calculate Five-Number Summary & Fences
q1 = egg_data.quantile(0.25)
med = egg_data.median()
q3 = egg_data.quantile(0.75)
iqr = q3 - q1
upper_fence = q3 + 1.5 * iqr
lower_fence = q1 - 1.5 * iqr

# Determine whisker endpoints (actual data points inside fences)
valid_data = egg_data[(egg_data >= lower_fence) & (egg_data <= upper_fence)]
whisker_low = valid_data.min()
whisker_high = valid_data.max()

# Identify outliers
outliers = egg_data[egg_data > upper_fence].tolist()

print("=== Hen & Eggs Boxplot Diagnostics ===")
print(f"Sample Size (n):    {len(egg_data)}")
print(f"Q1 (25th):          {q1}")
print(f"Median (50th):      {med}  (Notice Q1 == Median!)")
print(f"Q3 (75th):          {q3}")
print(f"IQR:                {iqr}")
print(f"Upper Fence:        {upper_fence}")
print(f"Lower Whisker End:  {whisker_low}")
print(f"Upper Whisker End:  {whisker_high}")
print(f"Detected Outliers:  {outliers} (Day with {outliers[0]} eggs)")`,
          output: `=== Hen & Eggs Boxplot Diagnostics ===
Sample Size (n):    15
Q1 (25th):          4.0
Median (50th):      4.0  (Notice Q1 == Median!)
Q3 (75th):          5.0
IQR:                1.0
Upper Fence:        6.5
Lower Whisker End:  3
Upper Whisker End:  5
Detected Outliers:  [9] (Day with 9 eggs)`,
          explanation:
            "The calculation confirms that the upper whisker ends at 5, and the value 9 sits well beyond the 6.5 fence as an authentic outlier.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "6. Common Beginner Mistakes",
        content: ["Avoid these critical boxplot traps:"],
        mistakes: [
          "Extending Whiskers to the Fences: Whiskers NEVER extend to the theoretical fences (Q1 - 1.5*IQR). They stop at the most extreme ACTUAL observation inside the fences.",
          "Assuming Outliers Are Always Errors: In a sample of 2,000 normal observations, approximately 14 outliers will appear simply due to normal Gaussian probability (the 0.70% rule).",
          "Using Boxplots on Bimodal Data: A boxplot cannot show bimodality! Two distinct peaks appear as a single broad box with the median in the middle. Always pair boxplots with histograms or violin plots.",
          "Ignoring the Median Offset: If the median line is closer to the bottom of the box (Q1) and the upper whisker is longer, the data is right-skewed. If it sits near Q3, the data is left-skewed.",
        ],
      },
    ],
    quiz: {
      question:
        "According to Dr. Seltman, approximately what percentage of observations will be flagged as outliers by Tukey's 1.5×IQR rule in a sample drawn from a purely normal distribution?",
      options: [
        "Approximately 0.70% (about 7 per 1,000 observations)",
        "Exactly 5.0% (50 per 1,000 observations)",
        "0.0% (a normal distribution never produces boxplot outliers)",
        "15.0% (because 1.5 × 10 = 15)",
      ],
      correctIndex: 0,
      explanation:
        "In a Gaussian distribution, the area beyond Q3 + 1.5*IQR and below Q1 - 1.5*IQR is approximately 0.0070 (0.70%). In large datasets, seeing some outliers is an expected statistical reality, not automatic proof of bad data.",
    },
    takeaways: [
      "A boxplot displays the five-number summary: Min, Q1, Median, Q3, and Max (inside fences).",
      "Whiskers extend only to the most extreme actual data points inside the 1.5 × IQR fences.",
      "In normal data, ~0.70% of observations naturally fall beyond the fences as expected outliers.",
      "Boxplots are compact and robust against outliers, but cannot display bimodality.",
    ],
  },
  {
    id: "quantile-normal-plots",
    slug: "quantile-normal-plots",
    moduleId: "univariate-graphical",
    order: 4,
    globalOrder: 12,
    title: "Quantile-Normal (Q-Q) Plots: Diagnosing Distributional Departures",
    subtitle: "Construction, Theoretical Quantiles & Seltman's Visual Violation Catalog",
    estimatedMinutes: 14,
    summary:
      "Master the construction and interpretation of Quantile-Normal (Q-Q) plots, understand equal-probability bell curve zones, and diagnose skewness, heavy tails, bimodality, and discrete ties.",
    prerequisites: ["boxplots-outliers", "skewness-and-kurtosis"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Gold Standard Normality Check",
        content: [
          "Most classical inferential procedures—including Student's t-tests, Analysis of Variance (ANOVA), and Ordinary Least Squares (OLS) regression—assume that the underlying data (or the error residuals) follow a Gaussian (normal) distribution.",
          "Histograms can be deceptive due to binning choices, and formal statistical tests like Shapiro-Wilk often fail: they reject normality in large samples for trivial, harmless deviations, while failing to detect dangerous non-normality in small samples.",
          "The Quantile-Normal Plot (often called a Normal Probability Plot or Q-Q Plot) is the gold standard diagnostic tool for assessing whether data conforms to a theoretical bell curve.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. How a Quantile-Normal Plot Is Constructed",
        content: [
          "Dr. Seltman explains the conceptual construction of a Q-Q plot through equal-probability zones:",
        ],
        steps: [
          "Step 1: Sort Sample Values: Arrange your n sample observations in ascending order: x_(1) ≤ x_(2) ≤ ... ≤ x_(n).",
          "Step 2: Partition the Bell Curve: Divide the theoretical standard normal distribution N(0, 1) into n equal-probability zones (or slices), each having area 1/n.",
          "Step 3: Determine Expected Normal Quantiles (z_i): Find the center (median or mean) of each equal-probability zone along the horizontal z-axis.",
          "Step 4: Pair and Plot: Plot each theoretical z-quantile on the horizontal axis against the corresponding observed sample value x_(i) on the vertical axis.",
          "Step 5: Reference Line: Draw the straight reference line representing y = x̄ + s · z. If the sample comes from a normal distribution, the points will form a clean, tight straight line.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman (Carnegie Mellon University)",
          message:
            "A quantile-normal plot is far more sensitive to distributional departures than a histogram. The human eye is exceptionally skilled at detecting departures from a straight line. By learning the characteristic visual signatures of various distributional shapes, you can immediately identify skewness, tail thickness, bimodality, and discrete data.",
        },
      },
      {
        id: "visual-violation-catalog",
        title: "3. Dr. Seltman's Visual Catalog of Q-Q Plot Signatures",
        content: [
          "In Section 4.3.4, Dr. Seltman provides an indispensable visual catalog for decoding Q-Q plot patterns:",
        ],
        table: {
          caption: "Diagnostic Signatures on Quantile-Normal Plots (Dr. Seltman, pp. 81–84)",
          headers: [
            "Distributional Reality",
            "Visual Pattern on Q-Q Plot",
            "Physical Meaning & Diagnostic Action",
          ],
          rows: [
            [
              "Ideal Normality",
              "Points fall tightly along the straight reference line",
              "Assumptions fully met; parametric tests (t-test, ANOVA) are valid.",
            ],
            [
              "Right-Skewed (Positive Skew)",
              "Upward curving concave shape ('U-shape')",
              "Points on the right shoot far above the line (heavy right tail), while left points stay high. Consider a logarithmic or square-root transformation.",
            ],
            [
              "Left-Skewed (Negative Skew)",
              "Downward curving convex shape ('Inverted U')",
              "Points on the left drop far below the line (heavy left tail). Consider squaring or power transformation.",
            ],
            [
              "Fat Tails (Heavy Tails / Leptokurtic)",
              "S-shaped curve (low values too low, high values too high)",
              "Extremes deviate outward in both directions. Standard errors are vulnerable to outlier inflation; consider robust regression.",
            ],
            [
              "Thin Tails (Light Tails / Platykurtic)",
              "Inverted S-shaped curve (extremes curl inward toward center)",
              "Data is bounded or uniform (e.g. truncated test scores between 0 and 100).",
            ],
            [
              "Discrete Data / Ties",
              "Horizontal staircase or step-like bands of identical y-values",
              "Data consists of rounded integers or rating scales. Normality assumption is technically violated, but may be acceptable if bands are tight.",
            ],
            [
              "Single Severe Outlier",
              "A straight line for 99% of points, with one isolated point flying far off the line at either end",
              "Data entry mistake or genuine anomalous event. Investigate that specific observation.",
            ],
            [
              "Bimodality",
              "Two distinct steep linear segments connected by an abrupt plateau or shift in the middle",
              "Mixture of two distinct subpopulations. Split the data by the underlying grouping variable.",
            ],
          ],
        },
      },
      {
        id: "mathematical-explanation",
        title: "4. Mathematical Formulation: Plotting Positions",
        content: [
          "To compute the theoretical quantiles z_i without encountering division by zero at the extremes, standard plotting position formulas are used:",
        ],
        formula: {
          title: "Theoretical Quantile Plotting Position (Blom's Formula)",
          displayFormula: "p_i = \\frac{i - 3/8}{n + 1/4}, \\quad z_i = \\Phi^{-1}(p_i)",
          variables: [
            { symbol: "i", meaning: "Rank of the observation (from 1 to n)" },
            { symbol: "n", meaning: "Total sample size" },
            { symbol: "p_i", meaning: "Cumulative probability assigned to observation i" },
            {
              symbol: "\\Phi^{-1}",
              meaning:
                "Inverse standard normal cumulative distribution function (quantile function)",
            },
            { symbol: "z_i", meaning: "Expected standard normal score for rank i" },
          ],
          intuition:
            "Subtracting 3/8 from i and adding 1/4 to n ensures that p_1 > 0 and p_n < 1, so the inverse normal function produces finite, symmetrical z-scores.",
          exampleCalculation: {
            given: "Sample of n = 5 values: [10, 14, 15, 17, 24].",
            steps: [
              "Step 1: Compute Blom probabilities for n = 5: p_i = (i - 0.375) / 5.25.",
              "Step 2: i = 1: p_1 = (1 - 0.375) / 5.25 = 0.1190 -> z_1 = Φ^(-1)(0.1190) ≈ -1.18.",
              "Step 3: i = 2: p_2 = (2 - 0.375) / 5.25 = 0.3095 -> z_2 = Φ^(-1)(0.3095) ≈ -0.50.",
              "Step 4: i = 3: p_3 = (3 - 0.375) / 5.25 = 0.5000 -> z_3 = Φ^(-1)(0.5000) = 0.00.",
              "Step 5: i = 4: p_4 = (4 - 0.375) / 5.25 = 0.6905 -> z_4 = Φ^(-1)(0.6905) ≈ +0.50.",
              "Step 6: i = 5: p_5 = (5 - 0.375) / 5.25 = 0.8810 -> z_5 = Φ^(-1)(0.8810) ≈ +1.18.",
            ],
            result: "Theoretical z: [-1.18, -0.50, 0.00, +0.50, +1.18]",
            interpretation:
              "Plotting [-1.18, -0.50, 0, 0.50, 1.18] against [10, 14, 15, 17, 24] forms the 5-point Q-Q plot.",
          },
        },
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: Generating Q-Q Plots with SciPy",
        content: [
          "Here is how you compute and evaluate Quantile-Normal plots programmatically in Python:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
from scipy import stats

# 1. Generate right-skewed data (e.g. exponential distribution)
np.random.seed(42)
skewed_data = np.random.exponential(scale=10, size=100)

# 2. Compute theoretical quantiles and ordered sample values using SciPy
(osm, osr), (slope, intercept, r) = stats.probplot(skewed_data, dist="norm")

print("=== Quantile-Normal (Q-Q) Plot Analysis ===")
print(f"Sample Size n:             {len(skewed_data)}")
print(f"Fit Correlation (R):       {r:.4f}")
print(f"Reference Line Slope:      {slope:.2f}")
print(f"Reference Line Intercept:  {intercept:.2f}")

# Inspect the 3 lowest and 3 highest points vs theoretical normal z
print("\\n--- Lowest 3 Points (Left Tail) ---")
for i in range(3):
    print(f"  Observed: {osr[i]:6.2f} | Theoretical z: {osm[i]:+5.2f}")

print("\\n--- Highest 3 Points (Right Tail) ---")
for i in range(-3, 0):
    print(f"  Observed: {osr[i]:6.2f} | Theoretical z: {osm[i]:+5.2f}")`,
          output: `=== Quantile-Normal (Q-Q) Plot Analysis ===
Sample Size n:             100
Fit Correlation (R):       0.8974
Reference Line Slope:      8.86
Reference Line Intercept:  9.68

--- Lowest 3 Points (Left Tail) ---
  Observed:   0.06 | Theoretical z: -2.58
  Observed:   0.08 | Theoretical z: -2.17
  Observed:   0.21 | Theoretical z: -1.91

--- Highest 3 Points (Right Tail) ---
  Observed:  37.76 | Theoretical z: +1.91
  Observed:  39.52 | Theoretical z: +2.17
  Observed:  49.63 | Theoretical z: +2.58`,
          explanation:
            "Notice how the correlation coefficient R drops to 0.8974. The highest point (49.63) shoots dramatically above the line predicted by slope*z + intercept (8.86 * 2.58 + 9.68 ≈ 32.5), producing the classic upward curving right-skew pattern.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "6. Common Beginner Mistakes",
        content: ["Avoid these common Q-Q plot misinterpretations:"],
        mistakes: [
          "Over-interpreting Wiggle in the Tail: Even in a purely Gaussian distribution, the points at the far ends (beyond |z| > 2) will naturally wiggle slightly due to sampling variation. Focus on whether the center (middle 80%) is straight and whether deviations follow a systematic curve.",
          "Confusing Axes: Some software places theoretical quantiles on the x-axis, while other software places observed data on the x-axis. Always verify which axis is which, as an inverted plot turns a U-shape into an inverted U-shape!",
          "Using Formal Normality Tests Alone: Tests like Shapiro-Wilk return p < 0.001 on huge samples even when deviations from normality are scientifically negligible. Always look at the Q-Q plot.",
          "Ignoring Discrete Bands: If your Q-Q plot looks like a staircase, your variable is discrete or heavily rounded. Do not treat it as continuous without careful consideration.",
        ],
      },
    ],
    quiz: {
      question:
        "On a standard Quantile-Normal (Q-Q) plot where theoretical normal z-scores are on the horizontal axis and sample values are on the vertical axis, what visual pattern indicates positive (right) skewness?",
      options: [
        "An upward-curving, concave shape ('U-shape') where right-tail values rise far above the reference line.",
        "A downward-curving, convex shape ('Inverted U') where left-tail values plunge below the line.",
        "A horizontal straight line.",
        "A tight diagonal straight line passing through all points.",
      ],
      correctIndex: 0,
      explanation:
        "In right-skewed data, high values are much larger than expected under a normal distribution, causing the points in the right tail to curve sharply upwards above the straight reference line, creating a distinctive U-shape.",
    },
    takeaways: [
      "The Quantile-Normal plot is the premier visual tool for testing Gaussian distribution assumptions.",
      "A straight line confirms normality; systematic curves diagnose specific violations.",
      "U-shape curves indicate right-skew; inverted U-shape curves indicate left-skew.",
      "S-shapes reveal heavy tails (leptokurtic); horizontal bands expose discrete data ties.",
    ],
  },
];
