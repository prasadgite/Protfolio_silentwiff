import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { projects } from "@/lib/content/projects";
import { notes } from "@/lib/content/notes";
import { lab } from "@/lib/content/lab";
import { research } from "@/lib/content/research";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: { path: string; changefreq?: string; priority?: string }[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/work", changefreq: "weekly", priority: "0.9" },
          { path: "/research", changefreq: "monthly", priority: "0.7" },
          { path: "/lab", changefreq: "weekly", priority: "0.7" },
          { path: "/notes", changefreq: "weekly", priority: "0.7" },
          { path: "/experience", changefreq: "monthly", priority: "0.6" },
          { path: "/now", changefreq: "monthly", priority: "0.6" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/resume", changefreq: "monthly", priority: "0.5" },
          ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: "0.8" })),
          ...notes.map((n) => ({ path: `/notes/${n.slug}`, priority: "0.6" })),
          ...lab.map((l) => ({ path: `/lab/${l.slug}`, priority: "0.5" })),
          ...research.map((r) => ({ path: `/research/${r.slug}`, priority: "0.5" })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
