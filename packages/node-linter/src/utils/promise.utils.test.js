const { sleep } = require('./promise.utils');

describe('sleep', () => {
  jest.useFakeTimers();

  ['str', () => {}, {}, [], false, undefined, null].forEach(args => {
    it(`should throw an error because "${args}" is not a number`, () =>
      expect(() => sleep(args)).toThrowErrorMatchingSnapshot());
  });

  [0, -10, NaN].forEach(args => {
    it(`should throw an error because "${args}" is not a positive number`, () =>
      expect(() => sleep(args)).toThrowErrorMatchingSnapshot());
  });

  [10, 100, 1000].forEach(args => {
    it(`should be able to sleep peacefully in ${args} ms`, () => {
      const promise = sleep(args);
      jest.advanceTimersByTime(args);
      return expect(promise).resolves.toBe(undefined);
    });
  });
});
