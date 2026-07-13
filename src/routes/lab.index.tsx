import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { MonoBadge } from "@/components/ui/MonoBadge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { lab } from "@/lib/content/lab";

export const Route = createFileRoute("/lab/")({
  head: () => ({
    meta: [
      { title: "Engineering Lab — Prasad Gite" },
      {
        name: "description",
        content:
          "Implementations, benchmarks, and prototypes across algorithms, C++, and ML systems.",
      },
      {
        property: "og:title",
        content: "Engineering Lab — Prasad Gite",
      },
      {
        property: "og:description",
        content:
          "Implementations, benchmarks, and prototypes across algorithms, C++, and ML systems.",
      },
      {
        property: "og:url",
        content: "/lab",
      },
    ],
    links: [{ rel: "canonical", href: "/lab" }],
  }),

  component: LabIndex,
});

const labHeaderVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const labHeaderItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const labRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function LabIndex() {
  const shouldReduceMotion = useReducedMotion();

  const summary = useMemo(() => {
    const active = lab.filter(
      (entry) => entry.status === "ACTIVE" || entry.status === "IN_PROGRESS",
    ).length;

    const completed = lab.filter(
      (entry) => entry.status === "COMPLETE" || entry.status === "REPRODUCED",
    ).length;

    const domains = new Set(lab.map((entry) => entry.domain)).size;

    return {
      experiments: lab.length,
      active,
      completed,
      domains,
    };
  }, []);

  return (
    <>
      <LabIndexHeader summary={summary} />

      <LabIndexColumnHeader />

      <main>
        <Container>
          <div className="border-b border-border">
            {lab.map((entry, index) => (
              <motion.div
                key={entry.slug}
                variants={shouldReduceMotion ? undefined : labRowVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
              >
                <Link
                  to="/lab/$slug"
                  params={{ slug: entry.slug }}
                  className={[
                    "group grid gap-6 py-8",
                    "transition-colors duration-200",
                    "hover:bg-background-elevated/40",
                    "focus-visible:outline-none",
                    "focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent",
                    "md:grid-cols-[140px_minmax(0,1fr)_140px_160px]",
                    "md:gap-8",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between md:block">
                    <div>
                      <div className="font-mono text-sm text-foreground-muted">
                        {entry.identifier}
                      </div>

                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
                        {entry.createdAt}
                      </div>
                    </div>

                    <div className="font-mono text-xs text-foreground-muted md:hidden">
                      {String(index + 1).padStart(2, "0")} / {String(lab.length).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-6">
                      <h2 className="text-xl font-normal tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
                        {entry.title}
                      </h2>

                      <span
                        aria-hidden="true"
                        className={[
                          "shrink-0 font-mono text-sm text-foreground-muted",
                          "transition-transform duration-200",
                          "group-hover:translate-x-1 group-hover:text-accent",
                          "md:hidden",
                        ].join(" ")}
                      >
                        →
                      </span>
                    </div>

                    <p className="mt-2 max-w-2xl leading-relaxed text-foreground-secondary">
                      {entry.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.technologies.map((technology) => (
                        <MonoBadge key={technology}>{technology}</MonoBadge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start md:justify-start">
                    <StatusIndicator status={entry.status} />
                  </div>

                  <div className="flex items-start justify-between gap-4 md:justify-end">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-muted md:text-right">
                      {entry.domainLabel}
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "hidden shrink-0 font-mono text-sm text-foreground-muted",
                        "transition-transform duration-200",
                        "group-hover:translate-x-1 group-hover:text-accent",
                        "md:inline",
                      ].join(" ")}
                    >
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </main>

      <LabIndexFooter />
    </>
  );
}

function LabIndexHeader({
  summary,
}: {
  summary: {
    experiments: number;
    active: number;
    completed: number;
    domains: number;
  };
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="border-b border-border pt-16 pb-12">
      <Container>
        <motion.div
          variants={shouldReduceMotion ? undefined : labHeaderVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="text-eyebrow"
          >
            § LAB / INDEX
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-6 max-w-3xl text-4xl font-normal tracking-tight md:text-5xl"
          >
            Engineering lab.
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-6 max-w-2xl leading-relaxed text-foreground-secondary"
          >
            Implementations, benchmarks, and prototypes across algorithms, systems programming, and
            machine learning infrastructure. Every entry reflects real planned, active, or completed
            work.
          </motion.p>

          <motion.dl
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-12 grid grid-cols-2 border-y border-border md:grid-cols-4"
          >
            <LabSummaryItem
              label="Experiments"
              value={String(summary.experiments).padStart(2, "0")}
            />

            <LabSummaryItem label="Active" value={String(summary.active).padStart(2, "0")} />

            <LabSummaryItem label="Completed" value={String(summary.completed).padStart(2, "0")} />

            <LabSummaryItem label="Domains" value={String(summary.domains).padStart(2, "0")} />
          </motion.dl>
        </motion.div>
      </Container>
    </header>
  );
}

function LabSummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border px-4 py-5 first:pl-0 md:border-r md:last:border-r-0">
      <dt className="text-eyebrow">{label}</dt>

      <dd className="mt-2 font-mono text-lg tracking-tight text-foreground">{value}</dd>
    </div>
  );
}

function LabIndexColumnHeader() {
  return (
    <div className="sticky top-16 z-30 hidden border-b border-border bg-background/95 backdrop-blur md:block">
      <Container>
        <div className="grid grid-cols-[140px_minmax(0,1fr)_140px_160px] gap-8 py-4">
          <div className="text-eyebrow">ENTRY</div>

          <div className="text-eyebrow">EXPERIMENT</div>

          <div className="text-eyebrow">STATUS</div>

          <div className="text-right text-eyebrow">DOMAIN</div>
        </div>
      </Container>
    </div>
  );
}

function LabIndexFooter() {
  return (
    <footer className="py-12">
      <Container>
        <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-[140px_minmax(0,1fr)] md:gap-8">
          <div className="text-eyebrow">STATUS POLICY</div>

          <p className="max-w-2xl text-sm leading-relaxed text-foreground-secondary">
            Planned entries describe intended work and methodology without fabricated results.
            Measurements, observations, and conclusions are published only after the corresponding
            implementation and experiment have been completed.
          </p>
        </div>
      </Container>
    </footer>
  );
}
