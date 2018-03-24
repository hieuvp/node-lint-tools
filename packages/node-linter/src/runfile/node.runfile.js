const isEmpty = require('lodash.isempty');
const { options, run } = require('runjs');

/**
 * @param {...string} args
 */
function lint(...args) {
  console.log('args =', args);

  if (isEmpty(args)) {
    throw new TypeError('Please specify patterns or files');
  }

  // If using Arrow Function here, the value of "this" will be lost
  const { fix } = options(this);

  // args.join(' ')
  // -> for easier for unit tests
  // -> don't join them in parse function

  // ESLint - The pluggable linting utility for JavaScript and JSX
  const eslint = `eslint ${fix === true ? '--fix ' : ''} ${parseESLintArgs(args)}`;
  run(eslint);

  // JSON Lint - A JSON parser and validator
  const jsonlint = `jsonlint ${fix === true ? '' : ''} ${parseJSONLintArgs(args)}`;
  run(jsonlint);
}

/**
 * @param {string[]} args
 * @returns {string[]}
 */
const parseESLintArgs = (args) => {
  if (!Array.isArray(args)) {
    throw new TypeError(`Expected "array", instead got "${args}: ${typeof args}"`);
  }

  return [];
};

/**
 * @param {string[]} args
 * @returns {string[]}
 */
const parseJSONLintArgs = (args) => {
  if (!Array.isArray(args)) {
    throw new TypeError(`Expected "array", instead got "${args}: ${typeof args}"`);
  }

  return [];
};

module.exports = {
  lint,
  parseESLintArgs,
  parseJSONLintArgs
};
