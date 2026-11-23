/**
 * Contextual Chatbot Responder Engine
 *
 * Generates accurate, grounded, page-aware answers based on the active PageContextInfo.
 * Strictly avoids fabrication, handles negative queries gracefully, and directs visitors
 * to the proper pages when appropriate.
 */

import { PROJECTS, type Project } from "@/data/projects";
import type { PageContextInfo } from "./chatbotContext";

/**
 * Checks if the user prompt mentions another specific project that is NOT the active page.
 */
function detectForeignProjectMention(prompt: string, currentSlug?: string): Project | undefined {
  const p = prompt.toLowerCase();

  for (const proj of PROJECTS) {
    if (currentSlug && proj.slug === currentSlug) continue;

    // Check project title tokens or slug
    const titleLower = proj.title.toLowerCase();
    const slugLower = proj.slug.toLowerCase();

    // Check specific distinct project identifiers
    if (slugLower === "titanic" && (p.includes("titanic") || p.includes("shipwreck"))) {
      return proj;
    }
    if (
      slugLower === "house-price-prediction" &&
      (p.includes("house price") ||
        p.includes("california housing") ||
        p.includes("california house"))
    ) {
      return proj;
    }
    if (
      slugLower === "mental-health-signal" &&
      (p.includes("mental health") || p.includes("student depression"))
    ) {
      return proj;
    }
    if (
      slugLower === "credit-risk-assessment" &&
      (p.includes("credit risk") || p.includes("loan default"))
    ) {
      return proj;
    }
    if (
      slugLower === "discount-vs-profit" &&
      (p.includes("discount vs profit") || p.includes("retail discount"))
    ) {
      return proj;
    }
    if (
      slugLower === "amazon-conveyor-eda" &&
      (p.includes("amazon conveyor") || p.includes("conveyor eda") || p.includes("conveyor"))
    ) {
      return proj;
    }
    if (
      slugLower === "nyc-airbnb-room-type-predictor" &&
      (p.includes("nyc airbnb") || p.includes("airbnb room") || p.includes("room type predictor"))
    ) {
      return proj;
    }
    if (
      slugLower === "customer-churn-prediction" &&
      (p.includes("customer churn") ||
        p.includes("churn prediction") ||
        p.includes("telco churn") ||
        p.includes("churn"))
    ) {
      return proj;
    }
    if (
      slugLower === "video-game-sales-analysis" &&
      (p.includes("video game") || p.includes("vgsales"))
    ) {
      return proj;
    }
    if (slugLower === "netflix-eda" && (p.includes("netflix") || p.includes("streaming content"))) {
      return proj;
    }

    if (p.includes(titleLower) || p.includes(slugLower)) {
      return proj;
    }
  }

  return undefined;
}

/**
 * Searches sections of the current page for keywords, prioritizing dedicated content
 * sections by title, then content, over the general core-metadata summary.
 */
function findRelevantSection(
  context: PageContextInfo,
  keywords: string[],
): { title: string; content: string } | undefined {
  // Pass 1: Match by section title first (avoiding core-metadata false-positive)
  for (const s of context.sections) {
    if (s.id === "core-metadata") continue;
    const titleLower = s.title.toLowerCase();
    if (keywords.some((k) => titleLower.includes(k.toLowerCase()))) {
      return s;
    }
  }

  // Pass 2: Match by section content (excluding core-metadata)
  for (const s of context.sections) {
    if (s.id === "core-metadata") continue;
    const text = (s.title + " " + s.content).toLowerCase();
    if (keywords.some((k) => text.includes(k.toLowerCase()))) {
      return s;
    }
  }

  // Pass 3: Fall back to core-metadata if no dedicated section matched
  for (const s of context.sections) {
    const text = (s.title + " " + s.content).toLowerCase();
    if (keywords.some((k) => text.includes(k.toLowerCase()))) {
      return s;
    }
  }

  return undefined;
}

/**
 * Generates an answer for a Project Detail page.
 */
