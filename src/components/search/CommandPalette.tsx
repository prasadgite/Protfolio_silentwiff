import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { searchIndex, type SearchEntry } from "@/lib/content/registry";
import { site } from "@/lib/site-config";
import { Kbd } from "../ui/Kbd";

type ExternalAction = {
  type: "external";
  title: string;
  description: string;
  href: string;
  meta?: string;
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleClose = useCallback(() => {
    setValue("");
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  if (!open) return null;

  const external: ExternalAction[] = [
    site.links.github
      ? {
          type: "external" as const,
          title: "Open GitHub",
          description: "External profile",
          href: site.links.github,
          meta: "EXTERNAL",
        }
      : null,
    site.links.linkedin
      ? {
          type: "external" as const,
          title: "Open LinkedIn",
          description: "External profile",
          href: site.links.linkedin,
          meta: "EXTERNAL",
        }
      : null,
  ].filter(Boolean) as ExternalAction[];

  const go = (entry: SearchEntry | ExternalAction) => {
    if ("href" in entry) {
      window.open(entry.href, "_blank", "noopener,noreferrer");
    } else {
      navigate({ to: entry.url });
    }
    handleClose();
  };

  const grouped = {
    Projects: searchIndex.filter((e) => e.type === "project"),
    "Lab & Research": searchIndex.filter((e) => e.type === "lab" || e.type === "research"),
    Notes: searchIndex.filter((e) => e.type === "note"),
    Navigate: searchIndex.filter((e) => e.type === "page"),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-background/70 backdrop-blur-sm"
      onClick={() => handleClose()}
      role="presentation"
    >
      <div
        className="w-full max-w-xl bg-background-elevated border border-border-strong rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="Command palette"
          value={value}
          onValueChange={setValue}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted">
              ⌘K
            </span>
            <Command.Input
              autoFocus
              placeholder="Search projects, notes, pages…"
              className="flex-1 h-12 bg-transparent outline-none text-foreground placeholder:text-foreground-muted text-sm"
            />
            <Kbd>ESC</Kbd>
          </div>
          <Command.List className="max-h-[50vh] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-sm text-foreground-muted text-center">
              No results.
            </Command.Empty>
            {Object.entries(grouped).map(([group, items]) =>
              items.length ? (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:text-eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:pb-2"
                >
                  {items.map((entry) => (
                    <Command.Item
                      key={entry.url + entry.title}
                      value={`${entry.title} ${entry.description} ${entry.meta ?? ""}`}
                      onSelect={() => go(entry)}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded cursor-pointer text-sm text-foreground-secondary aria-selected:bg-surface aria-selected:text-foreground"
                    >
                      <div className="min-w-0">
                        <div className="truncate">{entry.title}</div>
                        <div className="text-xs text-foreground-muted truncate">
                          {entry.description}
                        </div>
                      </div>
                      {entry.meta && (
                        <span className="font-mono text-[10px] tracking-wider uppercase text-foreground-muted shrink-0">
                          {entry.meta}
                        </span>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              ) : null,
            )}
            {external.length > 0 && (
              <Command.Group
                heading="External"
                className="[&_[cmdk-group-heading]]:text-eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:pb-2"
              >
                {external.map((entry) => (
                  <Command.Item
                    key={entry.href}
                    value={entry.title}
                    onSelect={() => go(entry)}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded cursor-pointer text-sm text-foreground-secondary aria-selected:bg-surface aria-selected:text-foreground"
                  >
                    <span>{entry.title}</span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-foreground-muted">
                      {entry.meta}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
