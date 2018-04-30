const hapi = require('./hapi.eslintrc');

describe('hapi.eslintrc', () => {
  it('should match snapshot', () => {
    expect(hapi).toMatchSnapshot();
  });
});
