const hapi = require('./hapi.runfile');

describe('hapi.runfile', () => {
  it('should match snapshot', () => {
    expect(hapi).toMatchSnapshot();
  });
});
