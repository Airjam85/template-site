import Link from "next/link";

export const metadata = {
  title: "SEO Agency Starter Pack | MangoGranola",
  description:
    "A client-ready collection of SEO proposals, contracts, scopes of work, audit agreements, invoices, and supporting documents for SEO freelancers, consultants, and agencies.",
};

const CHECKOUT_URL =
  "https://mangogranola.lemonsqueezy.com/checkout/buy/b2afc88c-d435-4d0b-b76a-86b2bc0ed25e";
const PRODUCT_PRICE = "$29.99";

const includedFiles = [
  "SEO Proposal Template (.txt)",
  "SEO Services Contract Template (.txt)",
  "SEO Retainer Agreement Template (.txt)",
  "SEO Audit Agreement Template (.txt)",
  "SEO Scope of Work Template (.txt)",
  "SEO NDA Template (.txt)",
  "SEO Invoice Template (.txt)",
  "SEO Services Invoice Template (.txt)",
  "SEO Cancellation Letter Template (.txt)",
  "SEO Client Questionnaire (.txt)",
  "SEO Monthly Report (.txt)",
  "SEO Keyword Research Worksheet (.txt)",
  "SEO Content Brief Template (.txt)",
  "LICENSE.txt",
  "DISCLAIMER.txt",
];

const relatedFreeTemplates = [
  {
    title: "SEO Proposal Template",
    href: "/business-proposals/seo-proposal-template",
  },
  {
    title: "SEO Services Contract Template",
    href: "/contracts/seo-services-contract-template",
  },
  {
    title: "SEO Retainer Agreement Template",
    href: "/contracts/seo-retainer-agreement-template",
  },
  {
    title: "SEO Audit Agreement Template",
    href: "/contracts/seo-audit-agreement-template",
  },
  {
    title: "SEO Scope of Work Template",
    href: "/contracts/seo-scope-of-work-template",
  },
  {
    title: "SEO NDA Template",
    href: "/contracts/seo-nda-template",
  },
  {
    title: "SEO Invoice Template",
    href: "/invoices/seo-invoice-template",
  },
  {
    title: "SEO Services Invoice Template",
    href: "/invoices/seo-services-invoice",
  },
  {
    title: "SEO Cancellation Letter Template",
    href: "/personal-letters/seo-cancellation-letter-template",
  },
];

export default function SeoAgencyStarterPackPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        Home
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500">
            Professional Document Bundle
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            SEO Agency Starter Pack
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            A client-ready collection of reusable SEO proposals, agreements,
            scopes of work, audit documents, invoices, and supporting
            templates built for SEO freelancers, consultants, and growing
            agencies.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-black" />
              <span>Define scope and deliverables clearly</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-black" />
              <span>Standardize your client process</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-black" />
              <span>Save time preparing documents</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-black" />
              <span>Present a professional client experience</span>
            </li>
          </ul>
        </div>

        <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Price
          </p>
          <p className="mt-3 text-5xl font-extrabold tracking-tight text-black">
            {PRODUCT_PRICE}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            One-time purchase • Instant digital download
          </p>

          <p className="mt-6 text-gray-700">
            Includes reusable SEO documents for proposals, agreements, scopes of
            work, audit documents, invoices, and supporting client templates.
          </p>

          <div className="mt-6">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-black px-8 py-4 text-lg font-bold text-white hover:bg-gray-800 transition"
            >
              Buy SEO Agency Starter Pack
            </a>
          </div>
        </aside>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">What&apos;s Included</h2>
        <p className="mt-3 text-gray-600">
          All files are editable <span className="font-medium">.txt</span> templates packaged in a ZIP download.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {includedFiles.map((file) => (
            <div
              key={file}
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700"
            >
              {file}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Editable placeholders for client details, website information,
          deliverables, timelines, pricing, payment terms, reporting, and
          signatures.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-black">Who This Is For</h2>
          <p className="mt-3 text-gray-700 leading-7">
            SEO freelancers, independent SEO consultants, local SEO providers,
            digital marketing agencies, content strategists, web-design companies
            offering SEO, and small agencies that want a repeatable client
            workflow.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-black">Why Use This Pack</h2>
          <ul className="mt-3 space-y-3 text-gray-700 leading-7">
            <li>Reduce time spent recreating client documents.</li>
            <li>Keep scopes, fees, and deliverables organized.</li>
            <li>Create a more consistent onboarding process.</li>
            <li>Make proposals and agreements easier to customize.</li>
            <li>Keep sales, service delivery, reporting, and billing documents together.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">How It Works</h2>
        <ol className="mt-4 space-y-3 text-gray-700">
          <li>1. Purchase securely through Lemon Squeezy.</li>
          <li>2. Download the compressed SEO Agency Starter Pack.</li>
          <li>3. Customize the documents for each client and engagement.</li>
        </ol>
        <p className="mt-4 text-sm font-medium text-gray-600">
          One-time purchase • Instant digital download
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">Purchase</h2>
        <p className="mt-3 text-4xl font-extrabold tracking-tight text-black">
          {PRODUCT_PRICE}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          One-time purchase • Instant download
        </p>
        <p className="mt-4 text-gray-700">
          Includes reusable SEO documents for proposals, agreements, scopes of
          work, audit documents, invoices, and supporting client templates.
        </p>
        <div className="mt-6">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-black px-8 py-4 text-lg font-bold text-white hover:bg-gray-800 transition"
          >
            Buy SEO Agency Starter Pack
          </a>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">Preview Related Free Templates</h2>
        <p className="mt-3 text-gray-600">
          Explore the related free templates that match the same workflow and
          document types.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {relatedFreeTemplates.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-gray-200 p-4 hover:border-black hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-black">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">Open free template</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-black">Disclaimer</h2>
        <p className="mt-3 text-gray-700 leading-7">
          These templates are provided for general business and informational use
          and do not constitute legal, financial, or tax advice. Review and
          adapt each document for your business, engagement, and jurisdiction.
        </p>
        <Link href="/disclaimer" className="mt-4 inline-block text-sm font-semibold text-black underline hover:no-underline">
          View the full disclaimer
        </Link>
      </section>
    </main>
  );
}
