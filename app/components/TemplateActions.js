"use client";

import { useState } from "react";

export default function TemplateActions({
  templateContent = "",
  templateSlug = "",
}) {
  const [copied, setCopied] = useState(false);
  const [content, setContent] = useState(templateContent);
  const isExpenseTemplate =
    templateSlug === "expense-tracking-sheet-template";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[300px] border rounded p-4 bg-white text-black dark:bg-zinc-900 dark:text-white mb-4"
      />

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleCopy}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {copied ? "Copied!" : "Copy Template"}
        </button>

       <button
  onClick={() => {
    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = templateSlug
      ? `${templateSlug}.txt`
      : "mangogranola-template.txt";
    a.click();

    URL.revokeObjectURL(url);
  }}
  className="border px-4 py-2 rounded bg-white text-black hover:bg-gray-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
>
  Download TXT
</button>

        <button
  onClick={async () => {
    const shareData = {
      title: document.title,
      text: "Check out this template",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Link copied!");
      }
    } catch (error) {
      console.error(error);
    }
  }}
  className="border px-4 py-2 rounded bg-white text-black hover:bg-gray-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
>
  Share
</button>

        {isExpenseTemplate && (
          <a
            href="/downloads/expense-tracking-sheet-template.xlsx"
            download
            className="border px-4 py-2 rounded bg-white text-black hover:bg-gray-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            Download Editable Excel
          </a>
        )}
      </div>

      {isExpenseTemplate && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Track transactions, compare spending with your budget, and review
          financial trends in an editable Excel workbook.
        </p>
      )}
    </div>
  );
}