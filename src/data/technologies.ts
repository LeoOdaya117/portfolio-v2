import type { TechStackSectionData } from "@/types/technology";

export const technologiesData = {
  eyebrow: "Tech Stack",
  title: "Tools & Technologies",
  description: "A stack built around the kinds of systems I work on.",
  listLabel: "Technology stack",
  items: [
    { name: "Laravel", icon: "laravel" },
    { name: "Yii2", icon: "yii" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Ionic", icon: "ionic" },
    { name: "Capacitor", icon: "capacitor" },
    { name: "PHP", icon: "php" },
    { name: "MySQL", icon: "mysql" },
    { name: "Mapbox GL", icon: "mapbox" },
    { name: "OpenLayers", icon: "openlayers" },
    { name: "Docker", icon: "docker" },
    { name: "Git", icon: "git" },
    { name: "GitHub Actions", icon: "githubActions" },
    { name: "Vercel", icon: "vercel" },
    { name: "Angular", icon: "angular" },
    { name: "Node.js", icon: "nodejs" },
  ],
} satisfies TechStackSectionData;
