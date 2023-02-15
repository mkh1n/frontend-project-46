/* eslint-disable consistent-return */
import _ from 'lodash';
import * as path from 'path';
import parse from './parsers.js';

function gendiff(file1Path, file2Path) {
  const file1 = parse(file1Path, path.extname(path.basename(file1Path)));
  const file2 = parse(file2Path, path.extname(path.basename(file2Path)));

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
