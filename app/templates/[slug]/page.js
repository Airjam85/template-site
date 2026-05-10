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
    </main>
  );
}