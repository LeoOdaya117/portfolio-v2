export type FooterData = {
  profile: {
    name: string;
    title: string;
  };
  navigationLabel: string;
  links: Array<{
    label: string;
    href: string;
  }>;
  copyright: {
    symbol: string;
    year: number;
    owner: string;
  };
};
