const react = require('./react.eslintrc');

describe('react.eslintrc', () => {
  it('should match snapshot', () => {
    expect(react).toMatchSnapshot();
  });
});
