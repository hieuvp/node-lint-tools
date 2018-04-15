const fs = require('fs');
const glob = require('glob');
const minimatch = require('minimatch');
const { run } = require('runjs');

const {
  glob: { getPatternByExtension }
} = require('../utils');

const blacklist = require('./blacklist.runfile');

const extensions = ['json'];
const pattern = `**/${getPatternByExtension(extensions)}`;

/**
 * @param {string} args
 * @returns {Array<string>}
 */
const parseJSONLintArgs = args => {
  const paths = [];

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const stats = fs.statSync(args);
  if (stats.isDirectory()) {
    paths.push(
      ...glob.sync(args === '.' ? pattern : `${args}/${pattern}`, { ignore: blacklist })
    );
  } else if (stats.isFile() && minimatch(args, pattern) && blacklist.some(pattern => minimatch(args, pattern))) {
    // TODO: how about blacklist
    // TODO: then snapshots with package.json will be removed
    paths.push(args);
  }

  return paths;
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
