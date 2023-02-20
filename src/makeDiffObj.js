/* eslint-disable consistent-return */
import _ from 'lodash';

function makeDiffObj(file1, file2) {
  const keys = _.union(Object.keys(file1).concat(Object.keys(file2)));

  // eslint-disable-next-line array-callback-return
  const result = keys.map((key) => {
    if ((key in file1) && (key in file2)) {
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return ({ key, children: makeDiffObj(file1[key], file2[key]), status: 'nested' });
      }

      if (file1[key] === file2[key]) {
        return ({ key, value: file1[key], status: 'unchanged' });
      }

      if (file1[key] !== file2[key]) {
        return ({
          key, oldValue: file1[key], value: file2[key], status: 'updated',
        });
      }
    }

    if (!(key in file1) && (key in file2)) {
      return ({ key, value: file2[key], status: 'added' });
    }

    if ((key in file1) && !(key in file2)) {
      return ({ key, value: file1[key], status: 'removed' });
    }
  });
  return _.sortBy(result, (entry) => entry.key);
}

export default makeDiffObj;
