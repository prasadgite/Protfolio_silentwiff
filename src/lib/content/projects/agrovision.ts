import type { Project } from "@/lib/content/schemas";

export const agroVisionProject: Project = {
  slug: "agrovision",
  identifier: "PROJECT_03",
  title: "AgroVision",
  description:
    "UAV-mounted thermal imaging and machine-learning system for crop-health monitoring.",
  summary:
    "Thermal imaging pipeline for UAV-collected crop data. Combines OpenCV preprocessing, MATLAB analysis, and a classification model that flags stressed zones for ground follow-up.",
  domain: "COMPUTER_VISION",
  domainLabel: "COMPUTER VISION + EMBEDDED SYSTEMS",
  tags: ["computer-vision", "thermal", "uav"],
  technologies: ["Python", "OpenCV", "MATLAB", "Thermal imaging", "Machine learning"],
  status: "COMPLETE",
  year: "2024",
  featured: true,
  role: "Computer vision + hardware integration",
  metrics: [],
  problem:
    "Manual crop-health surveys miss early thermal stress signals that predict yield loss weeks before visible symptoms appear.",
  requirements: [
    "Ingest UAV thermal captures with variable illumination and altitude.",
    "Register thermal frames to a stable geospatial reference.",
    "Classify stressed zones with a model that survives sensor noise.",
  ],
  architecture:
    "OpenCV handles undistortion, registration, and preprocessing. MATLAB is used for zone-level statistical analysis. A classification model flags stressed zones; results are exported as annotated overlays for ground follow-up.",
  decisions: [],
  results: [],
  limitations: [
    "Model was trained on a specific sensor and altitude band; transfer to other rigs was out of scope.",
    "Registration assumes reasonably stable flight paths — turbulent captures degrade sharply.",
  ],
  future: [
    "Sensor-agnostic calibration front-end.",
    "On-device inference on the UAV companion computer.",
  ],
  draft: false,
};
