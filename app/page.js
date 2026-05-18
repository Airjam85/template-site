import Link from "next/link";
import templates from "../content/templates.json";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-8">
        Free Document Templates
      </h1>

      <div className="grid gap-4">
        {templates.map((t) => (
          <div key={t.slug} className="border p-4 rounded">
            <Link
              href={`/templates/${t.category?.slug}/${t.slug}`}
              className="block"
            >
              <h2 className="text-xl font-semibold">
                {t.title}
              </h2>
              <p>{t.description}</p>
            </Link>
            {t.category?.slug && (
              <p className="text-sm text-gray-500 mt-2">
                <Link
                  href={`/categories/${t.category.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {t.category.name}
                </Link>
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}