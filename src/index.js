/* eslint-disable consistent-return */
import * as path from 'path';
import parse from './parsers.js';
import makeDiffObj from './makeDiffObj.js';
import { stylishFormat } from './formaters.js';

function gendiff(file1Path, file2Path) {
  const file1 = parse(file1Path, path.extname(path.basename(file1Path)));
  const file2 = parse(file2Path, path.extname(path.basename(file2Path)));
  return stylishFormat(makeDiffObj(file1, file2));
}
export default gendiff;
