import Link from "next/link";
import templates from "../../../content/templates.json";

export async function generateStaticParams() {
  return templates.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const template = templates.find((t) => t.slug === slug);

  if (!template) return {};

  return {
    title: `${template.title} | Free Template`,
    description: template.description,
  };
}

export default async function TemplatePage({ params }) {
  const { slug } = await params;

  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return <div>Not found</div>;
  }

  const relatedTemplates = templates
    .filter((t) => t.slug !== slug)
    .filter((t) => {
      const base = slug.split("-")[0];
      return t.slug.includes(base);
    })
  .slice(0, 6);

  return (
    <main className="max-w-4xl mx-auto p-8">

      {/* HERO SECTION (SEO + CTR BOOST) */}
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

      {/* INTENT SECTION */}
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

      {/* MAIN TOOL / TEMPLATE BLOCK */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          Copy This Template
        </h2>

        <p className="text-sm text-gray-500 mb-3">
          Edit directly below or copy into your document.
        </p>

        <textarea
          className="border w-full p-5 min-h-[400px] rounded-lg font-mono text-sm"
          defaultValue={template.template || template.body}
        />
      </section>

      {/* ACTION SECTION (THIS IS WHERE MONEY EVENTUALLY COMES FROM) */}
      <section className="mb-12 flex gap-3 flex-wrap">
        <button className="bg-black text-white px-4 py-2 rounded">
          Copy Template
        </button>

        <button className="border px-4 py-2 rounded">
          Download PDF (future monetization slot)
        </button>

        <button className="border px-4 py-2 rounded">
          Share
        </button>
      </section>

      {/* EXAMPLE (HIGH SEO VALUE) */}
      {template.example && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">
            Example
          </h2>

          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {template.example}
          </pre>
        </section>
      )}

      {/* INTERNAL LINKING (CLUSTER ENGINE) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Related Templates
        </h2>

        <div className="grid gap-2">
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

      {/* SEO FOOTER BLOCK (IMPORTANT FOR LONGTAIL RANKING) */}
      <footer className="border-t pt-6 text-sm text-gray-500">
        Download free professional templates for contracts,
        invoices, resignation letters, and business documents.
      </footer>

    </main>
  );
}