import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const dataPath = resolve(root, 'src/app/course-data.ts');
const source = await readFile(dataPath, 'utf8');

const executable = source
  .replace(/^\s*\/\/\s*@ts-nocheck\s*$/m, '')
  .replace(/export\s*\{[\s\S]*?\};\s*$/m, '')
  .concat('\nglobalThis.__course = algorithmsAndDataStructuresCourse;');

const context = {};
vm.runInNewContext(executable, context, { filename: dataPath, timeout: 10_000 });
const course = context.__course;

if (!course || !Array.isArray(course.units)) {
  throw new Error('Course data did not evaluate to a valid course object.');
}

const lessons = course.units.flatMap((unit) => unit.lessons || []);
const blocks = lessons.flatMap((lesson) => lesson.richContent || []);
const artifactIds = new Set(
  blocks.filter((block) => block.type === 'interactive').map((block) => block.artifact)
);

const expected = { units: 11, lessons: 69, artifacts: 42 };
const actual = {
  units: course.units.length,
  lessons: lessons.length,
  artifacts: artifactIds.size
};

for (const [key, expectedValue] of Object.entries(expected)) {
  if (actual[key] !== expectedValue) {
    throw new Error(`Expected ${expectedValue} ${key}, found ${actual[key]}.`);
  }
}

const lessonsWithoutRichContent = lessons.filter((lesson) => !lesson.richContent?.length);
if (lessonsWithoutRichContent.length) {
  throw new Error(`Lessons without rich content: ${lessonsWithoutRichContent.map((lesson) => lesson.id).join(', ')}`);
}

async function allFiles(path) {
  const entries = await readdir(path, { withFileTypes: true }).catch(() => null);
  if (!entries) return [path];
  const nested = await Promise.all(entries.map((entry) => allFiles(resolve(path, entry.name))));
  return nested.flat();
}

const contentRoots = [
  resolve(root, 'src/app/course-data.ts'),
  resolve(root, 'src/app/components')
];
const prohibited = new RegExp('\\b' + 'exam' + 's?\\b', 'i');

for (const contentRoot of contentRoots) {
  for (const file of await allFiles(contentRoot)) {
    if (!/\.(?:ts|html|scss)$/.test(file)) continue;
    const text = await readFile(file, 'utf8');
    if (prohibited.test(text)) {
      throw new Error(`Assessment-specific wording remains in ${file}.`);
    }
  }
}

const distributableFiles = [
  ...(await allFiles(resolve(root, 'src'))),
  ...(await allFiles(resolve(root, 'public')))
];
const bundledPdfs = distributableFiles.filter((file) => file.toLowerCase().endsWith('.pdf'));
if (bundledPdfs.length) {
  throw new Error(`Third-party PDFs must not be bundled: ${bundledPdfs.join(', ')}`);
}

console.log(
  `Course checks passed: ${actual.units} units, ${actual.lessons} lessons, ${actual.artifacts} interactive artifacts, no assessment-specific wording, no bundled PDFs.`
);
