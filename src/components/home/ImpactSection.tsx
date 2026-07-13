import { motion, useReducedMotion, type Variants } from "motion/react";

import { Section } from "@/components/layout/Container";
import { impactMetrics } from "@/lib/content/impact";

const impactGridVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const impactCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ImpactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section eyebrow="§ 03 / IMPACT" title="Selected measurable outcomes">
      <motion.div
        aria-label="Selected measurable engineering outcomes"
        variants={shouldReduceMotion ? undefined : impactGridVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {impactMetrics.map((metric, index) => {
          const isLastMetric = index === impactMetrics.length - 1;
          const isInLastDesktopRow = index >= impactMetrics.length - 2;

          return (
            <motion.div
              key={metric.id}
              variants={shouldReduceMotion ? undefined : impactCardVariants}
              className={[
                "py-6 md:py-8",
                "md:odd:pr-8 md:even:pl-8",

                // Mobile: separator after every metric except the final one.
                !isLastMetric ? "border-b border-border" : "",

                // Desktop: the final row has no bottom separator.
                isInLastDesktopRow ? "md:border-b-0" : "",
              ].join(" ")}
            >
              <div className="text-3xl font-normal tracking-[-0.03em] text-foreground md:text-4xl">
                {metric.value}
              </div>

              <div className="mt-2 text-eyebrow">{metric.label}</div>

              <div className="mt-1.5 max-w-md text-xs leading-relaxed text-foreground-muted">
                {metric.context}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
