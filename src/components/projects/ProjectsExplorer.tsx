"use client";

import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsExplorer.module.css";

type ProjectsExplorerProps = Readonly<{
  projects: readonly Project[];
}>;

const BATCH_SIZE = 3;
const platformFilters = ["All", "Web", "Mobile", "Desktop"] as const;
type PlatformFilter = (typeof platformFilters)[number];

function getPlatformCount(
  projects: readonly Project[],
  filter: PlatformFilter,
): number {
  if (filter === "All") return projects.length;
  return projects.filter((project) =>
    project.platforms.includes(filter),
  ).length;
}

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<PlatformFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesPlatform =
        activeFilter === "All" || project.platforms.includes(activeFilter);
      const searchableContent = [
        project.title,
        project.summary,
        ...project.platforms,
        ...project.categories,
        ...(project.techStack ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesPlatform && (!query || searchableContent.includes(query));
    });
  }, [activeFilter, projects, searchQuery]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleProjects.length < filteredProjects.length;

  const loadMore = useCallback(() => {
    setVisibleCount((count) =>
      Math.min(count + BATCH_SIZE, filteredProjects.length),
    );
  }, [filteredProjects.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: "280px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  function selectFilter(filter: PlatformFilter) {
    setActiveFilter(filter);
    setVisibleCount(BATCH_SIZE);
  }

  function updateSearch(value: string) {
    setSearchQuery(value);
    setVisibleCount(BATCH_SIZE);
  }

  function clearFilters() {
    setActiveFilter("All");
    updateSearch("");
  }

  return (
    <section aria-label="All projects">
      <div className={styles.toolbar}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filter projects by platform"
        >
          {platformFilters.map((filter) => {
            const count = getPlatformCount(projects, filter);
            const label = filter === "All" ? "All projects" : `${filter} projects`;

            return (
              <button
                className={styles.filterButton}
                key={filter}
                type="button"
                aria-label={`${label} (${count})`}
                aria-pressed={activeFilter === filter}
                onClick={() => selectFilter(filter)}
              >
                <span>{filter}</span>
                <span className={styles.filterCount} aria-hidden="true">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.searchField}>
          <Search size={18} strokeWidth={1.8} aria-hidden="true" />
          <label className={styles.visuallyHidden} htmlFor="project-search">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={searchQuery}
            placeholder="Search projects"
            onChange={(event) => updateSearch(event.currentTarget.value)}
          />
          {searchQuery ? (
            <button
              className={styles.clearSearch}
              type="button"
              aria-label="Clear project search"
              onClick={() => updateSearch("")}
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      <p className={styles.resultCount} role="status" aria-live="polite">
        {filteredProjects.length === 0 ? (
          "No projects found"
        ) : (
          <>
            Showing <strong>{visibleProjects.length}</strong> of{" "}
            <strong>{filteredProjects.length}</strong> projects
          </>
        )}
      </p>

      {filteredProjects.length > 0 ? (
        <div className={styles.grid}>
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No matching projects</h2>
          <p>Try another search or clear the platform filter.</p>
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}

      {hasMore ? (
        <div className={styles.loadMore}>
          <button type="button" onClick={loadMore}>
            Load more projects
          </button>
        </div>
      ) : null}
      <div className={styles.sentinel} ref={sentinelRef} aria-hidden="true" />
    </section>
  );
}
