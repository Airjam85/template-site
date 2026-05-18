import templates from "../content/templates.json";

export default function sitemap() {
  const baseUrl = "https://template-site-pink.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...templates
      .filter((t) => typeof t === "object" && "slug" in t)
      .map((t) => ({
        url: `${baseUrl}/templates/${(t as any).slug}`,
        lastModified: new Date(),
      })),
  ];
}