function respondForProjectDetail(prompt: string, context: PageContextInfo): string {
  const q = prompt.toLowerCase();
  const currentSlug = context.metadata.slug as string | undefined;

  // 1. Check if user is asking about a DIFFERENT project
  const foreignProject = detectForeignProjectMention(prompt, currentSlug);
  if (foreignProject) {
    return (
      `You are currently viewing the documentation for **${context.pageTitle}**.\n\n` +
      `Your question appears to be about **${foreignProject.title}** (${foreignProject.category === "ml" ? "End-to-End ML" : "EDA Project"}).\n\n` +
      `To explore that project's findings, dataset, and code, please navigate to:\n` +
      `👉 **/projects/${foreignProject.slug}**\n\n` +
      `Feel free to ask me any questions about **${context.pageTitle}** while you're here!`
    );
  }

  // 2. Negative Test: Inapplicable metrics or unrecorded details
  if (
    context.metadata.category === "eda" &&
    (q.includes("model accuracy") ||
      q.includes("accuracy score") ||
      q.includes("hyperparameter") ||
      q.includes("f1 score"))
  ) {
    return (
      `**${context.pageTitle}** is an **Exploratory Data Analysis (EDA)** project rather than a predictive modeling task.\n\n` +
      `As documented on this page, it focuses on data cleaning, exploratory statistics, distribution analysis, and business insights—no classification model or accuracy score was trained for this specific project.\n\n` +
      `If you're looking for trained machine learning models and accuracy metrics, check out our **End-to-End Machine Learning** projects (such as *California House Price Prediction*, *NYC Airbnb Room Type Predictor*, or *Credit Risk Assessment*) at **/projects**.`
    );
  }

  // Check for regression projects asked about classification metrics
  if (
    currentSlug === "house-price-prediction" &&
    (q.includes("accuracy score") ||
      q.includes("f1 score") ||
      q.includes("roc-auc") ||
      q.includes("classification report"))
  ) {
    return (
      `**${context.pageTitle}** is a **continuous regression** task (predicting median home values), not a classification problem.\n\n` +
      `Therefore, classification metrics like accuracy, F1-score, or ROC-AUC are not applicable and not documented here.\n\n` +
      `The documented evaluation metrics for this regression model are:\n` +
      `• **RMSE (Root Mean Squared Error):** Primary metric penalizing large pricing errors.\n` +
      `• **MAE (Mean Absolute Error):** Average dollar error across housing districts.\n` +
      `• **R² Score:** Proportion of price variance explained by features.\n` +
      `• **Validation Strategy:** 5-fold cross-validation on the training set.`
    );
  }

  // 3. Live Demo & GitHub inquiries
  if (
    q.includes("demo") ||
    q.includes("stream-lit") ||
    q.includes("streamlit") ||
    q.includes("deploy") ||
    q.includes("live application") ||
    q.includes("app")
  ) {
    if (context.metadata.liveDemoUrl) {
      return (
        `Yes! **${context.pageTitle}** features an interactive live application:\n\n` +
        `🌐 **Live Demo:** [Open Application](${context.metadata.liveDemoUrl})\n\n` +
        (context.metadata.githubRepoUrl
          ? `📁 **GitHub Repository:** [View Source Code](${context.metadata.githubRepoUrl})\n\n`
          : "") +
        `You can test predictions and explore the interactive interface directly in your browser.`
      );
    } else {
      return (
        `Based on the documentation for **${context.pageTitle}**, an interactive live web demo is not currently deployed for this project.\n\n` +
        (context.metadata.githubRepoUrl
          ? `However, the complete source code and notebooks are available on GitHub:\n📁 [${context.metadata.githubRepoUrl}](${context.metadata.githubRepoUrl})`
          : `The complete analysis and charts are documented directly on this page.`)
      );
    }
  }

  if (
    q.includes("github") ||
    q.includes("repository") ||
    q.includes("repo") ||
    q.includes("source code")
  ) {
    if (context.metadata.githubRepoUrl) {
      return (
        `The complete source code for **${context.pageTitle}** is hosted on GitHub:\n\n` +
        `📁 **Repository:** [${context.metadata.githubRepoUrl}](${context.metadata.githubRepoUrl})\n\n` +
        `It contains the analysis notebooks, data pipelines, and documentation.`
      );
    } else {
      return `A standalone GitHub repository link is not explicitly documented for this project.`;
    }
  }

  // Customer Churn specific questions
  if (currentSlug === "customer-churn-prediction") {
    if (
      q.includes("what is customer churn") ||
      q.includes("what is churn") ||
      q.includes("definition of churn")
    ) {
      return (
        `### What is Customer Churn?\n\n` +
        `**Customer churn** (or customer attrition) refers to when a subscriber cancels their service or stops doing business with a company.\n\n` +
        `• **Why it matters:** Acquiring new customers costs 5 to 7 times more than retaining existing ones. Churn directly erodes monthly recurring revenue (MRR) and decreases Customer Lifetime Value (CLV).\n` +
        `• **Why this project was built:** To empower telecommunications retention teams with predictive foresight—identifying customers at high risk of leaving so proactive retention interventions (like contract upgrades, service discounts, or dedicated support) can be deployed before cancellation occurs.`
      );
    }

    if (q.includes("limitation") || q.includes("drawback") || q.includes("caveat")) {
      return (
        `### Limitations of the Customer Churn Prediction Project\n\n` +
        `As documented in the project and application:\n` +
        `1. **Observational Cross-Sectional Data:** The dataset represents snapshot customer records without time-series usage logs or evolving monthly behavioral sequences.\n` +
        `2. **Educational Demonstration:** As stated in the deployed Streamlit app, the application demonstrates a machine learning classification workflow and should not be treated as a definitive business decision tool without enterprise calibration.\n` +
        `3. **Missing TotalCharges Assumption:** 11 customer accounts with 0 months of tenure had blank total charges and were imputed as 0.0, assuming no bills had yet accrued.\n` +
        `4. **Precision-Recall Trade-off:** By weighting the minority class to achieve 78.61% recall, precision is 50.87%, meaning approximately half of flagged customers may not have churned without intervention (though retention offers to loyal customers carry low risk).`
      );
    }

    if (
      q.includes("class weight") ||
      q.includes("balanced") ||
      q.includes("recall score") ||
      q.includes("imbalance")
    ) {
      return (
        `### Impact of Class Weighting on Customer Churn Prediction\n\n` +
        `In the raw training data, only 26.54% of customers churned. An unweighted model tended to favor the majority class:\n\n` +
        `• **Default Unweighted Baseline:** Baseline Logistic Regression achieved ~80.19% accuracy but only **54.38% recall**—missing nearly half of all churners.\n` +
        `• **With \`class_weight='balanced'\`:** Applying inverse-frequency class weighting via GridSearchCV penalizes false negatives, dramatically boosting holdout **churn recall to 78.61%** (catching 294 out of 374 churners in the test set) and increasing the cross-validated F1-score to **0.6288**.\n\n` +
        `In customer retention, catching at-risk customers (high recall) is far more critical than avoiding unnecessary retention offers.`
      );
    }
  }

  // 4. Model / Algorithm inquiries
  if (
    q.includes("model") ||
    q.includes("algorithm") ||
    q.includes("classifier") ||
    q.includes("regressor") ||
    q.includes("baseline") ||
    q.includes("pipeline")
  ) {
    const modelSection = findRelevantSection(context, [
      "model development",
      "modeling",
      "model evaluation",
      "selected model",
      "baseline",
    ]);

    if (modelSection) {
      return (
        `### Model Development & Architecture for ${context.pageTitle}\n\n` +
        modelSection.content +
        `\n\n*(Documented in the **${modelSection.title}** section of this project.)*`
      );
    }

    if (context.metadata.technologies && context.metadata.technologies.length > 0) {
      return (
        `For **${context.pageTitle}**, the documented technologies and modeling tools are:\n` +
        `• **Libraries & Frameworks:** ${context.metadata.technologies.join(", ")}\n\n` +
        `Please refer to the **Model Development** and **Model Evaluation** sections on this page for detailed hyperparameters and validation scores.`
      );
    }
  }

  // 5. Dataset & Feature inquiries
  if (
    q.includes("dataset") ||
    q.includes("features") ||
    q.includes("sample size") ||
    q.includes("rows") ||
    q.includes("records") ||
    q.includes("variables")
  ) {
    const datasetSection = findRelevantSection(context, [
      "dataset understanding",
      "dataset",
      "feature engineering",
      "features",
    ]);

    if (datasetSection) {
      return (
        `### Dataset & Features: ${context.pageTitle}\n\n` +
        datasetSection.content +
        `\n\n*(From the **${datasetSection.title}** section.)*`
      );
    }

    if (context.metadata.dataset) {
      return (
        `**Dataset Information for ${context.pageTitle}:**\n\n` +
        `• **Source / Name:** ${context.metadata.dataset}\n` +
        `• **Core Tech:** ${context.metadata.technologies?.join(", ") || "Python"}\n\n` +
        `Review the **Dataset Understanding** section on this page for comprehensive feature descriptions and missing value audits.`
      );
    }
  }

  // 6. Objective / Problem Statement
  if (
    q.includes("objective") ||
    q.includes("purpose") ||
    q.includes("goal") ||
    q.includes("problem statement") ||
    q.includes("about")
  ) {
    const objSection = findRelevantSection(context, [
      "project overview",
      "business problem",
      "objectives",
      "problem",
    ]);

    if (objSection) {
      return `### Objectives & Problem Statement: ${context.pageTitle}\n\n` + objSection.content;
    }

    return (
      `**Project Overview:**\n\n` +
      `${context.summary}\n\n` +
      `**Category:** ${context.metadata.category === "ml" ? "End-to-End Machine Learning" : "Exploratory Data Analysis"}\n` +
      `**Status:** ${context.metadata.status || "Completed"}`
    );
  }

  // 7. Preprocessing & Data Cleaning
  if (
    q.includes("preprocessing") ||
    q.includes("cleaning") ||
    q.includes("missing value") ||
    q.includes("imputation") ||
    q.includes("encoding") ||
    q.includes("scaling") ||
    q.includes("transformation")
  ) {
    const prepSection = findRelevantSection(context, [
      "data preparation",
      "preprocessing",
      "cleaning",
      "feature engineering",
    ]);

    if (prepSection) {
      return `### Data Preparation & Preprocessing: ${context.pageTitle}\n\n` + prepSection.content;
    }
  }

  // 8. Key Findings, Results & Recommendations
  if (
    q.includes("finding") ||
    q.includes("result") ||
    q.includes("insight") ||
    q.includes("recommendation") ||
    q.includes("conclusion") ||
    q.includes("takeaway")
  ) {
    const resultsSection = findRelevantSection(context, [
      "key findings",
      "results",
      "business recommendations",
      "recommendations",
      "exploratory data analysis",
    ]);

    if (resultsSection) {
      return (
        `### Documented Findings & Results for ${context.pageTitle}\n\n` + resultsSection.content
      );
    }
  }

  // 9. Specific Section search match
  for (const s of context.sections) {
    const words = q.split(/\s+/).filter((w) => w.length > 3);
    const titleLower = s.title.toLowerCase();
    if (words.some((w) => titleLower.includes(w))) {
      return `### ${s.title}\n\n${s.content}`;
    }
  }

  // 10. Fallback for un-matched query on this project
  return (
    `**Regarding ${context.pageTitle}:**\n\n` +
    `${context.summary}\n\n` +
    `I am grounded in the documentation for **${context.pageTitle}** (${context.path}).\n\n` +
    `You can ask me specifically about:\n` +
    `• The dataset, sample size, and feature attributes\n` +
    `• Data preprocessing and feature engineering steps\n` +
    `• ${context.metadata.category === "ml" ? "Model development, algorithms, and evaluation metrics" : "Exploratory charts, statistical distributions, and findings"}\n` +
    `• Business recommendations and deployment details\n\n` +
    `If you're asking about something not documented on this page, please clarify or let me know!`
  );
}

