const glob = require('glob');

const { getPatternByExtension } = require('./glob.utils');

describe('getPatternByExtension', () => {
  const extensions = [
    ['js'],
    ['json'],
    ['yml'],
    ['md'],
    ['js', 'yml'],
    ['json', 'md'],
    ['js', 'json', 'yml'],
    ['js', 'json', 'yml', 'md']
  ];

  extensions.forEach(args => {
    const pattern = getPatternByExtension(args);

    it(`should match snapshot when calling with ${JSON.stringify(args)}`, () => {
      expect(pattern).toMatchSnapshot();
    });

    it(`should list all files with extension ${JSON.stringify(args)}`, () => {
      const files = glob.sync(pattern);
      expect(files).toMatchSnapshot();
    });
  });
});
