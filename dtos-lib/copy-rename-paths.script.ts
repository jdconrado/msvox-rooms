import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Define the source and destination directories
const sourceFilePatters = [
  'src/api/**/dtos/**/*.ts',
  'src/domain/enums/**/*.ts',
];
const destDir = __dirname + '/src';

// Function to remove @nestjs/swagger imports and specific decorators
const removeSwaggerImportsAndDecorators = (data) => {
  // Regex to find and remove import lines that import anything from @nestjs/swagger
  const importRegex = /^import .* from '@nestjs\/swagger';\s*$/gm;

  // Remove the imports
  data = data.replace(importRegex, '');

  // Regex to remove @ApiProperty and @ApiPropertyOptional decorators with any configuration
  // The improved regex ensures it captures the entire decorator, including any multi-line configurations
  const decoratorRegex = /@ApiProperty\([^)]*\)\s*/gs;
  const decoratorRegex2 = /@ApiPropertyOptional\([^)]*\)\s*/gs;

  // Remove specific decorators
  data = data.replace(decoratorRegex, '');
  data = data.replace(decoratorRegex2, '');

  // Additionally, handle cases where the decorators are without parameters
  const decoratorNoParamsRegex = /@ApiProperty\s*\(\s*\)\s*/gs;
  const decoratorNoParamsRegex2 = /@ApiPropertyOptional\s*\(\s*\)\s*/gs;

  data = data.replace(decoratorNoParamsRegex, '');
  data = data.replace(decoratorNoParamsRegex2, '');

  return data;
};


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

    // Remove the @nestjs/swagger imports and decorators
    modifiedData = removeSwaggerImportsAndDecorators(modifiedData);
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