/**
 * Generates an answer for the Projects Directory page (`/projects`).
 */
function respondForProjectsIndex(prompt: string, context: PageContextInfo): string {
  const q = prompt.toLowerCase();

  // Inquiries about specific projects
  const mentioned = detectForeignProjectMention(prompt);
  if (mentioned) {
    return (
      `**${mentioned.title}** is available on this website under **${mentioned.category === "ml" ? "End-to-End Machine Learning Projects" : "EDA Projects"}**.\n\n` +
      `• **Overview:** ${mentioned.description}\n` +
      `• **Technologies:** ${mentioned.librariesUsed?.join(", ")}\n` +
      `• **Status:** ${mentioned.status || "Completed"}\n` +
      (mentioned.liveDemoUrl ? `• **Live Demo:** [Open App](${mentioned.liveDemoUrl})\n` : "") +
      `👉 **Direct Link:** [/projects/${mentioned.slug}](/projects/${mentioned.slug})`
    );
  }

  // EDA projects list
  if (
    q.includes("eda project") ||
    (q.includes("eda") &&
      (q.includes("available") || q.includes("which") || q.includes("list") || q.includes("show")))
  ) {
    const edaProjects = PROJECTS.filter((p) => p.category === "eda");
    const list = edaProjects
      .map(
        (p, i) =>
          `**${i + 1}. [${p.title}](/projects/${p.slug})**` +
          (p.slug === "discount-vs-profit" ? ` *(Discount vs Profit Analysis)*` : "") +
          `\n` +
          `   - ${p.description}\n` +
          `   - Tech: ${p.librariesUsed?.join(", ")}`,
      )
      .join("\n\n");

    return (
      `### Exploratory Data Analysis (EDA) Projects\n\n` +
      `Here are the ${edaProjects.length} dedicated EDA projects available on the website:\n\n` +
      list +
      `\n\nClick on any project link above to view the complete analysis!`
    );
  }

  // ML projects list
  if (
    q.includes("ml project") ||
    q.includes("machine learning") ||
    q.includes("end-to-end") ||
    (q.includes("model") && q.includes("available"))
  ) {
    const mlProjects = PROJECTS.filter((p) => p.category === "ml");
    const list = mlProjects
      .map(
        (p, i) =>
          `**${i + 1}. [${p.title}](/projects/${p.slug})**\n` +
          `   - ${p.description}\n` +
          `   - Tech: ${p.librariesUsed?.join(", ")}\n` +
          (p.liveDemoUrl ? `   - Live Demo: [Launch Web App](${p.liveDemoUrl})` : ""),
      )
      .join("\n\n");

    return (
      `### End-to-End Machine Learning Projects\n\n` +
      `Here are the ${mlProjects.length} machine learning projects on the website:\n\n` +
      list +
      `\n\nEach includes data cleaning, feature engineering, cross-validation, and model evaluation.`
    );
  }

  // Technology filter inquiries (e.g. "Which projects use Python and Pandas?")
  if (
    q.includes("pandas") ||
    q.includes("scikit-learn") ||
    q.includes("streamlit") ||
    q.includes("python")
  ) {
    const techName = q.includes("scikit-learn")
      ? "Scikit-learn"
      : q.includes("streamlit")
        ? "Streamlit"
        : q.includes("pandas")
          ? "Pandas"
          : "Python";

    const matches = PROJECTS.filter((p) =>
      p.librariesUsed?.some((l) => l.toLowerCase().includes(techName.toLowerCase())),
    );

    const list = matches
      .map((p) => `• **[${p.title}](/projects/${p.slug})** (${p.category === "ml" ? "ML" : "EDA"})`)
      .join("\n");

    return (
      `### Projects Using ${techName}\n\n` +
      `The following projects in our portfolio utilize **${techName}**:\n\n` +
      list +
      `\n\nClick any project to see code snippets and methodology.`
    );
  }

  // General projects index overview
  return (
    `### Projects Directory Overview\n\n` +
    `The website showcases **${PROJECTS.length} hands-on projects** split into two sections:\n\n` +
    `1. **EDA Projects (${PROJECTS.filter((p) => p.category === "eda").length}):** Focused on data cleaning, visual exploration, and statistical insights (e.g. *Amazon Conveyor EDA*, *Titanic Survival*, *Retail Discount vs Profit*).\n` +
    `2. **End-to-End ML Projects (${PROJECTS.filter((p) => p.category === "ml").length}):** Full modeling pipelines with feature engineering, hyperparameter tuning, and deployment (e.g. *California House Price Prediction*, *Credit Risk Assessment*, *NYC Airbnb Room Type Predictor*).\n\n` +
    `Ask me about any specific project or technology!`
  );
}

