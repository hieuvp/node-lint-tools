const isEmpty = require('lodash.isempty');
const { options } = require('runjs');

const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');

/**
 * @param {...String} args
 */
module.exports = function lint(...args) {
  if (!Array.isArray(args)) {
    throw new TypeError(`Expected "array", instead got "${args}: ${typeof args}"`);
  }

  if (isEmpty(args)) {
    throw new TypeError('Please specify patterns or files');
  }

  if (args.includes('.') && args.length !== 1) {
    throw new TypeError(
      "Wildcard (.) is already covered everything, there's no need to define more arguments"
    );
  }

  // If using Arrow Function here, the value of "this" will be lost
  const { fix } = options(this);

  // ESLint - The pluggable linting utility for JavaScript and JSX
  eslint(args, { fix: !!fix });

  // JSON Lint - A JSON parser and validator
  jsonlint(args, { fix: !!fix });
};
