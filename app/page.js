import Link from "next/link";
import { templates } from "../lib/loadTemplates";

const featuredPacks = [
  {
    title: "Freelance Starter Kit",
    description:
      "Contracts, creator agreements, proposal templates, and invoice templates in one downloadable bundle.",
    href: "/packs/freelance-starter-kit",
    cta: "View the Freelance Starter Kit",
    badge: "New: Freelance Starter Kit",
  },
  {
    title: "SEO Agency Starter Pack",
    description:
      "Reusable SEO proposals, agreements, audit documents, scopes of work, invoices, and supporting client templates in one downloadable pack.",
    href: "/packs/seo-agency-starter-pack",
    cta: "View SEO Agency Pack",
    badge: "New: SEO Agency Starter Pack",
  },
];

function ProductCard({ title, description, href, cta, badge }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
      <p className="font-extrabold text-black mb-2">{badge}</p>
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <p className="mt-3 text-gray-600">{description}</p>
      <Link href={href} className="mt-4 inline-block font-semibold text-black underline">
        {cta} →
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-8">Free Document Templates</h1>

      <section className="mb-8">
        <div className="grid gap-4 md:grid-cols-2">
          {featuredPacks.map((pack) => (
            <ProductCard key={pack.href} {...pack} />
          ))}
        </div>
      </section>

      <div className="grid gap-4">
        {templates.map((t) => (
          <div key={t.slug} className="border p-4 rounded">
            {/* Template link */}
            <Link href={`/${t.category?.slug}/${t.slug}`} className="block">
              <h2 className="text-xl font-semibold">{t.title}</h2>
              <p>{t.description}</p>
            </Link>

            {/* Category link */}
            {t.category?.slug && (
              <p className="text-sm text-gray-500 mt-2">
                <Link
                  href={`/${t.category.slug}`}
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
