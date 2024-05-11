import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Define the source and destination directories
const sourceFilePatters = [
  'src/api/**/dtos/**/*.ts',
  'src/domain/enums/**/*.ts',
];
const destDir = __dirname + '/src';

// Use glob to find all files in the source directory
const transferFilesToLib = async (sourceDir: string, cwd?: string) => {
  const copyCwd = cwd ?? path.resolve(__dirname, '../');
  const files = await glob(sourceDir, {
    ignore: ['**/node_modules/**'],
    cwd: copyCwd,
  });
  console.log('found #files: ', files.length);
  // For each file found
  for (const file of files) {
    console.log('file: ', file);
    // Read the file content
    const data = fs.readFileSync(copyCwd + '/' + file, 'utf8');

    // Define the destination file path
    const replacePath = ['src/api/', 'src/domain'].find((p) =>
      file.includes(path.normalize(p)),
    );
    const baseDestFile = file.replace(path.normalize(replacePath), '');

    const amountOfLevels = baseDestFile.split('\\').length - 1;

    const destFile = path.join(destDir, baseDestFile);

    //Replace all the paths in the file content

    const aliasMap = {
      '@api/': '',
      '@domain/enums': 'enums',
    };

    let modifiedData = data;
    for (const [key, value] of Object.entries(aliasMap)) {
      const addedRelativePath = '../'.repeat(amountOfLevels);
      modifiedData = modifiedData.replace(
        new RegExp(key, 'g'),
        addedRelativePath + value,
      );
    }

    // Write the modified content to the new location

    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.writeFileSync(destFile, modifiedData, 'utf8');
    console.log('- copied to: ', destFile);
  }
};

fs.rmSync(destDir, { recursive: true });
sourceFilePatters.forEach(async (sourceDir) => {
  await transferFilesToLib(sourceDir);
});
