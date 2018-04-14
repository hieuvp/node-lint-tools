const fs = require('fs');
const minimatch = require('minimatch');
const { options } = require('runjs');

const blacklist = require('./blacklist.runfile');
const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');
const { prettier } = require('./prettier.runfile');

/**
 * @param {...string} args
 * @returns {Promise<void>}
 */
module.exports = function lint(...args) {
  if (args.length === 0) {
    throw new Error('Please specify patterns or files');
  }

  if (args.includes('.') && args.length !== 1) {
    throw new Error(
      "Wildcard (.) is already covered everything, there's no need to define more arguments"
    );
  }

  // Add trailing slash to directory
  const paths = args.map(path => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stats = fs.statSync(path);
    if (path !== '.' && stats.isDirectory()) {
      return path.replace(/\/*$/, '/');
    }
    return path;
  });

  // Forbid path that is in the blacklist
  paths.forEach(path => {
    if (blacklist.some(pattern => minimatch(path, pattern))) {
      throw new Error(`Path "${path}" is blacklisted`);
    }
  });

  // If using Arrow Function, the value of "this" will be lost
  const { ci, fix } = options(this);

  return (
    Promise.resolve()
      // ESLint - The pluggable linting utility for JavaScript and JSX
      .then(() => eslint(paths, { ci: !!ci, fix: !!fix }))
      // JSON Lint - A JSON parser and validator
      .then(() => jsonlint(paths, { ci: !!ci, fix: !!fix }))
      // Prettier - An opinionated code formatter
      .then(() => prettier(paths, { ci: !!ci, fix: !!fix }))
  );
};
