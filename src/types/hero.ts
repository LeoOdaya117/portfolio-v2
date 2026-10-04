export type HeroIconName =
  | "arrowRight"
  | "briefcase"
  | "code"
  | "download"
  | "mapPin"
  | "monitor"
  | "smartphone";

export type HeroSectionData = {
  image: {
    src: string;
    alt: string;
    label: string;
  };
  focusCard: {
    heading: string;
    listLabel: string;
    items: Array<{ label: string; icon: HeroIconName }>;
  };
  note: string;
  eyebrow: string;
  title: {
    firstLine: string;
    secondLine: string;
  };
  subtitle: string;
  description: string;
  actions: Array<{
    label: string;
    href: string;
    variant: "primary" | "outline";
    icon: HeroIconName;
    target?: string;
    rel?: string;
  }>;
  statusLabel: string;
  status: Array<{ label: string; icon: HeroIconName }>;
};
