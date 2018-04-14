const { sleep } = require('./promise.utils');

describe('sleep', () => {
  jest.useFakeTimers();

  ['', () => {}, {}, [], false, undefined, null].forEach(args => {
    it(`should throw an error because "${args}" is not a number`, () =>
      expect(() => sleep(args)).toThrowErrorMatchingSnapshot());
  });

  [0, -10, NaN].forEach(args => {
    it(`should throw an error because "${args}" is not a positive number`, () =>
      expect(() => sleep(args)).toThrowErrorMatchingSnapshot());
  });

  it('should sleep with a given time', () => expect(sleep(10)).resolves.toBe('lemon'));
});
