const react = require('./react.runfile');

describe('react.runfile', () => {
  it('should match snapshot', () => {
    expect(react).toMatchSnapshot();
  });
});
