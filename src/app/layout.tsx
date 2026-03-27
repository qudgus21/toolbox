import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const lang = h.get("x-locale") || "en";
  const dir = h.get("x-dir") || "ltr";

  return (
    <html lang={lang} dir={dir} className={inter.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ToolPop",
              url: "https://toolpop.org",
              logo: "https://toolpop.org/icon-512.png",
              description: "Free online PDF, image, and text tools",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                url: "https://toolpop.org/en/contact",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
