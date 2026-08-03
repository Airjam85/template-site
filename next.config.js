/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const { templates } = await import("./lib/loadTemplates.js");

    return [
      ...templates.map((template) => ({
        source: `/templates/${template.slug}`,
        destination: `/${template.category.slug}/${template.slug}`,
        permanent: true,
      })),
      {
        source: "/templates/:slug",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;