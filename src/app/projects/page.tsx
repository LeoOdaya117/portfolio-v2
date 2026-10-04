import type { Metadata } from "next";

import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects | Leo Odaya",
  description:
    "Web, mobile, and full-stack projects by Leo Odaya, including case studies and technical contributions.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Container>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Selected Work</p>
            <h1 className={styles.title}>Projects</h1>
            <p className={styles.intro}>
              A closer look at web, mobile, GIS, and full-stack projects.
            </p>
          </header>

          <section aria-label="All projects">
            <div className={styles.grid}>
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
