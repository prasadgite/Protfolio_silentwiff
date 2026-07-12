// Single source of truth for identity + external links.
// Replace TODO values with real URLs; nothing else needs to change.

export const site = {
  name: "Prasad Gite",
  shortName: "Prasad Gite",
  initials: "PG",
  role: "Software Engineer / ML Systems",
  tagline:
    "Software Engineer working across machine learning systems, algorithms, real-time infrastructure, and data-intensive applications.",
  description:
    "Engineering portfolio of Prasad Gite — ML systems, algorithms, quantitative computing, and high-performance systems.",
  location: "India",
  email: "", // TODO: add email (e.g. "prasad@example.com")
  links: {
    github: "", // TODO: e.g. "https://github.com/prasadgite"
    linkedin: "", // TODO: e.g. "https://www.linkedin.com/in/prasadgite"
    resume: "/resume/prasad-gite-resume.pdf", // TODO: path/URL to resume PDF (e.g. "/resume.pdf")
  },
  resume: {
    url: "/resume/prasad-gite-resume.pdf",
    downloadFilename: "Prasad-Gite-Resume.pdf",
    lastUpdated: "July 2026",
    fileType: "PDF",
    fileSize: null, // null means it won't render in the UI
  },
  buildStatus: "STABLE",
} as const;

export type SiteConfig = typeof site;