/**
 * Generates an answer for the Homepage (`/`).
 */
function respondForHome(prompt: string, context: PageContextInfo): string {
  const q = prompt.toLowerCase();

  if (
    q.includes("what is this website") ||
    q.includes("about") ||
    q.includes("who is eddie") ||
    q.includes("purpose")
  ) {
    return (
      `### Welcome to EDA-with-Python!\n\n` +
      `This website is an educational documentation hub and project portfolio dedicated to:\n\n` +
      `1. **Exploratory Data Analysis (EDA):** Learning how to interrogate raw datasets, check mathematical assumptions, and spot errors.\n` +
      `2. **Interactive Curriculum:** A 6-module, 21-lesson course derived from Dr. Howard Seltman's Carnegie Mellon University text (*Experimental Design and Analysis*, Chapter 4).\n` +
      `3. **Hands-On Projects:** Real-world case studies spanning both EDA and End-to-End Machine Learning.\n\n` +
      `I'm **Eddie**, your learning assistant. Navigate to **/learn** to take the course, or head to **/projects** to explore our projects!`
    );
  }

  if (
    q.includes("what is eda") ||
    q.includes("what is exploratory data analysis") ||
    q.includes("exploratory data analysis") ||
    q.includes("definition of eda") ||
    q.includes("why look at data")
  ) {
    return (
      `### What is Exploratory Data Analysis (EDA)?\n\n` +
      `**Exploratory Data Analysis (EDA)** is the disciplined practice of taking a "first look at the data" before applying formal statistical models or machine learning algorithms.\n\n` +
      `As Dr. Howard Seltman (Carnegie Mellon University) explains, EDA serves 5 core purposes:\n` +
      `1. **Detection of Mistakes:** Finding typos, transposed digits (e.g., 91 vs 19), and data entry glitches.\n` +
      `2. **Checking Assumptions:** Verifying whether normality and equal variance (homoscedasticity) hold.\n` +
      `3. **Model Selection:** Choosing linear vs nonlinear algorithms or identifying necessary transformations.\n` +
      `4. **Relationships Among Explanatory Variables:** Detecting multicollinearity and redundancy.\n` +
      `5. **Assessing Effect Sizes:** Gauging the rough magnitude and direction of associations.\n\n` +
      `To explore this in depth, check out **Lesson 1** at [/learn/what-is-eda](/learn/what-is-eda)!`
    );
  }

  if (q.includes("difference") && (q.includes("preprocessing") || q.includes("preprocess"))) {
    return (
      `### How EDA and Data Preprocessing Connect\n\n` +
      `EDA and Data Preprocessing are complementary, interdependent stages:\n\n` +
      `• **Exploratory Data Analysis (Inspection):** Discovers what is wrong or interesting about the data (e.g. "Age is 20% missing", "Income is heavily right-skewed", "Fare has severe outliers").\n` +
      `• **Data Preprocessing (Transformation):** Executes the concrete fixes based on those observations (e.g. median imputation, log transformations, One-Hot Encoding, StandardScaler).\n\n` +
      `Without EDA, preprocessing is done blindly; without preprocessing, EDA insights are never operationalized for models.`
    );
  }

  if (
    q.includes("curriculum") ||
    q.includes("learn") ||
    q.includes("seltman") ||
    q.includes("book")
  ) {
    return (
      `### Interactive EDA Curriculum (Dr. Howard Seltman, CMU)\n\n` +
      `We have implemented a comprehensive 6-module, 21-lesson curriculum based on Dr. Howard Seltman's acclaimed course text (*Experimental Design and Analysis*, Chapter 4, pp. 61–100):\n\n` +
      `• **Module 1:** Foundations & Taxonomy of EDA (2×2 Matrix)\n` +
      `• **Module 2:** Univariate Non-Graphical EDA (Tabulation, Mean/Median, Spread, Skewness/Kurtosis)\n` +
      `• **Module 3:** Univariate Graphical EDA (Histograms, Stem-and-leaf, Boxplots, Q-Q plots)\n` +
      `• **Module 4:** Multivariate Non-Graphical EDA (Cross-tabulation, Grouped ANOVA, Covariance & Correlation)\n` +
      `• **Module 5:** Multivariate Graphical EDA (Barplots, Side-by-side boxplots, Fig 4.16 Scatterplots)\n` +
      `• **Module 6:** Statistical Principles & The 6-Step EDA Protocol\n\n` +
      `👉 Visit **/learn** to start the interactive curriculum, or read the original textbook at [Book.pdf](https://www.stat.cmu.edu/~hseltman/309/Book/Book.pdf)!`
    );
  }

  // If asking about a specific project from home
  const mentioned = detectForeignProjectMention(prompt);
  if (mentioned) {
    return (
      `**${mentioned.title}** is one of the featured projects on this website!\n\n` +
      `• **Category:** ${mentioned.category === "ml" ? "End-to-End Machine Learning" : "Exploratory Data Analysis"}\n` +
      `• **Summary:** ${mentioned.description}\n` +
      `• **Tech:** ${mentioned.librariesUsed?.join(", ")}\n\n` +
      `👉 Visit the project page at: **/projects/${mentioned.slug}**`
    );
  }

  return (
    `### Home Page Guide\n\n` +
    `${context.summary}\n\n` +
    `Here are great ways to explore:\n` +
    `• Head to **/learn** for our 21 interactive EDA lessons\n` +
    `• Visit **/projects** to inspect our ${PROJECTS.length} real-world case studies\n` +
    `• Ask me about statistical methods (IQR, Pearson correlation, skewness, Q-Q plots, etc.)!`
  );
}

