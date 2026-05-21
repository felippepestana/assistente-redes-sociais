import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@assistente-redes-sociais/shared"],
  turbopack: {
    root: path.resolve(process.cwd(), "../..")
  },
  poweredByHeader: false
};

export default nextConfig;
