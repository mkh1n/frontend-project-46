import fs from 'fs';
import gendiff from '../src/index.js';

const getFixturePath = (str) => `./__fixtures__/${str}`;

const jsonResult = fs.readFileSync(getFixturePath('jsonResult.txt'), { encoding: 'utf8' });
const plainResult = fs.readFileSync(getFixturePath('plainResult.txt'), { encoding: 'utf8' });
const stylishResult = fs.readFileSync(getFixturePath('stylishResult.txt'), { encoding: 'utf8' });
const extensions = ['yml', 'json'];

test.each(extensions)('check %s fixture', (ext) => {
  const fileBefore = getFixturePath(`file1.${ext}`);
  const fileAfter = getFixturePath(`file2.${ext}`);
  expect(gendiff(fileBefore, fileAfter, 'json')).toBe(jsonResult);
  expect(gendiff(fileBefore, fileAfter, 'plain')).toBe(plainResult);
  expect(gendiff(fileBefore, fileAfter, 'stylish')).toBe(stylishResult);
});
