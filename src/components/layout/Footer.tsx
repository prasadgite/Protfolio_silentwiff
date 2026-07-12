import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { site } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-24">
      <Container className="py-16 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="font-mono text-sm tracking-[0.14em] uppercase text-foreground mb-3">
            {site.initials}/ {site.name}
          </div>
          <p className="text-sm text-foreground-secondary max-w-xs leading-relaxed">
            Engineering systems, models & algorithms. ML systems, algorithms, quantitative
            computing, high-performance systems.
          </p>
        </div>

        <FooterCol title="Site">
          <FooterLink to="/work">Work</FooterLink>
          <FooterLink to="/research">Research</FooterLink>
          <FooterLink to="/lab">Lab</FooterLink>
          <FooterLink to="/notes">Notes</FooterLink>
        </FooterCol>

        <FooterCol title="Profile">
          <FooterLink to="/experience">Experience</FooterLink>
          <FooterLink to="/now">Now</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/resume">Resume</FooterLink>
        </FooterCol>

        <FooterCol title="Elsewhere">
          {site.links.github ? (
            <ExternalLink href={site.links.github}>GitHub</ExternalLink>
          ) : (
            <span className="text-sm text-foreground-muted">GitHub — pending</span>
          )}
          {site.links.linkedin ? (
            <ExternalLink href={site.links.linkedin}>LinkedIn</ExternalLink>
          ) : (
            <span className="text-sm text-foreground-muted">LinkedIn — pending</span>
          )}
          {site.email ? (
            <ExternalLink href={`mailto:${site.email}`}>Email</ExternalLink>
          ) : (
            <span className="text-sm text-foreground-muted">Email — pending</span>
          )}
        </FooterCol>
      </Container>
      <div className="border-t border-border">
        <Container className="py-6 flex flex-col md:flex-row justify-between gap-3 font-mono text-[11px] tracking-[0.12em] uppercase text-foreground-muted">
          <div>
            © {year} {site.name}
          </div>
          <div>BUILD_STATUS: {site.buildStatus}</div>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-eyebrow mb-4">{title}</div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
      >
        {children}
      </a>
    </li>
  );
}
