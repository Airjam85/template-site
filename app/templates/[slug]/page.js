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

  if (!template) {
    return {};
  }

  return {
    title: template.title,
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
    .slice(0, 5);

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {template.title}
      </h1>

      <p className="mb-6 text-gray-600 text-lg">
        {template.description}
      </p>

      {/* Helpful intro text */}
      <section className="mb-8">
        <p className="leading-7 text-gray-700">
          Use this free template as a starting point and
          customize it for your own needs. You can copy,
          edit, and print this document for personal or
          professional use.
        </p>
      </section>

      {/* Main template */}
      <textarea
        className="border w-full p-4 min-h-[350px] rounded-lg"
        defaultValue={template.body}
      />

      {/* Usage section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">
          How to Use This Template
        </h2>

        <p className="leading-7 text-gray-700">
          Replace placeholder text with your own
          information before downloading, printing,
          or sending this document.
        </p>
      </section>

      {/* Related links */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Related Templates
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          {relatedTemplates.map((related) => (
            <li key={related.slug}>
              <Link
                href={`/templates/${related.slug}`}
                className="text-blue-600 hover:underline"
              >
                {related.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}