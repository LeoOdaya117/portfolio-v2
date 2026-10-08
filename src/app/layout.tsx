import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leo Odaya | Full Stack Developer",
  description:
    "Software Developer and Full-Stack Developer building web, mobile, API, and custom software systems.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-text antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
