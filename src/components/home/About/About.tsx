
import Image from "next/image";
import { BriefcaseBusiness, Code2, MonitorSmartphone, Sparkles } from "lucide-react";

import Container from "@/components/layout/Container";
import { aboutData } from "@/data/about";
import styles from "./About.module.css";

const statIcons = {
  sparkles: Sparkles,
  briefcase: BriefcaseBusiness,
  code: Code2,
  desktop: MonitorSmartphone,
} as const;

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Container>
        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>{aboutData.eyebrow}</p>

            <h2 id="about-title" className={styles.title}>
              {aboutData.title.firstLine}
              <span className={styles.titleStrong}>{aboutData.title.secondLine}</span>
            </h2>

            <p className={styles.description}>{aboutData.description}</p>

            <div className={styles.stats} aria-label={aboutData.statsLabel}>
              {aboutData.stats.map(({ label, value, icon }) => {
                const Icon = statIcons[icon];

                return (
                  <div key={label} className={styles.statItem}>
                    <div className={styles.iconWrap} aria-hidden="true">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>

                    <div>
                      <div className={styles.statValue}>{value}</div>
                      <div className={styles.statLabel}>{label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.backdrop} aria-hidden="true" />

            <div className={styles.portraitWrap}>
              <Image
                src="/images/formal-attire.png"
                alt="A portrait of Leo Odaya in a studio setting"
                width={760}
                height={920}
                priority
                className={styles.portrait}
              />
            </div>

            <div className={styles.quoteCard}>
              <span className={styles.quoteMark} aria-hidden="true">“</span>
              <p className={styles.quoteText}>{aboutData.quote.text}</p>
              <p className={styles.quoteAuthor}>— {aboutData.quote.author}</p>
            </div>

            <aside className={styles.focusCard} aria-label={aboutData.focusAreas.listLabel}>
              <h3 className={styles.focusHeading}>{aboutData.focusAreas.heading}</h3>
              <ul className={styles.focusList} aria-label={aboutData.focusAreas.listLabel}>
                {aboutData.focusAreas.items.map((item) => (
                  <li key={item} className={styles.focusItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
