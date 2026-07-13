import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, type Variants, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/Container";
import { MonoBadge } from "@/components/ui/MonoBadge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { getAdjacentLabEntries, labBySlug } from "@/lib/content/lab";
import type { LabEntry } from "@/lib/content/schemas";

export const Route = createFileRoute("/lab/$slug")({
  loader: ({ params }): { entry: LabEntry } => {
    const entry = labBySlug.get(params.slug);

    if (!entry) {
      throw notFound();
    }

    return { entry };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }],
      };
    }

    const entry = loaderData.entry;

    return {
      meta: [
        {
          title: `${entry.title} — Engineering Lab | Prasad Gite`,
        },
        {
          name: "description",
          content: entry.description,
        },
        {
          property: "og:title",
          content: `${entry.title} — Engineering Lab`,
        },
        {
          property: "og:description",
          content: entry.description,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:url",
          content: `/lab/${entry.slug}`,
        },
      ],

      links: [
        {
          rel: "canonical",
          href: `/lab/${entry.slug}`,
        },
      ],
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

type LabSectionId =
  | "objective"
  | "hypothesis"
  | "setup"
  | "methodology"
  | "implementation"
  | "measurements"
  | "results"
  | "observations"
  | "limitations"
  | "next-steps";

type LabSectionDefinition = {
  id: LabSectionId;
  title: string;
};

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

const labSectionVariants: Variants = {
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

function getLabSections(entry: LabEntry): LabSectionDefinition[] {
  const sections: LabSectionDefinition[] = [];

  if (entry.objective) {
    sections.push({
      id: "objective",
      title: "Objective",
    });
  }

  if (entry.hypothesis) {
    sections.push({
      id: "hypothesis",
      title: "Hypothesis",
    });
  }

  if (entry.setup.length > 0) {
    sections.push({
      id: "setup",
      title: "Experimental setup",
    });
  }

  if (entry.methodology.length > 0) {
    sections.push({
      id: "methodology",
      title: "Methodology",
    });
  }

  if (entry.implementation.length > 0) {
    sections.push({
      id: "implementation",
      title: entry.status === "PLANNED" ? "Planned implementation" : "Implementation",
    });
  }

  if (entry.measurements.length > 0) {
    sections.push({
      id: "measurements",
      title: entry.status === "PLANNED" ? "Planned measurements" : "Measurements",
    });
  }

  if (entry.results.length > 0) {
    sections.push({
      id: "results",
      title: "Results",
    });
  }

  if (entry.observations.length > 0) {
    sections.push({
      id: "observations",
      title: "Observations",
    });
  }

  if (entry.limitations.length > 0) {
    sections.push({
      id: "limitations",
      title: "Limitations",
    });
  }

  if (entry.nextSteps.length > 0) {
    sections.push({
      id: "next-steps",
      title: "Next steps",
    });
  }

  return sections;
}

function useLabSectionNavigation(sections: LabSectionDefinition[]) {
  const shouldReduceMotion = useReducedMotion();

  const [activeSection, setActiveSection] = useState<LabSectionId | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const sectionIds = sections.map((section) => section.id);

    const updateActiveSection = () => {
      const activationOffset = 180;

      let currentSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= activationOffset) {
          currentSection = sectionId;
        } else {
          break;
        }
      }

      setActiveSection((current) => (current === currentSection ? current : currentSection));
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      return;
    }

    const section = sections.find((candidate) => candidate.id === hash);

    if (!section) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const element = document.getElementById(section.id);

      if (!element) {
        return;
      }

      element.scrollIntoView({
        behavior: "auto",
        block: "start",
      });

      setActiveSection(section.id);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [sections]);

  const navigateToSection = useCallback(
    (sectionId: LabSectionId) => {
      const element = document.getElementById(sectionId);

      if (!element) {
        return;
      }

      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}#${sectionId}`,
      );

      element.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });

      setActiveSection(sectionId);
    },
    [shouldReduceMotion],
  );

  return {
    activeSection,
    navigateToSection,
  };
}

