const lint = require('./node.runfile');
const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');
const { prettier } = require('./prettier.runfile');

jest.mock('./eslint.runfile', () => ({ eslint: jest.fn() }));
jest.mock('./jsonlint.runfile', () => ({ jsonlint: jest.fn() }));
jest.mock('./prettier.runfile', () => ({ prettier: jest.fn() }));

const validatedArgs = [
  ['.'],
  [
    'packages/hapi-linter/',
    'packages/node-linter/',
    'packages/react-linter/',
    'packages/react-native-linter/'
  ],
  ['runfile.js', '.eslintrc.js'],
  ['runfile.js', '.eslintrc.js', 'packages/'],
  ['runfile.js', 'packages/']
];

/**
 * Set default Jest working directory to $ProjectFileDir$ (absolute path)
 * if you are using WebStorm and want to run a single test
 */

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

  ['src', 'test/', 'config.js'].forEach(args => {
    it(`should throw an error because "${args}" does not exist`, () => {
      expect(() => lint(args)).toThrowErrorMatchingSnapshot();
    });
  });

  ['package.json', 'node_modules', 'packages/node-linter/node_modules/'].forEach(args => {
    it(`should throw an error because "${args}" is in the blacklist`, () => {
      expect(() => lint(args)).toThrowErrorMatchingSnapshot();
    });
  });
});

describe('linters invocation', () => {
  // eslint-disable-next-line promise/avoid-new
  const sleep = ms => () => new Promise(resolve => setTimeout(resolve, ms));

  beforeEach(() => {
    eslint.mockImplementation(sleep(1));
    jsonlint.mockImplementation(sleep(1));
    prettier.mockImplementation(sleep(1));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  validatedArgs.forEach(args => {
    it(`should run all linters in order when giving ${JSON.stringify(args)}`, async () => {
      await lint(...args);

      expect(eslint).toHaveBeenCalledTimes(1);
      expect(eslint).toHaveBeenCalledBefore(jsonlint);
      expect(eslint).toHaveBeenCalledBefore(prettier);

      expect(jsonlint).toHaveBeenCalledTimes(1);
      expect(jsonlint).toHaveBeenCalledBefore(prettier);

      expect(prettier).toHaveBeenCalledTimes(1);
    });
  });
});
