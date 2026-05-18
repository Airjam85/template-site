const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../content/templates.json');
const backup = path.resolve(__dirname, '../content/templates.json.bak');

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const raw = fs.readFileSync(file, 'utf8');
fs.writeFileSync(backup, raw, 'utf8');

let data = JSON.parse(raw);
let changed = 0;

for (const t of data) {
  if (!t.hasOwnProperty('category')) continue;
  const cat = t.category;
  if (typeof cat === 'string') {
    t.category = { name: cat, slug: slugify(cat) };
    changed++;
  } else if (cat && typeof cat === 'object' && cat.name && !cat.slug) {
    cat.slug = slugify(cat.name);
    changed++;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Updated ${changed} templates. Backup saved to templates.json.bak`);
