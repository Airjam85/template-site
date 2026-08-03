#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(process.cwd(), "content", "templates");
const DEFAULT_CSV_PATH = path.join(process.cwd(), "Pages.csv");

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      const next = line[i + 1];

      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
        continue;
      }

      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function normalizeHeader(header) {
  return header
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function parseNumber(value, defaultValue = null) {
  if (value == null || value.trim() === "") {
    return defaultValue;
  }

  const normalized = value.replace(/,/g, "").trim();
  const number = Number(normalized);

  return Number.isFinite(number) ? number : defaultValue;
}

function slugFromPageValue(pageValue) {
  if (!pageValue) {
    return null;
  }

  let pathname = pageValue.trim();

  try {
    if (/^https?:\/\//i.test(pathname)) {
      pathname = new URL(pathname).pathname;
    }
  } catch {
    return null;
  }

  pathname = pathname.replace(/\/+$/, "");

  if (!pathname) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return segments.at(-1) || null;
}

function loadSearchConsoleRows(csvPath) {
  const raw = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const headers = parseCsvLine(lines[0]).map(normalizeHeader);
  const pageIndex = headers.findIndex((header) =>
    ["top pages", "page", "pages"].includes(header)
  );
  const impressionsIndex = headers.findIndex((header) =>
    header.includes("impression")
  );
  const positionIndex = headers.findIndex((header) =>
    header.includes("position")
  );

  if (pageIndex === -1 || impressionsIndex === -1 || positionIndex === -1) {
    throw new Error(
      "CSV headers must include page, impressions, and position columns."
    );
  }

  const rows = [];

  for (const line of lines.slice(1)) {
    const columns = parseCsvLine(line);
    const pageValue = columns[pageIndex] || "";
    const slug = slugFromPageValue(pageValue);

    if (!slug) {
      continue;
    }

    rows.push({
      slug,
      page: pageValue,
      impressions: parseNumber(columns[impressionsIndex], 0),
      position: parseNumber(columns[positionIndex], null),
    });
  }

  return rows;
}

function loadTemplatesMissingQualityTier() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".json"));

  const templates = [];

  for (const fileName of files) {
    const filePath = path.join(CONTENT_DIR, fileName);
    const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

    for (const template of json) {
      if (!template.slug || template.qualityTier) {
        continue;
      }

      templates.push({
        slug: template.slug,
        title: template.title,
        category: template.category?.slug || "",
        fileName,
      });
    }
  }

  return templates;
}

function buildRewriteQueue(csvRows, templates) {
  const bestMetricsBySlug = new Map();

  for (const row of csvRows) {
    const existing = bestMetricsBySlug.get(row.slug);

    if (!existing) {
      bestMetricsBySlug.set(row.slug, row);
      continue;
    }

    if (row.position == null && existing.position != null) {
      continue;
    }

    if (row.position != null && existing.position == null) {
      bestMetricsBySlug.set(row.slug, row);
      continue;
    }

    if (row.position < existing.position) {
      bestMetricsBySlug.set(row.slug, row);
      continue;
    }

    if (row.position === existing.position && row.impressions > existing.impressions) {
      bestMetricsBySlug.set(row.slug, row);
    }
  }

  const rows = templates.map((template) => {
    const metrics = bestMetricsBySlug.get(template.slug);

    return {
      slug: template.slug,
      category: template.category,
      title: template.title,
      position: metrics?.position ?? Number.POSITIVE_INFINITY,
      impressions: metrics?.impressions ?? 0,
      page: metrics?.page ?? "",
      sourceFile: template.fileName,
    };
  });

  rows.sort((a, b) => {
    if (a.position !== b.position) {
      return a.position - b.position;
    }

    if (a.impressions !== b.impressions) {
      return b.impressions - a.impressions;
    }

    return a.slug.localeCompare(b.slug);
  });

  return rows;
}

function printQueue(queue) {
  const printable = queue.map((row, index) => ({
    rank: index + 1,
    slug: row.slug,
    category: row.category,
    position: Number.isFinite(row.position)
      ? Number(row.position.toFixed(2))
      : "n/a",
    impressions: row.impressions,
    page: row.page || "n/a",
    sourceFile: row.sourceFile,
  }));

  console.log(`Templates missing qualityTier: ${queue.length}`);
  console.table(printable);
}

function main() {
  const csvArg = process.argv[2];
  const csvPath = path.resolve(csvArg || DEFAULT_CSV_PATH);

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(`Template directory not found: ${CONTENT_DIR}`);
  }

  const csvRows = loadSearchConsoleRows(csvPath);
  const templates = loadTemplatesMissingQualityTier();
  const queue = buildRewriteQueue(csvRows, templates);

  printQueue(queue);
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}