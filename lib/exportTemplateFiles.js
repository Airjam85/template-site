import {
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

const DEFAULT_FILENAME = "mangogranola-template";
const PDF_FONT_SIZE = 11;
const PDF_LINE_HEIGHT = 16;

function getDownloadName(templateSlug = "") {
  return templateSlug.trim() || DEFAULT_FILENAME;
}

function triggerBrowserDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);
}

function wrapTextForPdf(text, maxCharsPerLine) {
  const lines = [];

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();

    if (!line) {
      lines.push("");
      continue;
    }

    if (line.length <= maxCharsPerLine) {
      lines.push(line);
      continue;
    }

    const words = line.split(/\s+/).filter(Boolean);
    let currentLine = "";

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;

      if (candidate.length <= maxCharsPerLine) {
        currentLine = candidate;
        continue;
      }

      if (currentLine) {
        lines.push(currentLine);
      }

      currentLine = word;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

export function downloadTemplateTxt(content, templateSlug = "") {
  const filename = `${getDownloadName(templateSlug)}.txt`;
  const blob = new Blob([content], {
    type: "text/plain",
  });

  triggerBrowserDownload(blob, filename);
}

export async function downloadTemplateDocx(
  content,
  templateSlug = ""
) {
  const filename = `${getDownloadName(templateSlug)}.docx`;
  const paragraphs = content
    .split("\n")
    .map((line) =>
      new Paragraph({
        children: [new TextRun(line)],
      })
    );

  const document = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });

  const buffer = await Packer.toBlob(document);
  triggerBrowserDownload(buffer, filename);
}

export async function downloadTemplatePdf(content, templateSlug = "") {
  const filename = `${getDownloadName(templateSlug)}.pdf`;
  const pdfDocument = await PDFDocument.create();
  const font = await pdfDocument.embedFont(StandardFonts.Helvetica);
  const pageWidth = 612;
  const pageHeight = 792;
  const horizontalMargin = 48;
  const verticalMargin = 56;
  const maxCharsPerLine = 95;
  const wrappedLines = wrapTextForPdf(content, maxCharsPerLine);

  let page = pdfDocument.addPage([pageWidth, pageHeight]);
  let y = pageHeight - verticalMargin;

  for (const line of wrappedLines) {
    if (y <= verticalMargin) {
      page = pdfDocument.addPage([pageWidth, pageHeight]);
      y = pageHeight - verticalMargin;
    }

    page.drawText(line, {
      x: horizontalMargin,
      y,
      size: PDF_FONT_SIZE,
      font,
      color: rgb(0, 0, 0),
    });

    y -= PDF_LINE_HEIGHT;
  }

  const bytes = await pdfDocument.save();
  const blob = new Blob([bytes], {
    type: "application/pdf",
  });

  triggerBrowserDownload(blob, filename);
}