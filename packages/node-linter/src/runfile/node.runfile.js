const { options, run } = require('runjs');

const eslint = require('./eslint.runfile');
const jsonlint = require('./jsonlint.runfile');

module.exports = function lint(...args) {
  const { fix } = options(this);

  // ESLint - The pluggable linting utility for JavaScript and JSX
  run(eslint(args, { fix }));

  // JSON Lint - A JSON parser and validator
  run(jsonlint(args, { fix }));
};
