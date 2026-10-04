import Image from "next/image";
import { heroData } from "@/data/hero";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  MapPin,
  Monitor,
  Smartphone,
} from "lucide-react";

const heroIcons = {
  arrowRight: ArrowRight,
  briefcase: BriefcaseBusiness,
  code: Code2,
  download: Download,
  mapPin: MapPin,
  monitor: Monitor,
  smartphone: Smartphone,
} as const;

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-visual" aria-label={heroData.image.label}>
        <Image
          src={heroData.image.src}
          alt={heroData.image.alt}
          fill
          sizes="100vw"
          fetchPriority="high"
          className="hero-photo"
        />

        <div className="hero-focus-card">
          <div className="hero-focus-heading">
            <span className="availability-dot" />
            {heroData.focusCard.heading}
          </div>

          <ul className="hero-focus" aria-label={heroData.focusCard.listLabel}>
            {heroData.focusCard.items.map(({ label, icon }) => {
              const Icon = heroIcons[icon];

              return (
                <li key={label}>
                  <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="hero-note">{heroData.note}</p>
      </div>

      <div className="container hero-content">
        <div className="hero-copy">
          <div className="hero-eyebrow">{heroData.eyebrow}</div>

          <h1 id="hero-title">
            {heroData.title.firstLine}
            <br />
            <span>{heroData.title.secondLine}</span>
          </h1>

          <h2>{heroData.subtitle}</h2>

          <p className="hero-description">{heroData.description}</p>

          <div className="hero-actions">
            {heroData.actions.map((action) => {
              const Icon = heroIcons[action.icon];

              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={`button button-${action.variant}`}
                  target={action.target}
                  rel={action.rel}
                >
                  {action.label}
                  <Icon
                    size={action.icon === "arrowRight" ? 17 : 16}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-status" aria-label={heroData.statusLabel}>
          {heroData.status.map(({ label, icon }) => {
            const Icon = heroIcons[icon];

            return (
              <div key={label}>
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
