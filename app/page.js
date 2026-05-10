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
          <Link
            key={t.slug}
            href={`/templates/${t.slug}`}
            className="border p-4 rounded"
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