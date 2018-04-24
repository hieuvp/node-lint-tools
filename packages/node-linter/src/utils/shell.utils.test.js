const { exec } = require('./shell.utils');

describe('exec', () => {
  describe('command', () => {
    [[], true, undefined, null, 1].forEach(command => {
      it(`should throw an error because "${JSON.stringify(command)}" is not a string`, () => {
        const fn = () => exec(command);
        expect(fn).toThrowErrorMatchingSnapshot();
      });
    });

    ['', ' ', '     '].forEach(command => {
      it(`should throw an error because "${command}" is an empty string`, () => {
        const fn = () => exec(command);
        expect(fn).toThrowErrorMatchingSnapshot();
      });
    });
  });

  describe('options', () => {
    describe('aliases', () => {
      const command = 'ls';
      [[], true, null, 1].forEach(aliases => {
        it(`should throw because "${JSON.stringify(aliases)}" is not an object`, () => {
          const fn = () => exec(command, undefined, { aliases });
          expect(fn).toThrowErrorMatchingSnapshot();
        });
      });
    });

    describe('errorIgnored', () => {
      const command = 'non-existent-command';

      [[], null, 1].forEach(errorIgnored => {
        it(`should throw because "${JSON.stringify(errorIgnored)}" is not a boolean`, () => {
          const fn = () => exec(command, undefined, { errorIgnored });
          expect(fn).toThrowErrorMatchingSnapshot();
        });
      });

      it('should be able to reject an error by default', () => {
        const promise = exec(command);
        return expect(promise).rejects.toThrowErrorMatchingSnapshot();
      });

      it('should swallow the error when passing a true value', () => {
        const promise = exec(command, undefined, { errorIgnored: true });
        return expect(promise).resolves.toBeInstanceOf(Error);
      });
    });
  });
});
