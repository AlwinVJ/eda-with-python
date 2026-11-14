import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { getProjectBySlug, getProjectByLegacySlug, type Project } from "@/data/projects";
import { getProjectDetails } from "@/data/projectDetails";
import { ProjectDetailLayout } from "@/components/project/ProjectDetailLayout";

// One dynamic route for every project: metadata from `src/data/projects.ts`,
// long-form content from `src/data/projectDetails`. No per-project pages.
export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      const moved = getProjectByLegacySlug(params.slug);
      if (moved)
        throw redirect({ to: "/projects/$slug", params: { slug: moved.slug }, statusCode: 301 });
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    const { project } = loaderData;
    const title =
      project.slug === "house-price-prediction"
        ? "California House Price Prediction"
        : project.title;
    const description =
      project.slug === "house-price-prediction"
        ? "End-to-end regression machine learning pipeline predicting California census block-group median home values using HistGradientBoostingRegressor, Scikit-learn pipelines, cross-validation, and an interactive Streamlit web dashboard."
        : project.description;
    return {
      meta: [
        { title: `${title} · EDA with Python Docs` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <p className="mt-2 text-muted-foreground">This project doesn't exist.</p>
    </div>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const detailProject: Project =
    project.slug === "house-price-prediction"
      ? {
          ...project,
          title: "California House Price Prediction",
          description:
            "End-to-end regression machine learning pipeline predicting California census block-group median home values using HistGradientBoostingRegressor, Scikit-learn pipelines, cross-validation, and an interactive Streamlit web dashboard.",
          githubRepoUrl: "https://github.com/AlwinVJ/california_house_price_prediction_model",
          liveDemoUrl: "https://californiahousepricepredictionmodel.streamlit.app/",
          dataset: "",
          librariesUsed: [
            "Python",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "HistGradientBoostingRegressor",
            "Joblib",
            "Matplotlib",
            "Seaborn",
            "Streamlit",
          ],
          files: {
            readme: "README.md",
            notebook: "house_price_prediction.ipynb",
            report: "California_House_Price_Prediction_Sample_Project_Report.pdf",
          },
        }
      : project;

  return <ProjectDetailLayout project={detailProject} details={getProjectDetails(project.slug)} />;
}
