/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => [
    {
      source: "/",
      destination: "/Dogs",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
