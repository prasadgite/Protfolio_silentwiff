import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { research } from "@/lib/content/research";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Prasad Gite" },
      {
        name: "description",
        content:
          "Structured technical investigations across time series, retrieval, and ML systems.",
      },
      { property: "og:title", content: "Research — Prasad Gite" },
      { property: "og:description", content: "Structured technical investigations." },
      { property: "og:url", content: "/research" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: ResearchIndex,
});

function ResearchIndex() {
  return (
    <>
      <section className="pt-16 pb-12 border-b border-border">
        <Container>
          <div className="text-eyebrow mb-6">§ RESEARCH / INDEX</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight max-w-3xl">
            Investigations and experiments.
          </h1>
          <p className="mt-6 text-foreground-secondary max-w-2xl">
            Structured technical investigations. Every entry shows an honest status — proposed, in
            progress, completed, or archived. Nothing is listed as completed unless it is.
          </p>
        </Container>
      </section>

      <Container>
        <div className="divide-y divide-border">
          {research.length === 0 && (
            <div className="py-24 text-center text-foreground-muted">No research entries yet.</div>
          )}
          {research.map((r) => (
            <Link
              key={r.slug}
              to="/research/$slug"
              params={{ slug: r.slug }}
              className="group grid md:grid-cols-[120px_1fr_160px] gap-6 md:gap-10 py-10 hover:bg-background-elevated/40 -mx-6 px-6 md:-mx-10 md:px-10 transition-colors"
            >
              <div>
                <div className="font-mono text-sm text-foreground-muted">{r.identifier}</div>
                <div className="mt-2">
                  <StatusIndicator status={r.status} />
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-normal text-foreground group-hover:text-accent tracking-tight">
                  {r.title}
                </h2>
                <p className="mt-2 text-foreground-secondary max-w-2xl">{r.description}</p>
              </div>
              <div className="text-right hidden md:block font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted">
                {r.categoryLabel}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
