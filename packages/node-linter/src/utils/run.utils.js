const { run } = require('runjs');

/**
 * @param {string} command
 * @param {Object} opts
 * @returns {Promise}
 */
const exec = (command, opts = {}) => {
  const async = true;
  const stdio = 'pipe';

  // TODO: opts to swallow error
  return run(command, {
    async,
    stdio
  });
};

module.exports = {
  exec
};
