import { SITE_URL } from "../constants";

export function generateBreadcrumbSchema(template) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: template.category.name,
        item: `${SITE_URL}/${template.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: template.title,
        item: `${SITE_URL}/${template.category.slug}/${template.slug}`,
      },
    ],
  };
}