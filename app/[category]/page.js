import templates from "../../content/templates.json";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const filtered = templates.filter(
    (t) => t.category?.slug === category
  );

  if (!filtered.length) {
    return (
      <main className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold">
          Category not found
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        {filtered[0].category.name}
      </h1>

      <div className="grid gap-4">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/${category}/${t.slug}`}
            className="border rounded p-4 block"
          >
            <h2 className="text-xl font-semibold">
              {t.title}
            </h2>

            <p>{t.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}