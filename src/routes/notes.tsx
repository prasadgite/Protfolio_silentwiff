import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { notes } from "@/lib/content/notes";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes — Prasad Gite" },
      {
        name: "description",
        content: "Technical writing on algorithms, ML systems, and engineering trade-offs.",
      },
      { property: "og:title", content: "Notes — Prasad Gite" },
      {
        property: "og:description",
        content: "Technical writing on algorithms, ML systems, and engineering trade-offs.",
      },
      { property: "og:url", content: "/notes" },
    ],
    links: [{ rel: "canonical", href: "/notes" }],
  }),
  component: NotesIndex,
});

function NotesIndex() {
  return (
    <>
      <section className="pt-16 pb-12 border-b border-border">
        <Container>
          <div className="text-eyebrow mb-6">§ NOTES / INDEX</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight max-w-3xl">
            Technical notes.
          </h1>
          <p className="mt-6 text-foreground-secondary max-w-2xl">
            A working notebook. Entries are written to clarify things I actually had to work out —
            algorithms, systems trade-offs, and mathematics I want to reproduce from memory.
          </p>
        </Container>
      </section>

      <Container>
        <div className="divide-y divide-border">
          {notes.map((n) => (
            <Link
              key={n.slug}
              to="/notes/$slug"
              params={{ slug: n.slug }}
              className="group grid md:grid-cols-[180px_1fr_120px] gap-4 md:gap-10 py-10 hover:bg-background-elevated/40 -mx-6 px-6 md:-mx-10 md:px-10 transition-colors"
            >
              <div>
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted">
                  {n.categoryLabel}
                </div>
                <div className="mt-2 font-mono text-xs text-foreground-muted">{n.publishedAt}</div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-normal tracking-tight text-foreground group-hover:text-accent">
                  {n.title}
                </h2>
                <p className="mt-2 text-foreground-secondary max-w-2xl">{n.description}</p>
              </div>
              <div className="text-right hidden md:block font-mono text-[10.5px] tracking-[0.12em] uppercase text-foreground-muted">
                {n.difficulty}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
