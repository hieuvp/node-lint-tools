const { exec } = require('./shell.utils');

describe('exec', () => {
  it('should happy', () => exec('ls -lia').then(console.log));

  it('should accept command as a string type', () => {});

  it('should remove leading and trailing spaces', () => {});

  it('should remove all double, or more spaces', () => {});

  it('should throw in these cases, empty command', () => {
    // TODO: command = ""
    // TODO: command = " "
    // TODO: command = "     "
  });

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
