import type { z } from "zod";

import { LabEntrySchema } from "@/lib/content/schemas";

type LabEntryInput = z.input<typeof LabEntrySchema>;

export const onnxVsPytorchInferenceLab = {
  slug: "onnx-vs-pytorch-inference",
  identifier: "LAB_02",
  title: "ONNX Runtime vs PyTorch Inference Benchmark",
  description:
    "Measure inference latency and throughput of a YOLOv8 checkpoint under PyTorch, ONNX Runtime, and TensorRT on the same hardware.",
  summary:
    "A controlled inference benchmarking study comparing PyTorch, ONNX Runtime, and TensorRT execution paths for the same YOLOv8 model and hardware environment.",

  domain: "ML_SYSTEMS",
  domainLabel: "ML SYSTEMS",

  tags: ["inference", "benchmark", "onnx"],
  technologies: ["Python", "ONNX Runtime", "TensorRT", "PyTorch"],

  status: "PLANNED",
  createdAt: "2026-06-15",

  objective:
    "Compare inference latency, throughput, memory behavior, and runtime characteristics across PyTorch, ONNX Runtime, and TensorRT while controlling the model, input workload, hardware, and benchmark methodology.",

  hypothesis:
    "TensorRT should provide the lowest inference latency and highest throughput on supported NVIDIA hardware, while ONNX Runtime should provide a simpler deployment path with lower integration complexity and improved performance over the baseline PyTorch execution path.",

  setup: [
    "Use the same trained YOLOv8 checkpoint as the source model for every runtime.",
    "Export the model to ONNX using a documented opset and fixed input configuration.",
    "Build the TensorRT engine from the same exported model representation.",
    "Run every benchmark on the same machine, accelerator, driver stack, and power configuration.",
    "Use identical input dimensions, preprocessing logic, batch sizes, and benchmark samples.",
    "Record software versions and relevant hardware information with the benchmark results.",
  ],

  methodology: [
    "Validate numerical output consistency before comparing runtime performance.",
    "Perform runtime-specific warm-up iterations before collecting measurements.",
    "Separate model initialization and engine construction time from steady-state inference latency.",
    "Run repeated benchmark iterations for each runtime and batch-size configuration.",
    "Synchronize accelerator execution before recording latency measurements where required.",
    "Report latency distributions and throughput rather than relying on a single average measurement.",
  ],

  implementation: [
    "Create a shared benchmark harness responsible for input generation, warm-up, execution, synchronization, and result collection.",
    "Implement runtime adapters for PyTorch, ONNX Runtime, and TensorRT.",
    "Keep preprocessing and postprocessing behavior equivalent across runtime adapters.",
    "Record benchmark configuration alongside every result set to preserve reproducibility.",
    "Add correctness checks that compare output shapes and detection results within documented numerical tolerances.",
  ],

  measurements: [
    "Median inference latency.",
    "p95 inference latency.",
    "p99 inference latency when the sample size is sufficient.",
    "Throughput measured in processed images per second.",
    "Peak GPU memory consumption.",
    "Runtime initialization or engine-loading time.",
    "Model artifact or engine size.",
  ],

  results: [],
  observations: [],

  limitations: [
    "Results will be specific to the selected GPU, driver stack, CUDA version, runtime versions, and model configuration.",
    "The initial experiment focuses on inference execution and does not benchmark model training performance.",
    "End-to-end application latency may differ because preprocessing, postprocessing, networking, and request scheduling are outside the primary benchmark.",
    "TensorRT results are limited to supported NVIDIA hardware and compatible model operations.",
  ],

  nextSteps: [
    "Select and freeze the YOLOv8 checkpoint used for the experiment.",
    "Document the benchmark hardware and software environment.",
    "Implement the baseline PyTorch benchmark adapter.",
    "Export and validate the ONNX model.",
    "Implement the ONNX Runtime benchmark adapter.",
    "Build and validate the TensorRT engine.",
    "Run correctness validation before collecting performance measurements.",
    "Publish benchmark methodology before reporting comparative results.",
  ],

  draft: false,
} satisfies LabEntryInput;
