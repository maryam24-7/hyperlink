/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports for Vercel
  output: 'standalone',
}

module.exports = nextConfig
