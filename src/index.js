/* eslint-disable consistent-return */
import * as path from 'path';
import parse from './parsers.js';
import makeDiffObj from './makeDiffObj.js';
import { stylishFormat, plainFormat } from './formatters/index.js';

function gendiff(file1Path, file2Path, format) {
  const file1 = parse(file1Path, path.extname(path.basename(file1Path)));
  const file2 = parse(file2Path, path.extname(path.basename(file2Path)));
  switch (format) {
    case 'plain':
      return plainFormat(makeDiffObj(file1, file2));
    default:
      return stylishFormat[format](makeDiffObj(file1, file2));
  }
}
export default gendiff;
