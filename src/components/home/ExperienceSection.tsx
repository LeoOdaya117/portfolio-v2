import { FileText } from "lucide-react";

import Container from "@/components/layout/Container";
import { experienceData } from "@/data/experience";
import styles from "./ExperienceSection.module.css";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="experience-title"
    >
      <Container>
        <div className={styles.content}>
          <div className={styles.overview}>
            <p className={styles.eyebrow}>{experienceData.eyebrow}</p>
            <h2 id="experience-title" className={styles.title}>
              {experienceData.title}
            </h2>
            <p className={styles.description}>{experienceData.description}</p>

            <dl className={styles.statistics}>
              {experienceData.statistics.map(({ value, label }) => (
                <div key={label} className={styles.statistic}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <a
              className={styles.resumeLink}
              href={experienceData.resumeHref}
              target="_blank"
              rel="noreferrer"
            >
              {experienceData.resumeLabel}
              <FileText size={16} strokeWidth={1.9} aria-hidden="true" />
            </a>
          </div>

          <ol className={styles.timeline} aria-label={experienceData.entriesLabel}>
            {experienceData.entries.map((entry) => {
              const isEducation = entry.kind === "education";

              return (
                <li
                  key={
                    isEducation
                      ? entry.institution
                      : `${entry.employer}-${entry.role}`
                  }
                  className={styles.entry}
                >
                  <div className={styles.meta}>
                    <p className={styles.period}>
                      {isEducation ? (
                        <time dateTime={entry.date}>{entry.dateLabel}</time>
                      ) : (
                        <>
                          <time dateTime={entry.startDate}>
                            {entry.startLabel}
                          </time>
                          <span aria-hidden="true">{" \u2014 "}</span>
                          {entry.endDate ? (
                            <time dateTime={entry.endDate}>{entry.endLabel}</time>
                          ) : (
                            <span>{entry.endLabel}</span>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  <span className={styles.marker} aria-hidden="true" />
                  <div className={styles.entryContent}>
                    <div className={styles.entryHeading}>
                      <div>
                        <h3 className={styles.role}>
                          {isEducation ? entry.degree : entry.role}
                        </h3>
                        <p className={styles.employer}>
                          {isEducation ? (
                            <>
                              <span>{entry.institution}</span>
                              <span aria-hidden="true"> · </span>
                              <span>{entry.location}</span>
                            </>
                          ) : (
                            entry.employer
                          )}
                        </p>
                      </div>
                      <span className={styles.employmentType}>
                        {isEducation ? "Education" : entry.employmentType}
                      </span>
                    </div>
                    {isEducation ? (
                      <p className={styles.coursework}>
                        <strong>Relevant coursework:</strong>{" "}
                        {entry.relevantCoursework.join(", ")}
                      </p>
                    ) : (
                      <ul className={styles.responsibilities}>
                        {entry.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
