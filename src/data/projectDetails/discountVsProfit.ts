import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/discount_vs_profit_extensive_EDA
// Figures are real outputs exported directly from the project's analytical notebooks and reports.
const images = import.meta.glob<{ default: string }>(
  "../../assets/projects/discount-vs-profit/*.png",
  { eager: true },
);

const fig = (name: string) =>
  images[`../../assets/projects/discount-vs-profit/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/discount-vs-profit/${name}`;

export const discountVsProfit: ProjectDetails = {
  overview: {
    body: [
      "Retail Discount Strategy Analysis is an extensive Exploratory Data Analysis (EDA) and statistical investigation examining how retail discount strategies influence profitability using historical transaction data from a U.S. Superstore (2014–2017).",
      "While retail organizations commonly rely on discounting to stimulate sales volume, improve inventory turnover, and acquire customers, unchecked discounting frequently erodes unit economics and generates severe net losses. This study bridges descriptive analytics, statistical hypothesis testing, and business intelligence to identify loss-making discount thresholds and formulate data-driven pricing policies.",
      "The analysis follows the industry-standard CRISP-DM (Cross-Industry Standard Process for Data Mining) methodology, addressing the core business question: 'How do discount levels affect retail profitability, and what pricing strategy maximizes sustainable profit?'",
    ],
  },
  problem: {
    body: [
      "Retail pricing strategies often prioritize top-line sales growth without accounting for product-specific margin elasticity. Across commercial organizations, uncontrolled discounting frequently results in 'profitless prosperity'—where transaction volumes and gross revenue increase while net operating profit collapses.",
      "The primary business challenge is determining the precise discount ceiling beyond which transactions become consistently unprofitable across product categories, customer segments, and geographical regions.",
    ],
    bullets: [
      "Identify the empirical discount threshold where retail sales transition into financial losses",
      "Analyze sales volume, profit, and profit margin distributions across 9,994 transactions",
      "Examine category-level vulnerability across Furniture, Office Supplies, and Technology",
      "Evaluate profitability across customer segments (Consumer, Corporate, Home Office)",
      "Investigate regional variance and detect high-risk geographic discount combinations",
      "Test operational factors including shipping duration and U.S. Federal Holiday impacts",
      "Statistically validate observed relationships using ANOVA, t-tests, and correlation metrics",
      "Translate statistical findings into executive pricing governance and discount rules",
    ],
  },
  dataset: {
    body: [
      "Primary Dataset: Sample Superstore Dataset (Kaggle). Contains 9,994 commercial retail transactions recorded between 2014 and 2017 across the United States, spanning 21 original attributes.",
      "Core Financial & Operational Attributes: Sales (transaction revenue), Profit (net financial return), Quantity (units purchased), Discount (percentage price reduction from 0% to 80%), Profit Margin (engineered ratio of Profit to Sales).",
      "Categorical Dimensions: Product Category (Furniture, Office Supplies, Technology), 17 Sub-Categories (such as Binders, Paper, Chairs, Tables, Phones, Copiers), Customer Segment (Consumer, Corporate, Home Office), Region (Central, East, South, West), and Ship Mode (Standard Class, Second Class, First Class, Same Day).",
      "External Dataset: U.S. Federal Holidays (2014–2018), generated using pandas.tseries.holiday.USFederalHolidayCalendar, merged on Order Date to evaluate whether federal holiday shopping periods exhibit distinct margin dynamics.",
    ],
  },
  workflow: {
    body: [
      "The project employs a structured 9-stage analytical pipeline following CRISP-DM principles, ensuring reproducible transformations from raw transaction logs into executive pricing recommendations.",
    ],
    steps: [
      "Raw Dataset Acquisition: Ingested primary Superstore records (9,994 rows) and external US Federal Holidays calendar.",
      "Data Quality Assessment: Evaluated schema definitions, data types, null counts, and record uniqueness.",
      "Data Cleaning: Removed uninformative identifiers (Row ID), zero-variance constants (Country), and ambiguous postal codes; pruned duplicate records.",
      "Feature Engineering: Created temporal components (Order Year, Month, Quarter), operational shipping duration (Days to Ship), and financial metrics (Profit Margin, Discount Bracket, Is Loss, Is Outlier).",
      "Holiday Data Enrichment: Merged federal holiday calendar on Order Date to create a holiday transaction flag.",
      "Exploratory Data Analysis: Conducted univariate, bivariate, time-series, and multivariate investigations to map profit dynamics.",
      "Statistical Validation: Applied One-Way ANOVA, independent sample t-tests, and Pearson/Spearman correlation tests to verify hypotheses.",
      "Business Insights: Synthesized empirical findings across product lines, customer segments, and regional territories.",
      "Pricing Recommendations: Formulated actionable governance rules and executive discount guardrails.",
    ],
    images: [
      {
        src: fig("workflow.png"),
        caption:
          "Analytical Workflow: Systematic 9-stage CRISP-DM methodology from data preparation to pricing strategy.",
      },
    ],
  },
  preprocessing: {
    body: [
      "A rigorous data preparation pipeline was executed in Jupyter Notebook (04_Data_Preparation.ipynb) to transform raw transactional records into an analysis-ready tabular dataset.",
    ],
    steps: [
      "Duplicate Validation: Detected 1 exact duplicate transaction in the raw data (duplicated across all transactional attributes) and dropped it, ensuring accurate summary statistics.",
      "Missing Value Inspection: Confirmed zero missing entries across all primary financial, product, and customer dimensions (aside from 11 missing postal codes in Burlington, VT).",
      "Column Relevance Assessment: Evaluated each attribute against business objectives and pruned 3 columns:",
      "Removed 'Row ID': Arbitrary sequential index providing no predictive or analytical value.",
      "Removed 'Country': Constant value ('United States' across all 9,994 rows) with zero variance.",
      "Removed 'Postal Code': Numeric representation of geographical codes that could be misinterpreted as quantitative measurements and contained missing values.",
      "Datetime Conversion: Converted Order Date and Ship Date strings to native pandas datetime64 objects to enable temporal parsing.",
      "Calendar Enrichment: Left-merged holiday records on Order Date and imputed unmapped dates as non-holiday transactions.",
    ],
  },
  features: {
    body: [
      "To address specific analytical and business questions, eight business-oriented features were engineered from the cleaned attributes:",
    ],
    steps: [
      "Order Year, Order Month, Order Quarter: Extracted from Order Date to enable annual growth, monthly seasonality, and quarterly performance analysis.",
      "Days to Ship: Calculated as (Ship Date - Order Date) in days to measure operational fulfillment duration.",
      "Profit Margin: Calculated as Profit / Sales, creating a normalized scale-independent measure of transaction profitability.",
      "Discount Bracket: Discretized continuous discounts into 6 business tiers: '0%', '1-10%', '11-20%', '21-30%', '31-50%', and '51%+' using bins [-0.01, 0, 0.10, 0.20, 0.30, 0.50, 1.00].",
      "Is Loss: Boolean indicator (Profit < 0) isolating loss-making transactions from profitable orders.",
      "Is Outlier: Boolean flag based on 1.5 × IQR boundaries on Sales and Profit, tagging extreme observations without discarding real financial impact.",
      "Is Holiday: Boolean indicator identifying transactions placed on official U.S. Federal Holidays.",
    ],
  },
  researchQuestions: {
    body: [
      "The entire analytical journey was structured around answering nine specific business and research questions:",
    ],
    steps: [
      "RQ1: What are the key distributional and descriptive characteristics of the retail dataset?",
      "RQ2: Does increasing discount percentage systematically reduce net profitability and profit margin?",
      "RQ3: At what specific discount threshold do retail transactions begin to consistently generate financial losses?",
      "RQ4: Does the impact of discounting on profitability differ significantly across product categories and sub-categories?",
      "RQ5: Which customer segments and geographic regions generate the highest profit, and which are most vulnerable to discounts?",
      "RQ6: Do operational factors such as shipping duration or federal holiday timing exert a meaningful influence on profitability?",
      "RQ7: Can observed relationships between discounts, categories, and profits be validated through formal statistical tests?",
      "RQ8: What data-driven pricing policies and discount thresholds should executive leadership implement to maximize sustainable profit?",
      "RQ9: Which specific combinations of discount bracket, product category, region, and customer segment maximize profitability?",
    ],
  },
  eda: {
    body: [
      "The exploratory data analysis phase investigated the dataset across multiple perspectives to diagnose the root causes of retail margin erosion.",
    ],
    subsections: [
      {
        title: "1. Univariate Analysis — Distribution of Key Metrics",
        body: [
          "Sales and Profit distributions exhibit heavy right-skewness with long positive tails and significant negative extremes in Profit. While median sales and profits are modest, extreme high-value transactions contribute disproportionately to total revenue, while large losses drive overall margin compression.",
          "Discounts are concentrated at 0% (nearly 48% of all transactions receive no discount) and between 11% and 20%. Discounts exceeding 30% are comparatively rare but responsible for massive cumulative losses. Shipping duration is consistently centered at 4 days with standard fulfillment operations.",
        ],
        images: [
          {
            src: fig("sales-distribution.png"),
            caption:
              "Sales Distribution: Highly right-skewed sales distribution with long positive tail.",
          },
          {
            src: fig("profit-distribution.png"),
            caption:
              "Profit Distribution: Heavy tails with pronounced negative outliers representing severe transaction losses.",
          },
          {
            src: fig("discount-distribution.png"),
            caption:
              "Discount Distribution: Concentration at zero discount and 20%, with aggressive discounts occurring less frequently.",
          },
          {
            src: fig("profit-margin-distribution.png"),
            caption:
              "Profit Margin Distribution: Bimodal density showing healthy margins clustered around 30% and severe negative margins below -50%.",
          },
        ],
      },
      {
        title: "2. Categorical Analysis — Business Dimensions",
        body: [
          "Office Supplies represents approximately 60% of total order volume, followed by Furniture (21%) and Technology (19%). Sub-categories such as Binders, Paper, and Furnishings dominate transaction counts.",
          "Consumer customers represent over 51% of orders, Corporate accounts contribute 30%, and Home Office accounts for 19%. Geographically, the West and East regions generate the largest transaction counts, while the South accounts for the smallest volume.",
        ],
        images: [
          {
            src: fig("avg-discount-by-category.png"),
            caption:
              "Average Discount by Category: Furniture receives the highest average discount rate despite having the lowest operating margins.",
          },
          {
            src: fig("avg-discount-by-sub-category.png"),
            caption:
              "Average Discount by Sub-Category: Binders, Machines, and Tables experience the highest average discount levels.",
          },
          {
            src: fig("avg-profit-by-sub-category.png"),
            caption:
              "Average Profit by Sub-Category: Copiers and Accessories deliver strong profits, whereas Tables and Bookcases incur steep average losses.",
          },
        ],
      },
      {
        title: "3. Time Series & Seasonality Analysis",
        body: [
          "Order volume exhibits consistent year-over-year expansion from 2014 through 2017, confirming strong underlying commercial growth.",
          "Monthly order distribution shows distinct seasonality: order volumes remain relatively steady from January through August, before surging during Q4 (September, November, and December) driven by corporate budget expirations and end-of-year retail demand.",
        ],
        images: [
          {
            src: fig("orders-per-year.png"),
            caption:
              "Annual Order Volume: Sustained year-over-year commercial growth across the 2014–2017 study period.",
          },
          {
            src: fig("holiday-count-distribution.png"),
            caption:
              "Holiday vs Non-Holiday Transaction Counts: Federal holidays account for approximately 3% of total order volume.",
          },
        ],
      },
      {
        title: "4. Bivariate Analysis — Discount vs Profitability",
        body: [
          "Scatter and trend analysis reveals an unequivocal negative relationship between discount levels and profit. When discounts are absent (0%), average transaction profit is approximately $67 and profit margins average 30–35%.",
          "As discounts increase, transaction profitability deteriorates rapidly. The negative slope accelerates beyond the 20% mark, demonstrating that price cuts fail to stimulate sufficient unit volume to offset margin contraction.",
        ],
        images: [
          {
            src: fig("discount-vs-profit.png"),
            caption:
              "Discount vs Profit Scatterplot: Illustrating the rapid descent into steep financial losses as discounts increase.",
          },
          {
            src: fig("discount-vs-profit-margin.png"),
            caption:
              "Discount vs Profit Margin: Strong, direct linear collapse in margin percentage as discount percentage increases.",
          },
        ],
      },
      {
        title: "5. Discount Threshold Analysis — The 20% Loss-Making Cliff",
        body: [
          "Discretizing transactions into discount brackets reveals an unmistakable tipping point: transactions in the 0% and 1–10% discount brackets generate positive average profits (averaging $67 and $96 per order, respectively).",
          "At the 11–20% bracket, average profit remains marginally positive ($20 per order). However, once discounts cross 20% (into the 21–30% tier), average profit plunges into negative territory (-$45), accelerating to -$155 in the 31–50% bracket and -$72 in the 51%+ bracket.",
          "Conclusion: 20% represents the practical empirical ceiling. Beyond 20%, discounting transforms retail transactions into guaranteed net losses.",
        ],
        images: [
          {
            src: fig("profit-margin-by-discount-bracket.png"),
            caption:
              "Average Profit Margin by Discount Bracket: Sharp transition from positive margins below 20% to deep negative margins above 20%.",
          },
          {
            src: fig("profit-distribution-by-discount-bracket.png"),
            caption:
              "Profit Distribution Across Discount Brackets: Boxplot confirming heavy negative skew and severe losses beyond 20% discount.",
          },
        ],
      },
      {
        title: "6. Category & Regional Vulnerability Analysis",
        body: [
          "Furniture is the most financially fragile category: it experiences the highest average discount rates (17.4%) yet incurs the lowest average margins, with sub-categories such as Tables (-$32 average profit) and Bookcases generating substantial negative returns.",
          "Technology delivers the highest average profitability when sold at full price or moderate discount, but suffers enormous single-transaction losses when subjected to aggressive discounts due to high base unit prices.",
          "Office Supplies exhibits the greatest commercial stability, sustaining positive margins across modest discounts due to low cost structures.",
        ],
        images: [
          {
            src: fig("profit-by-category.png"),
            caption:
              "Profit Distribution Across Product Categories: Technology delivers the highest returns, while Furniture displays widespread loss-making orders.",
          },
        ],
      },
      {
        title: "7. Multivariate Analysis — Segment & Regional Interactions",
        body: [
          "Multivariate evaluation cross-tabulating discounts, customer segments, and geographic regions confirms that discounting dominates all other variables: regardless of customer tier or region, high discounts invariably produce net losses.",
          "Corporate customers generate the highest average returns in low-discount brackets (≈$100 in the 1–10% bracket), but still incur steep losses in the 31–50% bracket (≈-$140).",
          "The South region under 31–50% discounts emerges as the single most vulnerable business pocket, recording average losses of -$422 per order.",
        ],
        images: [
          {
            src: fig("correlation-heatmap.png"),
            caption:
              "Correlation Heatmap: Comprehensive matrix highlighting strong inverse correlations between discount and profitability metrics.",
          },
          {
            src: fig("discount-vs-profit-by-segment.png"),
            caption:
              "Discount vs Profit by Customer Segment: All segments follow an identical loss-making trajectory beyond 20% discount.",
          },
          {
            src: fig("discount-vs-profit-by-region.png"),
            caption:
              "Discount vs Profit by Region: Across all 4 U.S. regions, profitability collapses once discounts exceed 20%, with the South incurring extreme losses.",
          },
        ],
      },
    ],
  },
  statisticalAnalysis: {
    body: [
      "To ensure conclusions reflect genuine structural relationships rather than sample artifacts, formal statistical hypothesis tests were executed using SciPy and statsmodels.",
    ],
    subsections: [
      {
        title: "1. Correlation Analysis (Pearson & Spearman)",
        body: [
          "Hypothesis Tested: H₀: No correlation between discount and profitability metrics vs H₁: Significant linear/monotonic correlation.",
          "Discount vs Profit: Pearson r = -0.22 (p = 0.000 < 0.001). Statistically significant negative correlation, confirming that higher discounts correlate with lower dollar profits.",
          "Discount vs Profit Margin: Pearson r = -0.86 (p = 0.000 < 0.001). Exceptionally strong, statistically significant negative correlation, demonstrating that discount percentage directly erodes margin percentage across virtually all orders.",
        ],
        bullets: [
          "Discount vs Profit: r = -0.22 · p-value = 0.000 · Statistically Significant (p < 0.001)",
          "Discount vs Profit Margin: r = -0.86 · p-value = 0.000 · Highly Significant (p < 0.001)",
        ],
      },
      {
        title: "2. One-Way ANOVA — Profit Across Discount Brackets",
        body: [
          "Hypothesis Tested: H₀: Mean profit is equal across all discount brackets vs H₁: At least one discount bracket has a significantly different mean profit.",
          "Result: F-statistic = 120.89, p-value = 0.000000 (p < 0.001).",
          "Business Interpretation: Reject H₀. The variation in profit across discount brackets is overwhelmingly significant. This provides formal mathematical proof that discounting alters financial performance rather than exhibiting random fluctuation.",
        ],
        bullets: [
          "Test: One-Way ANOVA across 6 Discount Brackets",
          "F-statistic: 120.89",
          "p-value: 0.000000 (p < 0.001)",
          "Conclusion: Statistically Significant difference in profitability across discount tiers",
        ],
      },
      {
        title: "3. One-Way ANOVA — Profit Across Product Categories",
        body: [
          "Hypothesis Tested: H₀: Mean profit is identical across Furniture, Office Supplies, and Technology vs H₁: Category profits differ significantly.",
          "Result: F-statistic = 54.29, p-value = 0.000000 (p < 0.001).",
          "Business Interpretation: Reject H₀. Profitability differs substantially by category. Technology commands significantly higher margins, whereas Furniture suffers from systemic structural deficits under existing discount practices.",
        ],
        bullets: [
          "Test: One-Way ANOVA across 3 Product Categories",
          "F-statistic: 54.29",
          "p-value: 0.000000 (p < 0.001)",
          "Conclusion: Statistically Significant difference across Furniture, Office Supplies, and Technology",
        ],
      },
      {
        title: "4. One-Way ANOVA — Shipping Duration vs Profitability",
        body: [
          "Hypothesis Tested: H₀: Fulfillment duration (Days to Ship) influences order profit vs H₁: No operational relationship.",
          "Result: F-statistic = 0.62 (0.6173), p-value = 0.742099 (p > 0.05).",
          "Business Interpretation: Fail to reject H₀. There is no statistically significant relationship between shipping duration and transaction profit. Logistics transit times do not drive retail margins.",
        ],
        images: [
          {
            src: fig("days-to-ship-distribution.png"),
            caption:
              "Days to Ship Distribution: Fulfillment duration centered at 4 days with consistent operational delivery timelines.",
          },
        ],
        bullets: [
          "Test: One-Way ANOVA across Shipping Duration tiers",
          "F-statistic: 0.62",
          "p-value: 0.742 (p > 0.05)",
          "Conclusion: Not Statistically Significant",
        ],
      },
      {
        title: "5. Independent Sample t-Test — Holiday vs Non-Holiday Orders",
        body: [
          "Hypothesis Tested: H₀: Mean profit on U.S. Federal Holidays is identical to non-holiday days vs H₁: Holiday transactions yield different profitability.",
          "Result: t-statistic = -0.42 (-0.4158), p-value = 0.677782 (p > 0.05).",
          "Business Interpretation: Fail to reject H₀. Holiday sales exhibit no statistically significant difference in profitability compared to normal operating days. Retail margin health is determined by pricing strategy, not holiday timing.",
        ],
        bullets: [
          "Test: Independent Sample Two-Tailed t-Test",
          "t-statistic: -0.42",
          "p-value: 0.678 (p > 0.05)",
          "Conclusion: Not Statistically Significant",
        ],
      },
    ],
  },
  results: {
    body: [
      "The synthesis of descriptive exploratory analysis and formal statistical validation yields seven key business findings:",
    ],
    bullets: [
      "Discount is the Primary Margin Destroyer: Strongest statistical predictor of negative margin (r = -0.86, p < 0.001), overriding customer segment and regional advantages.",
      "The 20% Hard Threshold: Average profitability is positive up to 20% discount ($96 at 1-10%, $20 at 11-20%), but collapses sharply to -$45 in the 21-30% bracket and -$155 in the 31-50% bracket.",
      "Severe Vulnerability in Furniture: Furniture generates an average discount of 17.4% with near-zero aggregate profit; Sub-categories Tables (-$32/order) and Bookcases (-$12/order) suffer from chronic loss-making discounting.",
      "High-Risk Exposure in Technology: Generates the highest profits at full price ($80+ per order), but incurs massive single-transaction dollar losses under extreme discounts due to high unit values.",
      "Resilience in Office Supplies: High volume, low unit cost, and healthy baseline margins make Office Supplies the most commercially resilient product category.",
      "Geographic Hotspot in the South: The South region subjected to 31-50% discounts represents the highest single average loss (-$422 per transaction).",
      "Operational Invariance: Neither shipping transit duration (p = 0.742) nor federal holiday timing (p = 0.678) exerts a statistically significant effect on profit margins.",
    ],
  },
  recommendations: {
    body: [
      "Based on empirical thresholds and statistical validation, executive leadership should adopt the following evidence-based pricing guidelines:",
    ],
    steps: [
      "Enforce a 20% Standard Discount Ceiling: Restrict sales reps and automated storefront discounts to a maximum of 20%, eliminating routine entry into the loss-making 21%+ brackets.",
      "Implement Multi-Tiered Approval Governance: Any commercial discount exceeding 20% must require formal regional manager sign-off with an explicit margin impact justification.",
      "Overhaul Furniture Pricing Policy: Immediately eliminate automatic discounting on Tables and Bookcases; restructure baseline catalog prices to establish defensible gross margins before offering promotions.",
      "Protect Technology Margins: Restrict high-percentage discounts on high-ticket technology hardware (Copiers, Machines, Phones) where dollar losses scale exponentially.",
      "Shift from Blanket to Category-Specific Pricing: Discontinue uniform store-wide percentage promotions in favor of category-tailored discount schedules aligned with unit cost structures.",
      "Re-evaluate Holiday Promotional Campaigns: Cease aggressive holiday discount markdowns that erode margins without delivering statistically meaningful profit gains.",
    ],
  },
  enhancements: {
    body: [
      "Analytical Learnings: This project demonstrates the critical importance of evaluating net operating profit and unit margin elasticity rather than relying solely on gross revenue and top-line volume. It highlights how observational data must be vetted through statistical hypothesis testing to avoid spurious operational correlations.",
      "Documented Future Enhancements:",
    ],
    bullets: [
      "Predictive Profit Modeling: Train ElasticNet, Random Forest, and XGBoost regression models to predict expected transaction profit given proposed discount rates.",
      "Time Series Sales & Demand Forecasting: Implement Prophet or ARIMA models to forecast monthly and seasonal demand patterns at the sub-category level.",
      "Customer Lifetime Value & RFM Segmentation: Segment customers by purchasing frequency and margin contribution to identify discount-seeking vs value-driven buyers.",
      "Dynamic Pricing Optimization: Formulate an algorithmic pricing engine that dynamically calculates optimal discount percentages to maximize gross profit per SKU.",
      "Interactive Executive BI Dashboard: Deploy an interactive Streamlit or Power BI dashboard enabling sales managers to simulate discount scenarios in real-time.",
    ],
  },
};
