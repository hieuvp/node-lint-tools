const lint = require('./node.runfile');
const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');

jest.mock('./eslint.runfile', () => ({ eslint: jest.fn() }));
jest.mock('./jsonlint.runfile', () => ({ jsonlint: jest.fn() }));

const validatedArgs = [
  ['.'],
  ['src', 'test', 'config'],
  ['src', 'test'],
  ['src', 'config'],
  ['test']
];

describe('args validation', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  validatedArgs.forEach(args => {
    it(`should be happy because ${JSON.stringify(args)} is a validated args`, () => {
      expect(() => lint(...args)).not.toThrow();
    });
  });

  it('should throw an error if args is empty', () => {
    expect(() => lint()).toThrowErrorMatchingSnapshot();
  });

  it('should only accept one args if contains a wildcard (.) otherwise will throw error', () => {
    expect(() => lint('.', 'src')).toThrowErrorMatchingSnapshot();
  });
});

describe('linters invocation', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  validatedArgs.forEach(args => {
    it(`should delegate to eslint with the given args ${JSON.stringify(args)}`, () => {
      lint(...args);
      expect(eslint).toHaveBeenCalledTimes(1);
      expect(eslint.mock.calls[0][0]).toEqual(args);
    });
  });

  validatedArgs.forEach(args => {
    it(`should delegate to jsonlint with the given args ${JSON.stringify(args)}`, () => {
      lint(...args);
      expect(jsonlint).toHaveBeenCalledTimes(1);
      expect(jsonlint.mock.calls[0][0]).toEqual(args);
    });
  });
});
