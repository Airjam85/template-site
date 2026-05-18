import Link from "next/link";
import templates from "../../../../content/templates.json";
import TemplateActions from "../../../components/TemplateActions";
import { normalizeSlug } from "../../../../lib/slugs";

const SITE_URL = "https://mangogranola.com";

export async function generateStaticParams() {
  return templates
    .filter((t) => t?.slug && t?.category?.slug)
    .map((t) => ({
      category: t.category.slug,
      slug: t.slug,
    }));
}

export async function generateMetadata({ params }) {
  const category = normalizeSlug(params.category);
  const slug = normalizeSlug(params.slug);

  const template = templates.find(
    (t) =>
      normalizeSlug(t.slug) === slug &&
      normalizeSlug(t.category?.slug) === category
  );

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  const url = `${SITE_URL}/templates/${template.category.slug}/${template.slug}`;

  return {
    title: `${template.title} | Free Template`,
    description: template.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: template.title,
      description: template.description,
      url,
      siteName: "MangoGranola",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: template.title,
      description: template.description,
    },
  };
}

export default function TemplatePage({ params }) {
  const category = normalizeSlug(params.category);
  const slug = normalizeSlug(params.slug);

  const template = templates.find(
    (t) =>
      normalizeSlug(t.slug) === slug &&
      normalizeSlug(t.category?.slug) === category
  );

  if (!template) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>

        <p className="text-gray-600 mb-4">
          No template matches category "{category}" and slug "{slug}".
        </p>

        <Link href="/" className="text-blue-600 underline">
          Go back home
        </Link>
      </main>
    );
  }

  const templateContent = template.template || "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: template.title,
    description: template.description,
    url: `${SITE_URL}/templates/${template.category.slug}/${template.slug}`,
    author: {
      "@type": "Organization",
      name: "MangoGranola",
    },
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">{template.title}</h1>

        <p className="text-lg text-gray-600 mb-4">{template.description}</p>

        <p className="text-gray-700 leading-7">{template.intro}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Copy This Template</h2>

        <textarea
          className="border w-full p-5 min-h-[400px] rounded-lg font-mono text-sm"
          defaultValue={templateContent}
        />
      </section>

      <TemplateActions templateContent={templateContent} />
    </main>
  );
}
