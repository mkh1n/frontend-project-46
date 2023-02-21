import fs from 'fs';
import gendiff from '../src/index.js';

const formaters = ['plain', 'stylish', 'json'];
const extensions = ['yml', 'json'];
const path = './__tests__/__fixtures__/';

function makeTest(formater, ext) {
  const result = fs.readFileSync(`${path}${formater}Result.txt`, { encoding: 'utf8' });
  test(`${formater} formatter, ${ext}`, () => {
    expect(gendiff(`${path}before.${ext}`, `${path}after.${ext}`, formater))
      .toEqual(result);
  });
}

extensions.forEach((ext) => {
  formaters.forEach((formater) => {
    makeTest(formater, ext);
  });
});
