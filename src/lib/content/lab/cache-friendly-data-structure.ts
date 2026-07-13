import type { z } from "zod";

import { LabEntrySchema } from "@/lib/content/schemas";

type LabEntryInput = z.input<typeof LabEntrySchema>;

export const cacheFriendlyDataStructuresLab = {
  slug: "cache-friendly-data-structures",
  identifier: "LAB_03",
  title: "Cache-Friendly Data Structures",
  description:
    "Contrast an array-of-structs layout with a struct-of-arrays layout for a hot inner loop, measured with hardware performance counters.",
  summary:
    "A systems-performance experiment comparing array-of-structs and struct-of-arrays memory layouts to measure how data organization affects cache behavior, memory traffic, and execution time.",

  domain: "MODERN_CPP",
  domainLabel: "MODERN C++",

  tags: ["performance", "cache"],
  technologies: ["C++", "Linux perf"],

  status: "PLANNED",
  createdAt: "2026-07-01",

  objective:
    "Measure the practical performance impact of array-of-structs and struct-of-arrays memory layouts under controlled workloads, with emphasis on cache efficiency, memory traffic, and hot-loop execution time.",

  hypothesis:
    "Struct-of-arrays should outperform array-of-structs when the hot loop accesses only a subset of object fields because it reduces unnecessary memory traffic and improves effective cache-line utilization.",

  setup: [
    "Implement equivalent array-of-structs and struct-of-arrays data representations.",
    "Use identical generated datasets and computational workloads for both layouts.",
    "Run benchmarks on the same machine, operating system, compiler, and processor configuration.",
    "Compile benchmark binaries with the same optimization level and architecture flags.",
    "Record processor, cache hierarchy, compiler version, and compiler flags with benchmark results.",
    "Use hardware performance counters through Linux perf where supported.",
  ],

  methodology: [
    "Define a hot loop that performs equivalent computation for both memory layouts.",
    "Validate that both implementations produce equivalent outputs before performance measurement.",
    "Evaluate multiple dataset sizes to cross relevant cache-capacity boundaries.",
    "Perform warm-up iterations before collecting timing and hardware-counter measurements.",
    "Run repeated benchmark iterations and report aggregate measurements rather than single-run timings.",
    "Control benchmark variability by minimizing unrelated system activity and documenting the execution environment.",
  ],

  implementation: [
    "Implement the array-of-structs representation using a contiguous container of records.",
    "Implement the struct-of-arrays representation using separate contiguous containers for individual fields.",
    "Keep workload generation independent from the data-layout implementations.",
    "Use a shared benchmark harness for warm-up, iteration control, timing, and result collection.",
    "Add correctness tests to verify equivalent computation across both memory layouts.",
    "Record benchmark configuration alongside every collected result set.",
  ],

  measurements: [
    "Wall-clock execution time for the hot loop.",
    "Average time per processed element.",
    "CPU cycles.",
    "Instructions retired.",
    "Instructions per cycle.",
    "Cache references.",
    "Cache misses.",
    "Cache-miss rate.",
    "Branch misses where relevant to the selected workload.",
  ],

  results: [],
  observations: [],

  limitations: [
    "Results will depend on processor microarchitecture, cache hierarchy, compiler version, optimization flags, and benchmark workload.",
    "Linux perf counter availability and accuracy may vary across operating systems, processors, virtual machines, and restricted environments.",
    "The experiment evaluates selected access patterns and does not establish that struct-of-arrays is universally preferable to array-of-structs.",
    "Real applications may have mutation, ownership, abstraction, and maintainability constraints that are not represented by a focused microbenchmark.",
  ],

  nextSteps: [
    "Implement correctness-tested array-of-structs and struct-of-arrays baselines.",
    "Define the initial field-access pattern and hot-loop workload.",
    "Build the shared benchmark harness.",
    "Select dataset sizes that cross L1, L2, L3, and main-memory capacity boundaries where practical.",
    "Validate Linux perf counter collection on the benchmark machine.",
    "Run timing measurements before collecting detailed hardware-counter data.",
    "Publish the complete benchmark configuration before reporting comparative results.",
  ],

  draft: false,
} satisfies LabEntryInput;
