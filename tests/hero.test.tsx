import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import Hero from "@/components/home/Hero";
import { heroData } from "@/data/hero";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <div role="img" aria-label={alt} data-src={src} className={className} />
  ),
}));

afterEach(cleanup);

describe("Hero", () => {
  it("renders its copy and image from hero data", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(within(heading).getByText(heroData.title.firstLine)).toBeTruthy();
    expect(within(heading).getByText(heroData.title.secondLine)).toBeTruthy();
    expect(screen.getByText(heroData.eyebrow)).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: heroData.subtitle }),
    ).toBeTruthy();
    expect(screen.getByText(heroData.description)).toBeTruthy();
    expect(screen.getByText(heroData.note)).toBeTruthy();

    const image = screen.getByRole("img", { name: heroData.image.alt });
    expect(image.getAttribute("data-src")).toBe(heroData.image.src);
  });

  it("renders focus areas, actions, and availability from hero data", () => {
    render(<Hero />);

    expect(screen.getByText(heroData.focusCard.heading)).toBeTruthy();
    const focusList = screen.getByRole("list", {
      name: heroData.focusCard.listLabel,
    });
    const focusItems = within(focusList).getAllByRole("listitem");
    expect(focusItems.map((item) => item.textContent?.trim())).toEqual(
      heroData.focusCard.items.map((item) => item.label),
    );

    for (const action of heroData.actions) {
      const link = screen.getByRole("link", { name: action.label });
      expect(link.getAttribute("href")).toBe(action.href);
      expect(link.getAttribute("target")).toBe(action.target ?? null);
      expect(link.getAttribute("rel")).toBe(action.rel ?? null);
    }

    for (const item of heroData.status) {
      expect(screen.getByText(item.label)).toBeTruthy();
    }
  });
});
