const { run } = require('runjs');
const { exec } = require('./shell.utils');

jest.mock('runjs', () => ({ run: jest.fn() }));

describe('exec', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('command', () => {
    beforeEach(() => {
      run.mockResolvedValue();
    });

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

    it('should recompose a concise command without leading spaces', async () => {
      const command = '  ls -lia';
      await exec(command);
      expect(run.mock.calls[0][0]).toEqual('ls -lia');
    });

    it('should recompose a concise command without trailing spaces', async () => {
      const command = 'ls -lia   ';
      await exec(command);
      expect(run.mock.calls[0][0]).toEqual('ls -lia');
    });

    it('should recompose a concise command without extra spaces', async () => {
      const command = 'ls     -l   -i    -a';
      await exec(command);
      expect(run.mock.calls[0][0]).toEqual('ls -l -i -a');
    });
  });

  describe('options', () => {
    describe('aliases', () => {
      const command = 'tree';

      beforeEach(() => {
        run.mockResolvedValue();
      });

      [[], true, null, 1].forEach(aliases => {
        // prettier-ignore
        it(`should throw an error because "${JSON.stringify(aliases)}" is not an object`, () => {
          const fn = () => exec(command, undefined, { aliases });
          expect(fn).toThrowErrorMatchingSnapshot();
        });
      });

      it('should be able to map a single alias', async () => {
        const args = { level: 1 };
        const aliases = { level: 'L' };

        await exec(command, args);
        expect(run.mock.calls[0][0]).toEqual('tree --level=1');

        await exec(command, args, { aliases });
        expect(run.mock.calls[1][0]).toEqual('tree -L 1');
      });

      it('should be able to map multiple aliases', async () => {
        const args = { level: 1, user: true, group: true, size: true };
        const aliases = { level: 'L', user: 'u', group: 'g', size: 's' };

        await exec(command, args);
        expect(run.mock.calls[0][0]).toEqual('tree --level=1 --user --group --size');

        await exec(command, args, { aliases });
        expect(run.mock.calls[1][0]).toEqual('tree -L 1 -u -g -s');
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
