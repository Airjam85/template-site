import Link from "next/link";

export const metadata = {
  title: "Freelance Starter Kit | MangoGranola",
  description:
    "A starter pack of freelance contracts, proposals, and invoice templates for creators, freelancers, and service providers.",
};

export default function FreelanceStarterKitPage() {
  return (
    <main className="max-w-3xl mx-auto p-10">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        Home
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-4">
        Freelance Starter Kit
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        A ready-to-use pack of freelance contracts, creator proposal templates,
        and invoice documents designed to help freelancers look professional,
        define scope, and get paid.
      </p>

      <div className="border rounded p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          What’s Included
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Freelance Services Contract</li>
<li>Freelance Writing Contract</li>
<li>Freelance Design Contract</li>
<li>Social Media Management Contract</li>
<li>Influencer Brand Collaboration Agreement</li>
<li>Content Creator Brand Sponsorship Agreement</li>
<li>Project Proposal Templates</li>
<li>Professional Invoice Template</li>
          <li>Scope, payment, revision, and deliverable sections</li>
        </ul>
      </div>

      <div className="border rounded p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Who This Is For
        </h2>

        <p className="text-gray-700">
          This pack is built for freelancers, creators, consultants, social media
          managers, designers, writers, video editors, and service providers who
          need simple professional documents.
        </p>
      </div>

      <div className="bg-gray-50 border rounded p-6 text-center">
  <p className="text-4xl font-extrabold text-black mb-2">
    $19.99
  </p>

  <p className="text-sm text-gray-600 mb-4">
    One-time purchase • Instant download
  </p>
        <a
          href="https://mangogranola.lemonsqueezy.com/checkout/buy/5f8ac327-dc6a-4e55-af6c-85da39564fa8"
          className="inline-block rounded-lg bg-black px-8 py-4 text-lg font-bold text-white hover:bg-gray-800 transition"
>
          Buy Freelance Starter Kit
        </a>

        <p className="text-sm text-gray-500 mt-4">
          Instant download after purchase.
        </p>
      </div>
    </main>
  );
}