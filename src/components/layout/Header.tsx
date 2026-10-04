import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <strong>Leo Odaya</strong>

          <span>Software Engineer</span>
        </Link>

        <nav className="desktop-nav">
          <a href="/" aria-current="page">
            Home
          </a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="header-cta">
          Let&apos;s Work Together
        </a>
      </div>
    </header>
  );
}
