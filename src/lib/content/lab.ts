import { LabEntrySchema, type LabEntry } from "./schemas";

// Only entries that reflect real, in-progress or planned work. No fabricated
// benchmarks. Each entry is marked PLANNED / ACTIVE until an implementation exists.
const raw: LabEntry[] = [
  {
    slug: "dynamic-predecessor-structures",
    identifier: "LAB_01",
    title: "Dynamic Predecessor Data Structures",
    description:
      "Implement and compare van Emde Boas, y-fast tries, and a bucketed baseline for the dynamic predecessor problem.",
    domain: "ALGORITHMS",
    domainLabel: "ALGORITHMS",
    tags: ["data-structures", "predecessor"],
    technologies: ["C++"],
    status: "PLANNED",
    createdAt: "2026-06-01",
    complexity: "O(log log U) target for vEB; empirical comparison against baseline.",
    draft: false,
  },
  {
    slug: "onnx-vs-pytorch-inference",
    identifier: "LAB_02",
    title: "ONNX Runtime vs PyTorch Inference Benchmark",
    description:
      "Measure inference latency and throughput of a YOLOv8 checkpoint under PyTorch, ONNX Runtime, and TensorRT on the same hardware.",
    domain: "ML_SYSTEMS",
    domainLabel: "ML SYSTEMS",
    tags: ["inference", "benchmark", "onnx"],
    technologies: ["Python", "ONNX Runtime", "TensorRT", "PyTorch"],
    status: "PLANNED",
    createdAt: "2026-06-15",
    draft: false,
  },
  {
    slug: "cache-friendly-data-structures",
    identifier: "LAB_03",
    title: "Cache-Friendly Data Structures",
    description:
      "Contrast an array-of-structs layout with a struct-of-arrays layout for a hot inner loop, measured with perf counters.",
    domain: "MODERN_CPP",
    domainLabel: "MODERN C++",
    tags: ["performance", "cache"],
    technologies: ["C++"],
    status: "PLANNED",
    createdAt: "2026-07-01",
    draft: false,
  },
];

export const lab: LabEntry[] = raw.map((l) => LabEntrySchema.parse(l));
export const labBySlug = new Map(lab.map((l) => [l.slug, l]));
