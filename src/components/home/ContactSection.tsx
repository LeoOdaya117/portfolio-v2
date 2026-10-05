import { Link2, Mail } from "lucide-react";
import { siGithub } from "simple-icons";

import Container from "@/components/layout/Container";
import { contactData } from "@/data/contact";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <Container className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{contactData.eyebrow}</p>
          <h2 id="contact-title" className={styles.title}>
            {contactData.title}
          </h2>
          <p className={styles.description}>{contactData.description}</p>

          <p className={styles.availability}>
            <span className={styles.statusDot} aria-hidden="true" />
            {contactData.availabilityLabel}
          </p>
        </div>

        <ul className={styles.methods} aria-label={contactData.methodsLabel}>
          {contactData.methods.map((method) => {
            return (
              <li key={method.label}>
                <a
                  className={styles.method}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noreferrer" : undefined}
                >
                  <span className={styles.iconFrame}>
                    {method.icon === "github" ? (
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="21"
                        height="21"
                      >
                        <path d={siGithub.path} />
                      </svg>
                    ) : method.icon === "linkedin" ? (
                      <Link2 aria-hidden="true" size={21} strokeWidth={1.8} />
                    ) : (
                      <Mail aria-hidden="true" size={21} strokeWidth={1.8} />
                    )}
                  </span>
                  <span className={styles.methodCopy}>
                    <span className={styles.methodLabel}>{method.label}</span>
                    <span className={styles.methodValue}>{method.value}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
