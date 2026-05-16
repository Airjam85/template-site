import Link from "next/link";
import templates from "../../../content/templates.json";

export async function generateStaticParams() {
  return templates.map((t) => ({
    slug: t.slug,
  }));
}

export default async function TemplatePage({ params }) {
  const { slug } = await params;

  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return <div>Not found</div>;
  }

  // basic related templates
  const relatedTemplates = templates
    .filter((t) => t.slug !== slug)
    .slice(0, 5);

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {template.title}
      </h1>

      <p className="mb-6 text-gray-600">
        {template.description}
      </p>

      <textarea
        className="border w-full p-4 min-h-[300px]"
        defaultValue={template.body}
      />

      {/* Internal Linking Section */}
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