export type EmploymentType = "Full-Time" | "Internship";

export type EmploymentEntry = {
  kind: "employment";
  employer: string;
  role: string;
  employmentType: EmploymentType;
  startDate: string;
  startLabel: string;
  endDate?: string;
  endLabel: string;
  responsibilities: string[];
};

export type EducationEntry = {
  kind: "education";
  institution: string;
  degree: string;
  location: string;
  date: string;
  dateLabel: string;
  relevantCoursework: readonly string[];
};

export type ExperienceEntry = EmploymentEntry | EducationEntry;

export type ExperienceSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  statistics: Array<{
    value: string;
    label: string;
  }>;
  resumeHref: string;
  resumeLabel: string;
  entriesLabel: string;
  entries: readonly ExperienceEntry[];
};
