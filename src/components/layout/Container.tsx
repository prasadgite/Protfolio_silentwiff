import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container-editorial", className)} {...props} />;
}

export function Section({
  children,
  className,
  eyebrow,
  title,
  aside,
  id,
}: {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28 border-t border-border", className)}>
      <Container>
        {(eyebrow || title || aside) && (
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              {eyebrow && <div className="text-eyebrow mb-3">{eyebrow}</div>}
              {title && (
                <h2 className="text-3xl md:text-4xl font-normal tracking-tight max-w-2xl">
                  {title}
                </h2>
              )}
            </div>
            {aside && <div className="text-eyebrow shrink-0">{aside}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
