import {
  Activity,
  Braces,
  Database,
  History,
  Image as ImageIcon,
  Layers,
  Mail,
  Map,
  Workflow,
} from "lucide-react";
import {
  siAndroid,
  siApache,
  siCapacitor,
  siDocker,
  siInertia,
  siIonic,
  siJavascript,
  siLaravel,
  siMapbox,
  siMysql,
  siNodedotjs,
  siOpenlayers,
  siOpenstreetmap,
  siPhp,
  siPusher,
  siReact,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVite,
  siYii,
  type SimpleIcon,
} from "simple-icons";

import styles from "./ProjectTechStack.module.css";

type ProjectTechStackProps = Readonly<{
  technologies: readonly string[];
}>;

const brandedIcons: readonly Readonly<{
  match: RegExp;
  icon: SimpleIcon;
}>[] = [
  { match: /^ionic\b/i, icon: siIonic },
  { match: /laravel/i, icon: siLaravel },
  { match: /^php\b/i, icon: siPhp },
  { match: /react/i, icon: siReact },
  { match: /typescript/i, icon: siTypescript },
  { match: /inertia/i, icon: siInertia },
  { match: /vite/i, icon: siVite },
  { match: /tailwind/i, icon: siTailwindcss },
  { match: /mysql/i, icon: siMysql },
  { match: /docker/i, icon: siDocker },
  { match: /apache/i, icon: siApache },
  { match: /yii/i, icon: siYii },
  { match: /node\.js/i, icon: siNodedotjs },
  { match: /mapbox/i, icon: siMapbox },
  { match: /openstreetmap/i, icon: siOpenstreetmap },
  { match: /openlayers/i, icon: siOpenlayers },
  { match: /stripe/i, icon: siStripe },
  { match: /pusher/i, icon: siPusher },
  { match: /javascript/i, icon: siJavascript },
  { match: /android/i, icon: siAndroid },
  { match: /capacitor/i, icon: siCapacitor },
];

function getBrandedIcon(technology: string): SimpleIcon | undefined {
  return brandedIcons.find(({ match }) => match.test(technology))?.icon;
}

function FallbackMark({ technology }: Readonly<{ technology: string }>) {
  const sharedProps = {
    "aria-hidden": true as const,
    size: 19,
    strokeWidth: 1.8,
    focusable: false,
  };

  if (/mysql|database/i.test(technology)) return <Database {...sharedProps} />;
  if (/map|geojson|gps/i.test(technology)) return <Map {...sharedProps} />;
  if (/mail/i.test(technology)) return <Mail {...sharedProps} />;
  if (/history/i.test(technology)) return <History {...sharedProps} />;
  if (/workflow|compose/i.test(technology)) {
    return <Workflow {...sharedProps} />;
  }
  if (/rest|api/i.test(technology)) return <Braces {...sharedProps} />;
  if (/chart|recommendation|tracking/i.test(technology)) {
    return <Activity {...sharedProps} />;
  }
  if (/image generation/i.test(technology)) {
    return <ImageIcon {...sharedProps} />;
  }
  return <Layers {...sharedProps} />;
}

function TechnologyMark({ technology }: Readonly<{ technology: string }>) {
  const icon = getBrandedIcon(technology);

  if (icon) {
    return (
      <svg
        className={styles.brandMark}
        viewBox="0 0 24 24"
        fill={`#${icon.hex}`}
        aria-hidden="true"
        focusable="false"
      >
        <path d={icon.path} />
      </svg>
    );
  }

  return <FallbackMark technology={technology} />;
}

export default function ProjectTechStack({
  technologies,
}: ProjectTechStackProps) {
  const countLabel = technologies.length === 1 ? "technology" : "technologies";

  return (
    <section className={styles.stack} aria-labelledby="project-tech-stack-title">
      <div className={styles.header}>
        <h2 id="project-tech-stack-title">Tech Stack</h2>
        <p className={styles.count}>
          <strong>{technologies.length}</strong> {countLabel}
        </p>
      </div>

      <ul className={styles.list}>
        {technologies.map((technology) => (
          <li className={styles.item} key={technology}>
            <span className={styles.iconFrame} aria-hidden="true">
              <TechnologyMark technology={technology} />
            </span>
            <span className={styles.name}>{technology}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
