import legalTemplates from "../content/templates/legal-documents.json";
import businessDocuments from "../content/templates/business-documents.json";
import buisinessPlans from "../content/templates/business-plans.json";
import businessProposals from "../content/templates/business-proposals.json";
import contracts from "../content/templates/contracts.json";
import emailTemplates from "../content/templates/email-templates.json";
import employment from "../content/templates/employment.json";
import invoices from "../content/templates/invoices.json";
import legalDocuuments from "../content/templates/legal-documents.json";
import medicalLetters from "../content/templates/medical-letters.json";
import personalLetters from "../content/templates/personal-letters.json";
import resignationLetters from "../content/templates/resignation-letters.json";

export const templates = [
  ...legalTemplates,
  ...businessDocuments,
  ...buisinessPlans,
  ...businessProposals,
  ...contracts,
  ...emailTemplates,
  ...employment,
  ...invoices,
  ...legalDocuuments,
  ...medicalLetters,
  ...personalLetters,
  ...resignationLetters
];