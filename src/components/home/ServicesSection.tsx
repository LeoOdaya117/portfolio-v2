import {
  Code2,
  MapPinned,
  Monitor,
  Smartphone,
  Wrench,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { servicesData } from "@/data/services";
import type { ServiceIconName } from "@/types/service";
import styles from "./ServicesSection.module.css";

const serviceIcons = {
  monitor: Monitor,
  smartphone: Smartphone,
  code: Code2,
  map: MapPinned,
  wrench: Wrench,
} satisfies Record<ServiceIconName, typeof Monitor>;

const toneClasses = {
  forest: styles.iconForest,
  terracotta: styles.iconTerracotta,
  blue: styles.iconBlue,
} as const;

const toneFrameClasses = {
  forest: styles.frameForest,
  terracotta: styles.frameTerracotta,
  blue: styles.frameBlue,
} as const;

export default function ServicesSection() {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-title"
    >
      <Container>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{servicesData.eyebrow}</p>
            <h2 id="services-title" className={styles.title}>
              {servicesData.title}
            </h2>
          </div>
          <p className={styles.description}>{servicesData.description}</p>
        </div>

        <ul className={styles.grid} aria-label="Development services">
          {servicesData.items.map((service) => {
            const Icon = serviceIcons[service.icon];

            return (
              <li key={service.title} className={styles.card}>
                <span
                  className={`${styles.iconFrame} ${toneFrameClasses[service.tone]}`}
                  aria-hidden="true"
                >
                  <Icon
                    className={`${styles.icon} ${toneClasses[service.tone]}`}
                    size={25}
                    strokeWidth={1.8}
                  />
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
