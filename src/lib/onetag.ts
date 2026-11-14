/**
 * OneTag AI Integration & EDA Assistant Configuration
 *
 * Centralizes the OneTag AI JavaScript SDK typings, configuration key,
 * system persona prompt, DOM context extractor, and educational fallbacks.
 */

export interface OneTagAskOptions {
  stream?: (delta: string) => void;
  system?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  signal?: AbortSignal;
  json?: boolean;
  maxTokens?: number;
  key?: string;
  via?: string;
}

export interface OneTagSDK {
  ask: (prompt: string, input?: unknown, options?: OneTagAskOptions) => Promise<string>;
  configure: (options: { key?: string; endpoint?: string; via?: string }) => void;
}

declare global {
  interface Window {
    onetag?: OneTagSDK;
  }
}

/**
 * Public integration key for OneTag AI.
 * Falls back to "PASTE_MY_ONETAG_KEY_HERE" as documented by OneTag AI.
 * Can be overridden via the VITE_ONETAG_KEY environment variable.
 */
export const ONETAG_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_ONETAG_KEY) ||
  "PASTE_MY_ONETAG_KEY_HERE";

/**
 * Checks whether the active key is still the default template placeholder.
 */
export function isPlaceholderKey(key: string = ONETAG_KEY): boolean {
  if (!key) return true;
  const trimmed = key.trim();
  return (
    trimmed === "PASTE_MY_ONETAG_KEY_HERE" || /^YOUR_/i.test(trimmed) || trimmed === "placeholder"
  );
}

export const EDA_CHATBOT_NAME = "Eddie";

export const EDA_CHATBOT_WELCOME_MESSAGE =
  "Hey! I'm Eddie, your EDA learning assistant. Whether you're exploring data analysis, statistics, Python, or visualization techniques, I'm here to help. Ask me anything!";

export const EDA_CHATBOT_SYSTEM_PROMPT = `You are Eddie, an educational assistant integrated into an Exploratory Data Analysis learning website.

Your primary responsibility is to help learners understand EDA, Python, statistics, data preprocessing, data visualization, and related concepts.

Prioritize the educational content available on the visitor's current page when answering questions.

Explain technical concepts using:
1. A simple, intuitive explanation.
2. A formal technical definition.
3. A practical example.
4. Python code when relevant.

Assume the learner may be a beginner.

Avoid inventing information about the website's content. If a question concerns information not available on the current page, clearly distinguish general knowledge from page-specific information.

Keep explanations structured, technically accurate, and educational.`;

/**
 * Extracts clean, structured educational context from the active page.
 * Strictly ignores global navigation, headers, footers, and interactive UI
 * controls to ensure the model focuses purely on technical content.
 */
export function extractPageContext(): string {
  if (typeof document === "undefined") return "";

  // Target the educational content container:
  // 1. #educational-content (if marked)
  // 2. <article> (project detail content)
  // 3. <main> (generic main content)
  const container =
    document.getElementById("educational-content") ||
    document.querySelector("article") ||
    document.querySelector("main");

  if (!container) return "";

  // Clone the node so DOM mutations for cleanup don't touch the active UI
  const clone = container.cloneNode(true) as HTMLElement;

  // Strip UI chrome, navigation, buttons, and helper widgets
  const selectorsToRemove = [
    "nav",
    "header",
    "footer",
    "button",
    "svg",
    "[data-chatbot-ignore]",
    "#chatbot-launcher",
    "#chatbot-panel",
    ".sr-only",
  ];

  for (const selector of selectorsToRemove) {
    clone.querySelectorAll(selector).forEach((el) => el.remove());
  }

  const rawText = clone.innerText || clone.textContent || "";
  const cleanedText = rawText
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const pageTitle = document.title || "EDA With Python";
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const header = `CURRENT PAGE: ${pageTitle}\nURL PATH: ${pathname}\n\nPAGE CONTENT SUMMARY:\n`;
  const fullContext = header + cleanedText;

  // Fit safely within OneTag's 32,000 character budget (leaving room for prompt and history)
  const MAX_CONTEXT_LENGTH = 24000;
  if (fullContext.length > MAX_CONTEXT_LENGTH) {
    return (
      fullContext.slice(0, MAX_CONTEXT_LENGTH) + "\n... [Page content truncated for token budget]"
    );
  }

  return fullContext;
}

/**
 * Returns contextual starter questions based on the active route.
 */
