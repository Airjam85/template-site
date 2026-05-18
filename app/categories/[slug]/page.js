import templates from "../../../content/templates.json";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    slug: slug.toString().trim(),
  }));
}

export async function generateMetadata({ params }) {
  const slug = params.slug?.toString().trim();

  const filtered = templates.filter(
    (t) => t.category?.slug === slug
  );

  if (!filtered.length) {
    return {
      title: "Category Not Found | MangoGranola",
    };
  }

  const categoryName = filtered[0].category?.name || slug;

  return {
    title: `${categoryName} Templates | Free Downloads`,
    description: `Browse professional ${categoryName.toLowerCase()} templates including letters, contracts, invoices, and documents.`,
    alternates: {
      canonical: `${SITE_URL}/categories/${slug}`,
    },
    openGraph: {
      title: `${categoryName} Templates`,
      description: `Free ${categoryName} templates.`,
      url: `${SITE_URL}/categories/${slug}`,
      siteName: "MangoGranola",
      type: "website",
    },
  };
}

export default function CategoryPage({ params }) {
  const slug = params.slug?.toString().trim();

  const filtered = templates.filter(
    (t) => t.category?.slug === slug
  );

  if (!filtered.length) return notFound();

  const categoryName = filtered[0].category?.name || slug;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-3">
        {categoryName}
      </h1>

      <p className="text-gray-600 mb-8">
        Free professionally written {categoryName.toLowerCase()} templates.
      </p>

      <div className="grid gap-3">
        {filtered.map((t) => (
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