function LabDetail() {
  const { entry } = Route.useLoaderData();

  const sections = useMemo(() => getLabSections(entry), [entry]);

  const adjacentEntries = useMemo(() => getAdjacentLabEntries(entry.slug), [entry.slug]);

  const { activeSection, navigateToSection } = useLabSectionNavigation(sections);

  return (
    <article>
      <LabDetailHeader entry={entry} />

      {sections.length > 0 && (
        <LabSectionNavigation
          sections={sections}
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />
      )}

      <div className="border-b border-border">
        {sections.map((section, index) => (
          <LabContentSection
            key={section.id}
            id={section.id}
            number={String(index + 1).padStart(2, "0")}
            title={section.title}
          >
            <LabSectionContent entry={entry} sectionId={section.id} />
          </LabContentSection>
        ))}
      </div>

      <LabDetailFooter previous={adjacentEntries.previous} next={adjacentEntries.next} />
    </article>
  );
}

function LabDetailHeader({ entry }: { entry: LabEntry }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="border-b border-border pt-16 pb-16">
      <Container>
        <motion.div
          variants={shouldReduceMotion ? undefined : labHeaderVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.div variants={shouldReduceMotion ? undefined : labHeaderItemVariants}>
            <Link
              to="/lab"
              className={[
                "font-mono text-[11px] uppercase tracking-[0.14em]",
                "text-foreground-muted transition-colors",
                "hover:text-foreground",
                "focus-visible:outline-none",
                "focus-visible:ring-1 focus-visible:ring-accent",
              ].join(" ")}
            >
              ← LAB
            </Link>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-eyebrow"
          >
            <span>{entry.identifier}</span>

            <span aria-hidden="true">·</span>

            <span>{entry.domainLabel}</span>

            <span aria-hidden="true">·</span>

            <span>{entry.createdAt}</span>

            <StatusIndicator status={entry.status} />
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-6 max-w-4xl text-4xl font-normal tracking-tight md:text-5xl"
          >
            {entry.title}
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground-secondary"
          >
            {entry.summary ?? entry.description}
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-6 flex flex-wrap gap-2"
          >
            {entry.technologies.map((technology) => (
              <MonoBadge key={technology}>{technology}</MonoBadge>
            ))}
          </motion.div>

          <motion.dl
            variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
            className="mt-12 grid grid-cols-2 border-y border-border md:grid-cols-4"
          >
            <LabMetadataItem label="Created" value={entry.createdAt} />

            <LabMetadataItem label="Updated" value={entry.updatedAt ?? "—"} />

            <LabMetadataItem label="Status" value={entry.status.replaceAll("_", " ")} />

            <LabMetadataItem
              label="Repository"
              value={entry.repository ? "Published" : "Not published"}
            />
          </motion.dl>

          {entry.complexity && (
            <motion.div
              variants={shouldReduceMotion ? undefined : labHeaderItemVariants}
              className="mt-8 max-w-3xl"
            >
              <div className="text-eyebrow">COMPLEXITY TARGET</div>

              <p className="mt-3 leading-relaxed text-foreground-secondary">{entry.complexity}</p>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </header>
  );
}

function LabSectionNavigation({
  sections,
  activeSection,
  onNavigate,
}: {
  sections: LabSectionDefinition[];
  activeSection: LabSectionId | null;
  onNavigate: (sectionId: LabSectionId) => void;
}) {
  return (
    <nav
      aria-label="Lab entry sections"
      className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur"
    >
      <Container>
        <div className="overflow-x-auto">
          <div className="flex min-w-max">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={[
                    "relative shrink-0 px-4 py-4",
                    "font-mono text-[10px] uppercase tracking-[0.12em]",
                    "transition-colors duration-200",
                    "focus-visible:outline-none",
                    "focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent",
                    isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground",
                  ].join(" ")}
                >
                  <span className="mr-2 text-foreground-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {section.title}

                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-x-4 bottom-0 h-px origin-left bg-accent",
                      "transition-transform duration-200",
                      isActive ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </nav>
  );
}

function LabMetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-border px-4 py-5 first:pl-0 md:border-r md:first:pl-0 md:last:border-r-0">
      <dt className="text-eyebrow">{label}</dt>

      <dd className="mt-2 break-words font-mono text-xs uppercase tracking-[0.1em] text-foreground-secondary">
        {value}
      </dd>
    </div>
  );
}

