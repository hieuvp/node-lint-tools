const dargs = require('dargs');
const { run } = require('runjs');

/**
 * @param {string} command
 * @returns {string}
 */
const decorate = command => {
  if (typeof command !== 'string') {
    throw new TypeError(`Expected "String", instead got "${command}: ${typeof command}"`);
  }

  return command;
};

/**
 * @param {string} command
 * @param {Object} args - minimist argument object
 * @param {Object} opts
 * @param {Object} [opts.aliases={}] - map keys in "args" to an aliased name
 * @param {boolean} [opts.errorIgnored=false]
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

  const { aliases = {}, errorIgnored = false } = opts;

  if (typeof aliases !== 'object' || aliases === null || Array.isArray(aliases)) {
    throw new TypeError(`Expected "Object", instead got "${aliases}: ${typeof aliases}"`);
  }

  /**
   * Reverse minimist
   * Convert an object of options into an array of command-line arguments
   *
   * Matching aliases are converted to arguments with a single dash (-)
   * in front of the aliased key and the value in a separate array item
   *
   * @type {Array}
   */
  const enhancedArgs = dargs(args, { aliases });
  if (enhancedArgs.length > 0) {
    enhancedCommand += ` ${enhancedArgs.join(' ')}`;
  }

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
  decorate,
  exec
};
