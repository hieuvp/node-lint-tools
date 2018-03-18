const { options, run } = require('runjs');
const isEmpty = require('lodash.isempty');

module.exports = function lint(...args) {
  if (isEmpty(args)) {
    throw new TypeError('Please specify patterns or files');
  }

  const { fix } = options(this);

  // ESLint - The pluggable linting utility for JavaScript and JSX
  const eslint = `eslint ${fix === true ? '--fix ' : ''}${args.join(' ')}`;
  run(eslint);

  // JSON Lint - A JSON parser and validator
  const jsonlint = 'jsonlint';
};
