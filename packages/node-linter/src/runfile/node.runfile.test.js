const { options } = require('runjs');

const {
  promise: { sleep }
} = require('../utils');

const lint = require('./node.runfile');
const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');
const { prettier } = require('./prettier.runfile');

jest.mock('runjs', () => ({ options: jest.fn() }));

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
  beforeEach(() => {
    options.mockImplementation(() => ({}));
    eslint.mockImplementation(() => Promise.resolve());
    jsonlint.mockImplementation(() => Promise.resolve());
    prettier.mockImplementation(() => Promise.resolve());
  });

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
  beforeEach(() => {
    options.mockImplementation(() => ({}));
    eslint.mockImplementation(() => Promise.resolve());
    jsonlint.mockImplementation(() => Promise.resolve());
    prettier.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  validatedArgs.forEach(args => {
    it(`should run all linters in order when giving ${JSON.stringify(args)}`, async () => {
      eslint.mockImplementation(() => sleep(2));
      jsonlint.mockImplementation(() => sleep(2));
      prettier.mockImplementation(() => sleep(2));

      await lint(...args);

      expect(eslint).toHaveBeenCalledTimes(1);
      expect(eslint).toHaveBeenCalledBefore(jsonlint);
      expect(eslint).toHaveBeenCalledBefore(prettier);

      expect(jsonlint).toHaveBeenCalledTimes(1);
      expect(jsonlint).toHaveBeenCalledBefore(prettier);

      expect(prettier).toHaveBeenCalledTimes(1);
    });
  });

  [
    { args: '.', transformedArgs: ['.'] },
    { args: 'runfile.js', transformedArgs: ['runfile.js'] },
    { args: 'jest.config.js', transformedArgs: ['jest.config.js'] },
    { args: 'packages', transformedArgs: ['packages/'] },
    { args: 'packages/', transformedArgs: ['packages/'] },
    { args: 'packages///', transformedArgs: ['packages/'] }
  ].forEach(({ args, transformedArgs }) => {
    it(`should transform "${args}" to "${transformedArgs}" before delegating to linters`, async () => {
      const opts = { ci: undefined, fix: true };
      const transformedOpts = { ci: false, fix: true };

      options.mockImplementation(() => opts);

      await lint(args);

      expect(eslint).toBeCalledWith(transformedArgs, transformedOpts);
      expect(jsonlint).toBeCalledWith(transformedArgs, transformedOpts);
      expect(prettier).toBeCalledWith(transformedArgs, transformedOpts);
    });
  });
});
