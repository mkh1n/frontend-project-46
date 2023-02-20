import fs from 'fs';
import gendiff from '../src/index.js';

const formaters = ['stylish'];
const extensions = ['yml', 'json'];
const path = './__tests__/__fixtures__/';

function makeTest(formater, ext) {
  test(`${formater} ${ext}`, () => {
    expect(gendiff(`${path}${formater}/file1.${ext}`, `${path}${formater}/file2.${ext}`))
      .toEqual(fs.readFileSync(`${path}${formater}/${formater}.txt`, { encoding: 'utf8', flag: 'r' }));
  });
}

formaters.forEach((formater) => {
  extensions.forEach((ext) => {
    makeTest(formater, ext);
  });
});
