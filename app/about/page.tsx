export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <article className="prose max-w-none">
      <h1>About</h1>

      <h2>Purpose</h2>
      <p>
        This repository and its documentation website exist to make a complete, practical
        Data Preprocessing and Exploratory Data Analysis curriculum navigable — every
        handbook, cheatsheet, dataset, and project in one indexed place.
      </p>

      <h2>Learning Philosophy</h2>
      <p>
        Learn by building. Each concept is paired with a real, end-to-end project rather
        than an isolated notebook cell — grounded in production-oriented practices, not
        just exploratory snippets.
      </p>

      <h2>Platform Vision</h2>
      <p>
        Everything here — handbooks, cheatsheets, datasets, and projects — is organized
        around a single learning path, so a visitor always knows what to read next and
        which project to apply it in.
      </p>

      <h2>Contributing</h2>
      <p>
        Interested in contributing a new project, handbook, cheatsheet, or dataset? Reach
        out via the project maintainers listed on the source repository.
      </p>

      <h2>What&apos;s Next</h2>
      <ul>
        <li>Expand the project library across more real-world domains</li>
        <li>Add a versioned handbook changelog</li>
        <li>Publish an RSS feed of repository updates</li>
      </ul>
    </article>
  );
}
