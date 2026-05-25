export function generateWebPageSchema(template) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: template.title,
    description: template.description,
    url: `https://mangogranola.com/${template.category.slug}/${template.slug}`,
  };
}