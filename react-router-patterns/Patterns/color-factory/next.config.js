/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => [
    {
      source: '/',
      destination: '/colors',
      permanent: false,
    }
  ]
}

module.exports = nextConfig
