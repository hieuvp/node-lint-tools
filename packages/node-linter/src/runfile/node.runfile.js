const { options } = require('runjs');

const eslint = require('./eslint.runfile');
const jsonlint = require('./jsonlint.runfile');

module.exports = function lint(...args) {
  const { fix } = options(this);

  // ESLint - The pluggable linting utility for JavaScript and JSX
  eslint(args, { fix: !!fix });

  // JSON Lint - A JSON parser and validator
  jsonlint(args, { fix: !!fix });
};
