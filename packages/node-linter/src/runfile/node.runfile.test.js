const each = require('jest-each');

const lint = require('./node.runfile');
const { eslint } = require('./eslint.runfile');
const { jsonlint } = require('./jsonlint.runfile');
const { prettier } = require('./prettier.runfile');

jest.mock('./eslint.runfile', () => ({ eslint: jest.fn() }));
jest.mock('./jsonlint.runfile', () => ({ jsonlint: jest.fn() }));
jest.mock('./prettier.runfile', () => ({ prettier: jest.fn() }));

const validatedArgs = [
  [['.']],
  [
    [
      'packages/hapi-linter/',
      'packages/node-linter/',
      'packages/react-linter/',
      'packages/react-native-linter/'
    ]
  ],
  [['runfile.js', '.eslintrc.js']],
  [['runfile.js', '.eslintrc.js', 'packages/']],
  [['runfile.js', 'packages/']]
];

/**
 * Set default Jest working directory to $ProjectFileDir$ (absolute path)
 * if you are using WebStorm and want to run a single test
 */

describe('args validation', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  each(validatedArgs).it('should be happy because [%s] is a validated args', args => {
    expect(() => lint(...args)).not.toThrow();
  });

  it('should throw an error if args is empty', () => {
    expect(() => lint()).toThrowErrorMatchingSnapshot();
  });

  it('should only accept one args if contains a wildcard (.) otherwise will throw error', () => {
    expect(() => lint('.', 'src')).toThrowErrorMatchingSnapshot();
  });

  each([[['src']], [['test/']], [['config.js']]]).it(
    'should throw an error because [%s] does not exist',
    args => {
      expect(() => lint(...args)).toThrowErrorMatchingSnapshot();
    }
  );

  each([
    [['package.json']],
    [['node_modules']],
    [['packages/node-linter/node_modules/']]
  ]).it(`should throw an error because [%s] is in the blacklist`, args => {
    expect(() => lint(...args)).toThrowErrorMatchingSnapshot();
  });
});

describe('linters invocation', () => {
  const timeout = time => () => new Promise(res => setTimeout(() => res()), time);

  afterEach(() => {
    jest.resetAllMocks();
  });

  each(validatedArgs).it(
    'should delegate to all runners with in the correct order',
    async args => {
      eslint.mockImplementation(timeout(1));
      jsonlint.mockImplementation(timeout(1));
      prettier.mockImplementation(timeout(1));

      await lint(...args);

      expect(eslint).toHaveBeenCalledTimes(1);
      expect(eslint.mock.calls[0][0]).toEqual(args);
      expect(eslint).toHaveBeenCalledBefore(jsonlint);
      expect(eslint).toHaveBeenCalledBefore(prettier);

      expect(jsonlint).toHaveBeenCalledTimes(1);
      expect(jsonlint.mock.calls[0][0]).toEqual(args);
      expect(jsonlint).toHaveBeenCalledBefore(prettier);

      expect(prettier).toHaveBeenCalledTimes(1);
      expect(prettier.mock.calls[0][0]).toEqual(args);
    }
  );

  it('should run eslint with transformed paths', () => {});

  it('should test ci, fix', () => {});
});
