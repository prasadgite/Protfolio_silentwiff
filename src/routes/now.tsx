import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { now } from "@/lib/content/now";

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [
      { title: "Now — Prasad Gite" },
      { name: "description", content: "What I'm currently studying, building, and researching." },
      { property: "og:title", content: "Now — Prasad Gite" },
      {
        property: "og:description",
        content: "What I'm currently studying, building, and researching.",
      },
      { property: "og:url", content: "/now" },
    ],
    links: [{ rel: "canonical", href: "/now" }],
  }),
  component: NowPage,
});

function Block({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="grid md:grid-cols-[160px_1fr] gap-4 md:gap-12 py-8 border-t border-border">
      <div className="text-eyebrow">{label}</div>
      <ul className="flex flex-col gap-2 text-foreground-secondary">
        {items.map((i) => (
          <li key={i}>— {i}</li>
        ))}
      </ul>
    </div>
  );
}

function NowPage() {
  return (
    <>
      <section className="pt-16 pb-12 border-b border-border">
        <Container>
          <div className="text-eyebrow mb-6">§ NOW</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight max-w-3xl">
            Current technical direction.
          </h1>
          <p className="mt-6 text-foreground-secondary max-w-2xl">
            Updated periodically. Last updated{" "}
            <span className="text-foreground">{now.lastUpdated}</span>.
          </p>
        </Container>
      </section>
      <Container>
        <Block label="STUDYING" items={now.studying} />
        <Block label="BUILDING" items={now.building} />
        <Block label="RESEARCHING" items={now.researching} />
        <Block label="PRACTICING" items={now.practicing} />
      </Container>
    </>
  );
}
