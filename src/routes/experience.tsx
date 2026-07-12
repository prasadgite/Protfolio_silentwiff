import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { experience } from "@/lib/content/experience";
import { MonoBadge } from "@/components/ui/MonoBadge";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Prasad Gite" },
      {
        name: "description",
        content: "Professional engineering experience across ML systems and applied research.",
      },
      { property: "og:title", content: "Experience — Prasad Gite" },
      { property: "og:description", content: "Professional engineering experience." },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <>
      <section className="pt-16 pb-12 border-b border-border">
        <Container>
          <div className="text-eyebrow mb-6">§ EXPERIENCE</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight max-w-3xl">
            Where I've built systems.
          </h1>
        </Container>
      </section>

      <Container>
        <div className="divide-y divide-border">
          {experience.map((e) => (
            <div key={e.identifier} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-12">
              <div>
                <div className="font-mono text-sm text-foreground-muted">{e.identifier}</div>
                <div className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-foreground">
                  {e.period}
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted">
                  {e.location}
                </div>
              </div>
              <div>
                <div className="text-eyebrow mb-2">{e.role}</div>
                <h2 className="text-2xl md:text-3xl font-normal tracking-tight">{e.company}</h2>
                <p className="mt-4 text-foreground-secondary max-w-2xl leading-relaxed">
                  {e.summary}
                </p>

                <div className="mt-8">
                  <div className="text-eyebrow mb-3">SYSTEMS BUILT</div>
                  <ul className="flex flex-col gap-2 text-foreground-secondary">
                    {e.systems.map((s) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <div className="text-eyebrow mb-3">IMPACT</div>
                  <ul className="flex flex-col gap-2 text-foreground">
                    {e.impact.map((i) => (
                      <li key={i}>— {i}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {e.technologies.map((t) => (
                    <MonoBadge key={t}>{t}</MonoBadge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
