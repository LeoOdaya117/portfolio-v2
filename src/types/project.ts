export type ProjectStatus = "in-progress" | "completed";

export type ProjectPlatform = "Web" | "Mobile" | "Desktop";

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

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  platforms: readonly ProjectPlatform[];
  categories: readonly string[];
  featured: boolean;
  visualTheme: ProjectVisualTheme;
  status?: ProjectStatus;
  links?: readonly ProjectLink[];
  techStack?: readonly string[];
  coverImage?: ProjectImage;
  galleryImages?: readonly ProjectImage[];
  problem?: string;
  solution?: string;
  contribution?: readonly string[];
};
