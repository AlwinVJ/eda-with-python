import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/NYC-Airbnb-Room-Type-Predictor
// Figures are real outputs exported from notebook execution and pipeline assets.
const images = import.meta.glob<{ default: string }>("../../assets/projects/nyc-airbnb/*.png", {
  eager: true,
});

const fig = (name: string) =>
  images[`../../assets/projects/nyc-airbnb/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/nyc-airbnb/${name}`;

export const nycAirbnb: ProjectDetails = {
  overview: {
    body: [
      "NYC Airbnb Room Type Predictor is an end-to-end machine learning classification project designed to predict the accommodation room type of New York City Airbnb listings based on their physical location, price dynamics, booking policies, and host activity metrics.",
      "In the short-term vacation rental marketplace, accurate listing classification is essential for catalog integrity, search filtering, algorithmic price recommendation, and regulatory compliance. NYC municipal housing regulations impose stringent restrictions on short-term rentals (such as Local Law 18), distinguishing sharply between unhosted entire homes and hosted private or shared rooms.",
      "Analyzing 48,895 listings from the New York City Airbnb Open Data repository, this project establishes a complete data science lifecycle: from exploratory geospatial analysis and addressing severe class imbalance (where shared rooms represent only ~2.4% of all listings) using SMOTE, through hyperparameter-tuned ensemble classification with Scikit-Learn pipelines, to production-ready serving via a FastAPI REST API and an interactive web interface.",
      "Project Status: In Progress. The core data preprocessing, SMOTE-balanced training pipelines, Random Forest model tuning, FastAPI serving backend, and responsive dashboard are functional. Ongoing work focuses on advanced hyperparameter tuning with gradient boosting architectures, extracting NLP signals from listing titles, and cloud containerization.",
    ],
  },
  problem: {
    body: [
      "Online short-term rental platforms often encounter listing misclassifications, ambiguous host submissions, or incomplete catalog entries. Correctly categorizing accommodation types introduces specific real-world challenges:",
    ],
    bullets: [
      "Severe Target Imbalance: The target distribution is heavily skewed toward Entire home/apt (~52.0%) and Private room (~45.7%), while Shared rooms account for merely ~2.4% (1,160 out of 48,895 listings). Naive classifiers easily achieve >80% accuracy by ignoring the minority class entirely.",
      "High Spatial and Price Variance: Manhattan and Brooklyn listings exhibit distinct pricing distributions and density compared to Queens, the Bronx, and Staten Island, requiring geographic coordinates and neighbourhood granularity.",
      "Extreme Outliers: Listing prices and minimum night requirements feature severe positive skewness, with prices reaching up to $10,000/night and minimum night requirements exceeding a full year, necessitating robust capping and scaling.",
      "Data Leakage Prevention: Ensuring all imputation, scaling, one-hot encoding, and synthetic oversampling (SMOTE) are strictly encapsulated within cross-validation folds and training sets without leaking test distribution data.",
    ],
  },
  objectives: {
    bullets: [
      "Perform end-to-end exploratory data analysis across 48,895 NYC Airbnb listings to uncover spatial, economic, and availability patterns",
      "Clean raw data by addressing missing values (e.g. 10,052 missing reviews_per_month), dropping non-predictive identifiers, and capping 99th-percentile outliers",
      "Engineer a modular, leakage-safe Scikit-Learn ColumnTransformer pipeline integrating median imputation, standard scaling, and one-hot encoding",
      "Formulate a multi-class classification strategy comparing Logistic Regression, Decision Tree, Gradient Boosting, and Random Forest baselines",
      "Resolve extreme minority-class underrepresentation using Synthetic Minority Over-sampling Technique (SMOTE) with k_neighbors=3",
      "Optimize model performance via RandomizedSearchCV with 3-fold cross-validation targeting Macro F1 score",
      "Evaluate generalization performance on an untouched 33% stratified test set (16,136 listings) with multi-class precision, recall, and confusion matrix auditing",
      "Build and serve a lightweight FastAPI REST microservice with Pydantic schema validation for real-time inference",
      "Develop an interactive web dashboard with NYC visual themes, preset listings, and instant room-type probability predictions",
    ],
  },
  dataset: {
    body: [
      "The project analyzes the New York City Airbnb Open Data dataset (AB_NYC_2019.csv) originally published on Kaggle by Dgomonov, comprising 48,895 listing records across 16 initial attributes.",
      "Target Variable: room_type, a 3-class categorical variable describing the accommodation level: Entire home/apt (25,409 listings, 51.97%), Private room (22,326 listings, 45.66%), and Shared room (1,160 listings, 2.37%).",
    ],
    images: [
      {
        src: fig("room-type-distribution.png"),
        caption:
          "Target Variable Distribution: Severe class imbalance across room types in NYC listings — Entire home/apt (25,409), Private room (22,326), and Shared room (1,160).",
      },
      {
        src: fig("room-type-pie-chart.png"),
        caption:
          "Proportional Breakdown of Room Types: Shared rooms constitute only 2.4% of the total dataset, highlighting the critical need for resampling.",
      },
    ],
    subsections: [
      {
        title: "Model Feature Schema (10 Predictor Features)",
        body: [
          "After data cleaning and schema pruning, the modeling pipeline consumes 10 verified predictor variables:",
        ],
        steps: [
          "latitude (float64): Precise geographic latitude coordinate of the listing (range: 40.49979 to 40.91306).",
          "longitude (float64): Precise geographic longitude coordinate of the listing (range: -74.24442 to -73.71299).",
          "price (float64): Nightly listing price in USD. Raw range: $0 to $10,000 (capped at the 99th percentile: $799).",
          "minimum_nights (int64): Minimum booking duration required by host. Raw range: 1 to 1,250 nights (capped at 99th percentile: 45 nights).",
          "number_of_reviews (int64): Total lifetime count of customer reviews received (range: 0 to 629).",
          "reviews_per_month (float64): Average monthly review velocity (10,052 listings had null values due to zero reviews; imputed with 0.0).",
          "calculated_host_listings_count (int64): Total properties managed by the host (range: 1 to 327; proxies commercial vs individual operators).",
          "availability_365 (int64): Number of days listing is available for booking per calendar year (range: 0 to 365 days).",
          "neighbourhood_group (object / categorical): The borough in which listing is situated: Manhattan (21,661), Brooklyn (20,104), Queens (5,666), Bronx (1,091), and Staten Island (373).",
          "neighbourhood (object / categorical): Specific local district or neighbourhood name (221 unique neighbourhoods, e.g. Williamsburg, Bedford-Stuyvesant, Harlem).",
        ],
      },
    ],
  },
  workflow: {
    body: [
      "The end-to-end architecture follows a rigorous 8-stage pipeline from raw data exploration to interactive real-time inference:",
    ],
    steps: [
      "Data Ingestion & Integrity Audit: Loaded 48,895 rows; verified datatypes, checked duplicates (0 duplicates found), and identified column-wise null values.",
      "Data Cleaning & Feature Pruning: Dropped uninformative identifier and free-text fields (id, name, host_id, host_name, last_review) and imputed reviews_per_month with 0.0.",
      "Outlier Treatment: Analyzed heavy-tailed distributions and capped extreme values at the 99th percentile for price ($799) and minimum_nights (45 nights).",
      "Exploratory Data Analysis: Visualized geographic clusters, borough price variations, correlation matrices, and class skewness.",
      "Stratified Train-Test Splitting: Split data into 67% training (32,759 listings) and 33% test (16,136 listings), maintaining exact class proportions across splits.",
      "Pipeline Transformation & Resampling: Wrapped numerical imputer + standard scaler and categorical one-hot encoder inside a ColumnTransformer, followed by SMOTE resampling on the training split.",
      "Model Benchmarking & Tuning: Evaluated 4 algorithmic architectures using 3-fold cross-validation; optimized Random Forest hyperparameters via RandomizedSearchCV.",
      "Production Serving & Web UI: Exported serialized model pipeline (Model_Pipeline.pkl), built FastAPI prediction endpoints, and constructed an interactive frontend with NYC styling.",
    ],
    images: [
      {
        src: fig("pipeline.png"),
        caption:
          "High-Level Project Pipeline Architecture: From Kaggle dataset ingestion, ColumnTransformer preprocessing, and SMOTE resampling to model training and FastAPI inference.",
      },
    ],
  },
  preprocessing: {
    body: [
      "Data cleaning and preprocessing steps were designed to prevent information leakage while ensuring standard numerical scales and clean categorical encodings.",
    ],
    images: [
      {
        src: fig("numerical-feature-distributions.png"),
        caption:
          "Numerical Feature Distributions: Histograms showing severe right-skewness in price, minimum_nights, reviews_per_month, and host listings.",
      },
      {
        src: fig("numerical-boxplots.png"),
        caption:
          "Boxplot Outlier Diagnostics: Highlighting extreme positive outliers prior to 99th percentile Winsorization / capping.",
      },
    ],
    steps: [
      "Dropping High-Cardinality & Identifier Fields: Dropped 'id', 'name', 'host_id', 'host_name', and 'last_review' as they either present identification leakage or require deep NLP processing.",
      "Missing Value Imputation: Imputed 'reviews_per_month' missing values (10,052 rows, ~20.5% of dataset) with 0.0, representing listings that have received zero lifetime reviews.",
      "99th Percentile Outlier Capping: Capped 'price' at $799 (top 1% reached up to $10,000) and 'minimum_nights' at 45 (top 1% reached up to 1,250 nights) to mitigate leverage distortion.",
      "Numerical Transformation Pipeline: Numerical features (latitude, longitude, price, minimum_nights, number_of_reviews, reviews_per_month, calculated_host_listings_count, availability_365) are processed with SimpleImputer(strategy='median') followed by StandardScaler().",
      "Categorical Transformation Pipeline: Categorical features ('neighbourhood_group' and 'neighbourhood') are processed with SimpleImputer(strategy='most_frequent') followed by OneHotEncoder(handle_unknown='ignore').",
      "SMOTE Balancing on Train Split: Applied Synthetic Minority Over-sampling Technique (SMOTE) with k_neighbors=3 to equalize class representations in the training set (yielding 17,024 balanced samples per class).",
    ],
    subsections: [
      {
        title: "SMOTE Oversampling Impact",
        body: [
          "Before SMOTE, the training split consisted of 17,024 Entire home/apt, 14,958 Private room, and only 777 Shared room instances. Applying SMOTE synthesized realistic interpolated minority samples in high-dimensional feature space, balancing all three classes to 17,024 instances each.",
        ],
        images: [
          {
            src: fig("smote-class-distribution.png"),
            caption:
              "Class Distribution Before and After SMOTE: The severe minority class deficit (777 shared room samples) was equalized to 17,024 samples per class in training.",
          },
        ],
      },
    ],
  },
  eda: {
    body: [
      "Exploratory Data Analysis revealed meaningful spatial segregation, pricing differentials, and availability patterns across New York City's boroughs and room types.",
    ],
    images: [
      {
        src: fig("neighbourhood-group-distribution.png"),
        caption:
          "Listing Count by Borough: Manhattan (21,661) and Brooklyn (20,104) comprise over 85% of all New York City listings, followed by Queens (5,666).",
      },
      {
        src: fig("geographic-distribution.png"),
        caption:
          "Geographic Coordinates Map of NYC Listings: Spatial density plot mapping latitude and longitude coordinates across the five boroughs.",
      },
      {
        src: fig("price-by-room-type.png"),
        caption:
          "Price Distribution Across Room Types: Entire home/apt exhibits substantially higher median prices and broader interquartile ranges than Private and Shared rooms.",
      },
      {
        src: fig("correlation-heatmap.png"),
        caption:
          "Numerical Correlation Heatmap: Correlation between features showing moderate relationships between review metrics and low collinearity among predictors.",
      },
    ],
    subsections: [
      {
        title: "1. Spatial and Borough Dynamics",
        body: [
          "Manhattan accounts for the majority of Entire home/apt listings, commanding the highest average prices ($196.88 average). In contrast, Brooklyn and Queens feature a higher proportion of Private rooms. Shared rooms are sparsely distributed across all boroughs, with minor clusters in Upper Manhattan, Queens, and Brooklyn transit hubs.",
        ],
      },
      {
        title: "2. Economic Differentiation Across Room Types",
        body: [
          "Price provides strong discriminative signal for separating Entire homes from Private and Shared rooms. While Entire homes have median prices around $160, Private rooms cluster closely around $70, and Shared rooms center around $45. However, price alone cannot reliably distinguish Private from Shared rooms, making availability, review cadence, and minimum stay critical secondary indicators.",
        ],
      },
    ],
  },
  modeling: {
    body: [
      "Model development benchmarked four distinct classification algorithms under 3-fold cross-validation, both before and after applying SMOTE resampling. Random Forest emerged as the superior model and was subsequently tuned.",
    ],
    subsections: [
      {
        title: "1. Baseline vs SMOTE Resampling Benchmark",
        body: [
          "Initial models evaluated on raw imbalanced training data suffered from poor minority-class recall. Incorporating SMOTE significantly elevated Macro F1 across all architectures:",
        ],
        bullets: [
          "Logistic Regression: Accuracy 0.659 -> 0.675; Macro F1 0.522 -> 0.677 (+15.5% Macro F1 improvement)",
          "Decision Tree: Accuracy 0.782 -> 0.826; Macro F1 0.648 -> 0.824 (+17.6% Macro F1 improvement)",
          "Gradient Boosting: Accuracy 0.850 -> 0.828; Macro F1 0.705 -> 0.827 (+12.2% Macro F1 improvement)",
          "Random Forest: Accuracy 0.849 -> 0.895; Macro F1 0.734 -> 0.895 (+16.1% Macro F1 improvement)",
        ],
      },
      {
        title: "2. Hyperparameter Optimization",
        body: [
          "Random Forest was selected for hyperparameter tuning using RandomizedSearchCV across 20 candidate configurations (60 total fits) optimizing Macro F1:",
        ],
        bullets: [
          "Tuning Parameter Space: n_estimators [50, 100, 200], max_depth [10, 20, 30, None], min_samples_split [2, 5, 10], min_samples_leaf [1, 2, 4], max_features ['sqrt', 'log2'].",
          "Optimal Hyperparameters: n_estimators=100, max_depth=30, min_samples_split=2, min_samples_leaf=1, max_features='sqrt'.",
          "Best Cross-Validation Score: Best mean cross-validation Macro F1 reached 0.7303.",
        ],
      },
    ],
  },
  evaluation: {
    body: [
      "The final tuned model pipeline was evaluated against the untouched 33% stratified test set comprising 16,136 listings (8,385 Entire home/apt, 7,368 Private room, 383 Shared room).",
    ],
    images: [
      {
        src: fig("confusion-matrix.png"),
        caption:
          "Test Set Confusion Matrix: Detailed classification counts across the 16,136 untouched test listings, highlighting strong separation between Entire Home and Private Room.",
      },
    ],
    subsections: [
      {
        title: "1. Test Set Performance Metrics",
        body: [
          "The model achieved an overall accuracy of 85.40% and a Macro F1 score of 0.7393 on the untouched holdout dataset:",
        ],
        bullets: [
          "Overall Test Accuracy: 85.40% (13,780 correct classifications out of 16,136 test samples)",
          "Macro Average: Precision 0.8003 | Recall 0.7064 | F1-Score 0.7393",
          "Weighted Average: Precision 0.8521 | Recall 0.8540 | F1-Score 0.8509",
        ],
      },
      {
        title: "2. Per-Class Performance Breakdown",
        body: [
          "Evaluating metrics across individual classes demonstrates strong reliability for dominant accommodation types and quantified trade-offs for the rare class:",
        ],
        bullets: [
          "Entire home/apt: Precision: 0.87 | Recall: 0.88 | F1-Score: 0.88 (Support: 8,385 listings)",
          "Private room: Precision: 0.84 | Recall: 0.85 | F1-Score: 0.84 (Support: 7,368 listings)",
          "Shared room: Precision: 0.69 | Recall: 0.39 | F1-Score: 0.50 (Support: 383 listings)",
        ],
      },
      {
        title: "3. Confusion Matrix Diagnostic Insights",
        body: ["Analysis of test set misclassifications reveals key operational insights:"],
        bullets: [
          "Entire Home vs. Private Room: High discrimination accuracy. Only 980 entire homes were predicted as private rooms, and 1,061 private rooms were predicted as entire homes.",
          "Shared Room Detection: Of 383 true shared rooms, 149 were correctly classified, 166 were predicted as private rooms, and 68 as entire homes. The lower recall (39%) reflects the overlap in price and feature distributions between low-cost private rooms and shared spaces.",
        ],
      },
    ],
  },
  deployment: {
    body: [
      "The trained pipeline is operationalized using a production-ready FastAPI backend paired with an interactive modern web dashboard.",
    ],
    subsections: [
      {
        title: "1. FastAPI REST Service Architecture",
        body: [
          "The backend (main.py) loads the serialized Model_Pipeline.pkl (incorporating the Scikit-Learn ColumnTransformer and tuned Random Forest classifier) and exposes inference endpoints:",
        ],
        steps: [
          "GET /: Health check and service status probe confirming operational availability.",
          "POST /predict: Primary inference endpoint. Accepts validated JSON payloads, maps inputs to expected dataframe schemas, computes class probabilities, and returns predicted room type with confidence score.",
        ],
      },
      {
        title: "2. Pydantic Input Validation Schema",
        body: [
          "Inputs are validated against strict Pydantic schemas ensuring valid coordinate bounds and numeric ranges:",
        ],
        bullets: [
          "Request Payload: { latitude: 40.7128, longitude: -74.0060, price: 150.0, minimum_nights: 2, number_of_reviews: 25, reviews_per_month: 1.5, calculated_host_listings_count: 1, availability_365: 180, neighbourhood_group: 'Manhattan', neighbourhood: 'Harlem' }",
          "Response Payload: { 'Predicted_room_type': 'Entire home/apt', 'Probability': 0.82 }",
        ],
      },
      {
        title: "3. Web Interface Implementation",
        body: [
          "The repository includes a responsive frontend dashboard (index.html, style.css, script.js) with NYC styling:",
        ],
        bullets: [
          "Quick-Fill Presets: One-click buttons to load realistic sample profiles (Manhattan Loft, Brooklyn Studio, Queens Shared Room).",
          "Dynamic Visual Feedback: Dynamic building height animations and ambient NYC skyline lights that respond to classification results.",
          "Real-Time Error Handling: Client-side validation ensuring valid geographic boundaries and positive prices prior to API dispatch.",
        ],
      },
    ],
  },
  learnings: {
    body: [
      "This project showcases end-to-end data science principles, from handling severe multi-class imbalance to deploying reproducible ML microservices.",
    ],
    bullets: [
      "SMOTE Resampling Criticality: In multi-class classification with extreme imbalance (~2.4% minority class), SMOTE prevented the model from collapsing into trivial majority-class predictions, lifting Macro F1 from 0.52 to 0.74.",
      "Pipeline Encapsulation: Embedding SimpleImputer, StandardScaler, and OneHotEncoder directly into a ColumnTransformer eliminated data leakage between training folds and test evaluations.",
      "Status — In Progress & Future Roadmap:",
      "1. Text Signal Extraction: Extracting TF-IDF or transformer embedding features from the listing 'name' column (e.g. keywords like 'sofa', 'bunk', 'studio', 'penthouse') to enhance shared room discrimination.",
      "2. Advanced Gradient Boosting: Benchmarking LightGBM, CatBoost, and XGBoost with focal loss formulations tailored for imbalanced multi-class problems.",
      "3. Cost-Sensitive Threshold Tuning: Optimizing class decision thresholds rather than relying strictly on argmax probabilities.",
      "4. Containerization & Cloud Deployment: Packaging the FastAPI application with Docker and deploying to a public cloud container platform.",
    ],
  },
};
