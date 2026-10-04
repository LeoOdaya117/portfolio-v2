import Image from "next/image";
import type { Project, ProjectVisualTheme } from "@/types/project";
import styles from "./ProjectArtwork.module.css";

type ProjectArtworkProps = Readonly<{
  project: Project;
  className?: string;
  sizes?: string;
}>;

const themeStyles: Record<ProjectVisualTheme, string> = {
  field: styles.field,
  watershed: styles.watershed,
  fitness: styles.fitness,
  travel: styles.travel,
  commerce: styles.commerce,
};

export default function ProjectArtwork({
  project,
  className,
  sizes,
}: ProjectArtworkProps) {
  const frameClassName = [styles.frame, className].filter(Boolean).join(" ");

  if (project.coverImage) {
    return (
      <div className={frameClassName}>
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes={
            sizes ??
            "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
          }
          className={styles.image}
        />
      </div>
    );
  }

  return (
    <div
      className={[frameClassName, styles.placeholder, themeStyles[project.visualTheme]]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <span className={styles.categoryLine}>{project.categories.join(" · ")}</span>
      <span className={styles.monogram}>{project.title.slice(0, 1)}</span>
      <span className={styles.projectName}>{project.title}</span>
      <span className={styles.mark}>{project.title.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}
