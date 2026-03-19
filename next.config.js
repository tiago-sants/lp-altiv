/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to username.github.io/repo-name, uncomment and set:
  basePath: "/lp-altiv",
  assetPrefix: "/lp-altiv/",
}

module.exports = nextConfig
