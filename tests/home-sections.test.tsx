import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import Home from "@/app/page";
import AIWorkflowSection from "@/components/home/AIWorkflowSection";
import ContactSection from "@/components/home/ContactSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ServicesSection from "@/components/home/ServicesSection";
import TechStackSection from "@/components/home/TechStackSection";
import { aiWorkflowData } from "@/data/ai-workflow";
import { contactData } from "@/data/contact";
import { experienceData } from "@/data/experience";
import { headerData } from "@/data/header";
import { servicesData } from "@/data/services";
import { technologiesData } from "@/data/technologies";

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

afterEach(cleanup);

describe("home page added sections", () => {
  it("renders the five service offerings with their descriptions", () => {
    render(<ServicesSection />);

    expect(
      screen.getByRole("heading", { name: servicesData.title, level: 2 }),
    ).toBeTruthy();

    const services = screen.getByRole("list", {
      name: "Development services",
    });
    expect(within(services).getAllByRole("listitem")).toHaveLength(
      servicesData.items.length,
    );

    for (const service of servicesData.items) {
      expect(
        within(services).getByRole("heading", { name: service.title }),
      ).toBeTruthy();
      expect(within(services).getByText(service.description)).toBeTruthy();
    }
  });

  it("renders technology marks with visible names", () => {
    render(<TechStackSection />);

    expect(
      screen.getByRole("heading", { name: technologiesData.title, level: 2 }),
    ).toBeTruthy();

    const technologies = screen.getByRole("list", {
      name: technologiesData.listLabel,
    });
    const technologyItems = within(technologies).getAllByRole("listitem");
    expect(technologyItems).toHaveLength(technologiesData.items.length);

    technologiesData.items.forEach((technology, index) => {
      const item = technologyItems[index];
      expect(within(item).getByText(technology.name)).toBeTruthy();
      expect(item.querySelector("svg path")?.getAttribute("d")).toBeTruthy();
    });

    const carousel = screen.getByRole("region", {
      name: technologiesData.listLabel,
    });
    expect(carousel.getAttribute("aria-roledescription")).toBe("carousel");
    expect(carousel.querySelectorAll("ul")).toHaveLength(2);
    expect(carousel.querySelectorAll('ul[aria-hidden="true"]')).toHaveLength(1);
    expect(within(carousel).queryByRole("button")).toBeNull();
  });

  it("explains the AI tools and reviewed development workflow", () => {
    render(<AIWorkflowSection />);

    const section = screen.getByRole("region", { name: aiWorkflowData.title });
    expect(section.getAttribute("id")).toBe("ai-workflow");
    expect(within(section).getByText(aiWorkflowData.description)).toBeTruthy();

    const tools = within(section).getByRole("list", {
      name: aiWorkflowData.toolsLabel,
    });
    for (const tool of aiWorkflowData.tools) {
      expect(within(tools).getByText(tool.name)).toBeTruthy();
    }

    const steps = within(section).getByRole("list", {
      name: aiWorkflowData.workflowLabel,
    });
    expect(steps.children).toHaveLength(aiWorkflowData.steps.length);
    for (const step of aiWorkflowData.steps) {
      expect(within(steps).getByRole("heading", { name: step.title })).toBeTruthy();
      expect(within(steps).getByText(step.description)).toBeTruthy();
    }
  });

  it("renders employment, education, and the resume link", () => {
    render(<ExperienceSection />);

    const section = screen.getByRole("region", {
      name: experienceData.title,
    });
    expect(section.getAttribute("id")).toBe("experience");

    const timeline = within(section).getByRole("list", {
      name: experienceData.entriesLabel,
    });
    expect(timeline.children).toHaveLength(experienceData.entries.length);

    for (const entry of experienceData.entries) {
      if (entry.kind === "education") {
        expect(
          within(timeline).getByRole("heading", { name: entry.degree }),
        ).toBeTruthy();
        expect(within(timeline).getByText(entry.institution)).toBeTruthy();
        expect(within(timeline).getByText(entry.location)).toBeTruthy();
        expect(within(timeline).getByText(entry.dateLabel)).toBeTruthy();
        expect(within(timeline).getByText("Education")).toBeTruthy();
        expect(within(timeline).getByText("Relevant coursework:")).toBeTruthy();

        expect(
          within(timeline).getByText(entry.relevantCoursework.join(", ")),
        ).toBeTruthy();

        continue;
      }

      expect(
        within(timeline).getByRole("heading", { name: entry.role }),
      ).toBeTruthy();
      expect(within(timeline).getByText(entry.employer)).toBeTruthy();
      expect(within(timeline).getByText(entry.startLabel)).toBeTruthy();
      expect(within(timeline).getByText(entry.endLabel)).toBeTruthy();

      for (const responsibility of entry.responsibilities) {
        expect(within(timeline).getByText(responsibility)).toBeTruthy();
      }
    }

    const resumeLink = within(section).getByRole("link", {
      name: experienceData.resumeLabel,
    });
    expect(resumeLink.getAttribute("href")).toBe(experienceData.resumeHref);
  });

  it("renders the contact section with verified contact methods", () => {
    render(<ContactSection />);

    const section = screen.getByRole("region", { name: contactData.title });
    expect(section.getAttribute("id")).toBe("contact");
    expect(
      within(section).getByText(contactData.availabilityLabel),
    ).toBeTruthy();

    const methods = within(section).getByRole("list", {
      name: contactData.methodsLabel,
    });

    for (const method of contactData.methods) {
      const link = within(methods).getByRole("link", {
        name: new RegExp(`^${method.label}`),
      });
      expect(link.getAttribute("href")).toBe(method.href);
      expect(link.getAttribute("target")).toBe(
        method.external ? "_blank" : null,
      );
    }
  });

  it("places the new sections after projects and keeps the Experience anchor", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    const sectionTargets = Array.from(main.querySelectorAll("section"), (section) =>
      section.id || section.getAttribute("aria-labelledby"),
    );
    expect(sectionTargets.slice(-6)).toEqual([
      "projects",
      "services",
      "tech-stack",
      "ai-workflow",
      "experience",
      "contact",
    ]);

    const navigation = screen.getByRole("navigation", {
      name: headerData.navigationLabel,
    });
    const experienceLink = within(navigation).getByRole("link", {
      name: "Experience",
    });
    expect(experienceLink.getAttribute("href")).toBe("#experience");
    expect(document.getElementById("experience")).toBeTruthy();

    const contactLink = within(navigation).getByRole("link", {
      name: "Contact",
    });
    expect(contactLink.getAttribute("href")).toBe("#contact");
    expect(document.getElementById("contact")).toBeTruthy();
  });
});
