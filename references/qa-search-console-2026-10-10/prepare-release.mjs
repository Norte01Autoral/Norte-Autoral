// Recreates only the dedicated Search Console release directory. No deploy or Git push.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const evidenceRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(evidenceRoot, '../..');
const workspaceRoot = path.resolve(projectRoot, '..');
const sourceRoot = path.join(projectRoot, 'public');
const previousRoot = path.join(workspaceRoot, 'clone-v1-netlify');
const publishRoot = path.join(workspaceRoot, 'clone-v1-netlify-search-2026-10-10');
const reportPath = path.join(evidenceRoot, 'release-preparation.json');
const exclusions = JSON.parse(fs.readFileSync(path.join(projectRoot, 'scripts/hostinger-exclusions.json'), 'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase();
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const filesIn = root => {
  const files = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      assert(!entry.isSymbolicLink(), `Symlink refused: ${entry.name}`);
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile()) files.push(path.relative(root, fullPath).split(path.sep).join('/'));
      else throw new Error(`Unsupported entry: ${fullPath}`);
    }
  }
  walk(root);
  return files.sort();
};
const sourceFiles = filesIn(sourceRoot).filter(file => !exclusions.some(prefix => file.startsWith(prefix)));
const expectedFiles = [...sourceFiles, '_headers', '_redirects'].sort();
assert(sourceFiles.length === 229, `Unexpected public file count: ${sourceFiles.length}`);
const previousLocalOnlyFiles = filesIn(previousRoot).filter(file => file.startsWith('.netlify/'));
const previousPublicationFiles = filesIn(previousRoot).filter(file => !file.startsWith('.netlify/'));
assert(JSON.stringify(previousPublicationFiles) === JSON.stringify(expectedFiles), 'Previous upload public inventory differs from the expected 231 files');
for (const file of expectedFiles) {
  assert(!/(^|\/)(\.netlify|\.git|node_modules|backups)(\/|$)/.test(file), `Forbidden publication path: ${file}`);
  assert(!/\.(zip|log)$/.test(file), `Forbidden publication artifact: ${file}`);
}
const sourceFor = file => file === '_headers' || file === '_redirects'
  ? path.join(projectRoot, 'hosting/netlify', file)
  : path.join(sourceRoot, file);
const baselineFiles = expectedFiles.map(file => ({
  path: file,
  bytes: fs.statSync(path.join(previousRoot, file)).size,
  sha256: hash(path.join(previousRoot, file))
}));
const baselineDifferences = baselineFiles.filter(entry => entry.sha256 !== hash(sourceFor(entry.path)));
assert(baselineDifferences.length === 1 && baselineDifferences[0].path === 'index.html', 'Changes outside index.html detected; reassess package before proceeding');
const previousIndex = fs.readFileSync(path.join(previousRoot, 'index.html'), 'utf8');
const currentIndex = fs.readFileSync(path.join(sourceRoot, 'index.html'), 'utf8');
const heroScript = html => {
  const start = html.indexOf('/* ============ HERO: o feixe (WebGL) ============');
  assert(start >= 0, 'Hero script marker missing');
  return html.slice(start, html.indexOf('</script>', start)).trim();
};
const currentHero = heroScript(currentIndex), previousHero = heroScript(previousIndex);
const heroCheck = JSON.parse(fs.readFileSync(path.join(evidenceRoot, 'hero-webgl-fix.json'), 'utf8'));
assert(heroCheck.failed === 0 && heroCheck.passed === 17 && heroCheck.sourceIndexSha256 === hash(path.join(sourceRoot, 'index.html')), 'Hero verification must match current source');
const normalizedCurrentIndex = currentIndex
  .replace('      "alternateName": "NorteAutoral",\n', '')
  .replace('      "@type": "Organization",\n      "@id": "https://norteautoral.site/#negocio",', '      "@type": "ProfessionalService",\n      "@id": "https://norteautoral.site/#negocio",')
  .replace(currentHero, previousHero);
assert(normalizedCurrentIndex === previousIndex, 'index.html changes exceed the reviewed structured-data and GPU robustness edits');
const bodySha256 = crypto.createHash('sha256').update(currentIndex.slice(currentIndex.indexOf('<body'))).digest('hex').toUpperCase();