export function getStarterQuestions(pathname: string): string[] {
  const path = pathname.toLowerCase();

  if (path.includes("titanic")) {
    return [
      "How were missing Age and Cabin values handled?",
      "What features best predict passenger survival?",
      "Explain the IQR outlier detection used on Fare.",
    ];
  }

  if (path.includes("house-price-prediction") || path.includes("california")) {
    return [
      "How is median income correlated with house value?",
      "Explain the log transformation for skewed features.",
      "What evaluation metrics were used for regression?",
    ];
  }

  if (path.includes("credit-risk")) {
    return [
      "How does credit score impact loan approval?",
      "Explain the optimal decision threshold calculation.",
      "Which features had the highest SHAP values?",
    ];
  }

  if (path.includes("discount-vs-profit")) {
    return [
      "At what discount percentage does profit turn negative?",
      "Which categories suffer the most margin erosion?",
      "What is the recommended discount strategy?",
    ];
  }

  if (path.includes("video-game-sales")) {
    return [
      "Which platform had the highest global sales?",
      "How do regional sales preferences differ?",
      "What are the sales trends over time?",
    ];
  }

  if (path.includes("netflix")) {
    return [
      "How has the ratio of movies to TV shows changed?",
      "What are the top content-producing countries?",
      "What are the most common movie runtimes?",
    ];
  }

  // Default homepage / general EDA questions
  return [
    "What is Exploratory Data Analysis (EDA)?",
    "Explain the IQR method for outlier detection.",
    "What is the difference between Pearson and Spearman correlation?",
    "How do I choose between mean and median for missing values?",
  ];
}

/**
 * Offline educational responder.
 * When OneTag AI is running with the template placeholder key or offline,
 * provides structured educational responses that adhere to the 4-part instruction format.
 */
