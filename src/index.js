/* eslint-disable consistent-return */
import * as path from 'path';
import fs from 'fs';
import { cwd } from 'node:process';
import parse from './parsers.js';
import format from './formatters/index.js';

function normalizePath(filepath) {
  if (filepath.includes(cwd())) {
    return filepath;
  }
  return path.resolve(cwd(), filepath);
}

function gendiff(file1Path, file2Path, formatter) {
  const before = parse(
    fs.readFileSync(normalizePath(file1Path)),
    path.extname(path.basename(file1Path)),
  );
  const after = parse(
    fs.readFileSync(normalizePath(file2Path)),
    path.extname(path.basename(file2Path)),
  );
  return format(before, after, formatter);
}
export default gendiff;
