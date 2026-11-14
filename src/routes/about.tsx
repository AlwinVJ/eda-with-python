import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · EDA with Python Docs" },
      {
        name: "description",
        content: "About the EDA with Python curriculum and documentation site.",
      },
      { property: "og:title", content: "About" },
      {
        property: "og:description",
        content: "About the EDA with Python curriculum and documentation site.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="prose max-w-none space-y-6">
      <h1 className="text-2xl font-semibold">About</h1>

      <section>
        <h2 className="text-lg font-semibold">Purpose</h2>
        <p className="mt-2 text-muted-foreground">
          This repository and its documentation website exist to make a complete, practical Data
          Preprocessing and Exploratory Data Analysis curriculum navigable — every handbook,
          cheatsheet, dataset, and project in one indexed place.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Learning Philosophy</h2>
        <p className="mt-2 text-muted-foreground">
          Learn by building. Each concept is paired with a real, end-to-end project rather than an
          isolated notebook cell — grounded in production-oriented practices, not just exploratory
          snippets.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Platform Vision</h2>
        <p className="mt-2 text-muted-foreground">
          Everything here — handbooks, cheatsheets, datasets, and projects — is organized around a
          single learning path, so a visitor always knows what to read next and which project to
          apply it in.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Contributing</h2>
        <p className="mt-2 text-muted-foreground">
          Interested in contributing a new project, handbook, cheatsheet, or dataset? Reach out via
          the project maintainers listed on the source repository.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">What&apos;s Next</h2>
        <ul className="mt-2 list-inside list-disc text-muted-foreground">
          <li>Expand the project library across more real-world domains</li>
          <li>Add a versioned handbook changelog</li>
          <li>Publish an RSS feed of repository updates</li>
        </ul>
      </section>
    </article>
  );
}
