import _ from 'lodash';

const prefixes = {
  added: '+ ',
  removed: '- ',
  nested: '  ',
  unchanged: '  ',
};

const makeStylishString = (key, value, depth) => {
  if (!_.isObject(value)) {
    return `${key}: ${value}`;
  }
  const indent = '  '.repeat(depth);
  const end = '  '.repeat(depth - 1);
  const start = `\n${indent}`;

  const result = Object.entries(value)
    .flatMap(
      ([nodeKey, nodeValue]) => `${prefixes.unchanged}${makeStylishString(nodeKey, nodeValue, depth + 2)}`,
    )
    .join(start);

  return `${key}: {${start}${result}\n${end}}`;
};
function makeValidVal(value) {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
}
const plainFormat = (ast) => {
  const iter = (nodes, fullPath = []) => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const result = nodes.flatMap((node) => {
      const name = [...fullPath, node.key].join('.');
      switch (node.status) {
        case 'updated':
          return [
            `Property '${name}' was updated. From ${makeValidVal(node.oldValue)} to ${makeValidVal(node.value)}`,
          ];
        case 'nested':
          return `${iter(node.children, [...fullPath, node.key])}`;
        case 'removed':
          return `Property '${name}' was removed`;
        case 'added':
          return `Property '${name}' was added with value: ${makeValidVal(node.value)}`;
        default: {
          break;
        }
      }
    });
    return result.filter((str) => str).join('\n');
  };

  return iter(ast);
};

const stylishFormat = (ast) => {
  const iter = (nodes, depth) => {
    const indent = '  '.repeat(depth);
    const bracketEnd = '  '.repeat(depth - 1);

    const result = nodes.flatMap((node) => {
      const { key, value, status } = node;
      const keyValue = makeStylishString(key, value, depth + 2);

      switch (status) {
        case 'updated':
          return [
            `${prefixes.removed}${makeStylishString(key, node.oldValue, depth + 2)}`,
            `${prefixes.added}${keyValue}`,
          ];
        case 'nested':
          return `${prefixes.nested}${key}: ${iter(node.children, depth + 2)}`;
        default: {
          if (prefixes[status]) {
            return `${prefixes[status]}${keyValue}`;
          }
          throw new Error(`Wrong status name: ${status}`);
        }
      }
    });

    return `{\n${indent}${result.join(`\n${indent}`)}\n${bracketEnd}}`;
  };

  return iter(ast, 1);
};

export { stylishFormat, plainFormat };
