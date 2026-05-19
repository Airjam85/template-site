"use client";

import { useState } from "react";

export default function TemplateActions({ templateContent }) {
  const [copied, setCopied] = useState(false);

  return (
    <section className="mb-12 flex gap-3 flex-wrap">
      <button
        onClick={() => {
          navigator.clipboard.writeText(templateContent);
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
      >
        {copied ? "Copied!" : "Copy Template"}
      </button>

      <button className="border px-4 py-2 rounded hover:bg-gray-50">
        Download PDF (coming soon)
      </button>

      <button className="border px-4 py-2 rounded hover:bg-gray-50">
        Share (coming soon)
      </button>
    </section>
  );
}
