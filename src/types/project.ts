export type ProjectStatus = "in-progress" | "completed";

export type ProjectVisualTheme =
  | "field"
  | "watershed"
  | "fitness"
  | "travel"
  | "commerce";

export type ProjectLink = {
  label: "Live" | "GitHub" | "Web repo" | "Android app repo";
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  categories: readonly string[];
  featured: boolean;
  visualTheme: ProjectVisualTheme;
  status?: ProjectStatus;
  links?: readonly ProjectLink[];
  techStack?: readonly string[];
  coverImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  problem?: string;
  solution?: string;
  contribution?: readonly string[];
};
