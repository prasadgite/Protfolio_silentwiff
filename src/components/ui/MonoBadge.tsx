import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function MonoBadge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 font-mono text-[10.5px] tracking-[0.12em] uppercase",
        "border border-border text-foreground-secondary",
        className,
      )}
      {...props}
    />
  );
}
