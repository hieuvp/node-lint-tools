const { parseJSONLintArgs } = require('./jsonlint.runfile');

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
  'packages/node-linter/src/runfile/blacklist.runfile.json'
].forEach(args => {
  it(`should match snapshot when parsing "${args}"`, () => {
    expect(parseJSONLintArgs(args)).toMatchSnapshot();
  });
});
