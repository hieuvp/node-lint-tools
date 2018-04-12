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

  extensions.forEach(extension => {
    it(`should match snapshot when sending ${JSON.stringify(extension)}`, () => {
      expect(getPatternByExtension(extension)).toMatchSnapshot();
    });

    it(`should list all files with extension ${JSON.stringify(extension)}`, () => {
      const pattern = getPatternByExtension(extension);
      expect(glob.sync(pattern)).toMatchSnapshot();
    });
  });
});
