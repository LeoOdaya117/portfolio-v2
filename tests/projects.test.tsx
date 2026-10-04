import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/projects/[slug]/page";
import ProjectsPage from "@/app/projects/page";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProjectArtwork from "@/components/projects/ProjectArtwork";
import ProjectResourceLinks from "@/components/projects/ProjectResourceLinks";
import { featuredProjects, getProjectBySlug, projects } from "@/data/projects";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <div role="img" aria-label={alt} data-src={src} className={className} />,
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

afterEach(cleanup);

describe("ProjectsSection", () => {
  it("shows the four featured projects and links to the complete project list", () => {
    render(<ProjectsSection />);

    const section = screen.getByRole("region", { name: "Selected Work" });
    const cards = within(section).getAllByRole("link");

    expect(cards).toHaveLength(featuredProjects.length + 1);
    expect(featuredProjects).toHaveLength(4);

    for (const project of featuredProjects) {
      expect(
        within(section).getByRole("heading", {
          level: 3,
          name: project.title,
        }),
      ).toBeTruthy();
      expect(
        within(section).getByRole("link", {
          name: new RegExp(project.title),
        }).getAttribute("href"),
      ).toBe("/projects/" + project.slug);
    }

    expect(
      within(section)
        .getByRole("link", { name: "View All Projects" })
        .getAttribute("href"),
    ).toBe("/projects");
    expect(
      within(section).queryByRole("heading", { level: 3, name: "T-Shop" }),
    ).toBeNull();
    expect(within(section).getByText("In progress")).toBeTruthy();
  });
});

describe("ProjectsPage", () => {
  it("lists all five projects, including T-Shop", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeTruthy();

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.title }),
      ).toBeTruthy();
      expect(
        screen
          .getByRole("link", { name: new RegExp(project.title) })
          .getAttribute("href"),
      ).toBe("/projects/" + project.slug);
    }

    expect(projects).toHaveLength(5);
    expect(screen.getByText("In progress")).toBeTruthy();
  });
});

describe("Project detail page", () => {
  it("generates a static route for every project slug", () => {
    expect(generateStaticParams()).toEqual(
      projects.map((project) => ({ slug: project.slug })),
    );
  });

  it("renders the FieldOps overview and in-progress status", async () => {
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "fieldops" }),
    });
    render(page);

    expect(
      screen.getByRole("heading", { level: 1, name: "FieldOps" }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Offline-first workforce platform with mobile app, web admin, mapping, synchronization, and reporting.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("In progress")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Tech Stack" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Problem" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Solution" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "My Contribution" })).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "GitHub" })
        .getAttribute("href"),
    ).toBe("https://github.com/LeoOdaya117/fieldOps");
    expect(
      screen.getByRole("img", {
        name: "Illustrative FieldOps product mockup on a laptop, tablet, and phone.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("Illustrative UI mockup")).toBeTruthy();
  });

  it("renders verified case-study content and metadata for a resume project", async () => {
    const page = await ProjectPage({
      params: Promise.resolve({ slug: "road-trip" }),
    });
    render(page);

    expect(screen.getByRole("heading", { name: "Solution" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "My Contribution" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Tech Stack" })).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "GitHub" }).getAttribute("href"),
    ).toBe("https://github.com/LeoOdaya117/roadTrip");

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "road-trip" }) }),
    ).resolves.toMatchObject({
      title: "Road Trip | Leo Odaya",
    });
  });

  it("uses not-found handling for unknown project slugs", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "unknown" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(getProjectBySlug("unknown")).toBeUndefined();
  });

  it("shows the verified T-Shop and Gym live and repository links", async () => {
    const tShopPage = await ProjectPage({
      params: Promise.resolve({ slug: "t-shop" }),
    });
    const tShopRender = render(tShopPage);

    expect(screen.getByRole("link", { name: "Live" }).getAttribute("href")).toBe(
      "https://leoodaya.online/T-Shop/public/",
    );
    expect(
      screen.getByRole("link", { name: "GitHub" }).getAttribute("href"),
    ).toBe("https://github.com/LeoOdaya117/T-shop-Ecommerce");

    tShopRender.unmount();

    const gymPage = await ProjectPage({
      params: Promise.resolve({
        slug: "gym-management-mobile-fitness-recommendation-system",
      }),
    });
    render(gymPage);

    expect(screen.getByRole("link", { name: "Live" }).getAttribute("href")).toBe(
      "https://leoodaya.online/Gym_Management/landing-page.php",
    );
    expect(
      screen.getByRole("link", { name: "Web repo" }).getAttribute("href"),
    ).toBe("https://github.com/LeoOdaya117/Gym_Management_System");
    expect(
      screen.getByRole("link", { name: "Android app repo" }).getAttribute("href"),
    ).toBe("https://github.com/LeoOdaya117/FitnessAPP");
  });
});

describe("ProjectArtwork", () => {
  it("exposes useful alt text when a real project image is supplied", () => {
    const project = {
      ...projects[0],
      coverImage: {
        src: "/images/fieldops-preview.png",
        alt: "FieldOps mobile and web app screens",
      },
    };

    render(<ProjectArtwork project={project} />);

    const image = screen.getByRole("img", {
      name: "FieldOps mobile and web app screens",
    });
    expect(image.getAttribute("data-src")).toBe("/images/fieldops-preview.png");
  });

  it("keeps featured project cards keyboard-focusable", () => {
    render(<ProjectsSection />);

    const fieldOpsLink = screen.getByRole("link", { name: /FieldOps/ });

    expect(fieldOpsLink.tabIndex).toBe(0);
    fieldOpsLink.focus();
    expect(document.activeElement).toBe(fieldOpsLink);
  });
});

describe("ProjectResourceLinks", () => {
  it("renders supplied demo and GitHub links as external links", () => {
    render(
      <ProjectResourceLinks
        projectTitle="FieldOps"
        links={[
          { label: "Live", href: "https://demo.example.com" },
          { label: "GitHub", href: "https://github.com/example/fieldops" },
        ]}
      />,
    );

    const navigation = screen.getByRole("navigation", {
      name: "FieldOps external links",
    });
    const demoLink = within(navigation).getByRole("link", { name: "Live" });
    const githubLink = within(navigation).getByRole("link", { name: "GitHub" });

    expect(demoLink.getAttribute("href")).toBe("https://demo.example.com");
    expect(githubLink.getAttribute("href")).toBe(
      "https://github.com/example/fieldops",
    );
    expect(demoLink.getAttribute("target")).toBe("_blank");
    expect(githubLink.getAttribute("rel")).toBe("noreferrer");
  });

  it("does not render an empty links region", () => {
    const { container } = render(<ProjectResourceLinks projectTitle="FieldOps" />);

    expect(container.firstChild).toBeNull();
  });
});
