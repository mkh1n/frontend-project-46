import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';
import makeDiffObj from '../makeDiffObj.js';

function format(file1, file2, formatter){
  switch (formatter) {
    case 'plain':
      return plainFormat(makeDiffObj(file1, file2));
    case 'json':
      return jsonFormat(makeDiffObj(file1, file2));
    default:
      return stylishFormat(makeDiffObj(file1, file2));
  }
}
export default format