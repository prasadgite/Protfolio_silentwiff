import type { Project } from "@/lib/content/schemas";

export const smartPathProject: Project = {
  slug: "smartpath",
  identifier: "PROJECT_02",
  title: "SmartPath",
  description:
    "Real-time warehouse routing infrastructure using graph algorithms and event-driven communication.",
  summary:
    "Warehouse routing system that models the floor as a weighted graph, plans paths with Dijkstra, and coordinates hardware over an event-driven WebSocket layer. Backed by a MongoDB event store and an Arduino-based physical layer for validation.",
  domain: "ALGORITHMS",
  domainLabel: "ALGORITHMIC SYSTEMS",
  tags: ["graph-algorithms", "realtime", "iot"],
  technologies: ["React", "Node.js", "MongoDB", "WebSockets", "Dijkstra", "Arduino"],
  status: "COMPLETE",
  year: "2024",
  featured: true,
  role: "Systems + full-stack engineer",
  metrics: [],
  problem:
    "Warehouse routing systems typically either optimize for global throughput (opaque to operators) or expose per-move controls (unsafe at scale). Neither surfaces the graph or the current plan in a way operators can reason about.",
  requirements: [
    "Model the warehouse floor as a mutable weighted graph with obstacles.",
    "Compute shortest paths in real time as edges reweight.",
    "Coordinate physical actuators with sub-second acknowledgement.",
    "Persist the event log so replays are deterministic.",
  ],
  architecture:
    "React operator console renders the live graph. A Node service owns the graph state, exposes REST for structural edits, and pushes path updates over WebSockets. Dijkstra runs on every relevant edge change; MongoDB stores the event log. A small Arduino rig runs the physical validation loop.",
  decisions: [
    {
      title: "Dijkstra over A*",
      context: "The floor graph is small and edge weights change frequently as inventory moves.",
      options: [
        "Dijkstra with a binary heap",
        "A* with a Manhattan heuristic",
        "Bidirectional Dijkstra",
      ],
      decision: "Dijkstra with a binary heap and per-edit incremental relaxation.",
      rationale:
        "Graph is small enough that heuristic wins vanish, and Dijkstra's structural simplicity made the reweight path easy to reason about under load.",
      tradeoffs:
        "Wall-clock is fine today but would not scale to a much larger graph without switching to a bucketed / delta-Stepping variant.",
    },
  ],
  results: [],
  limitations: [
    "Single-agent routing only; multi-agent coordination is not modelled.",
    "Event log is append-only in Mongo — fine for the current scale, not a long-term substitute for a purpose-built log store.",
  ],
  future: [
    "Multi-agent planning with conflict-based search.",
    "Replace the ad-hoc reweight path with a proper dynamic-graph structure.",
  ],
  draft: false,
};
