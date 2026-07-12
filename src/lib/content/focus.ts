export interface FocusArea {
  n: string;
  title: string;
  label: string;
  description: string;
  points: string[];
}

export const focus: FocusArea[] = [
  {
    n: "01",
    title: "Modern C++",
    label: "Systems / Performance",
    description:
      "Studying performance-oriented software engineering, systems programming, and modern C++ abstractions.",
    points: [
      "Performance engineering",
      "Memory management",
      "Concurrency primitives",
      "Modern language features",
    ],
  },
  {
    n: "02",
    title: "Advanced Algorithms",
    label: "Algorithms / Data Structures",
    description:
      "Exploring advanced data structures, algorithmic techniques, and rigorous complexity analysis.",
    points: [
      "Data structures",
      "Graph algorithms",
      "Dynamic predecessor structures",
      "Algorithm analysis",
    ],
  },
  {
    n: "03",
    title: "Quantitative Computing",
    label: "Research / Markets",
    description:
      "Building mathematical and computational foundations for quantitative research and systematic systems.",
    points: [
      "Probability and statistics",
      "Time-series analysis",
      "Market microstructure",
      "Systematic research",
    ],
  },
  {
    n: "04",
    title: "ML Systems",
    label: "Machine Learning / Infrastructure",
    description:
      "Studying the engineering of production machine learning systems, inference pipelines, and retrieval infrastructure.",
    points: [
      "Inference optimization",
      "Computer vision pipelines",
      "Retrieval systems",
      "Production ML infrastructure",
    ],
  },
];
