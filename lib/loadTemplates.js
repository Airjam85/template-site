import legalDocuments from "../content/templates/legal-documents.json";
import legalTemplates from "../content/templates/legal-templates.json";
import businessDocuments from "../content/templates/business-documents.json";
import businessPlans from "../content/templates/business-plans.json";
import businessProposals from "../content/templates/business-proposals.json";
import contracts from "../content/templates/contracts.json";
import coverLetters from "../content/templates/cover-letters.json";
import emailTemplates from "../content/templates/email-templates.json";
import employment from "../content/templates/employment.json";
import invoices from "../content/templates/invoices.json";
import medicalLetters from "../content/templates/medical-letters.json";
import personalLetters from "../content/templates/personal-letters.json";
import resignationLetters from "../content/templates/resignation-letters.json";

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