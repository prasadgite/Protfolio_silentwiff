import React from "react";

interface ResumePreviewProps {
  url: string;
  downloadFilename?: string;
  title: string;
}

export function ResumePreview({ url, downloadFilename = "Resume.pdf", title }: ResumePreviewProps) {
  return (
    <div className="border border-border overflow-hidden bg-surface/50 w-full h-[75vh] md:h-[80vh]">
      <object data={url} type="application/pdf" aria-label={title} className="w-full h-full">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-surface">
          <p className="max-w-md text-foreground-secondary leading-relaxed mb-6">
            Your browser cannot display the PDF preview directly. Open the resume in a new tab or
            download the PDF.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono text-[12px] tracking-[0.14em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label={`View ${title} in a new tab`}
            >
              View resume ↗
            </a>
            <a
              href={url}
              download={downloadFilename}
              className="inline-flex items-center gap-2 px-5 py-3 border border-border-strong text-foreground font-mono text-[12px] tracking-[0.14em] uppercase hover:bg-surface transition-colors"
              aria-label={`Download ${title}`}
            >
              Download PDF ↓
            </a>
          </div>
        </div>
      </object>
    </div>
  );
}
