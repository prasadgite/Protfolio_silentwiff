import { ResearchSchema, type Research } from "./schemas";

const raw: Research[] = [
  {
    slug: "arima-lstm-gbm-forecasting",
    identifier: "RESEARCH_01",
    title: "Comparing ARIMA, LSTM, and Gradient Boosting for Financial Forecasting",
    description:
      "Structured comparison of three forecasting families on short-horizon financial series, with an emphasis on residual analysis and calibration.",
    category: "TIME_SERIES",
    categoryLabel: "TIME SERIES",
    tags: ["forecasting", "arima", "lstm"],
    status: "PROPOSED",
    createdAt: "2026-06-01",
    draft: false,
  },
  {
    slug: "vector-search-latency-quality",
    identifier: "RESEARCH_02",
    title: "Vector Search: Latency vs Retrieval Quality",
    description:
      "Empirical study of ANN parameters (nprobe, efSearch) against retrieval quality on a domain corpus. Aim: a defensible operating point rather than a hero number.",
    category: "INFORMATION_RETRIEVAL",
    categoryLabel: "INFORMATION RETRIEVAL",
    tags: ["retrieval", "vector-search"],
    status: "PROPOSED",
    createdAt: "2026-06-15",
    draft: false,
  },
];

export const research: Research[] = raw.map((r) => ResearchSchema.parse(r));
export const researchBySlug = new Map(research.map((r) => [r.slug, r]));
