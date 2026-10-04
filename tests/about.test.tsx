import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import About from "@/components/home/About/About";
import { aboutData } from "@/data/about";

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

describe("About", () => {
  it("renders the profile copy, stat highlights, and focus areas", () => {
    render(<About />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(within(heading).getByText(aboutData.title.firstLine)).toBeTruthy();
    expect(within(heading).getByText(aboutData.title.secondLine)).toBeTruthy();
    expect(screen.getByText(aboutData.eyebrow)).toBeTruthy();
    expect(screen.getByText(aboutData.description)).toBeTruthy();

    for (const item of aboutData.stats) {
      expect(screen.getByText(item.value)).toBeTruthy();
      expect(screen.getByText(item.label)).toBeTruthy();
    }

    const focusList = screen.getByRole("list", {
      name: aboutData.focusAreas.listLabel,
    });
    expect(within(focusList).getAllByRole("listitem")).toHaveLength(
      aboutData.focusAreas.items.length,
    );
    expect(screen.getByText(aboutData.quote.text)).toBeTruthy();
    expect(screen.getByText(`— ${aboutData.quote.author}`)).toBeTruthy();

    const image = screen.getByRole("img", {
      name: "A portrait of Leo Odaya in a studio setting",
    });
    expect(image.getAttribute("data-src")).toBe("/images/formal-attire.png");
  });
});
