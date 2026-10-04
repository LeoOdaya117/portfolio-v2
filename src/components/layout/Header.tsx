import Link from "next/link";
import { headerData } from "@/data/header";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={headerData.brand.href} className="brand">
          <strong>{headerData.brand.name}</strong>

          <span>{headerData.brand.role}</span>
        </Link>

        <nav className="desktop-nav" aria-label={headerData.navigationLabel}>
          {headerData.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href={headerData.cta.href} className="header-cta">
          {headerData.cta.label}
        </a>
      </div>
    </header>
  );
}
