import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteShell } from "../components/layout/SiteShell";
import { site } from "../lib/site-config";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="container-editorial py-32 md:py-40">
      <div className="text-eyebrow mb-6">ERROR / 404</div>

      <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-4">
        This route doesn't exist.
      </h1>

      <p className="text-foreground-secondary max-w-lg mb-8">
        The URL you tried isn't part of this site. Head back home or open the command palette (⌘K)
        to find what you're looking for.
      </p>

      <a
        href="/"
        className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] uppercase text-accent hover:underline underline-offset-4"
      >
        Return home →
      </a>
    </div>
  );
}

function ErrorComponent({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="container-editorial py-32">
      <div className="text-eyebrow mb-6">ERROR</div>

      <h1 className="text-3xl font-normal tracking-tight mb-4">This page failed to load.</h1>

      <p className="text-foreground-secondary mb-8 max-w-lg">
        Something went wrong. Try again or head back home.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="px-4 py-2 border border-border-strong text-sm text-foreground hover:bg-surface"
        >
          Try again
        </button>

        <a href="/" className="px-4 py-2 text-sm text-foreground-secondary hover:text-foreground">
          Home
        </a>
      </div>
    </div>
  );
}

const TITLE = `${site.name} — ${site.role}`;
const DESCRIPTION = site.description;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: TITLE },
      {
        name: "description",
        content: DESCRIPTION,
      },
      {
        name: "author",
        content: site.name,
      },
      {
        property: "og:title",
        content: TITLE,
      },
      {
        property: "og:description",
        content: DESCRIPTION,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: site.name,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: TITLE,
      },
      {
        name: "twitter:description",
        content: DESCRIPTION,
      },
      {
        name: "theme-color",
        content: "#080808",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          jobTitle: site.role,
          description: site.tagline,
        }),
      },
    ],
  }),

  shellComponent: RootShell,

  component: RootComponent,

  notFoundComponent: NotFoundComponent,

  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
