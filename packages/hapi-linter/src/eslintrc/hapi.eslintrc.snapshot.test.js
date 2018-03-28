const hapi = require('./hapi.eslintrc');

it('should match snapshot', () => {
  expect(hapi).toMatchSnapshot();
});
