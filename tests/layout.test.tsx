import type { MouseEventHandler, ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { footerData } from "@/data/footer";
import { headerData } from "@/data/header";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    "aria-current": ariaCurrent,
    onClick,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
    "aria-current"?: "page" | "location";
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  }) => (
    <a
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onClick={onClick}
    >
      {children}
    </a>
  ),
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Header", () => {
  it("renders its brand, navigation, and call to action from header data", () => {
    render(<Header />);

    expect(screen.getByText(headerData.brand.name)).toBeTruthy();
    expect(screen.getByText(headerData.brand.role)).toBeTruthy();

    const brandName = screen.getByText(headerData.brand.name);
    expect(brandName.closest("a")?.getAttribute("href")).toBe(
      headerData.brand.href,
    );

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });

    for (const item of headerData.links) {
      const link = within(navigation).getByRole("link", {
        name: item.label,
      });
      expect(link.getAttribute("href")).toBe(
        item.label === "Projects" ? "#projects" : item.href,
      );
      expect(link.getAttribute("aria-current")).toBe(
        item.current ? "page" : null,
      );
    }

    const callToAction = screen.getByRole("link", {
      name: headerData.cta.label,
    });
    expect(callToAction.getAttribute("href")).toBe(headerData.cta.href);
  });

  it("marks the requested primary navigation item as current", () => {
    render(<Header activeItem="Projects" />);

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    const projectsLink = within(navigation).getByRole("link", {
      name: "Projects",
    });
    const homeLink = within(navigation).getByRole("link", { name: "Home" });

    expect(projectsLink.getAttribute("aria-current")).toBe("page");
    expect(projectsLink.className).toContain("after:bg-text");
    expect(homeLink.getAttribute("aria-current")).toBeNull();
  });

  it("marks the selected section as current when its navigation link is clicked", () => {
    render(
      <>
        <Header />
        <section id="about" />
        <section id="projects" />
        <section id="services" />
        <section id="experience" />
      </>,
    );

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    const experienceLink = within(navigation).getByRole("link", {
      name: "Experience",
    });

    fireEvent.click(experienceLink);

    expect(experienceLink.getAttribute("aria-current")).toBe("location");
    expect(experienceLink.className).toContain("after:bg-text");
  });

  it("uses the home Projects section while keeping the Projects route current", () => {
    const { unmount } = render(
      <>
        <Header />
        <section id="projects" />
      </>,
    );

    const homeNavigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    const homeProjectsLink = within(homeNavigation).getByRole("link", {
      name: "Projects",
    });

    expect(homeProjectsLink.getAttribute("href")).toBe("#projects");
    fireEvent.click(homeProjectsLink);
    expect(homeProjectsLink.getAttribute("aria-current")).toBe("location");

    unmount();
    render(<Header activeItem="Projects" />);

    const projectsNavigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    const projectsRouteLink = within(projectsNavigation).getByRole("link", {
      name: "Projects",
    });

    expect(projectsRouteLink.getAttribute("href")).toBe("/projects");
    expect(projectsRouteLink.getAttribute("aria-current")).toBe("page");
  });

  it("marks the section at the scroll position as current", () => {
    render(
      <>
        <Header />
        <section id="about" />
        <section id="projects" />
        <section id="services" />
        <section id="experience" />
      </>,
    );

    const sectionTops = {
      about: 200,
      projects: 120,
      services: 10,
      experience: 500,
    };

    for (const [id, top] of Object.entries(sectionTops)) {
      const section = document.getElementById(id);
      if (!section) throw new Error(`Missing test section: ${id}`);
      Object.defineProperty(section, "getBoundingClientRect", {
        value: () => ({ top, bottom: top + 100 }),
      });
    }

    fireEvent.scroll(window);

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    expect(
      within(navigation).getByRole("link", { name: "Services" }).getAttribute(
        "aria-current",
      ),
    ).toBe("location");
  });

  it("activates Contact when it occupies the current scroll area", () => {
    render(
      <>
        <Header />
        <section id="about" />
        <section id="projects" />
        <section id="services" />
        <section id="experience" />
        <section id="contact" />
      </>,
    );

    const contactTop = Math.floor(window.innerHeight * 0.38);
    const sectionTops = {
      about: 1000,
      projects: 900,
      services: 800,
      experience: -300,
      contact: contactTop,
    };

    for (const [id, top] of Object.entries(sectionTops)) {
      const section = document.getElementById(id);
      if (!section) throw new Error(`Missing test section: ${id}`);
      Object.defineProperty(section, "getBoundingClientRect", {
        value: () => ({ top, bottom: top + 300 }),
      });
    }

    fireEvent.scroll(window);

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    expect(
      within(navigation).getByRole("link", { name: "Contact" }).getAttribute(
        "aria-current",
      ),
    ).toBe("location");
  });

  it("keeps section links usable from the Projects route", () => {
    render(<Header activeItem="Projects" />);

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    expect(
      within(navigation).getByRole("link", { name: "About" }).getAttribute(
        "href",
      ),
    ).toBe("/#about");
    expect(
      screen.getByRole("link", { name: headerData.cta.label }).getAttribute(
        "href",
      ),
    ).toBe("/#contact");
  });

  it("scrolls to the top when Home is clicked", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<Header />);

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    fireEvent.click(within(navigation).getByRole("link", { name: "Home" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("resets scroll before navigating Home from the Projects route", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<Header activeItem="Projects" />);

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    fireEvent.click(within(navigation).getByRole("link", { name: "Home" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });
});

describe("Footer", () => {
  it("renders its profile, navigation, and copyright from footer data", () => {
    render(<Footer />);

    expect(screen.getByText(footerData.profile.name)).toBeTruthy();
    expect(screen.getByText(footerData.profile.title)).toBeTruthy();

    const navigation = screen.getByRole("navigation", {
      name: footerData.navigationLabel,
    });

    for (const item of footerData.links) {
      const link = within(navigation).getByRole("link", {
        name: item.label,
      });
      expect(link.getAttribute("href")).toBe(item.href);
      if (item.label !== "Projects") {
        expect(item.href).toMatch(/^\/#/);
      }
    }

    const copyright = `${footerData.copyright.symbol} ${footerData.copyright.year} ${footerData.copyright.owner}`;
    expect(screen.getByText(copyright)).toBeTruthy();
  });
});
