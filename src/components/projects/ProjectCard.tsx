import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import ProjectArtwork from "@/components/projects/ProjectArtwork";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = Readonly<{
  project: Project;
}>;

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={"/projects/" + project.slug} className={styles.card}>
      <ProjectArtwork
        project={project}
        className={styles.artwork}
        sizes="(max-width: 580px) 100vw, (max-width: 850px) 50vw, (max-width: 1050px) 50vw, 25vw"
      />

      <div className={styles.content}>
        <div className={styles.labels}>
          <ul
            className={styles.categories}
            aria-label={project.title + " categories"}
          >
            {project.categories.map((category) => (
              <li key={category} className={styles.category}>
                {category}
              </li>
            ))}
          </ul>

          {project.status === "in-progress" ? (
            <span className={styles.status}>In progress</span>
          ) : project.status === "completed" ? (
            <span className={styles.status}>Completed</span>
          ) : null}
        </div>

        <div className={styles.titleRow}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.arrow} aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={1.8} />
          </span>
        </div>

        <p className={styles.summary}>{project.summary}</p>
      </div>
    </Link>
  );
}
