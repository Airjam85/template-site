import Link from "next/link";
import { templates } from "../lib/loadTemplates";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-5xl font-bold mb-8">
        Free Document Templates
      </h1>

      <div className="mt-6 mb-8 border rounded-lg p-4 bg-gray-50">
  <h2 className="font-extrabold text-black mb-2">
    New: Freelance Starter Kit
  </h2>

  <p className="text-gray-600 mb-3">
    Contracts, creator agreements, proposal templates, and invoice templates in one downloadable bundle.
  </p>

  <Link
    href="/packs/freelance-starter-kit"
    className="font-semibold text-black underline"
  >
    View the Freelance Starter Kit →
  </Link>
</div>

      <div className="grid gap-4">
        {templates.map((t) => (
          <div key={t.slug} className="border p-4 rounded">

            {/* Template link */}
            <Link
              href={`/${t.category?.slug}/${t.slug}`}
              className="block"
            >
              <h2 className="text-xl font-semibold">
                {t.title}
              </h2>
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
