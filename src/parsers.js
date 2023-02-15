/* eslint-disable consistent-return */
import * as path from 'path';
import { cwd } from 'node:process';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';
import fs from 'fs';

function normalizePath(filepath) {
  if (filepath.includes(cwd())) {
    return filepath;
  }
  return path.resolve(cwd(), filepath);
}
export default (filePath, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(fs.readFileSync(normalizePath(filePath)));
    case '.yaml':
    case '.yml':
      return yaml.load(fs.readFileSync(normalizePath(filePath)));
    default:
  }
};
