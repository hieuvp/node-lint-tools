const { exec } = require('./shell.utils');

describe('exec', () => {
  it('should accept command as a string type', () => {
    
  });

  it('should throw in these cases', () => {
    // TODO: command = ""
    // TODO: command = " "
    // TODO: command = "     "
  });

  it('should accept opts ignore error as a boolean', () => {
    
  });

  it('should not ignore error by default', () => {

  });

  it('should ignore error', () => {
    
  });

  // ${command.replace(/ {2,}/g, ' ')} ${dargs(args).join(' ')}`.trim()
  // TODO: no args cases

  it('should remove all double, or more spaces', () => {
    
  });
  
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

  it('should response a pipe, in then block', () => {

  });
});