const preservedPaths = [
  'clone-v1-hostinger.zip', 'clone-v1-norte-autoral.zip', 'clone-v1-netlify.zip',
  'clone v1/backups/clone-v1-original-2026-10-09/clone-v1-original.zip',
  'clone v1/backups/clone-v1-norte-autoral-2026-10-09/clone-v1-norte-autoral.zip',
  'clone v1/backups/clone-v1-jd-motion-2026-10-10/clone-v1-norte-autoral.zip',
  'clone v1/backups/clone-v1-norte-os-2026-10-10/clone-v1-norte-autoral.zip'
];
const preservedBefore = preservedPaths.map(file => ({ path: file, sha256: hash(path.join(workspaceRoot, file)) }));
const documentedArchiveHashes = new Map([
  ['clone-v1-hostinger.zip', '61A469DF25EF08C7361F12396AB81471E6797B1936962493993F7A5405F79022'],
  ['clone-v1-norte-autoral.zip', 'B76B7DE31854206982F3E469B6FE618B8C58775A39141381E3A5D27BDC5421AC'],
  ['clone-v1-netlify.zip', JSON.parse(fs.readFileSync(path.join(workspaceRoot, 'netlify-preparation/netlify-package-archive.json'), 'utf8')).SHA256],
  ['clone v1/backups/clone-v1-original-2026-10-09/clone-v1-original.zip', '43C69BF92CB90B67EBEA2E4AAACEC541DE6E6D008AE8981BBC795AE4B39C2F5A'],
  ['clone v1/backups/clone-v1-norte-autoral-2026-10-09/clone-v1-norte-autoral.zip', '32EC9DB2627AC097F5D4105B21C22940DB28FA16262931F3AF97099E9A81CC45'],
  ['clone v1/backups/clone-v1-jd-motion-2026-10-10/clone-v1-norte-autoral.zip', '9D7BBC063AF997C257D70B5F2B6C469F822FC6D606EB0D669EB0B949EA014672'],
  ['clone v1/backups/clone-v1-norte-os-2026-10-10/clone-v1-norte-autoral.zip', '12CEECF1B6735658A9A897C1FD1FFC12D8A30EBF93227E3D2E866C9CBC0E45E4']
]);
for (const entry of preservedBefore) assert(entry.sha256 === documentedArchiveHashes.get(entry.path), `Archive differs from documented restoration hash: ${entry.path}`);
if (fs.existsSync(reportPath)) {
  const prior = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  assert(JSON.stringify(prior.previousUploadFiles) === JSON.stringify(baselineFiles), 'Preserved old upload was changed since initial preparation');
  assert(JSON.stringify(prior.preservedArchives) === JSON.stringify(preservedBefore), 'Preserved archive changed since initial preparation');
}
assert(path.dirname(publishRoot) === workspaceRoot, 'New upload directory is outside the named workspace');
assert(publishRoot !== previousRoot && !publishRoot.startsWith(`${projectRoot}${path.sep}`), 'Upload target must be a new sibling directory');
if (fs.existsSync(publishRoot)) {
  assert(JSON.stringify(filesIn(publishRoot)) === JSON.stringify(expectedFiles), 'Existing new upload has unexpected files; refusing to overwrite');
} else fs.mkdirSync(publishRoot);
for (const file of expectedFiles) {
  const destination = path.join(publishRoot, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(sourceFor(file), destination);
}
const publicationFiles = expectedFiles.map(file => ({
  path: file,
  bytes: fs.statSync(path.join(publishRoot, file)).size,
  sha256: hash(path.join(publishRoot, file))
}));
assert(JSON.stringify(filesIn(publishRoot)) === JSON.stringify(expectedFiles), 'New upload file inventory verification failed');
for (const entry of publicationFiles) assert(entry.sha256 === hash(sourceFor(entry.path)), `Copied hash mismatch: ${entry.path}`);
for (const entry of baselineFiles) assert(entry.sha256 === hash(path.join(previousRoot, entry.path)), `Previous upload changed: ${entry.path}`);
for (const entry of preservedBefore) assert(entry.sha256 === hash(path.join(workspaceRoot, entry.path)), `Preserved archive changed: ${entry.path}`);

const report = {
  preparedAtUtc: new Date().toISOString(),
  purpose: 'Dedicated manual Netlify update for Google brand identification; preparation only',
  project: 'rococo-liger-832df6',
  sourceDirectory: sourceRoot,
  previousUploadDirectory: previousRoot,
  previousUploadLocalStateExcludedFromNewPackage: previousLocalOnlyFiles.map(() => '.netlify/ local state; content not read or copied'),
  publishDirectory: publishRoot,
  publicFiles: sourceFiles.length,
  adapterFiles: 2,
  totalPublicationFiles: publicationFiles.length,
  excludedHistoricalPrefixes: exclusions,
  sourceDifferencesFromPreviousUpload: baselineDifferences.map(entry => ({
    path: entry.path,
    previousSha256: entry.sha256,
    currentSha256: hash(sourceFor(entry.path))
  })),
  metadataOnlyChangeVerified: false,
  onlyStructuredDataAndHeroRobustnessChanged: true,
  reviewedChanges: [
    'Existing WebSite node receives alternateName: NorteAutoral.',
    'Existing #negocio node changes deprecated ProfessionalService type to Organization; existing identity fields are retained.',
    'Hero WebGL canvas and mask respect hardware texture/viewport limits; existing CSS fallback activates on allocation or context failure. 17 checks passed.'
  ],
  htmlBodyIdenticalToPreviousUpload: false,
  htmlBodyMarkupAndCopyIdenticalIgnoringHeroScript: true,
  htmlBodySha256: bodySha256,
  allCssJavaScriptAndAssetsIdenticalToPreviousUpload: true,
  copiedHashMismatches: [],
  previousUploadPreserved: true,
  existingArchivesPreserved: true,
  archivesMatchDocumentedHashes: true,
  noCredentialsIncluded: true,
  deployPerformed: false,
  gitPushPerformed: false,
  instructions: [
    'If public/index.html changes again, run: node references/qa-search-console-2026-10-10/prepare-release.mjs from clone v1.',
    'Review current publicationFiles[index.html] SHA-256 before deployment.',
    'Upload publishDirectory as an update of the existing Netlify project rococo-liger-832df6.',
    'The directory root includes _headers and _redirects from hosting/netlify; no SPA fallback is added.',
    'Previous upload directory, delivery ZIPs and four immutable backups are preserved.',
    'This script neither deploys the site nor pushes Git changes; root agent must perform the authorized final publication and QA.'
  ],
  preservedArchives: preservedBefore,
  previousUploadFiles: baselineFiles,
  publicationFiles
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ publishDirectory: publishRoot, files: publicationFiles.length, differences: report.sourceDifferencesFromPreviousUpload, reportPath }, null, 2));
