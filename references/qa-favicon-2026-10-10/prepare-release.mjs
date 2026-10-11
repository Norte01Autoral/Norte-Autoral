import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const qa = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(qa, '../..');
const previous = path.resolve(root, '../clone-v1-netlify-search-2026-10-10');
const stage = path.resolve(root, '../clone-v1-netlify-favicon-2026-10-10');
const publicRoot = path.join(root, 'public');
const exclusions = JSON.parse(fs.readFileSync(path.join(root, 'scripts/hostinger-exclusions.json'), 'utf8'));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function filesIn(base) {
  return fs.readdirSync(base, { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) throw new Error('Symlink refused');
    return entry.isDirectory() ? filesIn(path.join(base, entry.name)).map(p => entry.name + '/' + p) : [entry.name];
  }).sort();
}
const publicFiles = filesIn(publicRoot).filter(file => !exclusions.some(prefix => file.startsWith(prefix)));
const allFiles = [...publicFiles, '_headers', '_redirects'].sort();
if (allFiles.length !== 231 || JSON.stringify(filesIn(previous)) !== JSON.stringify(allFiles)) throw new Error('Publication inventory changed unexpectedly');
const oldLinks = '<link rel="icon" type="image/svg+xml" href="/assets/norte-autoral/favicon.svg?v=2">\n<link rel="icon" type="image/png" sizes="32x32" href="/assets/norte-autoral/favicon-32.png">\n<link rel="shortcut icon" href="/assets/norte-autoral/favicon.ico">';
const newLinks = '<link rel="icon" type="image/png" sizes="256x256" href="/assets/norte-autoral/favicon.png">\n<link rel="shortcut icon" type="image/x-icon" href="/assets/norte-autoral/favicon.ico">';
const before = fs.readFileSync(path.join(previous, 'index.html'), 'utf8');
const after = fs.readFileSync(path.join(publicRoot, 'index.html'), 'utf8');
if (!before.includes(oldLinks) || before.replace(oldLinks, newLinks) !== after) throw new Error('Only the intended favicon declarations may change');
fs.mkdirSync(stage, { recursive: true });
if (filesIn(stage).some(file => !allFiles.includes(file))) throw new Error('Unexpected files in destination');
const inventory = [];
for (const file of allFiles) {
  const source = file.startsWith('_') ? path.join(root, 'hosting/netlify', file) : path.join(publicRoot, file);
  const bytes = fs.readFileSync(source);
  const oldBytes = fs.readFileSync(path.join(previous, file));
  if (file !== 'index.html' && sha(bytes) !== sha(oldBytes)) throw new Error('Unexpected change: ' + file);
  const destination = path.join(stage, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  if (sha(fs.readFileSync(destination)) !== sha(bytes)) throw new Error('Copy mismatch: ' + file);
  inventory.push({ file, bytes: bytes.length, sha256: sha(bytes), changedFromPrevious: sha(bytes) !== sha(oldBytes) });
}
const previousArchives = JSON.parse(fs.readFileSync(path.join(root, 'references/qa-search-console-2026-10-10/release-preparation.json'), 'utf8')).preservedArchives;
const preservedArchives = previousArchives.map(item => {
  const current = sha(fs.readFileSync(path.resolve(root, '..', item.path))).toUpperCase();
  if (current !== item.sha256.toUpperCase()) throw new Error('Archive changed: ' + item.path);
  return { ...item, verifiedUnchanged: true };
});
const report = { preparedAtUtc: new Date().toISOString(), project: 'rococo-liger-832df6', stage, previous, files: inventory.length,
  sourceIndexSha256: sha(fs.readFileSync(path.join(publicRoot, 'index.html'))), onlyFaviconDeclarationsChanged: true,
  existingLogoAndOtherPublicFilesPreserved: true, adaptersIncluded: true, previousStagePreserved: true,
  originalArchivesAndFourBackupsPreserved: true, preservedArchives, publicationInventory: inventory };
fs.writeFileSync(path.join(qa, 'release-preparation.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ stage, files: report.files, onlyFaviconDeclarationsChanged: true, sha256: report.sourceIndexSha256 }));
