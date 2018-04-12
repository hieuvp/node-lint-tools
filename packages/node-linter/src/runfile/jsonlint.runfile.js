const fs = require('fs');
const glob = require('glob');
const minimatch = require('minimatch');
const { run } = require('runjs');

const blacklist = require('./blacklist.runfile');

// TODO: extract to utils
const extension = ['json', 'js', 'md'];
const pattern = extension.length > 1 ? `**/*.{${extension.join(',')}}` : `**/*.${extension[0]}`;

/**
 * @param {string} args
 * @returns {Array}
 */
const parseJSONLintArgs = args => {
  const paths = [];

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const stats = fs.statSync(args);
  if (args === '.') {
    // TODO: improve code duplication here
    paths.push(...glob.sync(pattern, { ignore: blacklist }));
  } else if (stats.isDirectory()) {
    paths.push(...glob.sync(`${args}/${pattern}`, { ignore: blacklist }));
  } else if (stats.isFile() && minimatch(args, pattern)) {
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
 */
const jsonlint = async (args, opts = {}) => {
  const { ci = false, fix = false } = opts;
};

module.exports = {
  jsonlint,
  parseJSONLintArgs
};
