import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        pathname: "/v1/storage/buckets/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/v1/storage/:slug*",
        destination: "/buckets/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
