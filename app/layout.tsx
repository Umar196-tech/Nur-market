import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nūr Market",
  description: "A bilingual marketplace for books and digital learning resources.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
