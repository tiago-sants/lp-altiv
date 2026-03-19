/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages: basePath only in production (so dev works on localhost:3000)
  // basePath: isProd ? "/lp-altiv" : "",
  // assetPrefix: isProd ? "/lp-altiv/" : "",
}

module.exports = nextConfig
