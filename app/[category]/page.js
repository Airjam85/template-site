import {
  getTemplatesByCategory,
  getCategorySlugs,
} from "../../lib/loadTemplates";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "../../content/categories";
import { generateItemListSchema } from "../../lib/schema/itemList";
import { SITE_URL } from "../../lib/constants";

export async function generateStaticParams() {
  const categorySlugs = getCategorySlugs();

  return categorySlugs.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;

 const filtered = getTemplatesByCategory(category);

if (!filtered.length) notFound();

const categoryName = filtered[0].category.name;

if (!first) notFound();

const categoryName = first.category.name;

  return {
    title: `${categoryName} Templates | MangoGranola`,
    description: `Browse free ${categoryName.toLowerCase()} templates, examples, and ready-to-use documents for personal and business use.`,
    metadataBase: new URL(
      "https://mangogranola.com"
    ),
    alternates: {
  canonical: `${SITE_URL}/${category}`,
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

  const filtered = getTemplatesByCategory(category);

  if (!filtered.length) {
    notFound();
  }

  const categoryName = filtered[0].category.name;

  const categoryData = categories?.[category] || {};

  const itemListSchema = generateItemListSchema(
  filtered,
  category
);

  return (
  <main className="max-w-4xl mx-auto p-10">

    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(itemListSchema),
  }}
/>

    {/* Breadcrumbs */}
    <div className="mb-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
       Home</Link> / {categoryName}
    </div>

      {/* H1 */}
      <h1 className="text-4xl font-bold mb-4">
        {categoryName} Templates
      </h1>

      {/* SEO INTRO (important for ranking) */}
      <p className="text-lg text-gray-600 mb-8">
  {categoryData?.intro ||
    `Browse and download free ${categoryName.toLowerCase()} templates for professional, business, and personal use. Instantly copy, edit, and customize ready-to-use formats.`}
</p>

<p className="text-gray-600 mb-8">
  These templates help users quickly create polished documents
  without formatting or writing from scratch.
</p>

<p className="text-gray-600 mb-8">
  Whether you need documents for business, personal, or professional use,
  these ready-to-use templates can be copied, edited, and customized in minutes.
</p>

<p className="text-sm text-gray-500 mb-6">
  {filtered.length} templates available
</p>

     {/* USE CASES */}
    {categoryData?.useCases && (
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">
          Common Use Cases
        </h2>

        <ul className="list-disc pl-5 text-gray-700">
          {categoryData.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )}

<h2 className="text-2xl font-semibold mb-4">
  Browse Templates
</h2>

    {/* TEMPLATE GRID (ONLY HERE) */}
    <div className="grid gap-4">
      {filtered.map((t) => (
        <Link
          key={`${category}-${t.slug}`}
          href={`/${category}/${t.slug}`}
          className="border rounded p-4 block hover:bg-gray-50 transition"
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

 {/* CATEGORY NAV (optional but good SEO internal linking) */}
<div className="mt-12">
  <h2 className="text-xl font-semibold mb-4">
    Explore Other Categories
  </h2>

 <div className="flex flex-wrap gap-3 text-sm">
  {Object.entries(categories).map(([slug, data]) => (
    <Link key={slug} href={`/${slug}`} className="underline">
      {data.name}
    </Link>
  ))}
</div>
</div>

  </main>
);
}