const fs = require('fs');
const minimatch = require('minimatch');
const { options } = require('runjs');

const blacklist = require('./blacklist.runfile');
const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');
const { prettier } = require('./prettier.runfile');

/**
 * @param {...String} args
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

  const paths = args.map(path => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stats = fs.statSync(path);
    if (path !== '.' && stats.isDirectory()) {
      return path.replace(/\/*$/, '/');
    }
    return path;
  });

  paths.forEach(path => {
    if (blacklist.some(pattern => minimatch(path, pattern))) {
      throw new Error(`Path "${path}" is blacklisted`);
    }
  });

  // If using Arrow Function here, the value of "this" will be lost
  const { ci, fix } = options(this);

  // ESLint - The pluggable linting utility for JavaScript and JSX
  eslint(paths, { ci: !!ci, fix: !!fix });

  // JSON Lint - A JSON parser and validator
  jsonlint(paths, { ci: !!ci, fix: !!fix });

  // Prettier - An opinionated code formatter
  prettier(paths, { ci: !!ci, fix: !!fix });
};
