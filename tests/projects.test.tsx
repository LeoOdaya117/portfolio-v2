import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";

import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/projects/[slug]/page";
import ProjectsPage from "@/app/projects/page";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProjectArtwork from "@/components/projects/ProjectArtwork";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectResourceLinks from "@/components/projects/ProjectResourceLinks";
import { featuredProjects, getProjectBySlug, projects } from "@/data/projects";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    "aria-current": ariaCurrent,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
    "aria-current"?: "page";
  }) => (
    <a href={href} className={className} aria-current={ariaCurrent}>
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

class TestIntersectionObserver implements IntersectionObserver {
  static current: TestIntersectionObserver | undefined;

  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];

  constructor(private readonly callback: IntersectionObserverCallback) {
    TestIntersectionObserver.current = this;
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  intersect() {
    const rect = new DOMRect();
    const entry: IntersectionObserverEntry = {
      boundingClientRect: rect,
      intersectionRect: rect,
      rootBounds: null,
      target: document.createElement("div"),
      time: 0,
      isIntersecting: true,
      intersectionRatio: 1,
    };

    this.callback([entry], this);
  }
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  TestIntersectionObserver.current = undefined;
});

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
  it("renders the separated platform filters and loads every project", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeTruthy();
    const headerNavigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    expect(
      within(headerNavigation)
        .getByRole("link", { name: "Projects" })
        .getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("group", { name: "Filter projects by platform" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Web projects (4)" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Mobile projects (4)" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Desktop projects (4)" }),
    ).toBeTruthy();

    for (const project of projects.slice(0, 3)) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.title }),
      ).toBeTruthy();
    }
    expect(
      screen.queryByRole("heading", { level: 3, name: "Road Trip" }),
    ).toBeNull();
    expect(screen.getByRole("status").textContent).toContain("3 of 5");

    fireEvent.click(
      screen.getByRole("button", { name: "Load more projects" }),
    );

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
    expect(screen.getByRole("status").textContent).toContain("5 of 5");
    expect(screen.getByText("In progress")).toBeTruthy();
  });

  it("filters by platform and searches project descriptions and technology", () => {
    render(<ProjectsPage />);

    fireEvent.click(
      screen.getByRole("button", { name: "Desktop projects (4)" }),
    );
    expect(screen.getByRole("status").textContent).toContain("3 of 4");
    expect(
      screen.queryByRole("heading", { level: 3, name: "Road Trip" }),
    ).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Mobile projects (4)" }));
    expect(screen.getByRole("status").textContent).toContain("3 of 4");
    expect(
      screen.queryByRole("heading", { level: 3, name: "T-Shop" }),
    ).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Load more projects" }));
    expect(
      screen.getByRole("heading", { level: 3, name: "Road Trip" }),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "All projects (5)" }));
    const search = screen.getByRole("searchbox", { name: "Search projects" });
    fireEvent.change(search, { target: { value: "Laravel 10" } });
    expect(screen.getByRole("status").textContent).toContain("1 of 1");
    expect(
      screen.getByRole("heading", { level: 3, name: "T-Shop" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("heading", { level: 3, name: "Road Trip" }),
    ).toBeNull();

    fireEvent.change(search, { target: { value: "no matching project" } });
    expect(screen.getByText("No matching projects")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByRole("status").textContent).toContain("3 of 5");
  });

  it("loads the next batch when the scroll sentinel enters the viewport", () => {
    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    render(<ProjectsPage />);

    expect(screen.getByRole("status").textContent).toContain("3 of 5");
    const observer = TestIntersectionObserver.current;
    expect(observer).toBeDefined();

    act(() => observer?.intersect());

    expect(screen.getByRole("status").textContent).toContain("5 of 5");
    expect(
      screen.getByRole("heading", { level: 3, name: "Road Trip" }),
    ).toBeTruthy();
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
    const headerNavigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    expect(
      within(headerNavigation)
        .getByRole("link", { name: "Projects" })
        .getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByText(
        "Offline-first workforce platform with mobile app, web admin, mapping, synchronization, and reporting.",
      ),
    ).toBeTruthy();
    expect(screen.getByText("In progress")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Tech Stack" })).toBeTruthy();
    const techStack = screen.getByRole("region", { name: "Tech Stack" });
    expect(within(techStack).getAllByRole("listitem")).toHaveLength(
      projects[0].techStack?.length ?? 0,
    );
    expect(within(techStack).getByText("Laravel 13")).toBeTruthy();
    expect(techStack.querySelector('svg[viewBox="0 0 24 24"]')).toBeTruthy();
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

describe("ProjectGallery", () => {
  it("opens a full-size preview and navigates gallery images with controls and keys", () => {
    const project = {
      ...projects[0],
      galleryImages: [
        {
          src: "/images/projects/fieldops-desktop.png",
          alt: "FieldOps desktop dashboard screenshot",
          caption: "Desktop dashboard",
        },
        {
          src: "/images/projects/fieldops-mobile.png",
          alt: "FieldOps mobile patrol app screenshot",
          caption: "Mobile patrol app",
        },
      ],
    };

    render(<ProjectGallery project={project} />);

    expect(
      screen.getByRole("group", { name: "FieldOps image gallery" }),
    ).toBeTruthy();
    expect(screen.getByText("1 / 2")).toBeTruthy();

    const secondThumbnail = screen.getByRole("button", {
      name: "Show image 2: Mobile patrol app",
    });
    fireEvent.click(secondThumbnail);
    expect(secondThumbnail.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(
      screen.getByRole("button", {
        name: "Show image 1: Desktop dashboard",
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Open image 1 of 2: FieldOps desktop dashboard screenshot",
      }),
    );

    const dialog = screen.getByRole("dialog", {
      name: "FieldOps image preview",
    });
    expect(
      within(dialog).getByRole("img", {
        name: "FieldOps desktop dashboard screenshot",
      }),
    ).toBeTruthy();

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(
      within(dialog).getByRole("img", {
        name: "FieldOps mobile patrol app screenshot",
      }),
    ).toBeTruthy();

    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(
      screen.queryByRole("dialog", { name: "FieldOps image preview" }),
    ).toBeNull();
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
    expect(
      demoLink.querySelector('[data-resource-icon="live"] svg'),
    ).toBeTruthy();
    expect(
      githubLink.querySelector('[data-resource-icon="github"] svg'),
    ).toBeTruthy();
  });

  it("does not render an empty links region", () => {
    const { container } = render(<ProjectResourceLinks projectTitle="FieldOps" />);

    expect(container.firstChild).toBeNull();
  });
});
