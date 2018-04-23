const { exec } = require('./shell.utils');

describe('exec', () => {
  describe('command', () => {
    [[], true, undefined, null, 1].forEach(command => {
      it(`should throw an error because "${JSON.stringify(command)}" is not a string`, () => {
        expect(() => exec(command)).toThrowErrorMatchingSnapshot();
      });
    });

    ['', ' ', '     '].forEach(command => {
      it(`should throw an error because "${command}" is an empty string`, () => {
        expect(() => exec(command)).toThrowErrorMatchingSnapshot();
      });
    });
  });

  describe('options', () => {
    describe('errorIgnored', () => {
      const command = 'non-existent-command';

      [[], null, 1].forEach(errorIgnored => {
        it(`should throw an error because "${JSON.stringify(
          errorIgnored
        )}" is not a boolean`, () =>
          expect(() =>
            exec(command, undefined, { errorIgnored })
          ).toThrowErrorMatchingSnapshot());
      });

      it('should be able to reject an error by default', () =>
        expect(exec(command)).rejects.toThrowErrorMatchingSnapshot());

      it('should swallow the error when passing a true value', () =>
        expect(exec(command, undefined, { errorIgnored: true })).resolves.toBeInstanceOf(
          Error
        ));
    });
  });
});
