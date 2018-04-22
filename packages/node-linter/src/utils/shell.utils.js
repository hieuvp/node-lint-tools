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

  // Remove unnecessary spaces
  let enhancedCommand = command.trim().replace(/ {2,}/g, ' ');
  if (enhancedCommand.length === 0) {
    throw new Error(`Command "${command}" cannot be empty`);
  }

  /**
   * Reverse minimist
   * Convert an object of options into an array of command-line arguments
   *
   * @type {Array}
   */
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

  // Run command asynchronously, false by default
  const async = true;

  // Outputs are returned but not forwarded to the parent process
  // thus not printed out to the terminal
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
