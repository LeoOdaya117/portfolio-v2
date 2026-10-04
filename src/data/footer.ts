import type { FooterData } from "@/types/footer";

export const footerData = {
  profile: {
    name: "Leo Odaya",
    title: "Full Stack Developer · AI Native Full-Stack Developer",
  },
  navigationLabel: "Footer navigation",
  links: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: {
    symbol: "©",
    year: new Date().getFullYear(),
    owner: "Leo Odaya",
  },
} satisfies FooterData;
