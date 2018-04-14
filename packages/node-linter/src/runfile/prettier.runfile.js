const { run } = require('runjs');

/**
 * @param {Array<string>} args
 * @param {Object} opts
 * @param {boolean} opts.ci
 * @param {boolean} opts.fix
 * @returns {Promise<void>}
 */
const prettier = async (args, opts = {}) => {
  const { ci = false, fix = false } = opts;
};

module.exports = {
  prettier
};
