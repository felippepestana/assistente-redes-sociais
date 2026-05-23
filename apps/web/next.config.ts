import type { NextConfig } from "next";
import path from "node:path";
import { ADMIN_ROUTE_HEADERS, NO_STORE_HEADERS, SECURITY_HEADERS } from "./lib/security-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@assistente-redes-sociais/shared"],
  turbopack: {
    root: path.resolve(process.cwd(), "../..")
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS
      },
      {
        source: "/api/:path*",
        headers: NO_STORE_HEADERS
      },
      {
        source: "/admin/:path*",
        headers: ADMIN_ROUTE_HEADERS
      }
    ];
  }
};

export default nextConfig;
