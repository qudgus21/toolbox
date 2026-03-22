import type { Metadata } from "next";
import { Header, Footer } from "@/lib/ui";

export const metadata: Metadata = {
  title: "ToolBox Video - Free Video Tools",
  description: "Convert, compress, trim, and edit videos online for free.",
};

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        logo={
          <a href="/video" className="text-lg font-bold text-foreground">
            <span className="text-accent">Video</span> ToolBox
          </a>
        }
      />
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
