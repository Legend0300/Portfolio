/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // static site, served by Cloudflare Workers static assets from ./out
  images: { unoptimized: true },
  trailingSlash: false,
};

module.exports = nextConfig;
