import Link from "next/link";
import templates from "../../../content/templates.json";
import { notFound } from "next/navigation";
import { normalizeSlug } from "../../../lib/slugs";

const SITE_URL = "https://mangogranola.com";

export async function generateStaticParams() {
  const categories = [
    ...new Set(
      templates
        .map((t) => t.category?.slug)
        .filter(Boolean)
    ),
  ];

  return categories.map((slug) => ({
    category: slug.toString().trim(),
  }));
}

export async function generateMetadata({ params }) {

  const category = normalizeSlug(params.category);

  const filtered = templates.filter(
    (t) => normalizeSlug(t.category?.slug) === category
  );

  if (!filtered.length) {
    return {
      title: "Category Not Found | MangoGranola",
    };
  }

  const categoryName = filtered[0].category?.name || category;

  return {
    title: `${categoryName} Templates | Free Downloads`,
    description: `Browse professional ${categoryName.toLowerCase()} templates including letters, contracts, invoices, and documents.`,
    alternates: {
      canonical: `${SITE_URL}/templates/${category}`,
    },
    openGraph: {
      title: `${categoryName} Templates`,
      description: `Free ${categoryName} templates.`,
      url: `${SITE_URL}/templates/${category}`,
      siteName: "MangoGranola",
      type: "website",
    },
  };
}

export default function CategoryPage({ params }) {
  const category = normalizeSlug(params.category);

  const filtered = templates.filter(
    (t) => normalizeSlug(t.category?.slug) === category
  );

  if (!filtered.length) return notFound();

  const categoryName = filtered[0].category?.name || category;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-3">
        {categoryName}
      </h1>

      <p className="text-gray-600 mb-8">
        Free professionally written {categoryName.toLowerCase()} templates.
      </p>

      <div className="grid gap-4">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/templates/${t.category?.slug}/${t.slug}`}
            className="border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="font-semibold text-lg">{t.title}</h2>
            <p className="text-gray-600 text-sm">{t.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
