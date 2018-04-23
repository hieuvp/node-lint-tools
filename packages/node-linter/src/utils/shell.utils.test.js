const { exec } = require('./shell.utils');

describe('exec', () => {
  describe('command validation', () => {
    [[], true, undefined, null, 1].forEach(command => {
      it(`should throw because command "${JSON.stringify(command)}" is not a string`, () => {
        expect(() => exec(command)).toThrowErrorMatchingSnapshot();
      });
    });

    ['', ' ', '     '].forEach(command => {
      it(`should throw because command "${command}" is an empty string`, () => {
        expect(() => exec(command)).toThrowErrorMatchingSnapshot();
      });
    });
  });

  describe('command enhancement', () => {});

  describe('option aliases', () => {
    // TODO: aliases validation
  });

  describe('option errorIgnored', () => {
    const command = 'non-existent-command';
    const message = 'Command failed: non-existent-command with exit code 127';

    // TODO: errorIgnored validation

    it('should not ignore error by default', () =>
      expect(exec(command)).rejects.toThrow(message));

    it('should swallow the error when errorIgnored equals true', () =>
      exec(command, undefined, { errorIgnored: true }).then(error => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(message);
      }));
  });

  // ///////////////////////////////////////////////////

  // args { hello: true }
  // alias tests
  // https://www.rapidtables.com/code/linux/ls.html
  // how to run test cmd? "ls -lia"? -> aliases:
  //    a: true,
  //   b: true,
  //   c: true,
  // https://www.computerhope.com/unix/tree.htm
  // tree -L 2

  // when args is a directory or something that contains double/more spaces

  // describe('args validation', () => {});
  // const validatedArgs = [[], [], []];

  // it('should happy', () =>
  //   exec('ls', { list: true }, { aliases: { list: 'l' } }).then(console.log));

  // it('should happy', () =>
  //   exec('tree', { level: 2 }, { aliases: { level: 'L' } }).then(console.log));

  it('should remove leading and trailing spaces', () => {});

  it('should remove all double, or more spaces', () => {});

  // TODO: is there any chance enhancedArgs is not an array?
  // TODO: args = {} by default -> what is the result
  // TODO: if length === 0 -> command =?
  // TODO: if length > 0 -> command =?
  // TODO: case: 1, case two, case more than two

  it('should accept opts ignore error as a boolean', () => {
    // TODO: throws
  });

  it('should not ignore error by default', () => {});

  it('should ignore error', () => {});

  // TODO: Returns
  // TODO: Promise, then, catch
  // TODO: resolves with output
  // TODO: reject with output
  // TODO: not auto print out to terminal

  // TODO: {run} => runjs with mock and without mock

  // TODO: no args cases

  it('should trim cleanly when no args is send', () => {
    // TODO: e.g. no trailing spaces
  });

  // TODO: with args cases
  // TODO: trim cleanly

  it('should deal with no args', () => {
    // TODO: user intentionally send args but nothing can be used
  });

  it('should deal with one args', () => {
    // TODO: -w
    // TODO: --abc-xyz
    // TODO: --write=love
  });

  it('should deal with more args', () => {
    // TODO: list some useful cases here
  });

  // TODO: list prettier, eslint, jsonlint use cases here to test the correctness

  it('should response a pipe, in then block', () => {});
});
