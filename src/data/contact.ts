import type { ContactSectionData } from "@/types/contact";

export const contactData = {
  eyebrow: "Let's work together",
  title: "Open to Opportunities and New Projects",
  description:
    "Whether you're looking for a developer to join your team or need help with a project, feel free to reach out.",
  availabilityLabel: "Available for full-time and freelance work",
  methodsLabel: "Contact Leo",
  methods: [
    {
      label: "Email",
      value: "odayaleo117@gmail.com",
      href: "mailto:odayaleo117@gmail.com",
      icon: "mail",
      external: false,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/leo-odaya-ab736a288",
      href: "https://www.linkedin.com/in/leo-odaya-ab736a288",
      icon: "linkedin",
      external: true,
    },
    {
      label: "GitHub",
      value: "github.com/LeoOdaya117",
      href: "https://github.com/LeoOdaya117",
      icon: "github",
      external: true,
    },
  ],
} satisfies ContactSectionData;
