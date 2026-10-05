export type ServiceIconName = "monitor" | "smartphone" | "code" | "map" | "wrench";

export type ServiceTone = "forest" | "terracotta" | "blue";

export type ServiceOffering = {
  title: string;
  description: string;
  icon: ServiceIconName;
  tone: ServiceTone;
};

export type ServicesSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceOffering[];
};
