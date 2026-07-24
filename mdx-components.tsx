import type { MDXComponents } from 'mdx/types';

// Global MDX component overrides — used by any .mdx content (e.g. future
// long-form guides) so headings/code blocks match the docs design system.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-2xl font-semibold" {...props} />,
    h2: (props) => <h2 className="mt-8 text-xl font-semibold" {...props} />,
    code: (props) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />,
    ...components,
  };
}
