import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolBox - Free Online Tools",
  description: "Free online tools for PDF, Video, Image and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
