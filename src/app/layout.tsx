import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Rakha Bima | AI Software Engineer",
  description:
    "Portfolio of Rakha Bima Arya Sambarana, a full-stack developer building web apps, internal tools, data dashboards, and AI automation workflows.",
  icons: {
    icon: "/assets/favicon/favicon-rb.png",
  },
  openGraph: {
    title: "Rakha Bima | AI Software Engineer",
    description:
      "Digital systems, internal tools, dashboards, and automation workflows built from Jakarta.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScroll />
        {children}
        <ScrollProgress />
      </body>
    </html>
  );
}
