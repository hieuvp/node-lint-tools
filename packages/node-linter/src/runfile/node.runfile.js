const { statSync } = require('fs');

// eslint-disable-next-line node/no-extraneous-require, import/no-extraneous-dependencies
const minimatch = require('minimatch');
const { options } = require('runjs');

const blacklist = require('./blacklist.runfile');
const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');

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
    const stats = statSync(path);
    if (stats.isDirectory()) {
      return path.replace(/\/*$/, '/');
    }
    return path;
  });

  paths.forEach(path => {
    if (blacklist.some(pattern => minimatch(path, pattern))) {
      throw new Error(`${path} is in the blacklist`);
    }
  });

  const { ci, fix } = options(this);

  // ESLint - The pluggable linting utility for JavaScript and JSX
  eslint(paths, { fix: !!fix });

  // JSON Lint - A JSON parser and validator
  jsonlint(paths, { fix: !!fix });
};
