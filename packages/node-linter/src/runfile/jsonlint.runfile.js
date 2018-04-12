const fs = require('fs');
const glob = require('glob');
const minimatch = require('minimatch');
const { run } = require('runjs');

const blacklist = require('./blacklist.runfile');

const pattern = '**/*.json';

/**
 * @param {string} args
 * @returns {Array}
 */
const parseJSONLintArgs = args => {
  const paths = [];

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const stats = fs.statSync(args);
  if (stats.isFile() && minimatch(args, pattern)) {
    paths.push(args);
  } else if (stats.isDirectory()) {
    paths.push(...glob.sync(pattern, { ignore: blacklist }));
  }

  return paths;
};

/**
 * @param {Array<string>} args
 * @param {Object} opts
 * @param {boolean} opts.ci
 * @param {boolean} opts.fix
 */
const jsonlint = async (args, opts = {}) => {
  const { ci = false, fix = false } = opts;
};

module.exports = {
  jsonlint,
  parseJSONLintArgs
};
