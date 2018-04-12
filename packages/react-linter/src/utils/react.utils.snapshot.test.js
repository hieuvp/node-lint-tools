const react = require('./react.utils');

it('should match snapshot', () => {
  expect(react).toMatchSnapshot();
});
