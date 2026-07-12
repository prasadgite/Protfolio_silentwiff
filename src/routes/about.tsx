import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { capabilities } from "@/lib/content/capabilities";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Prasad Gite" },
      {
        name: "description",
        content: "Engineering background, philosophy, and technical trajectory.",
      },
      { property: "og:title", content: "About — Prasad Gite" },
      {
        property: "og:description",
        content: "Engineering background, philosophy, and technical trajectory.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative isolate overflow-hidden bg-background">
      {/* =========================================================
          GLOBAL ABOUT PAGE BACKGROUND

          One image.
          Covers the complete About page.
          Scrolls naturally with the document.

          No sticky.
          No fixed.
          No JS scroll state.
          No Motion scroll hooks.
      ========================================================= */}

      <div aria-hidden="true" className="absolute inset-0 -z-30">
        <img
          src="/images/about/about-bg3.jpeg"
          alt=""
          fetchPriority="high"
          className={[
            "h-full w-full",
            "object-cover",
            "object-[60%_top]",
            "md:object-[68%_top]",
            "lg:object-[72%_top]",
          ].join(" ")}
        />
      </div>

      {/* =========================================================
          GLOBAL DARK TREATMENT

          Consistent across the entire page.
      ========================================================= */}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-background/55"
      />

      {/* =========================================================
          GLOBAL READABILITY GRADIENT

          Keeps the left/content side darker while preserving
          visibility of the portrait.
      ========================================================= */}

      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 -z-10",
          "bg-gradient-to-r",
          "from-background/95",
          "via-background/75",
          "to-background/25",
        ].join(" ")}
      />

      {/* =========================================================
          OPTIONAL TECHNICAL GRID

          Static decorative texture.
          Does not participate in scrolling or animation.
      ========================================================= */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-10",
          "opacity-[0.025]",
          "[background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
          "[background-size:64px_64px]",
        ].join(" ")}
      />

      {/* =========================================================
          01 / ABOUT HERO
      ========================================================= */}

      <section
        className={[
          "relative",
          "h-[calc(100svh-4rem)]",
          "min-h-[560px]",
          "border-b border-border/70",
        ].join(" ")}
      >
        <Container className="h-full">
          <div className="flex h-full items-center py-10 md:py-12">
            <div className="max-w-[38rem] lg:max-w-[40rem]">
              <div className="mb-5 text-eyebrow">§ 01 / ABOUT</div>

              <h1 className="text-4xl font-normal leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Software engineer working across ML systems, algorithms, and
                data-intensive infrastructure.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
                I build systems where algorithms, machine learning, and
                infrastructure meet — with an emphasis on measurable behavior,
                explicit engineering decisions, and production constraints.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-muted">
                <span>ML SYSTEMS</span>
                <span aria-hidden="true">/</span>
                <span>ALGORITHMS</span>
                <span aria-hidden="true">/</span>
                <span>DATA SYSTEMS</span>
              </div>

              <div className="mt-10 hidden items-center gap-4 md:flex">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
                  Scroll to continue
                </span>

                <div aria-hidden="true" className="h-px w-16 bg-border" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          02 / BACKGROUND
      ========================================================= */}

      <section className="relative border-b border-border/70 py-16 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-16">
            <div className="text-eyebrow">§ 02 / BACKGROUND</div>

            <div className="max-w-3xl">
              <div className="prose-editorial">
                <p>
                  My work sits between three layers: the algorithms that decide
                  what a system does, the ML models that let it adapt, and the
                  infrastructure that lets it operate reliably at real-world
                  scale.
                </p>

                <p>
                  I hold a Bachelor of Technology from Vishwakarma Institute of
                  Technology, Pune (2021–2025), and am currently pursuing
                  graduate studies in Data Science. Most recently I led
                  machine-learning engineering at Aurum Innovations, where I
                  built computer vision pipelines and inference infrastructure
                  end-to-end.
                </p>

                <p>
                  My trajectory has moved from application development toward
                  ML systems, algorithms, quantitative computing, and
                  high-performance systems. I am currently focused on modern
                  C++, advanced algorithms, and the systems engineering that
                  sits underneath production ML.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          03 / PRINCIPLES
      ========================================================= */}

      <section className="relative border-b border-border/70 py-16 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-16">
            <div className="text-eyebrow">§ 03 / PRINCIPLES</div>

            <div className="max-w-3xl">
              <div className="border-t border-border/70">
                <Principle index="01" title="Baselines before hero models.">
                  An interpretable baseline establishes whether additional model
                  complexity is justified. On FlowVest, ARIMA provides the
                  always-on baseline before an account becomes eligible for the
                  LSTM path.
                </Principle>

                <Principle index="02" title="Evidence over claims.">
                  Capabilities should map to projects, engineering decisions,
                  benchmarks, or measurable outcomes. Unsupported claims do not
                  belong in the portfolio.
                </Principle>

                <Principle index="03" title="Systems, not scripts.">
                  Production ML includes preprocessing, inference, data
                  movement, observability, failure handling, and operational
                  constraints — not only the model artifact.
                </Principle>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================
          04 / CAPABILITY MATRIX
      ========================================================= */}

      <section className="relative border-b border-border/70 py-16 md:py-20">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="text-eyebrow">§ 04 / CAPABILITY MATRIX</div>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-secondary">
                Technical domains mapped to the technologies used and the work
                that provides evidence for each capability.
              </p>
            </div>

            <div className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-muted md:block">
              {capabilities.length.toString().padStart(2, "0")} DOMAINS
            </div>
          </div>

          <div className="overflow-hidden border border-border/70 bg-background/30 backdrop-blur-[2px]">
            <div className="hidden grid-cols-[200px_1fr_1fr] border-b border-border/70 bg-background/45 md:grid">
              <div className="px-4 py-3 text-eyebrow">Domain</div>
              <div className="px-4 py-3 text-eyebrow">Technologies</div>
              <div className="px-4 py-3 text-eyebrow">Evidence</div>
            </div>

            {capabilities.map((capability, index) => (
              <div
                key={capability.domain}
                className={[
                  "grid gap-4 p-5",
                  "border-b border-border/70 last:border-b-0",
                  "md:grid-cols-[200px_1fr_1fr]",
                  "md:gap-0 md:p-0",
                  "transition-colors duration-200",
                  "motion-reduce:transition-none",
                  "[@media(hover:hover)]:hover:bg-background/45",
                ].join(" ")}
              >
                <div className="md:px-4 md:py-4">
                  <div className="mb-2 text-eyebrow md:hidden">
                    DOMAIN {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
                    {capability.domain}
                  </div>
                </div>

                <div className="md:px-4 md:py-4">
                  <div className="mb-2 text-eyebrow md:hidden">
                    TECHNOLOGIES
                  </div>

                  <div className="text-sm leading-relaxed text-foreground-secondary">
                    {capability.technologies.join(", ")}
                  </div>
                </div>

                <div className="md:px-4 md:py-4">
                  <div className="mb-2 text-eyebrow md:hidden">EVIDENCE</div>

                  <div className="text-sm leading-relaxed text-foreground-secondary">
                    {capability.projectSlug ? (
                      <Link
                        to="/work/$slug"
                        params={{ slug: capability.projectSlug }}
                        className={[
                          "text-accent underline-offset-4",
                          "hover:underline",
                          "focus-visible:outline-none",
                          "focus-visible:ring-1 focus-visible:ring-accent",
                        ].join(" ")}
                      >
                        {capability.evidence} ↗
                      </Link>
                    ) : (
                      capability.evidence
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================
          05 / CONTACT
      ========================================================= */}

      <section className="relative py-16 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-16">
            <div className="text-eyebrow">§ 05 / CONTACT</div>

            <div className="max-w-3xl">
              <p className="text-lg leading-relaxed text-foreground-secondary">
                Interested in ML systems, algorithmic infrastructure,
                quantitative computing, or performance-oriented engineering
                work?
              </p>

              <div className="mt-6">
                {site.email ? (
                  <a
                    href={`mailto:${site.email}`}
                    className={[
                      "inline-flex text-accent underline-offset-4",
                      "hover:underline",
                      "focus-visible:outline-none",
                      "focus-visible:ring-1 focus-visible:ring-accent",
                    ].join(" ")}
                  >
                    {site.email} ↗
                  </a>
                ) : (
                  <p className="text-sm text-foreground-muted">
                    Email pending — reach out via GitHub or LinkedIn in the
                    footer.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Principle({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-b border-border/70 py-8 last:border-b-0 sm:grid-cols-[48px_minmax(0,1fr)]">
      <div className="font-mono text-[11px] tracking-[0.14em] text-foreground-muted">
        {index}
      </div>

      <div>
        <h2 className="text-lg font-normal text-foreground">{title}</h2>

        <p className="mt-3 leading-relaxed text-foreground-secondary">
          {children}
        </p>
      </div>
    </div>
  );
}