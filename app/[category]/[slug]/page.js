import templates from "../../../content/templates.json";

export default function TemplatePage({ params }) {
  const { category, slug } = params;

  const template = templates.find(
    (t) =>
      t.category?.slug === category &&
      t.slug === slug
  );

  if (!template) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Template not found
        </h1>

        <p>Category: {category}</p>
        <p>Slug: {slug}</p>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {template.title}
      </h1>

      <p className="mb-6 text-gray-600">
        {template.description}
      </p>

      <pre className="whitespace-pre-wrap border p-4 rounded bg-gray-50">
        {template.template}
      </pre>

      {template.example && (
        <>
          <h2 className="text-xl font-semibold mt-6">
            Example
          </h2>
          <pre className="whitespace-pre-wrap border p-4 rounded mt-2">
            {template.example}
          </pre>
        </>
      )}
    </main>
  );
}