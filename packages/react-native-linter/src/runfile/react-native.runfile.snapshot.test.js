const reactNative = require('./react-native.runfile');

it('should match snapshot', () => {
  expect(reactNative).toMatchSnapshot();
});
