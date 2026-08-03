const DEFAULT_TEMPLATE_FORMATS = ["TXT", "DOCX", "PDF"];
const EXTRA_TEMPLATE_FORMATS = {
  "expense-tracking-sheet-template": ["XLSX"],
};

export function getTemplateFormatLabels(templateSlug = "") {
  const extraFormats = EXTRA_TEMPLATE_FORMATS[templateSlug] ?? [];

  return [...DEFAULT_TEMPLATE_FORMATS, ...extraFormats];
}

export function getTemplateFormatSnippet(templateSlug = "") {
  const formatLabels = getTemplateFormatLabels(templateSlug).map((label) => {
    if (label === "DOCX") {
      return "DOCX (Word)";
    }

    return label;
  });

  if (formatLabels.length === 1) {
    return formatLabels[0];
  }

  if (formatLabels.length === 2) {
    return `${formatLabels[0]} and ${formatLabels[1]}`;
  }

  return `${formatLabels.slice(0, -1).join(", ")}, and ${formatLabels.at(-1)}`;
}