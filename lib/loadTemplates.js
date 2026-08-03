import legalDocuments from "../content/templates/legal-documents.json" with {
  type: "json",
};
import legalTemplates from "../content/templates/legal-templates.json" with {
  type: "json",
};
import businessDocuments from "../content/templates/business-documents.json" with {
  type: "json",
};
import businessPlans from "../content/templates/business-plans.json" with {
  type: "json",
};
import businessProposals from "../content/templates/business-proposals.json" with {
  type: "json",
};
import contracts from "../content/templates/contracts.json" with {
  type: "json",
};
import coverLetters from "../content/templates/cover-letters.json" with {
  type: "json",
};
import emailTemplates from "../content/templates/email-templates.json" with {
  type: "json",
};
import employment from "../content/templates/employment.json" with {
  type: "json",
};
import invoices from "../content/templates/invoices.json" with {
  type: "json",
};
import medicalLetters from "../content/templates/medical-letters.json" with {
  type: "json",
};
import personalLetters from "../content/templates/personal-letters.json" with {
  type: "json",
};
import resignationLetters from "../content/templates/resignation-letters.json" with {
  type: "json",
};

export const templates = [
  ...legalDocuments,
  ...legalTemplates,
  ...businessDocuments,
  ...businessPlans,
  ...businessProposals,
  ...contracts,
  ...coverLetters,
  ...emailTemplates,
  ...employment,
  ...invoices,
  ...medicalLetters,
  ...personalLetters,
  ...resignationLetters,
];

export function getAllTemplates() {
  return templates;
}

export function getTemplatesByCategory(category) {
  return templates.filter(
    (template) => template.category?.slug === category
  );
}

export function getTemplate(category, slug) {
  return templates.find(
    (template) =>
      template.category?.slug === category &&
      template.slug === slug
  );
}

export function getCategorySlugs() {
  return [
    ...new Set(
      templates.map((template) => template.category?.slug)
    ),
  ];
}