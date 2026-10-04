export type AboutStatIconName =
  | "sparkles"
  | "briefcase"
  | "code"
  | "desktop";

export type AboutSectionData = {
  eyebrow: string;
  title: {
    firstLine: string;
    secondLine: string;
  };
  description: string;
  statsLabel: string;
  stats: Array<{
    value: string;
    label: string;
    icon: AboutStatIconName;
  }>;
  focusAreas: {
    heading: string;
    listLabel: string;
    items: string[];
  };
  quote: {
    text: string;
    author: string;
  };
};
