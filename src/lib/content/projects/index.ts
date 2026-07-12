import { ProjectSchema, type Project } from "@/lib/content/schemas";

import { agroVisionProject } from "./agrovision";
import { flowVestProject } from "./flowvest";
import { smartPathProject } from "./smartpath";

/*
 * Central project registry.
 *
 * All application surfaces consume project data through this module:
 *
 * projects         -> complete project collection
 * featuredProjects -> homepage selection
 * projectBySlug    -> dynamic project detail lookup
 * projectDomains   -> /work filtering
 */

const rawProjects: Project[] = [flowVestProject, smartPathProject, agroVisionProject];

/*
 * Runtime validation.
 *
 * Parsing the complete registry ensures content files conform to ProjectSchema
 * before they are consumed by routes and UI components.
 */

export const projects: Project[] = rawProjects.map((project) => ProjectSchema.parse(project));

/*
 * Homepage projects.
 *
 * Exactly three projects should be marked featured.
 */

const allFeaturedProjects = projects.filter((project) => project.featured);

if (import.meta.env.DEV && allFeaturedProjects.length !== 3) {
  console.warn(`Expected exactly 3 featured projects, found ${allFeaturedProjects.length}.`);
}

export const featuredProjects = allFeaturedProjects.slice(0, 3);

/*
 * Dynamic route lookup.
 *
 * /work/:slug -> Project
 */

export const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

/*
 * Work-page filters.
 */

export const projectDomains = [
  { value: "ALL", label: "All" },
  { value: "ML_SYSTEMS", label: "ML Systems" },
  { value: "ALGORITHMS", label: "Algorithms" },
  { value: "BACKEND_SYSTEMS", label: "Backend Systems" },
  { value: "COMPUTER_VISION", label: "Computer Vision" },
  { value: "DATA_SYSTEMS", label: "Data Systems" },
  {
    value: "QUANTITATIVE_COMPUTING",
    label: "Quantitative Computing",
  },
] as const;
