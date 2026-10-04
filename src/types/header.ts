export type HeaderData = {
  brand: {
    name: string;
    role: string;
    href: string;
  };
  navigationLabel: string;
  links: Array<{
    label: string;
    href: string;
    current?: boolean;
  }>;
  cta: {
    label: string;
    href: string;
  };
};
