export const metadata = {
  title: "Terms of Use | MangoGranola",
  description: "Terms of Use for MangoGranola.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        Terms of Use
      </h1>

      <div className="space-y-6 text-gray-700">
        <p>
          MangoGranola provides templates, documents, and digital resources for
          informational purposes only.
        </p>

        <p>
          The content available on this website does not constitute legal,
          financial, tax, accounting, medical, or professional advice.
        </p>

        <p>
          Users are responsible for reviewing and adapting any template to their
          specific circumstances and applicable laws.
        </p>

        <p>
          Digital products purchased through MangoGranola are licensed for
          personal or business use and may not be resold, redistributed,
          republished, or offered as part of another product without permission.
        </p>

        <p>
          All content is provided "as is" without warranties of any kind.
        </p>

        <p>
          By using this website, you agree to these Terms of Use.
        </p>
      </div>
    </main>
  );
}