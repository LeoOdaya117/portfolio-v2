"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { headerData } from "@/data/header";

type NavigationLabel = (typeof headerData.links)[number]["label"];

type HeaderNavigationProps = Readonly<{
  activeItem?: "Home" | "Projects";
}>;

type PendingSection = {
  label: NavigationLabel;
  id: string;
  startY: number;
  direction: -1 | 1;
};

function getSectionId(label: NavigationLabel) {
  if (label === "Home") return null;
  if (label === "Projects") return "projects";

  const link = headerData.links.find((item) => item.label === label);
  return link?.href.startsWith("#") ? link.href.slice(1) : null;
}

function getActiveMarker() {
  const headerBottom =
    document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
  const viewportMarker = window.innerHeight * 0.4;
  return Math.min(
    Math.max(headerBottom + 24, viewportMarker),
    window.innerHeight * 0.45,
  );
}

function getVisibleSection() {
  const marker = getActiveMarker();
  const atPageBottom =
    window.scrollY > 0 &&
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 4;

  if (atPageBottom && document.getElementById("contact")) {
    return "Contact" as NavigationLabel;
  }

  let current: NavigationLabel = "Home";

  for (const link of headerData.links) {
    const sectionId = getSectionId(link.label);
    const section = sectionId ? document.getElementById(sectionId) : null;

    if (section && section.getBoundingClientRect().top <= marker) {
      current = link.label;
    }
  }

  return current;
}

export default function HeaderNavigation({
  activeItem,
}: HeaderNavigationProps) {
  const [scrollActiveItem, setScrollActiveItem] = useState<NavigationLabel>(
    activeItem ?? "Home",
  );
  const pendingSection = useRef<PendingSection | null>(null);

  useEffect(() => {
    if (activeItem) return;

    const updateActiveItem = () => {
      const pending = pendingSection.current;

      if (pending) {
        const target = document.getElementById(pending.id);

        if (target) {
          const rect = target.getBoundingClientRect();
          const marker = getActiveMarker();
          const inActivePosition = rect.top <= marker && rect.bottom > marker;
          const passedTarget =
            pending.direction > 0 ? rect.bottom <= marker : rect.top >= marker;
          const movedAgainstNavigation =
            pending.direction > 0
              ? window.scrollY < pending.startY - 4
              : window.scrollY > pending.startY + 4;

          if (
            !inActivePosition &&
            !passedTarget &&
            !movedAgainstNavigation
          ) {
            setScrollActiveItem((current) =>
              current === pending.label ? current : pending.label,
            );
            return;
          }
        }

        pendingSection.current = null;
      }

      const next = getVisibleSection();
      setScrollActiveItem((current) => (current === next ? current : next));
    };

    const initialUpdate = window.setTimeout(updateActiveItem, 0);
    window.addEventListener("scroll", updateActiveItem, { passive: true });
    window.addEventListener("hashchange", updateActiveItem);
    window.addEventListener("resize", updateActiveItem);

    return () => {
      window.clearTimeout(initialUpdate);
      window.removeEventListener("scroll", updateActiveItem);
      window.removeEventListener("hashchange", updateActiveItem);
      window.removeEventListener("resize", updateActiveItem);
    };
  }, [activeItem]);

  const activateOnClick = (label: NavigationLabel) => {
    if (label === "Home") {
      pendingSection.current = null;
      setScrollActiveItem("Home");
      window.scrollTo({
        top: 0,
        behavior: activeItem ? "instant" : "auto",
      });
      return;
    }

    if (activeItem) return;

    const id = getSectionId(label);
    const target = id ? document.getElementById(id) : null;

    if (target && id) {
      const direction: -1 | 1 =
        target.getBoundingClientRect().top > getActiveMarker() ? 1 : -1;
      pendingSection.current = {
        label,
        id,
        startY: window.scrollY,
        direction,
      };
    } else {
      pendingSection.current = null;
    }

    setScrollActiveItem(label);
  };

  return (
    <nav
      className="hidden items-center gap-8 text-[13px] text-text-muted min-[851px]:flex"
      aria-label={headerData.navigationLabel}
    >
      {headerData.links.map((link) => {
        const isCurrent = activeItem
          ? link.label === activeItem
          : link.label === scrollActiveItem;
        const href =
          activeItem && link.href.startsWith("#")
            ? `/${link.href}`
            : !activeItem && link.label === "Projects"
              ? "#projects"
              : link.href;
        const ariaCurrent = isCurrent
          ? activeItem || link.label === "Home"
            ? "page"
            : "location"
          : undefined;
        const className =
          "relative transition-colors duration-150 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest motion-reduce:transition-none " +
          (isCurrent
            ? "font-bold text-text after:absolute after:inset-x-0 after:-bottom-3 after:h-0.5 after:rounded-full after:bg-text after:content-['']"
            : "");
        const onClick = () => activateOnClick(link.label);

        return href.startsWith("/") ? (
          <Link
            key={link.label}
            href={href}
            aria-current={ariaCurrent}
            className={className}
            onClick={onClick}
          >
            {link.label}
          </Link>
        ) : (
          <a
            key={link.label}
            href={href}
            aria-current={ariaCurrent}
            className={className}
            onClick={onClick}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
