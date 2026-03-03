import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer } from "@toolbox/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground antialiased font-sans">
        <Header
          logo={
            <a href="/" className="text-lg font-bold text-foreground">
              <span className="text-accent">Video</span> ToolBox
            </a>
          }
        />
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
