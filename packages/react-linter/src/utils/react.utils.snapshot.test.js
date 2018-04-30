const react = require('./react.utils');

describe('react.utils', () => {
  it('should match snapshot', () => {
    expect(react).toMatchSnapshot();
  });
});
