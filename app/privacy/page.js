export const metadata = {
  title: "Privacy Policy | MangoGranola",
  description: "Privacy Policy for MangoGranola.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-700">
        <p>
          MangoGranola respects your privacy. This website may collect limited
          information necessary to provide digital products, improve the user
          experience, and respond to support requests.
        </p>

        <p>
          Purchases are processed through third-party payment providers such as
          Lemon Squeezy. MangoGranola does not store full payment card
          information.
        </p>

        <p>
          Analytics tools may collect anonymous usage information, including
          page visits and interactions, to help improve the website.
        </p>

        <p>
          MangoGranola does not sell personal information to third parties.
        </p>

        <p>
          Questions about this Privacy Policy may be directed to mangogranolasupport@gmail.com.
        </p>
      </div>
    </main>
  );
}