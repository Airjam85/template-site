import templates from "../content/templates.json";

export default function sitemap() {
  const baseUrl = "https://template-site-pink.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...templates.map((t) => ({
      url: `${baseUrl}/templates/${t.slug}`,
      lastModified: new Date(),
    })),
  ];
}