import Link from "next/link";
import templates from "../../../content/templates.json";
import TemplateActions from "./TemplateActions";

const SITE_URL = "https://mangogranola.com";

export async function generateStaticParams() {
  return templates.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;

  const template = templates.find((t) => t.slug === slug);

  if (!template) return {};

  return {
    title: `${template.title} | Free Template`,
    description: template.description,

    alternates: {
      canonical: `${SITE_URL}/templates/${template.slug}`,
    },

    openGraph: {
      title: template.title,
      description: template.description,
      url: `${SITE_URL}/templates/${template.slug}`,
      siteName: "MangoGranola",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: template.title,
      description: template.description,
    },

    keywords: [
      template.title,
      `${template.title} free`,
      `${template.title} example`,
      `${template.title} sample`,
      "free templates",
      "professional templates",
    ],
  };
}

export default function TemplatePage({ params }) {
  const { slug } = params;

  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">
          Template Not Found
        </h1>

        <p className="text-gray-600">
          The requested template does not exist.
        </p>
      </main>
    );
  }

  const templateContent =
    template.template || template.body || "";

  // JSON-LD STRUCTURED DATA
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: template.title,
    description: template.description,
    url: `${SITE_URL}/templates/${template.slug}`,
    author: {
      "@type": "Organization",
      name: "MangoGranola",
    },
  };

  // SMART RELATED TEMPLATE ENGINE
  const relatedTemplates = templates
    .filter((t) => t.slug !== slug)
    .map((t) => {
      const currentWords = slug.split("-");
      const targetWords = t.slug.split("-");

      const score = currentWords.filter((word) =>
        targetWords.includes(word)
      ).length;

      return {
        ...t,
        score,
      };
    })
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <main className="max-w-4xl mx-auto p-8">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* HERO SECTION */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          {template.title}
        </h1>

        <p className="text-lg text-gray-600 mb-4">
          {template.description}
        </p>

        <p className="text-gray-700 leading-7">
          {template.intro}
        </p>
      </header>

      {/* WHEN TO USE */}
      {template.whenToUse && (
        <section className="mb-10 p-5 border rounded-lg bg-gray-50">
          <h2 className="text-2xl font-semibold mb-2">
            When to Use This Template
          </h2>

          <p className="text-gray-700 leading-7">
            {template.whenToUse}
          </p>
        </section>
      )}

      {/* HOW TO USE */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          How to Use This Template
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-7">
          <li>
            Replace all placeholder text with your information.
          </li>

          <li>
            Customize wording to fit your situation.
          </li>

          <li>
            Review formatting and spelling before sending.
          </li>

          <li>
            Keep the tone professional and concise.
          </li>
        </ul>
      </section>

      {/* TEMPLATE BLOCK */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Copy This Template
        </h2>

        <p className="text-sm text-gray-500 mb-3">
          Edit directly below or copy into your own document.
        </p>

        <textarea
          className="border w-full p-5 min-h-[400px] rounded-lg font-mono text-sm"
          defaultValue={templateContent}
        />
      </section>

      {/* ACTION BUTTONS */}
      <TemplateActions templateContent={templateContent} />

      {/* EXAMPLE */}
      {template.example && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">
            Example
          </h2>

          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm leading-7">
            {template.example}
          </pre>
        </section>
      )}

      {/* FAQ SECTION */}
      {template.faqs && template.faqs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {template.faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2 text-lg">
                  {faq.question}
                </h3>

                <p className="text-gray-700 leading-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TIPS SECTION */}
      {template.tips && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Tips for Using This Template
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {template.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      {/* RELATED TEMPLATES */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Related Templates
        </h2>

        <div className="grid gap-3">
          {relatedTemplates.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="text-blue-600 hover:underline"
            >
              {t.title}
            </Link>
          ))}
        </div>
      </section>

      {/* SEO FOOTER */}
      <footer className="border-t pt-6 text-sm text-gray-500 leading-7">
        Download free professional templates for contracts,
        invoices, resignation letters, NDAs, business documents,
        employment forms, and more.
      </footer>

    </main>
  );
}