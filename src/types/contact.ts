export type ContactIconName = "mail" | "linkedin" | "github" | "facebook";

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
  icon: ContactIconName;
  external: boolean;
  primary?: boolean;
};

export type ContactSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  availabilityLabel: string;
  methodsLabel: string;
  methods: ContactMethod[];
};
