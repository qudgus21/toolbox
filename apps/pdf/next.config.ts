import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/pdf",
  transpilePackages: [
    "@toolbox/i18n",
    "@toolbox/ui",
    "@toolbox/utils",
    "@toolbox/design-tokens",
  ],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pdf",
        basePath: false as never,
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
