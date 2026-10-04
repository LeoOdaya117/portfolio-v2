import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  Map,
  MapPin,
  Monitor,
  Smartphone,
} from "lucide-react";

const focusAreas = [
  { label: "Web Applications", Icon: Monitor },
  { label: "Mobile Development", Icon: Smartphone },
  { label: "GIS & Mapping", Icon: Map },
  { label: "APIs & Backend", Icon: Code2 },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-visual" aria-label="Software engineering workspace">
        <Image
          src="/images/hero-workspace-mockup.png"
          alt="A bright desk with code and a GIS map displayed across two screens."
          fill
          sizes="100vw"
          fetchPriority="high"
          className="hero-photo"
        />

        <div className="hero-opportunity">
          <span className="availability-dot" />
          Open to Opportunities
        </div>

        <ul className="hero-focus" aria-label="Areas of focus">
          {focusAreas.map(({ label, Icon }) => (
            <li key={label}>
              <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <p className="hero-note">Turning ideas into useful software.</p>
      </div>

      <div className="container hero-content">
        <div className="hero-copy">
          <div className="hero-eyebrow">WEB · MOBILE · GIS · API · SYSTEMS</div>

          <h1 id="hero-title">
            Software
            <br />
            <span>Engineer</span>
          </h1>

          <h2>Building practical software for real-world problems.</h2>

          <p className="hero-description">
            I develop web and mobile applications, APIs, and geospatial systems
            with a focus on usability, performance, maintainability, and
            real-world impact.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              View My Work
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <a
              href="/resume/leo-odaya-resume.pdf"
              className="button button-outline"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
              <Download size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-status" aria-label="Availability and location">
          <div>
            <BriefcaseBusiness size={15} aria-hidden="true" />
            <span>Open to Full-Time Roles</span>
          </div>

          <div>
            <Code2 size={15} aria-hidden="true" />
            <span>Available for Freelance Projects</span>
          </div>

          <div>
            <MapPin size={15} aria-hidden="true" />
            <span>Philippines</span>
          </div>
        </div>
      </div>
    </section>
  );
}
