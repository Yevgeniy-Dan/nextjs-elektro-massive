/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*",
      },
    ];
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
      {
        protocol: "https",
        hostname: "elektromassivebucketproduction.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "elektromassivebucketproduction.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "decyx998ihuuw.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "postimg.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "feron.ua",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
