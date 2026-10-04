import type { AboutSectionData } from "@/types/about";

export const aboutData = {
  eyebrow: "ABOUT ME",
  title: {
    firstLine: "Developer who",
    secondLine: "builds and solves.",
  },
  description:
    "I'm a full-stack developer based in the Philippines with experience in web, mobile, and geospatial systems. I enjoy working on feature-rich, data-driven applications and turning complex requirements into practical and maintainable software.",
  statsLabel: "Career highlights",
  stats: [
    { value: "1+ Years", label: "Industry Experience", icon: "sparkles" },
    { value: "Full-Time", label: "Open to opportunities", icon: "briefcase" },
    { value: "Freelance", label: "Available for projects", icon: "code" },
    { value: "Remote / On-site", label: "Philippines & International", icon: "desktop" },
  ],
  focusAreas: {
    heading: "FOCUS AREAS",
    listLabel: "Technical focus areas",
    items: [
      "Web Applications",
      "Mobile Apps",
      "GIS & Spatial Data",
      "APIs & Integrations",
      "System Improvements",
    ],
  },
  quote: {
    text: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
  },
} satisfies AboutSectionData;
