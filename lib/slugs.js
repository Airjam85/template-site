export function slugify(value) {
  if (!value) return "";

  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\- ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function normalizeSlug(slug) {
  if (!slug) return "";
  return decodeURIComponent(slug)
    .trim()
    .toLowerCase();
}

export function isValidSlug(slug) {
  return typeof slug === "string" && slug.length > 0;
}