import { motion, useReducedMotion, type Variants } from "motion/react";

import { Section } from "@/components/layout/Container";
import { impactMetrics } from "@/lib/content/impact";

const impactGridVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const impactCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
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
        className={[
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          "gap-px border border-border bg-border",
        ].join(" ")}
      >
        {impactMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            variants={shouldReduceMotion ? undefined : impactCardVariants}
            className={[
              "group bg-background p-6 md:p-8",
              "transition-colors duration-200",
              "motion-reduce:transition-none",
              "[@media(hover:hover)]:hover:bg-background-elevated/40",
            ].join(" ")}
          >
            <div
              className={[
                "text-4xl font-normal tracking-[-0.03em] md:text-5xl",
                "text-foreground",
                "transition-colors duration-200",
                "motion-reduce:transition-none",
                "[@media(hover:hover)]:group-hover:text-accent",
              ].join(" ")}
            >
              {metric.value}
            </div>

            <div className="mt-3 text-eyebrow">{metric.label}</div>

            <div className="mt-2 text-xs text-foreground-muted">{metric.context}</div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
