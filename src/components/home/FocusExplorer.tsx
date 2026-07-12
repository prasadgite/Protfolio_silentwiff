import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Section } from "@/components/layout/Container";
import { focus } from "@/lib/content/focus";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const topicsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.055,
    },
  },
};

const topicItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 12,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const sectionEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

const navigationEntranceVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.07,
    },
  },
};

const navigationItemEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: EASE,
    },
  },
};

const detailEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.16,
      duration: 0.55,
      ease: EASE,
    },
  },
};

export function FocusExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [mobileRail, setMobileRail] = useState({
    y: 0,
    height: 0,
    ready: false,
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const shouldReduceMotion = useReducedMotion();

  const activeFocus = focus[activeIndex];
  const progress = ((activeIndex + 1) / focus.length) * 100;

  const measureMobileRail = useCallback(() => {
    const container = mobileContainerRef.current;
    const button = mobileButtonRefs.current[activeIndex];

    if (!container || !button) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const nextY = buttonRect.top - containerRect.top;
    const nextHeight = buttonRect.height;

    setMobileRail((current) => {
      if (current.y === nextY && current.height === nextHeight && current.ready) {
        return current;
      }

      return {
        y: nextY,
        height: nextHeight,
        ready: true,
      };
    });
  }, [activeIndex]);

  useLayoutEffect(() => {
    measureMobileRail();
  }, [measureMobileRail]);

  useLayoutEffect(() => {
    const handleResize = () => {
      measureMobileRail();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [measureMobileRail]);

  const entranceState = shouldReduceMotion ? undefined : isInView ? "visible" : "hidden";

  return (
    <Section eyebrow="§ 01 / DIRECTION" title="Currently exploring">
      <motion.div
        ref={sectionRef}
        variants={shouldReduceMotion ? undefined : sectionEntranceVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate={entranceState}
      >
        {/* Mobile */}
        <div ref={mobileContainerRef} className="relative border-y border-border md:hidden">
          {/* Persistent animated rail */}
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{
              y: mobileRail.y,
              height: mobileRail.height,
              opacity: mobileRail.ready ? 1 : 0,
            }}
            transition={
              shouldReduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    type: "spring",
                    stiffness: 500,
                    damping: 42,
                    mass: 0.7,
                  }
            }
            className="pointer-events-none absolute left-0 top-0 z-10 w-[2px] bg-accent"
          />

          {focus.map((item, index) => {
            const isActive = index === activeIndex;
            const buttonId = `focus-button-${item.n}`;
            const panelId = `focus-panel-${item.n}`;

            return (
              <div key={item.n} className="border-b border-border last:border-b-0">
                <button
                  ref={(node) => {
                    mobileButtonRefs.current[index] = node;
                  }}
                  id={buttonId}
                  type="button"
                  onClick={() => {
                    if (index !== activeIndex) {
                      setActiveIndex(index);
                    }
                  }}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  className={[
                    "relative grid w-full grid-cols-[44px_1fr_auto]",
                    "items-center gap-3 px-3 py-5 text-left",
                    "transition-colors duration-200 motion-reduce:transition-none",
                    "focus-visible:outline-none",
                    "focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent",
                    isActive ? "bg-background-elevated/40" : "hover:bg-background-elevated/20",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-xs transition-colors duration-200 motion-reduce:transition-none",
                      isActive ? "text-accent" : "text-foreground-muted",
                    ].join(" ")}
                  >
                    {item.n}/
                  </span>

                  <span
                    className={[
                      "text-base tracking-tight transition-colors duration-200 motion-reduce:transition-none",
                      isActive ? "text-foreground" : "text-foreground-secondary",
                    ].join(" ")}
                  >
                    {item.title}
                  </span>

                  <span
                    aria-hidden="true"
                    className={[
                      "font-mono text-sm text-foreground-muted",
                      "transition-transform duration-200 motion-reduce:transition-none",
                      isActive ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={panelId}
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              height: 0,
                              opacity: 0,
                            }
                      }
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: shouldReduceMotion ? 0 : 0.34,
                          ease: EASE,
                        },
                        opacity: {
                          duration: shouldReduceMotion ? 0 : 0.18,
                        },
                      }}
                      onAnimationComplete={measureMobileRail}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: -8,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={
                          shouldReduceMotion
                            ? {
                                opacity: 1,
                                y: 0,
                              }
                            : {
                                opacity: 0,
                                y: -6,
                              }
                        }
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.24,
                          delay: shouldReduceMotion ? 0 : 0.06,
                          ease: EASE,
                        }}
                        className="px-4 pb-8 pl-[59px]"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                          {item.label}
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary">
                          {item.description}
                        </p>

                        <div className="mt-6 border-t border-border">
                          {item.points.map((point, pointIndex) => (
                            <div
                              key={point}
                              className="grid grid-cols-[32px_1fr] gap-2 border-b border-border py-3"
                            >
                              <span className="font-mono text-[10px] text-foreground-muted">
                                {String(pointIndex + 1).padStart(2, "0")}
                              </span>

                              <span className="text-sm text-foreground-secondary">{point}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="hidden overflow-hidden border-y border-border md:grid md:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.65fr)]">
          {/* Navigation */}
          <div className="flex min-h-[500px] flex-col border-r border-border">
            {/* Navigation header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                Research direction
              </span>

              <span className="font-mono text-[10px] text-foreground-muted">
                {String(focus.length).padStart(2, "0")} AREAS
              </span>
            </div>

            {/* Navigation items */}
            <motion.div
              className="flex flex-1 flex-col"
              variants={shouldReduceMotion ? undefined : navigationEntranceVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={entranceState}
            >
              {focus.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={item.n}
                    type="button"
                    onClick={() => {
                      if (index !== activeIndex) {
                        setActiveIndex(index);
                      }
                    }}
                    aria-pressed={isActive}
                    variants={shouldReduceMotion ? undefined : navigationItemEntranceVariants}
                    className={[
                      "group relative grid flex-1 w-full",
                      "grid-cols-[56px_1fr_auto]",
                      "items-center gap-4 border-b border-border",
                      "px-5 py-6 text-left",
                      "transition-colors duration-200 motion-reduce:transition-none",
                      "last:border-b-0",
                      "focus-visible:z-10 focus-visible:outline-none",
                      "focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent",
                      isActive ? "bg-background-elevated/40" : "hover:bg-background-elevated/20",
                    ].join(" ")}
                  >
                    {/* Shared active rail */}
                    {isActive && (
                      <motion.span
                        layoutId="desktop-focus-active-rail"
                        className="absolute inset-y-0 left-0 w-[2px] bg-accent"
                        transition={
                          shouldReduceMotion
                            ? {
                                duration: 0,
                              }
                            : {
                                type: "spring",
                                stiffness: 500,
                                damping: 42,
                                mass: 0.7,
                              }
                        }
                      />
                    )}

                    <span
                      className={[
                        "font-mono text-xs transition-colors duration-200 motion-reduce:transition-none",
                        isActive ? "text-accent" : "text-foreground-muted",
                      ].join(" ")}
                    >
                      {item.n}/
                    </span>

                    <span
                      className={[
                        "text-lg tracking-tight transition-colors duration-200 motion-reduce:transition-none",
                        isActive
                          ? "text-foreground"
                          : "text-foreground-secondary group-hover:text-foreground",
                      ].join(" ")}
                    >
                      {item.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "font-mono text-xs transition-colors duration-200 motion-reduce:transition-none",
                        isActive
                          ? "text-accent"
                          : "text-transparent group-hover:text-foreground-muted",
                      ].join(" ")}
                    >
                      →
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Viewport detail entrance */}
          <motion.div
            variants={shouldReduceMotion ? undefined : detailEntranceVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={entranceState}
            className="flex min-h-[500px] flex-col px-10 py-10 lg:px-14 lg:py-12"
          >
            {/* Selection-change animation */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeFocus.n}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  shouldReduceMotion
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                        y: -10,
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.24,
                  ease: EASE,
                }}
                className="flex flex-1 flex-col"
              >
                {/* Metadata */}
                <div className="flex items-center justify-between gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {activeFocus.label}
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                    Focus {activeFocus.n}
                  </span>
                </div>

                {/* Main content */}
                <div className="mt-10">
                  <h3 className="max-w-3xl text-3xl font-normal tracking-[-0.02em] text-foreground lg:text-4xl">
                    {activeFocus.title}
                  </h3>

                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-foreground-secondary">
                    {activeFocus.description}
                  </p>

                  {/* Topic stagger */}
                  <motion.div
                    className="mt-10 border-t border-border"
                    variants={shouldReduceMotion ? undefined : topicsContainerVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                  >
                    {activeFocus.points.map((point, index) => (
                      <motion.div
                        key={point}
                        variants={shouldReduceMotion ? undefined : topicItemVariants}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.28,
                          ease: EASE,
                        }}
                        className="group grid grid-cols-[48px_1fr_auto] items-center border-b border-border py-4"
                      >
                        <span className="font-mono text-[10px] text-foreground-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-[15px] text-foreground-secondary transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground">
                          {point}
                        </span>

                        <span
                          aria-hidden="true"
                          className="font-mono text-[10px] text-transparent transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground-muted"
                        >
                          /
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-12">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
                      Current focus
                    </span>

                    <span className="font-mono text-xs tabular-nums text-foreground-muted">
                      {String(activeIndex + 1).padStart(2, "0")}
                      {" / "}
                      {String(focus.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4 h-px w-full bg-border">
                    <div
                      className="h-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
