import { footerData } from "@/data/footer";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{footerData.profile.name}</strong>

          <span>{footerData.profile.title}</span>
        </div>

        <nav className="footer-links" aria-label={footerData.navigationLabel}>
          {footerData.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <span className="footer-copy">
          {footerData.copyright.symbol} {footerData.copyright.year}{" "}
          {footerData.copyright.owner}
        </span>
      </div>
    </footer>
  );
}
