import { templates } from "../lib/loadTemplates";

export default function sitemap() {
  const baseUrl = "https://mangogranola.com";

  const templateUrls = templates.map((t) => ({
    url: `${baseUrl}/${t.category.slug}/${t.slug}`,
    lastModified: new Date(),
  }));

  const categoryUrls = [
    ...new Map(
      templates.map((t) => [
        t.category.slug,
        {
          url: `${baseUrl}/${t.category.slug}`,
          lastModified: new Date(),
        },
      ])
    ).values(),
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...categoryUrls,
    ...templateUrls,
  ];
}