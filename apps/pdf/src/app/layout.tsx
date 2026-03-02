import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolBox PDF - Free PDF Tools",
  description: "Merge, split, compress, and convert PDF files online for free.",
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
