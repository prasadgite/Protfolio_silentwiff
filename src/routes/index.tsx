import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { Container, Section } from "@/components/layout/Container";
import { FocusExplorer } from "@/components/home/FocusExplorer";
import { MonoBadge } from "@/components/ui/MonoBadge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

import { featuredProjects } from "@/lib/content/projects";
import { ImpactSection } from "@/components/home/ImpactSection";
import { lab } from "@/lib/content/lab";
import { notes } from "@/lib/content/notes";
import { site } from "@/lib/site-config";

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.11,
    },
  },
};

const heroActionsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.07,
    },
  },
};

const heroActionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: HERO_EASE,
    },
  },
};

const heroDescriptionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.28,
      duration: 0.55,
      ease: HERO_EASE,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: HERO_EASE,
    },
  },
};

const portraitEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.28,
      duration: 0.72,
      ease: HERO_EASE,
    },
  },
};

const heroHeadlineVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.1,
    },
  },
};

const heroLineVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.72,
      ease: HERO_EASE,
    },
  },
};

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const shouldReduceMotion = useReducedMotion();

  const recentLab = lab.slice(0, 3);
  const recentNotes = notes.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[calc(100svh-4rem)] items-center py-12 md:py-16">
        <div className="w-full">
          <Container>
            <div className="relative">
              <motion.div
                variants={shouldReduceMotion ? undefined : heroContainerVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? undefined : "visible"}
                className="w-full max-w-5xl"
              >
                <motion.div
                  variants={shouldReduceMotion ? undefined : heroItemVariants}
                  className="text-eyebrow mb-8"
                >
                  SOFTWARE ENGINEER / ML SYSTEMS
                </motion.div>

                <motion.h1
                  variants={shouldReduceMotion ? undefined : heroHeadlineVariants}
                  className="max-w-5xl text-[clamp(2.75rem,6vw,4.75rem)] font-normal leading-[1.03] tracking-[-0.03em]"
                >
                  <span className="block overflow-hidden">
                    <motion.span
                      variants={shouldReduceMotion ? undefined : heroLineVariants}
                      className="block"
                    >
                      CTRL yourself,
                    </motion.span>
                  </span>

                  <span className="block overflow-hidden">
                    <motion.span
                      variants={shouldReduceMotion ? undefined : heroLineVariants}
                      className="block text-foreground-muted"
                    >
                      Alter your thinking,
                    </motion.span>
                  </span>

                  <span className="block overflow-hidden">
                    <motion.span
                      variants={shouldReduceMotion ? undefined : heroLineVariants}
                      className="block"
                    >
                      Delete negativity.
                    </motion.span>
                  </span>
                </motion.h1>

                <motion.p
                  variants={shouldReduceMotion ? undefined : heroDescriptionVariants}
                  className="mt-8 max-w-[46rem] text-base leading-7 text-foreground-secondary sm:text-lg sm:leading-8 md:mt-10"
                >
                  {site.tagline} Currently pursuing graduate studies in Data Science and exploring
                  high-performance computing, quantitative systems, advanced algorithms, and modern
                  C++.
                </motion.p>

                <motion.div
                  variants={shouldReduceMotion ? undefined : heroActionsContainerVariants}
                  className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-12"
                >
                  <motion.div variants={shouldReduceMotion ? undefined : heroActionVariants}>
                    <Link
                      to="/work"
                      className={[
                        "group inline-flex items-center gap-2 rounded-sm px-5 py-3",
                        "bg-foreground text-background",
                        "font-mono text-[12px] uppercase tracking-[0.14em]",
                        "transition-colors duration-200",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus-visible:outline-none",
                        "focus-visible:ring-1 focus-visible:ring-accent",
                        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        "motion-reduce:transition-none",
                      ].join(" ")}
                    >
                      <span>Explore my work</span>

                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className={[
                          "transition-transform duration-200",
                          "group-hover:translate-x-0.5",
                          "group-hover:-translate-y-0.5",
                          "group-focus-visible:translate-x-0.5",
                          "group-focus-visible:-translate-y-0.5",
                          "motion-reduce:transition-none",
                          "motion-reduce:transform-none",
                        ].join(" ")}
                      />
                    </Link>
                  </motion.div>

                  <motion.div variants={shouldReduceMotion ? undefined : heroActionVariants}>
                    <Link
                      to="/resume"
                      className={[
                        "group inline-flex items-center gap-1.5 rounded-sm",
                        "font-mono text-[12px] uppercase tracking-[0.14em]",
                        "text-foreground-secondary",
                        "transition-colors duration-200",
                        "hover:text-foreground",
                        "focus-visible:outline-none",
                        "focus-visible:ring-1 focus-visible:ring-accent",
                        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        "motion-reduce:transition-none",
                      ].join(" ")}
                    >
                      <span>Resume</span>

                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className={[
                          "transition-transform duration-200",
                          "group-hover:translate-x-0.5",
                          "group-hover:-translate-y-0.5",
                          "group-focus-visible:translate-x-0.5",
                          "group-focus-visible:-translate-y-0.5",
                          "motion-reduce:transition-none",
                          "motion-reduce:transform-none",
                        ].join(" ")}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={shouldReduceMotion ? undefined : portraitEntranceVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? undefined : "visible"}
                className={[
                  "absolute right-0 top-0 hidden h-full",
                  "xl:block xl:w-[450px]",
                  "2xl:w-[400px]",
                  "min-[1800px]:w-[500px]",
                ].join(" ")}
              >
                <div className="relative h-full overflow-hidden border border-border">
                  <img
                    src="/images/bgblurred.png"
                    alt="Portrait of Prasad Gite"
                    className="h-full w-full object-cover object-[50%_35%]"
                  />

                  <span className="absolute left-4 top-4 z-10 font-mono text-[11px] text-accent">
                    01
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute right-[-1px] top-[28%] z-10 h-[38%] w-[3px] bg-accent"
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </div>
      </section>

      {/* Focus */}
      <FocusExplorer />

      {/* Selected work */}
      <Section
        eyebrow="§ 02 / WORK"
        title="Selected engineering work"
        aside={
          <Link to="/work" className="hover:text-foreground">
            ALL WORK →
          </Link>
        }
      >
        <div className="flex flex-col">
          {featuredProjects.map((p, i) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className={[
                "group relative grid",
                "md:grid-cols-[100px_1fr_auto]",
                "gap-6 md:gap-10",
                "border-t border-border",
                "py-10",
                "-mx-6 px-6 md:-mx-10 md:px-10",
                "transition-colors duration-200",
                "hover:bg-background-elevated/40",
                "focus-visible:outline-none",
                "focus-visible:ring-1",
                "focus-visible:ring-inset",
                "focus-visible:ring-accent",
              ].join(" ")}
              style={{
                borderBottomWidth: i === featuredProjects.length - 1 ? "1px" : 0,
              }}
            >
              <span
                aria-hidden="true"
                className={[
                  "pointer-events-none",
                  "absolute left-0 top-0",
                  "h-full w-[2px]",
                  "origin-center scale-y-0 opacity-0",
                  "bg-accent",
                ].join(" ")}
              />

              <div className="min-w-0">
                <div className="font-mono text-sm text-foreground-muted">{p.identifier}</div>

                <div className="mt-2">
                  <StatusIndicator status={p.status} />
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-2xl font-normal tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent md:text-3xl">
                  {p.title}
                </h3>

                <p className="mt-3 max-w-2xl leading-relaxed text-foreground-secondary">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.technologies.slice(0, 5).map((technology) => (
                    <MonoBadge key={technology}>{technology}</MonoBadge>
                  ))}

                  {p.technologies.length > 5 && <MonoBadge>+{p.technologies.length - 5}</MonoBadge>}
                </div>
              </div>

              <div className="hidden min-w-0 items-start pt-1 md:flex">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-muted">
                  {p.domainLabel}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Impact */}
      {/* Impact */}
      <ImpactSection />

      {/* Recent lab */}
      <Section
        eyebrow="§ 04 / LAB"
        title="Recent lab entries"
        aside={
          <Link to="/lab" className="hover:text-foreground">
            ALL LAB →
          </Link>
        }
      >
        <div className="divide-y divide-border border-y border-border">
          {recentLab.map((entry) => (
            <Link
              key={entry.slug}
              to="/lab/$slug"
              params={{ slug: entry.slug }}
              className="group -mx-6 grid gap-4 px-6 py-6 transition-colors hover:bg-background-elevated/40 md:-mx-10 md:grid-cols-[100px_1fr_auto] md:gap-8 md:px-10"
            >
              <div className="font-mono text-sm text-foreground-muted">{entry.identifier}</div>

              <div>
                <div className="text-foreground group-hover:text-accent">{entry.title}</div>

                <div className="mt-1 text-sm text-foreground-secondary">{entry.description}</div>
              </div>

              <div className="flex md:justify-end">
                <StatusIndicator status={entry.status} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Recent notes */}
      <Section
        eyebrow="§ 05 / NOTES"
        title="Recent notes"
        aside={
          <Link to="/notes" className="hover:text-foreground">
            ALL NOTES →
          </Link>
        }
      >
        <div className="divide-y divide-border border-y border-border">
          {recentNotes.map((note) => (
            <Link
              key={note.slug}
              to="/notes/$slug"
              params={{ slug: note.slug }}
              className="group -mx-6 grid gap-4 px-6 py-6 transition-colors hover:bg-background-elevated/40 md:-mx-10 md:grid-cols-[160px_1fr_auto] md:gap-8 md:px-10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted">
                {note.categoryLabel}
              </div>

              <div>
                <div className="text-foreground">{note.title}</div>

                <div className="mt-1 max-w-xl text-sm text-foreground-secondary">
                  {note.description}
                </div>
              </div>

              <div className="font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
                {note.publishedAt}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
