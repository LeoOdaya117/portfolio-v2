import type { HeaderData } from "@/types/header";

export const headerData = {
  brand: {
    name: "Leo Odaya",
    role: "Full Stack Developer",
    href: "/",
  },
  navigationLabel: "Main navigation",
  links: [
    { label: "Home", href: "/", current: true },
    { label: "About", href: "#about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  cta: {
    label: "Let's Work Together",
    href: "#contact",
  },
} satisfies HeaderData;
