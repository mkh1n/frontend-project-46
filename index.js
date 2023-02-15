/* eslint-disable consistent-return */
import fs from 'fs';
import _ from 'lodash';
import { cwd } from 'node:process';
import * as path from 'path';

function normalizePath(filepath) {
  if (filepath.includes(cwd())) {
    return filepath;
  }
  return path.resolve(cwd(), filepath);
}

function gendiff(file1path, file2path) {
  let file1;
  let file2;
  const ext = file1path.split('.').at(-1);

  switch (ext) {
    case 'json':
      file1 = JSON.parse(fs.readFileSync(normalizePath(file1path), { encoding: 'utf-8' }));
      file2 = JSON.parse(fs.readFileSync(normalizePath(file2path), { encoding: 'utf-8' }));
      break;
    default:
  }
  const keys = _.sortBy(Array.from(new Set(Object.keys(file1).concat(Object.keys(file2)))));

  function makeStrdiff(first, second, key) {
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `  + ${key}: ${second[key]}\n`;
    } if (_.has(first, key) && !_.has(second, key)) {
      return `  - ${key}: ${first[key]}\n`;
    } if (first[key] !== second[key]) {
      return `  - ${key}: ${first[key]}\n`
            + `  + ${key}: ${second[key]}\n`;
    } if (second[key] === first[key]) {
      return `    ${key}: ${first[key]}\n`;
    }
  }
  return `{\n${keys.reduce((acc, key) => acc + makeStrdiff(file1, file2, key), '')}}`;
}
export default gendiff;