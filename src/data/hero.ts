import type { HeroSectionData } from "@/types/hero";

export const heroData = {
  image: {
    src: "/images/hero-workspace-mockup.png",
    alt: "A bright desk with code on one screen and a colorful visualization on another.",
    label: "Software engineering workspace",
  },
  focusCard: {
    heading: "Open to Opportunities",
    listLabel: "Areas of focus",
    items: [
      { label: "Web Applications", icon: "monitor" },
      { label: "Mobile Development", icon: "smartphone" },
      { label: "APIs & Backend", icon: "code" },
    ],
  },
  note: "Turning ideas into useful software.",
  eyebrow: "WEB · MOBILE · API · SYSTEMS · MAINTENANCE",
  title: {
    firstLine: "Full Stack",
    secondLine: "Developer",
  },
  subtitle: "Building practical software for real-world problems.",
  description:
    "I develop web and mobile applications, APIs, and custom software systems with a focus on usability, performance, maintainability, and real-world impact.",
  actions: [
    {
      label: "View My Work",
      href: "#projects",
      variant: "primary",
      icon: "arrowRight",
    },
    {
      label: "Download Resume",
      href: "/files/resume/Leo_Odaya_Resume_2026.pdf",
      variant: "outline",
      icon: "download",
      target: "_blank",
      rel: "noreferrer",
    },
  ],
  statusLabel: "Availability and location",
  status: [
    { label: "Open to Full-Time Roles", icon: "briefcase" },
    { label: "Available for Freelance Projects", icon: "code" },
    { label: "Philippines", icon: "mapPin" },
  ],
} satisfies HeroSectionData;
