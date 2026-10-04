import { ArrowUpRight } from "lucide-react";

import type { ProjectLink } from "@/types/project";
import styles from "./ProjectResourceLinks.module.css";

type ProjectResourceLinksProps = Readonly<{
  projectTitle: string;
  links?: readonly ProjectLink[];
}>;

export default function ProjectResourceLinks({
  projectTitle,
  links,
}: ProjectResourceLinksProps) {
  if (!links?.length) return null;

  return (
    <nav
      className={styles.links}
      aria-label={projectTitle + " external links"}
    >
      {links.map((projectLink) => (
        <a
          key={projectLink.label}
          className={styles.link}
          href={projectLink.href}
          target="_blank"
          rel="noreferrer"
        >
          {projectLink.label}
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
        </a>
      ))}
    </nav>
  );
}
