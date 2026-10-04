import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leo Odaya | Software Engineer",
  description:
    "Software Engineer and Full-Stack Developer building web, mobile, API, and geospatial applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}