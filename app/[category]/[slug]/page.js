import templates from "../../../content/templates.json";

export default async function TemplatePage({ params }) {
  const { category, slug } = await params;

  const template = templates.find(
    (t) =>
      t.category?.slug === category &&
      t.slug === slug
  );

  if (!template) {
    return (
      <main className="max-w-3xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-4">
          Template not found
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {template.title}
      </h1>

      <p className="text-gray-600 mb-6">
        {template.description}
      </p>

      <pre className="whitespace-pre-wrap border rounded p-4 bg-gray-50">
        {template.template}
      </pre>
    </main>
  );
}