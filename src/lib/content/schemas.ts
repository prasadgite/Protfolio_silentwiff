import { z } from "zod";

export const StatusSchema = z.enum([
  "PLANNED",
  "ACTIVE",
  "IN_PROGRESS",
  "COMPLETE",
  "ARCHIVED",
  "PROPOSED",
  "REPRODUCED",
]);
export type Status = z.infer<typeof StatusSchema>;

export const DomainSchema = z.enum([
  "ML_SYSTEMS",
  "ALGORITHMS",
  "BACKEND_SYSTEMS",
  "COMPUTER_VISION",
  "DATA_SYSTEMS",
  "QUANTITATIVE_COMPUTING",
  "MODERN_CPP",
  "MATHEMATICS",
  "DATA_SCIENCE",
  "DISTRIBUTED_SYSTEMS",
  "INFORMATION_RETRIEVAL",
  "TIME_SERIES",
]);
export type Domain = z.infer<typeof DomainSchema>;

export const MetricSchema = z.object({
  value: z.string(),
  label: z.string(),
  context: z.string().optional(),
});

export const DecisionSchema = z.object({
  title: z.string(),
  context: z.string(),
  options: z.array(z.string()).min(1),
  decision: z.string(),
  rationale: z.string(),
  tradeoffs: z.string(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
  summary: z.string(),
  domain: DomainSchema,
  domainLabel: z.string(),
  tags: z.array(z.string()),
  technologies: z.array(z.string()),
  status: StatusSchema,
  year: z.string(),
  featured: z.boolean().default(false),
  repository: z.string().optional(),
  liveUrl: z.string().optional(),
  role: z.string(),
  metrics: z.array(MetricSchema).default([]),
  problem: z.string(),
  requirements: z.array(z.string()),
  architecture: z.string(),
  decisions: z.array(DecisionSchema).default([]),
  results: z.array(MetricSchema).default([]),
  limitations: z.array(z.string()).default([]),
  future: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});
export type Project = z.infer<typeof ProjectSchema>;

export const NoteSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: DomainSchema,
  categoryLabel: z.string(),
  tags: z.array(z.string()),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  difficulty: z.enum(["INTRODUCTORY", "INTERMEDIATE", "ADVANCED"]),
  status: StatusSchema.default("COMPLETE"),
  draft: z.boolean().default(false),
});
export type Note = z.infer<typeof NoteSchema>;

export const LabEntrySchema = z.object({
  slug: z.string(),
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
  domain: DomainSchema,
  domainLabel: z.string(),
  tags: z.array(z.string()),
  technologies: z.array(z.string()),
  status: StatusSchema,
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  repository: z.string().optional(),
  complexity: z.string().optional(),
  draft: z.boolean().default(false),
});
export type LabEntry = z.infer<typeof LabEntrySchema>;

export const ResearchSchema = z.object({
  slug: z.string(),
  identifier: z.string(),
  title: z.string(),
  description: z.string(),
  category: DomainSchema,
  categoryLabel: z.string(),
  tags: z.array(z.string()),
  status: StatusSchema,
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  repository: z.string().optional(),
  draft: z.boolean().default(false),
});
export type Research = z.infer<typeof ResearchSchema>;

export const ExperienceSchema = z.object({
  identifier: z.string(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  summary: z.string(),
  systems: z.array(z.string()),
  impact: z.array(z.string()),
  technologies: z.array(z.string()),
});
export type Experience = z.infer<typeof ExperienceSchema>;
