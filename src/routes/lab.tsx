import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { lab } from "@/lib/content/lab";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { MonoBadge } from "@/components/ui/MonoBadge";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Engineering Lab — Prasad Gite" },
      {
        name: "description",
        content:
          "Implementations, benchmarks, and prototypes across algorithms, C++, and ML systems.",
      },
      { property: "og:title", content: "Engineering Lab — Prasad Gite" },
      { property: "og:description", content: "Implementations, benchmarks, and prototypes." },
      { property: "og:url", content: "/lab" },
    ],
    links: [{ rel: "canonical", href: "/lab" }],
  }),
  component: LabIndex,
});

function LabIndex() {
  return (
    <>
      <section className="pt-16 pb-12 border-b border-border">
        <Container>
          <div className="text-eyebrow mb-6">§ LAB / INDEX</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight max-w-3xl">
            Engineering lab.
          </h1>
          <p className="mt-6 text-foreground-secondary max-w-2xl">
            Smaller technical implementations, benchmarks, and prototypes. Entries are added as they
            are actually built — every status is honest.
          </p>
        </Container>
      </section>

      <Container>
        <div className="divide-y divide-border">
          {lab.map((l) => (
            <Link
              key={l.slug}
              to="/lab/$slug"
              params={{ slug: l.slug }}
              className="group grid md:grid-cols-[120px_1fr_180px] gap-6 md:gap-10 py-10 hover:bg-background-elevated/40 -mx-6 px-6 md:-mx-10 md:px-10 transition-colors"
            >
              <div>
                <div className="font-mono text-sm text-foreground-muted">{l.identifier}</div>
                <div className="mt-2">
                  <StatusIndicator status={l.status} />
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-normal text-foreground group-hover:text-accent tracking-tight">
                  {l.title}
                </h2>
                <p className="mt-2 text-foreground-secondary max-w-2xl">{l.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {l.technologies.map((t) => (
                    <MonoBadge key={t}>{t}</MonoBadge>
                  ))}
                </div>
              </div>
              <div className="text-right hidden md:block font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted">
                {l.domainLabel}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
