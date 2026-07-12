import { ExperienceSchema, type Experience } from "./schemas";

const raw: Experience[] = [
  {
    identifier: "EXPERIENCE_01",
    company: "Aurum Innovations",
    role: "Lead Machine Learning Engineer",
    period: "SEP_2025 — FEB_2026",
    location: "REMOTE",
    summary:
      "Led computer vision pipelines from dataset construction through production inference. Built CUDA-accelerated preprocessing, TensorRT / ONNX inference infrastructure, and the surrounding model-lifecycle tooling.",
    systems: [
      "Computer vision pipelines end-to-end",
      "CUDA-accelerated preprocessing paths",
      "TensorRT and ONNX inference infrastructure",
      "Production ML APIs and integration surface",
      "Model lifecycle infrastructure (versioning, evaluation, promotion)",
    ],
    impact: [
      "12,000+ annotated images processed through the training pipeline",
      "91% mAP@0.5 on the target detection benchmark",
      "18% recall improvement over the prior baseline",
      "35% reduction in training time via preprocessing + pipeline changes",
    ],
    technologies: ["PyTorch", "YOLOv8", "TensorRT", "ONNX Runtime", "CUDA", "Python", "REST"],
  },
  {
    identifier: "EXPERIENCE_02",
    company: "AI/ML Research Internship",
    role: "Research Intern",
    period: "JUL_2024 — DEC_2024",
    location: "REMOTE",
    summary:
      "Built retrieval-augmented chat infrastructure end-to-end — document ingestion, embedding generation, semantic retrieval, intent classification, and the chat surface on top.",
    systems: [
      "RAG chatbot",
      "Semantic retrieval system",
      "Intent classification across 12 categories",
      "Document ingestion pipeline",
      "Embedding generation infrastructure",
    ],
    impact: [
      "25% response accuracy improvement over baseline",
      "40% retrieval latency reduction",
      "88% intent classification accuracy across 12 categories",
    ],
    technologies: ["Python", "LLMs", "Vector databases", "Embeddings", "LangChain"],
  },
];

export const experience: Experience[] = raw.map((e) => ExperienceSchema.parse(e));
