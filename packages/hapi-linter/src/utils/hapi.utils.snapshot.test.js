const hapi = require('./hapi.utils');

it('should match snapshot', () => {
  expect(hapi).toMatchSnapshot();
});
