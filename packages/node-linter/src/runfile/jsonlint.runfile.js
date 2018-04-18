const fs = require('fs');
const glob = require('glob');
const minimatch = require('minimatch');
const { diffLines } = require('diff');
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
const jsonlint = (args, opts = {}) => {
  const { ci = false, fix = false } = opts;

  let files = args.reduce(
    (accumulator, path) => [...accumulator, ...parseJSONLintArgs(path)],
    []
  );
  files = [...new Set(files)];

  return files.reduce(
    (accumulator, file) =>
      accumulator
        .then(() => {
          console.log('Run ...');
          return run(`jsonlint --sort-keys ${fix === true ? '--in-place' : ''} ${file}`, {
            async: true,
            stdio: 'pipe'
          }).then(output => {
            const fileContent = fs.readFileSync(file).toString();
            console.log('fileContent =', fileContent);

            const difference = diffLines(fileContent, output);
            // difference.forEach((part) => {
            //   const FgRed = '\x1b[31m';
            //   const FgGreen = '\x1b[32m';
            //   const color = part.added ? FgGreen : part.removed ? FgRed : 'grey';
            //   console.log(color, `- or + ${part.value}`);
            // });
            console.log('difference =', difference);
          });
        })
        .catch(error => {
          console.log('Error Appear');
          console.log('error =', error);

          if (ci === true) {
            throw error;
          }
        }),
    Promise.resolve()
  );
};

module.exports = {
  jsonlint,
  parseJSONLintArgs
};