function LabContentSection({
  id,
  number,
  title,
  children,
}: {
  id: LabSectionId;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      className="scroll-mt-40 border-t border-border py-16 first:border-t-0 md:py-20"
    >
      <Container>
        <motion.div
          variants={shouldReduceMotion ? undefined : labSectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid gap-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-12"
        >
          <header>
            <div className="text-eyebrow">§ {number}</div>

            <h2 className="mt-2 text-sm font-normal uppercase tracking-[0.08em] text-foreground">
              {title}
            </h2>
          </header>

          <div className="max-w-3xl">{children}</div>
        </motion.div>
      </Container>
    </section>
  );
}

function LabSectionContent({ entry, sectionId }: { entry: LabEntry; sectionId: LabSectionId }) {
  switch (sectionId) {
    case "objective":
      return <LabParagraph>{entry.objective}</LabParagraph>;

    case "hypothesis":
      return <LabParagraph>{entry.hypothesis}</LabParagraph>;

    case "setup":
      return <LabList items={entry.setup} />;

    case "methodology":
      return <LabList items={entry.methodology} ordered />;

    case "implementation":
      return <LabList items={entry.implementation} />;

    case "measurements":
      return <LabList items={entry.measurements} />;

    case "results":
      return <LabResults results={entry.results} />;

    case "observations":
      return <LabList items={entry.observations} />;

    case "limitations":
      return <LabList items={entry.limitations} />;

    case "next-steps":
      return <LabList items={entry.nextSteps} ordered />;
  }
}

function LabParagraph({ children }: { children: string | undefined }) {
  if (!children) {
    return null;
  }

  return (
    <p className="text-base leading-relaxed text-foreground-secondary md:text-lg">{children}</p>
  );
}

function LabList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";

  return (
    <List className="space-y-4">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 text-foreground-secondary"
        >
          <span aria-hidden="true" className="font-mono text-xs leading-7 text-foreground-muted">
            {ordered ? String(index + 1).padStart(2, "0") : "—"}
          </span>

          <span className="leading-7">{item}</span>
        </li>
      ))}
    </List>
  );
}

function LabResults({ results }: { results: LabEntry["results"] }) {
  return (
    <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <div key={`${result.label}-${result.value}`} className="bg-background p-5">
          <dt className="text-eyebrow">{result.label}</dt>

          <dd className="mt-3 text-2xl tracking-tight text-foreground">{result.value}</dd>

          {result.context && (
            <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
              {result.context}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}
function LabAdjacentEntryLink({
  direction,
  entry,
}: {
  direction: "previous" | "next";
  entry: LabEntry | null;
}) {
  const isPrevious = direction === "previous";

  if (!entry) {
    return (
      <div
        aria-hidden="true"
        className={[
          "hidden min-h-40 md:block",
          isPrevious ? "md:border-r md:border-border" : "",
        ].join(" ")}
      />
    );
  }

  return (
    <Link
      to="/lab/$slug"
      params={{ slug: entry.slug }}
      className={[
        "group flex min-h-40 flex-col justify-between py-8",
        "transition-colors hover:bg-background-elevated/40",
        "focus-visible:outline-none",
        "focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent",
        isPrevious
          ? "border-b border-border md:border-r md:border-b-0 md:pr-8"
          : "border-b border-border md:border-b-0 md:pl-8 md:text-right",
      ].join(" ")}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
        {isPrevious ? "← Previous experiment" : "Next experiment →"}
      </div>

      <div className="mt-8">
        <div className="text-eyebrow">{entry.identifier}</div>

        <div className="mt-2 text-lg tracking-tight text-foreground transition-colors group-hover:text-accent">
          {entry.title}
        </div>

        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
          {entry.domainLabel}
        </div>
      </div>
    </Link>
  );
}
function LabDetailFooter({ previous, next }: { previous: LabEntry | null; next: LabEntry | null }) {
  return (
    <footer className="border-t border-border">
      <Container>
        <nav aria-label="Lab entry navigation" className="grid md:grid-cols-2">
          <LabAdjacentEntryLink direction="previous" entry={previous} />

          <LabAdjacentEntryLink direction="next" entry={next} />
        </nav>

        <div className="border-t border-border py-8">
          <Link
            to="/lab"
            className={[
              "inline-block font-mono text-[11px] uppercase tracking-[0.14em]",
              "text-accent transition-colors hover:text-foreground",
              "focus-visible:outline-none",
              "focus-visible:ring-1 focus-visible:ring-accent",
            ].join(" ")}
          >
            ← ALL LAB ENTRIES
          </Link>
        </div>
      </Container>
    </footer>
  );
}
