import templates from "../content/templates.json";

export default function sitemap() {
  const baseUrl = "https://YOUR-VERCEL-URL.vercel.app";

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