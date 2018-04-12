const reactNative = require('./react-native.utils');

it('should match snapshot', () => {
  expect(reactNative).toMatchSnapshot();
});
