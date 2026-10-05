import { CodeXml } from "lucide-react";
import { siClaude, siGithubcopilot } from "simple-icons";

import Container from "@/components/layout/Container";
import { aiWorkflowData } from "@/data/ai-workflow";
import type { AIToolIcon } from "@/types/ai-workflow";
import styles from "./AIWorkflowSection.module.css";

function ToolMark({ icon }: { icon: AIToolIcon }) {
  if (icon === "codex") {
    return <CodeXml className={styles.codexIcon} size={19} aria-hidden="true" />;
  }

  const brand = icon === "copilot" ? siGithubcopilot : siClaude;

  return (
    <svg className={styles.brandIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d={brand.path} fill={`#${brand.hex}`} />
    </svg>
  );
}

export default function AIWorkflowSection() {
  return (
    <section
      id="ai-workflow"
      className={styles.section}
      aria-labelledby="ai-workflow-title"
    >
      <Container>
        <div className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{aiWorkflowData.eyebrow}</p>
            <h2 id="ai-workflow-title" className={styles.title}>
              {aiWorkflowData.title}
            </h2>
            <p className={styles.description}>{aiWorkflowData.description}</p>

            <div className={styles.toolsBlock}>
              <h3 className={styles.subheading}>{aiWorkflowData.toolsLabel}</h3>
              <ul className={styles.tools} aria-label={aiWorkflowData.toolsLabel}>
                {aiWorkflowData.tools.map((tool) => (
                  <li key={tool.name} className={styles.tool}>
                    <ToolMark icon={tool.icon} />
                    <span>{tool.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.workflowBlock}>
            <h3 className={styles.subheading}>{aiWorkflowData.workflowLabel}</h3>
            <ol className={styles.steps} aria-label={aiWorkflowData.workflowLabel}>
              {aiWorkflowData.steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDescription}>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
