 
import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeTypeDefs} from '@graphql-tools/merge';
import fs from 'fs';
import {print} from 'graphql';
import path from 'path';
import * as prettier from 'prettier';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadedFiles = loadFilesSync(`${__dirname}/*.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles);
const printedTypeDefs = print(typeDefs);
const prettyTypeDefs = await prettier.format(printedTypeDefs, {
  parser: 'graphql',
});
fs.writeFileSync('schema.graphql', prettyTypeDefs);
