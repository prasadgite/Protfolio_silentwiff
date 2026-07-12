import { cn } from "@/lib/utils";
import type { Status as StatusValue } from "@/lib/content/schemas";

const styles: Record<StatusValue, string> = {
  ACTIVE: "text-[color:var(--success)] before:bg-[color:var(--success)]",
  IN_PROGRESS: "text-[color:var(--success)] before:bg-[color:var(--success)]",
  COMPLETE: "text-foreground before:bg-foreground",
  PLANNED: "text-foreground-muted before:bg-foreground-muted",
  PROPOSED: "text-foreground-muted before:bg-foreground-muted",
  ARCHIVED: "text-foreground-muted before:bg-foreground-muted",
  REPRODUCED: "text-foreground before:bg-foreground",
};

export function StatusIndicator({
  status,
  className,
}: {
  status: StatusValue;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase",
        "before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full",
        styles[status],
        className,
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
