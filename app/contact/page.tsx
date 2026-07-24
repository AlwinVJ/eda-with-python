import { Mail, Github } from 'lucide-react';

export const metadata = { title: 'Contact' };

// This site is a fully static export (no server, no API routes — see
// next.config.mjs `output: 'export'`), so a contact form with no backend to
// submit to would silently fail. A mailto link is the honest option until a
// form service (e.g. Formspree) or serverless function is wired up.
export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Contact</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Questions, corrections, or want to contribute a project, handbook, or dataset? Reach out directly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:hello@example.com"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Mail className="h-5 w-5 text-foreground" />
          </span>
          <div>
            <h2 className="font-semibold group-hover:text-accent">Email</h2>
            <p className="mt-1 text-sm text-muted-foreground">hello@example.com</p>
          </div>
        </a>

        <a
          href={process.env.NEXT_PUBLIC_REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Github className="h-5 w-5 text-foreground" />
          </span>
          <div>
            <h2 className="font-semibold group-hover:text-accent">GitHub</h2>
            <p className="mt-1 text-sm text-muted-foreground">Open an issue or start a discussion</p>
          </div>
        </a>
      </div>
    </div>
  );
}
