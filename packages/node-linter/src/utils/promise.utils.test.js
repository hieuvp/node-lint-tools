const { sleep } = require('./promise.utils');

describe('sleep', () => {
  jest.useFakeTimers();

  ['', () => {}, {}, [], NaN, false, undefined, null].forEach(args => {
    it(`should throw an error because "${args}" is not a number`, () =>
      expect(() => sleep(args)).toThrowErrorMatchingSnapshot());
  });

  it('should only sleep with a positive number', () =>
    expect(() => sleep(0)).toThrowErrorMatchingSnapshot());

  it('should sleep with a given time', () => expect(sleep(10)).resolves.toBe('lemon'));
});
