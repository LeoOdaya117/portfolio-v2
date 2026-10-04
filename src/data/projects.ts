import type { Project } from "@/types/project";

export const projects = [
  {
    slug: "fieldops",
    title: "FieldOps",
    summary:
      "Offline-first workforce platform with mobile app, web admin, mapping, synchronization, and reporting.",
    categories: ["Web", "Mobile", "GIS"],
    featured: true,
    visualTheme: "field",
    status: "in-progress",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/LeoOdaya117/fieldOps",
      },
    ],
    coverImage: {
      src: "/images/projects/fieldops-mockup.png",
      alt: "Illustrative FieldOps product mockup on a laptop, tablet, and phone.",
      caption: "Illustrative UI mockup",
    },
    techStack: [
      "Laravel 13",
      "PHP 8.4",
      "React 19",
      "TypeScript",
      "Inertia.js",
      "Vite 8",
      "Tailwind CSS 4",
      "MySQL 8.4",
      "Docker Compose",
      "Apache",
      "Mailpit",
    ],
    problem:
      "Field operations involve coordinating teams and operational work across tasks, assignments, and tracking workflows.",
    solution:
      "A Laravel and React application foundation designed to grow into workflows for field tasks, assignments, users, and operational tracking, with a Docker-based local development environment.",
    contribution: [
      "Built the initial Laravel and React application foundation with Inertia.js.",
      "Set up Docker Compose services for the application, database, and local email testing.",
      "Configured PHP and frontend testing and code-quality tools.",
    ],
  },
  {
    slug: "watershed-management-field-monitoring-platform",
    title: "Watershed Management & Field Monitoring Platform",
    summary:
      "Production web and mobile modules for watershed and field monitoring, including GIS maps, patrol-route visualization, dashboards, reporting, and field-data workflows.",
    categories: ["Web", "Mobile", "GIS"],
    featured: true,
    visualTheme: "watershed",
    coverImage: {
      src: "/images/projects/watershed-cover.png",
      alt: "Illustrative cover art of a river winding through forested hills.",
    },
    techStack: [
      "Yii2",
      "React",
      "Ionic React",
      "TypeScript",
      "Node.js",
      "REST API",
      "MySQL",
      "Mapbox GL",
      "OpenStreetMap",
      "OpenLayers",
      "GeoJSON",
      "ApexCharts",
    ],
    solution:
      "The platform brings GIS maps, patrol-route visualization, dashboards, reporting, and field-data workflows into its production web and mobile modules.",
    contribution: [
      "Built REST APIs and mobile synchronization flows.",
      "Improved geospatial and map-layer handling and large-dataset performance.",
      "Supported reliable delivery through testing and CI/CD.",
    ],
  },
  {
    slug: "t-shop",
    title: "T-Shop",
    summary:
      "Full-stack e-commerce platform for product, checkout, order, inventory, and administrative workflows.",
    categories: ["Web", "E-commerce", "API"],
    featured: false,
    visualTheme: "commerce",
    links: [
      { label: "Live", href: "https://leoodaya.online/T-Shop/public/" },
      {
        label: "GitHub",
        href: "https://github.com/LeoOdaya117/T-shop-Ecommerce",
      },
    ],
    coverImage: {
      src: "/images/projects/t-shop-cover.png",
      alt: "Illustrative still life of unbranded parcels and folded fabric.",
    },
    techStack: [
      "Laravel 10",
      "MySQL",
      "Stripe",
      "Pusher",
      "JavaScript",
      "RESTful Workflows",
    ],
    solution:
      "The platform supports product variants, cart and checkout, customer orders, reviews, inventory workflows, and administrative operations.",
    contribution: [
      "Designed and developed the full-stack e-commerce platform.",
      "Integrated Stripe payments and Pusher real-time order updates.",
      "Implemented authentication, validation, database migrations, and order-processing workflows.",
    ],
  },
  {
    slug: "gym-management-mobile-fitness-recommendation-system",
    title: "Gym Management & Mobile Fitness Recommendation System",
    summary:
      "Integrated web and native Android system for gym bookings, member management, administration, and fitness workflows.",
    categories: ["Web", "Mobile", "Android"],
    featured: true,
    visualTheme: "fitness",
    links: [
      {
        label: "Live",
        href: "https://leoodaya.online/Gym_Management/landing-page.php",
      },
      {
        label: "Web repo",
        href: "https://github.com/LeoOdaya117/Gym_Management_System",
      },
      {
        label: "Android app repo",
        href: "https://github.com/LeoOdaya117/FitnessAPP",
      },
    ],
    coverImage: {
      src: "/images/projects/gym-cover.png",
      alt: "Illustrative cover art featuring a kettlebell in a muted studio.",
    },
    techStack: [
      "PHP",
      "Java",
      "Native Android",
      "REST API",
      "MySQL",
      "Data-Driven Recommendations",
    ],
    solution:
      "REST APIs connect the Java Android app to the PHP/MySQL backend, with fitness recommendations based on stored member data and user inputs.",
    contribution: [
      "Built the integrated web and native Android system.",
      "Developed REST APIs for the Android app and implemented personalized fitness recommendations.",
    ],
  },
  {
    slug: "road-trip",
    title: "Road Trip",
    summary:
      "Mobile road-trip tracker that records GPS routes, calculates ride statistics, and displays trip history on interactive maps.",
    categories: ["Mobile", "GPS", "Maps"],
    featured: true,
    visualTheme: "travel",
    links: [
      { label: "GitHub", href: "https://github.com/LeoOdaya117/roadTrip" },
    ],
    coverImage: {
      src: "/images/projects/road-trip-cover.png",
      alt: "Illustrative cover art of a winding road through forested mountains.",
    },
    techStack: [
      "Ionic React",
      "Capacitor",
      "GPS Tracking",
      "Interactive Maps",
      "Local Ride History",
      "Image Generation",
    ],
    solution:
      "Ride-history and shareable-image features combine a saved map track with a statistics overlay to create a visual trip summary.",
    contribution: [
      "Developed GPS recording, saved routes, ride statistics, and interactive trip history.",
      "Built ride-history and shareable-image generation features.",
    ],
  },
] satisfies Project[];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
