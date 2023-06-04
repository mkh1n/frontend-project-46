import yaml from 'js-yaml';

export default (filePath, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(filePath);
    case '.yaml':
    case '.yml':
      return yaml.load(filePath);
    default:
      throw new Error(`Format ${ext} - is incorrect!`);
  }
};
