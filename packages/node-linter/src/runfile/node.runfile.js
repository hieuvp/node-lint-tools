const { options } = require('runjs');

const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');
const { prettier } = require('./prettier.runfile');

/**
 * @param {...string} args
 */
module.exports = function lint(...args) {
  if (args.length === 0) {
    throw new TypeError('Please specify patterns or files');
  }

  if (args.includes('.') && args.length !== 1) {
    throw new TypeError(
      "Wildcard (.) is already covered everything, there's no need to define more arguments"
    );
  }

  // If using Arrow Function here, the value of "this" will be lost
  const { ci, fix } = options(this);

  // ESLint - The pluggable linting utility for JavaScript and JSX
  eslint(args, { ci: !!ci, fix: !!fix });

  // JSON Lint - A JSON parser and validator
  jsonlint(args, { ci: !!ci, fix: !!fix });

  // Prettier - An opinionated code formatter
  prettier(args, { ci: !!ci, fix: !!fix });
};
