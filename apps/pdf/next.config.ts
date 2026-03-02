import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@toolbox/ui",
    "@toolbox/utils",
    "@toolbox/design-tokens",
  ],
};

export default nextConfig;
