export type TechnologyIconName =
  | "laravel"
  | "yii"
  | "react"
  | "nextjs"
  | "typescript"
  | "ionic"
  | "capacitor"
  | "php"
  | "mysql"
  | "mapbox"
  | "openlayers"
  | "docker"
  | "git"
  | "githubActions"
  | "vercel"
  | "angular"
  | "nodejs";

export type TechnologyItem = {
  name: string;
  icon: TechnologyIconName;
};

export type TechStackSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  listLabel: string;
  items: TechnologyItem[];
};
