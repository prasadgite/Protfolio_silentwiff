import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { labBySlug } from "@/lib/content/lab";
import type { LabEntry } from "@/lib/content/schemas";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { MonoBadge } from "@/components/ui/MonoBadge";

export const Route = createFileRoute("/lab/$slug")({
  loader: ({ params }): { entry: LabEntry } => {
    const entry = labBySlug.get(params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const l = loaderData.entry;
    return {
      meta: [
        { title: `${l.title} — Lab` },
        { name: "description", content: l.description },
        { property: "og:title", content: l.title },
        { property: "og:description", content: l.description },
        { property: "og:url", content: `/lab/${l.slug}` },
      ],
      links: [{ rel: "canonical", href: `/lab/${l.slug}` }],
    };
  },
  notFoundComponent: () => (
    <Container>
      <div className="py-32">
        <h1 className="text-3xl">Not found.</h1>
        <Link to="/lab" className="mt-6 inline-block text-accent">
          ← Lab
        </Link>
      </div>
    </Container>
  ),
  component: LabDetail,
});

function LabDetail() {
  const { entry: l } = Route.useLoaderData() as { entry: LabEntry };
  return (
    <article>
      <header className="pt-16 pb-16 border-b border-border">
        <Container>
          <Link
            to="/lab"
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted hover:text-foreground"
          >
            ← LAB
          </Link>
          <div className="mt-8 flex items-center gap-4 text-eyebrow">
            <span>{l.identifier}</span>
            <span>·</span>
            <span>{l.domainLabel}</span>
            <StatusIndicator status={l.status} />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-normal tracking-tight">{l.title}</h1>
          <p className="mt-6 text-lg text-foreground-secondary max-w-2xl">{l.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {l.technologies.map((t) => (
              <MonoBadge key={t}>{t}</MonoBadge>
            ))}
          </div>
        </Container>
      </header>
      <section className="py-20 border-t border-border">
        <Container>
          <div className="max-w-2xl text-foreground-secondary leading-relaxed">
            <div className="text-eyebrow mb-4">STATUS / {l.status}</div>
            <p>
              This lab entry is{" "}
              <strong className="text-foreground">
                {l.status.replace("_", " ").toLowerCase()}
              </strong>
              . Implementation, methodology, and benchmark results will be published here as the
              work is completed.
            </p>
            {l.complexity && (
              <p className="mt-4">
                <span className="text-eyebrow">Complexity target:</span> {l.complexity}
              </p>
            )}
            <Link to="/lab" className="mt-8 inline-block text-accent hover:underline">
              ← All lab entries
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
