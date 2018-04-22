const dargs = require('dargs');
const { run } = require('runjs');

/**
 * @param {string} command
 * @param {Object} args - minimist argument object
 * @param {Object} opts
 * @param {boolean} opts.errorIgnored
 * @returns {Promise}
 */
const exec = (command, args = {}, opts = {}) => {
  if (typeof command !== 'string') {
    throw new TypeError(`Expected "String", instead got "${command}: ${typeof command}"`);
  }

  let enhancedCommand = command.trim().replace(/ {2,}/g, ' ');
  if (enhancedCommand.length === 0) {
    throw new Error(`Command "${command}" cannot be empty`);
  }

  const enhancedArgs = dargs(args);
  if (enhancedArgs.length > 0) {
    enhancedCommand += enhancedArgs.join(' ');
  }

  const { errorIgnored = false } = opts;

  if (typeof errorIgnored !== 'boolean') {
    throw new TypeError(
      `Expected "Boolean", instead got "${errorIgnored}: ${typeof errorIgnored}"`
    );
  }

  const async = true;
  const stdio = 'pipe';
  return run(enhancedCommand, { async, stdio }).catch(error => {
    if (errorIgnored) {
      return error;
    }
    throw error;
  });
};

module.exports = {
  exec
};
