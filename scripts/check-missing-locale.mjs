// Fails when a key exists in one language but not the other
import fs from 'node:fs';

const flat = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [`${p}${k}`]));

let missing = 0;
for (const file of fs.readdirSync('locales/id')) {
  const id = new Set(flat(JSON.parse(fs.readFileSync(`locales/id/${file}`, 'utf8'))));
  const en = new Set(flat(JSON.parse(fs.readFileSync(`locales/en/${file}`, 'utf8'))));
  for (const k of id) if (!en.has(k)) (missing++, console.log(`en/${file}: missing ${k}`));
  for (const k of en) if (!id.has(k)) (missing++, console.log(`id/${file}: missing ${k}`));
}
if (missing) process.exit(1);
console.log('All locale keys match.');
