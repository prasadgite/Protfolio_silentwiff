import { useRef, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";

import { Container } from "@/components/layout/Container";
import { MonoBadge } from "@/components/ui/MonoBadge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { projectDomains, projects } from "@/lib/content/projects";

const WORK_EASE = [0.22, 1, 0.36, 1] as const;

const domainValues = projectDomains.map((domain) => domain.value);

const searchSchema = z.object({
  domain: z
    .string()
    .optional()
    .transform((value) => (value && domainValues.includes(value as never) ? value : undefined)),
});

/* =========================================================
   WORK HEADER ANIMATION
========================================================= */

const workHeaderContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const workHeaderItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: WORK_EASE,
    },
  },
};

/* =========================================================
   FILTER ENTRANCE ANIMATION
========================================================= */

const workFilterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
      delay: 0.18,
      ease: WORK_EASE,
    },
  },
};

/* =========================================================
   PROJECT RESULT-SET ANIMATION
========================================================= */

const projectListVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },

  exit: {
    opacity: 0,

    transition: {
      duration: 0.16,
      ease: "easeOut",
      staggerChildren: 0.025,
      staggerDirection: -1,
    },
  },
};

/* =========================================================
   PROJECT ROW ANIMATION
========================================================= */

const projectRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.42,
      ease: WORK_EASE,
    },
  },

  exit: {
    opacity: 0,
    y: -6,

    transition: {
      duration: 0.14,
      ease: "easeOut",
    },
  },
};

export const Route = createFileRoute("/work")({
  validateSearch: searchSchema,

  head: () => ({
    meta: [
      {
        title: "Work — Prasad Gite",
      },
      {
        name: "description",
        content:
          "Selected engineering projects across ML systems, algorithms, and real-time infrastructure.",
      },
      {
        property: "og:title",
        content: "Work — Prasad Gite",
      },
      {
        property: "og:description",
        content:
          "Selected engineering projects across ML systems, algorithms, and real-time infrastructure.",
      },
      {
        property: "og:url",
        content: "/work",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "/work",
      },
    ],
  }),

  component: WorkRoute,
});
function WorkRoute() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isWorkIndex = pathname === "/work" || pathname === "/work/";

  if (!isWorkIndex) {
    return <Outlet />;
  }

  return <WorkIndex />;
}

