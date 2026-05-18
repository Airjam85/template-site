import templates from "../../../../content/templates.json";
import Link from "next/link";

export async function generateStaticParams() {
  const categories = [...new Set(templates.map(t => t.category).filter(Boolean))];

  return categories.map(category => ({
    category,
  }));
}

export default function CategoryPage({ params }) {
  const { category } = params;

  const filtered = templates.filter(t => t.category === category);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 capitalize">
        {category} Templates
      </h1>

      <div className="grid gap-3">
        {filtered.map(t => (
          <Link
            key={t.slug}
            href={`/templates/${t.slug}`}
            className="text-blue-600 hover:underline"
          >
            {t.title}
          </Link>
        ))}
      </div>
    </main>
  );
}