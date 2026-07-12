import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site-config";
import { ResumePreview } from "@/components/resume/ResumePreview";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Prasad Gite" },
      { name: "description", content: "Download or view Prasad Gite's engineering resume." },
      { property: "og:title", content: "Resume — Prasad Gite" },
      { property: "og:description", content: "Download or view Prasad Gite's engineering resume." },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  const url = site.resume?.url;
  const downloadFilename = site.resume?.downloadFilename || "Prasad-Gite-Resume.pdf";
  const lastUpdated = site.resume?.lastUpdated;
  const fileType = site.resume?.fileType || "PDF";
  const fileSize = site.resume?.fileSize;
  const name = site.name || "Prasad Gite";

  if (!url) {
    return (
      <>
        <section className="pt-16 pb-12 border-b border-border">
          <Container>
            <div className="text-eyebrow mb-6">§ RESUME</div>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight">Resume.</h1>
          </Container>
        </section>
        <section className="py-16">
          <Container>
            <div className="max-w-xl">
              <div className="text-eyebrow mb-4">STATUS / NOT PUBLISHED</div>
              <p className="text-foreground-secondary leading-relaxed">
                The resume PDF is not currently published.
              </p>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="pt-16 pb-12 border-b border-border">
        <Container>
          <div className="text-eyebrow mb-6">§ RESUME</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight">Prasad Gite.</h1>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <div className="max-w-4xl flex flex-col gap-8">
            {/* Description */}
            <p className="text-foreground-secondary text-lg leading-relaxed max-w-2xl">
              View or download my engineering resume for a concise overview of my professional
              experience, technical work, and academic background.
            </p>

            {/* Metadata and Desktop Actions Bar */}
            <div className="flex flex-col gap-6">
              {/* Metadata */}
              <dl className="flex flex-wrap gap-x-12 gap-y-4">
                {lastUpdated && (
                  <div>
                    <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted mb-1">
                      Last Updated
                    </dt>
                    <dd className="text-sm font-normal text-foreground">{lastUpdated}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted mb-1">
                    Format
                  </dt>
                  <dd className="text-sm font-normal text-foreground">{fileType}</dd>
                </div>
                {fileSize && (
                  <div>
                    <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-foreground-muted mb-1">
                      File Size
                    </dt>
                    <dd className="text-sm font-normal text-foreground">{fileSize}</dd>
                  </div>
                )}
              </dl>

              {/* Desktop/Tablet Action Bar (Hidden on Mobile) */}
              <div className="hidden md:flex gap-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-[12px] tracking-[0.14em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={`View ${name} resume PDF in a new tab`}
                >
                  View resume ↗
                </a>
                <a
                  href={url}
                  download={downloadFilename}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border-strong text-foreground font-mono text-[12px] tracking-[0.14em] uppercase hover:bg-surface transition-colors"
                  aria-label={`Download ${name} resume PDF`}
                >
                  Download PDF ↓
                </a>
              </div>
            </div>

            {/* Mobile Document Access Fallback (Block on Mobile, Hidden on Desktop/Tablet) */}
            <div className="block md:hidden border border-border bg-surface/30 p-6">
              <div className="text-eyebrow mb-2">RESUME DOCUMENT</div>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                PDF PREVIEW MAY DEPEND ON BROWSER SUPPORT.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-foreground text-background font-mono text-[12px] tracking-[0.14em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors text-center w-full min-h-[48px]"
                  aria-label={`View ${name} resume PDF in a new tab`}
                >
                  View resume ↗
                </a>
                <a
                  href={url}
                  download={downloadFilename}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-border-strong text-foreground font-mono text-[12px] tracking-[0.14em] uppercase hover:bg-surface transition-colors text-center w-full min-h-[48px]"
                  aria-label={`Download ${name} resume PDF`}
                >
                  Download PDF ↓
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