function WorkIndex() {
  const { domain = "ALL" } = Route.useSearch();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const resultsRef = useRef<HTMLDivElement>(null);

  const [lockedResultsHeight, setLockedResultsHeight] = useState<number | null>(null);

  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);

  const filtered =
    domain === "ALL" ? projects : projects.filter((project) => project.domain === domain);

  const handleDomainChange = (nextDomain: string) => {
    if (nextDomain === domain || isFilterTransitioning) {
      return;
    }

    if (shouldReduceMotion) {
      setLockedResultsHeight(null);
      setIsFilterTransitioning(false);

      void navigate({
        to: "/work",
        search: nextDomain === "ALL" ? {} : { domain: nextDomain },
        resetScroll: false,
      });

      return;
    }

    const currentHeight = resultsRef.current?.getBoundingClientRect().height;

    if (currentHeight !== undefined && currentHeight > 0) {
      setLockedResultsHeight(currentHeight);
    }

    setIsFilterTransitioning(true);

    void navigate({
      to: "/work",
      search: nextDomain === "ALL" ? {} : { domain: nextDomain },
      resetScroll: false,
    });
  };

  const handleExitComplete = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLockedResultsHeight(null);
      });
    });
  };

  const handleListAnimationComplete = (definition: string) => {
    if (definition === "visible") {
      setIsFilterTransitioning(false);
    }
  };

  return (
    <>
      {/* =========================================================
          WORK HEADER
      ========================================================= */}

      <section className="border-b border-border pt-16 pb-12">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? undefined : workHeaderContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
          >
            <motion.div variants={shouldReduceMotion ? undefined : workHeaderItemVariants}>
              <Link
                to="/"
                className={[
                  "inline-flex items-center",
                  "font-mono text-[11px] uppercase tracking-[0.14em]",
                  "text-foreground-muted",
                  "transition-colors duration-200",
                  "hover:text-foreground",
                  "focus-visible:outline-none",
                  "focus-visible:ring-1 focus-visible:ring-accent",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                ].join(" ")}
              >
                ← HOME
              </Link>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? undefined : workHeaderItemVariants}
              className="mt-8 mb-6 text-eyebrow"
            >
              § WORK / INDEX
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? undefined : workHeaderItemVariants}
              className="max-w-3xl text-4xl font-normal tracking-tight md:text-5xl"
            >
              Selected engineering work.
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : workHeaderItemVariants}
              className="mt-6 max-w-2xl text-foreground-secondary"
            >
              Projects presented as engineering case studies — architecture, decisions, results, and
              limitations. {projects.length} projects on record.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* =========================================================
          STICKY FILTER BAR
      ========================================================= */}

      <section className="sticky top-14 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? undefined : workFilterVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            className={[
              "flex gap-2 py-4",
              "flex-nowrap overflow-x-auto",
              "md:flex-wrap md:overflow-visible",
            ].join(" ")}
          >
            {projectDomains.map((projectDomain) => {
              const active = domain === projectDomain.value;

              return (
                <button
                  key={projectDomain.value}
                  type="button"
                  aria-pressed={active}
                  disabled={!shouldReduceMotion && isFilterTransitioning}
                  onClick={() => handleDomainChange(projectDomain.value)}
                  className={[
                    "shrink-0",
                    "border px-3 py-1.5",
                    "font-mono text-[11px] uppercase tracking-[0.12em]",
                    "transition-colors duration-200",
                    "focus-visible:outline-none",
                    "focus-visible:ring-1",
                    "focus-visible:ring-accent",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-background",
                    "disabled:cursor-default disabled:opacity-60",
                    active
                      ? "border-foreground bg-surface text-foreground"
                      : [
                          "border-border text-foreground-muted",
                          "hover:border-border-strong hover:text-foreground",
                        ].join(" "),
                  ].join(" ")}
                >
                  {projectDomain.label}
                </button>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* =========================================================
          PROJECT RESULTS
      ========================================================= */}

      <Container>
        <div
          ref={resultsRef}
          style={{
            minHeight: lockedResultsHeight === null ? undefined : `${lockedResultsHeight}px`,
          }}
        >
          <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
            <motion.div
              key={domain}
              variants={shouldReduceMotion ? undefined : projectListVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={shouldReduceMotion ? undefined : "visible"}
              exit={shouldReduceMotion ? undefined : "exit"}
              onAnimationComplete={handleListAnimationComplete}
            >
              {filtered.length === 0 && (
                <div className="py-24 text-center text-foreground-muted">
                  No projects match this filter yet.
                </div>
              )}

              {filtered.map((project, index) => (
                <motion.div
                  key={project.slug}
                  variants={shouldReduceMotion ? undefined : projectRowVariants}
                  className={[
                    "relative",
                    "border-t border-border",
                    index === filtered.length - 1 ? "border-b" : "",
                  ].join(" ")}
                >
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className={[
                      "group relative grid",
                      "md:grid-cols-[120px_1fr_180px]",
                      "gap-6 md:gap-10",
                      "py-8 md:py-10",
                      "-mx-6 px-6 md:-mx-10 md:px-10",
                      "transition-colors duration-200",
                      "hover:bg-background-elevated/40",
                      "focus-visible:outline-none",
                      "focus-visible:ring-1",
                      "focus-visible:ring-inset",
                      "focus-visible:ring-accent",
                      "motion-reduce:transition-none",
                    ].join(" ")}
                  >
                    {/* Interaction rail */}

                    <span
                      aria-hidden="true"
                      className={[
                        "pointer-events-none",
                        "absolute left-0 top-0",
                        "h-full w-[2px]",
                        "origin-center scale-y-0 opacity-0",
                        "bg-accent",
                        "transition-[transform,opacity] duration-300",
                        "ease-out",
                        "group-hover:scale-y-100 group-hover:opacity-100",
                        "group-focus-visible:scale-y-100",
                        "group-focus-visible:opacity-100",
                        "motion-reduce:transition-none",
                      ].join(" ")}
                    />

                    {/* Mobile metadata */}

                    <div className="min-w-0 md:hidden">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 font-mono text-xs text-foreground-muted">
                          {project.identifier}
                        </div>

                        <div className="min-w-0 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
                          {project.domainLabel}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <StatusIndicator status={project.status} />

                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] text-foreground-muted"
                        >
                          ·
                        </span>

                        <span className="font-mono text-xs text-foreground-muted">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Desktop metadata */}

                    <div className="hidden min-w-0 md:block">
                      <div className="font-mono text-sm text-foreground-muted">
                        {project.identifier}
                      </div>

                      <div className="mt-2">
                        <StatusIndicator status={project.status} />
                      </div>

                      <div className="mt-2 font-mono text-xs text-foreground-muted">
                        {project.year}
                      </div>
                    </div>

                    {/* Project content */}

                    <div
                      className={[
                        "min-w-0",
                        "transition-transform duration-300 ease-out",
                        "group-hover:translate-x-1",
                        "group-focus-visible:translate-x-1",
                        "motion-reduce:transition-none",
                        "motion-reduce:transform-none",
                      ].join(" ")}
                    >
                      <h2
                        className={[
                          "text-2xl font-normal tracking-tight md:text-3xl",
                          "text-foreground",
                          "transition-colors duration-200",
                          "group-hover:text-accent",
                          "group-focus-visible:text-accent",
                          "motion-reduce:transition-none",
                        ].join(" ")}
                      >
                        {project.title}
                      </h2>

                      <p className="mt-3 max-w-2xl leading-relaxed text-foreground-secondary">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((technology) => (
                          <MonoBadge key={technology}>{technology}</MonoBadge>
                        ))}
                      </div>
                    </div>

                    {/* Desktop domain */}

                    <div className="hidden min-w-0 md:flex md:flex-col md:items-end md:text-right">
                      <div
                        className={[
                          "font-mono text-[11px] uppercase tracking-[0.14em]",
                          "text-foreground-muted",
                          "transition-colors duration-200",
                          "group-hover:text-foreground-secondary",
                          "group-focus-visible:text-foreground-secondary",
                          "motion-reduce:transition-none",
                        ].join(" ")}
                      >
                        {project.domainLabel}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </>
  );
}
