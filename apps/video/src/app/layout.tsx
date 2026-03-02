import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolBox Video - Free Video Tools",
  description: "Convert, compress, trim, and edit videos online for free.",
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
