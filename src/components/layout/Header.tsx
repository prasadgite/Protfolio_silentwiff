import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-config";
import { Container } from "./Container";
import { Kbd } from "../ui/Kbd";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/work", label: "Work" },
  { to: "/research", label: "Research" },
  { to: "/lab", label: "Lab" },
  { to: "/notes", label: "Notes" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
] as const;

export function Header({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return router.subscribe("onResolved", (event) => {
      if (event.pathChanged) {
        setMobileOpen(false);
      }
    });
  }, [router]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex items-center justify-between h-14">
        <Link
          to="/"
          className="font-mono text-sm tracking-[0.14em] uppercase text-foreground hover:text-accent transition-colors"
          aria-label="Home"
        >
          {site.initials}/
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-1.5 font-mono text-[12px] tracking-[0.1em] uppercase text-foreground-secondary hover:text-foreground transition-colors"
              activeProps={{
                className:
                  "px-3 py-1.5 font-mono text-[12px] tracking-[0.1em] uppercase text-foreground",
              }}
              activeOptions={{ exact: false }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden md:inline-flex items-center gap-2 px-2.5 py-1.5 border border-border rounded text-foreground-muted hover:text-foreground hover:border-border-strong transition-colors"
            aria-label="Open command palette"
          >
            <span className="font-mono text-[11px] tracking-wider">SEARCH</span>
            <Kbd>⌘K</Kbd>
          </button>
          <a
            href="/resume"
            className="hidden md:inline-flex items-center px-3 py-1.5 font-mono text-[12px] tracking-[0.1em] uppercase text-accent hover:underline underline-offset-4"
          >
            Resume
          </a>
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <Container className="py-8 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-3 font-mono text-sm tracking-wider uppercase text-foreground-secondary hover:text-foreground border-b border-border"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/resume"
              className="py-3 font-mono text-sm tracking-wider uppercase text-accent"
            >
              Resume
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenPalette();
              }}
              className="mt-2 py-3 text-left font-mono text-sm tracking-wider uppercase text-foreground-muted"
            >
              Search ⌘K
            </button>
          </Container>
        </div>
      )}
    </header>
  );
}
