import type { Project } from "@/lib/content/schemas";

export const flowVestProject: Project = {
  slug: "flowvest",
  identifier: "PROJECT_01",
  title: "FlowVest",
  description: "AI-powered financial management and forecasting platform for small businesses.",
  summary:
    "Cash-flow forecasting and financial management surface for small businesses. Combines classical time-series models with an LSTM baseline, streaming updates over WebSockets, and integrations with banking and accounting APIs.",
  domain: "ML_SYSTEMS",
  domainLabel: "ML SYSTEMS + FINTECH",
  tags: ["forecasting", "time-series", "fintech", "realtime"],
  technologies: [
    "React",
    "Node.js",
    "MongoDB",
    "WebSockets",
    "AWS",
    "LSTM",
    "ARIMA",
    "Banking APIs",
  ],
  status: "ACTIVE",
  year: "2025",
  featured: true,
  role: "Full-stack engineer, ML systems",
  metrics: [],
  problem:
    "Small businesses have limited visibility into short-horizon cash flow. Off-the-shelf accounting tools show what happened; they rarely project what is about to happen with a defensible model or a real-time view.",
  requirements: [
    "Ingest transactional data from banking + accounting APIs without gaps.",
    "Produce short-horizon cash-flow projections with interpretable baselines.",
    "Stream projection updates to the browser as new transactions land.",
    "Isolate tenant data with a per-account boundary from day one.",
  ],
  architecture:
    "React SPA on the front; Node service exposes REST for CRUD and a WebSocket channel for projection updates. MongoDB is the transactional store, keyed by tenant. A forecasting worker consumes ingestion events, retrains lightweight ARIMA baselines per account, and evaluates an LSTM model for accounts with sufficient history. Deployed on AWS behind a managed load balancer.",
  decisions: [
    {
      title: "ARIMA baseline before LSTM",
      context:
        "Deep sequence models are the default reach in 2025, but most small-business accounts have <18 months of clean history.",
      options: [
        "LSTM only, initialized per-account",
        "ARIMA baseline, LSTM only where data supports it",
        "Prophet",
      ],
      decision:
        "Ship ARIMA as the always-on baseline; enable the LSTM path only for accounts with enough clean history to justify it.",
      rationale:
        "ARIMA is interpretable, cheap to retrain, and its residuals give a clear signal for whether the LSTM path is even worth evaluating on a given account.",
      tradeoffs:
        "The LSTM path stays gated behind data-quality thresholds, so a subset of accounts always see the classical model.",
    },
    {
      title: "WebSockets over polling for projection updates",
      context: "Projections need to reflect new transactions without a full page fetch.",
      options: ["Polling every N seconds", "Server-Sent Events", "WebSocket channel per tenant"],
      decision: "WebSocket channel per tenant with an idempotent replay on reconnect.",
      rationale:
        "Fan-out is small (one client per tenant in most cases) and the client already needs bidirectional acks for optimistic UI.",
      tradeoffs:
        "Reconnect logic and message ordering became the single largest source of edge cases in the client.",
    },
  ],
  results: [],
  limitations: [
    "Forecasts are short-horizon; long-horizon projections are not calibrated and are intentionally not surfaced.",
    "The LSTM path requires enough clean history — most new accounts run on the ARIMA baseline for their first months.",
    "Multi-currency handling is deferred; the current model assumes a single reporting currency per tenant.",
  ],
  future: [
    "Move retraining onto a schedule driven by residual drift rather than fixed intervals.",
    "Replace the per-tenant WebSocket channel with a shared multiplexed channel + subscription filter.",
    "Add a proper feature store so the LSTM path stops re-deriving features on every retrain.",
  ],
  draft: false,
};
