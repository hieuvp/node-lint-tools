/**
 * @param {Array<string>} args
 * @returns {string}
 */
const getPatternByExtension = args => {
  if (!Array.isArray(args)) {
    throw new TypeError(`Expected "Array", instead got "${args}: ${typeof args}"`);
  }

  if (args.length === 0) {
    throw new Error(`Args "${JSON.stringify(args)}" must have at least one element`);
  }

  const patterns = args.reduce(
    (accumulator, extension) => [...accumulator, `*.${extension}`, `.*.${extension}`],
    []
  );

  return `{${patterns.join(',')}}`;
};

module.exports = {
  getPatternByExtension
};
