import { useEffect } from "react";
import { Github, FileText, NotebookPen, Database, ExternalLink } from "lucide-react";
import {
  getDataset,
  getAllHandbooks,
  getAllCheatsheets,
  githubUrl,
  githubBlobUrl,
  assetUrl,
} from "@/lib/content";
import { DifficultyBadge, StatusBadge, TechBadge } from "@/components/ui/badge";
import { getProjectRepoUrl, type Project } from "@/data/projects";
import { PROJECT_SECTION_ORDER, type ProjectDetails } from "@/data/projectDetails";

function getFileBlobUrl(project: Project, file: string): string {
  if (file.startsWith("http://") || file.startsWith("https://")) {
    return file;
  }
  if (project.githubRepoUrl) {
    return `${project.githubRepoUrl}/blob/main/${file}`;
  }
  return githubBlobUrl(`${project.githubPath}/${file}`);
}

/**
 * Shared template for every project detail page. Renders long-form sections
 * from `src/data/projectDetails` when registered, otherwise the standard
 * sections built from the project's metadata.
 */
export function ProjectDetailLayout({
  project,
  details,
}: {
  project: Project;
  details?: ProjectDetails;
}) {
  const repoUrl = getProjectRepoUrl(project, githubUrl);
  const dataset = getDataset(project.dataset);
  const relatedHandbooks = getAllHandbooks().filter((h) =>
    project.relatedHandbooks?.includes(h.slug),
  );
  const relatedCheatsheets = getAllCheatsheets().filter((c) =>
    project.relatedCheatsheets?.includes(c.slug),
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.slice(1);
      const target = document.getElementById(hashId);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, []);

  return (
    <article className="space-y-10">
      <header className="space-y-3 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={project.difficulty} />
          <StatusBadge status={project.status} />
          {project.estimatedTime && (
            <span className="text-xs text-muted-foreground">{project.estimatedTime}</span>
          )}
        </div>
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.librariesUsed.map((l) => (
            <TechBadge key={l}>{l}</TechBadge>
          ))}
        </div>
      </header>

      {details ? (
        PROJECT_SECTION_ORDER.filter(({ id }) => details[id]).map(({ id, title }) => {
          const s = details[id]!;
          return (
            <Section key={id} id={id} title={title}>
              <div
                className={s.placeholder ? "rounded-lg border border-dashed border-border p-3" : ""}
              >
                {s.placeholder && (
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent">
                    Placeholder — to be added
                  </p>
                )}
                <div className="space-y-2">
                  {s.body?.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
                {s.steps && (
                  <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                    {s.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                )}
                {s.images && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {s.images.map((img) => (
                      <figure
                        key={img.src}
                        className="overflow-hidden rounded-lg border border-border bg-card"
                      >
                        <img
                          src={img.src}
                          alt={img.caption}
                          loading="lazy"
                          className="w-full bg-white object-contain"
                        />
                        <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                          {img.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                {s.bullets && (
                  <div className="flex flex-wrap gap-1.5">
                    {s.bullets.map((b) => (
                      <span key={b} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                        {b}
                      </span>
                    ))}
                  </div>
                )}
                {s.subsections && (
                  <div className="space-y-6 pt-2">
                    {s.subsections.map((sub, idx) => (
                      <div
                        key={idx}
                        className="space-y-3 rounded-xl border border-border/70 bg-card/60 p-4 sm:p-5"
                      >
                        <h3 className="text-sm font-semibold text-foreground tracking-tight">
                          {sub.title}
                        </h3>
                        {sub.body && (
                          <div className="space-y-2">
                            {sub.body.map((p, i) => (
                              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>
                        )}
                        {sub.steps && (
                          <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                            {sub.steps.map((st, i) => (
                              <li key={i}>{st}</li>
                            ))}
                          </ol>
                        )}
                        {sub.bullets && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {sub.bullets.map((b) => (
                              <span
                                key={b}
                                className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                        {sub.images && (
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {sub.images.map((img) => (
                              <figure
                                key={img.src}
                                className="overflow-hidden rounded-lg border border-border bg-card"
                              >
                                <img
                                  src={img.src}
                                  alt={img.caption}
                                  loading="lazy"
                                  className="w-full bg-white object-contain"
                                />
                                <figcaption className="px-3 py-2 text-xs text-muted-foreground">
                                  {img.caption}
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Section>
          );
        })
      ) : (
        <>
          <Section title="Business Problem">
            <p className="text-sm text-muted-foreground">{project.businessProblem}</p>
          </Section>

          <Section title="Workflow">
            <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
              {project.workflow.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </Section>

          <Section title="Skills Learned">
            <div className="flex flex-wrap gap-1.5">
              {project.skillsLearned.map((s: string) => (
                <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {project.results && (
            <Section title="Results">
              <p className="text-sm text-muted-foreground">{project.results}</p>
            </Section>
          )}

          {project.lessonsLearned && (
            <Section title="Lessons Learned">
              <p className="text-sm text-muted-foreground">{project.lessonsLearned}</p>
            </Section>
          )}
        </>
      )}

      <Section title="GitHub Repository and Live Demo">
        <div className="flex flex-wrap gap-2 text-sm">
          {project.files.notebook && (
            <a
              href={getFileBlobUrl(project, project.files.notebook)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted"
            >
              <NotebookPen className="h-4 w-4" /> Open Notebook
            </a>
          )}
          {project.files.report && (
            <a
              href={getFileBlobUrl(project, project.files.report)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted"
            >
              <FileText className="h-4 w-4" /> Report
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted"
            >
              <Github className="h-4 w-4" /> View Source Code (GitHub)
            </a>
          )}
          {!repoUrl && !project.liveDemoUrl && (
            <p className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
              <span className="font-medium uppercase tracking-wide text-accent">
                Placeholder — to be added:{" "}
              </span>
              repository and live demo links.
            </p>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </Section>

      {dataset && (
        <Section title="Dataset">
          <div className="flex flex-wrap items-center gap-2 text-sm text-foreground">
            <Database className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="font-medium">{dataset.title}</span>
            {dataset.rows && dataset.columns && (
              <span className="text-xs text-muted-foreground">
                ({dataset.rows.toLocaleString()} rows × {dataset.columns} columns)
              </span>
            )}
            {dataset.sourceUrl && (
              <a
                href={dataset.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-accent hover:text-primary hover:underline transition-colors ml-1"
              >
                Source <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          {dataset.description && (
            <p className="mt-1 text-xs text-muted-foreground">{dataset.description}</p>
          )}
        </Section>
      )}

      {!details && project.visualizations && project.visualizations.length > 0 && (
        <Section title="Visualizations">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.visualizations.map((v: string) => (
              <img
                key={v}
                src={githubBlobUrl(`${project.githubPath}/${v}`).replace("/blob/", "/raw/")}
                alt={`${project.title} visualization`}
                className="w-full rounded-lg border border-border object-cover"
              />
            ))}
          </div>
        </Section>
      )}

      {(relatedHandbooks.length > 0 || relatedCheatsheets.length > 0) && (
        <Section title="Related Documentation">
          <ul className="space-y-1 text-sm">
            {relatedHandbooks.map((h) => (
              <li key={h.slug}>
                <a
                  href={assetUrl(h.githubPath, h.file)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:text-primary hover:underline transition-colors"
                >
                  {h.title} (Handbook PDF) <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
            {relatedCheatsheets.map((c) => (
              <li key={c.slug}>
                <a
                  href={assetUrl(c.githubPath, c.image)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:text-primary hover:underline transition-colors"
                >
                  {c.title} (Cheatsheet) <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
