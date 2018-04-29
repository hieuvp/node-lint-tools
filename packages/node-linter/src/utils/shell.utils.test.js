const { run } = require('runjs');
const { exec } = require('./shell.utils');

jest.mock('runjs', () => ({ run: jest.fn() }));

describe('exec', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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
      const command = 'tree';

      beforeEach(() => {
        run.mockResolvedValue(undefined);
      });

      [[], true, null, 1].forEach(aliases => {
        // prettier-ignore
        it(`should throw an error because "${JSON.stringify(aliases)}" is not an object`, () => {
          const fn = () => exec(command, undefined, { aliases });
          expect(fn).toThrowErrorMatchingSnapshot();
        });
      });

      it('should map args to aliases', async () => {
        const args = { level: 2 };
        const aliases = { level: 'L' };
        await exec(command, args, { aliases });
        expect(run.mock.calls[0][0]).toEqual('tree -L 2');
      });
    });

    describe('errorIgnored', () => {
      const command = 'non-existent-command';

      beforeEach(() => {
        run.mockImplementation(require.requireActual('runjs').run);
      });

      [[], null, 1].forEach(errorIgnored => {
        // prettier-ignore
        it(`should throw an error because "${JSON.stringify(errorIgnored)}" is not a boolean`, () => {
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
