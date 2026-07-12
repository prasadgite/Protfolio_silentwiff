import { projects } from "./projects";
import { notes } from "./notes";
import { lab } from "./lab";
import { research } from "./research";

export type SearchEntry = {
  type: "project" | "note" | "lab" | "research" | "page";
  title: string;
  description: string;
  url: string;
  meta?: string;
};

export const searchIndex: SearchEntry[] = [
  ...projects.map((p) => ({
    type: "project" as const,
    title: p.title,
    description: p.description,
    url: `/work/${p.slug}`,
    meta: p.domainLabel,
  })),
  ...notes.map((n) => ({
    type: "note" as const,
    title: n.title,
    description: n.description,
    url: `/notes/${n.slug}`,
    meta: n.categoryLabel,
  })),
  ...lab.map((l) => ({
    type: "lab" as const,
    title: l.title,
    description: l.description,
    url: `/lab/${l.slug}`,
    meta: l.domainLabel,
  })),
  ...research.map((r) => ({
    type: "research" as const,
    title: r.title,
    description: r.description,
    url: `/research/${r.slug}`,
    meta: r.categoryLabel,
  })),
  { type: "page", title: "Work", description: "Selected engineering projects", url: "/work" },
  {
    type: "page",
    title: "Research",
    description: "Investigations and experiments",
    url: "/research",
  },
  {
    type: "page",
    title: "Engineering Lab",
    description: "Implementations and benchmarks",
    url: "/lab",
  },
  { type: "page", title: "Notes", description: "Technical writing", url: "/notes" },
  { type: "page", title: "Experience", description: "Professional experience", url: "/experience" },
  { type: "page", title: "Now", description: "Current technical focus", url: "/now" },
  { type: "page", title: "About", description: "Background and trajectory", url: "/about" },
  { type: "page", title: "Resume", description: "Download or view resume", url: "/resume" },
];