/**
 * Generates an answer for the Learning Roadmap (`/learn`).
 */
function respondForLearnIndex(prompt: string, context: PageContextInfo): string {
  const q = prompt.toLowerCase();

  if (
    q.includes("taxonomy") ||
    q.includes("2x2") ||
    q.includes("matrix") ||
    q.includes("classification")
  ) {
    return (
      `### Dr. Seltman's 2×2 Cross-Classification Matrix\n\n` +
      `All EDA techniques are organized across two orthogonal dimensions:\n\n` +
      `1. **Univariate Non-Graphical (Module 2):** Single variables examined through numbers (frequencies, mean, median, IQR, variance, skewness, kurtosis).\n` +
      `2. **Univariate Graphical (Module 3):** Single variables examined visually (histograms with Freedman-Diaconis binning, stem-and-leaf displays, Tukey boxplots, Q-Q plots).\n` +
      `3. **Multivariate Non-Graphical (Module 4):** Multiple variables examined through numbers (cross-tabulation row/col %, grouped statistics/informal ANOVA, covariance, correlation matrices).\n` +
      `4. **Multivariate Graphical (Module 5):** Multiple variables examined visually (grouped/stacked barplots, side-by-side boxplots, multi-variable scatterplots).\n\n` +
      `Module 6 synthesizes all four quadrants into the 6-Step End-to-End EDA Protocol!`
    );
  }

  if (
    q.includes("histogram") ||
    q.includes("boxplot") ||
    q.includes("q-q") ||
    q.includes("quantile")
  ) {
    return (
      `**Univariate Graphical EDA (Module 3)** covers these core visual techniques:\n\n` +
      `• **Histograms & Bins:** Bin sensitivity, the EDA2.dat case study, and Freedman-Diaconis optimal binning.\n` +
      `• **Stem-and-Leaf Displays:** Preserving exact values while seeing shapes.\n` +
      `• **Boxplots & Outliers:** Tukey hinges, $1.5 \\times \\text{IQR}$ fences, discrete ties, and the Hen & Eggs case study.\n` +
      `• **Quantile-Normal (Q-Q) Plots:** Diagnosing right/left skew, fat tails, bimodality, and discrete bands.\n\n` +
      `👉 Check out [/learn/boxplots-outliers](/learn/boxplots-outliers) or [/learn/histograms-and-bins](/learn/histograms-and-bins)!`
    );
  }

  return (
    `### EDA Curriculum Roadmap\n\n` +
    `The curriculum contains 21 lessons spanning 6 modules grounded in Dr. Howard Seltman's Carnegie Mellon University text.\n\n` +
    `Select any module on this page to jump into a lesson, or ask me about any statistical concept taught here!`
  );
}

