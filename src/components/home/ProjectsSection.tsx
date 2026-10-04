import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import ProjectCard from "@/components/projects/ProjectCard";
import { featuredProjects } from "@/data/projects";
import styles from "./ProjectsSection.module.css";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-title"
    >
      <Container>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Featured Projects</p>
            <h2 id="projects-title" className={styles.title}>
              Selected Work
            </h2>
          </div>

          <p className={styles.description}>
            A selection of projects spanning web, mobile, mapping, and field
            workflows.
          </p>

          <Link className={styles.allProjects} href="/projects">
            View All Projects
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
          </Link>
        </div>

        <div className={styles.grid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
