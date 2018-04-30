const hapi = require('./hapi.utils');

describe('hapi.utils', () => {
  it('should match snapshot', () => {
    expect(hapi).toMatchSnapshot();
  });
});