/**
 * Generates an answer for a Learning Lesson page (`/learn/$topicId`).
 */
function respondForLearnTopic(prompt: string, context: PageContextInfo): string {
  const q = prompt.toLowerCase();

  // Check if asking about the formula
  if (
    q.includes("formula") ||
    q.includes("math") ||
    q.includes("calculation") ||
    q.includes("equation")
  ) {
    const formulaSection = context.sections.find((s) => s.content.includes("Formula:"));
    if (formulaSection) {
      return `### Mathematical Formulation for ${context.pageTitle}\n\n${formulaSection.content}`;
    }
  }

  // Check if asking about Python implementation
  if (
    q.includes("python") ||
    q.includes("code") ||
    q.includes("pandas") ||
    q.includes("numpy") ||
    q.includes("implement")
  ) {
    const codeSection = context.sections.find((s) => s.content.includes("Python Implementation:"));
    if (codeSection) {
      return `### Python Implementation for ${context.pageTitle}\n\n${codeSection.content}`;
    }
  }

  // Check if asking about common mistakes
  if (q.includes("mistake") || q.includes("pitfall") || q.includes("error") || q.includes("trap")) {
    const mistakeSection = context.sections.find((s) => s.content.includes("Common Mistakes:"));
    if (mistakeSection) {
      return `### Common Mistakes to Avoid in ${context.pageTitle}\n\n${mistakeSection.content}`;
    }
  }

  // General query on this lesson
  return (
    `### ${context.pageTitle}\n\n` +
    `${context.summary}\n\n` +
    `This lesson covers foundational concepts from Dr. Howard Seltman's Chapter 4. You can ask me:\n` +
    `• To explain the mathematical formulas and step-by-step calculations\n` +
    `• For the Python code snippet implementing this concept\n` +
    `• About common beginner pitfalls to avoid\n` +
    `• About real-world case studies related to this topic!`
  );
}

