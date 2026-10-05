import type { ContactSectionData } from "@/types/contact";

export const contactData = {
  title: "Open to New Opportunities",
  description:
    "Email is the best way to reach me about a full-time role, freelance work, or your project.",
  availabilityLabel: "Available for full-time and freelance work",
  methodsLabel: "Contact Leo",
  methods: [
    {
      label: "Email",
      value: "odayaleo117@gmail.com",
      href: "mailto:odayaleo117@gmail.com",
      icon: "mail",
      external: false,
      primary: true,
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
    {
      label: "Facebook",
      value: "facebook.com/leo.odaya.1",
      href: "https://www.facebook.com/leo.odaya.1",
      icon: "facebook",
      external: true,
    },
  ],
} satisfies ContactSectionData;
