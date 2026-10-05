import type { AIWorkflowSectionData } from "@/types/ai-workflow";

export const aiWorkflowData = {
  eyebrow: "AI & Development",
  title: "AI-Assisted Development",
  description:
    "I use AI tools for technical analysis, coding, debugging, refactoring, and system documentation, with review before changes are integrated.",
  toolsLabel: "AI development tools",
  tools: [
    { name: "GitHub Copilot", icon: "copilot" },
    { name: "Codex", icon: "codex" },
    { name: "Claude", icon: "claude" },
  ],
  workflowLabel: "How AI supports my workflow",
  steps: [
    {
      title: "Analyze",
      description: "Explore technical approaches and break down requirements.",
    },
    {
      title: "Build",
      description: "Support coding, debugging, and refactoring work.",
    },
    {
      title: "Review",
      description: "Review suggestions before integration and document systems clearly.",
    },
  ],
} satisfies AIWorkflowSectionData;