/**
 * Answers general statistical queries with structured educational responses.
 */
function respondForGeneralStats(prompt: string): string {
  const q = prompt.toLowerCase();

  if (q.includes("iqr") || q.includes("outlier") || q.includes("tukey")) {
    return (
      `### 1. Intuitive Explanation\n` +
      `The Interquartile Range (IQR) measures the spread of the middle 50% of your data. Think of it as ignoring the extremes at both ends and measuring how wide the middle group is.\n\n` +
      `### 2. Formal Technical Definition\n` +
      `$$\\text{IQR} = Q_3 - Q_1$$\n` +
      `Tukey's $1.5 \\times \\text{IQR}$ rule flags observations as outliers if they fall outside:\n` +
      `• Lower Fence: $Q_1 - 1.5 \\times \\text{IQR}$\n` +
      `• Upper Fence: $Q_3 + 1.5 \\times \\text{IQR}$\n\n` +
      `### 3. Practical Example in Python\n` +
      `\`\`\`python\n` +
      `q1 = df['fare'].quantile(0.25)\n` +
      `q3 = df['fare'].quantile(0.75)\n` +
      `iqr = q3 - q1\n` +
      `outliers = df[(df['fare'] < q1 - 1.5 * iqr) | (df['fare'] > q3 + 1.5 * iqr)]\n` +
      `\`\`\`\n\n` +
      `Explore this in **Lesson 11**: [/learn/boxplots-outliers](/learn/boxplots-outliers)!`
    );
  }

  if (q.includes("correlation") || q.includes("pearson") || q.includes("covariance")) {
    return (
      `### 1. Intuitive Explanation\n` +
      `Covariance measures whether two variables deviate from their means together. Pearson's correlation ($r$) standardizes covariance onto a scale from $-1.0$ (perfect inverse line) to $+1.0$ (perfect positive line).\n\n` +
      `### 2. Formal Technical Definition\n` +
      `$$r = \\frac{\\text{Cov}(X, Y)}{s_x \\cdot s_y} = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sqrt{\\sum (X_i - \\bar{X})^2 \\sum (Y_i - \\bar{Y})^2}}$$\n\n` +
      `**Crucial Principle:** $r = 0$ implies no *linear* relationship, NOT independence! A perfect parabola has $r = 0$.\n\n` +
      `Explore Dr. Seltman's Table 4.4 manual calculation in **Lesson 15**: [/learn/covariance-and-correlation](/learn/covariance-and-correlation)!`
    );
  }

  if (q.includes("missing") || q.includes("impute") || q.includes("imputation")) {
    return (
      `### Handling Missing Values in EDA & Preprocessing\n\n` +
      `Missing data mechanisms:\n` +
      `1. **MCAR (Missing Completely at Random):** Safe to drop or impute with simple statistics.\n` +
      `2. **MAR (Missing at Random):** Missingness depends on observed features (e.g., grouped median imputation by category).\n` +
      `3. **MNAR (Missing Not at Random):** Missingness depends on the value itself (e.g., high earners refusing to state income).\n\n` +
      `\`\`\`python\n` +
      `# Median imputation (robust to outliers)\n` +
      `df['Age'] = df.groupby(['Pclass', 'Sex'])['Age'].transform(lambda g: g.fillna(g.median()))\n` +
      `\`\`\``
    );
  }

  return (
    `I'm **Eddie**, your EDA learning assistant. I can help explain statistical concepts, walk through Python implementations, or guide you through any project on this site.\n\n` +
    `Ask me about:\n` +
    `• Any specific project on this site (e.g. California Housing, Titanic, Amazon Conveyor, etc.)\n` +
    `• EDA methods: Histograms, Boxplots, Q-Q plots, Cross-tabulation, or Correlation\n` +
    `• Data preprocessing: Missing value imputation, transformations, and feature engineering!`
  );
}

/**
 * Main Entry Point: Generates a grounded, context-aware answer for any query on any page.
 */
export function generateContextualResponse(prompt: string, context: PageContextInfo): string {
  const q = prompt.trim();
  if (!q) return "Please ask a question, and I'll be glad to help!";

  switch (context.pageType) {
    case "project-detail":
      return respondForProjectDetail(q, context);
    case "projects-index":
      return respondForProjectsIndex(q, context);
    case "learn-index":
      return respondForLearnIndex(q, context);
    case "learn-topic":
      return respondForLearnTopic(q, context);
    case "home":
      return respondForHome(q, context);
    default:
      return respondForGeneralStats(q);
  }
}
