const react = require('./react.eslintrc');

it('should match snapshot', () => {
  expect(react).toMatchSnapshot();
});
