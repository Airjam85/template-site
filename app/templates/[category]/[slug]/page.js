import Link from "next/link";
import templates from "../../../../content/templates.json";
import TemplateActions from "../../../components/TemplateActions";

export const dynamicParams = false;

const SITE_URL = "https://mangogranola.com";

function normalizeSlug(slug) {
  return String(slug || "").trim().toLowerCase();
}

export async function generateStaticParams() {
  return templates
    .filter((t) => t.category?.slug && t.slug)
    .map((t) => ({
      category: normalizeSlug(t.category?.slug),
      slug: normalizeSlug(t.slug),
    }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = params;

  const normalizedCategory = normalizeSlug(category);
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedCategory || !normalizedSlug) {
    return {
      title: "Template Not Found",
    };
  }

  const template = templates.find(
    (t) =>
      normalizeSlug(t.category?.slug) === normalizedCategory &&
      normalizeSlug(t.slug) === normalizedSlug
  );

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  return {
    title: `${template.title} | MangoGranola`,
    description: template.description,
    alternates: {
      canonical: `${SITE_URL}/templates/${template.category.slug}/${template.slug}`,
    },
  };
}

export default function TemplatePage({ params }) {
  const normalizedCategory = normalizeSlug(params?.category);
  const normalizedSlug = normalizeSlug(params?.slug);

  const template = templates.find(
    (t) =>
      normalizeSlug(t.category?.slug) === normalizedCategory &&
      normalizeSlug(t.slug) === normalizedSlug
  );

  if (!template) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>

        <p className="text-gray-600 mb-4">
          No template matches category "{normalizedCategory}" and slug "{normalizedSlug}".
        </p>

        <Link href="/" className="text-blue-600 underline">
          Go back home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        {template.title}
      </h1>

      <p className="mb-6">
        {template.description}
      </p>

      <textarea
        className="border w-full p-4 rounded min-h-[400px]"
        defaultValue={template.template}
      />

      <TemplateActions
        templateContent={template.template}
      />
    </main>
  );
}