/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "b2b.allegro-opt.com.ua",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.elektromassive.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "elektromassivebucket.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
