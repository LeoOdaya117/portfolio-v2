import type { ExperienceSectionData } from "@/types/experience";

export const experienceData = {
  eyebrow: "Career & Education",
  title: "Experience & Education",
  description:
    "Professional experience across web, mobile, GIS, and APIs, alongside a Computer Science degree from CITI Global College.",
  statistics: [
    { value: "1+", label: "Years of Industry Experience" },
    { value: "2", label: "Documented Roles" },
  ],
  resumeHref: "/files/resume/Leo_Odaya_Resume_2026.pdf",
  resumeLabel: "View Resume",
  entriesLabel: "Employment and education history",
  entries: [
    {
      kind: "employment",
      employer: "Filweb Asia Inc.",
      role: "Web Developer",
      employmentType: "Full-Time",
      startDate: "2025-03",
      startLabel: "March 2025",
      endLabel: "Present",
      responsibilities: [
        "Develop and maintain production web and mobile applications across multiple concurrent projects.",
        "Build REST APIs, GIS features, dashboards, and data visualizations while improving large-dataset handling.",
        "Support feature delivery, production fixes, CI validation, and deployment workflows.",
      ],
    },
    {
      kind: "education",
      institution: "CITI Global College",
      degree: "Bachelor of Science in Computer Science",
      location: "Cabuyao, Laguna",
      date: "2024-07",
      dateLabel: "July 2024",
      relevantCoursework: [
        "Software Engineering",
        "Algorithms",
        "Data Structures",
        "Web Development",
        "Android Development",
      ],
    },
    {
      kind: "employment",
      employer: "Shin-Etsu Magnetics Philippines Inc.",
      role: "MIS Intern",
      employmentType: "Internship",
      startDate: "2023-09",
      startLabel: "September 2023",
      endDate: "2023-11",
      endLabel: "November 2023",
      responsibilities: [
        "Enhanced an internal MIS web portal with practical PHP features and workflow improvements.",
        "Provided technical support for computers, printers, networking, and internal systems.",
      ],
    },
  ],
} satisfies ExperienceSectionData;
