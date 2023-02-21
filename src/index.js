/* eslint-disable consistent-return */
import * as path from 'path';
import parse from './parsers.js';
import makeDiffObj from './makeDiffObj.js';
import { stylishFormat, plainFormat, jsonFormat } from './formatters/index.js';

function gendiff(file1Path, file2Path, format) {
  const before = parse(file1Path, path.extname(path.basename(file1Path)));
  const after = parse(file2Path, path.extname(path.basename(file2Path)));
  switch (format) {
    case 'plain':
      return plainFormat(makeDiffObj(before, after));
    case 'json':
      return jsonFormat(makeDiffObj(before, after));
    default:
      return stylishFormat(makeDiffObj(before, after));
  }
}
export default gendiff;
