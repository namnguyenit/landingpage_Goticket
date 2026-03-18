import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Analysis Overview",
  description: "Project Analysis Overview migrated from Vite to Next.js",
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
