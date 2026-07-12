import { cn } from "@/lib/utils";

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center px-1.5 min-w-[1.5rem] h-6",
        "font-mono text-[11px] text-foreground-secondary",
        "border border-border bg-background-elevated rounded-[3px]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
