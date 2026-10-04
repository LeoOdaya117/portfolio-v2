import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

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
      expect(link.getAttribute("href")).toBe(item.href);
      expect(link.getAttribute("aria-current")).toBe(
        item.current ? "page" : null,
      );
    }

    const callToAction = screen.getByRole("link", {
      name: headerData.cta.label,
    });
    expect(callToAction.getAttribute("href")).toBe(headerData.cta.href);
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
    }

    const copyright = `${footerData.copyright.symbol} ${footerData.copyright.year} ${footerData.copyright.owner}`;
    expect(screen.getByText(copyright)).toBeTruthy();
  });
});
