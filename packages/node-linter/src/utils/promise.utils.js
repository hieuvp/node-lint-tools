/**
 * @param {number} ms
 * @returns {Promise<any>}
 */
const sleep = ms => {
  if (typeof ms !== 'number') {
    throw new TypeError(`Expected "Number", instead got "${ms}: ${typeof ms}"`);
  }

  if (Number.isNaN(ms) || ms <= 0) {
    throw new Error('Millisecond must be a positive number');
  }

  // eslint-disable-next-line promise/avoid-new
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  sleep
};
