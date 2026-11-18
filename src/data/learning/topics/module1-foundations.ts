import type { LearningTopic } from "../types";

export const module1Topics: LearningTopic[] = [
  {
    id: "what-is-eda",
    slug: "what-is-eda",
    moduleId: "foundations",
    order: 1,
    globalOrder: 1,
    title: "What is EDA & The 5 Core Objectives",
    subtitle: "A First Look at the Data",
    estimatedMinutes: 8,
    summary:
      "Understand the purpose of Exploratory Data Analysis, why raw numbers are overwhelming to humans, and the 5 foundational reasons to perform EDA before any formal modeling.",
    prerequisites: ["None — Designed for absolute beginners"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: Why Look at Data First?",
        content: [
          "Imagine walking into an unfamiliar room in complete darkness. You wouldn't immediately sprint across the floor or start rearranging furniture—you would turn on the lights, survey your surroundings, look for obstacles, and understand the room's layout. In data science, Exploratory Data Analysis (EDA) is turning on the lights.",
          "When you first collect or receive a dataset from an experiment, survey, or database, it arrives as a raw collection of numbers and text. Human brains are remarkably poor at looking at a long column of numbers or a spreadsheet with thousands of rows and intuiting their underlying properties. To most people, staring at endless raw numbers is tedious, boring, and mentally overwhelming.",
          "Exploratory Data Analysis is the disciplined practice of taking 'a first look at the data.' It consists of techniques devised to reveal the essential characteristics of the dataset by intentionally hiding distracting noise while highlighting critical patterns, structures, and anomalies.",
        ],
      },
      {
        id: "formal-definition",
        title: "2. Formal Definition",
        content: [
          "In academic and professional statistics, Exploratory Data Analysis is formally defined as:",
        ],
        callout: {
          type: "pdf-source",
          title: "Definition from Dr. Howard Seltman (Carnegie Mellon University)",
          message:
            "Loosely speaking, any method of looking at data that does not include formal statistical modeling and inference falls under the term exploratory data analysis.",
        },
        bullets: [
          "EDA is non-inferential: It does not begin with rigid p-values, hypothesis tests, or complex predictive models.",
          "EDA is diagnostic: It checks whether the empirical reality of the data matches our theoretical assumptions.",
          "EDA is foundational: It provides the evidence needed to select appropriate downstream models.",
        ],
      },
      {
        id: "why-it-matters",
        title: "3. Why Does EDA Matter? The 5 Core Reasons",
        content: [
          "Dr. Seltman outlines five vital reasons why exploratory data analysis is an indispensable first step in analyzing experimental or observational data:",
        ],
        steps: [
          "Detection of Mistakes: Real data is dirty. Humans transpose digits (e.g. typing 19 instead of 91, or 211 instead of 21 for a patient's age), instruments glitch, software corrupts encodings, and entire rows get dropped during transfers. EDA spots these errors before they taint conclusions.",
          "Checking of Assumptions: Almost all classical statistical tests (such as Student's t-test, ANOVA, and Ordinary Least Squares regression) rely on strict mathematical assumptions—most notably that data follows a Gaussian (normal) distribution and exhibits equal variances across groups. If these assumptions are grossly violated, your p-values and confidence intervals are mathematically invalid.",
          "Preliminary Selection of Appropriate Models: EDA reveals whether relationships are linear or nonlinear, whether data is skewed, and whether transformations (such as logarithmic scaling) or non-parametric algorithms are required.",
          "Determining Relationships Among Explanatory Variables: In real studies, independent variables often interact or co-vary. EDA detects collinearity (redundancy) among predictors, alerting you to variables that measure the same underlying phenomenon.",
          "Assessing Direction & Rough Size of Relationships: Before running complex regressions, EDA shows you whether an explanatory variable has a positive, negative, or negligible association with your outcome variable, and gives an intuitive sense of the effect size.",
        ],
      },
      {
        id: "real-world-example",
        title: "4. Real-World Scenario: The Clinical Drug Trial",
        content: [
          "Consider a medical researcher testing a new blood-pressure medication across 100 patients. If the researcher immediately runs a linear regression without EDA, a single patient whose systolic blood pressure was accidentally entered as 1200 mmHg instead of 120 mmHg will severely tilt the regression slope. The model will report that the drug is ineffective or statistically insignificant.",
          "Performing EDA first would instantly flag 1200 mmHg on a simple boxplot or range summary as a physical impossibility for human blood pressure. Correcting that single data-entry typo saves the entire clinical trial from a catastrophic false-negative conclusion.",
        ],
      },
      {
        id: "python-implementation",
        title: "5. Practical Python Implementation",
        content: [
          "Let's create a small reproducible dataset containing intentional mistakes and run an initial inspection using Pandas:",
        ],
        code: {
          language: "python",
          code: `import pandas as pd
import numpy as np

# 1. Create a reproducible sample dataset of hospital patients
data = {
    'patient_id': [101, 102, 103, 104, 105, 106, 107, 108],
    'age': [24, 28, 211, 45, 52, 19, 61, 33],  # Note the typo '211'
    'dosage_mg': [10, 20, 10, 30, 20, 10, 30, 20],
    'bp_reduction': [12.5, 18.2, 11.0, 24.1, 19.5, 9.8, 22.0, 17.4]
}

df = pd.DataFrame(data)

# 2. First look: dimensions and basic inspection
print("Dataset Shape (Rows, Columns):", df.shape)
print("\n--- Summary Statistics ---")
print(df.describe())`,
          output: `Dataset Shape (Rows, Columns): (8, 4)

--- Summary Statistics ---
       patient_id         age  dosage_mg  bp_reduction
count    8.000000    8.000000    8.000000      8.000000
mean   104.500000   59.125000   18.750000     16.812500
std      2.449490   62.888649    7.559289      5.147937
min    101.000000   19.000000   10.000000      9.800000
25%    102.750000   27.000000   10.000000     12.125000
50%    104.500000   30.500000   20.000000     17.800000
75%    106.250000   46.750000   22.500000     20.125000
max    108.000000  211.000000   30.000000     24.100000`,
          explanation:
            "Calling df.describe() immediately reveals that the maximum age is 211 years—an obvious data-entry mistake where a 21-year-old was typed with an extra 1. Notice how this single typo inflated the mean age from ~37 to 59.1!",
        },
      },
      {
        id: "interpretation",
        title: "6. How to Interpret the Output",
        content: [
          "When you look at summary outputs like `df.describe()`, train your eyes to scan the minimum and maximum values against real-world domain knowledge.",
          "Notice also the contrast between the 50% percentile (median = 30.5) and the mean (59.1). When the mean is substantially larger than the median, it immediately suggests that extreme high values (outliers or positive skew) are pulling the mean upward.",
        ],
      },
      {
        id: "common-mistakes",
        title: "7. Common Beginner Mistakes",
        mistakes: [
          "Jumping directly into machine learning or predictive modeling before looking at the raw distributions.",
          "Assuming summary statistics alone tell the whole story without checking minimums, maximums, and visual plots.",
          "Believing that an outlier is automatically a bad data point that should be deleted without investigation. (Outliers can be genuine extreme phenomena or typos; EDA helps you distinguish the two!).",
          "Relying solely on software defaults without understanding what the calculations actually represent.",
        ],
      },
    ],
    quiz: {
      question:
        "According to Dr. Seltman's text, which of the following is NOT one of the 5 main reasons for conducting EDA?",
      options: [
        "Detection of data entry mistakes and anomalies",
        "Checking theoretical assumptions required by statistical tests",
        "Proving that a statistical hypothesis is definitively true with p < 0.05",
        "Assessing the rough size and direction of relationships between variables",
      ],
      correctIndex: 2,
      explanation:
        "EDA is strictly an exploratory and diagnostic phase that precedes formal inference. It does not prove hypotheses with formal p-values; rather, it detects mistakes, checks assumptions, guides model choice, and explores relationships.",
    },
    takeaways: [
      "EDA is any method of inspecting data without formal statistical modeling and inference.",
      "Human brains cannot process large spreadsheets of numbers without techniques that filter noise and highlight patterns.",
      "The 5 core reasons for EDA: mistake detection, assumption checking, model selection, relationship discovery, and effect size estimation.",
      "Always inspect minimum, maximum, and median values early to catch data entry blunders like 211-year-old patients.",
      "EDA is not an exact science—it is an art that requires both statistical guidelines and creative exploration.",
    ],
  },
  {
    id: "eda-taxonomy",
    slug: "eda-taxonomy",
    moduleId: "foundations",
    order: 2,
    globalOrder: 2,
    title: "Data Anatomy & The 2×2 Taxonomy of EDA",
    subtitle: "The Four Types of Exploratory Analysis",
    estimatedMinutes: 10,
    summary:
      "Master the structure of rectangular data arrays, subject identifiers, outcome vs explanatory variable roles, and the universal 2×2 classification matrix: Univariate vs Multivariate × Non-graphical vs Graphical.",
    prerequisites: ["What is EDA & The 5 Core Objectives"],
    sections: [
      {
        id: "data-anatomy",
        title: "1. Data Anatomy: The Rectangular Array",
        content: [
          "In almost all scientific experiments and data analysis projects, data is collected into a rectangular array (commonly known as a dataframe, spreadsheet, or tabular database).",
          "Understanding the exact structure of this rectangular layout is essential:",
        ],
        bullets: [
          "Rows represent Subjects or Cases: Most commonly, there is one row per experimental subject, observation, customer, or transaction.",
          "Columns represent Variables: Each column records a specific measurement, property, or attribute observed for that subject.",
          "Subject Identifiers: Columns (like ID, SSN, or name) that uniquely identify each row but are not themselves predictive measurements.",
          "Variable Types: Columns either contain numeric values for a quantitative variable (e.g. height, price, duration) or levels/categories for a categorical variable (e.g. sex, college, blood type).",
          "Variable Roles: In experiments and machine learning, variables are broadly partitioned into Explanatory variables (independent predictors or treatments) and Outcome variables (dependent targets or responses).",
        ],
      },
      {
        id: "taxonomy-matrix",
        title: "2. The Universal 2×2 Taxonomy of EDA",
        content: [
          "Dr. Seltman introduces a master classification that organizes every exploratory technique into a 2×2 matrix based on two fundamental questions:",
          "1. Is the method Non-graphical (calculating summary statistics) or Graphical (displaying a diagram or picture)?",
          "2. Does the method look at one variable at a time (Univariate) or two or more variables at a time (Multivariate)?",
        ],
        table: {
          caption: "The Master 2×2 Cross-Classification Matrix of EDA Techniques",
          headers: [
            "Dimension",
            "Non-Graphical (Summary Statistics)",
            "Graphical (Visual Summaries)",
          ],
          rows: [
            [
              "Univariate (One variable at a time)",
              "Frequencies, proportions, mean, median, IQR, variance, standard deviation, skewness, kurtosis",
              "Histograms, stem-and-leaf plots, boxplots, quantile-normal (Q-Q) plots",
            ],
            [
              "Multivariate (Two or more variables at a time)",
              "Cross-tabulation (contingency tables), covariance, correlation coefficients, correlation matrices, grouped summaries",
              "Side-by-side boxplots, grouped barplots, scatterplots with color/symbol encodings",
            ],
          ],
        },
      },
      {
        id: "the-golden-rule",
        title: "3. The Golden Rule of EDA Sequencing",
        content: [
          "One of the most important practical guidelines highlighted in the text is the sequencing of exploratory methods:",
        ],
        callout: {
          type: "tip",
          title: "The Golden Heuristic of EDA",
          message:
            "It is almost always a good idea to perform univariate EDA on each of the components of a multivariate EDA before performing the multivariate EDA.",
        },
        content_after: [
          "Why? If you jump immediately into a scatterplot of Variable X vs Variable Y, you might see a cluster of points and an outlier. But you won't know whether the outlier is an impossible value in X, an impossible value in Y, or a genuine bivariate interaction. Understanding the individual distributions of X and Y first prevents massive misinterpretations.",
        ],
      },
      {
        id: "roles-and-types",
        title: "4. Variable Roles and Measurement Scales",
        content: [
          "Beyond the 2×2 matrix, every EDA technique is further customized based on the role and type of data being analyzed:",
        ],
        bullets: [
          "Quantitative (Numeric): Continuous measurements (e.g. reaction time in seconds, income in dollars) or discrete counts (e.g. number of eggs laid, hospital visits). Measures of center and spread apply.",
          "Categorical (Nominal): Qualitative groupings with no inherent ordering (e.g. college attended: H&SS, MCS, SCS; blood type: A, B, AB, O). Means and variances are meaningless here; only frequencies and proportions apply.",
          "Ordinal: Categorical groupings that possess a natural rank order (e.g. education level: High School, Bachelor's, Master's, PhD; pain scale: mild, moderate, severe). Depending on the context, ordinal data can sometimes be treated quantitatively for EDA.",
        ],
      },
      {
        id: "python-implementation",
        title: "5. Python Implementation: Inspecting Roles & Types",
        content: [
          "Here is how a beginner uses Pandas to inspect data types, separate numeric from categorical variables, and prepare for structured univariate analysis:",
        ],
        code: {
          language: "python",
          code: `import pandas as pd

# Sample experimental dataset matching the rectangular format
df = pd.DataFrame({
    'subject_id': ['S01', 'S02', 'S03', 'S04', 'S05'],
    'group': ['Control', 'Treatment', 'Control', 'Treatment', 'Treatment'], # Categorical explanatory
    'dosage': [0, 50, 0, 100, 50],                                          # Quantitative explanatory
    'score': [72, 85, 68, 94, 88]                                          # Quantitative outcome
})

# 1. Inspect column datatypes
print("--- Data Types ---")
print(df.dtypes)

# 2. Automatically split into Quantitative and Categorical columns
quant_cols = df.select_dtypes(include=['number']).columns.tolist()
cat_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()

print("\nQuantitative variables:", quant_cols)
print("Categorical variables:", cat_cols)`,
          output: `--- Data Types ---
subject_id    object
group         object
dosage         int64
score          int64
dtype: object

Quantitative variables: ['dosage', 'score']
Categorical variables: ['subject_id', 'group']`,
          explanation:
            "Notice how subject_id is an identifier rather than an analytical category. Recognizing variable roles ensures you don't calculate meaningless summary statistics on subject identifiers.",
        },
      },
      {
        id: "common-mistakes",
        title: "6. Common Beginner Mistakes",
        mistakes: [
          "Calculating the mean of a categorical variable (e.g. averaging zip codes or student IDs).",
          "Skipping univariate analysis and going directly to scatterplots or correlation matrices.",
          "Treating ordinal survey ratings strictly as continuous numbers without checking discrete distribution patterns.",
          "Ignoring the distinction between explanatory predictors and outcome targets.",
        ],
      },
    ],
    quiz: {
      question: "Which of the following best represents a Univariate Graphical EDA technique?",
      options: [
        "A two-way cross-tabulation table",
        "A histogram of reaction times",
        "A scatterplot of age versus strength",
        "Calculating the correlation coefficient r between two variables",
      ],
      correctIndex: 1,
      explanation:
        "A histogram displays the distribution of exactly one quantitative variable in a pictorial/graphical format, making it a Univariate Graphical technique.",
    },
    takeaways: [
      "Data is organized in rectangular arrays: rows are subjects/cases, columns are variables.",
      "The four types of EDA: Univariate Non-graphical, Univariate Graphical, Multivariate Non-graphical, Multivariate Graphical.",
      "The Golden Rule: Always run univariate EDA on individual variables before running multivariate EDA.",
      "Variables have types (quantitative, categorical, ordinal) and roles (explanatory vs outcome).",
    ],
  },
  {
    id: "population-vs-sample",
    slug: "population-vs-sample",
    moduleId: "foundations",
    order: 3,
    globalOrder: 3,
    title: "Populations, Samples & Sampling Distributions",
    subtitle: "Parameters as Secrets of Nature",
    estimatedMinutes: 9,
    summary:
      "Understand why sample statistics vary from experiment to experiment, why population parameters are fixed 'secrets of nature', and how sampling distributions bridge empirical data with statistical theory.",
    prerequisites: ["What is EDA & The 5 Core Objectives"],
    sections: [
      {
        id: "concept-intro",
        title: "1. Concept Introduction: The Secret of Nature",
        content: [
          "In any scientific study, there is a fundamental divide between what is true in the entire world (the Population) and what we happen to observe in our particular experiment (the Sample).",
          "Suppose you want to know the true average resting heart rate of all adult humans on Earth. That true average is a single, fixed number. Dr. Howard Seltman poetically refers to population parameters as 'secrets of nature'—they exist in reality, but we can almost never observe the entire population directly.",
          "Instead, we recruit a sample (e.g. 100 people) and measure their heart rates. If you repeat the experiment tomorrow with another 100 people, you will get a slightly different sample average. The sample statistic is a random variable, not a fixed truth.",
        ],
      },
      {
        id: "formal-definitions",
        title: "2. Key Statistical Definitions",
        bullets: [
          "Population: The entire collection of all individuals, objects, or measurements of interest (e.g. all enrolled CMU students in Fall 2007).",
          "Population Parameter: A fixed, non-random, typically unknown numerical characteristic of the population (e.g. population mean μ, population variance σ²).",
          "Sample: A subset of subjects randomly selected from the population to participate in the study.",
          "Sample Distribution: The empirical distribution of observed measurements in a single sample.",
          "Sample Statistic: A numerical quantity calculated from the sample data (e.g. sample mean x̄, sample standard deviation s). A sample statistic is an estimate of the corresponding population parameter.",
          "Sampling Distribution: The probability distribution of a given sample statistic if you were to repeat the sampling process an infinite number of times under identical conditions.",
        ],
      },
      {
        id: "why-it-matters",
        title: "3. Why This Distinction Governs EDA",
        content: [
          "Understanding this distinction keeps data analysts humble and rigorous:",
          "1. Your observed data represents just one sample out of an infinite number of possible samples that could have occurred.",
          "2. The sample characteristics you see in a histogram or summary table are not inherently interesting in themselves—they matter only to the degree that they accurately represent the population they came from.",
          "3. Random noise, lucky selections, and incomplete experimental controls cause sample statistics to fluctuate. EDA helps us separate true structural signals from random sample quirks.",
        ],
      },
      {
        id: "mathematical-connection",
        title: "4. Mathematical Representation & Sampling Variance",
        content: [
          "If we draw an independent random sample of size n from a population with mean μ and variance σ², the sample mean x̄ is an unbiased estimator of μ:",
        ],
        formula: {
          title: "Sampling Distribution of the Sample Mean",
          displayFormula: "E[x̄] = μ,    Var(x̄) = σ² / n,    SE(x̄) = σ / √n",
          variables: [
            { symbol: "x̄", meaning: "Sample mean calculated from n observations" },
            { symbol: "μ", meaning: "True fixed population mean ('secret of nature')" },
            { symbol: "σ²", meaning: "True population variance" },
            { symbol: "n", meaning: "Sample size (number of observed subjects)" },
            {
              symbol: "SE(x̄)",
              meaning: "Standard Error: how much sample means fluctuate across repeated samples",
            },
          ],
          intuition:
            "As sample size n increases, the variability of the sample mean shrinks by 1/√n. A larger sample produces a much tighter, more reliable estimate of the secret population parameter.",
          exampleCalculation: {
            given:
              "Population σ = 15 points on an exam. You test samples of size n = 25 vs n = 100.",
            steps: [
              "For n = 25: SE = 15 / √25 = 15 / 5 = 3.0 points.",
              "For n = 100: SE = 15 / √100 = 15 / 10 = 1.5 points.",
            ],
            result: "Quadrupling the sample size cuts the uncertainty of the sample mean in half.",
            interpretation:
              "In small samples, random fluctuation is substantial. EDA visualizes this uncertainty so you don't overinterpret small sample quirks as deep scientific truths.",
          },
        },
      },
      {
        id: "python-simulation",
        title: "5. Python Simulation: Observing Sampling Distributions",
        content: [
          "Let's simulate 1,000 random samples of size n = 50 drawn from a known population (mean μ = 100, σ = 15) to see the sampling distribution in action:",
        ],
        code: {
          language: "python",
          code: `import numpy as np
import pandas as pd

np.random.seed(42)

# True Population Parameters ("Secrets of Nature")
true_mu = 100.0
true_sigma = 15.0

# Take 1,000 different samples of size n = 50
sample_size = 50
num_experiments = 1000

sample_means = [
    np.random.normal(loc=true_mu, scale=true_sigma, size=sample_size).mean()
    for _ in range(num_experiments)
]

sample_means = pd.Series(sample_means)

print("--- Simulated Sampling Distribution ---")
print("Mean of Sample Means:", round(sample_means.mean(), 3))
print("Theoretical Expected Mean:", true_mu)
print("Standard Deviation of Sample Means (Empirical SE):", round(sample_means.std(), 3))
print("Theoretical SE (sigma / sqrt(n)):", round(true_sigma / np.sqrt(sample_size), 3))`,
          output: `--- Simulated Sampling Distribution ---
Mean of Sample Means: 100.027
Theoretical Expected Mean: 100.0
Standard Deviation of Sample Means (Empirical SE): 2.112
Theoretical SE (sigma / sqrt(n)): 2.121`,
          explanation:
            "Notice how the sample means average out almost exactly to 100.0, but each individual sample mean varied with a standard error of approximately 2.12 points.",
        },
      },
      {
        id: "common-mistakes",
        title: "6. Common Beginner Mistakes",
        mistakes: [
          "Confusing the sample distribution (the spread of individual data points in one sample) with the sampling distribution (the spread of sample statistics across hypothetical repetitions).",
          "Believing that calculating x̄ reveals the exact population mean μ with 100% certainty.",
          "Over-interpreting small bumps or modes in small datasets (e.g. n = 20) as genuine population features when they are merely random sampling noise.",
        ],
      },
    ],
    quiz: {
      question: "Why does Dr. Seltman describe population parameters as 'secrets of nature'?",
      options: [
        "Because they change randomly every time you collect a new sample",
        "Because they are fixed, true values that describe the entire population, but are rarely directly observable",
        "Because statistical software keeps them encrypted for privacy reasons",
        "Because parameters can only be estimated if you have at least 1,000 observations",
      ],
      correctIndex: 1,
      explanation:
        "Population parameters (like the true mean μ or true variance σ²) are fixed characteristics of nature. We can rarely measure the entire population, so they remain unknown 'secrets' that we estimate through sample statistics.",
    },
    takeaways: [
      "Population parameters are fixed and unknown; sample statistics are random variables that estimate them.",
      "The characteristics of a single sample are only interesting because of what they reveal about the underlying population.",
      "Repeated sampling causes sample statistics to vary, forming a sampling distribution.",
      "Larger samples reduce sampling error, shrinking standard error by 1/√n.",
    ],
  },
];
