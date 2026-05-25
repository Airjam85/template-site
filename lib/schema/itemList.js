import { SITE_URL } from "../constants";

export function generateItemListSchema(
  templates,
  category
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",

    itemListElement: templates.map(
      (template, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/${template.category.slug}/${template.slug}`,
        name: template.title,
      })
    ),
  };
}