import gendiff from '../src/index.js';

test('flat', () => {
  expect(gendiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json'))
    .toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');

  expect(gendiff('__tests__/__fixtures__/file1.yml', '__tests__/__fixtures__/file2.yml'))
    .toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});
