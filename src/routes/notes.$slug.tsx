import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { noteBySlug, noteBodies } from "@/lib/content/notes";
import type { Note } from "@/lib/content/schemas";

export const Route = createFileRoute("/notes/$slug")({
  loader: ({ params }): { note: Note; body: string } => {
    const note = noteBySlug.get(params.slug);
    if (!note) throw notFound();
    return { note, body: noteBodies[params.slug] ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const n = loaderData.note;
    return {
      meta: [
        { title: `${n.title} — Notes` },
        { name: "description", content: n.description },
        { property: "og:title", content: n.title },
        { property: "og:description", content: n.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/notes/${n.slug}` },
        { property: "article:published_time", content: n.publishedAt },
      ],
      links: [{ rel: "canonical", href: `/notes/${n.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: n.title,
            description: n.description,
            datePublished: n.publishedAt,
            author: { "@type": "Person", name: "Prasad Gite" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <Container>
      <div className="py-32">
        <h1 className="text-3xl">Not found.</h1>
        <Link to="/notes" className="mt-6 inline-block text-accent">
          ← Notes
        </Link>
      </div>
    </Container>
  ),
  component: NoteDetail,
});

function NoteDetail() {
  const { note: n, body } = Route.useLoaderData() as { note: Note; body: string };
  return (
    <article>
      <header className="pt-16 pb-12 border-b border-border">
        <Container>
          <Link
            to="/notes"
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted hover:text-foreground"
          >
            ← NOTES
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-eyebrow">
            <span>{n.categoryLabel}</span>
            <span>·</span>
            <span>{n.publishedAt}</span>
            <span>·</span>
            <span>{n.difficulty}</span>
          </div>
          <h1 className="mt-6 text-3xl md:text-5xl font-normal tracking-tight max-w-4xl leading-[1.1]">
            {n.title}
          </h1>
          <p className="mt-6 text-lg text-foreground-secondary max-w-2xl leading-relaxed">
            {n.description}
          </p>
        </Container>
      </header>
      <section className="py-16">
        <Container>
          <div className="prose-editorial">
            {body ? (
              body.split(/\n\n+/).map((para, i) =>
                para.trim().startsWith("-") ? (
                  <ul key={i}>
                    {para.split("\n").map((line, j) => (
                      <li key={j}>{line.replace(/^-\s*/, "")}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{para}</p>
                ),
              )
            ) : (
              <p>Content coming soon.</p>
            )}
          </div>
        </Container>
      </section>
    </article>
  );
}
