import { SITE_URL } from "./constants";

export function generateCanonical(path) {
  return `${SITE_URL}${path}`;
}