export type ImpactMetric = {
  id: string;
  value: string;
  label: string;
  context: string;
};

// Static engineering outcomes.
// Values are intentionally not animated or derived at runtime.
export const impactMetrics = [
  {
    id: "annotated-images",
    value: "12K+",
    label: "DATA SAMPLES PROCESSED",
    context: "Computer vision training and evaluation pipelines",
  },
  {
    id: "validated-model-score",
    value: "91%",
    label: "BEST VALIDATED MODEL SCORE",
    context: "Object detection benchmark · mAP@0.5",
  },
  {
    id: "retrieval-latency",
    value: "40%",
    label: "SYSTEM LATENCY REDUCTION",
    context: "Retrieval pipeline optimization",
  },
  {
    id: "realtime-coordination",
    value: "<1s",
    label: "REAL-TIME RESPONSE TIME",
    context: "Routing and device coordination",
  },
  {
    id: "training-pipeline",
    value: "35%",
    label: "PIPELINE TIME REDUCTION",
    context: "Model training workflow optimization",
  },
  {
    id: "end-to-end-systems",
    value: "3",
    label: "END-TO-END ENGINEERING SYSTEMS",
    context: "ML systems · Algorithms · Real-time infrastructure",
  },
] as const satisfies readonly ImpactMetric[];
