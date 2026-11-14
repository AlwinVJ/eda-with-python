import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/california_house_price_prediction_model
// Figures are real outputs exported from notebook execution and reproducible analytical scripts.
const images = import.meta.glob<{ default: string }>("../../assets/projects/house-price/*.png", {
  eager: true,
});

const fig = (name: string) =>
  images[`../../assets/projects/house-price/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/house-price/${name}`;

export const housePricePrediction: ProjectDetails = {
  overview: {
    body: [
      "California House Price Prediction is an end-to-end, production-oriented machine learning regression project designed to estimate median house values across California census block groups from geographic, demographic, housing, and ocean-proximity features.",
      "In property valuation, urban planning, and real-estate mortgage underwriting, automated valuation models (AVMs) provide scalable, objective benchmarks for asset appraisal and regional economic assessment. Rather than evaluating individual standalone properties, this system models median housing values at the census block-group level — the smallest geographical unit published by the U.S. Census Bureau, typically encompassing 600 to 3,000 residents.",
      "Because the target variable (median_house_value) is continuous and measured in U.S. dollars, this task is formulated as a supervised regression problem. The project demonstrates the complete machine learning lifecycle: exploratory data diagnostics, leakage-free pipeline engineering, baseline linear regression modeling, multi-model cross-validation, systematic grid-search hyperparameter tuning, residual diagnostics, model serialization with Joblib, and interactive cloud deployment using Streamlit.",
    ],
  },
  problem: {
    body: [
      "Estimating residential property values from raw census indicators presents significant tabular machine learning challenges:",
    ],
    bullets: [
      "Complex Spatial & Non-Linear Interactions: Housing prices depend non-linearly on geographic coordinates, coastal proximity, and clustered regional economies that linear regression lines cannot capture.",
      "Extreme Feature Skewness & Outliers: Housing counts, population figures, and household numbers span multiple orders of magnitude with severe right tails.",
      "Missing Observations & Categorical Encoding: The dataset contains missing values in total_bedrooms and a multi-class categorical ocean proximity indicator requiring standardized transformation.",
      "Target Capping Artifact: Median house values in the census data are artificially capped at $500,001, introducing a prominent ceiling effect that distorts linear loss functions.",
      "Production Deployment Requirements: The trained preprocessing transformations and regression estimators must be encapsulated in a single reproducible artifact for zero-leakage real-time inference.",
    ],
  },
  objectives: {
    bullets: [
      "Explore and profile 20,640 California census block-group records across 9 predictor features",
      "Diagnose missing-value mechanisms and verify absence of duplicate entries",
      "Construct a modular Scikit-Learn ColumnTransformer pipeline encapsulating median imputation, standard scaling, and one-hot encoding",
      "Establish an un-tuned Linear Regression baseline to define the minimum benchmark performance",
      "Benchmark 5 diverse regression algorithms using 5-fold shuffled cross-validation (Linear Regression, Ridge, Lasso, Random Forest, and HistGradientBoostingRegressor)",
      "Optimize the best-performing algorithm using GridSearchCV across 243 hyperparameter combinations (1,215 fits)",
      "Evaluate generalization performance on an untouched 20% test split using RMSE, MAE, and R² scores",
      "Conduct in-depth residual diagnostics (Residuals vs Predictions and Residual Error Distributions)",
      "Serialize the fitted end-to-end pipeline into house_price_model.joblib for production serving",
      "Deploy an interactive web application on Streamlit Community Cloud supporting real-time user inference",
    ],
  },
  dataset: {
    body: [
      "The project analyzes the classic California Housing Prices dataset (20,640 observations × 10 columns) derived from the 1990 California census. Each row describes an aggregate census block group rather than an individual house.",
      "The prediction target is median_house_value, a continuous numeric variable expressing the median home valuation in U.S. dollars (range: $14,999 to $500,001). Verification confirmed that the dataset contains zero duplicate rows (df.duplicated().sum() == 0).",
    ],
    subsections: [
      {
        title: "Feature Dictionary & Block-Group Schema Breakdown",
        body: [
          "The dataset spans 9 predictive features encompassing spatial coordinates, demographic counts, household occupancy, and location categories:",
        ],
        steps: [
          "longitude (float64): Geographic longitude coordinate in degrees west (range: -124.35° to -114.31°). Higher negative values indicate locations farther west.",
          "latitude (float64): Geographic latitude coordinate in degrees north (range: 32.54° to 41.95°). Higher values indicate locations farther north.",
          "housing_median_age (float64): Median age of residential buildings within the block group in years (range: 1 to 52 years, capped at 52).",
          "total_rooms (float64): Total aggregate count of rooms across all households in the block group (range: 2 to 39,320 rooms).",
          "total_bedrooms (float64): Total aggregate count of bedrooms across all households in the block group (207 missing values, range: 1 to 6,445 bedrooms).",
          "population (float64): Total number of permanent residents residing within the census block group (range: 3 to 35,682 residents).",
          "households (float64): Total count of occupied housing units / households in the block group (range: 1 to 6,082 households).",
          "median_income (float64): Median household earnings for the block group, measured in tens of thousands of USD (e.g. 8.3252 represents $83,252/year; range: 0.4999 to 15.0001).",
          "ocean_proximity (object / categorical): Geographical proximity tier relative to the Pacific coastline across 5 categories: <1H OCEAN (9,136), INLAND (6,551), NEAR OCEAN (2,658), NEAR BAY (2,290), and ISLAND (5).",
        ],
      },
    ],
  },
  workflow: {
    body: [
      "The project implements a structured, reproducible 8-stage regression engineering lifecycle:",
    ],
    steps: [
      "Exploratory Data Analysis: Ingest housing.csv, inspect schema dimensions (20,640 × 10), verify zero duplicate records, quantify missing values, and explore feature distributions.",
      "Leakage-Safe Train/Test Partitioning: Segregate data into an 80% training set (16,512 rows) and a 20% test set (4,128 rows) using random_state=42, isolating the test set from all downstream fitting.",
      "Modular Preprocessing Pipeline: Construct Scikit-Learn ColumnTransformer handling numerical median imputation + standardization, and categorical most-frequent imputation + one-hot encoding.",
      "Baseline Model Benchmarking: Fit a simple Linear Regression model without tuning or cross-validation to establish baseline performance metrics (Test RMSE: $70,059 | R²: 0.625).",
      "5-Fold Cross-Validation Comparison: Benchmark Linear Regression, Ridge, Lasso, Random Forest, and HistGradientBoostingRegressor using shuffled 5-fold cross-validation.",
      "Hyperparameter Tuning via GridSearchCV: Optimize the top-performing candidate (HistGradientBoostingRegressor) across 243 hyperparameter candidates (1,215 fits) targeting negative RMSE.",
      "Final Held-Out Evaluation & Diagnostics: Retrain the optimal configuration on the full training split, evaluate on the untouched test split (Test RMSE: $47,319 | R²: 0.829), and inspect residual plots.",
      "Serialization & Streamlit Cloud Deployment: Persist the fitted pipeline into house_price_model.joblib and serve through an interactive Streamlit web dashboard.",
    ],
  },
  eda: {
    body: [
      "Comprehensive exploratory data analysis uncovered essential spatial concentrations, heavy right-skewed distributions, multi-collinearity among volume features, and the defining impact of median income on house prices.",
    ],
    images: [
      {
        src: fig("california-geographic-distribution.png"),
        caption:
          "Geographic Coordinates Map: California housing values plotted by longitude and latitude with circle size representing census population. High valuations cluster along coastal urban hubs (San Francisco Bay Area, Los Angeles, San Diego).",
      },
      {
        src: fig("target-distribution.png"),
        caption:
          "Target Distribution (median_house_value): Right-skewed distribution spanning $14,999 to $500,001, exhibiting a distinct artificial capping ceiling spike at $500,001.",
      },
      {
        src: fig("median-income-vs-house-value.png"),
        caption:
          "Median Income vs Median House Value: Strong positive linear correlation (r = 0.69). A distinct horizontal band at $500,001 marks the data collection price ceiling.",
      },
      {
        src: fig("correlation-heatmap.png"),
        caption:
          "Numerical Feature Correlation Heatmap: Strong collinearity between total_rooms, total_bedrooms, population, and households (r > 0.85).",
      },
      {
        src: fig("numerical-feature-distributions.png"),
        caption:
          "Numerical Feature Distributions: Histograms showing severe right-skewness and long tails in total_rooms, total_bedrooms, population, and households.",
      },
      {
        src: fig("ocean-proximity-distribution.png"),
        caption:
          "Ocean Proximity Distribution: Frequency count of categorical categories: <1H OCEAN (9,136), INLAND (6,551), NEAR OCEAN (2,658), NEAR BAY (2,290), and ISLAND (5).",
      },
    ],
    subsections: [
      {
        title: "1. Spatial and Geographic Clustering",
        body: [
          "Plotting latitude versus longitude reveals the physical map of California. The highest median house values (red clusters) are strictly concentrated along the coastal Pacific rim — specifically the San Francisco Bay Area and Greater Los Angeles / Orange County. In contrast, inland Central Valley communities exhibit significantly lower median property valuations, demonstrating that location and ocean proximity are paramount determinants of real-estate pricing.",
        ],
      },
      {
        title: "2. Target Distribution & Artificial Price Ceiling",
        body: [
          "The target variable median_house_value has a mean of $206,855.82 and a median of $179,700.00. The distribution exhibits a heavy right tail with a pronounced anomaly: a high vertical spike at $500,001 containing 965 observations (4.68% of the dataset). This peak corresponds to an artificial survey truncation ceiling where census values above $500,000 were clipped.",
        ],
      },
      {
        title: "3. Income Correlation and Volume Collinearity",
        body: ["Correlation analysis reveals two critical structural phenomena in the dataset:"],
        bullets: [
          "Income Dominance (r = 0.69): median_income is by far the strongest linear predictor of median_house_value. Neighborhood purchasing power directly bounds local home prices.",
          "Size Metric Multicollinearity: total_rooms, total_bedrooms, population, and households exhibit mutual correlation coefficients exceeding 0.85 (e.g. households vs total_bedrooms r = 0.98). While linear models suffer from collinear variance inflation, tree-based gradient boosting models handle correlated variables gracefully.",
          "Missing Value Audit: Only total_bedrooms contains missing values (207 missing rows, 1.00%), suitable for robust median imputation.",
        ],
      },
    ],
  },
  preprocessing: {
    body: [
      "Data preprocessing transforms raw numerical and categorical variables into standardized mathematical tensors. To prevent data leakage, all preprocessing transformations are encapsulated within a unified Scikit-Learn ColumnTransformer and fitted strictly on the training partition.",
    ],
    steps: [
      "Missing Value Imputation: Numeric missing values in total_bedrooms (207 rows) are imputed using SimpleImputer(strategy='median') to resist outlier distortion. Categorical missing values are guarded using SimpleImputer(strategy='most_frequent').",
      "Numerical Standardization: Numeric features (longitude, latitude, housing_median_age, total_rooms, total_bedrooms, population, households, median_income) are scaled to zero mean and unit variance using StandardScaler().",
      "Categorical One-Hot Encoding: ocean_proximity is converted into binary indicator columns using OneHotEncoder(handle_unknown='ignore'), preventing unseen deployment categories from throwing fatal runtime exceptions.",
      "Composite ColumnTransformer: Merged numeric and categorical pipelines into a single preprocessor object passed directly into downstream estimator pipelines.",
      "Consistent Inference Guarantee: Embedding preprocessing inside the final Joblib pipeline ensures that runtime inference in Streamlit applies the exact same imputation medians and scaling parameters without data leakage.",
    ],
  },
  features: {
    body: [
      "The dataset was segregated into features (X) and target (y) followed by an 80/20 train-test split:",
    ],
    bullets: [
      "Training Partition (80%): 16,512 census block records used for cross-validation, baseline modeling, and hyperparameter tuning.",
      "Testing Partition (20%): 4,128 census block records held in complete isolation to provide an unbiased generalization benchmark.",
      "Random State: Seeded with random_state=42 for deterministic reproducibility.",
      "Outlier Profiling: Numerical features exhibit extreme positive skewness (e.g. population reaches 35,682 while median is 1,166). Rather than deleting valid dense communities, non-linear tree ensembles were selected to naturally partition extreme values.",
    ],
    images: [
      {
        src: fig("outlier-boxplots.png"),
        caption:
          "Numerical Feature Boxplots: Visualizing outliers across housing attributes. Size attributes feature long right tails corresponding to high-density census tracts.",
      },
    ],
  },
  modeling: {
    body: [
      "Five diverse regression algorithms spanning linear baselines, regularized estimators, and non-linear ensembles were evaluated using 5-fold cross-validation on the training set:",
    ],
    steps: [
      "Linear Regression (OLS): Standard Ordinary Least Squares baseline fitting linear hyperplanes.",
      "Ridge Regression (L2): Linear regression with L2 Tikhonov regularization, penalizing large coefficient weights to mitigate multicollinearity.",
      "Lasso Regression (L1): Linear regression with L1 Least Absolute Shrinkage regularization, driving uninformative coefficients strictly to zero.",
      "Random Forest Regressor: Non-parametric ensemble of 100 de-correlated decision trees aggregating predictions via bagging.",
      "HistGradientBoostingRegressor: Modern histogram-based gradient boosting (inspired by LightGBM), binning continuous features into 256 integer bins to accelerate split finding and model non-linear spatial interactions.",
    ],
  },
  statisticalAnalysis: {
    body: [
      "Model selection and hyperparameter optimization followed a disciplined cross-validation methodology using 5-fold shuffled KFold (random_state=42).",
    ],
    images: [
      {
        src: fig("model-comparison-rmse.png"),
        caption:
          "5-Fold Cross-Validation Comparison (Mean RMSE): HistGradientBoostingRegressor achieves the lowest prediction error ($48,141), outperforming linear models by over $20,400.",
      },
    ],
    subsections: [
      {
        title: "1. Cross-Validation Model Comparison Benchmark",
        body: [
          "Evaluating all 5 candidate pipelines across 5 folds on the 16,512-row training dataset (scored via negative RMSE, MAE, and R²):",
        ],
        bullets: [
          "HistGradientBoostingRegressor (Winner): CV RMSE = $48,140.81 · CV MAE = $32,193.56 · CV R² = 0.827",
          "Random Forest Regressor: CV RMSE = $49,344.98 · CV MAE = $32,214.17 · CV R² = 0.818",
          "Ridge Regression: CV RMSE = $68,595.62 · CV MAE = $49,664.33 · CV R² = 0.648",
          "Lasso Regression: CV RMSE = $68,603.23 · CV MAE = $49,667.26 · CV R² = 0.648",
          "Linear Regression (Baseline): CV RMSE = $68,604.16 · CV MAE = $49,667.16 · CV R² = 0.648",
        ],
      },
      {
        title: "2. Hyperparameter Optimization via GridSearchCV",
        body: [
          "Because HistGradientBoostingRegressor produced the lowest cross-validation error, it was selected for systematic hyperparameter tuning using GridSearchCV across 243 parameter candidates (1,215 total fits) on the training set:",
        ],
        bullets: [
          "learning_rate: [0.03, 0.05, 0.1] — optimal: 0.1 (controls shrinkage rate per boosting tree)",
          "max_depth: [None, 3, 6] — optimal: None (allows trees to grow until leaf constraints are met)",
          "max_leaf_nodes: [15, 31, 63] — optimal: 63 (expands tree representational capacity)",
          "min_samples_leaf: [20, 50, 100] — optimal: 20 (guards against overfitting in terminal leaves)",
          "l2_regularization: [0.0, 0.1, 1.0] — optimal: 0.1 (adds modest ridge penalty to leaf values)",
          "Tuned CV RMSE: Improved to $47,327.97 (a reduction of $812.84 over default HistGB and $21,276.19 over Linear Regression).",
        ],
      },
    ],
  },
  evaluation: {
    body: [
      "Generalization performance was verified by evaluating the final tuned pipeline on the completely untouched 4,128-record test partition.",
    ],
    images: [
      {
        src: fig("residuals-vs-predictions.png"),
        caption:
          "Residuals vs Predictions: Residual errors (y - ŷ) plotted against predicted valuations. Residuals remain centered around 0 with an upper horizontal ceiling corresponding to the $500,001 census cap.",
      },
      {
        src: fig("residual-distribution.png"),
        caption:
          "Residual Error Distribution: Histogram of prediction errors showing a bell-shaped, approximately normal distribution centered at zero.",
      },
    ],
    subsections: [
      {
        title: "1. Final Performance Metrics (Train vs Held-Out Test)",
        body: [
          "Comparing the un-tuned Linear Regression baseline against the final Tuned HistGradientBoostingRegressor:",
        ],
        bullets: [
          "Baseline Linear Regression (Train): RMSE = $68,433.94 · MAE = $49,594.84 · R² = 0.650",
          "Baseline Linear Regression (Test): RMSE = $70,059.19 · MAE = $50,670.49 · R² = 0.625",
          "Final Tuned HistGB (Train): RMSE = $36,250.50 · MAE = $24,604.66 · R² = 0.902",
          "Final Tuned HistGB (Held-Out Test): RMSE = $47,319.30 · MAE = $31,253.32 · R² = 0.829",
        ],
      },
      {
        title: "2. Residual Analysis and Diagnostics",
        body: [
          "Residual diagnostics (residuals = y_test - test_final_pred) validate model assumptions and expose error behaviors:",
        ],
        bullets: [
          "Error Centering: The residual distribution is tightly centered at $0 with symmetrical variance across the bulk of predictions, confirming unbiased estimation.",
          "Ceiling Boundary Effect: On the Residuals vs Predictions plot, a prominent downward diagonal line appears at predicted values approaching $500,000. This occurs because the ground-truth census data was clipped at $500,001, preventing the model from predicting higher actual prices.",
          "Variance Homoscedasticity: Prediction errors remain relatively uniform across the $100,000 to $400,000 range, representing over 85% of California housing markets.",
        ],
      },
    ],
  },
  results: {
    body: [
      "The empirical results demonstrate that non-linear histogram-based gradient boosting vastly outperforms linear and regularized baselines for spatial property valuation.",
    ],
    bullets: [
      "Substantial Error Reduction: Tuned HistGB reduced test RMSE from $70,059.19 (Linear Regression) to $47,319.30 — an absolute error reduction of $22,739.89 (32.46% improvement).",
      "High Explained Variance: The final model achieves an R² of 0.829 on unseen test data, indicating that 82.9% of the variation in California median home prices is explained by the 9 features.",
      "Practical Underwriting Accuracy: The Mean Absolute Error (MAE) of $31,253 on test homes demonstrates practical real-world precision for macro-level regional appraisal.",
      "Feature Primacy: Geographical coordinates combined with median income and coastal proximity explain the vast majority of neighborhood price variance.",
    ],
  },
  deployment: {
    body: [
      "The final model was serialized using Joblib as house_price_model.joblib (743 KB), bundling the fitted ColumnTransformer preprocessing pipeline and trained HistGradientBoostingRegressor into a unified binary artifact.",
      "The application is deployed publicly on Streamlit Community Cloud, providing an interactive, zero-installation web interface for instant property valuation.",
    ],
    subsections: [
      {
        title: "1. Production Streamlit Cloud Application",
        body: [
          "The interactive web dashboard (app.py) offers real-time property valuation powered by the serialized Joblib pipeline:",
        ],
        bullets: [
          "Interactive Sliders & Numeric Inputs: Users adjust longitude, latitude, housing median age, total rooms, total bedrooms, population, households, median income, and ocean proximity.",
          "Cached Model Initialization: Uses @st.cache_resource to load house_price_model.joblib into server memory once, ensuring instant sub-50ms inference times.",
          "Dynamic Currency Formatting: Formats predictions as localized currency strings (e.g. $466,109) with informative property tier summaries.",
          "Responsive Dark & Light Themes: Custom CSS styling with intuitive card components and visual coordinate helpers.",
        ],
      },
      {
        title: "2. Inference Pipeline & Execution Example",
        body: [
          "Input attributes are converted into a single-row Pandas DataFrame and passed directly to the saved pipeline:",
        ],
        steps: [
          "Input Profile: Longitude = -122.230°W, Latitude = 37.880°N (Berkeley Hills, SF Bay), Housing Age = 41 years, Rooms = 880, Bedrooms = 129, Population = 322, Households = 126, Median Income = $83,252 (8.3252), Ocean Proximity = 'NEAR BAY'.",
          "Pipeline Execution: DataFrame passed to hgb_best.predict(input_df).",
          "Predicted Value: Outputs an estimated median house value of $466,109.45 — accurately reflecting the premium valuation of affluent Bay Area coastal enclaves.",
        ],
      },
      {
        title: "3. Live Demonstration and Source Code Links",
        body: [
          "Access the live interactive Streamlit application and source code repository below:",
        ],
        bullets: [
          "Live Streamlit Web App: https://californiahousepricepredictionmodel.streamlit.app/",
          "GitHub Source Repository: https://github.com/AlwinVJ/california_house_price_prediction_model",
          "Complete Project Report: California_House_Price_Prediction_Sample_Project_Report.pdf",
        ],
      },
    ],
  },
  recommendations: {
    body: [
      "Deploying machine learning models for real-estate valuation requires understanding institutional limitations and domain boundaries:",
    ],
    bullets: [
      "Block-Group Aggregate vs Individual Home: The model predicts median valuations for an entire census block group (hundreds of homes). It does not account for parcel-specific square footage, interior renovations, lot topography, or school districts.",
      "Censored Target Artifact: Predictions near $500,000 underestimate ultra-luxury estates due to the historical census truncation ceiling.",
      "Temporal & Inflationary Calibration: 1990 census figures reflect historical dollar baselines. Deploying in modern lending environments requires price-index multipliers (e.g. Case-Shiller Index) or retraining on contemporary MLS transaction feeds.",
      "Decision Support Governance: Automated valuations should be used as screening filters and preliminary appraisal benchmarks, accompanied by licensed human appraiser inspections for loan origination.",
    ],
  },
  learnings: {
    body: [
      "The California House Price Prediction project demonstrates core lessons across the practical machine learning lifecycle:",
    ],
    bullets: [
      "Pipeline-Centric Architecture: Coupling preprocessing and estimators within Scikit-Learn pipelines is the only reliable guarantee against data leakage during cross-validation and deployment.",
      "Histogram Boosting Supremacy: HistGradientBoostingRegressor delivers state-of-the-art tabular accuracy while training significantly faster than standard Random Forests.",
      "Cross-Validation Necessity: 5-fold cross-validation prevented overfitting and provided honest performance bounds prior to tuning.",
      "Hyperparameter Optimization Pays Off: GridSearchCV tuning reduced CV RMSE from $48,141 to $47,328, demonstrating the tangible value of systematic search.",
      "Future Enhancements: Engineer ratio features (rooms_per_household, bedrooms_per_room, population_per_household), benchmark LightGBM and CatBoost, add prediction confidence intervals, and containerize with Docker.",
    ],
  },
};
