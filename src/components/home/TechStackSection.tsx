import {
  siAngular,
  siCapacitor,
  siDocker,
  siGit,
  siGithubactions,
  siIonic,
  siLaravel,
  siMapbox,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenlayers,
  siPhp,
  siReact,
  siTypescript,
  siVercel,
  siYii,
} from "simple-icons";

import Container from "@/components/layout/Container";
import { technologiesData } from "@/data/technologies";
import type { TechnologyIconName } from "@/types/technology";
import styles from "./TechStackSection.module.css";

const technologyIcons = {
  laravel: siLaravel,
  yii: siYii,
  react: siReact,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  ionic: siIonic,
  capacitor: siCapacitor,
  php: siPhp,
  mysql: siMysql,
  mapbox: siMapbox,
  openlayers: siOpenlayers,
  docker: siDocker,
  git: siGit,
  githubActions: siGithubactions,
  vercel: siVercel,
  angular: siAngular,
  nodejs: siNodedotjs,
} satisfies Record<TechnologyIconName, typeof siLaravel>;

export default function TechStackSection() {
  const renderTechnologyList = (isDuplicate = false) => (
    <ul
      className={styles.list}
      aria-label={isDuplicate ? undefined : technologiesData.listLabel}
      aria-hidden={isDuplicate || undefined}
    >
      {technologiesData.items.map((technology) => {
        const icon = technologyIcons[technology.icon];

        return (
          <li key={technology.name} className={styles.item}>
            <span className={styles.iconTile}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d={icon.path} fill={`#${icon.hex}`} />
              </svg>
            </span>
            <span className={styles.label}>{technology.name}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section
      id="tech-stack"
      className={styles.section}
      aria-labelledby="tech-stack-title"
    >
      <Container>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{technologiesData.eyebrow}</p>
            <h2 id="tech-stack-title" className={styles.title}>
              {technologiesData.title}
            </h2>
          </div>
          <p className={styles.description}>{technologiesData.description}</p>
        </div>

        <div className={styles.carousel}>
          <div
            className={styles.viewport}
            role="region"
            aria-label={technologiesData.listLabel}
            aria-roledescription="carousel"
            aria-live="off"
            tabIndex={0}
          >
            <div className={styles.track}>
              {renderTechnologyList()}
              {renderTechnologyList(true)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
