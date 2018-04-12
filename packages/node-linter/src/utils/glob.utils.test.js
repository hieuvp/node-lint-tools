const { getPatternByExtension } = require('./glob.utils');

describe('getPatternByExtension', () => {
  ['string', true, undefined, null, 1].forEach(args => {
    it(`should throw an error because "${args}" is not an array`, () => {
      expect(() => getPatternByExtension(args)).toThrowErrorMatchingSnapshot();
    });
  });

  it('should throw an error if args is empty', () => {
    expect(() => getPatternByExtension([])).toThrowErrorMatchingSnapshot();
  });
});
