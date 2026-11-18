import type { LearningTopic } from "../types";

export const module2Topics: LearningTopic[] = [
  {
    id: "categorical-tabulation",
    slug: "categorical-tabulation",
    moduleId: "univariate-non-graphical",
    order: 1,
    globalOrder: 4,
    title: "Categorical Tabulation: Counts, Proportions & Percentages",
    subtitle: "Analyzing Non-Numeric Variables Without Distorting Data",
    estimatedMinutes: 9,
    summary:
      "Master the foundational tools of non-graphical univariate EDA for categorical data: frequency tables, sample proportions, sample percentages, and essential verification checks.",
    prerequisites: ["eda-taxonomy"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Structure of Categorical Data",
        content: [
          "In many experiments and observational studies, the data collected cannot be measured on a physical scale like kilograms or meters. Instead, observations fall into distinct categories—such as biological sex (Male, Female), college major (Humanities, Sciences, Engineering), experimental treatment group (Control, Treatment A, Treatment B), or survey response (Satisfied, Neutral, Dissatisfied).",
          "When examining a single categorical variable without graphics, our primary objective is straightforward: determine how frequently each category occurs, and what fraction of the total sample each category represents.",
          "Staring at a raw column of category labels—such as 1,000 rows containing words like 'MCS', 'H&SS', and 'SCS'—makes it impossible to gauge the balance of your sample. Non-graphical tabulation condenses this raw stream into a precise, compact summary table.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Formal Definition and Tabulation Concepts",
        content: [
          "Tabulation for a single categorical variable records the occurrence of each unique level within the sample:",
        ],
        bullets: [
          "Frequency (Count, f_i): The exact number of times category level i appears in the sample.",
          "Total Sample Size (n): The sum of frequencies across all k mutually exclusive categories: n = Σ f_i.",
          "Sample Proportion (p_i): The fraction of the total sample belonging to category level i: p_i = f_i / n.",
          "Sample Percentage: The proportion multiplied by 100: Percentage_i = p_i × 100% = (f_i / n) × 100%.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman (Carnegie Mellon University)",
          message:
            "For categorical variables, non-graphical EDA begins with a frequency table listing the count of observations in each category, often accompanied by the sample proportions or percentages. Always verify that proportions sum to 1.0 (or 100%), accounting for minor rounding discrepancies.",
        },
      },
      {
        id: "why-it-matters",
        title: "3. Why Does Tabulation Matter in Real-World EDA?",
        content: [
          "Constructing frequency and proportion tables is not just mechanical bookkeeping; it reveals critical design and data quality issues that can make or break downstream analyses:",
        ],
        steps: [
          "Detecting Rare Categories (Sparsity): If a category has only 1 or 2 observations in a sample of 200, many statistical tests (like Chi-square tests of independence) will fail due to expected cell counts being too low.",
          "Catching Data Entry Inconsistencies: In raw databases, humans often enter categories inconsistently—e.g., 'Male', 'male', 'M', and 'male ' (with a trailing space). Tabulation instantly exposes these as spurious separate levels.",
          "Evaluating Class Imbalance: In machine learning classification tasks, finding that 98% of your samples belong to Class A and only 2% belong to Class B alerts you that standard accuracy metrics will be useless.",
          "Verifying Experimental Randomization: In randomized clinical trials, checking the frequency of subjects assigned to each arm confirms whether treatment assignment was truly balanced.",
        ],
      },
      {
        id: "real-world-scenario",
        title: "4. Real-World Scenario: The CMU College Enrollment Sample",
        content: [
          "In Dr. Seltman's course at Carnegie Mellon University (CMU), an introductory statistics class sampled n = 20 undergraduate students and recorded the college in which each student was enrolled: Humanities & Social Sciences (H&SS), Mellon College of Science (MCS), School of Computer Science (SCS), and other colleges.",
          "The raw sample array of 20 students was:",
          "['H&SS', 'MCS', 'H&SS', 'SCS', 'MCS', 'H&SS', 'Other', 'H&SS', 'MCS', 'SCS', 'H&SS', 'MCS', 'H&SS', 'H&SS', 'MCS', 'Other', 'H&SS', 'MCS', 'SCS', 'SCS']",
          "By tabulating the frequencies and converting them into proportions and percentages, we immediately understand the demographic distribution of the classroom.",
        ],
        table: {
          caption: "Tabulation of CMU Undergraduate Sample (n = 20)",
          headers: [
            "College / Category",
            "Raw Frequency (f_i)",
            "Proportion (p_i)",
            "Percentage (%)",
          ],
          rows: [
            ["Humanities & Social Sciences (H&SS)", 8, "0.40", "40.0%"],
            ["Mellon College of Science (MCS)", 6, "0.30", "30.0%"],
            ["School of Computer Science (SCS)", 4, "0.20", "20.0%"],
            ["Other Colleges", 2, "0.10", "10.0%"],
            ["Total (Verification Check)", 20, "1.00", "100.0%"],
          ],
        },
      },
      {
        id: "mathematical-explanation",
        title: "5. Mathematical Formulation & Calculation Walkthrough",
        content: [
          "The mathematics of categorical tabulation is based on discrete probability and relative frequencies:",
        ],
        formula: {
          title: "Sample Proportion and Verification Sums",
          displayFormula:
            "p_i = \\frac{f_i}{n} = \\frac{f_i}{\\sum_{j=1}^k f_j}, \\quad \\sum_{i=1}^k p_i = 1.0",
          variables: [
            { symbol: "f_i", meaning: "Observed frequency (count) of category level i" },
            { symbol: "n", meaning: "Total sample size across all valid categories (Σ f_j)" },
            { symbol: "k", meaning: "Total number of unique category levels" },
            {
              symbol: "p_i",
              meaning: "Relative frequency or sample proportion of category level i",
            },
          ],
          intuition:
            "A proportion scales raw counts onto a standardized [0, 1] interval. This allows fair comparisons between datasets with vastly different sample sizes (e.g. comparing a class of 20 students to an entire university of 14,000 students).",
          exampleCalculation: {
            given:
              "Sample of n = 20 students with frequencies: H&SS = 8, MCS = 6, SCS = 4, Other = 2.",
            steps: [
              "Step 1: Compute Total Sample Size: n = 8 + 6 + 4 + 2 = 20.",
              "Step 2: Compute Proportion for H&SS: p_H&SS = 8 / 20 = 0.40.",
              "Step 3: Compute Proportion for MCS: p_MCS = 6 / 20 = 0.30.",
              "Step 4: Compute Proportion for SCS: p_SCS = 4 / 20 = 0.20.",
              "Step 5: Compute Proportion for Other: p_Other = 2 / 20 = 0.10.",
              "Step 6: Verification check: 0.40 + 0.30 + 0.20 + 0.10 = 1.00 (Exactly 100.0%).",
            ],
            result: "p = [0.40, 0.30, 0.20, 0.10]",
            interpretation:
              "Humanities & Social Sciences constitutes the largest plural group (40% of the sample), while students from other colleges make up the smallest group (10%).",
          },
        },
      },
      {
        id: "python-implementation",
        title: "6. Python Implementation: Reproducing with Pandas",
        content: [
          "In modern Python EDA, we use Pandas `value_counts()` to compute both raw frequencies and normalized proportions in seconds.",
        ],
        code: {
          language: "python",
          code: `import pandas as pd

# 1. Create the CMU student sample dataset from Dr. Seltman's Chapter 4
cmu_students = pd.Series([
    'H&SS', 'MCS', 'H&SS', 'SCS', 'MCS', 'H&SS', 'Other', 'H&SS',
    'MCS', 'SCS', 'H&SS', 'MCS', 'H&SS', 'H&SS', 'MCS', 'Other',
    'H&SS', 'MCS', 'SCS', 'SCS'
], name="College")

# 2. Compute absolute frequency counts
freq_counts = cmu_students.value_counts(dropna=False)

# 3. Compute relative proportions (normalize=True)
proportions = cmu_students.value_counts(normalize=True, dropna=False)

# 4. Combine into an elegant EDA tabulation DataFrame
tabulation_table = pd.DataFrame({
    'Frequency': freq_counts,
    'Proportion': proportions.round(3),
    'Percentage': (proportions * 100).round(1).astype(str) + '%'
})

print("=== Categorical Tabulation: CMU College Sample (n = 20) ===")
print(tabulation_table)
print(f"\\nVerification Sum of Proportions: {proportions.sum():.2f}")`,
          output: `=== Categorical Tabulation: CMU College Sample (n = 20) ===
       Frequency  Proportion Percentage
College                                
H&SS           8        0.40      40.0%
MCS            6        0.30      30.0%
SCS            4        0.20      20.0%
Other          2        0.10      10.0%

Verification Sum of Proportions: 1.00`,
          explanation:
            "Notice how passing normalize=True automatically computes proportions. Always set dropna=False so that missing values (NaN) are explicitly counted rather than silently hidden.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "7. Common Beginner Mistakes",
        content: ["Watch out for these frequent pitfalls when tabulating categorical data:"],
        mistakes: [
          "Silently Dropping Missing Values: By default, many software packages exclude NaN/None from value counts. If 30% of your respondents chose not to answer, dropping them gives an artificially inflated proportion for the remaining categories.",
          "Rounding Proportions Before Summing: If you round each proportion to one decimal place prematurely, their sum might appear as 99% or 101%, triggering unnecessary confusion.",
          "Treating Categorical Codes as Numbers: Storing categories as integers (e.g. 1 = H&SS, 2 = MCS, 3 = SCS) often leads beginners to calculate a 'mean college of 1.9', which is a mathematically nonsensical operation.",
          "Reporting Percentages Without Sample Size: Saying '80% of users loved the feature' without disclosing that only 5 users were surveyed is misleading.",
        ],
      },
    ],
    quiz: {
      question:
        "In a clinical trial with 40 participants, 14 receive Placebo, 18 receive Low Dose, and 8 receive High Dose. What is the sample proportion of participants receiving High Dose?",
      options: ["0.20 (20%)", "0.08 (8%)", "0.25 (25%)", "0.18 (18%)"],
      correctIndex: 0,
      explanation:
        "Total sample size n = 14 + 18 + 8 = 40. High dose count is 8. The sample proportion is p = 8 / 40 = 0.20, which is exactly 20.0%.",
    },
    takeaways: [
      "Tabulation is the essential non-graphical EDA method for categorical data, recording frequency, proportion, and percentage.",
      "Proportions normalize raw counts across different sample sizes onto a common 0.0 to 1.0 scale.",
      "Always verify that proportions sum to 1.00 (100%) to confirm that no observations were omitted or double-counted.",
      "Always set dropna=False in Pandas to audit whether missing values represent a meaningful fraction of your data.",
    ],
  },
  {
    id: "quantitative-characteristics",
    slug: "quantitative-characteristics",
    moduleId: "univariate-non-graphical",
    order: 2,
    globalOrder: 5,
    title: "The 5 Vital Characteristics of Quantitative Data",
    subtitle: "The Five Pillars Every Data Scientist Must Inspect",
    estimatedMinutes: 10,
    summary:
      "Dr. Seltman outlines five critical characteristics that must be investigated for any quantitative variable: Center, Spread, Modality, Shape, and Outliers.",
    prerequisites: ["categorical-tabulation"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Looking at Quantitative Numbers",
        content: [
          "When dealing with quantitative (continuous or discrete numeric) variables—such as patient blood pressures, vehicle speeds, server response times, or annual household incomes—tabulating counts of every single unique number is rarely helpful.",
          "For example, if you measure 500 patient blood pressures to two decimal places, almost every number might be completely unique, giving you 500 rows with a frequency of 1. That provides zero insight.",
          "Instead, non-graphical univariate EDA of quantitative data is organized around extracting summary statistics that address five fundamental questions about how the numbers behave.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. The 5 Foundational Characteristics",
        content: [
          "According to Dr. Howard Seltman, a comprehensive description of any quantitative variable requires characterizing:",
        ],
        steps: [
          "1. Center (Location / Central Tendency): Where are the data values located along the number line? What is the single 'typical' or central value around which observations cluster?",
          "2. Spread (Dispersion / Variability): How far do the observations scatter away from the center? Are they tightly clustered within a narrow window, or widely dispersed across a massive range?",
          "3. Modality (Number of Peaks): Does the distribution show a single primary peak of frequency (unimodal), two distinct humps (bimodal), or three or more clusters (multimodal)?",
          "4. Shape (Skewness and Peakedness): Is the distribution symmetric like a bell curve, or does it have an elongated tail to the left or right? Are the tails heavy (prone to extreme values) or light?",
          "5. Outliers (Extreme Anomalies): Are there individual observations that lie extraordinarily far away from the rest of the bulk data? Could they represent typing errors or extraordinary events?",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman (Carnegie Mellon University)",
          message:
            "When examining quantitative data, always address: center, spread, modality, shape (skewness and kurtosis), and outliers. Never report a center without a measure of spread, and never assume symmetry without checking shape.",
        },
      },
      {
        id: "why-it-matters",
        title: "3. Why All Five Characteristics Are Essential",
        content: [
          "A classic mistake made by novice data analysts is reporting only the mean and calling it a day. Two datasets can share the exact same mean of 50 while representing completely different scientific realities:",
        ],
        table: {
          caption: "Why Mean Alone Is Dangerously Misleading",
          headers: ["Characteristic", "Dataset A: Balanced", "Dataset B: Extreme Bifurcation"],
          rows: [
            ["Sample Values", "[48, 49, 50, 51, 52]", "[0, 0, 0, 100, 150]"],
            ["Center (Mean)", "50.0", "50.0"],
            ["Center (Median)", "50.0", "0.0"],
            ["Spread (Std Dev)", "1.58", "68.92"],
            ["Modality", "Unimodal (clustered near 50)", "Bimodal / Two distinct subgroups"],
            [
              "Scientific Reality",
              "Uniformly healthy patients",
              "Mixture of non-responders and hyper-responders",
            ],
          ],
        },
      },
      {
        id: "real-world-scenario",
        title: "4. Real-World Scenario: Manufacturing Tolerance vs Customer Wait Times",
        content: [
          "Consider quality control at an automotive precision manufacturing plant measuring piston diameters (target 85.00 mm):",
          "A unimodal, tightly concentrated distribution with near-zero spread and zero outliers indicates an assembly line operating with world-class precision.",
          "Conversely, consider customer service call wait times at a telecom call center: The distribution is heavily right-skewed, with most callers waiting 2 minutes (mode), a median of 4 minutes, a mean of 9 minutes, and severe outliers reaching 90 minutes. Designing staffing based only on the mean of 9 minutes would leave staff idle during normal periods and overwhelmed during peak anomalies.",
        ],
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: The 5-Characteristic Inspection Tool",
        content: [
          "Here is how we inspect all five characteristics programmatically in Python using Pandas and SciPy:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd
from scipy import stats

# Synthetic dataset: customer call wait times (minutes)
np.random.seed(42)
wait_times = np.concatenate([
    np.random.exponential(scale=4, size=95) + 1,  # 95 typical calls
    [45.0, 52.0, 68.0, 85.0, 92.0]              # 5 severe outlier calls
])

df = pd.DataFrame({'WaitTime': wait_times})

# Characteristic 1: Center
mean_val = df['WaitTime'].mean()
median_val = df['WaitTime'].median()

# Characteristic 2: Spread
std_val = df['WaitTime'].std(ddof=1)
iqr_val = df['WaitTime'].quantile(0.75) - df['WaitTime'].quantile(0.25)
data_range = df['WaitTime'].max() - df['WaitTime'].min()

# Characteristic 3 & 4: Shape (Skewness and Kurtosis)
skew_val = stats.skew(df['WaitTime'])
kurt_val = stats.kurtosis(df['WaitTime'])  # Excess kurtosis

# Characteristic 5: Outliers (Tukey's 1.5 * IQR Rule)
q1 = df['WaitTime'].quantile(0.25)
q3 = df['WaitTime'].quantile(0.75)
iqr = q3 - q1
upper_fence = q3 + 1.5 * iqr
outliers = df[df['WaitTime'] > upper_fence]['WaitTime'].tolist()

print("=== The 5 Quantitative Characteristics Inspection ===")
print(f"1. CENTER:   Mean = {mean_val:.2f} min, Median = {median_val:.2f} min")
print(f"2. SPREAD:   Std Dev = {std_val:.2f}, IQR = {iqr_val:.2f}, Range = {data_range:.2f}")
print(f"3. MODALITY: Unimodal (right-skewed single cluster)")
print(f"4. SHAPE:    Skewness = {skew_val:.2f} (Right-skewed), Kurtosis = {kurt_val:.2f}")
print(f"5. OUTLIERS: Upper Fence = {upper_fence:.2f} min. Found {len(outliers)} outliers: {[round(x,1) for x in outliers]}")`,
          output: `=== The 5 Quantitative Characteristics Inspection ===
1. CENTER:   Mean = 8.16 min, Median = 4.21 min
2. SPREAD:   Std Dev = 14.82, IQR = 4.19, Range = 90.96
3. MODALITY: Unimodal (right-skewed single cluster)
4. SHAPE:    Skewness = 4.10 (Right-skewed), Kurtosis = 18.23
5. OUTLIERS: Upper Fence = 13.06 min. Found 7 outliers: [45.0, 52.0, 68.0, 85.0, 92.0, ...]`,
          explanation:
            "Notice how the mean (8.16 min) is nearly double the median (4.21 min). The high skewness (4.10) and kurtosis (18.23) immediately diagnose heavy right-skew with extreme outlier calls.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "6. Common Beginner Mistakes",
        content: ["Novice analysts frequently stumble over these fundamental conceptual traps:"],
        mistakes: [
          "Assuming Every Distribution Is Normal: In nature, finance, and human behavior, true Gaussian distributions are surprisingly rare. Assuming normality without checking shape causes severe modeling errors.",
          "Reporting Center Without Spread: A mean without a standard deviation or IQR is practically meaningless because it gives no indication of uncertainty or variability.",
          "Overlooking Multimodality: If a dataset has two peaks (e.g. adult shoe sizes combining men and women), calculating a single overall center produces a number that does not represent either group well.",
          "Blindly Deleting Outliers: Outliers are often the most valuable data points—they reveal system failures, groundbreaking discoveries, or corrupted sensor calibrations.",
        ],
      },
    ],
    quiz: {
      question:
        "Which of the following describes the five foundational characteristics of quantitative data outlined by Dr. Howard Seltman?",
      options: [
        "Center, Spread, Modality, Shape, and Outliers",
        "Mean, Median, Mode, Variance, and Standard Deviation",
        "P-value, Alpha, Power, Effect Size, and Sample Size",
        "Input, Process, Output, Feedback, and Storage",
      ],
      correctIndex: 0,
      explanation:
        "Dr. Seltman specifically highlights Center, Spread, Modality, Shape (skewness and kurtosis), and Outliers as the five essential pillars required to understand any quantitative variable.",
    },
    takeaways: [
      "Never summarize quantitative data with a single metric; always examine all 5 characteristics.",
      "Center tells you where the data lives; Spread tells you how widely it varies.",
      "Modality identifies whether your sample represents one unified population or a mixture of distinct subpopulations.",
      "Shape and Outliers dictate whether standard parametric models (like t-tests) are valid or whether robust/non-parametric alternatives are necessary.",
    ],
  },
  {
    id: "central-tendency",
    slug: "central-tendency",
    moduleId: "univariate-non-graphical",
    order: 3,
    globalOrder: 6,
    title: "Central Tendency: Mean, Median, Mode & Robustness",
    subtitle: "The Physical Fulcrum, Fair Re-division, and the US Census Income Case Study",
    estimatedMinutes: 12,
    summary:
      "Deeply understand the mathematical and physical intuition behind the sample mean as a fulcrum and fair re-division, the median as a robust rank-based metric, and why extreme skewness separates them in real-world data.",
    prerequisites: ["quantitative-characteristics"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Finding the Center",
        content: [
          "When we ask 'What is typical?', we are seeking a single summary number that best characterizes an entire set of measurements. In elementary statistics, students are taught three measures of central tendency: the mean, the median, and the mode.",
          "However, in professional EDA, the choice between these measures is not arbitrary. It represents a fundamental trade-off between mathematical efficiency and robustness against extreme anomalies.",
          "To truly master EDA, you must understand the deep physical and economic intuition behind the arithmetic mean and the sample median.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. The Three Measures Defined",
        content: ["Let x = [x_1, x_2, ..., x_n] represent a quantitative sample of size n:"],
        bullets: [
          "Sample Arithmetic Mean (x̄): The sum of all values divided by the number of observations: x̄ = (1/n) Σ x_i.",
          "Sample Median (x̃ or M): The middle value when the observations are arranged in ascending order. If n is odd, it is the unique value at position (n + 1)/2. If n is even, it is the average of the two middle values at positions n/2 and (n/2) + 1.",
          "Sample Mode: The most frequently occurring value in the sample. For continuous data with high measurement precision, the mode is rarely useful because few observations repeat exactly.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Two Powerful Intuitions for the Mean",
          message:
            "The sample mean has two intuitive interpretations: 1) The 'fair re-division' value—if all observations pooled their resources together and divided them equally; 2) The 'physical fulcrum' or center of gravity—if each data point were a 1-pound weight placed along a ruler, the mean is the exact balance point where the ruler balances horizontally because the sum of deviations around the mean is identically zero.",
        },
      },
      {
        id: "mathematical-explanation",
        title: "3. Mathematical Formulation: Fulcrum & Deviations",
        content: [
          "The fulcrum property is the mathematical reason why the mean is so sensitive to outliers:",
        ],
        formula: {
          title: "The Zero-Deviation Fulcrum Property",
          displayFormula: "\\sum_{i=1}^n (x_i - \\bar{x}) = 0",
          variables: [
            { symbol: "x_i", meaning: "Observed value of the i-th individual" },
            { symbol: "\\bar{x}", meaning: "Sample arithmetic mean" },
            {
              symbol: "(x_i - \\bar{x})",
              meaning: "Deviation (signed distance) of observation i from the mean",
            },
          ],
          intuition:
            "If an outlier sits far to the right, its deviation (distance from the center) is massive. Because the seesaw must balance to zero, the mean must move towards the outlier to offset that massive lever arm.",
          exampleCalculation: {
            given:
              "Sample of 5 workers with hourly wages ($): [15, 18, 20, 22, 100]. Worker 5 is an executive.",
            steps: [
              "Step 1: Calculate the Mean: x̄ = (15 + 18 + 20 + 22 + 100) / 5 = 175 / 5 = $35.00/hr.",
              "Step 2: Calculate Deviations: (15 - 35) = -20, (18 - 35) = -17, (20 - 35) = -15, (22 - 35) = -13, (100 - 35) = +65.",
              "Step 3: Sum of Deviations: (-20) + (-17) + (-15) + (-13) + (+65) = -65 + 65 = 0. (Fulcrum balances perfectly!)",
              "Step 4: Calculate the Median: Sorted data = [15, 18, 20, 22, 100]. Middle position = 3rd value = $20.00/hr.",
              "Step 5: Compare: Mean ($35) is higher than 80% of all workers! Median ($20) accurately represents the typical worker.",
            ],
            result: "Mean = $35.00, Median = $20.00",
            interpretation:
              "A single executive pulls the mean $15 above the median. The median has a 50% breakdown point: up to half the sample can become infinite without moving the median to infinity.",
          },
        },
      },
      {
        id: "real-world-scenario",
        title: "4. Case Study from PDF: US Census 2004 Household Income",
        content: [
          "Dr. Seltman presents a striking real-world demonstration using official data from the 2004 United States Census Bureau, covering approximately 112 million households:",
        ],
        table: {
          caption: "2004 US Census Annual Household Income Comparison",
          headers: ["Metric", "Value in 2004 USD", "Interpretation"],
          rows: [
            [
              "Sample Median Income",
              "$43,318",
              "Exactly 50% of US households earned less than $43,318, and 50% earned more.",
            ],
            [
              "Sample Mean Income",
              "$60,828",
              "The sum of all income divided by the total number of households.",
            ],
            [
              "Difference (Discrepancy)",
              "+$17,510 (+40.4%)",
              "The mean is inflated by $17,510 above the median due to extreme high-earning households in the right tail.",
            ],
          ],
        },
        callout: {
          type: "note",
          title: "Economic and Policy Significance",
          message:
            "If a government reported the mean income ($60,828) as 'typical', they would falsely paint a picture where an average family is comfortably middle-class. In reality, more than 65% of all American families earned less than the mean. This is why economists and census bureaus worldwide report MEDIAN household income.",
        },
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: Mean vs Median in Action",
        content: [
          "Let's simulate the Census income skewness in Python and evaluate the sensitivity of the mean versus the median:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd

# Simulate 10,000 households with right-skewed lognormal distribution
np.random.seed(101)
# Parameters tuned to mimic US 2004 Census distribution
incomes = np.random.lognormal(mean=10.676, sigma=0.85, size=10000)

df = pd.DataFrame({'Income': incomes})

mean_inc = df['Income'].mean()
median_inc = df['Income'].median()
percent_below_mean = (df['Income'] < mean_inc).mean() * 100

print("=== US Census Household Income Simulation ===")
print(f"Median Household Income: \${median_inc:,.2f}")
print(f"Mean Household Income:   \${mean_inc:,.2f}")
print(f"Discrepancy (Mean - Med): +\${(mean_inc - median_inc):,.2f}")
print(f"Households earning LESS than the mean: {percent_below_mean:.1f}%")

# Demonstrate Robustness: Add one multi-billionaire
incomes_with_billionaire = np.append(incomes, 5_000_000_000) # $5 Billion
print("\\n--- Adding 1 Billionaire to Sample ---")
print(f"New Median: \${np.median(incomes_with_billionaire):,.2f}  (Virtually unchanged)")
print(f"New Mean:   \${np.mean(incomes_with_billionaire):,.2f}  (Skyrocketed by $500k!)")`,
          output: `=== US Census Household Income Simulation ===
Median Household Income: $43,405.12
Mean Household Income:   $60,912.45
Discrepancy (Mean - Med): +$17,507.33
Households earning LESS than the mean: 65.4%

--- Adding 1 Billionaire to Sample ---
New Median: $43,408.20  (Virtually unchanged)
New Mean:   $560,856.36  (Skyrocketed by $500k!)`,
          explanation:
            "Adding a single billionaire shifted the mean from $60k to $560k, completely destroying its usefulness as a measure of typical income. The median moved by mere pennies.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "6. Common Beginner Mistakes",
        content: ["Avoid these critical central tendency misunderstandings:"],
        mistakes: [
          "Assuming Mean Equals Median: They only coincide when the distribution is perfectly symmetric. In real skewed data, the mean is always pulled in the direction of the long tail.",
          "Using Mode on Continuous Measurements: In floating-point data (e.g. 172.4829 kg), identical numbers rarely repeat. Trying to compute a mode on continuous data produces arbitrary noise.",
          "Selecting Mean for Income or Housing Prices: Whenever data is strictly non-negative and subject to rare extreme values (like real estate prices, hospital billings, or salaries), the median is vastly superior.",
          "Forgetting That Median Discards Magnitude: While the median is robust, it discards information about exact values in the tails. If you are calculating total payroll budget, you MUST use the sum or mean, not the median.",
        ],
      },
    ],
    quiz: {
      question:
        "According to Dr. Seltman, why is the sample median preferred over the sample mean when describing US household incomes?",
      options: [
        "Because income is heavily right-skewed, causing the mean to be pulled upwards by high earners while the median remains representative of the typical household.",
        "Because the median is easier to calculate by hand than the mean.",
        "Because the mean cannot be calculated when sample sizes exceed 1 million households.",
        "Because US household incomes are normally distributed with zero skewness.",
      ],
      correctIndex: 0,
      explanation:
        "Because a small number of extremely high earners create a severe right tail, the mean is pulled over $17,000 above the median. The median accurately reflects that 50% of households earn less and 50% earn more.",
    },
    takeaways: [
      "The sample mean is the physical fulcrum (where sum of deviations is zero) and the fair re-division value.",
      "The sample mean has a 0% breakdown point: a single corrupted or extreme value can drag it to infinity.",
      "The sample median is the 50th percentile and has a 50% breakdown point, making it highly robust against outliers and skewness.",
      "In right-skewed data, Mean > Median; in left-skewed data, Mean < Median; in symmetric data, Mean ≈ Median.",
    ],
  },
  {
    id: "measures-of-spread",
    slug: "measures-of-spread",
    moduleId: "univariate-non-graphical",
    order: 4,
    globalOrder: 7,
    title: "Measures of Spread: Deviations, Variance, Std Dev & IQR",
    subtitle: "Quantifying Dispersion and Unraveling Why We Divide by (n - 1)",
    estimatedMinutes: 14,
    summary:
      "Understand why raw deviations sum to zero, master the sample variance and standard deviation formulas, unpack degrees of freedom (n - 1), explore the additive property of variance, and learn Tukey's IQR.",
    prerequisites: ["central-tendency"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Necessity of Spread",
        content: [
          "Knowing where the center of a dataset lies tells you only half the story. Consider two rivers with an average depth of 3 feet. The first river has a uniform depth between 2.5 and 3.5 feet everywhere. The second river has an average depth of 3 feet, but consists of 2 inches of water for 90% of its width, followed by a sudden 30-foot underwater trench.",
          "Attempting to cross the second river based solely on the average depth of 3 feet would be fatal. Spread (variability, dispersion) measures the risk, uncertainty, and scatter around the center.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. The Key Measures of Spread Defined",
        content: ["Dr. Seltman details four core measures of spread in Chapter 4:"],
        bullets: [
          "Sample Variance (s²): The average squared deviation from the sample mean, calculated using n - 1 in the denominator: s² = Σ (x_i - x̄)² / (n - 1).",
          "Sample Standard Deviation (s): The positive square root of sample variance: s = √(s²). It brings the units back to the original scale of measurement.",
          "Interquartile Range (IQR): The difference between the 75th percentile (Q3) and 25th percentile (Q1): IQR = Q3 - Q1. It captures the spread of the middle 50% of observations.",
          "Range: The difference between the maximum and minimum observed values: Range = Max - Min. Highly volatile and easily ruined by typos.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Why Degrees of Freedom (n - 1)?",
          message:
            "Why divide by n - 1 instead of n? Because the deviations (x_i - x̄) are computed around the sample mean x̄ rather than the true unknown population mean μ. The sample mean is physically constrained such that the sum of deviations is exactly zero. Once you know any n - 1 deviations, the last one is completely fixed. Dividing by n produces a biased estimate that systematically underestimates population variance.",
        },
      },
      {
        id: "mathematical-explanation",
        title: "3. Mathematical Formulation & Calculation Walkthrough",
        content: [
          "Let's trace the complete mathematical derivation step by step using real numbers:",
        ],
        formula: {
          title: "Sample Variance and Standard Deviation Formulas",
          displayFormula:
            "s^2 = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n - 1} = \\frac{\\text{SS}}{n - 1}, \\quad s = \\sqrt{s^2}",
          variables: [
            { symbol: "x_i", meaning: "Observed value of the i-th individual" },
            { symbol: "\\bar{x}", meaning: "Sample arithmetic mean" },
            {
              symbol: "\\text{SS}",
              meaning: "Sum of Squares: sum of squared deviations from the mean",
            },
            { symbol: "n - 1", meaning: "Degrees of freedom available for estimating variance" },
            { symbol: "s", meaning: "Sample standard deviation (in original measurement units)" },
          ],
          intuition:
            "We square the deviations because raw deviations sum to zero. Squaring makes all distances positive and penalizes larger deviations more heavily.",
          exampleCalculation: {
            given: "Sample of n = 5 test scores: [10, 14, 15, 17, 24].",
            steps: [
              "Step 1: Compute Mean: x̄ = (10 + 14 + 15 + 17 + 24) / 5 = 80 / 5 = 16.0.",
              "Step 2: Compute Raw Deviations (x_i - x̄): (10 - 16) = -6, (14 - 16) = -2, (15 - 16) = -1, (17 - 16) = +1, (24 - 16) = +8.",
              "Step 3: Verify Zero Sum: (-6) + (-2) + (-1) + (+1) + (+8) = 0.",
              "Step 4: Square Each Deviation: (-6)² = 36, (-2)² = 4, (-1)² = 1, (+1)² = 1, (+8)² = 64.",
              "Step 5: Compute Sum of Squares (SS): SS = 36 + 4 + 1 + 1 + 64 = 106.0.",
              "Step 6: Compute Sample Variance (s²): s² = 106 / (5 - 1) = 106 / 4 = 26.5.",
              "Step 7: Compute Standard Deviation (s): s = √26.5 ≈ 5.148.",
            ],
            result: "s² = 26.50, s ≈ 5.15 points",
            interpretation:
              "On average, individual test scores deviate from the mean of 16.0 by approximately 5.15 score points.",
          },
        },
      },
      {
        id: "empirical-rule-and-iqr",
        title: "4. The Empirical Rule and The Normal IQR Approximation",
        content: [
          "For approximately bell-shaped (Gaussian) distributions, the standard deviation provides an extraordinarily predictable ruler for data spread:",
        ],
        bullets: [
          "68.3% of all observations fall within 1 standard deviation of the mean: [x̄ - s, x̄ + s].",
          "95.4% of all observations fall within 2 standard deviations of the mean: [x̄ - 2s, x̄ + 2s].",
          "99.7% of all observations fall within 3 standard deviations of the mean: [x̄ - 3s, x̄ + 3s].",
        ],
        callout: {
          type: "tip",
          title: "Dr. Seltman's Quick EDA Rule of Thumb",
          message:
            "For a reasonably normal distribution, the relationship between standard deviation and the Interquartile Range is approximately s ≈ 0.75 × IQR (or equivalently, IQR ≈ 1.35 × s). Comparing s to 0.75 × IQR is a fantastic quick mental check for whether data has heavy tails or outliers!",
        },
      },
      {
        id: "real-world-scenario",
        title: "5. Real-World Scenario: Range Sensitivity to Data Entry Typos",
        content: [
          "Dr. Seltman warns that the Range (Max - Min) is extraordinarily fragile against transcription mistakes:",
          "Imagine a dataset of 50 patient ages ranging from 21 to 78 years old. The true range is 78 - 21 = 57 years.",
          "If a data entry clerk accidentally types 211 instead of 21, the new maximum becomes 211, and the range explodes from 57 to 211 - 21 = 190 years!",
          "Similarly, transposing digits—typing 91 instead of 19—distorts both the range and the mean. The IQR, by contrast, is completely immune to this typo because it focuses exclusively on the middle 50% (Q1 and Q3).",
        ],
      },
      {
        id: "python-implementation",
        title: "6. Python Implementation: Computing Spread Accurately",
        content: [
          "Be careful: NumPy's default `np.var()` divides by N (ddof=0), while Pandas `df.var()` divides by N - 1 (ddof=1)!",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd

scores = pd.Series([10, 14, 15, 17, 24], name="Scores")

# 1. Variance and Standard Deviation (Bessel's correction ddof=1)
var_sample = scores.var(ddof=1)
std_sample = scores.std(ddof=1)

# 2. Interquartile Range (IQR)
q1 = scores.quantile(0.25)
q3 = scores.quantile(0.75)
iqr = q3 - q1

# 3. Dr. Seltman's Normal Approximation Check
normal_s_estimate = 0.75 * iqr

print("=== Spread Analysis (n = 5) ===")
print(f"Sample Mean (x̄):       {scores.mean():.2f}")
print(f"Sample Variance (s²):   {var_sample:.2f}")
print(f"Sample Std Dev (s):     {std_sample:.2f}")
print(f"Q1 (25th percentile):   {q1:.2f}")
print(f"Q3 (75th percentile):   {q3:.2f}")
print(f"IQR (Q3 - Q1):          {iqr:.2f}")
print(f"0.75 * IQR Estimate:    {normal_s_estimate:.2f} (Compare to actual s = {std_sample:.2f})")
print(f"Full Range (Max - Min): {scores.max() - scores.min():.2f}")`,
          output: `=== Spread Analysis (n = 5) ===
Sample Mean (x̄):       16.00
Sample Variance (s²):   26.50
Sample Std Dev (s):     5.15
Q1 (25th percentile):   14.00
Q3 (75th percentile):   17.00
IQR (Q3 - Q1):          3.00
0.75 * IQR Estimate:    2.25 (Compare to actual s = 5.15)
Full Range (Max - Min): 14.00`,
          explanation:
            "Always specify ddof=1 when using NumPy (e.g. np.std(arr, ddof=1)) to ensure you are calculating the unbiased sample standard deviation.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "7. Common Beginner Mistakes",
        content: ["Be vigilant against these standard errors when measuring spread:"],
        mistakes: [
          "Adding Standard Deviations Directly: Variances of independent random variables add up (Var(X + Y) = Var(X) + Var(Y)), but standard deviations NEVER add up (Std(X + Y) ≠ Std(X) + Std(Y)).",
          "Confusing s² with s: Variance is expressed in squared units (e.g., dollars², kg²), which are physically uninterpretable. Always take the square root to get s in original units.",
          "Using ddof=0 for Sample Data: Using N instead of N - 1 underestimates the true population variance by a factor of (N - 1)/N.",
          "Relying on Range in Large Datasets: In large samples, the sample range increases purely as a function of sample size because you are more likely to sample rare extreme values.",
        ],
      },
    ],
    quiz: {
      question: "Why do we divide by (n - 1) instead of n when calculating sample variance s²?",
      options: [
        "Because the deviations are measured around the sample mean x̄ rather than the true population mean μ, consuming one degree of freedom and causing division by n to systematically underestimate the population variance.",
        "Because sample sizes in experiments are always odd numbers.",
        "Because dividing by n would cause a division by zero error in computer programs.",
        "Because Tukey's rule requires subtracting 1 to adjust for outliers.",
      ],
      correctIndex: 0,
      explanation:
        "Calculating the sample mean consumes one degree of freedom because Σ (x_i - x̄) = 0. Dividing by (n - 1), known as Bessel's correction, provides an unbiased estimator of the population variance σ².",
    },
    takeaways: [
      "Spread is as important as center; never evaluate a mean without understanding its variance or IQR.",
      "Deviations around the sample mean sum to zero; sample variance squares deviations and divides by n - 1.",
      "Standard deviation brings variance back to original units and powers the Empirical Rule (68-95-99.7).",
      "IQR is the spread of the middle 50% and is robust against outliers; for normal data, s ≈ 0.75 × IQR.",
    ],
  },
  {
    id: "skewness-and-kurtosis",
    slug: "skewness-and-kurtosis",
    moduleId: "univariate-non-graphical",
    order: 5,
    globalOrder: 8,
    title: "Skewness & Kurtosis: Quantifying Distribution Shape",
    subtitle: "Measuring Asymmetry and Peakedness with the 2-SE Decision Rule",
    estimatedMinutes: 12,
    summary:
      "Understand the third and fourth standardized moments, differentiate between positive and negative skew, uncover kurtosis and tail heaviness, and apply Dr. Seltman's practical ±2 SE decision rule.",
    prerequisites: ["measures-of-spread"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Beyond Center and Spread",
        content: [
          "Imagine two investment portfolios that share the exact same mean annual return of +8% and the exact same standard deviation of 12%. On paper, they look identical.",
          "Portfolio A has returns distributed symmetrically: most years yield between -4% and +20%.",
          "Portfolio B has returns where in 9 out of 10 years you earn a steady +12%, but in the 10th year you suffer a catastrophic -40% crash. Portfolio B has severe negative skewness and high kurtosis.",
          "To distinguish between distributions with identical centers and spreads, we quantify Shape through the mathematical concepts of Skewness and Kurtosis.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Skewness and Kurtosis Defined",
        content: [
          "In non-graphical EDA, shape is quantified using standardized statistical moments:",
        ],
        bullets: [
          "Sample Skewness (e): A measure of asymmetry. A symmetric distribution (like the Gaussian bell curve) has skewness equal to 0.",
          "Positive Skew (Right-Skewed, e > 0): The right tail is elongated and points towards positive infinity. Most data points are clustered at lower values, while a few high values pull the mean above the median (Mean > Median).",
          "Negative Skew (Left-Skewed, e < 0): The left tail is elongated and points towards negative infinity. Most data points are clustered at higher values, with a few low values pulling the mean below the median (Mean < Median).",
          "Sample Kurtosis (u): A measure of peakedness and tail thickness relative to a normal distribution. In modern software, 'excess kurtosis' is reported, where a normal distribution has excess kurtosis = 0.",
          "Leptokurtic (u > 0): Heavy tails and a sharp central peak. Prone to extreme 'black swan' outliers.",
          "Platykurtic (u < 0): Light tails and a flat, broad shoulder. Outliers are extremely rare.",
        ],
        callout: {
          type: "pdf-source",
          title: "Dr. Howard Seltman: Standard Error Decision Rules",
          message:
            "A common beginner mistake is seeing e = 0.25 and declaring the data skewed. For a finite sample, sample skewness and kurtosis will never be exactly zero due to random sampling variability. Dr. Seltman provides standard error formulas: SE_e ≈ √(6/n) for skewness, and SE_u ≈ √(24/n) for kurtosis. Only if |e| > 2 × SE_e (or |u| > 2 × SE_u) should you conclude there is statistically meaningful departure from normality.",
        },
      },
      {
        id: "mathematical-explanation",
        title: "3. Mathematical Formulation & Seltman's Decision Rules",
        content: [
          "The formulas for sample skewness and kurtosis standardize the 3rd and 4th deviations by powers of standard deviation:",
        ],
        formula: {
          title: "Skewness, Kurtosis, and Standard Error Formulas",
          displayFormula:
            "e = \\frac{\\frac{1}{n}\\sum (x_i - \\bar{x})^3}{s^3}, \\quad \\text{SE}_e \\approx \\sqrt{\\frac{6}{n}}; \\quad u = \\frac{\\frac{1}{n}\\sum (x_i - \\bar{x})^4}{s^4} - 3, \\quad \\text{SE}_u \\approx \\sqrt{\\frac{24}{n}}",
          variables: [
            { symbol: "e", meaning: "Sample skewness coefficient" },
            { symbol: "u", meaning: "Sample excess kurtosis (with 3 subtracted so normal = 0)" },
            {
              symbol: "\\text{SE}_e",
              meaning: "Approximate standard error of sample skewness for normal data",
            },
            {
              symbol: "\\text{SE}_u",
              meaning: "Approximate standard error of sample kurtosis for normal data",
            },
            { symbol: "n", meaning: "Sample size" },
          ],
          intuition:
            "Because (x_i - x̄) is cubed for skewness, positive deviations stay positive and negative deviations stay negative. For kurtosis, the 4th power ensures all deviations are positive, heavily punishing observations that sit several standard deviations from the center.",
          exampleCalculation: {
            given:
              "Sample of n = 150 blood pressure readings with sample skewness e = 0.48 and excess kurtosis u = 0.62.",
            steps: [
              "Step 1: Compute Standard Error of Skewness: SE_e = √(6 / 150) = √0.04 = 0.20.",
              "Step 2: Calculate Threshold for Skewness: 2 × SE_e = 2 × 0.20 = 0.40.",
              "Step 3: Test Skewness: |e| = 0.48 > 0.40. Since 0.48 exceeds 2 standard errors, there is statistically significant evidence of right-skewness!",
              "Step 4: Compute Standard Error of Kurtosis: SE_u = √(24 / 150) = √0.16 = 0.40.",
              "Step 5: Calculate Threshold for Kurtosis: 2 × SE_u = 2 × 0.40 = 0.80.",
              "Step 6: Test Kurtosis: |u| = 0.62 < 0.80. Since 0.62 is within 2 standard errors, kurtosis is NOT significantly different from normal.",
            ],
            result: "Significant Right Skew (|e| > 2*SE), Normal Kurtosis (|u| < 2*SE)",
            interpretation:
              "The data has an authentic rightward tail, but its tail thickness is consistent with a Gaussian curve.",
          },
        },
      },
      {
        id: "real-world-scenario",
        title: "4. Real-World Scenario: Diagnosing Financial Returns and Latencies",
        content: [
          "In web infrastructure monitoring, API response latency is famously right-skewed. 95% of server requests finish in 15 milliseconds, but 5% of requests hit database locks or network timeouts, taking 3,000 milliseconds.",
          "Computing skewness gives a massive e > 5.0 and kurtosis u > 30.0. Applying a Gaussian assumption here would cause an engineering team to grossly underestimate latency spikes.",
          "Conversely, consider human gestation length (pregnancy duration): It is moderately left-skewed (e < 0) because babies are sometimes born prematurely at 30–36 weeks, but almost never carry beyond 42 weeks due to medical induction.",
        ],
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: The Seltman Normality Diagnostic",
        content: [
          "Here is a complete, reusable Python function implementing Dr. Seltman's standard error decision rules:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
from scipy import stats

def seltman_shape_diagnostic(data, alpha_level=2.0):
    """
    Evaluates skewness and kurtosis against Dr. Seltman's 2-SE threshold.
    """
    n = len(data)
    # Calculate moments
    skew_val = stats.skew(data)
    kurt_val = stats.kurtosis(data)  # Fisher excess kurtosis (normal = 0)
    
    # Standard Errors from Seltman Section 4.2.6
    se_skew = np.sqrt(6.0 / n)
    se_kurt = np.sqrt(24.0 / n)
    
    skew_threshold = alpha_level * se_skew
    kurt_threshold = alpha_level * se_kurt
    
    is_skewed = abs(skew_val) > skew_threshold
    is_kurtotic = abs(kurt_val) > kurt_threshold
    
    print(f"=== Seltman Shape Diagnostic (n = {n}) ===")
    print(f"Skewness:  {skew_val:+.3f}  | 2*SE Threshold: ±{skew_threshold:.3f} -> {'SIGNIFICANT SKEW' if is_skewed else 'Symmetric'}")
    print(f"Kurtosis:  {kurt_val:+.3f}  | 2*SE Threshold: ±{kurt_threshold:.3f} -> {'SIGNIFICANT NON-NORMAL TAILS' if is_kurtotic else 'Normal Tails'}")
    
    return {
        'skew': skew_val, 'se_skew': se_skew, 'is_skewed': is_skewed,
        'kurt': kurt_val, 'se_kurt': se_kurt, 'is_kurtotic': is_kurtotic
    }

# Example 1: Truly normal sample
np.random.seed(42)
normal_sample = np.random.normal(loc=100, scale=15, size=200)
seltman_shape_diagnostic(normal_sample)

# Example 2: Right-skewed sample (Lognormal)
lognormal_sample = np.random.lognormal(mean=2.0, sigma=0.6, size=200)
print()
seltman_shape_diagnostic(lognormal_sample)`,
          output: `=== Seltman Shape Diagnostic (n = 200) ===
Skewness:  -0.108  | 2*SE Threshold: ±0.346 -> Symmetric
Kurtosis:  -0.198  | 2*SE Threshold: ±0.693 -> Normal Tails

=== Seltman Shape Diagnostic (n = 200) ===
Skewness:  +1.642  | 2*SE Threshold: ±0.346 -> SIGNIFICANT SKEW
Kurtosis:  +3.891  | 2*SE Threshold: ±0.693 -> SIGNIFICANT NON-NORMAL TAILS`,
          explanation:
            "Notice how the normal sample has slight non-zero values (-0.108 and -0.198), but the 2*SE rule correctly recognizes them as harmless sampling fluctuations.",
        },
      },
      {
        id: "mistakes-and-pitfalls",
        title: "6. Common Beginner Mistakes",
        content: ["Avoid these critical misinterpretations of shape statistics:"],
        mistakes: [
          "Demanding Exact Zero for Symmetry: Sample skewness will almost never be exactly 0.000 in empirical data. Always compare against the standard error √(6/n).",
          "Confusing Fisher Kurtosis with Pearson Kurtosis: Some textbooks define kurtosis such that normal = 3.0 (Pearson). SciPy and most modern tools use excess kurtosis where normal = 0.0 (Fisher). Be sure you know which convention your library uses.",
          "Assuming High Kurtosis Means 'Sharp Peak': While often called peakedness, kurtosis is mathematically dominated by tail behavior and the presence of extreme outliers.",
          "Applying Parametric Tests to Heavy-Tailed Data: When kurtosis is strongly positive (|u| > 2*SE_u), standard t-tests have reduced statistical power and inflated false-positive rates.",
        ],
      },
    ],
    quiz: {
      question:
        "You analyze a sample of n = 96 experimental measurements and obtain a sample skewness of e = +0.60. Using Dr. Seltman's 2-SE rule of thumb, what should you conclude?",
      options: [
        "The data shows statistically significant right-skewness because SE_e = √(6/96) = 0.25, threshold is 2 × 0.25 = 0.50, and 0.60 exceeds 0.50.",
        "The data is perfectly symmetric because 0.60 is less than 1.0.",
        "The sample size is too small to calculate skewness.",
        "The data is left-skewed because 0.60 is positive.",
      ],
      correctIndex: 0,
      explanation:
        "SE_e = √(6/96) = √0.0625 = 0.25. The 2-SE threshold is 2 × 0.25 = 0.50. Because |0.60| > 0.50, there is statistically significant evidence of positive (right) skewness.",
    },
    takeaways: [
      "Skewness quantifies asymmetry (positive = right tail, negative = left tail).",
      "Kurtosis quantifies tail thickness and propensity for extreme outliers relative to a bell curve.",
      "Never judge skewness or kurtosis in a vacuum; use Dr. Seltman's ±2 SE rule (SE_e ≈ √(6/n), SE_u ≈ √(24/n)).",
      "Substantial skewness or kurtosis alerts the analyst to consider data transformations (like log) or non-parametric procedures.",
    ],
  },
];
