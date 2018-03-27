const react = require('./react.runfile');

it('should match snapshot', () => {
  expect(react).toMatchSnapshot();
});
