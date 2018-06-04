const { run } = require('runjs');
const shell = require('./shell.utils');

jest.mock('runjs', () => ({ run: jest.fn() }));

global.console = { log: jest.fn() };

describe('decorate', () => {
  const { decorate } = shell;

  [[], true, undefined, null, 1].forEach(command => {
    it(`should throw an error because "${JSON.stringify(command)}" is not a string`, () => {
      const fn = () => decorate(command);
      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });
});

describe('exec', () => {
  const { exec } = shell;
  const decorate = jest.spyOn(shell, 'decorate');

  beforeEach(() => {
    run.mockResolvedValue();
  });

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

    describe('titled', () => {
      const command = 'ls';

      beforeEach(() => {
        run.mockImplementation(require.requireActual('runjs').run);
      });

      [[], null, 1].forEach(titled => {
        it(`should throw an error because "${JSON.stringify(titled)}" is not a boolean`, () => {
          const fn = () => exec(command, undefined, { titled });
          expect(fn).toThrowErrorMatchingSnapshot();
        });
      });

      it('should not print the decorated command to the screen by default', async () => {
        await exec(command);

        // eslint-disable-next-line no-console
        expect(console.log).not.toBeCalled();
        expect(decorate).not.toBeCalled();
      });

      it('should print decorate the command when passing a true value', async () => {
        await exec(command, undefined, { titled: true });

        // eslint-disable-next-line no-console
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(decorate).toHaveBeenCalledTimes(1);
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
