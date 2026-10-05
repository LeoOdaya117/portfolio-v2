import type { ServicesSectionData } from "@/types/service";

export const servicesData = {
  eyebrow: "Services",
  title: "Development Services",
  description:
    "Practical software for teams that need dependable tools, connected data, and maintainable systems.",
  items: [
    {
      title: "Web Application Development",
      description:
        "Responsive dashboards, portals, and operational workflows built for real users.",
      icon: "monitor",
      tone: "forest",
    },
    {
      title: "Mobile App Development",
      description:
        "Ionic and Capacitor apps for field work, offline use, and reliable synchronization.",
      icon: "smartphone",
      tone: "forest",
    },
    {
      title: "API & Backend Development",
      description:
        "REST APIs, data models, and service integrations for production workflows.",
      icon: "code",
      tone: "terracotta",
    },
    {
      title: "GIS & Mapping Solutions",
      description:
        "Interactive maps, spatial data, route visualization, and location-based features.",
      icon: "map",
      tone: "blue",
    },
    {
      title: "Existing System Improvements",
      description:
        "Maintenance, troubleshooting, performance tuning, and deployment support.",
      icon: "wrench",
      tone: "terracotta",
    },
  ],
} satisfies ServicesSectionData;
