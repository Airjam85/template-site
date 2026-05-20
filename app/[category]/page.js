import templates from "../../content/templates.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = [
    ...new Set(
      templates.map((t) => t.category?.slug)
    ),
  ];

  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;

  const filtered = templates.filter(
    (t) => t.category?.slug === category
  );

  if (!filtered.length) {
    notFound();
  }

  const categoryName =
    filtered[0].category.name;

  return {
    title: `${categoryName} Templates | MangoGranola`,
    description: `Browse free ${categoryName.toLowerCase()} templates, examples, and downloadable resources.`,
    metadataBase: new URL(
      "https://mangogranola.com"
    ),
    alternates: {
      canonical: `/${category}`,
    },
    openGraph: {
      title: `${categoryName} Templates`,
      description: `Free ${categoryName.toLowerCase()} templates and examples.`,
      url: `https://mangogranola.com/${category}`,
      siteName: "MangoGranola",
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}) {
  const { category } = await params;

  const filtered = templates.filter(
    (t) => t.category?.slug === category
  );

  if (!filtered.length) {
    notFound();
  }

  const categoryName =
    filtered[0].category.name;

  return (
    <main className="max-w-4xl mx-auto p-10">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:underline"
        >
          Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">
        {categoryName} Templates
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Browse free {categoryName.toLowerCase()} templates,
        examples, and customizable documents for
        professional and personal use.
      </p>

      <div className="grid gap-4">
        {filtered.map((t, index) => (
          <Link
            key={`${t.slug}-${index}`}
            href={`/${category}/${t.slug}`}
            className="border rounded p-4 block hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold mb-2">
              {t.title}
            </h2>

            <p className="text-gray-600">
              {t.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}