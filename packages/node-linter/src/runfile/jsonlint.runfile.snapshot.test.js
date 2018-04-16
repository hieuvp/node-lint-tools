const { parseJSONLintArgs } = require('./jsonlint.runfile');

describe('parseJSONLintArgs', () => {
  [
    '.',
    'packages/',
    'packages/hapi-linter/',
    'packages/node-linter/',
    'packages/react-linter/',
    'packages/react-native-linter/',
    'runfile.js',
    'README.md',
    'package.json',
    'packages/hapi-linter/package.json',
    'packages/node-linter/src/runfile/blacklist.runfile.json',
    'packages/react-native-linter/src/eslintrc/react-native.rules.eslintrc.json'
  ].forEach(args => {
    it(`should match snapshot when parsing with "${args}"`, () => {
      expect(parseJSONLintArgs(args)).toMatchSnapshot();
    });
  });
});
