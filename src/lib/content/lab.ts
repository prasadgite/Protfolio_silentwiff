import { cacheFriendlyDataStructuresLab } from "./lab/cache-friendly-data-structure";
import { dynamicPredecessorStructuresLab } from "./lab/dynamic-predecessor-structures";
import { onnxVsPytorchInferenceLab } from "./lab/onnx-vs-pytorch-inference";
import { LabEntrySchema, type LabEntry } from "./schemas";

const raw = [
  dynamicPredecessorStructuresLab,
  onnxVsPytorchInferenceLab,
  cacheFriendlyDataStructuresLab,
];

export const lab: LabEntry[] = raw.map((entry) => LabEntrySchema.parse(entry));

export const labBySlug = new Map(lab.map((entry) => [entry.slug, entry]));

export type AdjacentLabEntries = {
  previous: LabEntry | null;
  next: LabEntry | null;
};

export function getAdjacentLabEntries(slug: string): AdjacentLabEntries {
  const currentIndex = lab.findIndex((entry) => entry.slug === slug);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: lab[currentIndex - 1] ?? null,
    next: lab[currentIndex + 1] ?? null,
  };
}
