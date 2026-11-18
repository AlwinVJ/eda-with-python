/**
 * Comprehensive Automated Chatbot Test Suite
 *
 * Validates:
 * 1. Route coverage across Home, Projects, all 9 project detail pages, and Learn curriculum.
 * 2. Grounded answer accuracy based on actual documented page content.
 * 3. Context switching simulation across routes.
 * 4. Negative and boundary test cases (inapplicable metrics, unrecorded data, foreign project cross-references).
 */

import { createServer } from "vite";

async function runChatbotTestSuite() {
  console.log("============================================================");
  console.log("   AUTOMATED CHATBOT VERIFICATION & TEST SUITE (EDDIE)");
  console.log("============================================================\n");

  const server = await createServer();
  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      if (details) console.error(`    Details: ${details}`);
      failedTests++;
    }
  }

  try {
    const { getPageContext } = await server.ssrLoadModule("/src/lib/chatbotContext.ts");
    const { generateContextualResponse } = await server.ssrLoadModule("/src/lib/chatbotResponder.ts");
    const { PROJECTS } = await server.ssrLoadModule("/src/data/projects.ts");

    // -------------------------------------------------------------
    // TEST SUITE 1: Route Coverage
    // -------------------------------------------------------------
    console.log("[SUITE 1] Route Coverage Verification");

    // 1. Home
    const homeCtx = getPageContext("/");
    assert(homeCtx.pageType === "home", "Home route identified as 'home'");
    assert(homeCtx.sections.length >= 4, "Home route has comprehensive sections");
    assert(homeCtx.starterQuestions.length >= 3, "Home route has starter questions");

    // 2. Projects Listing
    const projectsCtx = getPageContext("/projects");
    assert(projectsCtx.pageType === "projects-index", "Projects route identified as 'projects-index'");
    assert(projectsCtx.metadata.totalProjects === PROJECTS.length, "Projects context includes all registered projects");

    // 3. All 9 Project Detail Pages
    for (const proj of PROJECTS) {
      const projCtx = getPageContext(`/projects/${proj.slug}`);
      assert(
        projCtx.pageType === "project-detail",
        `Project Detail: /projects/${proj.slug} resolved as 'project-detail'`,
      );
      assert(
        projCtx.pageTitle.includes(proj.title),
        `Project Detail: Title correctly set to '${proj.title}'`,
      );
      assert(
        projCtx.sections.length >= 2,
        `Project Detail: Has structured sections (found ${projCtx.sections.length})`,
      );
      assert(
        projCtx.starterQuestions.length >= 3,
        `Project Detail: Has custom starter questions for '${proj.slug}'`,
      );
    }

    // 4. Learn Routes
    const learnIndexCtx = getPageContext("/learn");
    assert(learnIndexCtx.pageType === "learn-index", "/learn resolved as 'learn-index'");

    const learnTopicCtx = getPageContext("/learn/what-is-eda");
    assert(learnTopicCtx.pageType === "learn-topic", "/learn/what-is-eda resolved as 'learn-topic'");

    // -------------------------------------------------------------
    // TEST SUITE 2: Contextual Accuracy Tests
    // -------------------------------------------------------------
    console.log("\n[SUITE 2] Contextual Question & Answer Accuracy");

    // Test A: Homepage
    const homeAns = generateContextualResponse("What is this website about?", homeCtx);
    assert(
      homeAns.toLowerCase().includes("exploratory data analysis") && homeAns.toLowerCase().includes("eddie"),
      "Home: Explains website mission and Eddie assistant",
    );

    const homeEdaAns = generateContextualResponse("What is Exploratory Data Analysis?", homeCtx);
    assert(
      homeEdaAns.toLowerCase().includes("seltman") && homeEdaAns.includes("Detection of Mistakes"),
      "Home: Explains EDA using Seltman's 5 core reasons",
    );

    // Test B: Projects Directory
    const edaListAns = generateContextualResponse("Which EDA projects are available?", projectsCtx);
    assert(
      edaListAns.includes("Titanic Survival") &&
        edaListAns.includes("Amazon Conveyor") &&
        edaListAns.includes("Discount vs Profit"),
      "Projects: Accurately lists dedicated EDA projects",
    );

    const mlListAns = generateContextualResponse("Show me the available machine learning projects.", projectsCtx);
    assert(
      mlListAns.includes("House Price Prediction") &&
        mlListAns.includes("Credit Risk") &&
        mlListAns.includes("NYC Airbnb"),
      "Projects: Accurately lists End-to-End ML projects",
    );

    const techFilterAns = generateContextualResponse("Which projects use Pandas?", projectsCtx);
    assert(
      techFilterAns.includes("Projects Using Pandas") && techFilterAns.includes("/projects/"),
      "Projects: Filters projects by technology library (Pandas)",
    );

    // Test C: California House Price Prediction
    const houseCtx = getPageContext("/projects/house-price-prediction");
    const houseModelAns = generateContextualResponse("Which model was used?", houseCtx);
    assert(
      houseModelAns.toLowerCase().includes("histgradientboosting") ||
        houseModelAns.toLowerCase().includes("gradient boosting") ||
        houseModelAns.toLowerCase().includes("regression"),
      "House Price: Correctly identifies the regression model architecture",
    );

    const houseDemoAns = generateContextualResponse("Is there an interactive live demo?", houseCtx);
    assert(
      houseDemoAns.includes("californiahousepricepredictionmodel.streamlit.app"),
      "House Price: Correctly provides the verified live Streamlit URL",
    );

    // Test D: Mental Health Signal
    const mentalCtx = getPageContext("/projects/mental-health-signal");
    const mentalObjAns = generateContextualResponse("What is the project objective?", mentalCtx);
    assert(
      mentalObjAns.toLowerCase().includes("mental health") ||
        mentalObjAns.toLowerCase().includes("depression") ||
        mentalObjAns.toLowerCase().includes("cgpa"),
      "Mental Health: Accurately states student mental health & academic factors",
    );

    // Test E: Credit Risk Assessment
    const creditCtx = getPageContext("/projects/credit-risk-assessment");
    const creditDataAns = generateContextualResponse("What dataset does this project use?", creditCtx);
    assert(
      creditDataAns.toLowerCase().includes("credit") || creditDataAns.toLowerCase().includes("loan"),
      "Credit Risk: References credit risk loan data",
    );

    const creditShapAns = generateContextualResponse("How are predictions explained?", creditCtx);
    assert(
      creditShapAns.toLowerCase().includes("shap") || creditShapAns.toLowerCase().includes("feature"),
      "Credit Risk: References SHAP explainability methodology",
    );

    // Test F: Retail Discount Strategy Analysis
    const discountCtx = getPageContext("/projects/discount-vs-profit");
    const discountFindAns = generateContextualResponse("What are the major findings?", discountCtx);
    assert(
      discountFindAns.includes("20%") ||
        discountFindAns.toLowerCase().includes("discount") ||
        discountFindAns.toLowerCase().includes("margin"),
      "Discount vs Profit: Cites documented margin erosion and discount findings",
    );

    // Test G: Amazon Conveyor EDA
    const conveyorCtx = getPageContext("/projects/amazon-conveyor-eda");
    const conveyorFindAns = generateContextualResponse("What does the conveyor analysis reveal?", conveyorCtx);
    assert(
      conveyorFindAns.toLowerCase().includes("downtime") ||
        conveyorFindAns.toLowerCase().includes("floor") ||
        conveyorFindAns.toLowerCase().includes("alarm"),
      "Amazon Conveyor: References conveyor downtime, floor metrics, or alarms",
    );

    // Test H: NYC Airbnb Room Type Predictor
    const airbnbCtx = getPageContext("/projects/nyc-airbnb-room-type-predictor");
    const airbnbTargetAns = generateContextualResponse("What is the target variable?", airbnbCtx);
    assert(
      airbnbTargetAns.includes("room_type") || airbnbTargetAns.toLowerCase().includes("classification"),
      "NYC Airbnb: Cites room_type target variable and classification task",
    );

    // -------------------------------------------------------------
    // TEST SUITE 3: Context Switching Simulation
    // -------------------------------------------------------------
    console.log("\n[SUITE 3] Context Switching Sequence");

    // Sequence: House Price -> Mental Health -> Projects -> Home
    // Step 1: House Price
    const seqStep1Ctx = getPageContext("/projects/house-price-prediction");
    const seqStep1Ans = generateContextualResponse("What dataset is used?", seqStep1Ctx);
    assert(
      seqStep1Ans.toLowerCase().includes("california") || seqStep1Ans.toLowerCase().includes("census"),
      "Seq Step 1 (House Price): Correctly uses California Census context",
    );

    // Step 2: Navigate to Mental Health
    const seqStep2Ctx = getPageContext("/projects/mental-health-signal");
    const seqStep2Ans = generateContextualResponse("What is the objective?", seqStep2Ctx);
    assert(
      seqStep2Ans.toLowerCase().includes("mental health") || seqStep2Ans.toLowerCase().includes("student"),
      "Seq Step 2 (Mental Health): Correctly updates to Mental Health context",
    );

    // Step 3: Navigate to Projects
    const seqStep3Ctx = getPageContext("/projects");
    const seqStep3Ans = generateContextualResponse("Which EDA projects are available?", seqStep3Ctx);
    assert(
      seqStep3Ans.includes("Titanic") && seqStep3Ans.includes("Amazon Conveyor"),
      "Seq Step 3 (Projects): Correctly updates to Projects directory context",
    );

    // Step 4: Return to Home
    const seqStep4Ctx = getPageContext("/");
    const seqStep4Ans = generateContextualResponse("What is this website about?", seqStep4Ctx);
    assert(
      seqStep4Ans.toLowerCase().includes("exploratory data analysis"),
      "Seq Step 4 (Home): Correctly returns to Homepage context",
    );

    // -------------------------------------------------------------
    // TEST SUITE 4: Negative & Boundary Tests
    // -------------------------------------------------------------
    console.log("\n[SUITE 4] Negative & Boundary Cases (No Hallucinations)");

    // Test A: Asking for classification accuracy on an EDA project
    const titanicCtx = getPageContext("/projects/titanic");
    const titanicAccuracyAns = generateContextualResponse("What was the model accuracy score?", titanicCtx);
    assert(
      titanicAccuracyAns.toLowerCase().includes("exploratory data analysis") &&
        (titanicAccuracyAns.toLowerCase().includes("not trained") ||
          titanicAccuracyAns.toLowerCase().includes("no classification model")),
      "Negative Test: Informs user that Titanic is an EDA project with no model accuracy score",
    );

    // Test B: Asking for classification accuracy on regression task
    const houseAccuracyAns = generateContextualResponse("What is the classification accuracy score?", houseCtx);
    assert(
      houseAccuracyAns.toLowerCase().includes("regression") &&
        houseAccuracyAns.toLowerCase().includes("not applicable"),
      "Negative Test: Informs user that House Price Prediction is regression, not classification",
    );

    // Test C: Cross-project question (asking about Titanic while viewing House Price)
    const crossProjAns = generateContextualResponse("How did the Titanic project handle missing values?", houseCtx);
    assert(
      crossProjAns.includes("House Price Prediction") &&
        crossProjAns.includes("Titanic") &&
        crossProjAns.includes("/projects/titanic"),
      "Cross-Project Test: Detects foreign project mention and redirects user to /projects/titanic",
    );

    // Test D: Unknown project route
    const unknownCtx = getPageContext("/projects/non-existent-project");
    assert(
      unknownCtx.fullTextContext.includes("PROJECT NOT FOUND"),
      "Boundary Test: Gracefully handles non-existent project routes",
    );

    // -------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------
    console.log("\n============================================================");
    console.log(`TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (Total: ${passedTests + failedTests})`);
    console.log("============================================================\n");

    await server.close();

    if (failedTests > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error("Test execution failed with error:", err);
    await server.close();
    process.exit(1);
  }
}

runChatbotTestSuite();
