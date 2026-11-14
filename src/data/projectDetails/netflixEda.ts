import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/netflix_EDA
// Figures are real outputs exported directly from the project's analytical notebooks and reports.
const images = import.meta.glob<{ default: string }>("../../assets/projects/netflix-eda/*.png", {
  eager: true,
});

const fig = (name: string) =>
  images[`../../assets/projects/netflix-eda/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/netflix-eda/${name}`;

export const netflixEda: ProjectDetails = {
  overview: {
    body: [
      "Netflix Movies and TV Shows EDA is a comprehensive, evidence-based Exploratory Data Analysis of Netflix's global content library (2008–2021). The investigation examines catalogue composition across content formats, genre hierarchies, temporal release cohorts, geographic production footprints, and content maturity ratings.",
      "In streaming entertainment, platform competitiveness and subscriber retention depend directly on catalogue breadth, relevance, and renewal. Content acquisition and original production demand multi-million-dollar capital commitments; understanding historical library dynamics, genre longevity, and regional preferences allows content strategists to move beyond intuition toward empirical portfolio planning.",
      "The project adheres to a structured CRISP-DM exploratory workflow encompassing data understanding, systematic cleaning, multi-label genre and country unnesting, datetime conversion, univariate frequency profiling, bivariate cross-tabulation, and multivariate temporal heatmapping across 13 years of release cohorts.",
    ],
  },
  problem: {
    body: [
      "Streaming services operate with finite content budgets. Strategists face key operational trade-offs: balancing standalone feature films (which provide rapid volume at lower per-title cost) against serialized television (which drives repeat viewing sessions and subscriber retention), while adapting content acquisitions to regional cultural tastes.",
      "The primary analytical objective is to uncover structural patterns in Netflix's catalogue that inform evidence-based content acquisition, audience targeting, and regional diversification strategies.",
    ],
    bullets: [
      "Quantify the macro-level distribution between standalone Movies and episodic TV Shows",
      "Decompose multi-label genre classifications to determine core platform content anchors",
      "Trace catalogue expansion over release years (2008–2021) and pinpoint the 2016 inflection point",
      "Measure geographic production concentration across leading nations and evaluate unclassified metadata",
      "Examine how content maturity ratings (TV-MA, TV-14, family tiers) segment target audiences",
      "Cross-tabulate genre distribution against production territories to detect regional specialization",
      "Analyze multi-year temporal trends across core genres to understand portfolio evolution",
      "Synthesize empirical findings into actionable executive content acquisition recommendations",
    ],
  },
  researchQuestions: {
    body: [
      "The exploratory investigation is framed around seven central business questions documented in the repository:",
    ],
    bullets: [
      "BQ1 (Content Format): What is the distribution of Movies versus TV Shows across the Netflix catalogue?",
      "BQ2 (Genre Prevalence): Which genres are most prevalent in Netflix's global content library?",
      "BQ3 (Temporal Growth): How has Netflix's content library expanded across release years over time?",
      "BQ4 (Geographic Footprint): Which countries contribute the highest volume of content to the platform?",
      "BQ5 (Maturity Segmentation): How do content ratings vary across genres, and is children's content segregated?",
      "BQ6 (Regional Specialization): Are certain genres concentrated in specific countries and cultural hubs?",
      "BQ7 (Longitudinal Evolution): Which genres have grown, peaked, or stabilized across multi-year release cohorts?",
    ],
  },
  dataset: {
    body: [
      "Primary Dataset: Netflix Movies and TV Shows Dataset (Kaggle). Contains 7,789 title-level records spanning 11 original attributes, capturing content released between 2008 and 2021.",
      "Core Identifiers & Formats: Show_Id (unique record key s1 to s7789), Category/Type (binary classification: Movie vs TV Show), Title (official title of film or series), Description (narrative synopsis).",
      "Creative & Geographic Attributes: Director (director credits, present for 5,401 titles), Cast (ensemble cast credits, present for 7,071 titles), Country (production nation or co-producing international partners, present for 7,282 titles).",
      "Temporal & Maturity Attributes: Release_Date (date published on Netflix), Release_Year (calendar year of original release), Rating (maturity classification: TV-MA, TV-14, TV-PG, R, PG-13, TV-Y, TV-Y7, PG, TV-G, NR, G, UR), Duration (runtime in minutes for movies or season counts for television).",
      "Genre Classification: Type/listed_in (comma-delimited multi-label genre tags, e.g., 'Dramas, International Movies, Thrillers'). Because most titles carry multiple genre tags, individual genre counts exceed the title count.",
    ],
  },
  preprocessing: {
    body: [
      "A rigorous data cleaning and quality assessment workflow was conducted in Jupyter Notebook (01_Data_understanding.ipynb) to inspect completeness, identify anomalies, and establish data integrity.",
    ],
    steps: [
      "Initial Dataset Audit: Inspected schema definitions, memory usage, and record counts across 7,789 rows and 11 columns.",
      "Missing Value Assessment: Identified missing values in Director (2,388 rows, 30.66%), Cast (718 rows, 9.22%), Country (507 rows, 6.51%), Release_Date (10 rows, 0.13%), and Rating (7 rows, 0.09%).",
      "Duplicate Pruning: Ran duplicate detection on title identifiers and identified exactly 2 duplicate records ('s684 Backfire' and 's6621 The Lost Okoroshi'), which were removed.",
      "Temporal Record Filtering: Dropped the 10 rows lacking Release_Date, as exact calendar placement is essential for time-series modeling and cannot be reliably imputed, reducing the dataset to 7,779 rows.",
      "Principled Categorical Imputation: Rather than discarding ~37% of the dataset due to missing metadata, missing Director, Cast, and Country values were explicitly preserved under an 'Unknown' category. This preserves full sample volume for aggregate volume calculations while flagging data quality gaps.",
      "Rating Mode Imputation: Handled 7 missing Rating values contextually, ensuring 100% field completeness across the remaining records.",
      "Final Cleaned Baseline: Reached a verified baseline of 7,777 deduplicated, complete records for subsequent preprocessing and exploratory modeling.",
    ],
  },
  features: {
    body: [
      "Data preprocessing and feature engineering were executed in Jupyter Notebook (02_Data_preprocessing.ipynb) to prepare categorical and temporal variables for cross-tabulation and longitudinal analysis.",
    ],
    steps: [
      "Datetime Conversion: Converted Release_Date strings to native pandas datetime64[ns] format to support temporal indexing and month extraction.",
      "Release Year Derivation: Extracted Release_Year as an integer feature spanning 2008 to 2021 for cohort-based analysis.",
      "Multi-Label Genre Decomposition: Because titles typically list 2 to 3 comma-separated genres (e.g., 'Dramas, International Movies'), unnested Type tags using .str.split(', ') and .explode() into individual genre observations, eliminating multi-label aggregation distortion.",
      "Multi-Country Production Unnesting: Applied comma-splitting and explosion to the Country field to give equal individual credit to international co-productions.",
      "Duration Decomposition: Split the mixed string duration column into Duration_Min (integer runtimes for films) and Seasons_Count (integer season counts for TV shows).",
      "Maturity Bucketing: Structured ratings into operational audience tiers: Mature Adults (TV-MA, R, NC-17), Teens/Young Adults (TV-14, PG-13), General Audience (TV-PG, PG), Children (TV-Y, TV-Y7, G), and Unrated (NR, UR).",
      "Cleaned Dataset Persistence: Saved the transformed tabular dataset to data/processed/netflix_cleaned.csv (23 total features).",
    ],
  },
  eda: {
    body: [
      "Exploratory Data Analysis was executed across three analytical notebooks and reports: Univariate Analysis (03_Univariate_EDA.ipynb), Bivariate Analysis (04_Bivariate_EDA.ipynb), and Multivariate Analysis (05_multivariate_EDA.ipynb).",
    ],
    subsections: [
      {
        title: "1. Univariate Analysis — Content Split, Top Genres, Countries & Release Trends",
        body: [
          "Univariate analysis examines the baseline marginal distributions of content types, genres, producing nations, and temporal release velocity across the catalogue.",
          "Content Type Distribution: Standalone Movies represent 5,377 titles (69.14%) while episodic TV Shows account for 2,400 titles (30.86%), establishing a 2.2:1 ratio. Standalone films historically allowed rapid catalogue volume expansion at lower per-title production overhead, whereas multi-season television drives higher repeat engagement and subscriber retention.",
          "Genre Distribution: Across unnested genre tags, International Movies (2,437 titles, 14.29%) and Dramas (2,106 titles, 12.35%) represent the dominant platform categories, followed by Comedies (1,471, 8.63%), International TV Shows (1,198, 7.03%), Documentaries (786, 4.61%), and Action & Adventure (721, 4.23%). The dominance of 'International' tags confirms Netflix's globalized catalogue footprint.",
          "Yearly Release Trends: Content release velocity was minimal before 2015 (<90 titles annually), followed by a sharp inflection point in 2016 (443 titles) and rapid acceleration through 2017 (1,225 titles), 2018 (1,685 titles), and an all-time peak in 2019 (2,153 titles), remaining high in 2020 (2,009 titles). The sharp decline in 2021 (117 titles) represents a partial-year data collection artifact rather than a commercial contraction.",
          "Content-Producing Countries: Production is heavily concentrated in established media hubs. The United States leads with 3,291 titles (34.41%), more than triple the second-largest contributor, India (990 titles, 10.35%). The United Kingdom ranks third (722 titles, 7.55%), followed by an explicit 'Unknown' category (506 titles, 5.29%), Canada (412 titles, 4.31%), France (349 titles, 3.65%), and Japan (286 titles, 2.99%).",
        ],
        images: [
          {
            src: fig("movies-vs-tv-shows.png"),
            caption:
              "Content Type Distribution: Movies comprise 69.14% (5,377 titles) versus TV Shows at 30.86% (2,400 titles), a 2.2:1 ratio.",
          },
          {
            src: fig("top-15-genres.png"),
            caption:
              "Top 15 Genres on Netflix: International Movies (2,437) and Dramas (2,106) lead platform catalogue volume.",
          },
          {
            src: fig("yearly-release-of-netflix-contents.png"),
            caption:
              "Yearly Release Volume: Exponential catalogue scaling post-2015, reaching a historic peak of 2,153 titles in 2019.",
          },
          {
            src: fig("top-content-producing-countries.png"),
            caption:
              "Top Content-Producing Countries: The United States (3,291), India (990), and the UK (722) dominate global production.",
          },
        ],
      },
      {
        title:
          "2. Bivariate Analysis — Genre Interactions with Ratings & Geographic Specialization",
        body: [
          "Bivariate analysis examines two-way cross-tabulations and heatmaps to uncover how maturity ratings and geographic production territories interact with genre classifications.",
          "Genre vs Content Rating: Mature audience ratings (TV-MA) and teen ratings (TV-14) dominate the vast majority of Netflix genres. TV Dramas lead mature targeting at 56.4% TV-MA, followed by International TV Shows (51.8% TV-MA), Independent Movies (46.2% TV-MA), Stand-Up Comedy (85.4% TV-MA), and TV Horror (76.8% TV-MA).",
          "Family-Safe Content Segregation: In sharp contrast, Children & Family Movies functions as an insulated, family-safe content bucket dominated by PG (31.2%), TV-Y (18.4%), and TV-Y7 (15.8%), with virtually zero TV-MA titles. Similarly, Kids' TV splits almost entirely between TV-Y (39.5%) and TV-Y7 (41.6%). This confirms that Netflix operates two structurally separated pipelines: a mature general-audience catalogue and an insulated family ecosystem.",
          "Genre vs Country Specialization: The United States features the most balanced and diversified portfolio (Dramas 11.89%, Comedies 9.75%, Action 5.23%, Documentaries 6.84%). In contrast, India exhibits heavy concentration in feature-length cinema (International Movies and Dramas constitute over 50% of volume). The United Kingdom leads in British TV Shows and Documentaries, while Japan and South Korea stand out as television-led markets dominated by Anime Series and International TV Shows.",
        ],
        images: [
          {
            src: fig("content-rating-vs-genres-top-10.png"),
            caption:
              "Content Rating vs Top 10 Genres: Heavy TV-MA and TV-14 concentration across adult genres, contrasting with family categories.",
          },
          {
            src: fig("content-rating-vs-genres.png"),
            caption:
              "Content Rating vs Genres (Absolute Counts): Matrix showing International Movies contributing 983 TV-MA and 946 TV-14 titles.",
          },
          {
            src: fig("percentage-distribution-of-rating-all-genres.png"),
            caption:
              "Percentage Rating Distribution: Stand-Up Comedy (85.4% TV-MA) and TV Horror (76.8% TV-MA) demonstrate extreme mature skew.",
          },
          {
            src: fig("distribution-of-genres-across-countries.png"),
            caption:
              "Genre Distribution Across Countries: Heatmap showing distinct cultural concentrations across global production territories.",
          },
          {
            src: fig("top-genres-across-top-10-countries.png"),
            caption:
              "Top Genres Across Top 10 Producing Nations: Highlighting film dominance in India vs episodic TV dominance in Japan and South Korea.",
          },
        ],
      },
      {
        title: "3. Multivariate Analysis — Temporal Evolution of Genres (2008–2021)",
        body: [
          "Multivariate analysis tracks the three-way interaction among genres, release years, and catalogue growth to determine how Netflix's content mix has evolved over time.",
          "Staggered Genre Scaling: Content scaling did not occur uniformly across genres. Documentaries peaked first in 2017. International Movies expanded aggressively to peak in 2018 (representing the initial film-licensing surge). Core general-audience genres (Dramas and Comedies) reached their peak volume in 2019.",
          "Episodic Television Acceleration: International TV Shows demonstrated rapid, sustained expansion post-2016, maintaining high release velocity through 2020. This indicates a multi-phase corporate content strategy: rapid initial international film licensing to acquire subscribers quickly, followed by long-term investment in localized multi-season serialized dramas that maximize retention.",
          "Catalogue Diversification: Heatmaps spanning 2008–2021 reveal that while pre-2015 releases were limited to sporadic individual titles, the 2016–2020 period established dense, simultaneous investments across all 15 major genres, creating a resilient, globally diversified entertainment library.",
        ],
        images: [
          {
            src: fig("genre-popularity-trend.png"),
            caption:
              "Genre Popularity Trends Over Time: Staggered peaks with International Movies peaking in 2018 and Dramas/Comedies peaking in 2019.",
          },
          {
            src: fig("genre-availability-across-all-years.png"),
            caption:
              "Genre Availability Heatmap (2008–2021): Illustrating catalogue broadening from sparse pre-2015 titles into dense multi-genre coverage.",
          },
          {
            src: fig("top-10-genres-across-all-years.png"),
            caption:
              "Top 10 Genres Across Release Years: Longitudinal volume trends confirming Dramas and International Movies as primary volume pillars.",
          },
        ],
      },
    ],
  },
  results: {
    body: [
      "The exploratory analysis synthesizes six foundational empirical findings regarding Netflix's global catalogue architecture:",
      "1. Format Imbalance: Standalone Movies outnumber episodic TV Shows by approximately 2.2 to 1 (69.14% vs 30.86%), reflecting an acquisition foundation built on licensed feature films.",
      "2. Core Genre Anchors: International Movies (2,437 titles), Dramas (2,106 titles), Comedies (1,471 titles), and International TV Shows (1,198 titles) form the backbone of the platform, collectively accounting for over 42% of catalogue volume.",
      "3. Exponential 2016–2019 Scaling: Catalogue release velocity grew 24-fold between 2015 and 2019, scaling from under 90 titles/year to an all-time high of 2,153 titles in 2019.",
      "4. Geographic Concentration & Data Gaps: The United States (34.41%), India (10.35%), and the United Kingdom (7.55%) account for over 52% of total titles. An explicit 'Unknown' country category (506 titles, 5.29%) highlights an important metadata governance gap.",
      "5. Dual Audience Segmentation: Content maturity ratings reveal two insulated content pipelines: a mature general-audience core dominated by TV-MA and TV-14, and an isolated family-safe ecosystem (Children & Family Movies, Kids' TV) characterized by G, PG, TV-Y, and TV-Y7 ratings.",
      "6. Staggered Portfolio Evolution: Rapid international film licensing peaked first in 2018, followed by sustained growth in serialized international television through 2020, evidencing a planned transition toward high-retention episodic content.",
    ],
  },
  recommendations: {
    body: [
      "Translating empirical catalogue patterns into executive content acquisition and portfolio governance recommendations:",
    ],
    bullets: [
      "Accelerate Episodic Series Investment: With films still representing 69% of catalogue titles, continuing to expand serialized TV productions will maximize repeat viewing sessions and strengthen subscriber retention.",
      "Deepen Production in Under-Indexed High-Potential Markets: Expand localized original productions in populous, high-growth markets (e.g., Latin America, Southeast Asia, continental Europe) where title volume currently lags subscriber potential.",
      "Execute Market-Specific Acquisition Playbooks: Tailor procurement by region rather than applying a global template—prioritize film licensing in India, serialized TV and anime in Japan and South Korea, and diversified comedy/drama in the US/UK.",
      "Maintain Strict Family-Pipeline Isolation: Preserve the editorial and recommendation firewall between TV-MA/TV-14 titles and family programming to protect multi-user household personalization.",
      "Prioritize Metadata Governance: Audit and resolve the 506 'Unknown' country titles to eliminate analytical blind spots in regional licensing audits and territorial royalty reporting.",
      "Incorporate Staggered Production Lead Times: Anticipate the 12–24 month production lifecycle of multi-season series by using short-lead licensed films as tactical bridging content.",
    ],
  },
  learnings: {
    bullets: [
      "Multi-label categorical string decomposition and unnesting using pandas .explode()",
      "Systematic missing data diagnostics and non-destructive 'Unknown' category retention",
      "Univariate marginal distribution profiling and format ratio estimation",
      "Bivariate two-way cross-tabulation and heatmap matrix visualization",
      "Maturity rating aggregation and audience demographic segmentation",
      "Longitudinal cohort tracking across multi-year release distributions",
      "Visual communication of complex categorical distributions using Matplotlib and Seaborn",
      "Formulating evidence-based content strategy and platform governance recommendations",
    ],
  },
  enhancements: {
    bullets: [
      "Interactive BI Dashboards: Develop dynamic Tableau or Power BI dashboards with real-time filters by country, genre, rating, and runtime",
      "Catalogue Longevity & Decay Modeling: Train predictive models to estimate title viewing lifespan and optimal license renewal timing",
      "Content-Based Recommendation Engine: Build title recommendation algorithms leveraging unnested genre tags, cast affinities, and director profiles",
      "NLP Synopsis Mining: Apply TF-IDF, Topic Modeling (LDA), and sentiment analysis on Description text to uncover narrative sub-themes",
      "Critical Acclaim Integration: Merge IMDb and Rotten Tomatoes ratings to correlate genre and country output with critical and audience scores",
    ],
  },
};
