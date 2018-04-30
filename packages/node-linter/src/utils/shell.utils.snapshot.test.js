const { decorate } = require('./shell.utils');

describe('decorate', () => {
  [
    'ls',
    'ls -lia',
    'which atom',
    'brew cask outdated',
    'docker info | grep -E "Containers|Images"',
    '/usr/local/bin/npm -g outdated --parseable --depth=0',
    'ls "/Users/hieuvp/Library/Preferences" | grep "^IntelliJIdea"',
    'tree /Volumes/Data/Workspace -L 2 > "/Volumes/Data/Dropbox/Backup/Workspace.txt"',
    'cd /Volumes/Data/Workspace/Farmers/logtan-api && git branch placeholder && git checkout placeholder'
  ].forEach(command => {
    it(`should match snapshot with command: "${command}"`, () => {
      expect(decorate(command)).toMatchSnapshot();
    });
  });
});
