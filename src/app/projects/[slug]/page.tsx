import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectResourceLinks from "@/components/projects/ProjectResourceLinks";
import ProjectTechStack from "@/components/projects/ProjectTechStack";
import { getProjectBySlug, projects } from "@/data/projects";
import styles from "./page.module.css";

type ProjectPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Leo Odaya",
    };
  }

  return {
    title: project.title + " | Leo Odaya",
    description: project.summary,
  };
}

function DetailSection({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className={styles.detailSection}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header activeItem="Projects" />

      <main className={styles.main}>
        <Container>
          <Link className={styles.backLink} href="/projects">
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
            All Projects
          </Link>

          <article>
            <header className={styles.hero}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Project Case Study</p>
                <h1 className={styles.title}>{project.title}</h1>
                <p className={styles.summary}>{project.summary}</p>

                <div className={styles.labels}>
                  {project.status === "in-progress" ? (
                    <span className={styles.status}>In progress</span>
                  ) : project.status === "completed" ? (
                    <span className={styles.status}>Completed</span>
                  ) : null}

                  <ul className={styles.categories} aria-label="Project categories">
                    {project.categories.map((category) => (
                      <li key={category}>{category}</li>
                    ))}
                  </ul>
                </div>

                <ProjectResourceLinks
                  projectTitle={project.title}
                  links={project.links}
                />
              </div>

              <figure className={styles.heroFigure}>
                <ProjectGallery
                  project={project}
                  sizes="(max-width: 850px) 100vw, 50vw"
                />
              </figure>
            </header>

            {(project.problem ||
              project.solution ||
              project.contribution?.length ||
              project.techStack?.length) && (
              <div className={styles.details}>
                {project.problem ||
                project.solution ||
                project.contribution?.length ? (
                  <div className={styles.story}>
                    {project.problem ? (
                      <DetailSection title="Problem">
                        <p>{project.problem}</p>
                      </DetailSection>
                    ) : null}

                    {project.solution ? (
                      <DetailSection title="Solution">
                        <p>{project.solution}</p>
                      </DetailSection>
                    ) : null}

                    {project.contribution?.length ? (
                      <DetailSection title="My Contribution">
                        <ul className={styles.contributionList}>
                          {project.contribution.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </DetailSection>
                    ) : null}
                  </div>
                ) : null}

                {project.techStack?.length ? (
                  <ProjectTechStack technologies={project.techStack} />
                ) : null}
              </div>
            )}
          </article>
        </Container>
      </main>

      <Footer />
    </>
  );
}
