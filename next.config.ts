import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/destinations",
        destination: "/tour",
        permanent: true,
      },
      {
        source: "/golden-era",
        destination: "/the-concept",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
