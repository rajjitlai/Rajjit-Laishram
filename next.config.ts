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
  transpilePackages: ['@splinetool/runtime'],
  webpack: (config) => {
    config.resolve.alias['@splinetool/react-spline'] = 'D:/2025/code/rajjit-laishram/node_modules/@splinetool/react-spline/dist/react-spline.js';
    return config;
  },
};

export default nextConfig;
