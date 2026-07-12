import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { Container } from "@/components/layout/Container";
import { MonoBadge } from "@/components/ui/MonoBadge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { projectBySlug } from "@/lib/content/projects";
import type { Project } from "@/lib/content/schemas";

type CaseSectionId =
  "problem" | "requirements" | "architecture" | "decisions" | "results" | "limitations" | "future";

type CaseSectionMeta = {
  id: CaseSectionId;
  title: string;
};

const PROJECT_EASE = [0.22, 1, 0.36, 1] as const;

const projectHeaderContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const projectHeaderItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: PROJECT_EASE,
    },
  },
};

const projectTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      ease: PROJECT_EASE,
    },
  },
};

const caseSectionContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const caseSectionHeadingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: PROJECT_EASE,
    },
  },
};

const caseSectionContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      ease: PROJECT_EASE,
    },
  },
};

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = projectBySlug.get(params.slug);

    if (!project) {
      throw notFound();
    }

    return { project };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          {
            title: "Not found",
          },
          {
            name: "robots",
            content: "noindex",
          },
        ],
      };
    }

    const project = loaderData.project;
    const title = `${project.title} — Prasad Gite`;

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: project.description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: project.description,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:url",
          content: `/work/${project.slug}`,
        },
      ],

      links: [
        {
          rel: "canonical",
          href: `/work/${project.slug}`,
        },
      ],

      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.title,
            description: project.description,
            programmingLanguage: project.technologies,
            author: {
              "@type": "Person",
              name: "Prasad Gite",
            },
          }),
        },
      ],
    };
  },

  notFoundComponent: () => (
    <Container>
      <div className="py-32">
        <div className="mb-6 text-eyebrow">404</div>

        <h1 className="text-3xl">Project not found.</h1>

        <Link
          to="/work"
          className={[
            "mt-6 inline-block text-accent",
            "hover:underline",
            "focus-visible:outline-none",
            "focus-visible:ring-1 focus-visible:ring-accent",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background",
          ].join(" ")}
        >
          ← All work
        </Link>
      </div>
    </Container>
  ),

  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  const shouldReduceMotion = useReducedMotion();

  const [activeSectionId, setActiveSectionId] = useState<CaseSectionId>("problem");

  const visibleSectionIdsRef = useRef<Set<CaseSectionId>>(new Set());

  const caseSections = useMemo<CaseSectionMeta[]>(
    () => [
      {
        id: "problem",
        title: "Problem",
      },
      {
        id: "requirements",
        title: "Requirements",
      },
      {
        id: "architecture",
        title: "System architecture",
      },

      ...(project.decisions.length > 0
        ? [
            {
              id: "decisions" as const,
              title: "Engineering decisions",
            },
          ]
        : []),

      ...(project.results.length > 0
        ? [
            {
              id: "results" as const,
              title: "Results",
            },
          ]
        : []),

      ...(project.limitations.length > 0
        ? [
            {
              id: "limitations" as const,
              title: "Limitations",
            },
          ]
        : []),

      ...(project.future.length > 0
        ? [
            {
              id: "future" as const,
              title: "What I would change",
            },
          ]
        : []),
    ],
    [
      project.decisions.length,
      project.results.length,
      project.limitations.length,
      project.future.length,
    ],
  );

  const sectionNumberById = useMemo(
    () =>
      new Map<CaseSectionId, string>(
        caseSections.map((section, index) => [section.id, String(index + 1).padStart(2, "0")]),
      ),
    [caseSections],
  );

  const sectionNumber = (id: CaseSectionId) => sectionNumberById.get(id) ?? "00";

  useEffect(() => {
    const sectionElements = caseSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const visibleSectionIds = visibleSectionIdsRef.current;

    visibleSectionIds.clear();

    const validSectionIds = new Set(caseSections.map((section) => section.id));

    const isValidSectionId = (sectionId: string): sectionId is CaseSectionId =>
      validSectionIds.has(sectionId as CaseSectionId);

    const syncActiveSectionFromHash = () => {
      const hashSectionId = window.location.hash.slice(1);

      if (isValidSectionId(hashSectionId)) {
        setActiveSectionId(hashSectionId);
      }
    };

    syncActiveSectionFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isValidSectionId(entry.target.id)) {
            return;
          }

          if (entry.isIntersecting) {
            visibleSectionIds.add(entry.target.id);
          } else {
            visibleSectionIds.delete(entry.target.id);
          }
        });

        const nextActiveSection = caseSections.find((section) => visibleSectionIds.has(section.id));

        if (nextActiveSection) {
          setActiveSectionId((currentSectionId) =>
            currentSectionId === nextActiveSection.id ? currentSectionId : nextActiveSection.id,
          );
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0,
      },
    );

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    window.addEventListener("hashchange", syncActiveSectionFromHash);
    window.addEventListener("popstate", syncActiveSectionFromHash);

    return () => {
      observer.disconnect();

      visibleSectionIds.clear();

      window.removeEventListener("hashchange", syncActiveSectionFromHash);

      window.removeEventListener("popstate", syncActiveSectionFromHash);
    };
  }, [caseSections]);

  const handleSectionNavigation = (sectionId: CaseSectionId) => {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    window.history.pushState(null, "", `#${sectionId}`);

    setActiveSectionId(sectionId);

    target.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <article>
      {/* PROJECT HEADER */}

      <header className="border-b border-border pt-16 pb-16">
        <Container>
          <motion.div
            variants={shouldReduceMotion ? undefined : projectHeaderContainerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
          >
            <motion.div variants={shouldReduceMotion ? undefined : projectHeaderItemVariants}>
              <Link
                to="/work"
                className={[
                  "font-mono text-[11px] uppercase tracking-[0.14em]",
                  "text-foreground-muted",
                  "transition-colors duration-200",
                  "hover:text-foreground",
                  "focus-visible:outline-none",
                  "focus-visible:ring-1 focus-visible:ring-accent",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-background",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                ← WORK
              </Link>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? undefined : projectHeaderItemVariants}
              className="mt-8 flex flex-wrap items-center gap-4 text-eyebrow"
            >
              <span>{project.identifier}</span>

              <span aria-hidden="true">·</span>

              <span>{project.domainLabel}</span>

              <span aria-hidden="true">·</span>

              <span>{project.year}</span>

              <StatusIndicator status={project.status} />
            </motion.div>

            <motion.h1
              variants={shouldReduceMotion ? undefined : projectTitleVariants}
              className="mt-6 text-4xl font-normal tracking-tight md:text-6xl"
            >
              {project.title}
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : projectHeaderItemVariants}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-secondary"
            >
              {project.summary}
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? undefined : projectHeaderItemVariants}
              className="mt-8 flex flex-wrap gap-2"
            >
              {project.technologies.map((technology) => (
                <MonoBadge key={technology}>{technology}</MonoBadge>
              ))}
            </motion.div>

            <motion.dl
              variants={shouldReduceMotion ? undefined : projectHeaderItemVariants}
              className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4"
            >
              <Meta k="Role" v={project.role} />

              <Meta k="Status" v={project.status.replaceAll("_", " ")} />

              <Meta k="Year" v={project.year} />

              <Meta
                k="Repository"
                v={
                  project.repository ? (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "text-accent",
                        "hover:underline",
                        "focus-visible:outline-none",
                        "focus-visible:ring-1 focus-visible:ring-accent",
                        "focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-background",
                      ].join(" ")}
                    >
                      GitHub ↗
                    </a>
                  ) : (
                    "Not published"
                  )
                }
              />
            </motion.dl>
          </motion.div>
        </Container>
      </header>

      {/* STICKY CASE-STUDY NAVIGATION */}

      <section className="sticky top-14 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <Container>
          <nav aria-label="Case study sections" className="overflow-x-auto">
            <div className="flex min-w-max items-center gap-1 py-3">
              {caseSections.map((section) => {
                const active = activeSectionId === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    aria-current={active ? "location" : undefined}
                    onClick={() => handleSectionNavigation(section.id)}
                    className={[
                      "shrink-0 border px-3 py-1.5",
                      "font-mono text-[11px] uppercase tracking-[0.12em]",
                      "transition-colors duration-200",
                      "focus-visible:outline-none",
                      "focus-visible:ring-1 focus-visible:ring-accent",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-background",
                      "motion-reduce:transition-none",
                      active
                        ? "border-foreground bg-surface text-foreground"
                        : [
                            "border-transparent",
                            "text-foreground-muted",
                            "hover:border-border-strong",
                            "hover:text-foreground",
                          ].join(" "),
                    ].join(" ")}
                  >
                    <span className="mr-2 text-accent">{sectionNumber(section.id)}</span>

                    {section.title}
                  </button>
                );
              })}
            </div>
          </nav>
        </Container>
      </section>

      <CaseSection id="problem" n={sectionNumber("problem")} title="Problem">
        <p>{project.problem}</p>
      </CaseSection>

      <CaseSection id="requirements" n={sectionNumber("requirements")} title="Requirements">
        <ul>
          {project.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection id="architecture" n={sectionNumber("architecture")} title="System architecture">
        <p>{project.architecture}</p>
      </CaseSection>

      {project.decisions.length > 0 && (
        <CaseSection id="decisions" n={sectionNumber("decisions")} title="Engineering decisions">
          <div className="not-prose flex flex-col gap-8">
            {project.decisions.map((decision) => (
              <div
                key={decision.title}
                className={[
                  "border border-border bg-background-elevated/40 p-6 md:p-8",
                  "transition-colors duration-200",
                  "hover:border-border-strong",
                  "hover:bg-background-elevated/70",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                <div className="mb-2 text-eyebrow">DECISION RECORD</div>

                <h3 className="mb-6 text-xl font-normal text-foreground">{decision.title}</h3>

                <DecisionField label="Context" value={decision.context} />

                <DecisionField
                  label="Options considered"
                  value={
                    <ul>
                      {decision.options.map((option) => (
                        <li key={option}>{option}</li>
                      ))}
                    </ul>
                  }
                />

                <DecisionField label="Decision" value={decision.decision} />

                <DecisionField label="Rationale" value={decision.rationale} />

                <DecisionField label="Trade-offs" value={decision.tradeoffs} />
              </div>
            ))}
          </div>
        </CaseSection>
      )}

      {project.results.length > 0 && (
        <CaseSection id="results" n={sectionNumber("results")} title="Results">
          <div className="not-prose grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3">
            {project.results.map((metric) => (
              <div
                key={metric.label}
                className={[
                  "group bg-background p-6",
                  "transition-colors duration-200",
                  "hover:bg-background-elevated",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                <div className="text-3xl transition-colors duration-200 group-hover:text-accent motion-reduce:transition-none">
                  {metric.value}
                </div>

                <div className="mt-2 text-eyebrow">{metric.label}</div>

                {metric.context && (
                  <div className="mt-1 text-xs text-foreground-muted">{metric.context}</div>
                )}
              </div>
            ))}
          </div>
        </CaseSection>
      )}

      {project.limitations.length > 0 && (
        <CaseSection id="limitations" n={sectionNumber("limitations")} title="Limitations">
          <ul>
            {project.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </CaseSection>
      )}

      {project.future.length > 0 && (
        <CaseSection id="future" n={sectionNumber("future")} title="What I would change">
          <ul>
            {project.future.map((futureChange) => (
              <li key={futureChange}>{futureChange}</li>
            ))}
          </ul>
        </CaseSection>
      )}

      <section className="border-t border-border py-16">
        <Container>
          <Link
            to="/work"
            className={[
              "text-accent",
              "hover:underline",
              "focus-visible:outline-none",
              "focus-visible:ring-1 focus-visible:ring-accent",
              "focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
            ].join(" ")}
          >
            ← All work
          </Link>
        </Container>
      </section>
    </article>
  );
}

function Meta({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div>
      <dt className="mb-2 text-eyebrow">{k}</dt>

      <dd className="text-sm text-foreground">{v}</dd>
    </div>
  );
}

function CaseSection({
  id,
  n,
  title,
  children,
}: {
  id: CaseSectionId;
  n: string;
  title: string;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id={id} className="scroll-mt-32 border-t border-border py-16">
      <Container>
        <motion.div
          variants={shouldReduceMotion ? undefined : caseSectionContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          className="grid gap-8 md:grid-cols-[160px_1fr] md:gap-16"
        >
          <motion.div variants={shouldReduceMotion ? undefined : caseSectionHeadingVariants}>
            <div className="text-eyebrow">§ {n}</div>

            <h2 className="mt-3 text-2xl font-normal tracking-tight text-foreground">{title}</h2>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : caseSectionContentVariants}
            className="prose-editorial"
          >
            {children}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function DecisionField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-border py-3 first:border-t-0 md:grid-cols-[140px_1fr] md:gap-6">
      <div className="pt-1 text-eyebrow">{label}</div>

      <div className="text-[15px] leading-relaxed text-foreground-secondary">{value}</div>
    </div>
  );
}
