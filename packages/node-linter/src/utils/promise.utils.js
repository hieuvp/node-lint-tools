/**
 * @param {number} ms
 * @returns {Promise<any>}
 */
const sleep = ms => {
  if (typeof ms !== 'number' || Number.isNaN(ms)) {
    throw new TypeError(`Expected "Number", instead got "${ms}: ${typeof ms}"`);
  }

  if (ms <= 0) {
    throw new Error('Millisecond must be a positive number');
  }

  // eslint-disable-next-line promise/avoid-new
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  sleep
};
