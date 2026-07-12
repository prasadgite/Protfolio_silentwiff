import { NoteSchema, type Note } from "./schemas";

const raw: Note[] = [
  {
    slug: "why-arima-baseline",
    title: "Why I ship an ARIMA baseline before touching an LSTM",
    description:
      "Interpretable baselines aren't a warm-up; they're the residual analysis that tells you whether a sequence model is even the right tool for a given account.",
    category: "TIME_SERIES",
    categoryLabel: "TIME SERIES",
    tags: ["forecasting", "arima", "engineering-decisions"],
    publishedAt: "2026-06-20",
    difficulty: "INTERMEDIATE",
    status: "COMPLETE",
    draft: false,
  },
  {
    slug: "notes-index",
    title: "About these notes",
    description: "What this section is for, what it isn't, and how new entries get added.",
    category: "DATA_SCIENCE",
    categoryLabel: "DATA SCIENCE",
    tags: ["meta"],
    publishedAt: "2026-07-01",
    difficulty: "INTRODUCTORY",
    status: "COMPLETE",
    draft: false,
  },
];

export const notes: Note[] = raw.map((n) => NoteSchema.parse(n));
export const noteBySlug = new Map(notes.map((n) => [n.slug, n]));

export const noteBodies: Record<string, string> = {
  "why-arima-baseline": `A common failure mode is reaching for an LSTM the moment "time series" enters the requirements. An LSTM is a legitimate tool. It is also expensive to train, expensive to serve, and — importantly — silent when it is the wrong tool.

An ARIMA baseline is different. It is interpretable. Its residuals are meaningful. If ARIMA residuals look like noise on an account, an LSTM has very little room to add value there. If ARIMA residuals show structure, that structure is your specification: it tells you what the sequence model has to model, and what "better" would even mean.

The workflow that has worked for me on FlowVest:

- Fit ARIMA on every account with enough history. Persist the model, the residuals, and the out-of-sample error.
- Look at the residuals per account. Not aggregated — per account.
- Enable the LSTM path only for accounts where the residual structure justifies it, and where enough clean history exists to fit one.
- Compare LSTM against the ARIMA baseline on the same evaluation window. If it does not beat the baseline by a margin larger than the retraining cost, stay on ARIMA.

The point is not that ARIMA is better than LSTM. The point is that "which model to run" is a per-account decision, and the baseline is what lets you make that decision defensibly.`,
  "notes-index": `This section is a technical notebook, not a blog.

Entries here are written to clarify something I actually had to work out — an algorithm, a systems trade-off, a piece of mathematics I wanted to be able to reproduce from memory. If a note isn't useful to future me, it doesn't belong here.

There are no fabricated results anywhere on this site. If a note references a benchmark, that benchmark exists. If it references a repository, that repository exists. Sections with no content yet show honest empty states rather than filler.`,
};
