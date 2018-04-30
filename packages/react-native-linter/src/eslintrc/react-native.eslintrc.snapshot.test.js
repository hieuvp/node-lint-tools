const reactNative = require('./react-native.eslintrc');

describe('react-native.eslintrc', () => {
  it('should match snapshot', () => {
    expect(reactNative).toMatchSnapshot();
  });
});
