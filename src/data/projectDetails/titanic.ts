import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/titanic_preprocessing
// Figures are real outputs exported from notebook execution and reproducible analytical scripts.
const images = import.meta.glob<{ default: string }>("../../assets/projects/titanic/*.png", {
  eager: true,
});

const fig = (name: string) =>
  images[`../../assets/projects/titanic/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/titanic/${name}`;

export const titanicDetails: ProjectDetails = {
  overview: {
    body: [
      "The Titanic Survival Preprocessing & Exploratory Data Analysis project is an extensive investigation into tabular data preparation, missing-value imputation, outlier diagnostics, and feature transformation on the classic Titanic passenger dataset.",
      "In modern data science, exploratory data analysis (EDA) and data preprocessing are not isolated phases — they function as an iterative feedback loop. EDA diagnoses distribution shapes, identifies anomalies, uncovers subgroup relationships, and evaluates data quality. Data preprocessing then translates those empirical findings into leak-free, mathematically sound transformations required to prepare raw data for machine learning models.",
      "Using Python, Pandas, NumPy, Matplotlib, Seaborn, and Scikit-Learn, this project implements a rigorous end-to-end data preparation pipeline. It moves beyond naïve global imputation by leveraging multi-feature context, assessing the economic validity of outliers before choosing treatments, and benchmarking scaling algorithms for downstream classification algorithms.",
    ],
  },
  problem: {
    body: [
      "Predicting passenger survival in the RMS Titanic maritime disaster requires modeling tabular demographic and ticketing records. However, raw passenger records cannot be fed directly into machine learning algorithms: numerical features operate on wildly different scales, categorical fields require mathematical encoding, and multiple critical features suffer from severe missingness or extreme skewness.",
      "The primary technical problem is to establish a robust, leakage-safe data preparation methodology that preserves subtle domain signals while converting messy real-world data into clean numerical feature tensors.",
    ],
    bullets: [
      "Diagnose data quality issues across 891 passenger records without discarding legitimate historical observations",
      "Resolve heavy missingness in Cabin (77.10%), Age (19.87%), and Embarked (0.22%) using contextual domain-aware imputation",
      "Extract structural signals from high-cardinality location records before feature pruning",
      "Quantify numerical outliers across Age, Fare, SibSp, and Parch using the Interquartile Range (IQR) rule",
      "Evaluate the mathematical and business consequences of outlier removal versus Winsorization capping and log transformation",
      "Benchmark Scikit-Learn feature scaling techniques (StandardScaler, MinMaxScaler, RobustScaler) on skewed numerical distributions",
      "Design a leakage-safe Train-Test partition architecture for downstream classification modeling",
    ],
  },
  objectives: {
    bullets: [
      "Examine dataset structure, schemas, and confirm absence of duplicate records",
      "Conduct univariate and bivariate EDA on survival rates across gender, passenger class, and family structures",
      "Implement contextual fare-based imputation for missing Embarked ports",
      "Engineer the 'Deck' feature from sparse Cabin strings to preserve spatial information",
      "Perform class-and-gender stratified median imputation for missing Age values",
      "Detect outliers with IQR boxplot analysis and evaluate non-destructive handling strategies",
      "Contrast StandardScaler, MinMaxScaler, and RobustScaler on numerical variables",
      "Formulate categorical encoding strategies (One-Hot vs Ordinal) tailored to feature properties",
      "Structure an end-to-end reproducible preprocessing pipeline for predictive machine learning",
    ],
  },
  dataset: {
    body: [
      "The project utilizes the classic Titanic Passenger Dataset (891 rows × 12 columns). Each record represents an individual passenger aboard the maiden voyage of the RMS Titanic in April 1912.",
      "Dataset verification confirmed that no duplicate rows exist (df.duplicated().sum() == 0). The target variable is 'Survived', a binary classification indicator where 0 denotes non-survival (549 passengers, 61.62%) and 1 denotes survival (342 passengers, 38.38%).",
    ],
    subsections: [
      {
        title: "Feature Dictionary & Schema Breakdown",
        body: [
          "The dataset spans 12 columns encompassing numerical measurements, categorical identifiers, and text fields:",
        ],
        steps: [
          "PassengerId (int64): Unique sequential passenger identifier (range 1–891). Uninformative for modeling.",
          "Survived (int64): Binary target variable (0 = Did Not Survive, 1 = Survived).",
          "Pclass (int64): Ticket socio-economic class (1 = 1st Class / Upper, 2 = 2nd Class / Middle, 3 = 3rd Class / Lower).",
          "Name (object / string): Full passenger name including formal titles (Mr., Mrs., Miss., Master, Rev., Dr.).",
          "Sex (object / string): Biological sex of the passenger ('male' = 577 [64.76%], 'female' = 314 [35.24%]).",
          "Age (float64): Fractional or integer age in years (177 missing, range 0.42–80.0 years).",
          "SibSp (int64): Number of siblings or spouses traveling aboard with the passenger (range 0–8).",
          "Parch (int64): Number of parents or children traveling aboard with the passenger (range 0–6).",
          "Ticket (object / string): Ticket number string (681 unique values across single and shared tickets).",
          "Fare (float64): Passenger ticket price in British Pounds (range £0.00–£512.33, right skewed).",
          "Cabin (object / string): Cabin room number (687 missing values, 147 unique strings).",
          "Embarked (object / string): Port of embarkation ('S' = Southampton [644], 'C' = Cherbourg [168], 'Q' = Queenstown [77], 2 missing).",
        ],
      },
    ],
  },
  workflow: {
    body: [
      "The complete analytical and preprocessing workflow connects raw ingestion to model-ready feature sets through a structured 9-stage pipeline:",
    ],
    steps: [
      "Raw Data Ingestion & Schema Audit: Load titanic.csv, verify data dimensions (891 × 12), inspect memory usage, and check data types.",
      "Integrity & Duplicate Verification: Run duplicate record detection (df.duplicated().sum()), confirming 0 duplicate rows.",
      "Missing Value Diagnosis: Quantify missing value counts and percentages across Cabin (77.10%), Age (19.87%), and Embarked (0.22%).",
      "Contextual Embarked Imputation: Cross-reference ticket number, passenger class, and mean fare per embarkation port to impute missing Embarked values with 'C'.",
      "Spatial Feature Engineering & Cabin Pruning: Extract the first character from Cabin to create 'Deck' and drop the raw 77% missing Cabin column.",
      "Class-Stratified Age Imputation: Compute median ages grouped by Pclass and Sex, imputing missing ages while preserving demographic variance.",
      "IQR Outlier Profiling: Apply the Interquartile Range method across Age, Fare, SibSp, and Parch, generating boxplots and quantifying bounds.",
      "Non-Destructive Outlier Treatment: Evaluate removal vs capping vs log1p transformation for Fare, reducing skewness from 4.79 to 0.39 without discarding data.",
      "Feature Scaling & Transformation Benchmarking: Fit and compare StandardScaler, MinMaxScaler, and RobustScaler across numerical features.",
      "Leakage-Safe Partitioning Architecture: Specify an 80/20 stratified train-test split for downstream machine learning validation.",
    ],
  },
  preprocessing: {
    body: [
      "Data preprocessing transforms messy raw records into clean, reliable inputs. In this dataset, three features contained missing values: Cabin (687 missing, 77.10%), Age (177 missing, 19.87%), and Embarked (2 missing, 0.22%). Each required a tailored, domain-aware handling strategy.",
    ],
    images: [
      {
        src: fig("missing-values-analysis.png"),
        caption:
          "Missing Value Percentage by Feature: Cabin (77.10%), Age (19.87%), Embarked (0.22%), and all other 9 columns complete.",
      },
      {
        src: fig("embarked-fare-context.png"),
        caption:
          "Contextual Imputation: Mean Fare by Embarkation Port vs Missing Passengers ($80.00). Missing records align closely with Cherbourg ($59.95) rather than Southampton ($27.24).",
      },
    ],
    subsections: [
      {
        title: "1. Missing Value Diagnosis & Summary",
        body: [
          "A systematic check using df.isnull().sum() identified missingness concentrated in three attributes:",
        ],
        bullets: [
          "Cabin: 687 missing records (77.10% missing) — excessive missingness, unsuitable for direct imputation.",
          "Age: 177 missing records (19.87% missing) — moderate missingness in a key predictive variable.",
          "Embarked: 2 missing records (0.22% missing) — minimal missingness requiring targeted contextual imputation.",
          "Remaining 9 features: 0 missing records (100% complete data).",
        ],
      },
      {
        title: "2. Contextual Imputation for Embarked Port",
        body: [
          "The Embarked column had exactly two missing values: Passenger 62 (Miss Amelie Icard, age 38) and Passenger 829 (Mrs George Nelson Stone, age 62). Rather than blindly applying mode imputation ('S', the most frequent port), the records were examined in context.",
          "Both passengers traveled in 1st Class (Pclass = 1), shared Ticket number 113572, occupied Cabin B28, and each paid a fare of £80.00. Group-level fare analysis across ports revealed:",
        ],
        bullets: [
          "Cherbourg (C): Mean fare = £59.95 (1st class passengers concentrated here)",
          "Southampton (S): Mean fare = £27.24 (overall mode)",
          "Queenstown (Q): Mean fare = £13.28 (primarily 3rd class passengers)",
        ],
        steps: [
          "A fare of £80.00 in 1st class is substantially higher than the typical Southampton or Queenstown fare.",
          "Historical passenger manifests corroborate that Mrs Stone and her maid Miss Icard boarded at Cherbourg.",
          "Imputed both missing entries with 'C': df.loc[df['Embarked'].isnull(), 'Embarked'] = 'C'.",
        ],
      },
      {
        title: "3. Cabin Feature Treatment & Deck Extraction",
        body: [
          "With 77.10% missing values and 147 unique alphanumeric strings, standard imputation (mean, median, or mode) would introduce severe artificial distortion. However, outright deletion of the column would destroy valuable spatial information regarding passenger quarters.",
          "The first character of each cabin string designates the ship deck (A through G, plus T). A new feature 'Deck' was engineered: df['Deck'] = df['Cabin'].str[0]. This extracted deck distribution: C (59), B (47), D (33), E (32), A (15), F (13), G (4), T (1), and 687 NaNs (unassigned/unknown). The raw, uninformative 'Cabin' column was then dropped from the dataset.",
        ],
      },
      {
        title: "4. Class-Stratified Demographic Age Imputation",
        body: [
          "Age is an essential predictor of survival because evacuation protocols prioritized women and children. With 177 missing values (19.87%), dropping rows would sacrifice nearly 20% of the dataset.",
          "Distribution analysis revealed an Age skewness of 0.389 (approximately symmetric, normal-like). However, median age differed substantially across passenger classes and genders:",
        ],
        bullets: [
          "1st Class Passengers: Median Age = 37.0 years (affluent, older demographic)",
          "2nd Class Passengers: Median Age = 29.0 years (middle class)",
          "3rd Class Passengers: Median Age = 24.0 years (younger immigrants and laborers)",
          "Female median = 27.0 years vs Male median = 29.0 years",
        ],
        steps: [
          "A single global mean (29.7) or median (28.0) would underestimate 1st-class passenger ages and overestimate 3rd-class passenger ages.",
          "Implemented group-wise median imputation: df['Age'] = df.groupby(['Pclass', 'Sex'])['Age'].transform(lambda x: x.fillna(x.median())).",
          "This preserved the distinct class-age gradients while avoiding data leakage from the target variable.",
        ],
        images: [
          {
            src: fig("age-distribution-by-class.png"),
            caption:
              "Age Distribution Across Passenger Classes: Demonstrates why class-stratified median imputation (37 yrs in Class 1 vs 24 yrs in Class 3) is superior to a single global median.",
          },
        ],
      },
    ],
  },
  features: {
    body: [
      "Feature engineering and transformation bridge exploratory data cleaning and algorithm ingestion. This phase encompasses categorical feature encoding, systematic outlier detection using the Interquartile Range (IQR) rule, and outlier handling evaluation.",
    ],
    subsections: [
      {
        title: "1. Categorical Feature Encoding Strategy",
        body: [
          "Machine learning models require numerical feature vectors. Encoding techniques must match the mathematical properties of each categorical variable:",
        ],
        bullets: [
          "Nominal Variables (Sex, Embarked, Deck): These features possess no natural ordering. Applying Label Encoding (e.g. S=0, C=1, Q=2) would impose an artificial ordinal relationship that misleads linear models and distance metrics. Therefore, One-Hot Encoding (pd.get_dummies or OneHotEncoder with drop='first') is the mathematically sound approach.",
          "Ordinal Variables (Pclass): Passenger class possesses an inherent hierarchy (1st Class > 2nd Class > 3rd Class). Preserving its natural integer representation (1, 2, 3) retains this monotonic socio-economic ordering.",
          "Text Identifiers (Name, Ticket): Name contains extracted formal titles (Mr, Mrs, Miss, Master) that reflect social hierarchy; raw strings are dropped after title extraction.",
        ],
      },
      {
        title: "2. Outlier Detection via the Interquartile Range (IQR)",
        body: [
          "Outliers are observations that deviate markedly from the overall distribution. In skewed or non-normal data, the Interquartile Range (IQR) rule is preferred over standard Z-scores because the median and quartiles are resilient to extreme values.",
          "Formula: IQR = Q3 - Q1; Lower Bound = Q1 - 1.5 × IQR; Upper Bound = Q3 + 1.5 × IQR. Values outside these thresholds are flagged as statistical outliers.",
        ],
        steps: [
          "Age Outliers: Lower Bound = -0.25, Upper Bound = 57.75. Found 33 passengers above 57.75 years. Analysis confirmed these were valid elderly passengers (e.g. Miss Elizabeth Bonnell, age 58; Mr Edward Wheadon, age 66). They represent natural biological diversity rather than data-entry errors, and were retained intact.",
          "Fare Outliers: Lower Bound = -26.72, Upper Bound = 65.63. Found 116 passengers paying fares > £65.63 (up to £512.33). Highly right-skewed (skewness = 4.79). These reflect luxury suites and multi-passenger family tickets.",
          "SibSp Outliers: Lower Bound = -1.5, Upper Bound = 2.5. Found 46 passengers traveling with 3 to 8 siblings or spouses (large immigrant families).",
          "Parch Outliers: Lower Bound = 0.0, Upper Bound = 0.0. Found 213 passengers traveling with 1 or more parents/children (since the 75th percentile is 0).",
        ],
        images: [
          {
            src: fig("boxplot-age.png"),
            caption:
              "Original Notebook Boxplot — Age: Highlights 33 valid elderly passengers above the 57.75-year threshold.",
          },
          {
            src: fig("boxplot-fare.png"),
            caption:
              "Original Notebook Boxplot — Fare: Illustrates severe right skewness with 116 points extending up to £512.33.",
          },
          {
            src: fig("boxplot-sibsp.png"),
            caption:
              "Original Notebook Boxplot — SibSp: Detects large sibling/spouse groupings beyond the 2.5-person threshold.",
          },
          {
            src: fig("boxplot-parch.png"),
            caption:
              "Original Notebook Boxplot — Parch: 75% of passengers traveled without parents/children, flagging non-zero values.",
          },
        ],
      },
      {
        title: "3. Outlier Treatment Evaluation (Fare Column)",
        body: [
          "Three candidate treatments were tested in the notebook to address the 116 Fare outliers:",
        ],
        steps: [
          "Option A — Row Trimming / Removal: Removing rows where Fare > £65.63 reduced the dataset from 891 to 775 records — discarding 116 valid 1st-class records (13.02% of the dataset). Rejected as destructive and unrepresentative.",
          "Option B — Capping (Winsorization): Clamping extreme values at the upper threshold (fare_capped = df['Fare'].clip(upper=65.6344)). While this controls variance, it obliterates the separation between moderate 1st-class cabins and ultra-luxury suites.",
          "Option C — Log Transformation: Applied log1p transformation (np.log1p(df['Fare'])). Skewness dropped dramatically from 4.787 to 0.395. This compressed the dynamic range while strictly preserving rank order and retaining 100% of the sample records.",
        ],
        images: [
          {
            src: fig("fare-distribution-and-log.png"),
            caption:
              "Fare Distribution Before and After Log Transformation: Original right-skewed distribution (skewness: 4.79) transformed via log1p into a balanced distribution (skewness: 0.39).",
          },
        ],
      },
    ],
  },
  eda: {
    body: [
      "Exploratory Data Analysis revealed key behavioral, socio-economic, and demographic patterns governing survival during the maritime evacuation.",
    ],
    images: [
      {
        src: fig("survival-distribution.png"),
        caption:
          "Survival Disparities: Female passengers achieved a 74.2% survival rate compared to 18.9% for males; 1st-class passengers survived at 63.0% compared to 24.2% in 3rd class.",
      },
      {
        src: fig("correlation-heatmap.png"),
        caption:
          "Pearson Correlation Heatmap: Pclass (r = -0.34) and Fare (r = +0.26) exhibit the strongest numerical correlations with passenger survival.",
      },
    ],
    subsections: [
      {
        title: "1. Demographic & Socio-Economic Survival Disparities",
        body: [
          "Univariate and bivariate frequency cross-tabulations exposed massive survival inequalities across passenger cohorts:",
        ],
        bullets: [
          "Gender Protocol: Female survival rate reached 74.20% (233 / 314 survived) compared to only 18.89% for males (109 / 577 survived), demonstrating the rigorous enforcement of 'women and children first'.",
          "Passenger Class Hierarchy: 1st Class survival was 62.96% (136 / 216), 2nd Class was 47.28% (87 / 184), while 3rd Class plummeted to 24.24% (119 / 491). Physical proximity to lifeboats on upper decks and ticket priority created a direct survival advantage.",
          "Combined Intersection: 1st-class females achieved a 96.8% survival rate, whereas 3rd-class males suffered an 86.5% mortality rate.",
        ],
      },
      {
        title: "2. Multivariate Feature Correlation Analysis",
        body: [
          "Computing Pearson correlation coefficients across numerical attributes after stratified imputation highlighted key feature interactions:",
        ],
        bullets: [
          "Pclass vs Survived (r = -0.34): Strong negative linear correlation indicating that lower-numbered classes (1st class) had substantially higher survival probabilities.",
          "Fare vs Survived (r = +0.26): Statistically significant positive correlation; passengers who paid higher fares gained access to premium decks and prioritized evacuation.",
          "Age vs Pclass (r = -0.41): Older passengers possessed the wealth required for 1st-class tickets, explaining why median age dropped from 37 (Class 1) to 24 (Class 3).",
          "SibSp vs Parch (r = +0.41): Moderate positive correlation reflecting that family members traveled in cohesive units.",
        ],
      },
    ],
  },
  statisticalAnalysis: {
    body: [
      "Feature scaling standardizes the numerical range of independent variables. Machine learning algorithms that rely on Euclidean distances (KNN, SVM, K-Means) or gradient descent optimization (Logistic Regression, Neural Networks) are biased toward features with large magnitudes. Three Scikit-Learn scalers were benchmarked on Age, Fare, SibSp, and Parch.",
    ],
    images: [
      {
        src: fig("scaling-comparison.png"),
        caption:
          "Comparison of Feature Scaling Techniques: Original unscaled distributions contrasted against StandardScaler, MinMaxScaler, and RobustScaler.",
      },
    ],
    subsections: [
      {
        title: "1. StandardScaler (Z-Score Standardization)",
        body: [
          "Formula: z = (x - μ) / σ. Centers each feature to a mean of 0 and scales to unit variance (standard deviation = 1).",
          "Assessment: StandardScaler works well for approximately bell-shaped distributions like Age. However, because it incorporates the sample mean and variance, it is highly sensitive to extreme outliers. The £512.33 fare produces a Z-score of +9.64, distorting the standard deviation for the remaining 99% of passengers.",
        ],
      },
      {
        title: "2. MinMaxScaler (Normalization)",
        body: [
          "Formula: x' = (x - x_min) / (x_max - x_min). Linearly scales values into a strict closed interval [0, 1].",
          "Assessment: MinMaxScaler preserves exact zero values and works well when bounded intervals are required. However, the presence of the maximum fare (£512.33) crushes over 95% of the fare distribution into a narrow band between 0.00 and 0.15, destroying variance.",
        ],
      },
      {
        title: "3. RobustScaler (Median & IQR Scaling)",
        body: [
          "Formula: x' = (x - Q2) / (Q3 - Q1). Centers values around the median and scales by the Interquartile Range (75th percentile minus 25th percentile).",
          "Assessment: Because neither the median nor the IQR is influenced by extreme outliers, RobustScaler is the mathematically superior choice for un-clipped tabular datasets containing legitimate outliers like Fare, SibSp, and Parch.",
        ],
      },
    ],
  },
  learnings: {
    body: [
      "The investigation provides key methodological takeaways for data preparation, outlier governance, and leakage-safe machine learning engineering.",
    ],
    bullets: [
      "Context-Driven Imputation Over Naïve Mode Filling: Imputing missing Embarked records with 'C' based on £80 ticket and cabin clustering demonstrates the superiority of domain context over blind global mode imputation.",
      "Outlier Legitimacy: Outliers should never be removed automatically. The 116 high-fare observations represented genuine first-class passengers; discarding them would introduce survivorship bias. Log transformation (log1p) successfully compressed skewness from 4.79 to 0.39 while preserving 100% of data rows.",
      "Feature Representation Matters: Sparse high-cardinality fields like Cabin can yield valuable structural signal when transformed into deck categories.",
      "Scaler Selection Depends on Distribution Shape: RobustScaler is the most resilient scaling technique for heavily skewed tabular attributes containing valid extreme values.",
      "Leakage Prevention in Downstream Splitting: Imputation parameters (class medians) and scaler statistics (mean/std/IQR) must strictly be fitted on training folds (X_train) and applied to testing folds (X_test) to avoid optimistic performance inflation.",
      "Scope Boundary: While the repository establishes the complete cleaning, imputation, outlier analysis, and scaling pipeline, baseline predictive modeling (Logistic Regression, Random Forest, Gradient Boosting) is designated as future downstream work.",
    ],
  },
};
