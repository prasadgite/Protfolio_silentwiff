import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { researchBySlug } from "@/lib/content/research";
import type { Research } from "@/lib/content/schemas";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

export const Route = createFileRoute("/research/$slug")({
  loader: ({ params }): { entry: Research } => {
    const entry = researchBySlug.get(params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.entry;
    return {
      meta: [
        { title: `${r.title} — Research` },
        { name: "description", content: r.description },
        { property: "og:title", content: r.title },
        { property: "og:description", content: r.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/research/${r.slug}` },
      ],
      links: [{ rel: "canonical", href: `/research/${r.slug}` }],
    };
  },
  notFoundComponent: () => (
    <Container>
      <div className="py-32">
        <h1 className="text-3xl">Not found.</h1>
        <Link to="/research" className="mt-6 inline-block text-accent">
          ← Research
        </Link>
      </div>
    </Container>
  ),
  component: ResearchDetail,
});

function ResearchDetail() {
  const { entry: r } = Route.useLoaderData() as { entry: Research };
  return (
    <article>
      <header className="pt-16 pb-16 border-b border-border">
        <Container>
          <Link
            to="/research"
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted hover:text-foreground"
          >
            ← RESEARCH
          </Link>
          <div className="mt-8 flex items-center gap-4 text-eyebrow">
            <span>{r.identifier}</span>
            <span>·</span>
            <span>{r.categoryLabel}</span>
            <StatusIndicator status={r.status} />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-normal tracking-tight">{r.title}</h1>
          <p className="mt-6 text-lg text-foreground-secondary max-w-2xl">{r.description}</p>
        </Container>
      </header>

      <section className="py-20 border-t border-border">
        <Container>
          <div className="max-w-2xl">
            <div className="text-eyebrow mb-4">STATUS / {r.status}</div>
            <p className="text-foreground-secondary leading-relaxed">
              This investigation is currently marked{" "}
              <strong className="text-foreground">
                {r.status.replace("_", " ").toLowerCase()}
              </strong>
              . Full methodology, dataset, results, and reproducibility notes will be published here
              as the work progresses. No results are fabricated — this page reflects the honest
              current state.
            </p>
            <Link to="/research" className="mt-8 inline-block text-accent hover:underline">
              ← All research
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
