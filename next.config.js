/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
      },
    ],
  },
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STORE_FRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SENDGRID_KEY: process.env.SENDGRID_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    NEXT_PUBLIC_ADMIN: process.env.NEXT_PUBLIC_ADMIN,
    NEXT_PUBLIC_MAP_KEY: process.env.NEXT_PUBLIC_MAP_KEY,
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  },
  output: "export",
  distDir: "dist",
  trailingSlash: true,
 };

module.exports = nextConfig;
