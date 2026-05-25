export function getRelatedTemplates(currentTemplate, allTemplates, limit = 5) {
  if (!currentTemplate) return [];

  const currentTags = currentTemplate.tags || [];

  return allTemplates
    .filter((template) => template.slug !== currentTemplate.slug)
    .map((template) => {
      const sameCategory =
        template.category?.slug === currentTemplate.category?.slug;

      const sharedTags = (template.tags || []).filter((tag) =>
        currentTags.includes(tag)
      ).length;

      return {
        ...template,
        score: (sameCategory ? 5 : 0) + sharedTags,
      };
    })
    .filter((template) => template.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}