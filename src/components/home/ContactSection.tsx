import { ArrowUpRight, Link2, Mail } from "lucide-react";
import { siFacebook, siGithub } from "simple-icons";

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
              <li
                key={method.label}
                className={`${styles.methodItem} ${method.primary ? styles.primaryItem : styles.socialItem}`}
              >
                <a
                  className={`${styles.method} ${method.primary ? styles.primaryMethod : styles.socialMethod}`}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noreferrer" : undefined}
                  title={method.primary ? undefined : method.label}
                >
                  <span
                    className={method.primary ? styles.iconFrame : styles.socialIcon}
                  >
                    {method.icon === "github" || method.icon === "facebook" ? (
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="21"
                        height="21"
                      >
                        <path
                          d={
                            method.icon === "github"
                              ? siGithub.path
                              : siFacebook.path
                          }
                        />
                      </svg>
                    ) : method.icon === "linkedin" ? (
                      <Link2 aria-hidden="true" size={21} strokeWidth={1.8} />
                    ) : (
                      <Mail aria-hidden="true" size={21} strokeWidth={1.8} />
                    )}
                  </span>
                  <span
                    className={`${styles.methodCopy} ${method.primary ? "" : styles.visuallyHidden}`}
                  >
                    <span className={styles.methodLabel}>{method.label}</span>
                    <span className={styles.methodValue}>{method.value}</span>
                  </span>
                  {method.primary && (
                    <span className={styles.actionIcon} aria-hidden="true">
                      <ArrowUpRight size={20} strokeWidth={1.8} />
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
