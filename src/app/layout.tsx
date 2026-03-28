import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "./[locale]/google-analytics";
import { GoogleAdSense } from "./[locale]/google-adsense";

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
        <GoogleAnalytics />
        <GoogleAdSense />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.setAttribute("data-theme","dark")}catch(e){}`,
          }}
        />
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
