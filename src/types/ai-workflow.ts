export type AIToolIcon = "copilot" | "codex" | "claude";

export type AIWorkflowSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  toolsLabel: string;
  tools: Array<{
    name: string;
    icon: AIToolIcon;
  }>;
  workflowLabel: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
};
