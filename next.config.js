/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/templates/:slug",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;