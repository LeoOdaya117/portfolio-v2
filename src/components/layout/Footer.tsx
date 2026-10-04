import { footerData } from "@/data/footer";
import Container from "@/components/layout/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid min-h-[100px] grid-cols-1 items-center gap-10 py-7 min-[801px]:grid-cols-[1fr_auto_auto] min-[801px]:py-0">
        <div className="flex flex-col gap-1">
          <strong className="font-bold">{footerData.profile.name}</strong>

          <span className="text-xs text-text-muted">
            {footerData.profile.title}
          </span>
        </div>

        <nav
          className="flex flex-wrap gap-6 text-xs text-text-muted min-[801px]:flex-nowrap"
          aria-label={footerData.navigationLabel}
        >
          {footerData.links.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-150 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest motion-reduce:transition-none"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-150 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest motion-reduce:transition-none"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <span className="whitespace-nowrap text-xs text-text-muted">
          {footerData.copyright.symbol} {footerData.copyright.year}{" "}
          {footerData.copyright.owner}
        </span>
      </Container>
    </footer>
  );
}
