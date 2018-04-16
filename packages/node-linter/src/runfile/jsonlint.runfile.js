const fs = require('fs');
const glob = require('glob');
const minimatch = require('minimatch');
const { run } = require('runjs');

const {
  glob: { getPatternByExtension }
} = require('../utils');
const blacklist = require('./blacklist.runfile');

// The extension list that JSON Lint is interested in
const extensions = ['json'];

/**
 * @param {string} args
 * @returns {Array<string>}
 */
const parseJSONLintArgs = args => {
  if (args === '.') {
    const pattern = `**/${getPatternByExtension(extensions)}`;
    return glob.sync(pattern, { ignore: blacklist });
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const stats = fs.statSync(args);

  if (stats.isDirectory()) {
    const pattern = `${args}/**/${getPatternByExtension(extensions)}`;
    return glob.sync(pattern, { ignore: blacklist });
  }

  if (stats.isFile()) {
    return [args]
      .filter(path => {
        const pattern = `**/${getPatternByExtension(extensions)}`;
        return minimatch(path, pattern);
      })
      .filter(path => !blacklist.some(pattern => minimatch(path, pattern)));
  }

  return [];
};

/**
 * @param {Array<string>} args
 * @param {Object} opts
 * @param {boolean} opts.ci
 * @param {boolean} opts.fix
 * @returns {Promise}
 */
const jsonlint = async (args, opts = {}) => {
  const { ci = false, fix = false } = opts;
};

module.exports = {
  jsonlint,
  parseJSONLintArgs
};