export function getEducationalFallbackResponse(prompt: string, _context?: string): string {
  const query = prompt.toLowerCase();

  if (query.includes("iqr") || query.includes("outlier")) {
    return `### 1. Simple, Intuitive Explanation
Think of the Interquartile Range (IQR) like looking at the middle 50% of students' test scores in a classroom. Outliers are scores that sit unusually far below the lower group or far above the top group. The IQR measures the spread of that steady middle group, ignoring extreme values.

### 2. Formal Technical Definition
The **Interquartile Range (IQR)** is a measure of statistical dispersion equal to the difference between the 75th percentile ($Q_3$) and the 25th percentile ($Q_1$):
$$\\text{IQR} = Q_3 - Q_1$$

Under Tukey's boxplot rule, data points are flagged as potential outliers if they lie outside the fences:
- **Lower Bound:** $Q_1 - 1.5 \\times \\text{IQR}$
- **Upper Bound:** $Q_3 + 1.5 \\times \\text{IQR}$

### 3. Practical Example
In the **Titanic dataset**, ticket fares ranged from \\$0 to over \\$512. The middle 50% paid between \\$7.91 ($Q_1$) and \\$31.00 ($Q_3$), giving an IQR of \\$23.09. Fares exceeding $\\$31.00 + (1.5 \\times \\$23.09) = \\$65.63$ were identified as extreme upper outliers (mostly first-class luxury suites).

### 4. Python Code Example
\`\`\`python
import numpy as np
import pandas as pd

# Calculate Q1, Q3, and IQR
q1 = df['fare'].quantile(0.25)
q3 = df['fare'].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

# Identify outliers
outliers = df[(df['fare'] < lower_bound) | (df['fare'] > upper_bound)]
print(f"IQR: {iqr:.2f}, Lower: {lower_bound:.2f}, Upper: {upper_bound:.2f}")
print(f"Detected {len(outliers)} outliers.")
\`\`\``;
  }

  if (query.includes("pearson") || query.includes("correlation") || query.includes("spearman")) {
    return `### 1. Simple, Intuitive Explanation
Correlation tells you how two variables move together. If one goes up when the other goes up (like temperature and ice cream sales), they have a positive correlation. If one goes up when the other drops (like retail discounts and profit margins), they have a negative correlation.

### 2. Formal Technical Definition
**Pearson's correlation coefficient ($r$)** measures the linear relationship between two continuous variables $X$ and $Y$:
$$r = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sqrt{\\sum (X_i - \\bar{X})^2 \\sum (Y_i - \\bar{Y})^2}}$$
Values range from $-1$ (perfect negative linear correlation) to $+1$ (perfect positive linear correlation), where $0$ indicates no linear association.

### 3. Practical Example
In our **California Housing project**, \`MedInc\` (median income) demonstrated a strong positive Pearson correlation ($r \\approx 0.69$) with \`MedHouseVal\`, proving that household income is the single most predictive linear indicator of home values.

### 4. Python Code Example
\`\`\`python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Compute pairwise Pearson correlation
corr_matrix = df[['MedInc', 'HouseAge', 'AveRooms', 'MedHouseVal']].corr(method='pearson')

# Plot correlation heatmap
plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title('Feature Correlation Heatmap')
plt.show()
\`\`\``;
  }

  if (query.includes("missing") || query.includes("impute") || query.includes("imputation")) {
    return `### 1. Simple, Intuitive Explanation
Missing values are blanks in your data table. You can either delete rows/columns that have too many blanks, or fill in reasonable educated guesses based on similar rows (a process called imputation).

### 2. Formal Technical Definition
Missing data is categorized into three mechanisms:
1. **MCAR (Missing Completely at Random):** Missingness is unrelated to any observed or unobserved data.
2. **MAR (Missing at Random):** Missingness depends on observed features (e.g., age missing more often for female passengers).
3. **MNAR (Missing Not at Random):** Missingness depends on the unobserved value itself.

Imputation replaces missing values with summary statistics (mean, median, mode) or model-based estimates (KNN, MICE, IterativeImputer).

### 3. Practical Example
In the **Titanic preprocessing project**, \`Age\` had ~20% missing values. Rather than using the global median, \`Age\` was imputed using median age grouped by passenger class (\`Pclass\`) and title extracted from the passenger's name (\`Mr\`, \`Mrs\`, \`Miss\`, \`Master\`), giving much more accurate age estimates.

### 4. Python Code Example
\`\`\`python
import pandas as pd

# 1. Simple median imputation (robust to outliers)
df['Age_Imputed'] = df['Age'].fillna(df['Age'].median())

# 2. Context-aware grouped median imputation
df['Title'] = df['Name'].str.extract(r' ([A-Za-z]+)\\.', expand=False)
df['Age'] = df.groupby(['Pclass', 'Title'])['Age'].transform(
    lambda group: group.fillna(group.median())
)
\`\`\``;
  }

  if (query.includes("titanic") || query.includes("survival") || query.includes("cabin")) {
    return `### 1. Simple, Intuitive Explanation
The Titanic EDA project explores the factors that determined which passengers survived the disaster. Features like gender, ticket class, and family size played decisive roles in passenger rescue priority.

### 2. Formal Technical Definition
The Titanic dataset represents a binary classification and tabular survival analysis problem. Exploratory data analysis involves:
- Assessing missingness across features (\`Cabin\` ~77%, \`Age\` ~20%, \`Embarked\` 2 rows).
- Engineering new relational features (\`FamilySize = SibSp + Parch + 1\`, \`IsAlone\`, and \`Title\` extraction).
- Examining target class balance (\`Survived\` rate $\\approx 38.4\\%$).

### 3. Practical Example
Women and children were evacuated first: female survival rate was over $74\\%$, compared to only $18.9\\%$ for adult males. First-class passengers had a $63\\%$ survival rate compared to just $24\\%$ for third-class passengers.

### 4. Python Code Example
\`\`\`python
import pandas as pd

# Feature engineering on Titanic
df['FamilySize'] = df['SibSp'] + df['Parch'] + 1
df['IsAlone'] = (df['FamilySize'] == 1).astype(int)

# Grouped survival breakdown
survival_summary = df.groupby(['Pclass', 'Sex'])['Survived'].mean()
print(survival_summary)
\`\`\``;
  }

  if (query.includes("california") || query.includes("house") || query.includes("price")) {
    return `### 1. Simple, Intuitive Explanation
The California Housing project uses census data to predict median house values across districts. It demonstrates how geographic location, room count, and neighborhood income influence real estate prices.

### 2. Formal Technical Definition
This is a continuous target regression task ($Y = \\text{MedHouseVal}$) using 8 predictor features. Key EDA workflows include:
- Geographic visualization via longitude and latitude coordinates.
- Detection of right-skewed distributions (\`Population\`, \`TotalRooms\`).
- Identification of artificial upper price capping at $\\$500,001$.

### 3. Practical Example
Districts with ocean proximity (\`NEAR BAY\` or \`<1H OCEAN\`) command significantly higher prices than \`INLAND\` locations, even after controlling for room counts and age.

### 4. Python Code Example
\`\`\`python
import numpy as np
import pandas as pd

# Handle right-skewed features with log transformation
df['log_population'] = np.log1p(df['population'])
df['rooms_per_household'] = df['total_rooms'] / df['households']

# Inspect target correlations
correlations = df.corr(numeric_only=True)['median_house_value'].sort_values(ascending=False)
print(correlations)
\`\`\``;
  }

  if (
    query.includes("credit") ||
    query.includes("loan") ||
    query.includes("risk") ||
    query.includes("shap")
  ) {
    return `### 1. Simple, Intuitive Explanation
The Credit Risk Assessment project evaluates whether a loan applicant is likely to default. By examining income, employment length, loan amount, and credit score, the model flags risky loans and helps lenders decide safely.

### 2. Formal Technical Definition
Credit risk scoring is an imbalanced binary classification problem ($Y \\in \\{0, 1\\}$). Performance is evaluated using **ROC-AUC**, **Precision-Recall AUC**, and cost-sensitive threshold optimization rather than raw accuracy. Explainability is achieved using **SHAP (SHapley Additive exPlanations)** values based on cooperative game theory.

### 3. Practical Example
A borrower with a high loan-to-income ratio ($>40\\%$) and a previous default history is assigned a risk score $>0.75$, triggering additional manual underwriting review rather than automatic approval.

### 4. Python Code Example
\`\`\`python
import shap
from sklearn.ensemble import RandomForestClassifier

# Fit classifier and calculate TreeSHAP explanations
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# Plot feature importance summary
shap.summary_plot(shap_values[1], X_test)
\`\`\``;
  }

  if (query.includes("discount") || query.includes("profit") || query.includes("retail")) {
    return `### 1. Simple, Intuitive Explanation
In retail, offering discounts boosts sales volume, but excessive discounting can destroy overall profit. This analysis finds the "tipping point" where markdown discounts turn profitable transactions into net losses.

### 2. Formal Technical Definition
The Discount vs Profit study evaluates the nonlinear relationship between discount percentage ($d$) and profit margin ($m = \\frac{\\text{Profit}}{\\text{Sales}}$). By segmenting transactions into discrete discount bands ($0\\%$, $1\\text{--}10\\%$, $11\\text{--}20\\%$, $>20\\%$) and analyzing product sub-categories, we identify margin cliffs where price elasticity fails to compensate for margin reduction.

### 3. Practical Example
Across retail orders, discounts above $20\\%$ produce negative average profit margins across most sub-categories, especially in Furniture and Office Supplies (e.g., Tables and Binders).

### 4. Python Code Example
\`\`\`python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Create discount bracket bins
df['Discount_Band'] = pd.cut(
    df['Discount'],
    bins=[0, 0.05, 0.20, 0.50, 1.0],
    labels=['0-5%', '5-20%', '20-50%', '>50%'],
    include_lowest=True
)

# Mean profit margin by discount band
profit_summary = df.groupby('Discount_Band')['Profit'].agg(['count', 'mean', 'sum'])
print(profit_summary)
\`\`\``;
  }

  // General fallback for any other exploratory data analysis query
  return `### 1. Simple, Intuitive Explanation
Exploratory Data Analysis (EDA) is like getting to know a dataset before building models or making decisions. You look at shapes, check summary statistics, spot mistakes or missing values, and uncover patterns through charts.

### 2. Formal Technical Definition
**Exploratory Data Analysis (EDA)** is an analytical approach pioneered by John Tukey that uses statistical summaries and graphical representations to:
- Investigate dataset structure, dimensions, and data types.
- Detect anomalies, outliers, and corrupted entries.
- Test underlying statistical assumptions (normality, collinearity, homoscedasticity).
- Uncover relationships between feature variables and target outcomes.

### 3. Practical Example
When starting any machine learning or analytical project on this website (such as California Housing, Titanic, or Credit Risk), EDA comes first: inspecting distributions with histograms, checking correlations with heatmaps, and checking feature null counts before running algorithms.

### 4. Python Code Example
\`\`\`python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Fundamental EDA starter template
def inspect_dataset(df: pd.DataFrame):
    print("--- Shape & Types ---")
    print(df.info())
    print("\n--- Summary Statistics ---")
    print(df.describe(include='all'))
    print("\n--- Missing Values ---")
    print(df.isnull().sum()[df.isnull().sum() > 0])

inspect_dataset(df)
\`\`\``;
}
