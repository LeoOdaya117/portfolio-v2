import { ArrowUpRight, Globe } from "lucide-react";
import { siGithub } from "simple-icons";

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
          <span
            className={styles.brandIcon}
            data-resource-icon={projectLink.label === "Live" ? "live" : "github"}
            aria-hidden="true"
          >
            {projectLink.label === "Live" ? (
              <Globe size={16} strokeWidth={1.9} />
            ) : (
              <svg
                className={styles.githubMark}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d={siGithub.path} />
              </svg>
            )}
          </span>
          <span>{projectLink.label}</span>
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
        </a>
      ))}
    </nav>
  );
}
