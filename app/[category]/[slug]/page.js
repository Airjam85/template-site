import templates from "../../../content/templates.json";
import Link from "next/link";
import { notFound } from "next/navigation";
{/*import TemplateActions from "../../components/TemplateActions";*/}

export async function generateStaticParams() {
  return templates.map((template) => ({
    category: template.category.slug,
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;

  const template = templates.find(
    (t) =>
      t.category?.slug === category &&
      t.slug === slug
  );

if (!template) {
  notFound();
}

  return {
    title: `${template.title} | MangoGranola`,
    description: template.description,
    metadataBase: new URL("https://mangogranola.com"),
    alternates: {
      canonical: `/${category}/${slug}`,
    },
    openGraph: {
      title: template.title,
      description: template.description,
      url: `https://mangogranola.com/${category}/${slug}`,
      siteName: "MangoGranola",
      type: "article",
    },
  };
}

export default async function TemplatePage({ params }) {
  const { category, slug } = await params;

  const template = templates.find(
    (t) =>
      t.category?.slug === category &&
      t.slug === slug
  );

  const related = templates
  .filter(
    (t) =>
      t.category?.slug === category &&
      t.slug !== slug
  )
  .slice(0, 5);

 if (!template) {
  notFound();
}

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {template.title}
      </h1>

<p className="text-sm text-gray-500 mb-4">
  <Link
    href={`/${template.category.slug}`}
    className="hover:underline"
  >
    {template.category.name}
  </Link>
</p>

      <p className="text-gray-600 mb-6">
        {template.description}
      </p>

      {template.intro && (
  <p className="mb-6">
    {template.intro}
  </p>
)}

{template.whenToUse && (
  <div className="mt-8 mb-6">
    <h2 className="text-2xl font-semibold mb-2">
      When To Use
    </h2>

    <p>{template.whenToUse}</p>
  </div>
)}

<h2 className="text-2xl font-semibold mb-2">
  Template
</h2>


      <pre className="whitespace-pre-wrap border rounded p-4 bg-gray-50 overflow-x-auto">
        {template.template}
      </pre>
{/*
<TemplateActions template={template.template} />
*/}

{template.example && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-2">
      Example
    </h2>

    <pre className="whitespace-pre-wrap border rounded p-4 bg-gray-50 overflow-x-auto">
      {template.example}
    </pre>
  </div>
)}

{template.faqs?.length > 0 && (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold mb-4">
      Frequently Asked Questions
    </h2>

    <div className="mt-8 space-y-4">
      {template.faqs.map((faq, index) => (
        <div
          key={index}
          className="border rounded p-4"
        >
          <h3 className="font-semibold mb-2">
            {faq.question}
          </h3>

          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  </div>
)}

      {related.length > 0 && (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold mb-4">
      Related Templates
    </h2>

    <div className="mt-8 grid gap-3">
      {related.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.category.slug}/${item.slug}`}
          className="border rounded p-4 block hover:bg-gray-50"
        >
          <h3 className="font-semibold">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  </div>
)}
    </main>
  );
}